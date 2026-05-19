import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { getGlossarySorted, type GlossaryEntry } from "@/lib/glossary";
import { ROUTES, CONTACT_EMAIL } from "@/lib/links";

export const metadata = {
  title: "Coffee words, explained",
  description:
    "Every coffee term we use on this site, in one sentence each. Plain English, no gatekeeping.",
};

function groupByLetter(entries: GlossaryEntry[]) {
  const groups = new Map<string, GlossaryEntry[]>();
  for (const e of entries) {
    const letter = e.term.charAt(0).toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(e);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function GlossaryPage() {
  const groups = groupByLetter(getGlossarySorted());
  const letters = groups.map(([l]) => l);

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <header className="px-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <Link href={ROUTES.guides}>Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Coffee words</span>
            </nav>
            <div className="mt-8 font-mono text-[12px] uppercase tracking-widest text-rust">
              Reference · {getGlossarySorted().length} terms
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,80px)] font-bold leading-[0.98] tracking-tight">
              Coffee words, <em className="not-italic text-rust">explained.</em>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              Coffee has its own vocabulary. Most of it sounds harder than it
              is. Here&rsquo;s every word we use on this site, in one sentence
              each. If we missed one,{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Glossary%20term`}
                className="font-semibold text-ink underline decoration-mustard decoration-2 underline-offset-4"
              >
                tell us
              </a>{" "}
              and we&rsquo;ll add it.
            </p>
          </div>
        </header>

        {/* Letter jump-bar */}
        <nav
          aria-label="Jump to letter"
          className="sticky top-[64px] z-20 border-b border-rule-cream bg-cream/95 px-12 py-3 backdrop-blur"
        >
          <div className="mx-auto flex max-w-[920px] flex-wrap gap-1 text-[13px]">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="rounded-md px-2 py-1 font-mono font-semibold text-ink/75 hover:bg-sand hover:text-ink"
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        {/* Entries */}
        <section className="px-12 py-12">
          <div className="mx-auto max-w-[920px]">
            {groups.map(([letter, entries]) => (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-32">
                <h2 className="mb-6 font-mono text-[14px] uppercase tracking-widest text-rust">
                  {letter}
                </h2>
                <dl className="grid gap-6 md:grid-cols-2">
                  {entries.map((e) => (
                    <div
                      key={e.slug}
                      id={e.slug}
                      className="scroll-mt-32 rounded-[14px] bg-cream-paper p-6"
                    >
                      <dt className="text-[20px] font-bold tracking-tight">
                        {e.term}
                      </dt>
                      <dd className="mt-2 text-[15px] leading-snug text-ink/80">
                        {e.short}
                      </dd>
                      {e.long && (
                        <dd className="mt-2 text-[14px] leading-snug text-ink/75">
                          {e.long}
                        </dd>
                      )}
                      {e.see && e.see.length > 0 && (
                        <dd className="mt-3 flex flex-wrap gap-2 text-[12px]">
                          <span className="text-ink/60">See also:</span>
                          {e.see.map((s) => (
                            <a
                              key={s}
                              href={`#${s}`}
                              className="text-rust underline-offset-2 hover:underline"
                            >
                              {s.replace(/-/g, " ")}
                            </a>
                          ))}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
