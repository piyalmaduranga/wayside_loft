import { NextResponse } from "next/server";
import { getRiskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { sendBookingConfirmationEmail } from "@/app/_lib/mailer";
import { format } from "date-fns";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[supabase-webhook] Received body:", JSON.stringify(body));

    const { type, table, record, old_record } = body;

    // We respond to reservation updates when the status changes to "confirmed"
    if (
      table === "reservations" &&
      type === "UPDATE" &&
      record.status === "confirmed" &&
      old_record?.status !== "confirmed"
    ) {
      const supabase = getRiskySupabaseClient();

      // Fetch the full reservation with room and guest information
      const { data: reservation, error } = await supabase
        .from("reservations")
        .select("*, rooms(*), guests(*)")
        .eq("id", record.id)
        .single();

      if (error || !reservation) {
        console.error(
          `[supabase-webhook] Error fetching reservation details for #${record.id}:`,
          error?.message || "Not found"
        );
        return NextResponse.json(
          { error: "Reservation details not found" },
          { status: 404 }
        );
      }

      // Send confirmation email
      try {
        await sendBookingConfirmationEmail({
          guestName: reservation.guests?.fullname || reservation.guest_fullname || "Guest",
          guestEmail: reservation.guests?.email || "hello@waysideloft.com",
          roomName: reservation.rooms?.name || "Room",
          checkIn: format(new Date(reservation.start_date), "MMMM dd, yyyy"),
          checkOut: format(new Date(reservation.end_date), "MMMM dd, yyyy"),
          guests: reservation.guests_count,
          totalPrice: reservation.reserved_price,
          bookingId: reservation.id,
        });

        console.log(`[supabase-webhook] Sent confirmation email for reservation #${reservation.id}`);
        return NextResponse.json({ sent: true, reservationId: reservation.id });
      } catch (emailErr) {
        console.error(
          `[supabase-webhook] Failed to send email for reservation #${reservation.id}:`,
          emailErr.message
        );
        return NextResponse.json(
          { error: "Failed to send email", details: emailErr.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ignored: true });
  } catch (err) {
    console.error("[supabase-webhook] Error processing webhook:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
