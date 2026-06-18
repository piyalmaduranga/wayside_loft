import { getGuestByIdDirect } from "@/app/_lib/supabase/guests";
import { createNewReservation } from "@/app/_lib/supabase/reservations";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { daysDifferCount } from "@/app/utils/datetime";
import { bookingTotalPrice } from "@/app/utils/reservationsCalcs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/app/_lib/mailer";
import { format } from "date-fns";

export async function POST(req, res) {
  const requestBody = await req.json();
  const payload = requestBody.data?.object?.metadata?.payload;

  if (!payload)
    return NextResponse.json(
      { status: "error", message: "missing required data" },
      { status: 400 }
    );

  const metadata = JSON.parse(payload);

  // 2 - CHECK PENDING RESERVATION
  if (!metadata.pending_reservation) {
    return NextResponse.json(
      { status: "error", message: "invalid requirements" },
      { status: 422 }
    );
  }

  const pending_reservation = metadata.pending_reservation;

  const [guest, room] = await Promise.all([
    getGuestByIdDirect(metadata.guest_id),
    getRoomById(pending_reservation.room_id),
  ]);

  if (!guest?.fullname || !room?.name) {
    console.log("missing guest || room");
    return NextResponse.json(
      { status: "error", message: "forbidden" },
      { status: 403 }
    );
  }

  switch (requestBody.type) {
    case "checkout.session.completed":
      const totalNights = daysDifferCount(
        pending_reservation.end_date,
        pending_reservation.start_date
      );
      const totalUSDPrice = bookingTotalPrice(
        room.price,
        pending_reservation.guests_count,
        totalNights
      );

      const new_res = await createNewReservation({
        authToken: metadata?.supabaseAccessToken,
        room_id: room.id,
        guest_id: guest.id,
        guest_fullname: guest.fullname, // just preserving guest fullname in case of account delete
        guests_count: pending_reservation.guests_count,
        message: pending_reservation.message,
        reserved_price: totalUSDPrice,
        start_date: pending_reservation.start_date,
        end_date: pending_reservation.end_date,
        stripe_session_id: metadata.session_id,
        status: "confirmed",
      });

      const createdReservation = new_res?.[0];
      if (createdReservation) {
        try {
          await sendBookingConfirmationEmail({
            guestName: guest.fullname,
            guestEmail: guest.email,
            roomName: room.name,
            checkIn: format(new Date(pending_reservation.start_date), "MMMM dd, yyyy"),
            checkOut: format(new Date(pending_reservation.end_date), "MMMM dd, yyyy"),
            guests: pending_reservation.guests_count,
            totalPrice: totalUSDPrice,
            bookingId: createdReservation.id,
          });
        } catch (emailErr) {
          console.error("[stripe-webhook-gateway] confirmation email failed:", emailErr.message);
        }
      }

      return NextResponse.json(
        { received: true, status: 200 },
        { status: 200 }
      );
    case "payment_intent.payment_failed":
      console.log("FAILED");
      break;
    default:
      console.log("UNMATCHED");
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
