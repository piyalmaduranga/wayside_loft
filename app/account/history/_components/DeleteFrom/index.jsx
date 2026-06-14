"use client";

import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  error: "",
};

function DeleteForm({ deleteAction, showLabel = false }) {
  const [state, formAction] = useFormState(deleteAction, initialState);

  if (state?.error) {
    toast.error(state.error);
  } else if (state?.status === "success") {
    toast.success("Your reservation has been deleted");
  }

  return (
    <form action={formAction} className="w-full">
      <DeleteButton showLabel={showLabel} />
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

function DeleteButton({ showLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center justify-center gap-2 font-sans text-sm font-semibold rounded-full transition-all duration-200 outline-none cursor-pointer border disabled:cursor-not-allowed disabled:opacity-60 ${showLabel
        ? "w-full py-3.5 bg-white hover:bg-red-50 border-red-200 text-red-600"
        : "w-full md:min-w-[120px] px-5 py-2.5 bg-white hover:bg-red-50 border-ink/20 hover:border-red-200 text-ink hover:text-red-600"
        }`}
    >
      <FontAwesomeIcon icon={pending ? faSpinner : faTrash} className={`text-xs ${pending ? "animate-spin" : ""}`} />Delete
      {showLabel && <span>{pending ? "Deleting..." : "Delete reservation"}</span>}
    </button>
  );
}

export default DeleteForm;