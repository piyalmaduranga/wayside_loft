import { daysDifferCount, formatToAbrFormat } from "@/app/utils/datetime";
import Card, { Thumbnail, Description } from "@/app/_components/Card/Card";
import Image from "next/image";
import { bookingTotalPrice, nightTotalPrice } from "@/app/utils/reservationsCalcs";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function CheckoutOverview({ room, pending_reservation }) {
  const totalNights = daysDifferCount(pending_reservation.end_date, pending_reservation.start_date);
  const totalPerNight = nightTotalPrice(room.price, pending_reservation.guests_count);
  const guestsPrice = (Math.max(0, pending_reservation.guests_count - 2) * (room.price / 2)).toFixed(2);
  const totalPrice = bookingTotalPrice(room.price, pending_reservation.guests_count, totalNights);
  return (
    <div className="w-full">
      <Card className="overflow-hidden bg-surface border border-border rounded-lg shadow-sm">
        <Thumbnail className="aspect-[16/10]">
          <Image
            fill
            src={room.thumbnail?.startsWith("https") ? room.thumbnail : `${SUPABASE_ROOMS_URL}/${room.thumbnail}`}
            unoptimized={room.thumbnail?.startsWith("http")}
            alt={`${room.name} thumbnail`}
            className="object-cover"
          />
        </Thumbnail>

        <Description className="p-6 flex flex-col gap-6 text-left">
          <div>
            <span className="text-xs text-gold uppercase tracking-wider font-semibold block mb-1">Accommodation</span>
            <h2 className="font-serif text-xl font-medium text-ink">{room.name}</h2>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-medium text-ink border-b border-border pb-2">Booking Summary</h3>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Arrival</span>
              <span className="text-ink font-semibold">{formatToAbrFormat(pending_reservation.start_date)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Departure</span>
              <span className="text-ink font-semibold">{formatToAbrFormat(pending_reservation.end_date)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Guests</span>
              <span className="text-ink font-semibold">{String(pending_reservation.guests_count).padStart(2, "0")} Guests</span>
            </div>
            <div className="flex justify-between items-center text-sm font-sans">
              <span className="text-muted">Breakfast</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded">
                🍳 INCLUDED
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-medium text-ink border-b border-border pb-2">Pricing Breakdown</h3>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">${room.price} x night (Base Rate for 2 Guest)</span>
              <span className="text-ink">${room.price.toFixed(2)}</span>
            </div>
            {pending_reservation.guests_count > 2 && (
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted">
                  Additional Guests ({pending_reservation.guests_count - 2} x ${room.price / 2} / night)
                </span>
                <span className="text-ink">${guestsPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-sans border-t border-border/50 pt-2 font-medium">
              <span className="text-ink">Total per Night</span>
              <span className="text-ink">${totalPerNight}</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline border-t border-border pt-4 mt-2 font-serif text-lg font-semibold text-ink">
            <span>Total ({totalNights} Nights)</span>
            <span className="text-gold-dark text-xl font-sans">${totalPrice}</span>
          </div>
        </Description>
      </Card>
    </div>
  );
}

export default CheckoutOverview;

