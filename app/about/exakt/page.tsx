import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ExaktComparison } from "@/components/ExaktComparison";
import { ROUTES, EXAKT_URL } from "@/lib/links";

export const metadata = {
  title: "When you've outgrown Nudo — meet Exakt",
  description:
    "Nudo Lab is for the first six months of your coffee journey. When you're ready for refined tools and better materials, there's Exakt — our sibling brand for makers.",
};

export default function ExaktBridgePage() {
  const exaktHref = EXAKT_URL !== "#" ? EXAKT_URL : ROUTES.about;

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        {/* Hero */}
        <section className="px-5 sm:px-8 lg:px-12 pb-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Sibling brand · Exakt
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              When you&rsquo;ve outgrown Nudo.
            </h1>
            <p className="mt-4 text-balance text-[clamp(18px,2vw,24px)] italic leading-snug text-ink/70">
              Because that&rsquo;s the whole point.
            </p>
          </div>
        </section>

        {/* The pitch */}
        <section className="px-5 sm:px-8 lg:px-12 py-12">
          <div className="mx-auto grid max-w-[920px] gap-6 text-[18px] leading-relaxed text-ink/80">
            <p>
              Nudo was made for the first six months of your coffee journey.
              The first basket. The first scale. The first time you pull a
              shot that doesn&rsquo;t taste burnt.
            </p>
            <p>
              Eventually, you&rsquo;ll want better materials. A tamper
              that&rsquo;s actually weighted right. A scale with a refresh
              rate you can trust on flow. That&rsquo;s Exakt.
            </p>
            <p>
              We made Exakt so you wouldn&rsquo;t have to leave us when you
              got serious. Same team, different standard.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-5 sm:px-8 lg:px-12 py-12">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="m-0 mb-8 text-[clamp(28px,3vw,44px)] font-bold leading-tight tracking-tight">
              How they&rsquo;re different.
            </h2>
            <ExaktComparison />
          </div>
        </section>

        {/* Signals you're ready */}
        <section className="px-5 sm:px-8 lg:px-12 py-12">
          <div className="mx-auto max-w-[920px] rounded-[22px] bg-sand p-10">
            <div className="font-mono text-[12px] font-semibold uppercase tracking-widest text-green">
              Honest signals
            </div>
            <h3 className="m-0 mt-3 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
              You might be ready for Exakt if…
            </h3>
            <ul className="mt-6 flex flex-col gap-3 text-[16px] leading-snug">
              {[
                "You can tell the difference between two grind sizes in the cup.",
                "You weigh in, weigh out, and time every shot — and your numbers are consistent.",
                "You've started thinking about water chemistry without us telling you to.",
                "Your gear has started to feel slightly cheap for how much you use it.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rust" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] italic leading-snug text-ink/75">
              Still here at four months? Stay. We&rsquo;re glad to have you.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section className="px-5 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto max-w-[920px]">
            <div className="rounded-[22px] bg-green p-10 text-cream">
              <p className="m-0 text-[15px] leading-snug text-cream/80">
                Same team. Same standards of honesty. Different shelf.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={exaktHref}
                  {...(EXAKT_URL !== "#"
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-[15px] font-bold text-ink hover:-translate-y-0.5"
                >
                  Visit Exakt →
                </Link>
                <Link
                  href={ROUTES.shop}
                  className="inline-flex items-center rounded-full border border-cream/40 px-6 py-3 text-[15px] font-semibold text-cream hover:bg-cream hover:text-ink"
                >
                  Stay with the basics
                </Link>
              </div>
              {EXAKT_URL === "#" && (
                <p className="mt-4 text-[12px] text-cream/65">
                  Exakt&rsquo;s site is still under wraps. We&rsquo;ll link it
                  here the moment it lands.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
