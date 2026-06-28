"use client";

import Alert from "@/app/_ui/Alert";
import SignInButton from "../SignInButton";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
  criticalError: "",
};

function CredentialsForm({ authAction }) {
  const [state, formAction] = useFormState(authAction, initialState);
  const pathname = usePathname();

  const errors = Object.values(state)?.filter((item) => item.length);
  if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to sign in, please try again"));

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left w-full">
      <h2 className="font-serif text-2xl font-semibold text-ink text-center mb-2">Login</h2>

      {state.criticalError && <Alert>{state.criticalError}</Alert>}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Email Address
        </label>
        <input 
          type="email" 
          name="email" 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Password
        </label>
        <input 
          type="password" 
          name="password" 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <SignInButton />
        <div className="flex items-center justify-between text-xs font-sans mt-2">
          <a href="#" className="text-gold hover:text-gold-dark transition-colors duration-200">Forget Password?</a>
          <span className="text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-gold hover:text-gold-dark font-semibold transition-colors duration-200">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default CredentialsForm;

