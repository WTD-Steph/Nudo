"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/links";

type Product = {
  slug: string;
  name: string;
  desc: string;
  price: string;
  was?: string;
  tag?: string;
  tagKind?: "default" | "new" | "kit";
  image: string;
  category: "espresso" | "pour-over" | "scales" | "accessories";
};

const PRODUCTS: Product[] = [
  {
    slug: "dosing-cup",
    name: "Espresso Dosing Cup",
    desc: "Lightweight, clean transfers, consistent doses. Fits 58 mm portafilters.",
    price: "$18",
    tag: "Bestseller",
    tagKind: "default",
    image: "/products/dosing-cup.png",
    category: "espresso",
  },
  {
    slug: "distributor",
    name: "Gravity Leveler & Distributor",
    desc: "Spring-loaded, eight pins. Levels the bed before tamping — fewer channeling problems.",
    price: "$24",
    tag: "New",
    tagKind: "new",
    image: "/products/distributor.png",
    category: "espresso",
  },
  {
    slug: "portafilter-basket",
    name: "Ultra Precision Basket",
    desc: "58 mm stainless basket, 17–19 g. Even extraction, even on entry-level machines.",
    price: "$28",
    image: "/products/portafilter-basket.png",
    category: "espresso",
  },
  {
    slug: "tamping-mat",
    name: "Silicone Tamping Mat",
    desc: "Saves your wrist and your counter. Knock-friendly, dishwasher safe.",
    price: "$22",
    image: "/products/tamping-mat.png",
    category: "accessories",
  },
  {
    slug: "scale-mini",
    name: "Halo Mini Coffee Scale",
    desc: "0.1 g precision, Type-C rechargeable. The thing that fixes your inconsistent brews.",
    price: "$32",
    tag: "Bestseller",
    tagKind: "default",
    image: "/products/scale-mini.png",
    category: "scales",
  },
  {
    slug: "portable-dripper",
    name: "Portable V60 Dripper",
    desc: "Stainless mesh, no paper needed. Pour-over anywhere — desk, camp, hotel room.",
    price: "$26",
    tag: "Easy",
    tagKind: "default",
    image: "/products/portable-dripper.png",
    category: "pour-over",
  },
  {
    slug: "sharing-pot",
    name: "Sharing Pot Glass · 400 ml",
    desc: "Heat-resistant glass server. Built to fit under a V60 and pour clean.",
    price: "$24",
    image: "/products/sharing-pot.png",
    category: "pour-over",
  },
  {
    slug: "milk-jug",
    name: "Stainless Milk Jug",
    desc: "Steam, swirl, pour. Comfortable handle, sharp spout, easy to clean.",
    price: "$19",
    image: "/products/milk-jug.png",
    category: "accessories",
  },
  {
    slug: "storage-tube",
    name: "Coffee Storage Tubes",
    desc: "Glass display set. See your beans, keep them fresh.",
    price: "$36",
    image: "/products/storage-tube.png",
    category: "accessories",
  },
];

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "pour-over", label: "Pour-over" },
  { key: "scales", label: "Scales" },
  { key: "accessories", label: "Accessories" },
];

function tagClasses(kind: Product["tagKind"]) {
  if (kind === "new") return "bg-mustard text-ink";
  if (kind === "kit") return "bg-green text-cream";
  return "bg-cream text-ink";
}

export function Catalog() {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="border-t border-rule-cream px-12 py-20">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 text-[64px] font-bold leading-none tracking-[-0.035em]">
          Shop <em className="not-italic text-rust">the basics.</em>
        </h2>
        <div className="flex flex-wrap items-end gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                active === f.key
                  ? "border-green bg-green text-cream"
                  : "border-rule-cream bg-transparent text-ink/70 hover:border-green"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={ROUTES.product(p.slug)}
            className="group flex cursor-pointer flex-col rounded-[22px] bg-cream-paper p-3.5 transition hover:-translate-y-[3px]"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-[14px] bg-sand">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
              {p.tag && (
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClasses(p.tagKind)}`}
                >
                  {p.tag}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 px-2 pb-2.5 pt-1">
              <div className="text-[19px] font-bold tracking-tight">
                {p.name}
              </div>
              <div className="min-h-[2.8em] text-[14px] leading-snug text-ink/70">
                {p.desc}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-[17px] font-bold">
                  {p.was && (
                    <s className="mr-1.5 font-normal text-ink/40">{p.was}</s>
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
    </section>
  );
}
