import { daysDifferCount, formatToAbrFormat } from "@/app/utils/datetime";
import Card, { Thumbnail, Description } from "@/app/_components/Card/Card";
import Image from "next/image";
import { bookingTotalPrice, nightTotalPrice } from "@/app/utils/reservationsCalcs";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function CheckoutOverview({ reservation, guests, start, end }) {
  const totalNights = daysDifferCount(end, start);
  const totalPerNight = nightTotalPrice(reservation.rooms.price, guests);
  const guestsPrice = (Math.max(0, guests - 2) * (reservation.rooms.price / 2)).toFixed(2);
  const totalPrice = bookingTotalPrice(reservation.rooms.price, guests, totalNights);

  return (
    <div className="w-full">
      <Card className="overflow-hidden bg-surface border border-border rounded-lg shadow-sm">
        <Thumbnail className="aspect-[16/10]">
          <Image
            fill
            src={reservation.rooms.thumbnail?.startsWith("https") ? reservation.rooms.thumbnail : `${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
            unoptimized={reservation.rooms.thumbnail?.startsWith("https")}
            alt={`${reservation.rooms.name} thumbnail`}
            className="object-cover"
          />
        </Thumbnail>

        <Description className="p-6 flex flex-col gap-6 text-left">
          <div>
            <span className="text-xs text-gold uppercase tracking-wider font-semibold block mb-1">Accommodation</span>
            <h2 className="font-serif text-xl font-medium text-ink">{reservation.rooms.name}</h2>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-medium text-ink border-b border-border pb-2">Booking Summary</h3>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Arrival</span>
              <span className="text-ink font-semibold">{formatToAbrFormat(new Date(start))}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Departure</span>
              <span className="text-ink font-semibold">{formatToAbrFormat(new Date(end))}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Guests</span>
              <span className="text-ink font-semibold">{String(guests).padStart(2, "0")} Guests</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-medium text-ink border-b border-border pb-2">Pricing Breakdown</h3>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">${reservation.rooms.price.toFixed(2)} x night (Base Rate for 2 Guests)</span>
              <span className="text-ink">${reservation.rooms.price.toFixed(2)}</span>
            </div>
            {guests > 2 && (
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted">
                  Additional Guests ({guests - 2} x ${Number(reservation.rooms.price / 2).toFixed(2)} / night)
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

