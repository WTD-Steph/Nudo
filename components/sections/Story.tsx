import Link from "next/link";
import { ROUTES } from "@/lib/links";

export function Story() {
  return (
    <section className="grid items-center gap-16 border-t border-rule-cream px-12 py-20 lg:grid-cols-[460px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-cream-paper">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(227,173,85,0.5), transparent 55%), repeating-linear-gradient(135deg, transparent 0 24px, rgba(26,26,26,0.05) 24px 25px)",
          }}
        />
        <span className="absolute bottom-[22px] left-[22px] rounded-full bg-cream px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest">
          Studio · 06:40
        </span>
      </div>
      <div>
        <h2 className="m-0 mb-6 text-balance text-[64px] font-bold leading-none tracking-[-0.035em]">
          We started Nudo because{" "}
          <em className="not-italic text-rust">starting</em> was the hardest
          part.
        </h2>
        <p className="m-0 mb-4 max-w-[540px] text-[17px] leading-relaxed text-ink/70">
          The shelf is full of equipment that makes coffee feel like a hobby
          for someone else. The forums gatekeep. The YouTube videos assume you
          already know what a portafilter is. We didn&rsquo;t.
        </p>
        <p className="m-0 mb-4 max-w-[540px] text-[17px] leading-relaxed text-ink/70">
          Nudo Lab is the tools and the guides we wish we&rsquo;d had — the
          ones that say{" "}
          <em className="not-italic">ok, you got this</em> instead of{" "}
          <em className="not-italic">well, actually...</em>
        </p>
        <div className="mt-6 text-[15px] font-semibold">
          — The Nudo team
          <small className="mt-0.5 block font-normal text-ink/40">
            Brewed and packed somewhere with bad parking
          </small>
        </div>
        <Link
          href={ROUTES.about}
          className="mt-5 inline-flex items-center gap-2 border-b-2 border-mustard pb-1 text-[15px] font-semibold text-ink no-underline"
        >
          Read our story →
        </Link>
      </div>
    </section>
  );
}
