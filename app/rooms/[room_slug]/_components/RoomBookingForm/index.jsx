"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { formatISO } from "date-fns";
import FormDayPicker from "../FormDayPicker";
import { useFormState } from "react-dom";
import ReservationButton from "../ReservationButton";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useAuthModal } from "@/app/_components/AuthModalContext";

const initialState = {
  dateError: "",
  guestsError: "",
  criticalError: "",
  isBooking: false,
};

function RoomBookingForm({ bookingAction, room, initialRange, user }) {
  const [state, formAction] = useFormState(bookingAction, initialState);
  const [startDate, setStartDate] = useState(initialRange?.from ?? "");
  const [endDate, setEndDate] = useState(initialRange?.to ?? "");
  const [guests, setGuests] = useState("2");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const { openModal } = useAuthModal();

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
      toast.error("Please sign in before confirming your booking!");
      openModal("login");
      return;
    }

    if (!(startDate && endDate)) {
      toast.error("Please select a date range from the calendar");
      return;
    }

    if (!guests || parseInt(guests) < 1 || parseInt(guests) > room.capacity) {
      toast.error("Please select guests number");
      return;
    }

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
          start={startDate ? new Date(startDate) : undefined}
          end={endDate ? new Date(endDate) : undefined}
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
            <div className="p-4 overflow-y-auto flex justify-center bg-ivory/5">
              <FormDayPicker
                roomId={room.id}
                handleDateSelection={handleDateSelection}
                start={startDate ? new Date(startDate) : undefined}
                end={endDate ? new Date(endDate) : undefined}
              />
            </div>

            {/* Footer Summary / Close Button */}
            <div className="p-5 border-t border-border bg-ivory/30 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-sans px-2">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">Check In</span>
                  <span className="font-semibold text-ink text-sm mt-0.5">{startDate || "Not selected"}</span>
                </div>
                <div className="text-muted-light font-light text-lg">➔</div>
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

