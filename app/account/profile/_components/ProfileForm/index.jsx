"use client";

import SubmitButton from "@/app/_ui/SubmitButton";
import { useFormState } from "react-dom";
import SelectCountry from "@/app/_ui/SelectCountry";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  fullnameErr: "",
  nationalityErr: "",
  phoneErr: "",
  emailErr: "",
};

function ProfileForm({ guestUpdateAction, guest }) {
  const [state, formAction] = useFormState(guestUpdateAction, initialState);

  const errors = Object.values(state ?? {})?.filter((item) => item.length);
  if (errors.length)
    errors.forEach((item) =>
      toast.error(item ?? "Failed to update your profile, please try again")
    );

  return (
    <form action={formAction} className="bg-surface border border-border rounded-lg p-8 shadow-sm text-left flex flex-col gap-6 w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Full Name</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="text"
            placeholder="Alaoui Hassan"
            name="fullname"
            defaultValue={guest.fullname}
          />
          {state?.fullname && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.fullname}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Email Address</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            defaultValue={guest.email}
            type="email"
            placeholder="john.doe@mail.com"
            name="email"
          />
          {state?.email && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
            <span>Nationality</span>
            {guest.countryFlag && (
              <span className="inline-block w-6 h-4 overflow-hidden rounded-xs border border-border relative shrink-0">
                <img
                  src={guest.countryFlag}
                  alt={`${guest.nationality ?? "country"} flag`}
                  className="w-full h-full object-cover"
                />
              </span>
            )}
          </label>

          <SelectCountry
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            name={"nationality"}
            defaultCountry={guest.nationality || "Sri Lanka"}
          />
          {state?.nationality && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.nationality}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Phone Number</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            defaultValue={guest.phone}
            type="tel"
            placeholder="+212 6 879900830"
            name="phone"
          />
          {state?.phone && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.phone}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">New Password</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="password"
            placeholder="Leave empty to keep current"
            name="password"
          />
          {state?.password && (
            <span className="text-red-600 text-xs font-sans mt-0.5">{state.password}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">Confirm Password</label>
          <input
            className="border-none text-base outline-1 outline-border focus:outline-gold focus:ring-4 focus:ring-gold/10 px-4 py-3 w-full shadow-xs transition-all duration-200 rounded-md bg-surface text-ink placeholder:text-muted/60"
            type="password"
            placeholder="Confirm new password"
            name="confirm_password"
          />
          {state?.confirm_password && (
            <span className="text-red-600 text-xs font-sans mt-0.5">
              {state.confirm_password}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <SubmitButton
          type="submit"
          content={{ pending: "Saving...", base: "Save Profile" }}
          className="w-full sm:w-auto"
        />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default ProfileForm;

