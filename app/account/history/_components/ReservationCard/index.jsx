import Image from "next/image";
import Card, { Description } from "@/app/_components/Card/Card";
import Badge from "@/app/_ui/Badge";
import ControlButtons from "../ControlButtons";
import { reservationCancelAction } from "@/app/_lib/actions";
import { formatToAbrFormat } from "@/app/utils/datetime";
import { isFuture, isPast } from "date-fns";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ reservation }) {
  const arrivalDate = formatToAbrFormat(reservation.start_date);
  const departureDate = formatToAbrFormat(reservation.end_date);
  const thumbnail = reservation.rooms?.thumbnail ?? "";

  const isCancelledStatus = reservation.status?.toLowerCase() === "cancelled" || reservation.status?.toLowerCase() === "canceled";
  const statusLabel = isCancelledStatus ? "CANCELLED" : "CONFIRMED";
  const statusBadgeType = isCancelledStatus ? "danger" : "success";

  return (
    <Card className="flex flex-col md:flex-row bg-white border border-neutral-100 hover:border-gold/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(196,168,122,0.08)] transition-all duration-500 overflow-hidden group">
      {/* Thumbnail area with absolute floating badges */}
      <div className="relative aspect-[16/10] md:aspect-auto md:w-72 shrink-0 bg-ivory-dark overflow-hidden">
        <Image
          fill
          src={
            thumbnail && thumbnail.startsWith("https")
              ? thumbnail
              : `${SUPABASE_ROOMS_URL}/${thumbnail}`
          }
          unoptimized={thumbnail.startsWith("http")}
          alt={reservation.rooms?.name || "Room thumbnail"}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Floating Status Badge (Top-Left) */}
        <div className="absolute top-4 left-4 z-10">
          <Badge
            type={statusBadgeType}
            className="shadow-xs font-semibold text-[10px] px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full border border-border/10"
          >
            {statusLabel}
          </Badge>
        </div>

        {/* Floating Time Status Badge (Top-Right) */}
        <div className="absolute top-4 right-4 z-10">
          {isPast(reservation.start_date) && isFuture(reservation.end_date) ? (
            <span className="text-[9px] font-sans font-bold tracking-[1px] px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs uppercase">
              Ongoing
            </span>
          ) : isFuture(reservation.start_date) ? (
            <span className="text-[9px] font-sans font-bold tracking-[1px] px-2.5 py-1 rounded-full bg-gold text-white shadow-xs uppercase">
              Upcoming
            </span>
          ) : isPast(reservation.end_date) ? (
            <span className="text-[9px] font-sans font-bold tracking-[1px] px-2.5 py-1 rounded-full bg-neutral-500 text-white shadow-xs uppercase">
              Past
            </span>
          ) : null}
        </div>
      </div>

      <Description className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-stretch flex-grow gap-6 text-left">
        <div className="flex flex-col justify-between gap-4 flex-grow">
          <div>
            <span className="text-[10px] tracking-[2px] uppercase text-gold font-bold mb-1 block">
              ACCOMMODATION
            </span>
            <h2 className="font-serif text-xl font-bold text-ink leading-snug">
              {reservation.rooms?.name ?? "Room"}
            </h2>
            
            {/* Elegant Date Row */}
            <div className="flex items-center gap-2 mt-3 text-muted text-sm font-sans">
              <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-charcoal">{arrivalDate} — {departureDate}</span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Guests count */}
            <div className="flex items-center gap-1.5 text-xs text-muted font-sans bg-neutral-50/60 px-3 py-1.5 rounded-xl border border-neutral-100">
              <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{reservation.guests_count} {reservation.guests_count === 1 ? 'guest' : 'guests'}</span>
            </div>

            {/* Booked Date */}
            <div className="flex items-center gap-1.5 text-xs text-muted font-sans bg-neutral-50/60 px-3 py-1.5 rounded-xl border border-neutral-100">
              <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Booked on {formatToAbrFormat(reservation.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Control Buttons aligned side-by-side or stacked on desktop */}
        <div className="flex flex-row md:flex-col justify-between md:justify-between items-center md:items-end w-full md:w-auto shrink-0 md:border-l md:border-dashed md:border-neutral-100 md:pl-8 gap-4">
          <div className="text-left md:text-right">
            <span className="text-[10px] text-muted tracking-wider uppercase block mb-0.5">Total amount</span>
            <span className="text-xl font-bold text-ink font-sans">${reservation.reserved_price.toFixed(2)}</span>
          </div>

          <ControlButtons
            reservation={reservation}
            reservationCancelAction={reservationCancelAction}
          />
        </div>
      </Description>
    </Card>
  );
}

export default ReservationCard;