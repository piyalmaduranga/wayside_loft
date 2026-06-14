"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeAction } from "@/app/_lib/actions";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full px-5 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white text-[12px] font-semibold uppercase tracking-[0.08em] rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : "Subscribe"}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useFormState(subscribeAction, { success: false, message: "" });
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success && state?.message) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form ref={formRef} action={formAction} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          required
          className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-lg text-[13px] text-white placeholder:text-white/35 outline-none focus:border-[#C4A87A] transition-colors"
        />
        <SubmitButton />
      </form>
      <Toaster position="top-center" />
    </>
  );
}
