"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { formatISO, addDays } from "date-fns";
import FormDayPicker from "../FormDayPicker";
import { useFormState } from "react-dom";
import ReservationButton from "../ReservationButton";
import { useCallback, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useAuthModal } from "@/app/_components/AuthModalContext";

const initialState = {
  dateError: "",
  guestsError: "",
  criticalError: "",
  isBooking: false,
};

const parseLocalDate = (dateStr) => {
  if (!dateStr) return undefined;
  if (dateStr instanceof Date) return dateStr;
  const cleanStr = dateStr.split("T")[0];
  const parts = cleanStr.split("-").map(Number);
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  }
  return undefined;
};

const getNightsCount = (start, end) => {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = Math.abs(e - s);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

function RoomBookingForm({ bookingAction, room, initialRange, user }) {
  const [state, formAction] = useFormState(bookingAction, initialState);
  const [startDate, setStartDate] = useState(initialRange?.from ?? "");
  const [endDate, setEndDate] = useState(initialRange?.to ?? "");
  const [guests, setGuests] = useState("2");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const { openModal } = useAuthModal();

  // Restore pending booking after login/reload
  useEffect(() => {
    const saved = localStorage.getItem(`pending_booking_${room.id}`);
    if (saved) {
      try {
        const { startDate: savedStart, endDate: savedEnd, guests: savedGuests, timestamp } = JSON.parse(saved);
        // Only restore if saved less than 30 minutes ago
        if (Date.now() - timestamp < 30 * 60 * 1000) {
          if (savedStart) setStartDate(savedStart);
          if (savedEnd) setEndDate(savedEnd);
          if (savedGuests) setGuests(savedGuests);

          // If user is now logged in, auto-submit the booking
          if (user && savedStart && savedEnd) {
            localStorage.removeItem(`pending_booking_${room.id}`);
            const timer = setTimeout(() => {
              toast.success("Restored your booking dates. Proceeding to checkout...");
              const newForm = new FormData();
              newForm.set("start_date", savedStart);
              newForm.set("end_date", savedEnd);
              newForm.set("guests_count", savedGuests);
              newForm.set("room_id", room.id);
              formAction(newForm);
            }, 500);
            return () => clearTimeout(timer);
          }
        } else {
          localStorage.removeItem(`pending_booking_${room.id}`);
        }
      } catch (e) {
        console.error("Failed to restore pending booking:", e);
      }
    }
  }, [user, room.id, formAction]);

  const handleDateSelection = useCallback((range) => {
    if (!range) {
      setStartDate("");
      setEndDate("");
      return;
    }
    const from = range.from ? formatISO(range.from, { representation: "date" }) : "";
    const to = range.to ? formatISO(range.to, { representation: "date" }) : "";

    setStartDate(from);
    setEndDate(to);
  }, []);

  function handleSubmit() {
    if (!user) {
      if (startDate && endDate) {
        localStorage.setItem(
          `pending_booking_${room.id}`,
          JSON.stringify({
            startDate,
            endDate,
            guests,
            timestamp: Date.now(),
          })
        );
      }
      toast.error("Please sign in before confirming your booking!");
      openModal("login");
      return;
    }

    if (!(startDate && endDate)) {
      toast.error("Please select a check-in and check-out date range from the calendar");
      return;
    }

    if (startDate === endDate) {
      toast.error("Booking must be for at least 1 night");
      return;
    }

    if (!guests || parseInt(guests) < 1 || parseInt(guests) > room.capacity) {
      toast.error("Please select guests number");
      return;
    }

    localStorage.removeItem(`pending_booking_${room.id}`);

    const newForm = new FormData();
    newForm.set("start_date", startDate);
    newForm.set("end_date", endDate);
    newForm.set("guests_count", guests);
    newForm.set("room_id", room.id);
    formAction(newForm);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Desktop Calendar view: hidden on mobile */}
      <div className="hidden md:block w-full">
        <FormDayPicker
          roomId={room.id}
          handleDateSelection={handleDateSelection}
          start={parseLocalDate(startDate)}
          end={parseLocalDate(endDate)}
        />
      </div>

      <form action={handleSubmit} className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col gap-5 text-left">
        <div>
          <span className="text-2xl font-serif font-semibold text-ink">${room.price}</span>
          <span className="text-muted font-sans text-sm font-light"> / night</span>
        </div>

        <div className="border border-border rounded-md divide-y divide-border overflow-hidden">
          <div className="p-3 bg-ivory/20 flex items-center gap-3">
            <FontAwesomeIcon icon={faBed} className="text-gold w-4 h-4 shrink-0" />
            <div className="flex flex-col flex-grow">
              <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted">Room Type</label>
              <span className="text-sm font-sans text-ink font-medium">{room.name}</span>
            </div>
          </div>

          {/* Clickable Date Display Container */}
          <div 
            onClick={() => setIsMobileModalOpen(true)}
            className="grid grid-cols-2 divide-x divide-border cursor-pointer hover:bg-ivory/10 transition-colors"
            title="Click to select dates"
          >
            <div className="p-3 bg-surface flex items-center gap-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gold w-4 h-4 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted">Check In</label>
                <span className="text-sm font-sans text-ink font-medium min-h-[20px]">
                  {startDate || "Select date"}
                </span>
              </div>
            </div>
            <div className="p-3 bg-surface flex items-center gap-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gold w-4 h-4 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted">Check Out</label>
                <span className="text-sm font-sans text-ink font-medium min-h-[20px]">
                  {endDate || "Select date"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface flex items-center gap-3">
            <FontAwesomeIcon icon={faUsers} className="text-gold w-4 h-4 shrink-0" />
            <div className="flex flex-col flex-grow">
              <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted">Guests</label>
              <select 
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                className="w-full bg-transparent text-sm font-sans text-ink font-medium border-none outline-none p-0 cursor-pointer focus:ring-0"
              >
                <option value="">Select guests number</option>
                {Array.from(Array(room?.capacity ?? 0)).map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1} {index + 1 === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {startDate && endDate && startDate !== endDate && (
          <div className="flex flex-col gap-2 p-3 bg-ivory/10 border border-border/60 rounded-md text-sm font-sans">
            <div className="flex justify-between text-muted">
              <span>${room.price} x {getNightsCount(startDate, endDate)} {getNightsCount(startDate, endDate) === 1 ? "night" : "nights"}</span>
              <span>${room.price * getNightsCount(startDate, endDate)}</span>
            </div>
            <hr className="border-border/40" />
            <div className="flex justify-between font-medium text-ink">
              <span>Total estimated price</span>
              <span>${room.price * getNightsCount(startDate, endDate)}</span>
            </div>
          </div>
        )}

        <ReservationButton />

        <p className="text-center text-xs text-muted font-sans font-light mt-1">
          You won&apos;t be charged yet
        </p>
      </form>

      {/* Mobile Modal Calendar Popover */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          {/* Modal Overlay Backdrop */}
          <div className="absolute inset-0" onClick={() => setIsMobileModalOpen(false)} />

          {/* Modal Content Card */}
          <div className="relative bg-surface w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">Select Dates</h3>
                <p className="text-xs text-muted font-sans mt-0.5">Choose your check-in and check-out dates</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="text-muted hover:text-ink w-8 h-8 rounded-full flex items-center justify-center hover:bg-border transition-colors border-none bg-transparent cursor-pointer font-sans text-lg"
              >
                ✕
              </button>
            </div>

            {/* Calendar Scroll Area */}
            <div className="py-2 px-0 overflow-y-auto flex justify-center bg-surface w-full">
              <FormDayPicker
                roomId={room.id}
                handleDateSelection={handleDateSelection}
                start={parseLocalDate(startDate)}
                end={parseLocalDate(endDate)}
                className="w-full flex flex-col items-center justify-center bg-surface border-none shadow-none rounded-none"
              />
            </div>

            {/* Footer Summary / Close Button */}
            <div className="p-5 border-t border-border bg-ivory/30 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-sans px-2">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">Check In</span>
                  <span className="font-semibold text-ink text-sm mt-0.5">{startDate || "Not selected"}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {startDate && endDate && startDate !== endDate && (
                    <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium mb-1 whitespace-nowrap">
                      {getNightsCount(startDate, endDate)} {getNightsCount(startDate, endDate) === 1 ? "night" : "nights"}
                    </span>
                  )}
                  <div className="text-muted-light font-light text-lg leading-none">➔</div>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">Check Out</span>
                  <span className="font-semibold text-ink text-sm mt-0.5">{endDate || "Not selected"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="w-full py-3 bg-gold hover:bg-gold-dark text-white font-sans text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-pointer mt-1"
              >
                {startDate && endDate ? "Apply Dates" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default RoomBookingForm;

