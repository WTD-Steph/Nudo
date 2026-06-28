"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "../Wordmark";
import { NAV_LINKS, ROUTES } from "@/lib/links";

/**
 * Mobile-only top nav (below `md`). The desktop nav lives in Nav.tsx and is
 * hidden on small screens; this renders a wordmark + hamburger that opens a
 * full-width panel so the links never overflow the viewport.
 */
export function MobileNav({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the panel whenever the route changes (link tapped).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href={ROUTES.home} aria-label="Nudo Lab home">
          <Wordmark height={26} variant="green" />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cream-paper"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu-panel"
          className="border-t border-rule-cream bg-cream px-5 pb-6 pt-1"
        >
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-rule-cream py-4 text-[18px] font-semibold text-ink transition hover:text-rust"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 grid gap-3">
            <Link
              href={signedIn ? ROUTES.account : ROUTES.signIn}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-green px-5 text-[15px] font-bold text-cream transition hover:bg-green/90"
            >
              {signedIn ? (
                <>
                  Journal
                  <span lang="ja" className="font-ja text-[12px]">
                    日々
                  </span>
                </>
              ) : (
                "Sign in"
              )}
            </Link>
            <Link
              href={ROUTES.cart}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-rule-cream px-5 text-[15px] font-bold text-ink transition hover:border-green"
            >
              Cart
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green text-[11px] font-bold text-cream">
                0
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
