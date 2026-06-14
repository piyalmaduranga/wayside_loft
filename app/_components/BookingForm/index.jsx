"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { addDays, formatISO, isBefore, format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BookingButton from "../BookingButton";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function CustomHeader({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) {
  return (
    <div className="flex items-center justify-between px-3 pt-2 pb-3">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-none bg-transparent cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
      </button>

      <span className="font-serif text-sm font-medium text-white tracking-wide">
        {format(date, "MMMM yyyy")}
      </span>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-none bg-transparent cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </button>
    </div>
  );
}

function BookingForm({ bookingSearchAction, layout = "vertical", children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));

  async function handleSearch() {
    if (!startDate || !endDate) return;

    if (!isBefore(startDate, endDate)) {
      toast.error("Invalid date range!");
      return;
    }

    const arrival = formatISO(startDate, { representation: "date" });
    const departure = formatISO(endDate, { representation: "date" });

    await bookingSearchAction(`${arrival}_${departure}`);
  }

  const isHorizontal = layout === "horizontal";

  const sharedPickerProps = {
    calendarClassName: "wsl-datepicker",
    popperClassName: "wsl-datepicker-popper",
    renderCustomHeader: CustomHeader,
    showPopperArrow: false,
  };

  if (isHorizontal) {
    return (
      <form
        action={handleSearch}
        className="flex flex-row items-center justify-between gap-6 bg-[#0E0D0B]/85 backdrop-blur-xl border border-white/[0.12] rounded-full py-3.5 pl-8 pr-3.5 w-full shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center gap-6 flex-grow">
          <div className="flex flex-col flex-grow text-left">
            <span className="text-[#E8D9BE] text-[10px] font-bold uppercase tracking-wider mb-0.5">
              Check-In
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="w-full bg-transparent border-none text-white text-[14px] md:text-[15px] font-medium p-0 outline-none cursor-pointer focus:ring-0"
              placeholderText="Add date"
              {...sharedPickerProps}
            />
          </div>

          <div className="h-8 w-px bg-white/15 self-center" />

          <div className="flex flex-col flex-grow text-left">
            <span className="text-[#E8D9BE] text-[10px] font-bold uppercase tracking-wider mb-0.5">
              Check-Out
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              className="w-full bg-transparent border-none text-white text-[14px] md:text-[15px] font-medium p-0 outline-none cursor-pointer focus:ring-0"
              placeholderText="Add date"
              {...sharedPickerProps}
            />
          </div>
        </div>

        <div className="flex-shrink-0 w-40 md:w-44">
          <BookingButton />
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </form>
    );
  }

  return (
    <form
      action={handleSearch}
      className="flex flex-col gap-8 bg-[rgba(12,18,32,0.55)] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-10 w-full shadow-[0_25px_70px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.04]"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-white font-serif font-medium text-3xl tracking-wide">
          Book a Room
        </h2>
        <div className="h-px w-12 bg-gold/60" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2 pb-5 border-b border-white/[0.08]">
          <label className="text-white/45 text-xs font-semibold uppercase tracking-[0.18em]">
            Arrival
          </label>
          <div className="flex items-center gap-3">
            <CalendarIcon />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd MMM yyyy"
              minDate={new Date()}
              className="w-full bg-transparent text-white text-lg font-light outline-none cursor-pointer placeholder:text-white/40"
              {...sharedPickerProps}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <label className="text-white/45 text-xs font-semibold uppercase tracking-[0.18em]">
            Departure
          </label>
          <div className="flex items-center gap-3">
            <CalendarIcon />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={addDays(startDate, 1)}
              dateFormat="dd MMM yyyy"
              className="w-full bg-transparent text-white text-lg font-light outline-none cursor-pointer placeholder:text-white/40"
              {...sharedPickerProps}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <BookingButton />
        {children}
        <p className="text-white/35 text-xs text-center tracking-wide">
          Pay on arrival · No booking fees
        </p>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default BookingForm;