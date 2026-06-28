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

  return (
    <div className="border-b border-rule-cream bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-12 py-4">
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
        <nav className="flex flex-wrap gap-1.5">
          {TABS.map((t) => {
            const active =
              pathname === t.href ||
              (t.href !== ROUTES.account && pathname.startsWith(t.href));
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
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
            <span className="text-[12px] text-ink/65" title={email}>
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
