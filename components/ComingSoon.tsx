import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { DOMark } from "@/components/DOMark";
import { ROUTES } from "@/lib/links";

type Props = {
  title: string;
  eyebrow?: string;
  blurb?: string;
};

export function ComingSoon({ title, eyebrow, blurb }: Props) {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <section className="mx-auto flex max-w-[760px] flex-col items-center px-12 py-32 text-center">
          <DOMark size={72} variant="black" className="mb-8 opacity-30" />
          {eyebrow && (
            <div className="mb-3 font-mono text-[12px] uppercase tracking-widest text-rust">
              {eyebrow}
            </div>
          )}
          <h1 className="m-0 text-balance text-[clamp(40px,5vw,72px)] font-bold leading-[0.95] tracking-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-[480px] text-[17px] leading-snug text-ink/70">
            {blurb ??
              "We're writing this next. Want a nudge when it lands? Drop your email at the bottom of the page — or just poke around what we've finished."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ROUTES.shop}
              className="rounded-full bg-green px-6 py-3 text-[15px] font-semibold text-cream hover:-translate-y-0.5"
            >
              Shop the basics →
            </Link>
            <Link
              href={ROUTES.home}
              className="rounded-full border-[1.5px] border-green px-6 py-3 text-[15px] font-semibold text-ink hover:bg-green hover:text-cream"
            >
              Back home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
