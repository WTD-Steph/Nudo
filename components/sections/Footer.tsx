import Link from "next/link";
import { Wordmark } from "../Wordmark";
import { DOMark } from "../DOMark";
import { FOOTER_COLS, ROUTES } from "@/lib/links";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green px-12 py-20 text-cream">
      {/* Large faded logomark in the corner — brand-signature mark. */}
      <DOMark
        size={520}
        variant="white"
        className="pointer-events-none absolute -bottom-24 -right-24 opacity-[0.06]"
      />

      <div className="grid gap-12 border-b border-rule-green pb-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link href={ROUTES.home} aria-label="Nudo Lab home" className="mb-5 inline-block">
            <Wordmark height={44} variant="cream" />
          </Link>
          <p className="m-0 max-w-[320px] text-[15px] leading-snug text-cream/60">
            For every first brews. Friendly brewing tools for beginners. Part
            of the WTD family.
          </p>
          <p className="mt-4 max-w-[320px] text-[14px] leading-snug text-cream/55">
            <strong className="font-semibold text-cream">Outgrown the basics?</strong>{" "}
            Meet{" "}
            <Link
              href={ROUTES.makker}
              className="text-mustard underline-offset-4 hover:underline"
            >
              Makker
            </Link>{" "}
            — our refined-tools brand for makers ready to upgrade. →
          </p>
        </div>
        {FOOTER_COLS.map((c) => (
          <div key={c.h}>
            <h4 className="m-0 mb-4 text-xs font-semibold uppercase tracking-widest text-cream/50">
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
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-cream/50">
        <span>© {new Date().getFullYear()} Nudo Lab · For every first brews.</span>
        <span lang="ja" className="font-ja">ヌードラボ · 初心者向け</span>
      </div>
    </footer>
  );
}
