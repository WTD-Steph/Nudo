import Link from "next/link";
import { Wordmark } from "../Wordmark";
import { DOMark } from "../DOMark";
import { FOOTER_COLS, ROUTES } from "@/lib/links";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green px-5 sm:px-8 lg:px-12 py-20 text-cream">
      {/* Large faded logomark in the corner — brand-signature mark. */}
      <DOMark
        size={520}
        variant="white"
        className="pointer-events-none absolute -bottom-24 -right-24 opacity-[0.06]"
      />

      <div className="grid gap-10 border-b border-rule-green pb-14 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={ROUTES.home} aria-label="Nudo Lab home" className="mb-5 inline-block">
            <Wordmark height={44} variant="cream" />
          </Link>
          <p className="m-0 max-w-[320px] text-[15px] leading-snug text-cream/75">
            For every first brews. Friendly brewing tools for beginners.
            Designed in Tokyo, shipped worldwide from Singapore.
          </p>
          <p className="mt-4 max-w-[320px] text-[14px] leading-snug text-cream/80">
            <strong className="font-semibold text-cream">Outgrown the basics?</strong>{" "}
            Meet{" "}
            <Link
              href={ROUTES.exakt}
              className="text-mustard underline underline-offset-4"
            >
              Exakt
            </Link>{" "}
            — our refined-tools brand for makers ready to upgrade. →
          </p>
        </div>
        {FOOTER_COLS.map((c) => (
          <div key={c.h}>
            <h4 className="m-0 mb-4 text-xs font-semibold uppercase tracking-widest text-cream/80">
              {c.h}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {c.items.map((it) => (
                <li key={it.label}>
                  <Link href={it.href} className="text-sm text-cream no-underline hover:text-mustard">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-cream/80">
        <span>© {new Date().getFullYear()} Nudo Lab · For every first brews.</span>
        <span lang="ja" className="font-ja">ヌードラボ · 初心者向け</span>
      </div>
    </footer>
  );
}
