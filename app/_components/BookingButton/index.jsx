"use client";
import { useFormStatus } from "react-dom";

function BookingButton({ onClick = null }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={onClick ?? undefined}
      className="w-full py-3.5 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-semibold text-[13px] uppercase tracking-[0.1em] rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(196,168,122,0.3)] hover:shadow-[0_8px_24px_rgba(196,168,122,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center"
    >
      {pending ? "Processing…" : "Book Now"}
    </button>
  );
}

export default BookingButton;
