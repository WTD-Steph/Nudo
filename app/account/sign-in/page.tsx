import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <ComingSoon
      eyebrow="Account"
      title="Accounts are coming with checkout."
      blurb="We don't have a sign-in yet because we don't have a checkout yet. Both land together — soon. In the meantime, every page is shoppable without an account."
    />
  );
}
