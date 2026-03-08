import Stripe from "stripe";
import {
  getReservationByStripeSessionId,
  getReservationByID,
} from "../../_lib/supabase/reservations";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import SuccessPage from "../_components/SuccessPage/SuccessPage";
import ExpirePage from "../_components/ExpirePage/ExpirePage";
import { auth } from "@/auth";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const metadata = {
  title: "Booking Overview",
};

export default async function PreviewPage({ searchParams }) {
  const session_id = searchParams?.session_id;
  // console.log({ session_id });

  if (!session_id)
    return (
      <div className="container">
        {" "}
        <h1>Forbidden</h1>
      </div>
    );

  const session = await auth();

  if (!session?.user) redirect("/signin");

  // First, try to find the reservation by ID (Direct DB ID)
  let reservation = await getReservationByID(session_id);

  // If not found by ID, try finding by Stripe Session ID (Legacy/Stripe flow)
  if (!reservation) {
    reservation = await getReservationByStripeSessionId(session_id);
  }

  if (!reservation?.id) return notFound();
  if (reservation.guest_id !== session.user.id) return notFound();

  // If the reservation is already confirmed (Direct DB ID), show success
  if (reservation.status?.toLowerCase() === "confirmed") {
    return <SuccessPage reservation={reservation} />;
  }

  // Otherwise, handle the Stripe verification flow
  try {
    const strip_session = await stripe.checkout.sessions.retrieve(session_id);

    if (
      strip_session.status === "expired" ||
      new Date() > new Date(strip_session.expires_at * 1000)
    )
      return <ExpirePage />;

    if (
      strip_session.status === "complete" &&
      strip_session.payment_status === "paid"
    ) {
      return <SuccessPage reservation={reservation} />;
    }

    if (
      strip_session.status === "open" &&
      strip_session.payment_status === "unpaid"
    ) {
      redirect("/reservations/checkout");
    }
  } catch (err) {
    console.error("Stripe session retrieval failed:", err.message);
    // If it's not a valid Stripe ID and not confirmed, it's an error
    return notFound();
  }

  return <ExpirePage />;
}
