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

function FormDayPicker({ roomId, handleDateSelection, start, end, className }) {
  const [bookedNights, setBookedNights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectingCheckout, setIsSelectingCheckout] = useState(false);
  const { id } = useParams();
  const calendarRangeRef = useRef({ start: new Date(), end: new Date(new Date().getFullYear() + 2, 11) });

  const [month, setMonth] = useState(() => start || new Date());

  useEffect(() => {
    if (start) {
      setMonth(start);
    }
  }, [start]);

  useEffect(() => {
    if (!start) {
      setIsSelectingCheckout(false);
    }
  }, [start]);

  useEffect(() => {
    if (!roomId) return;

    async function getBusyDays() {
      setIsLoading(true);
      try {
        const reservations = (await getRoomReservations(roomId)) ?? [];
        // If we are editing, exclude the current reservation from the blocked dates
        // and filter out cancelled reservations
        const nights = [];
        reservations
          .filter((item) => (!id || item.id != id) && item.status !== "cancelled")
          .forEach((item) => {
            let current = parseLocalDate(item.start_date);
            const checkout = parseLocalDate(item.end_date);
            if (current && checkout) {
              while (current < checkout) {
                nights.push(new Date(current.getFullYear(), current.getMonth(), current.getDate()));
                current.setDate(current.getDate() + 1);
              }
            }
          });
        setBookedNights(nights);
      } catch (error) {
        console.error("Failed to load reservations:", error);
        setBookedNights([]);
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

  const getNightsCount = (from, to) => {
    if (!from || !to) return 0;
    const s = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const e = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    const diffTime = e - s;
    return Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getActiveBookedNights = () => {
    let list = bookedNights || [];
    
    // 1. Exclude the active check-out date (end) so it doesn't get slashed while selected
    if (end && typeof end.getTime === "function") {
      const endTime = end.getTime();
      list = list.filter((bn) => bn && typeof bn.getTime === "function" && bn.getTime() !== endTime);
    }
    
    // 2. Exclude the first booked night after check-in when we are in checkout selection phase
    // so the user knows they can select it as their check-out day.
    if (start && typeof start.getTime === "function" && isSelectingCheckout) {
      const startTime = start.getTime();
      let firstBookedNightAfterStart = null;
      for (const bn of bookedNights) {
        if (bn && typeof bn.getTime === "function") {
          const bnTime = bn.getTime();
          if (bnTime >= startTime) {
            if (!firstBookedNightAfterStart || bnTime < firstBookedNightAfterStart.getTime()) {
              firstBookedNightAfterStart = bn;
            }
          }
        }
      }
      if (firstBookedNightAfterStart) {
        const firstTime = firstBookedNightAfterStart.getTime();
        list = list.filter((bn) => bn && typeof bn.getTime === "function" && bn.getTime() !== firstTime);
      }
    }
    
    return list;
  };

  const isBookedNight = (date) => {
    return bookedNights.some(
      (bn) =>
        bn.getFullYear() === date.getFullYear() &&
        bn.getMonth() === date.getMonth() &&
        bn.getDate() === date.getDate()
    );
  };

  const isDateDisabled = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (d < today) return true;

    // If we are selecting check-in (no start selected, or isSelectingCheckout is false)
    if (!start || !isSelectingCheckout) {
      return isBookedNight(d);
    }

    // We are selecting check-out:
    if (d.getTime() === start.getTime()) {
      return false; // Clickable to deselect
    }

    if (d < start) {
      return isBookedNight(d); // Clickable to change check-in
    }

    // Find the first booked night after check-in
    let firstBookedNightAfterStart = null;
    for (const bn of bookedNights) {
      if (bn >= start) {
        if (!firstBookedNightAfterStart || bn < firstBookedNightAfterStart) {
          firstBookedNightAfterStart = bn;
        }
      }
    }

    // If there is a booked night after check-in, checkout cannot be past that booked night
    if (firstBookedNightAfterStart && d > firstBookedNightAfterStart) {
      return true;
    }

    return false;
  };

  const handleSelect = (range, selectedDay) => {
    if (!selectedDay) return;
    const clicked = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
    
    let targetRange = null;

    if (!start || !isSelectingCheckout) {
      const nextDay = new Date(clicked);
      nextDay.setDate(nextDay.getDate() + 1);
      targetRange = { from: clicked, to: nextDay };
      setIsSelectingCheckout(true);
    } else {
      if (clicked.getTime() === start.getTime()) {
        setIsSelectingCheckout(false);
        handleDateSelection(undefined);
        return;
      } else if (clicked < start) {
        const nextDay = new Date(clicked);
        nextDay.setDate(nextDay.getDate() + 1);
        targetRange = { from: clicked, to: nextDay };
        setIsSelectingCheckout(true);
      } else {
        targetRange = { from: start, to: clicked };
        setIsSelectingCheckout(false);
      }
    }

    if (targetRange && targetRange.from && targetRange.to) {
      // Check if any night of stay in the selected range is already booked
      let current = new Date(targetRange.from);
      const endLimit = new Date(targetRange.to);
      endLimit.setDate(endLimit.getDate() - 1); // Exclusive of checkout date
      let hasBookedDate = false;

      while (current <= endLimit) {
        if (isBookedNight(current)) {
          hasBookedDate = true;
          break;
        }
        current.setDate(current.getDate() + 1);
      }

      if (hasBookedDate) {
        toast.error("Selected range contains booked dates. Please choose an available range.");
        setIsSelectingCheckout(false);
        handleDateSelection(undefined);
        return;
      }
    }

    handleDateSelection(targetRange);
  };

  return (
    <div className={className || "p-4 flex flex-col items-center justify-center bg-surface border border-border rounded-lg shadow-sm"}>
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        captionLayout="dropdown"
        min={0}
        onSelect={handleSelect}
        mode="range"
        selected={start ? { from: start, to: end || undefined } : undefined}
        startMonth={calendarRangeRef.current.start}
        endMonth={calendarRangeRef.current.end}
        weekStartsOn={1}
        numberOfMonths={1}
        disabled={isDateDisabled}
        excludeDisabled={true}
        modifiers={{ booked: getActiveBookedNights() }}
        modifiersClassNames={{ booked: "rdp-day_booked rdp-day--booked" }}
        footer={
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-border w-full">
            <div className="flex items-center gap-4 text-xs text-muted font-sans">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full border border-border bg-surface"></span>
                <span>Available</span>
              </div>
              {roomId && (
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-50 border border-rose-200 relative overflow-hidden flex items-center justify-center">
                    <span className="absolute w-[140%] h-[1px] bg-rose-300 rotate-45"></span>
                  </span>
                  <span>Already Booked</span>
                </div>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted font-sans mt-1">
              <FontAwesomeIcon icon={faInfoCircle} className="text-gold" />
              <span>
                {start && end ? (
                  `Selected stay: ${getNightsCount(start, end)} ${
                    getNightsCount(start, end) === 1 ? "night" : "nights"
                  }`
                ) : (
                  "Select check-in and check-out dates."
                )}
              </span>
            </p>
          </div>
        }
      />
    </div>
  );
}

export default FormDayPicker;