import { useFormStatus } from "react-dom";

function ConfirmationButton({ disabled }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="inline-block px-8 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-medium text-base rounded-md transition-colors duration-150 cursor-pointer disabled:bg-neutral-300 disabled:cursor-not-allowed border-none outline-none shadow-sm"
      disabled={pending || disabled}
    >
      {pending ? "Processing..." : "Confirm"}
    </button>
  );
}

export default ConfirmationButton;
