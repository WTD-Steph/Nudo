import { Wordmark } from "../Wordmark";

const COLS = [
  {
    h: "Shop",
    items: [
      "All products",
      "Espresso",
      "Pour-over",
      "Drip bags",
      "Starter kits",
      "Gift cards",
    ],
  },
  {
    h: "Learn",
    items: [
      "First-brew guide",
      "Coffee words, explained",
      "Care & cleaning",
      "Journal",
    ],
  },
  {
    h: "Help",
    items: [
      "Shipping & returns",
      "Track an order",
      "Contact us",
      "About Nudo Lab",
      "About Makker",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal px-12 py-20 text-cream">
      <div className="grid gap-12 border-b border-rule-charcoal pb-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-5">
            <Wordmark size={44} color="var(--nl-cream)" dotColor="var(--nl-warm)" />
          </div>
          <p className="m-0 max-w-[320px] text-[15px] leading-snug text-cream/60">
            For every first brews. Friendly brewing tools for beginners. Part
            of the WTD family.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream/[0.08] px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fb47a]" />
            In stock · ships in 48h
          </span>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <h4 className="m-0 mb-4 text-xs font-semibold uppercase tracking-widest text-cream/50">
              {c.h}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-cream no-underline">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-cream/50">
        <span>© 2026 Nudo Lab · For every first brews.</span>
        <div className="flex gap-2.5">
          {["VISA", "MC", "AMEX", "APPLE", "SHOP"].map((p) => (
            <span
              key={p}
              className="rounded-md bg-cream/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-wider"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
