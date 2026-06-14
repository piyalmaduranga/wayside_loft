"use client";

import Alert from "@/app/_ui/Alert";
import SignUpButton from "../SignUpButton";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
  critical: "",
};

function CredentialsForm({ registerAction, authAction }) {
  const [state, formAction] = useFormState(registerAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const errors = Object.values(state)?.filter((item) => item.length);
  if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to register, please try again"));

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left w-full">
      <h2 className="font-serif text-2xl font-semibold text-ink text-center mb-2">Sign Up</h2>

      {state.critical && <Alert>{state.critical}</Alert>}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Fullname
        </label>
        <input 
          type="text" 
          name="fullname" 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
        {state.fullname && <span className="text-red-600 text-xs font-sans mt-0.5">{state.fullname}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Email Address
        </label>
        <input 
          type="email" 
          name="email" 
          className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
        />
        {state.email && <span className="text-red-600 text-xs font-sans mt-0.5">{state.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Password
        </label>
        <div className="relative flex items-center">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 pr-10 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
          />
          <button 
            type="button" 
            className="absolute right-3 text-muted hover:text-gold transition-colors duration-200 cursor-pointer border-none bg-transparent outline-none p-1" 
            onClick={() => setShowPassword((current) => !current)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
          </button>
        </div>
        {state.password && <span className="text-red-600 text-xs font-sans mt-0.5">{state.password}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Confirm Password
        </label>
        <div className="relative flex items-center">
          <input 
            type={showPassword ? "text" : "password"} 
            name="confirm_password" 
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 pr-10 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60" 
          />
          <button 
            type="button" 
            className="absolute right-3 text-muted hover:text-gold transition-colors duration-200 cursor-pointer border-none bg-transparent outline-none p-1" 
            onClick={() => setShowPassword((current) => !current)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
          </button>
        </div>
        {state.confirm_password && <span className="text-red-600 text-xs font-sans mt-0.5">{state.confirm_password}</span>}
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <SignUpButton />
        <p className="text-center text-xs text-muted font-sans mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-gold hover:text-gold-dark font-semibold transition-colors duration-200">
            Sign In
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default CredentialsForm;

