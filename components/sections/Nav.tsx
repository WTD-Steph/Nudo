import Link from "next/link";
import { Wordmark } from "../Wordmark";
import { MobileNav } from "./MobileNav";
import { NAV_LINKS, ROUTES } from "@/lib/links";
import { createClient } from "@/lib/supabase/server";

async function getSession() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function Nav() {
  const user = await getSession();

  return (
    <nav className="sticky top-0 z-30 bg-cream/95 backdrop-blur">
      {/* Desktop / tablet (≥ md) */}
      <div className="hidden grid-cols-[1fr_auto_1fr] items-center px-6 py-5 lg:px-12 md:grid">
        <div className="flex gap-6 text-sm font-medium lg:gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink transition hover:text-rust"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href={ROUTES.home} aria-label="Nudo Lab home">
          <Wordmark height={36} variant="green" />
        </Link>
        <div className="flex items-center justify-end gap-3 text-sm">
          {user ? (
            <Link
              href={ROUTES.account}
              className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-[13px] font-semibold text-cream transition hover:bg-green/90"
            >
              Journal
              <span className="font-ja text-[11px]" lang="ja">
                日々
              </span>
            </Link>
          ) : (
            <Link href={ROUTES.signIn} className="text-ink hover:text-rust">
              Sign in
            </Link>
          )}
          <Link
            href={ROUTES.cart}
            className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-[13px] font-semibold text-cream transition hover:bg-green/90"
          >
            Cart
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-cream text-[11px] font-bold text-ink">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile (< md) */}
      <MobileNav signedIn={!!user} />
    </nav>
  );
}
