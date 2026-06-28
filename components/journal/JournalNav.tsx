"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/links";

const TABS = [
  { href: ROUTES.account, label: "Dashboard" },
  { href: ROUTES.myJournal, label: "Brews" },
  { href: ROUTES.beans, label: "Beans" },
];

export function JournalNav({ email }: { email?: string | null }) {
  const pathname = usePathname();

  // Exactly one active tab: the one whose href is the longest prefix of the
  // current path. Beans lives *under* the Brews path
  // (/account/journal/beans ⊂ /account/journal), so a plain startsWith lights
  // up both — longest-match wins resolves the nesting.
  const activeHref = TABS.map((t) => t.href)
    .filter((href) =>
      href === ROUTES.account
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/"),
    )
    .sort((a, b) => b.length - a.length)[0];

  return (
    <div className="border-b border-rule-cream bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-5 py-2.5 sm:px-8 sm:py-4 lg:px-12">
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.account}
            className="font-mono text-[12px] uppercase tracking-widest text-rust"
          >
            Nudo Journal
          </Link>
          <span
            lang="ja"
            className="font-ja text-[12px] tracking-wider text-ink/65"
          >
            · 日々
          </span>
        </div>
        {/* Tabs: own full-width row on phones, inline on ≥ sm */}
        <nav className="order-last -mx-1 flex w-full gap-1.5 overflow-x-auto px-1 sm:order-none sm:mx-0 sm:w-auto sm:px-0">
          {TABS.map((t) => {
            const active = t.href === activeHref;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-[36px] shrink-0 items-center rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  active
                    ? "bg-green text-cream"
                    : "text-ink/75 hover:bg-cream-paper"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <form action={ROUTES.signOut} method="post" className="flex items-center gap-3">
          {email && (
            <span className="hidden text-[12px] text-ink/65 sm:inline" title={email}>
              {email.length > 28 ? email.slice(0, 26) + "…" : email}
            </span>
          )}
          <button
            type="submit"
            className="rounded-full border border-rule-cream px-3 py-1.5 text-[12px] font-semibold text-ink/80 hover:border-green hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
