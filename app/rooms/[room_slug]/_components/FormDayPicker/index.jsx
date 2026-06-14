"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { getReservationByID, getRoomReservations } from "@/app/_lib/supabase/reservations";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "@/app/_ui/Loader";

function FormDayPicker({ handleDateSelection, start, end }) {
  const [disabledDays, setDisabledDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { room_slug, id } = useParams();
  const calendarRangeRef = useRef({ start: new Date(), end: new Date(new Date().getFullYear() + 2, 11) });

  useEffect(() => {
    if (!room_slug && !id) return;

    async function getBusyDays() {
      setIsLoading(true);

      let reservations = [];
      let busy_days = [];

      try {
        if (id) {
          const reservation_target = await getReservationByID(id);
          reservations = (await getRoomReservations(reservation_target?.room_id)) ?? [];

          busy_days = reservations
            .filter((item) => item.id != id)
            .map((item) => ({ from: new Date(item.start_date), to: new Date(item.end_date) }));
        } else {
          reservations = (await getRoomReservations(room_slug)) ?? [];

          busy_days = reservations.map((item) => ({
            from: new Date(item.start_date),
            to: new Date(item.end_date),
          }));
        }
      } catch (error) {
        console.error("Failed to load reservations:", error);
        busy_days = [];
      }

      setDisabledDays(busy_days);
      setIsLoading(false);
    }

    getBusyDays();
  }, [room_slug, id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );

  return (
    <div className="p-4 flex flex-col items-center justify-center bg-surface border border-border rounded-lg shadow-sm">
      <DayPicker
        captionLayout="dropdown"
        min={0}
        onSelect={(range) => handleDateSelection(range)}
        mode="range"
        selected={start && end ? { from: start, to: end } : null}
        startMonth={calendarRangeRef.current.start}
        endMonth={calendarRangeRef.current.end}
        weekStartsOn={1}
        numberOfMonths={1}
        disabled={[{ before: new Date() }, ...disabledDays]}
        footer={
          <p className="flex items-center gap-1.5 text-xs text-muted font-sans mt-3">
            <FontAwesomeIcon icon={faInfoCircle} className="text-gold" />
            <span>Select check-in and check-out dates.</span>
          </p>
        }
      />
    </div>
  );
}

export default FormDayPicker;