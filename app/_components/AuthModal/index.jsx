"use client";

import React, { useState, useEffect } from "react";
import { useAuthModal } from "../AuthModalContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Alert from "@/app/_ui/Alert";

export default function AuthModal() {
  const { isOpen, view, closeModal, setView } = useAuthModal();
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Reset form states when modal opens/closes or view changes
  useEffect(() => {
    setEmail("");
    setPassword("");
    setFullname("");
    setConfirmPassword("");
    setFormError("");
    setFieldErrors({});
    setShowPassword(false);
  }, [isOpen, view]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setFieldErrors({});

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setFormError("Invalid email or password. Please try again.");
        toast.error("Failed to sign in");
      } else {
        toast.success("Successfully signed in!");
        closeModal();
        router.refresh();
      }
    } catch (err) {
      setFormError("An unexpected error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else if (data.error) {
          setFormError(data.error);
        } else {
          setFormError("Failed to register. Please try again.");
        }
        toast.error("Registration failed");
        return;
      }

      // Automatically sign the user in after registration
      toast.success("Account created! Logging in...");
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setFormError("Account created, but autologin failed. Please sign in manually.");
        setView("login");
      } else {
        closeModal();
        router.refresh();
      }
    } catch (err) {
      setFormError("An unexpected error occurred during registration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-10 transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-ivory"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Tab Headers */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setView("login")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 border-b-2 cursor-pointer font-sans ${
              view === "login"
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setView("signup")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 border-b-2 cursor-pointer font-sans ${
              view === "signup"
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {formError && <Alert type="danger">{formError}</Alert>}

          {view === "login" ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left w-full">
              <h2 className="font-serif text-2xl font-semibold text-ink text-center mb-2">Welcome Back</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                  placeholder="name@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                  placeholder="••••••••"
                />
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-charcoal hover:bg-gold text-white hover:text-charcoal disabled:bg-muted-light disabled:text-muted disabled:cursor-not-allowed font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm cursor-pointer border-none outline-none"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4 text-left w-full">
              <h2 className="font-serif text-2xl font-semibold text-ink text-center mb-2">Create Account</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Fullname
                </label>
                <input
                  type="text"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                  placeholder="John Doe"
                />
                {fieldErrors.fullname && (
                  <span className="text-red-600 text-xs font-sans mt-0.5">{fieldErrors.fullname}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                  placeholder="john@example.com"
                />
                {fieldErrors.email && (
                  <span className="text-red-600 text-xs font-sans mt-0.5">{fieldErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 pr-10 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-muted hover:text-gold transition-colors duration-200 cursor-pointer border-none bg-transparent outline-none p-1"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="text-red-600 text-xs font-sans mt-0.5">{fieldErrors.password}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 pr-10 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.confirm_password && (
                  <span className="text-red-600 text-xs font-sans mt-0.5">{fieldErrors.confirm_password}</span>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-charcoal hover:bg-gold text-white hover:text-charcoal disabled:bg-muted-light disabled:text-muted disabled:cursor-not-allowed font-sans text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm cursor-pointer border-none outline-none"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </div>
            </form>
          )}

          {/* Social Sign In Option */}
          <div className="w-full flex flex-col gap-4 mt-2">
            <div className="flex items-center text-center text-muted font-sans text-xs uppercase tracking-wider my-3 before:content-[''] before:flex-1 before:border-b before:border-border before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-border after:ml-3">
              or
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border border-border bg-surface hover:bg-ivory py-3 px-4 rounded-sm text-sm font-sans font-semibold text-ink transition-all duration-300 shadow-xs cursor-pointer outline-none"
            >
              <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                height="18"
                width="18"
                className="shrink-0"
              />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
