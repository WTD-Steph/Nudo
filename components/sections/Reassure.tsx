import Link from "next/link";
import { ROUTES } from "@/lib/links";

const CARDS = [
  {
    num: "01",
    title: "The lingo.",
    body:
      "Channeling, distribution, retention — we explain everything in plain English. If we use a coffee word, we tell you what it means.",
    feat: false,
  },
  {
    num: "02",
    title: "The first try.",
    body:
      "Your first shot will be bad. That’s normal — even expected. Our tools and guides make the second one noticeably better.",
    feat: true,
  },
  {
    num: "03",
    title: "The price tag.",
    body:
      "Starter doesn’t mean cheap-feeling. Every Nudo piece is the one we’d hand a friend — tested, reliable, and not overbuilt.",
    feat: false,
  },
];

export function Reassure() {
  return (
    <section className="px-12 py-20">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="m-0 max-w-[720px] text-balance text-[56px] font-bold leading-[1.02] tracking-[-0.03em]">
          Three things you don&rsquo;t need to be{" "}
          <em className="not-italic text-rust">intimidated</em> by.
        </h2>
        <div className="text-right font-mono text-[13px] uppercase tracking-wider text-ink/80">
          No-gatekeep zone
          <br />
          Brewed since 2025
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.num}
            className={`flex min-h-[280px] flex-col justify-between gap-4 rounded-[22px] p-7 pb-8 ${
              c.feat ? "bg-green text-cream" : "bg-cream-paper text-ink"
            }`}
          >
            <div
              aria-hidden="true"
              className={`text-[64px] font-bold leading-none tracking-[-0.04em] ${
                c.feat ? "text-cream/50" : "text-ink/50"
              }`}
            >
              {c.num}
            </div>
            <div>
              <h3 className="m-0 text-[26px] font-bold leading-[1.15] tracking-tight">
                {c.title}
              </h3>
              <p
                className={`mt-2 text-[15px] leading-snug ${
                  c.feat ? "text-cream/75" : "text-ink/70"
                }`}
              >
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={ROUTES.contact}
        className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-mustard px-7 py-5 text-ink transition hover:-translate-y-0.5"
      >
        <span className="text-[15px] font-semibold">
          Still anxious? Email us. A real person replies within a day.
        </span>
        <span className="text-[14px] font-bold">Say hi →</span>
      </Link>
    </section>
  );
}
