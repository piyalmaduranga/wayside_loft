import Heading from "@/app/_ui/Heading";
import ReservationCard from "./_components/ReservationCard";
import { getGuestReservations } from "@/app/_lib/supabase/reservations";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
  title: "Booking History",
  description: "Reservations history at the Hotel Booking App ",
};

async function History() {
  let session = {};
  let reservations = [];
  try {
    session = await auth();
    console.log({ HISTORY_SESSION: session });
    reservations = (await getGuestReservations(session.user?.id)) ?? [];
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <Heading className="text-left mb-2">Your Booking History</Heading>
      {reservations.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {reservations.reverse().map((item) => (
            <ReservationCard key={item.id} reservation={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-surface border border-border rounded-lg shadow-sm text-center p-6 mt-4">
          <p className="text-muted font-sans text-base mb-4">You have no booked rooms yet.</p>
          <Link 
            href="/rooms" 
            className="px-6 py-3 bg-gold hover:bg-gold-dark text-white font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm outline-none"
          >
            Browse Our Rooms
          </Link>
        </div>
      )}
    </div>
  );
}

export default History;

