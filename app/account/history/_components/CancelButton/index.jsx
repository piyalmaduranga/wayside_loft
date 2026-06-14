"use client";

import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function CancelButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white outline-none border-none cursor-pointer disabled:cursor-not-allowed transition-all duration-200 rounded-full font-sans font-semibold text-sm"
    >
      {pending ? (
        <>
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs" />
          <span>Processing...</span>
        </>
      ) : (
        <span>Confirm cancellation</span>
      )}
    </button>
  );
}

export default CancelButton;