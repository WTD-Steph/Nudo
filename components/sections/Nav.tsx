import Link from "next/link";
import { Wordmark } from "../Wordmark";
import { NAV_LINKS, ROUTES } from "@/lib/links";

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center bg-cream/95 px-12 py-5 backdrop-blur">
      <div className="flex gap-7 text-sm font-medium">
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
        <Link href={ROUTES.signIn} className="text-ink hover:text-rust">
          Sign in
        </Link>
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
    </nav>
  );
}
