import { signIn } from "@/auth";
import { cookies } from "next/headers";

function OAuthProviderButtons() {
  const redirectURL = cookies().has("pending_reservation") ? "/reservations/checkout" : "/account/history";
  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      <div className="flex items-center text-center text-muted font-sans text-xs uppercase tracking-wider my-3 before:content-[''] before:flex-1 before:border-b before:border-border before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-border after:ml-3">
        or
      </div>

      <div className="flex flex-col gap-3">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: redirectURL });
          }}
          className="w-full"
        >
          <button className="w-full flex items-center justify-center gap-3 border border-border bg-surface hover:bg-ivory py-3 px-4 rounded-sm text-sm font-sans font-semibold text-ink transition-all duration-300 shadow-xs cursor-pointer outline-none">
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="18" width="18" className="shrink-0" />
            <span>Continue with Google</span>
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("facebook", { redirectTo: redirectURL });
          }}
          className="w-full"
        >
          <button className="w-full flex items-center justify-center gap-3 bg-[#1877f2] hover:bg-[#165dab] py-3 px-4 rounded-sm text-sm font-sans font-semibold text-white transition-all duration-300 shadow-xs cursor-pointer outline-none">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default OAuthProviderButtons;

