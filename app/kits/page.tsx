import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import {
  DripBagSilhouette,
  SensoryCupSilhouette,
} from "@/components/Silhouettes";
import { KITS, type Kit } from "@/lib/kits";
import { getProduct } from "@/lib/products";
import { ROUTES } from "@/lib/links";

export const metadata = {
  title: "Kits",
  description:
    "Three curated bundles — First-Brew, Pour-Over, Sensory. Each is the box we'd hand a friend on the day they decided to take this seriously.",
};

function KitThumbStrip({ kit }: { kit: Kit }) {
  return (
    <div className="mt-6 flex -space-x-3">
      {kit.items.slice(0, 5).map((slug, i) => {
        const p = getProduct(slug);
        if (!p) return null;
        const isSilhouette = p.silhouette;
        return (
          <div
            key={slug}
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cream bg-sand"
            style={{ zIndex: 10 - i }}
          >
            {isSilhouette === "sensory-cup" ? (
              <SensoryCupSilhouette
                className="absolute inset-1"
                aria-label={p.name}
              />
            ) : isSilhouette === "drip-bag" ? (
              <DripBagSilhouette
                className="absolute inset-1"
                aria-label={p.name}
              />
            ) : (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function KitsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-cream">
        <header className="px-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Kits · {KITS.length} bundles
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              The shortest path to a{" "}
              <em className="not-italic text-rust">good first cup.</em>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              Three curated bundles. Each is the box we&rsquo;d hand a friend
              on the day they decided to take this seriously. Every piece is
              also shoppable individually.
            </p>
          </div>
        </header>

        <section className="px-12 py-16">
          <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {KITS.map((kit) => (
              <Link
                key={kit.slug}
                href={ROUTES.kit(kit.slug)}
                className="group relative flex flex-col rounded-[22px] bg-cream-paper p-7 transition hover:-translate-y-1"
              >
                {kit.tag && (
                  <span className="absolute right-5 top-5 rounded-full bg-mustard px-2.5 py-1 text-[11px] font-semibold text-ink">
                    {kit.tag.label}
                  </span>
                )}
                {kit.jaSubtitle && (
                  <div
                    lang="ja"
                    className="font-ja text-[13px] tracking-wider text-rust"
                  >
                    {kit.jaSubtitle}
                  </div>
                )}
                <h2 className="m-0 mt-2 text-[clamp(26px,2.8vw,36px)] font-bold leading-tight tracking-tight">
                  {kit.name}
                </h2>
                <p className="mt-3 text-[15px] leading-snug text-ink/70">
                  {kit.dek}
                </p>

                <KitThumbStrip kit={kit} />

                <div className="mt-auto flex items-baseline gap-3 pt-6">
                  <span className="text-[24px] font-bold">{kit.price}</span>
                  <span className="text-[14px] text-ink/40 line-through">
                    {kit.alaCarte}
                  </span>
                  <span className="rounded-full bg-mustard px-2 py-0.5 text-[11px] font-semibold text-ink">
                    {kit.savings}
                  </span>
                </div>
                <span className="mt-4 inline-block text-[14px] font-semibold text-green group-hover:underline">
                  See what&rsquo;s in it →
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
