import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import styles from "./styles.module.css";
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
// import { loadStripe } from "@stripe/stripe-js"; // Stripe disabled — Pay on Arrival
// import axios from "axios";

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
      // console.log("errors");
      // console.log(err.errors);
      prevState = {};
      err?.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState };
    }

    const [nationality, countryFlag] = nationalityWithFlag.split("%");

    const total_price = (
      room.price +
      ((room.price / 2) * pending_reservation.guests_count - 1)
    ).toFixed(2);

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
        // Don't block the booking flow if email fails
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
      // TODO: PREVENT REDIRECTING WHEN AN UNHANDLED ERROR OCCURS
      if (!flagError.error && flagError.payload) {
        redirect(flagError.payload);
      }
    }
  }

  return (
    <div className={`${styles.formSection} container`}>
      <CheckoutForm
        createReservationAction={createReservationAction}
        room={room}
        guest={guest}
        bookingCancelAction={bookingCancelAction}
      >
        {/* PASSING THIS AS CHILD TO PREVENT UNCESSACERY RERENDERS FOR THIS COMPONENT SINCE:
          1 - ITS A SERVER COMPONENT AND NEEDED TO BE RENDERED INSIDE A CLIENT COMPONENT
          2 - IT HAS SOME INNER API CALLS, SO RENDERING AS A CHILD WOULD PREVENT WASTING RENDERES
        */}
        <SelectCountry
          name={"nationality"}
          className={styles.formInput}
          defaultCountry={guest.nationality}
        />
      </CheckoutForm>

      <CheckoutOverview room={room} pending_reservation={pending_reservation} />
    </div>
  );
}

export default CheckoutSection;
