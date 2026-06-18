"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { getRoomReservations } from "@/app/_lib/supabase/reservations";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "@/app/_ui/Loader";
import toast from "react-hot-toast";

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const cleanStr = dateStr.split("T")[0];
  const [year, month, day] = cleanStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

function FormDayPicker({ roomId, handleDateSelection, start, end }) {
  const [disabledDays, setDisabledDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const calendarRangeRef = useRef({ start: new Date(), end: new Date(new Date().getFullYear() + 2, 11) });

  useEffect(() => {
    if (!roomId) return;

    async function getBusyDays() {
      setIsLoading(true);
      try {
        const reservations = (await getRoomReservations(roomId)) ?? [];
        // If we are editing, exclude the current reservation from the blocked dates
        // and filter out cancelled reservations
        const busy_days = reservations
          .filter((item) => (!id || item.id != id) && item.status !== "cancelled")
          .map((item) => ({
            from: parseLocalDate(item.start_date),
            to: parseLocalDate(item.end_date),
          }));
        setDisabledDays(busy_days);
      } catch (error) {
        console.error("Failed to load reservations:", error);
        setDisabledDays([]);
      }
      setIsLoading(false);
    }

    getBusyDays();
  }, [roomId, id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );

  // Today local time at midnight to disable past dates timezone-safely
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSelect = (range) => {
    if (range && range.from && range.to) {
      // Check if any day in the selected range is already booked
      let current = new Date(range.from);
      const endLimit = new Date(range.to);
      let hasBookedDate = false;

      while (current <= endLimit) {
        const isBooked = disabledDays.some((busyRange) => {
          const d = new Date(current.getFullYear(), current.getMonth(), current.getDate());
          const start = new Date(busyRange.from.getFullYear(), busyRange.from.getMonth(), busyRange.from.getDate());
          const busyEnd = new Date(busyRange.to.getFullYear(), busyRange.to.getMonth(), busyRange.to.getDate());
          return d >= start && d <= busyEnd;
        });

        if (isBooked) {
          hasBookedDate = true;
          break;
        }
        current.setDate(current.getDate() + 1);
      }

      if (hasBookedDate) {
        toast.error("Selected range contains booked dates. Please choose an available range.");
        handleDateSelection(undefined);
        return;
      }
    }
    handleDateSelection(range);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center bg-surface border border-border rounded-lg shadow-sm">
      <DayPicker
        captionLayout="dropdown"
        min={0}
        onSelect={handleSelect}
        mode="range"
        selected={start ? { from: start, to: end || undefined } : undefined}
        startMonth={calendarRangeRef.current.start}
        endMonth={calendarRangeRef.current.end}
        weekStartsOn={1}
        numberOfMonths={1}
        disabled={[{ before: today }, ...disabledDays]}
        excludeDisabled={true}
        modifiers={{ booked: disabledDays }}
        modifiersClassNames={{ booked: "rdp-day_booked rdp-day--booked" }}
        footer={
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-border w-full">
            <div className="flex items-center gap-4 text-xs text-muted font-sans">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full border border-border bg-surface"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-50 border border-rose-200 relative overflow-hidden flex items-center justify-center">
                  <span className="absolute w-[140%] h-[1px] bg-rose-300 rotate-45"></span>
                </span>
                <span>Already Booked</span>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted font-sans mt-1">
              <FontAwesomeIcon icon={faInfoCircle} className="text-gold" />
              <span>Select check-in and check-out dates.</span>
            </p>
          </div>
        }
      />
    </div>
  );
}

export default FormDayPicker;