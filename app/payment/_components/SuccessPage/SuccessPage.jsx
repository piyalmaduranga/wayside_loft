import Image from "next/image";
import Banner from "@/app/_components/Banner";
import { format } from "date-fns";
import Link from "next/link";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function SuccessPage({ reservation }) {
  const isConfirmed = reservation.status?.toLowerCase() === "confirmed";
  return (
    <>
      <Banner title={isConfirmed ? "RESERVATION CONFIRMED" : "RESERVATION RECEIVED"} />
      <div className="container mx-auto px-4 max-w-4xl py-12 md:-mt-32 relative z-10">
        <div className="bg-[#F8F6F1] rounded-lg shadow-xl border border-neutral-200/60 p-6 md:p-10 transition-all duration-300">
          <h2 className="font-serif font-medium text-2xl text-[#1A1815] mb-6 pb-2 border-b border-[#C4A87A] inline-block">
            Reservation Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Booking Number</label>
                <span className="text-base text-[#1A1815] font-bold">#{String(reservation.id).padStart(6, "0")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Room Type</label>
                <span className="text-base text-[#1A1815] font-bold">{reservation.rooms?.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Check-in Date</label>
                <span className="text-base text-[#1A1815] font-bold">{format(new Date(reservation.start_date), "LLL, dd yyyy")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Check-out Date</label>
                <span className="text-base text-[#1A1815] font-bold">{format(new Date(reservation.end_date), "LLL, dd yyyy")}</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Guests</label>
                <span className="text-base text-[#1A1815] font-bold">{reservation.guests_count} Guests</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Breakfast</label>
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded mt-0.5">
                  🍳 INCLUDED
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wider text-[#6C6760] font-semibold">Total Amount</label>
                <span className="text-base text-[#C4A87A] font-extrabold text-lg">${(reservation.reserved_price * 1).toFixed(2)}</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-neutral-200 relative aspect-[16/10] shadow-sm min-h-[220px]">
              <Image
                src={reservation.rooms.thumbnail?.startsWith("https") ? reservation.rooms.thumbnail : `${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
                unoptimized={reservation.rooms.thumbnail?.startsWith("https")}
                alt="Room Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 border-t border-neutral-200/60 pt-6">
            <Link href={"/rooms"} className="inline-flex items-center justify-center px-6 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer shadow-sm">
              Explore More Rooms
            </Link>
            <Link href={"/account/history"} className="inline-flex items-center justify-center px-6 py-3 border border-[#C4A87A] text-[#C4A87A] hover:bg-[#C4A87A]/10 text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer">
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
