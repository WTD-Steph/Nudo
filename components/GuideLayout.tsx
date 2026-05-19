import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ROUTES } from "@/lib/links";
import { type Guide } from "@/lib/guides";

type Props = {
  guide: Guide;
  related?: Guide[];
  children: React.ReactNode;
};

export function GuideLayout({ guide, related = [], children }: Props) {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        {/* Header */}
        <header className="px-12 pt-16">
          <div className="mx-auto max-w-[760px]">
            <nav
              aria-label="Breadcrumb"
              className="text-[13px] text-ink/60"
            >
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <Link href={ROUTES.guides}>Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{guide.title}</span>
            </nav>

            <div className="mt-8 font-mono text-[12px] uppercase tracking-widest text-rust">
              Guide · {guide.readingTimeMin} min read
            </div>

            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,80px)] font-bold leading-[0.98] tracking-tight">
              {guide.title}
            </h1>

            {guide.dek && (
              <p className="mt-5 text-balance text-[clamp(18px,2vw,22px)] leading-snug text-ink/70">
                {guide.dek}
              </p>
            )}
          </div>
        </header>

        {/* Body — Urbanist 18px, generous leading, ~70ch max */}
        <article className="px-12 py-12">
          <div className="mx-auto max-w-[760px] [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-balance [&_h2]:text-[clamp(24px,2.6vw,34px)] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:tracking-tight [&_p]:mt-4 [&_p]:text-[18px] [&_p]:leading-[1.65] [&_p]:text-ink/80 [&_ul]:mt-4 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:pl-0 [&_ol]:mt-4 [&_ol]:flex [&_ol]:list-none [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-[17px] [&_li]:leading-snug [&_li]:text-ink/80 [&_li>span:first-child]:mt-2 [&_li>span:first-child]:inline-block [&_li>span:first-child]:h-2 [&_li>span:first-child]:w-2 [&_li>span:first-child]:flex-shrink-0 [&_li>span:first-child]:rounded-full [&_li>span:first-child]:bg-rust [&_blockquote]:my-8 [&_blockquote]:rounded-[22px] [&_blockquote]:bg-sand [&_blockquote]:p-8 [&_blockquote]:text-[20px] [&_blockquote]:font-semibold [&_blockquote]:leading-snug [&_blockquote]:tracking-tight">
            {children}
          </div>
        </article>

        {/* Footer — related */}
        {related.length > 0 && (
          <section className="border-t border-rule-cream px-12 py-16">
            <div className="mx-auto max-w-[760px]">
              <h2 className="m-0 mb-6 text-[clamp(22px,2.4vw,32px)] font-bold leading-tight tracking-tight">
                Keep going.
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={ROUTES.guide(r.slug)}
                    className="group rounded-[22px] bg-cream-paper p-6 transition hover:-translate-y-0.5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                      {r.readingTimeMin} min read
                    </div>
                    <h3 className="mt-2 text-[20px] font-bold leading-tight tracking-tight">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-snug text-ink/70">
                      {r.dek}
                    </p>
                    <span className="mt-3 inline-block text-[13px] font-semibold text-green group-hover:underline">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
