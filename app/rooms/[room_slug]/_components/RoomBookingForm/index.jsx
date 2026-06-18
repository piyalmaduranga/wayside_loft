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
      <FormDayPicker
        roomId={room.id}
        handleDateSelection={handleDateSelection}
        start={startDate ? new Date(startDate) : undefined}
        end={endDate ? new Date(endDate) : undefined}
      />

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

          <div className="grid grid-cols-2 divide-x divide-border">
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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default RoomBookingForm;

