import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/links";
import { Product, ProductTag } from "@/lib/products";
import { DripBagSilhouette, SensoryCupSilhouette } from "@/components/Silhouettes";

function tagClasses(kind: ProductTag["kind"]) {
  if (kind === "new") return "bg-mustard text-ink";
  if (kind === "kit") return "bg-green text-cream";
  if (kind === "easy") return "bg-sand text-ink";
  return "bg-cream text-ink";
}

type Props = { products: Product[] };

export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={ROUTES.product(p.slug)}
          className="group flex cursor-pointer flex-col rounded-[22px] bg-cream-paper p-3.5 transition hover:-translate-y-[3px]"
        >
          <div className="relative mb-4 aspect-square overflow-hidden rounded-[14px] bg-sand">
            {p.silhouette === "sensory-cup" ? (
              <SensoryCupSilhouette
                className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
                aria-label={p.name}
              />
            ) : p.silhouette === "drip-bag" ? (
              <DripBagSilhouette
                className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
                aria-label={p.name}
              />
            ) : (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
            )}
            {p.tag && (
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClasses(p.tag.kind)}`}
              >
                {p.tag.label}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5 px-2 pb-2.5 pt-1">
            <div className="text-[19px] font-bold tracking-tight">{p.name}</div>
            <div className="min-h-[2.8em] text-[14px] leading-snug text-ink/70">
              {p.desc}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="text-[17px] font-bold">
                {p.was && (
                  <s className="mr-1.5 font-normal text-ink/60">{p.was}</s>
                )}
                {p.price}
              </div>
              <span className="rounded-full border border-green/30 px-3.5 py-2 text-xs font-semibold text-green group-hover:bg-green group-hover:text-cream">
                View details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
