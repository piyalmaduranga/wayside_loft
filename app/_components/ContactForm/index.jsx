"use client";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";
import Alert from "@/app/_ui/Alert";
import { countryCodes, getFlagEmoji, isValidPhoneNumber } from "@/app/_lib/countryCodes";

function ContactForm({ contactAction }) {
  const [state, formAction] = useFormState(contactAction, { errors: {} });
  const resetBtnRef = useRef(null);
  const formRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    return countryCodes.find((c) => c.code === "LK") || countryCodes[0];
  });
  const [localNumber, setLocalNumber] = useState("");

  if (state.isSuccess) {
    toast.success("Message has been sent");
    // CLEAR FORM INPUTS
    resetBtnRef.current?.click();
    setLocalNumber("");
  } else if (state.errors.critical) {
    toast.error(state.errors.critical);
  } else if (Object.values(state.errors).length) {
    toast.error("Invalid contact data");
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {state.errors?.critical && (
        <Alert type="danger">{state.errors?.critical}</Alert>
      )}

      {/* Hidden inputs to pass combined phone string */}
      <input 
        type="hidden" 
        name="phone" 
        value={`${selectedCountry.dial}${localNumber.replace(/\s+/g, "")}`} 
      />

      <div className="flex flex-col gap-1.5">
        <input 
          name="fullname" 
          type="text" 
          placeholder="Name" 
          className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 outline-none"
        />
        {state.errors?.fullname && (
          <span className="text-red-600 text-xs font-sans mt-1 pl-1.5 block">{state.errors.fullname}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 outline-none"
        />
        {state.errors?.email && (
          <span className="text-red-600 text-xs font-sans mt-1 pl-1.5 block">{state.errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2 w-full">
          {/* Country Code Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedCountry.code}
              onChange={(e) => {
                const newCountry = countryCodes.find((c) => c.code === e.target.value);
                if (newCountry) setSelectedCountry(newCountry);
              }}
              className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-3 py-3 rounded-md bg-surface text-ink cursor-pointer font-sans appearance-none pr-8 min-w-[105px] outline-none"
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
            className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 outline-none" 
          />
        </div>
        {localNumber && !isValidPhoneNumber(selectedCountry.code, localNumber) && (
          <span className="text-amber-600 text-xs font-sans mt-1 pl-1.5 block">
            Note: {selectedCountry.name} numbers should follow format e.g. {selectedCountry.dial} {selectedCountry.example || "7-15 digits"}.
          </span>
        )}
        {state.errors?.phone && (
          <span className="text-red-600 text-xs font-sans mt-1 pl-1.5 block">{state.errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <textarea 
          name="message" 
          placeholder="Message" 
          rows={5} 
          className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 resize-y outline-none"
        />
        {state.errors?.message && (
          <span className="text-red-600 text-xs font-sans mt-1 pl-1.5 block">{state.errors.message}</span>
        )}
      </div>

      <div className="mt-2">
        <SubmitButton type="submit" content={{ pending: "Sending...", base: "Send Message" }} className="w-full sm:w-auto" />
        <button
          type="reset"
          className="absolute -top-[200px] -left-[200px] invisible w-0 h-0 overflow-hidden -z-50"
          ref={resetBtnRef}
        ></button>
      </div>
      <Toaster position="top-center" />
    </form>
  );
}

export default ContactForm;
