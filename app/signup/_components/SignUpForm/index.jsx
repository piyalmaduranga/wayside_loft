import { authAction, signupAction } from "@/app/_lib/actions";
import CredentialsForm from "../CredentialsForm";
import OAuthProviderButtons from "@/app/signin/_components/OAuthProviderButtons";

function SignUpForm() {
  return (
    <div className="py-16 md:py-24 bg-ivory flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-surface border border-border p-8 rounded-lg shadow-sm flex flex-col gap-6">
          <CredentialsForm registerAction={signupAction} authAction={authAction} />
          <OAuthProviderButtons />
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;

