"use client";
import { useFormStatus } from "react-dom";

function CancelButton({ handleCancel, isLoading }) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="button" 
      onClick={handleCancel} 
      className="px-6 py-3 bg-surface hover:bg-ivory border border-border text-ink hover:text-gold disabled:bg-muted-light disabled:cursor-not-allowed font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-xs cursor-pointer outline-none text-center" 
      disabled={isLoading || pending}
    >
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}

export default CancelButton;

