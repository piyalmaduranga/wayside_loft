"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({
  onClick = null,
  type = "button",
  className = "",
  content = { pending: "Loading...", base: "Submit" },
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      onClick={onClick ? () => onClick() : null}
      disabled={pending}
      className={`inline-flex items-center justify-center px-12 py-3.5 bg-charcoal hover:bg-gold text-white hover:text-charcoal disabled:bg-muted-light disabled:text-muted disabled:cursor-not-allowed font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm outline-none cursor-pointer ${className}`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {content.pending}
        </span>
      ) : (
        content.base
      )}
    </button>
  );
}

export default SubmitButton;

