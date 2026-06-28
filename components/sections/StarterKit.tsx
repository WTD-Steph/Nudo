import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/links";

const ITEMS = [
  { nm: "Dosing Scoop", meta: "15 ml · Stainless 304", img: "/products/dosing-scoop.png" },
  { nm: "Tamping Mat", meta: "Minimalist · Silicone", img: "/products/tamping-mat.png" },
  { nm: "Smart Scale", meta: "0.1 g · Cube White", img: "/products/scale-cube.png" },
  { nm: "Sharing Pot", meta: "Glass · 300 / 450 ml", img: "/products/sharing-pot.png" },
];

export function StarterKit() {
  return (
    <section className="px-5 sm:px-8 lg:px-12 pb-20">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-[24px] bg-green p-6 text-cream sm:gap-12 sm:rounded-[32px] sm:p-10 lg:grid-cols-[1fr_420px] lg:px-12 lg:py-14">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 self-start rounded-full bg-mustard px-4 py-2 text-[14px] font-bold tracking-wide text-ink">
            ⚡ Most popular for first-timers
          </span>
          <h2 className="mb-4 text-balance text-[clamp(34px,8.5vw,72px)] font-bold leading-[0.98] tracking-[-0.035em] sm:leading-[0.95]">
            The kit that gets you to{" "}
            <em className="not-italic text-mustard">your first good shot.</em>
          </h2>
          <p className="mb-7 max-w-[460px] text-[17px] leading-snug text-cream/80">
            Dosing scoop, tamping mat, Cube scale, sharing pot, and a printed
            guide we wrote so you don&rsquo;t need to watch four YouTube videos
            before breakfast. Free shipping.
          </p>
          <div className="mb-7 flex items-baseline gap-3.5">
            <span className="text-[42px] font-bold tracking-tight">$92</span>
            <span className="text-lg text-cream/60 line-through">$112</span>
            <span className="rounded-full bg-mustard px-3 py-1 text-xs font-bold text-ink">
              Save 18%
            </span>
          </div>
          <Link
            href={ROUTES.firstBrewKit}
            className="inline-flex items-center gap-2.5 self-start rounded-full bg-cream px-6 py-4 text-[15px] font-bold text-ink no-underline transition hover:-translate-y-0.5"
          >
            Get the kit <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ITEMS.map((it) => (
            <div
              key={it.nm}
              className="flex flex-col gap-2.5 rounded-2xl border border-cream/10 bg-cream/[0.08] p-3.5"
            >
              <div className="relative aspect-square overflow-hidden rounded-[10px] bg-cream/5">
                <Image
                  src={it.img}
                  alt={it.nm}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="text-[13px] font-semibold">{it.nm}</div>
              <div className="font-mono text-[11px] tracking-wider text-cream/65">
                {it.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
