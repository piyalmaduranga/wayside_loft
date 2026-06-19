"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { formatISO, isBefore, isValid, format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

import { DayPicker } from "react-day-picker";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "high-price", label: "Price: High to Low" },
  { value: "low-price", label: "Price: Low to High" },
  { value: "max-guests", label: "Most Guests First" },
  { value: "min-guests", label: "Fewest Guests First" },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "10px",
    border: state.isFocused ? "1.5px solid #C4A87A" : "1.5px solid rgba(26,24,21,0.12)",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(196,168,122,0.15)" : "none",
    padding: "2px 4px",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
    minWidth: "220px",
    "&:hover": { borderColor: "#C4A87A" },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: state.isSelected ? "#C4A87A" : state.isFocused ? "#F8F6F1" : "#fff",
    color: state.isSelected ? "#fff" : "#1A1815",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

function CustomHeaderLight({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) {
  return (
    <div className="flex items-center justify-between px-3 pt-2 pb-3">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center rounded-full text-[#6C6760] hover:text-[#1A1815] hover:bg-[#1A1815]/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-none bg-transparent cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
      </button>

      <span className="font-serif text-sm font-medium text-[#1A1815] tracking-wide">
        {format(date, "MMMM yyyy")}
      </span>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center rounded-full text-[#6C6760] hover:text-[#1A1815] hover:bg-[#1A1815]/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-none bg-transparent cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </button>
    </div>
  );
}

function FilterSection({ filters }) {
  const range = {
    from: filters?.range?.split("_")?.at(0),
    to: filters?.range?.split("_")?.at(1),
  };

  const [startDate, setStartDate] = useState(
    filters?.range && isValid(new Date(range.from)) ? new Date(range.from) : null
  );
  const [endDate, setEndDate] = useState(
    filters?.range && isValid(new Date(range.to)) ? new Date(range.to) : null
  );
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(e) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch() {
    if (!startDate || !endDate) return;
    const arrival = formatISO(startDate, { representation: "date" });
    const departure = formatISO(endDate, { representation: "date" });

    if (!isBefore(startDate, endDate)) {
      toast.error("Invalid date range!");
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("range", `${arrival}_${departure}`);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleDateSelection = (range) => {
    if (!range) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    setStartDate(range.from || null);
    setEndDate(range.to || null);
  };

  const inputClass =
    "px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white outline-none focus:border-[#C4A87A] focus:ring-2 focus:ring-[rgba(196,168,122,0.15)] transition-all w-full placeholder:text-[#B0A99F]";

  const sharedPickerProps = {
    calendarClassName: "wsl-datepicker-light",
    popperClassName: "wsl-datepicker-popper",
    renderCustomHeader: CustomHeaderLight,
    showPopperArrow: false,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <form className="roomsForm flex flex-wrap items-end justify-between gap-4 py-6 border-b border-[rgba(26,24,21,0.08)] mb-8">
      {/* Sort */}
      <div className="flex flex-col gap-1.5 min-w-[200px] w-full sm:w-auto">
        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6C6760]">
          Sort Rooms
        </label>
        <Select
          onChange={(e) => handleSort(e)}
          options={options}
          isSearchable={false}
          styles={selectStyles}
          defaultValue={options.find((item) => item.value === filters?.filter) ?? options[0]}
        />
      </div>

      {/* Date filter */}
      <div className="flex flex-col gap-1.5 w-full md:w-auto">
        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6C6760]">
          Filter by Date
        </label>
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          {/* Desktop view: DatePicker inputs */}
          <div className="hidden md:flex gap-3 items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className={inputClass}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Arrival Date"
              {...sharedPickerProps}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate ? addDays(startDate, 1) : new Date()}
              className={inputClass}
              dateFormat="dd/MM/yyyy"
              placeholderText="Departure Date"
              {...sharedPickerProps}
            />
          </div>

          {/* Mobile view: Clickable trigger inputs */}
          <div className="flex md:hidden gap-2 w-full">
            <div 
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-1 px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white cursor-pointer select-none text-center"
            >
              {startDate ? format(startDate, "dd/MM/yyyy") : <span className="text-[#B0A99F]">Arrival Date</span>}
            </div>
            <div 
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-1 px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white cursor-pointer select-none text-center"
            >
              {endDate ? format(endDate, "dd/MM/yyyy") : <span className="text-[#B0A99F]">Departure Date</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C4A87A] hover:bg-[#A8895E] text-white text-[13px] font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap w-full md:w-auto cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xs" />
            Search
          </button>
        </div>
      </div>

      {/* Mobile Modal Calendar Popover */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 text-left">
          {/* Modal Overlay Backdrop */}
          <div className="absolute inset-0" onClick={() => setIsMobileModalOpen(false)} />

          {/* Modal Content Card */}
          <div className="relative bg-surface w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">Select Dates</h3>
                <p className="text-xs text-muted font-sans mt-0.5">Filter rooms by availability dates</p>
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
              <DayPicker
                captionLayout="dropdown"
                min={0}
                onSelect={handleDateSelection}
                mode="range"
                selected={{ from: startDate || undefined, to: endDate || undefined }}
                weekStartsOn={1}
                numberOfMonths={1}
                disabled={[{ before: today }]}
                excludeDisabled={true}
              />
            </div>

            {/* Footer Summary / Close Button */}
            <div className="p-5 border-t border-border bg-ivory/30 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-sans px-2">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">Check In</span>
                  <span className="font-semibold text-ink text-sm mt-0.5">
                    {startDate ? format(startDate, "dd/MM/yyyy") : "Not selected"}
                  </span>
                </div>
                <div className="text-muted-light font-light text-lg">➔</div>
                <div className="flex flex-col text-right">
                  <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">Check Out</span>
                  <span className="font-semibold text-ink text-sm mt-0.5">
                    {endDate ? format(endDate, "dd/MM/yyyy") : "Not selected"}
                  </span>
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
    </form>
  );
}

export default FilterSection;