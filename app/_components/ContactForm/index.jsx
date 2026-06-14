"use client";
import { useFormState } from "react-dom";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";
import Alert from "@/app/_ui/Alert";

function ContactForm({ contactAction }) {
  const [state, formAction] = useFormState(contactAction, { errors: {} });
  const resetBtnRef = useRef(null);
  const formRef = useRef(null);

  if (state.isSuccess) {
    toast.success("Message has been sent");
    // CLEAR FORM INPUTS
    resetBtnRef.current?.click();
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
        <input 
          name="phone" 
          type="tel" 
          placeholder="Phone" 
          className="border border-border text-base focus:border-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60 outline-none"
        />
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

