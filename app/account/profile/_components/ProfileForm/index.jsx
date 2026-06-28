"use client";

import SubmitButton from "@/app/_ui/SubmitButton";
import { useFormState } from "react-dom";
import { useTransition, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { countryCodes, getFlagEmoji, isValidPhoneNumber } from "@/app/_lib/countryCodes";

const initialState = {
  fullnameErr: "",
  nationalityErr: "",
  phoneErr: "",
  emailErr: "",
};

function ProfileForm({ guestUpdateAction, guest }) {
  const [state, formAction] = useFormState(guestUpdateAction, initialState);

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

  return (
    <form action={formAction} className="bg-surface border border-border rounded-lg p-8 shadow-sm text-left flex flex-col gap-6 w-full max-w-3xl">
      {/* Hidden inputs to pass phone and nationality to guestUpdateAction */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Full Name</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="text"
            placeholder="Alaoui Hassan"
            name="fullname"
            defaultValue={guest.fullname}
          />
          {state?.fullname && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.fullname}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Email Address</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            defaultValue={guest.email}
            type="email"
            placeholder="john.doe@mail.com"
            name="email"
          />
          {state?.email && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.email}</span>
          )}
        </div>

        {/* Combined Phone Input (Nationality auto-detected from it) spanning full width for spacing consistency */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted flex items-center justify-between gap-2">
            <span>Phone Number</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted normal-case font-normal bg-ivory/30 border border-border px-2 py-0.5 rounded">
              <span>Detected Nationality:</span>
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
          {state?.phone && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.phone}</span>
          )}
          {state?.nationality && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.nationality}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">New Password</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="password"
            placeholder="Leave empty to keep current"
            name="password"
          />
          {state?.password && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.password}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Confirm Password</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="password"
            placeholder="Confirm new password"
            name="confirm_password"
          />
          {state?.confirm_password && (
            <span className="text-red-600 text-xs font-sans mt-0.5">
              {state.confirm_password}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <SubmitButton
          type="submit"
          content={{ pending: "Saving...", base: "Save Profile" }}
          className="w-full sm:w-auto"
        />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default ProfileForm;

