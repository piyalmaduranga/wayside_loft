import Image from "next/image";
import { authAction } from "@/app/_lib/actions";
import CredentialsForm from "../CredentialsForm";
import OAuthProviderButtons from "../OAuthProviderButtons";

function SigninForm() {
  return (
    <div className="py-16 md:py-24 bg-ivory flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-surface border border-border p-8 rounded-lg shadow-sm flex flex-col gap-6">
          <div className="flex justify-center pb-2 border-b border-border/40">
            <Image
              src="/wayside-loft-logo.png"
              alt="Wayside Loft Mirissa Logo"
              width={943}
              height={515}
              className="h-12 w-auto object-contain"
            />
          </div>
          <CredentialsForm authAction={authAction} />
          <OAuthProviderButtons />
        </div>
      </div>
    </div>
  );
}

export default SigninForm;

