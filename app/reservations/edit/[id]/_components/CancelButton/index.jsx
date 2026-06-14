"use client";
import { useFormStatus } from "react-dom";

function CancelButton({ handleCancel, isLoading }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      onClick={handleCancel}
      className="inline-block px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-base rounded-md transition-colors duration-150 cursor-pointer disabled:bg-neutral-500 disabled:cursor-not-allowed border-none outline-none shadow-sm"
      disabled={isLoading || pending}
    >
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}

export default CancelButton;
