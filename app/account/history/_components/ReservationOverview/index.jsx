"use client";
import Card, { Thumbnail, Description } from "@/app/_components/Card/Card";
import Image from "next/image";
import { formatToAbrFormat } from "@/app/utils/datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEdit, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "../DeleteFrom";
import Link from "next/link";
import { useState } from "react";
import CancelButton from "../CancelButton";
import { useFormState } from "react-dom";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;
const initialState = { error: "" };

function ReservationOverview({ deleteAction, reservation, allowDelete = true, reservationCancelAction, children }) {
  const [showCancel, setShowCancel] = useState(false);
  const [state, formAction] = useFormState(reservationCancelAction, initialState);

  async function handleCancel() {
    const cancelForm = new FormData();
    cancelForm.set("reservation_id", reservation.id);
    await formAction(cancelForm);
  }

  if (showCancel)
    return (
      <div className="w-full max-w-md mx-auto text-left relative">
        <Card className="overflow-hidden bg-white border border-border rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <Thumbnail className="aspect-[16/10]" zoomOnHover={false}>
            <Image
              fill
              src={reservation.rooms.thumbnail?.startsWith("http") ? reservation.rooms.thumbnail : `${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
              unoptimized={reservation.rooms.thumbnail?.startsWith("http")}
              alt={`${reservation.rooms.name} thumbnail`}
              className="object-cover"
            />
          </Thumbnail>
          <Description className="p-6 flex flex-col gap-6">
            <h2 className="font-serif text-lg font-semibold text-ink text-center">
              Are you sure you want to cancel this reservation?
            </h2>

            <div className="flex flex-col gap-3">
              <form action={handleCancel}>
                <CancelButton isLoading={false} handleCancel={handleCancel} />
              </form>
              <button
                type="button"
                className="w-full py-3.5 bg-white hover:bg-surface border border-border text-ink font-sans text-sm font-semibold rounded-full transition-all duration-200 shadow-xs cursor-pointer outline-none text-center"
                onClick={() => setShowCancel(false)}
              >
                Go Back
              </button>
            </div>
          </Description>
        </Card>
      </div>
    );

  return (
    <div className="w-full max-w-md mx-auto text-left relative">
      <Card className="overflow-hidden bg-white border border-border rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="relative">
          <Thumbnail className="aspect-[16/10]" zoomOnHover={false}>
            <Image
              fill
              src={reservation.rooms.thumbnail?.startsWith("https") ? reservation.rooms.thumbnail : `${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
              unoptimized={reservation.rooms.thumbnail?.startsWith("https")}
              alt={`${reservation.rooms.name} thumbnail`}
              className="object-cover"
            />
          </Thumbnail>

          {allowDelete && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" />
              <span>Confirmed</span>
            </div>
          )}
        </div>

        <Description className="p-6 flex flex-col gap-5">
          <div>
            <span className="text-xs text-gold uppercase tracking-wider font-semibold block mb-1">
              Accommodation
            </span>
            <h2 className="font-serif text-xl font-semibold text-ink">
              {reservation.rooms.name ?? "Room"}
            </h2>
          </div>

          <div className="flex flex-col gap-3 bg-surface rounded-xl p-4">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Check-in</span>
              <span className="text-ink font-semibold">
                {formatToAbrFormat(new Date(reservation.start_date))}
              </span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Check-out</span>
              <span className="text-ink font-semibold">
                {formatToAbrFormat(new Date(reservation.end_date))}
              </span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Guests</span>
              <span className="text-ink font-semibold">
                {String(reservation.guests_count).padStart(2, "0")} guests
              </span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Booked on</span>
              <span className="text-ink font-semibold">
                {formatToAbrFormat(new Date(reservation.created_at))}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-baseline border-t border-border pt-4 font-sans">
            <span className="text-base font-semibold text-ink">Total</span>
            <span className="text-ink text-xl font-bold">
              ${Number(reservation.reserved_price).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <Link
              href={`/reservations/edit/${reservation.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-ink hover:bg-gold text-white hover:text-charcoal font-sans text-sm font-semibold rounded-full transition-all duration-200 shadow-sm outline-none text-center"
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit reservation</span>
            </Link>

            {allowDelete ? (
              <DeleteForm deleteAction={deleteAction} showLabel={true} />
            ) : (
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 font-sans text-sm font-semibold rounded-full transition-all duration-200 outline-none text-center cursor-pointer"
                onClick={() => setShowCancel(true)}
              >
                <FontAwesomeIcon icon={faBan} />
                <span>Cancel reservation</span>
              </button>
            )}
          </div>
        </Description>
        {children}
      </Card>
    </div>
  );
}

export default ReservationOverview;