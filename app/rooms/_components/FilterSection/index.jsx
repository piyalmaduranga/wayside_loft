"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { useState } from "react";
import { formatISO, isBefore, isValid, format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

import FormDayPicker from "@/app/rooms/[room_slug]/_components/FormDayPicker";

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

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  const cleanStr = dateStr.split("T")[0];
  const parts = cleanStr.split("-").map(Number);
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  }
  return null;
};

function FilterSection({ filters }) {
  const range = {
    from: filters?.range?.split("_")?.at(0),
    to: filters?.range?.split("_")?.at(1),
  };

  const [startDate, setStartDate] = useState(
    filters?.range ? parseLocalDate(range.from) : null
  );
  const [endDate, setEndDate] = useState(
    filters?.range ? parseLocalDate(range.to) : null
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
          {/* Clickable trigger inputs (unified for desktop and mobile) */}
          <div className="flex gap-2 w-full md:w-auto">
            <div 
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-grow md:flex-grow-0 px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white cursor-pointer select-none text-center min-w-[145px]"
            >
              {startDate ? format(startDate, "dd/MM/yyyy") : <span className="text-[#B0A99F]">Arrival Date</span>}
            </div>
            <div 
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-grow md:flex-grow-0 px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white cursor-pointer select-none text-center min-w-[145px]"
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
            <div className="p-4 overflow-y-auto flex justify-center bg-ivory/5 bg-surface rounded-lg">
              <FormDayPicker
                handleDateSelection={handleDateSelection}
                start={startDate || undefined}
                end={endDate || undefined}
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
                <div className="flex flex-col items-center justify-center">
                  {startDate && endDate && (
                    <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium mb-1 whitespace-nowrap">
                      {Math.max(0, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)))} {Math.max(0, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))) === 1 ? "night" : "nights"}
                    </span>
                  )}
                  <div className="text-muted-light font-light text-lg leading-none">➔</div>
                </div>
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