import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, itemListLd } from "@/lib/seo";
import {
  CATEGORIES,
  getProductsByCategory,
  type Category,
} from "@/lib/products";
import Link from "next/link";
import { ROUTES } from "@/lib/links";

export const metadata = {
  title: "Shop",
  description:
    "Friendly brewing tools for beginners. Scales, pour-over, and the accessories that make the rest feel finished.",
};

const CATEGORY_BLURB: Record<Category | "all", string> = {
  all: "Every Nudo piece is the one we'd hand a friend on their first day. Tested, reliable, not overbuilt.",
  espresso:
    "Everything you need to pull an honest shot at home — scoops, mats, the tools that take guessing out of the puck.",
  "pour-over":
    "Filter coffee, demystified. A stand that keeps your dripper aligned, a pot that pours clean.",
  scales:
    "The cheapest, biggest single upgrade in home coffee. We sell three — Lite, Cube, and Round.",
  "cups-mugs":
    "Vessels that change how a cup tastes — the milk jug, the rocks glass, the deliberate ones.",
  accessories:
    "The small things that make the rest of your setup feel finished. Storage and the rest.",
};

type SearchParams = { category?: string };

export default function ShopIndex({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const raw = searchParams?.category ?? "all";
  const active = (CATEGORIES.some((c) => c.key === raw) ? raw : "all") as
    | Category
    | "all";
  const visible = getProductsByCategory(active);

  return (
    <>
      <JsonLd
        data={[
          itemListLd(visible),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Shop", href: ROUTES.shop },
          ]),
        ]}
      />
      <Nav />
      <main id="main-content" className="bg-cream">
        <section className="px-12 pt-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Shop · {visible.length} item{visible.length === 1 ? "" : "s"}
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
              {active === "all" ? (
                <>
                  Everything we make,{" "}
                  <em className="not-italic text-rust">in one place.</em>
                </>
              ) : (
                <>
                  {CATEGORIES.find((c) => c.key === active)?.label}
                </>
              )}
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-snug text-ink/70">
              {CATEGORY_BLURB[active]}
            </p>
          </div>
        </section>

        <section className="px-12 py-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex flex-wrap gap-2 border-b border-rule-cream pb-6">
              {CATEGORIES.map((f) => (
                <Link
                  key={f.key}
                  href={
                    f.key === "all"
                      ? ROUTES.shop
                      : `${ROUTES.shop}?category=${f.key}`
                  }
                  className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                    active === f.key
                      ? "border-green bg-green text-cream"
                      : "border-rule-cream bg-transparent text-ink/70 hover:border-green"
                  }`}
                >
                  {f.label}
                </Link>
              ))}
            </div>

            <ProductGrid products={visible} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
