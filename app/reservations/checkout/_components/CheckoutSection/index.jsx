import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import { cookies, headers } from "next/headers";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import {
  getGuestByIdDirect,
  updateGuest,
  updateGuestDirect,
} from "@/app/_lib/supabase/guests";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { reservationSchema } from "@/app/_lib/zodSchemas";
import {
  createNewReservation,
  createNewReservationDirect,
} from "@/app/_lib/supabase/reservations";
import { bookingCancelAction } from "@/app/_lib/actions";
import SelectCountry from "@/app/_ui/SelectCountry";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { sendBookingConfirmationEmail } from "@/app/_lib/mailer";
import { bookingTotalPrice } from "@/app/utils/reservationsCalcs";
import { daysDifferCount } from "@/app/utils/datetime";

async function CheckoutSection() {
  const session = await auth();

  const reservation_cookies = cookies();
  if (!reservation_cookies.has("pending_reservation")) {
    redirect("/rooms");
  }

  const pending_reservation = JSON.parse(
    reservation_cookies.get("pending_reservation").value
  );

  const [room, guest] = await Promise.all([
    getRoomById(pending_reservation.room_id),
    getGuestByIdDirect(session.user?.id),
  ]);

  if (!room) notFound();

  async function createReservationAction(prevState, formData) {
    "use server";
    console.log("state");
    console.log(prevState);
    prevState = { ...prevState, isConfirming: true };
    const fullname = formData.get("fullname");
    const nationalID = formData.get("nationalID");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const nationalityWithFlag = formData.get("nationality");
    const message = formData.get("message");

    try {
      reservationSchema.parse({
        fullname,
        email,
        phone,
        nationality: nationalityWithFlag,
        nationalID,
        message,
      });
    } catch (err) {
      prevState = {};
      err?.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState };
    }

    const [nationality, countryFlag] = nationalityWithFlag.split("%");

    const nightsCount = daysDifferCount(pending_reservation.end_date, pending_reservation.start_date);
    const total_price = bookingTotalPrice(room.price, pending_reservation.guests_count, nightsCount);

    let flagError = { error: false, payload: "" };
    try {
      const session = await auth();

      // Update the guest profile
      await updateGuestDirect(
        guest.id,
        fullname,
        nationality,
        countryFlag,
        phone,
        email,
        nationalID
      );

      // Create the reservation directly (no Stripe — Pay on Arrival)
      const newReservations = await createNewReservationDirect({
        room_id: pending_reservation.room_id,
        guest_id: guest.id,
        guests_count: pending_reservation.guests_count,
        message,
        reserved_price: total_price,
        start_date: pending_reservation.start_date,
        end_date: pending_reservation.end_date,
        stripe_session_id: null,
        status: "confirmed",
      });

      const newReservation = newReservations?.[0];

      // Send confirmation email
      try {
        await sendBookingConfirmationEmail({
          guestName: fullname,
          guestEmail: email,
          roomName: room.name,
          checkIn: format(new Date(pending_reservation.start_date), "MMMM dd, yyyy"),
          checkOut: format(new Date(pending_reservation.end_date), "MMMM dd, yyyy"),
          guests: pending_reservation.guests_count,
          totalPrice: total_price,
          bookingId: newReservation?.id ?? "N/A",
        });
      } catch (emailErr) {
        console.error("[mailer] Booking email failed:", emailErr.message);
      }

      // Clear the pending reservation cookie
      cookies().delete("pending_reservation");
      revalidatePath("/account/history");

      flagError.payload = `/payment/success?session_id=${newReservation?.id}`;
    } catch (err) {
      flagError.error = true;
      console.error("Booking creation error:", err);
      return { ...prevState, criticalErr: "Failed to confirm your booking!" };
    } finally {
      revalidatePath("/account/history");
      if (!flagError.error && flagError.payload) {
        redirect(flagError.payload);
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start py-12 px-4 max-w-7xl mx-auto container">
      <div className="lg:col-span-2">
        <CheckoutForm
          createReservationAction={createReservationAction}
          room={room}
          guest={guest}
          bookingCancelAction={bookingCancelAction}
        >
          <SelectCountry
            name={"nationality"}
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            defaultCountry={guest.nationality}
          />
        </CheckoutForm>
      </div>

      <div className="lg:col-span-1 lg:sticky lg:top-24">
        <CheckoutOverview room={room} pending_reservation={pending_reservation} />
      </div>
    </div>
  );
}

export default CheckoutSection;

