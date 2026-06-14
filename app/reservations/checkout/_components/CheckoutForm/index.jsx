"use client";

import Alert from "@/app/_ui/Alert";
import ConfirmationButton from "../ConfirmationButton";
import { useFormState } from "react-dom";
import CancelButton from "../CancelButton";
import { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  nationalID: "",
  message: "",
  criticalError: "",
};

function CheckoutForm({ guest, createReservationAction, bookingCancelAction, children }) {
  const [state, formAction] = useFormState(createReservationAction, initialState);
  const [isPending, setTransition] = useTransition();

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
            National ID / Passport
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
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Phone Number
        </label>
        <input 
          type="tel" 
          name="phone" 
          defaultValue={guest.phone} 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
        {state?.phone && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.phone}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
          <span>Where are you from?</span>
          {guest.countryFlag && (
            <span className="inline-block w-6 h-4 overflow-hidden rounded-xs border border-border relative">
              <Image
                src={guest.countryFlag}
                alt={`${guest.nationality ?? "country"} flag`}
                fill
                className="object-cover"
              />
            </span>
          )}
        </label>
        {children}
        {state?.nationality && <span className="text-red-600 text-xs font-sans mt-0.5">{state?.nationality}</span>}
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

