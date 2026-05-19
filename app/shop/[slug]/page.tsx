import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import {
  DripBagSilhouette,
  SensoryCupSilhouette,
} from "@/components/Silhouettes";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, productLd } from "@/lib/seo";
import { getProduct, getProducts, type Product } from "@/lib/products";
import { ROUTES } from "@/lib/links";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.name,
    description: p.desc,
    openGraph: {
      title: p.name,
      description: p.desc,
      images: [
        `/og?title=${encodeURIComponent(p.name)}&eyebrow=${encodeURIComponent(p.jaSubtitle ?? "Shop")}`,
      ],
    },
  };
}

function HeroImage({ p }: { p: Product }) {
  if (p.silhouette === "sensory-cup") {
    return (
      <SensoryCupSilhouette
        className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
        aria-label={p.name}
      />
    );
  }
  if (p.silhouette === "drip-bag") {
    return (
      <DripBagSilhouette
        className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
        aria-label={p.name}
      />
    );
  }
  return (
    <Image
      src={p.image}
      alt={p.name}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 600px"
      className="object-cover"
    />
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const crossSell = (p.crossSell ?? [])
    .map(getProduct)
    .filter((x): x is Product => !!x);

  return (
    <>
      <JsonLd
        data={[
          productLd(p),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Shop", href: ROUTES.shop },
            { name: p.name, href: ROUTES.product(p.slug) },
          ]),
        ]}
      />
      <Nav />
      <main id="main-content" className="bg-cream">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1280px] px-12 pt-8 text-[13px] text-ink/60"
        >
          <Link href={ROUTES.home}>Home</Link>
          <span className="mx-2">/</span>
          <Link href={ROUTES.shop}>Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>

        {/* Hero */}
        <section className="mx-auto grid max-w-[1280px] gap-12 px-12 py-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[22px] bg-sand">
            <HeroImage p={p} />
            {p.placeholder && (
              <span className="absolute bottom-4 left-4 rounded-full bg-cream px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink/60">
                Photography landing soon
              </span>
            )}
          </div>

          <div className="flex flex-col">
            {p.jaSubtitle && (
              <div
                lang="ja"
                className="font-ja text-[14px] tracking-wider text-rust"
              >
                {p.jaSubtitle}
              </div>
            )}
            <h1 className="m-0 mt-2 text-balance text-[clamp(36px,4.5vw,64px)] font-bold leading-[0.98] tracking-tight">
              {p.name}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-[22px] font-bold">
              {p.was && (
                <s className="text-[18px] font-normal text-ink/40">{p.was}</s>
              )}
              {p.price}
              {p.tag && (
                <span className="rounded-full bg-mustard px-2.5 py-1 text-[12px] font-semibold text-ink">
                  {p.tag.label}
                </span>
              )}
            </div>

            <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
              {p.longDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-green/40 px-6 py-3 text-[15px] font-semibold text-cream"
                aria-disabled="true"
                title="Checkout launches with our store — meanwhile, email us to reserve one."
              >
                Reserve — checkout soon
              </button>
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center rounded-full border-[1.5px] border-green px-6 py-3 text-[15px] font-semibold text-ink hover:bg-green hover:text-cream"
              >
                Email to pre-order
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule-cream pt-6">
              {p.specs.map((s) => (
                <li key={s.label} className="text-[14px]">
                  <span className="block text-ink/50">{s.label}</span>
                  <span className="block font-medium text-ink">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sensory icons (Sensory Cup) */}
        {p.sensoryIcons && (
          <section className="border-t border-rule-cream px-12 py-16">
            <div className="mx-auto max-w-[1280px]">
              <div className="mb-8 font-mono text-[12px] uppercase tracking-widest text-rust">
                Designed for tasting
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {p.sensoryIcons.map((ic) => (
                  <div
                    key={ic.label}
                    className="flex flex-col items-center gap-3 rounded-[22px] bg-cream-paper p-6 text-center"
                  >
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-rust text-[22px] text-cream"
                    >
                      {ic.symbol}
                    </span>
                    <span className="text-[14px] font-semibold leading-snug">
                      {ic.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Color options */}
        {p.colors && (
          <section className="px-12 pb-4">
            <div className="mx-auto max-w-[1280px]">
              <div className="mb-3 text-[14px] font-semibold">
                Available in
              </div>
              <div className="flex flex-wrap gap-4">
                {p.colors.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 rounded-full border border-rule-cream bg-cream px-3 py-2 text-[13px] font-medium"
                  >
                    <span
                      aria-hidden
                      className="block h-6 w-6 rounded-full border border-rule-cream"
                      style={{ background: c.swatch }}
                    />
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How to enjoy */}
        {p.howToEnjoy && (
          <section className="border-t border-rule-cream px-12 py-16">
            <div className="mx-auto max-w-[1280px]">
              <h2 className="m-0 mb-8 text-[36px] font-bold leading-tight tracking-tight">
                How to <em className="not-italic text-rust">enjoy</em> it.
              </h2>
              <ol className="grid gap-5 md:grid-cols-2">
                {p.howToEnjoy.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 rounded-[22px] bg-cream-paper p-6"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green text-[14px] font-bold text-cream">
                      {i + 1}
                    </span>
                    <span className="text-[16px] leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* What it's for */}
        <section className="border-t border-rule-cream px-12 py-16">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_2fr]">
            <h2 className="m-0 text-[36px] font-bold leading-tight tracking-tight">
              Use this when…
            </h2>
            <ul className="flex flex-col gap-3">
              {p.useFor.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[17px] leading-snug"
                >
                  <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rust" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Honest expectations */}
        <section className="px-12 py-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="rounded-[22px] bg-sand p-10 lg:p-14">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-rust">
                What this won&apos;t do
              </div>
              <p className="m-0 max-w-[860px] text-balance text-[clamp(22px,2.4vw,32px)] font-bold leading-snug tracking-tight">
                {p.honestExpectations}
              </p>
            </div>
          </div>
        </section>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <section className="border-t border-rule-cream px-12 py-16">
            <div className="mx-auto max-w-[1280px]">
              <h2 className="m-0 mb-8 text-[36px] font-bold leading-tight tracking-tight">
                What people use this <em className="not-italic text-rust">with.</em>
              </h2>
              <ProductGrid products={crossSell} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
