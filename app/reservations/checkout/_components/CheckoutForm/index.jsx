"use client";

import Alert from "@/app/_ui/Alert";
import ConfirmationButton from "../ConfirmationButton";
import { useFormState } from "react-dom";
import CancelButton from "../CancelButton";
import { useTransition, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { countryCodes, getFlagEmoji, isValidPhoneNumber } from "@/app/_lib/countryCodes";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  nationalID: "",
  message: "",
  criticalError: "",
};

function CheckoutForm({ guest, createReservationAction, bookingCancelAction }) {
  const [state, formAction] = useFormState(createReservationAction, initialState);
  const [isPending, setTransition] = useTransition();

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const matched = countryCodes.find(
      (c) => 
        (guest.phone && guest.phone.startsWith(c.dial)) || 
        (guest.nationality && guest.nationality.split("%")[0].toLowerCase() === c.name.toLowerCase())
    );
    return matched || countryCodes.find((c) => c.code === "LK") || countryCodes[0];
  });

  const [localNumber, setLocalNumber] = useState(() => {
    const dial = countryCodes.find(
      (c) => 
        (guest.phone && guest.phone.startsWith(c.dial)) || 
        (guest.nationality && guest.nationality.split("%")[0].toLowerCase() === c.name.toLowerCase())
    )?.dial || "+94";
    if (guest.phone && guest.phone.startsWith(dial)) {
      return guest.phone.substring(dial.length).trim();
    }
    return guest.phone || "";
  });

  function handleCancel() {
    setTransition(async () => await bookingCancelAction());
  }

  const errors = Object.values(state)?.filter((item) => item.length);
  if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to confirm your booking, please try again"));

  return (
    <form action={formAction} className="flex flex-col gap-6 text-left w-full max-w-2xl bg-surface border border-border rounded-lg p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold text-ink mb-1 relative after:content-[''] after:block after:w-16 after:h-0.5 after:bg-gold after:mt-3">
        Reservation Details
      </h2>

      {state?.criticalError && <Alert>{state?.criticalError}</Alert>}

      {/* Hidden inputs to pass phone and nationality to formAction */}
      <input 
        type="hidden" 
        name="phone" 
        value={`${selectedCountry.dial}${localNumber.replace(/\s+/g, "")}`} 
      />
      <input 
        type="hidden" 
        name="nationality" 
        value={`${selectedCountry.name}%https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
            Full Name
          </label>
          <input 
            type="text" 
            name="fullname" 
            defaultValue={guest.fullname} 
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
          />
          {state?.fullname && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.fullname}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
            National ID / Passport (Optional)
          </label>
          <input 
            type="text" 
            name="nationalID" 
            defaultValue={guest.nationalID} 
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
          />
          {state?.nationalID && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.nationalID}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Email Address
        </label>
        <input 
          type="email" 
          name="email" 
          defaultValue={guest.email} 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
        {state?.email && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted flex items-center justify-between gap-2">
          <span>Phone Number</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted normal-case font-normal bg-ivory/30 border border-border px-2 py-0.5 rounded">
            <span>Detected Country:</span>
            <span className="font-semibold text-ink">{selectedCountry.name}</span>
            <img
              src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
              alt={selectedCountry.name}
              className="w-3.5 h-2.5 object-cover rounded-xs border border-border"
            />
          </span>
        </label>
        
        <div className="flex gap-2 w-full">
          {/* Country Code Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedCountry.code}
              onChange={(e) => {
                const newCountry = countryCodes.find((c) => c.code === e.target.value);
                if (newCountry) setSelectedCountry(newCountry);
              }}
              className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-3 py-3 rounded-md bg-surface text-ink cursor-pointer font-sans appearance-none pr-8 min-w-[105px]"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {getFlagEmoji(c.code)} {c.dial}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[9px] text-muted-light">
              ▼
            </div>
          </div>
          
          {/* Local Phone Input */}
          <input 
            type="tel" 
            value={localNumber}
            onChange={(e) => {
              let val = e.target.value;
              if (selectedCountry.code === "LK" && val.startsWith("0")) {
                val = val.substring(1);
              }
              setLocalNumber(val);
            }}
            placeholder={selectedCountry.example || "77 123 4567"}
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
          />
        </div>
        {localNumber && !isValidPhoneNumber(selectedCountry.code, localNumber) && (
          <span className="text-amber-600 text-xs font-sans mt-1 block">
            Note: {selectedCountry.name} numbers should follow format e.g. {selectedCountry.dial} {selectedCountry.example || "7-15 digits"}.
          </span>
        )}
        {state?.phone && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.phone}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Special Requests / Additional Information
        </label>
        <textarea 
          name="message" 
          rows={5} 
          placeholder="Any dietary preferences, early check-in requests, or special occasions..."
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 resize-y"
        />
        {state?.message && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.message}</span>}
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <CancelButton isLoading={isPending} handleCancel={handleCancel} />
        <ConfirmationButton disabled={isPending} />
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </form>
  );
}

export default CheckoutForm;

