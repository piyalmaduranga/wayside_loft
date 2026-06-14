"use client";

import ConfirmationButton from "../ConfirmationButton";

function ReservationForm({ capacity, setGuests, guests, handleSubmit, children }) {
  return (
    <form action={handleSubmit} className="flex flex-col gap-6 text-left w-full max-w-2xl bg-surface border border-border rounded-lg p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold text-ink mb-1 relative after:content-[''] after:block after:w-16 after:h-0.5 after:bg-gold after:mt-3">
        Edit Reservation Details
      </h2>

      <div className="flex flex-col gap-1.5 mt-4">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Number of Guests
        </label>
        <select
          defaultValue={guests}
          onChange={(e) => (e.target.value ? setGuests(Number(e.target.value)) : null)}
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink cursor-pointer focus:ring-0"
        >
          <option value="">Select guests number</option>
          {Array.from(Array(capacity ?? 0)).map((item, index) => (
            <option key={index} value={index + 1}>
              {index + 1} {index + 1 === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Reservation Dates
        </label>
        {children}
      </div>

      <div className="flex justify-end mt-4">
        <ConfirmationButton />
      </div>
    </form>
  );
}

export default ReservationForm;

