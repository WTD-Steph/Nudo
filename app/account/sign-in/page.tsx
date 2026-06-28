import Link from "next/link";
import { redirect } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { SignInForm } from "@/components/journal/SignInForm";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Sign in" };

export default async function SignInPage() {
  // Already signed in? Skip to the dashboard.
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(ROUTES.account);
  } catch {
    // Supabase env vars not configured (e.g. preview without secrets).
    // Fall through to the form; it will surface the real error on submit.
  }

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <section className="px-12 pt-16">
          <div className="mx-auto max-w-[640px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Sign in</span>
            </nav>
            <div className="mt-8 flex items-center gap-3">
              <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
                Account · sign in
              </div>
              <span
                lang="ja"
                className="font-ja text-[12px] tracking-wider text-ink/65"
              >
                · 日々
              </span>
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,72px)] font-bold leading-[0.98] tracking-tight">
              Sign in to your{" "}
              <em className="not-italic text-rust">Nudo Journal.</em>
            </h1>
            <p className="mt-5 max-w-[520px] text-[18px] leading-snug text-ink/80">
              No passwords. Email us your address; we&rsquo;ll send back a
              link. Click the link, you&rsquo;re in.
            </p>
          </div>
        </section>

        <section className="px-12 py-12">
          <div className="mx-auto max-w-[520px]">
            <SignInForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
