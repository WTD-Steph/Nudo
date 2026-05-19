import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { getPostsSorted } from "@/lib/journal";
import { ROUTES } from "@/lib/links";

export const metadata = {
  title: "Journal",
  description:
    "Notes from the Nudo studio. Operations, advice, and the occasional opinion about coffee that nobody asked for.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TONE_LABEL = {
  ops: "Operations",
  advice: "Advice",
  voice: "Voice",
} as const;

export default function JournalPage() {
  const posts = getPostsSorted();

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <header className="px-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Journal · {posts.length} pieces
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              What we&rsquo;re learning, <em className="not-italic text-rust">packed in writing.</em>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              Operations notes from the studio. Honest advice — sometimes
              about other people&rsquo;s products. Pieces about starting.
            </p>
          </div>
        </header>

        <section className="px-12 py-16">
          <div className="mx-auto max-w-[920px]">
            <ul className="flex flex-col gap-0 divide-y divide-rule-cream">
              {posts.map((p) => (
                <li key={p.slug} className="py-8">
                  <Link
                    href={ROUTES.journalPost(p.slug)}
                    className="group block"
                  >
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-rust">
                      <span>{TONE_LABEL[p.tone]}</span>
                      <span className="text-ink/30">·</span>
                      <span className="text-ink/50">{fmtDate(p.publishedAt)}</span>
                      <span className="text-ink/30">·</span>
                      <span className="text-ink/50">
                        {p.readingTimeMin} min read
                      </span>
                    </div>
                    <h2 className="m-0 mt-3 text-balance text-[clamp(28px,3vw,40px)] font-bold leading-tight tracking-tight group-hover:text-rust">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-[640px] text-[16px] leading-snug text-ink/70">
                      {p.dek}
                    </p>
                    <span className="mt-4 inline-block text-[14px] font-semibold text-green group-hover:underline">
                      Read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
