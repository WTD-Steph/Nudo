import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/links";

export function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-14 px-12 pb-20 pt-8 lg:grid-cols-[1fr_540px]">
      <div>
        <div className="mb-7 inline-flex items-center gap-3 self-start rounded-full bg-sand px-3.5 py-1.5 text-[13px] font-semibold">
          <span className="text-base">👋</span> Hi — first time here?
          <span lang="ja" className="border-l border-green/15 pl-3 font-mono text-[11px] font-normal text-ink/55">
            ヌードラボ · 初心者向け
          </span>
        </div>
        <h1 className="m-0 text-balance text-[clamp(72px,9.5vw,148px)] font-bold leading-[0.92] tracking-[-0.045em]">
          For every <br />
          <span className="hl-underline">first brews.</span>
        </h1>
        <p className="mb-8 mt-8 max-w-[520px] text-lg leading-snug text-ink/70">
          Friendly brewing tools for beginners who want to learn, experiment,
          and enjoy coffee without the pressure. Because great coffee
          doesn&rsquo;t have to be complicated.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={ROUTES.kits}
            className="inline-flex items-center gap-2.5 rounded-full bg-green px-6 py-4 text-[15px] font-semibold text-cream transition hover:-translate-y-0.5"
          >
            Shop starter kits <span>→</span>
          </Link>
          <Link
            href={ROUTES.firstBrewGuide}
            className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-green bg-transparent px-6 py-4 text-[15px] font-semibold text-ink hover:bg-green hover:text-cream"
          >
            First-brew guide
          </Link>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
        <Image
          src="/products/dosing-cup.png"
          alt="Nudo first-brew kit"
          fill
          sizes="(max-width: 1024px) 100vw, 540px"
          priority
          className="object-cover"
        />
        <span className="absolute right-[22px] top-[22px] rounded-full bg-green px-3.5 py-2 text-xs font-semibold tracking-wide text-cream">
          For every first brews
        </span>
        <div className="absolute inset-x-[22px] bottom-[22px] flex items-center justify-between rounded-full bg-cream/95 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-ink backdrop-blur">
          <span>First-Brew Kit</span>
          <b className="font-bold">NL-001</b>
        </div>
      </div>
    </section>
  );
}
