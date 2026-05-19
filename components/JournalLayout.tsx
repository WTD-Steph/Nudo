import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ROUTES } from "@/lib/links";
import { type Post } from "@/lib/journal";

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

type Props = { post: Post; children: React.ReactNode };

export function JournalLayout({ post, children }: Props) {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <header className="px-12 pt-16">
          <div className="mx-auto max-w-[760px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink/60">
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <Link href={ROUTES.journal}>Journal</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{post.title}</span>
            </nav>
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-rust">
              <span>{TONE_LABEL[post.tone]}</span>
              <span className="text-ink/30">·</span>
              <span className="text-ink/50">{fmtDate(post.publishedAt)}</span>
              <span className="text-ink/30">·</span>
              <span className="text-ink/50">
                {post.readingTimeMin} min read
              </span>
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(36px,5vw,72px)] font-bold leading-[0.98] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 max-w-[640px] text-balance text-[clamp(17px,2vw,20px)] leading-snug text-ink/70">
              {post.dek}
            </p>
            <p className="mt-5 text-[14px] text-ink/50">By {post.author}.</p>
          </div>
        </header>

        <article className="px-12 py-12">
          <div className="mx-auto max-w-[760px] [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-balance [&_h2]:text-[clamp(22px,2.4vw,30px)] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight [&_p]:mt-4 [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-ink/80 [&_blockquote]:my-8 [&_blockquote]:rounded-[22px] [&_blockquote]:bg-sand [&_blockquote]:p-8 [&_blockquote]:text-[18px] [&_blockquote]:italic [&_blockquote]:leading-snug">
            {children}
          </div>
        </article>

        <section className="border-t border-rule-cream px-12 py-16">
          <div className="mx-auto max-w-[760px] text-center">
            <Link
              href={ROUTES.journal}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-green px-6 py-3 text-[14px] font-semibold text-ink hover:bg-green hover:text-cream"
            >
              ← All journal entries
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
