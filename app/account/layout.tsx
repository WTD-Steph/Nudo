import { redirect } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { JournalNav } from "@/components/journal/JournalNav";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth gate for every /account/* route. The middleware refreshes
  // the cookie; here we enforce membership.
  let userEmail: string | null = null;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect(ROUTES.signIn);
    userEmail = user.email ?? null;
  } catch {
    // env vars missing → can't auth → bounce to sign-in (which will
    // surface a clearer error on submit).
    redirect(ROUTES.signIn);
  }

  return (
    <>
      <Nav />
      <JournalNav email={userEmail} />
      <main id="main-content" className="bg-cream">
        {children}
      </main>
      <Footer />
    </>
  );
}
