"use client";

import { useState } from "react";

type Product = {
  name: string;
  desc: string;
  price: string;
  was?: string;
  tag?: string;
  tagKind?: "default" | "new" | "kit";
  category: "espresso" | "pour-over" | "drip-bags" | "kits";
};

const PRODUCTS: Product[] = [
  {
    name: "Espresso Dosing Cup",
    desc: "Clean transfers, consistent doses. Fits perfectly in your setup.",
    price: "$18",
    tag: "Bestseller",
    tagKind: "default",
    category: "espresso",
  },
  {
    name: "WDT Distributor",
    desc:
      "Levels grounds with eight tiny needles. Less channeling, better extraction.",
    price: "$24",
    tag: "New",
    tagKind: "new",
    category: "espresso",
  },
  {
    name: "First-Brew Kit",
    desc:
      "Everything you need to pull your first shot — tamper, cup, mat, cloth.",
    price: "$68",
    was: "$84",
    tag: "Kit",
    tagKind: "kit",
    category: "kits",
  },
  {
    name: "Walnut Tamper",
    desc:
      "58 mm flat base, walnut handle. Comfortable in the hand, easy to learn.",
    price: "$36",
    tag: "Bestseller",
    tagKind: "default",
    category: "espresso",
  },
  {
    name: "V60 Drip Bag · 8 ct",
    desc:
      "Non-woven single-serve drip bag. Just add water — your first pour-over.",
    price: "$12",
    tag: "Easy",
    tagKind: "default",
    category: "drip-bags",
  },
  {
    name: "Sensory Cup · 200 ml",
    desc:
      "Tulip-shaped tasting cup. Helps you actually taste what you're brewing.",
    price: "$14",
    category: "pour-over",
  },
];

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "pour-over", label: "Pour-over" },
  { key: "drip-bags", label: "Drip bags" },
  { key: "kits", label: "Kits" },
];

function tagClasses(kind: Product["tagKind"]) {
  if (kind === "new") return "bg-warm text-charcoal";
  if (kind === "kit") return "bg-charcoal text-cream";
  return "bg-cream text-charcoal";
}

export function Catalog() {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="border-t border-rule-cream px-12 py-20">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 text-[64px] font-bold leading-none tracking-[-0.035em]">
          Shop <em className="not-italic text-clay">the basics.</em>
        </h2>
        <div className="flex flex-wrap items-end gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                active === f.key
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-rule-cream bg-transparent text-charcoal-soft hover:border-charcoal"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <div
            key={p.name}
            className="group flex cursor-pointer flex-col rounded-[22px] bg-cream-2 p-3.5 transition hover:-translate-y-[3px]"
          >
            <div className="frame-stripes relative mb-4 aspect-[4/5] overflow-hidden rounded-[14px] bg-cream-soft">
              {p.tag && (
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClasses(p.tagKind)}`}
                >
                  {p.tag}
                </span>
              )}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-mute">
                photo · {p.name.toLowerCase()}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 px-2 pb-2.5 pt-1">
              <div className="text-[19px] font-bold tracking-tight">
                {p.name}
              </div>
              <div className="min-h-[2.8em] text-[14px] leading-snug text-charcoal-soft">
                {p.desc}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-[17px] font-bold">
                  {p.was && (
                    <s className="mr-1.5 font-normal text-mute">{p.was}</s>
                  )}
                  {p.price}
                </div>
                <button className="cursor-pointer rounded-full border-none bg-charcoal px-3.5 py-2 text-xs font-semibold text-cream">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
