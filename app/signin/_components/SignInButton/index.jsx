import { useFormStatus } from "react-dom";

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending}
      className="w-full py-3 bg-charcoal hover:bg-gold text-white hover:text-charcoal disabled:bg-muted-light disabled:text-muted disabled:cursor-not-allowed font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm cursor-pointer border-none outline-none"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Checking...
        </span>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

export default SignInButton;

