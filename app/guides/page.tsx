import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { GUIDES } from "@/lib/guides";
import { ROUTES } from "@/lib/links";

export const metadata = {
  title: "Guides",
  description:
    "Plain-English coffee writing for people just starting out. First-brew guide, glossary, care, and the honest list of things that go wrong.",
};

const CARD_TONE = [
  "bg-green text-cream",
  "bg-cream-paper text-ink",
  "bg-sand text-ink",
  "bg-mustard text-ink",
] as const;

export default function GuidesPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <header className="px-5 sm:px-8 lg:px-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Guides · {GUIDES.length} pieces
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              Plain English. <em className="not-italic text-rust">One cup at a time.</em>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              No 14-minute videos, no &ldquo;well, actually.&rdquo; The four
              things we think every beginner needs to read once.
            </p>
          </div>
        </header>

        <section className="px-5 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-2">
            {GUIDES.map((g, i) => (
              <Link
                key={g.slug}
                href={ROUTES.guide(g.slug)}
                className={`group relative flex flex-col rounded-[22px] p-10 transition hover:-translate-y-1 ${CARD_TONE[i % CARD_TONE.length]}`}
              >
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-70">
                  {g.category} · {g.readingTimeMin} min read
                </div>
                <h2 className="m-0 mt-3 text-balance text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-tight">
                  {g.title}
                </h2>
                <p className="mt-4 text-[15px] leading-snug opacity-80">
                  {g.dek}
                </p>
                <span className="mt-6 inline-block text-[14px] font-semibold opacity-90 group-hover:underline">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
