import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { DOMark } from "@/components/DOMark";
import { ROUTES, CONTACT_EMAIL, IG_URL } from "@/lib/links";

export const metadata = {
  title: "About — Nudo Lab",
  description:
    "Friendly brewing tools for beginners. Made by WTD. The story behind the rename, the brand, and the team.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        {/* Hero */}
        <section className="px-12 pb-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              About · For every first brews
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              We started Nudo because{" "}
              <em className="not-italic text-rust">starting</em> was the hardest part.
            </h1>
          </div>
        </section>

        {/* The story */}
        <section className="px-12 py-12">
          <div className="mx-auto grid max-w-[920px] gap-6 text-[18px] leading-relaxed text-ink/80">
            <p>
              The shelf is full of equipment that makes coffee feel like a
              hobby for someone else. The forums gatekeep. The YouTube videos
              assume you already know what a portafilter is. We didn&rsquo;t
              either.
            </p>
            <p>
              Nudo Lab is the tools and the guides we wish we&rsquo;d had —
              the ones that say{" "}
              <em className="not-italic font-semibold">ok, you got this</em>{" "}
              instead of{" "}
              <em className="not-italic font-semibold">well, actually…</em>
            </p>
            <p>
              We make starter tools — dosing cups, distributors, scales,
              dripper kits — that get you to a good first cup at home. We
              don&rsquo;t pretend we machine them in a workshop above an
              espresso bar. We work with OEMs we trust, we test everything,
              and we sell the things we&rsquo;d give a friend on their first
              day. That&rsquo;s the whole standard.
            </p>
          </div>
        </section>

        {/* WTD → Nudo rename */}
        <section className="px-12 py-12">
          <div className="mx-auto max-w-[920px] rounded-[22px] bg-cream-paper p-10">
            <h2 className="m-0 text-[clamp(28px,3vw,44px)] font-bold leading-tight tracking-tight">
              About the name.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
              Our parent company is{" "}
              <strong className="font-semibold text-ink">WTD</strong> (The
              Daily). We rebranded from &ldquo;WTD Lab&rdquo; to Nudo Lab
              because the old name had two problems: nobody could remember
              what the acronym stood for, and &ldquo;WTD&rdquo; sounded too
              much like <strong>WDT</strong> — a piece of coffee jargon our
              customers were trying to escape.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              So we changed it. We&rsquo;d rather have a name you remember
              than one we have to keep explaining.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
              In Japanese:{" "}
              <span lang="ja" className="font-ja text-ink/80">
                ヌードラボ
              </span>{" "}
              (nuudorabo) ·{" "}
              <span lang="ja" className="font-ja text-ink/80">
                初心者向け
              </span>{" "}
              (shoshinsha-muke, &ldquo;for beginners&rdquo;) — both appear on
              our packaging.
            </p>
          </div>
        </section>

        {/* What we make */}
        <section className="px-12 py-12">
          <div className="mx-auto grid max-w-[920px] gap-6 text-[18px] leading-relaxed text-ink/80">
            <h2 className="m-0 text-[clamp(28px,3vw,44px)] font-bold leading-tight tracking-tight">
              What we make. And what we don&rsquo;t.
            </h2>
            <p>
              We make starter tools. OEM-based, tested, friendly to use, easy
              to recommend. They&rsquo;re not custom-machined. They&rsquo;re
              not heirloom objects. They&rsquo;re the gear you start with and
              graduate from.
            </p>
            <p>
              When you&rsquo;ve outgrown a starter scale and you want
              something with a faster refresh rate and a steel body — that&rsquo;s
              when you graduate to{" "}
              <Link
                href={ROUTES.makker}
                className="border-b-2 border-mustard pb-0.5 font-semibold text-ink"
              >
                Makker
              </Link>{" "}
              , our sibling brand for makers ready to upgrade. Same team,
              different shelf.
            </p>
          </div>
        </section>

        {/* Meet Makker */}
        <section className="px-12 py-12">
          <div className="mx-auto max-w-[920px]">
            <Link
              href={ROUTES.makker}
              className="group flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-green p-10 text-cream transition hover:-translate-y-0.5"
            >
              <div className="max-w-[520px]">
                <div className="font-mono text-[11px] uppercase tracking-widest text-mustard">
                  Sibling brand
                </div>
                <h3 className="m-0 mt-2 text-[clamp(28px,3vw,40px)] font-bold leading-tight tracking-tight">
                  When you&rsquo;ve outgrown Nudo.
                </h3>
                <p className="mt-3 text-[15px] text-cream/70">
                  Same team, same standards of honesty. Different shelf.
                </p>
              </div>
              <span className="text-[15px] font-semibold text-mustard group-hover:underline">
                Read about Makker →
              </span>
            </Link>
          </div>
        </section>

        {/* Where to find us */}
        <section className="border-t border-rule-cream px-12 py-16">
          <div className="mx-auto grid max-w-[920px] gap-8 md:grid-cols-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Studio
              </div>
              <p className="mt-2 text-[16px] leading-snug">
                Brewed and packed somewhere with bad parking.
                <br />
                <span className="text-ink/60">Indonesia · 06:40 local.</span>
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Email
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 block text-[16px] font-semibold underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-1 text-[14px] text-ink/60">
                A real person replies within a day.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Instagram
              </div>
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-[16px] font-semibold underline-offset-4 hover:underline"
              >
                @nudolab
              </a>
              <p className="mt-1 text-[14px] text-ink/60">
                First brews, behind the scenes, the occasional bad shot.
              </p>
            </div>
          </div>
        </section>

        {/* Signoff with logomark */}
        <section className="px-12 py-16">
          <div className="mx-auto flex max-w-[920px] flex-col items-center gap-6 text-center">
            <DOMark size={56} variant="black" className="opacity-30" />
            <p className="m-0 text-[15px] font-semibold">— The Nudo team</p>
            <p className="m-0 text-[14px] text-ink/60" lang="ja">
              ヌードラボ · 初心者向け
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
