"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { formatISO, formatRFC7231, isBefore, isValid } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

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

function FilterSection({ filters }) {
  const range = {
    from: filters?.range.split("_")?.at(0),
    to: filters?.range.split("_")?.at(1),
  };
  const [startDate, setStartDate] = useState(
    filters?.range && isValid(new Date(range.from)) ? formatRFC7231(new Date(range.from)) : ""
  );
  const [endDate, setEndDate] = useState(
    filters?.range && isValid(new Date(range.to)) ? formatRFC7231(new Date(range.to)) : ""
  );

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
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });

    if (!isBefore(arrival, departure)) {
      toast.error("Invalid date range!");
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("range", `${arrival}_${departure}`);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const inputClass =
    "px-4 py-2.5 border border-[rgba(26,24,21,0.12)] rounded-[10px] text-[14px] text-[#1A1815] bg-white outline-none focus:border-[#C4A87A] focus:ring-2 focus:ring-[rgba(196,168,122,0.15)] transition-all w-full placeholder:text-[#B0A99F]";

  return (
    <form className="roomsForm flex flex-wrap items-end justify-between gap-4 py-6 border-b border-[rgba(26,24,21,0.08)] mb-8">
      {/* Sort */}
      <div className="flex flex-col gap-1.5 min-w-[200px]">
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
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6C6760]">
          Filter by Date
        </label>
        <div className="flex flex-wrap gap-3 items-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={inputClass}
            dateFormat="dd/MM/yyyy"
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Arrival Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={inputClass}
            dateFormat="dd/MM/yyyy"
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Departure Date"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C4A87A] hover:bg-[#A8895E] text-white text-[13px] font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xs" />
            Search
          </button>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default FilterSection;
