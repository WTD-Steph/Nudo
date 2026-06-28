import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import {
  DripBagSilhouette,
  SensoryCupSilhouette,
} from "@/components/Silhouettes";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, kitLd } from "@/lib/seo";
import { KITS, getKit } from "@/lib/kits";
import { getProduct } from "@/lib/products";
import { ROUTES } from "@/lib/links";

export function generateStaticParams() {
  return KITS.map((k) => ({ slug: k.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const k = getKit(params.slug);
  if (!k) return { title: "Not found" };
  return {
    title: k.name,
    description: k.dek,
    openGraph: {
      title: k.name,
      description: k.dek,
      images: [
        `/og?title=${encodeURIComponent(k.name)}&eyebrow=${encodeURIComponent("Kits")}`,
      ],
    },
  };
}

export default function KitDetail({ params }: { params: { slug: string } }) {
  const kit = getKit(params.slug);
  if (!kit) notFound();
  const items = kit.items.map(getProduct).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd
        data={[
          kitLd(kit),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Kits", href: ROUTES.kits },
            { name: kit.name, href: ROUTES.kit(kit.slug) },
          ]),
        ]}
      />
      <Nav />
      <main id="main-content" className="bg-cream">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-8 text-[13px] text-ink/75"
        >
          <Link href={ROUTES.home}>Home</Link>
          <span className="mx-2">/</span>
          <Link href={ROUTES.kits}>Kits</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{kit.name}</span>
        </nav>

        {/* Hero */}
        <section className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:px-12 py-12 lg:grid-cols-[1fr_1fr]">
          {/* Hero visual: stacked silhouette grid of the bundled items */}
          <div className="relative aspect-square overflow-hidden rounded-[22px] bg-sand p-6">
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3">
              {items.slice(0, 4).map((p) => (
                <div
                  key={p.slug}
                  className="relative overflow-hidden rounded-[14px] bg-cream"
                >
                  {p.silhouette === "sensory-cup" ? (
                    <SensoryCupSilhouette
                      className="absolute inset-2"
                      aria-label={p.name}
                    />
                  ) : p.silhouette === "drip-bag" ? (
                    <DripBagSilhouette
                      className="absolute inset-2"
                      aria-label={p.name}
                    />
                  ) : (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 300px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {kit.jaSubtitle && (
              <div
                lang="ja"
                className="font-ja text-[14px] tracking-wider text-rust"
              >
                {kit.jaSubtitle}
              </div>
            )}
            <h1 className="m-0 mt-2 text-balance text-[clamp(36px,4.5vw,64px)] font-bold leading-[0.98] tracking-tight">
              {kit.name}
            </h1>
            <p className="mt-4 text-[18px] leading-relaxed text-ink/80">
              {kit.longDesc}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-[34px] font-bold">{kit.price}</span>
              <span className="text-[16px] text-ink/60 line-through">
                {kit.alaCarte}
              </span>
              <span className="rounded-full bg-mustard px-2.5 py-1 text-[12px] font-semibold text-ink">
                {kit.savings}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-green/40 px-6 py-3 text-[15px] font-semibold text-cream"
                aria-disabled="true"
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
          </div>
        </section>

        {/* Why we bundled it this way */}
        <section className="border-t border-rule-cream px-5 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_2fr]">
            <h2 className="m-0 text-[36px] font-bold leading-tight tracking-tight">
              Why we bundled it{" "}
              <em className="not-italic text-rust">this way.</em>
            </h2>
            <p className="m-0 text-[18px] leading-relaxed text-ink/80">
              {kit.bundleNote}
            </p>
          </div>
        </section>

        {/* What's in the box */}
        <section className="border-t border-rule-cream px-5 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="m-0 mb-8 text-[36px] font-bold leading-tight tracking-tight">
              What&rsquo;s in the box.
            </h2>
            <ul className="grid gap-3">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={ROUTES.product(p.slug)}
                    className="group flex items-center gap-5 rounded-[14px] bg-cream-paper p-4 transition hover:-translate-y-0.5"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-sand">
                      {p.silhouette === "sensory-cup" ? (
                        <SensoryCupSilhouette
                          className="absolute inset-1"
                          aria-label={p.name}
                        />
                      ) : p.silhouette === "drip-bag" ? (
                        <DripBagSilhouette
                          className="absolute inset-1"
                          aria-label={p.name}
                        />
                      ) : (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-[17px] font-bold">{p.name}</span>
                      <span className="text-[13px] text-ink/75">
                        {p.desc}
                      </span>
                    </div>
                    <span className="font-mono text-[14px] text-ink/75">
                      {p.price}
                    </span>
                    <span className="text-[13px] font-semibold text-green group-hover:underline">
                      View →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pair with a guide */}
        {kit.pairWithGuide && (
          <section className="px-5 sm:px-8 lg:px-12 py-16">
            <div className="mx-auto max-w-[1280px]">
              <Link
                href={ROUTES.guide(kit.pairWithGuide.slug)}
                className="group flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-green p-10 text-cream transition hover:-translate-y-0.5"
              >
                <div className="max-w-[640px]">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-mustard">
                    Pair with the guide
                  </div>
                  <h3 className="m-0 mt-2 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
                    {kit.pairWithGuide.title}
                  </h3>
                </div>
                <span className="text-[15px] font-semibold text-mustard group-hover:underline">
                  Read the guide →
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* What this kit won't do */}
        <section className="border-t border-rule-cream px-5 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="rounded-[22px] bg-sand p-10 lg:p-14">
              <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-widest text-green">
                What this kit won&apos;t do
              </div>
              <p className="m-0 max-w-[860px] text-balance text-[clamp(22px,2.4vw,32px)] font-bold leading-snug tracking-tight">
                {kit.honestExpectations}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
