"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { CATEGORIES, getProductsByCategory, type Category } from "@/lib/products";

export function Catalog() {
  const [active, setActive] = useState<Category | "all">("all");
  const visible = getProductsByCategory(active);

  return (
    <section className="border-t border-rule-cream px-12 py-20">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 text-[64px] font-bold leading-none tracking-[-0.035em]">
          Shop <em className="not-italic text-rust">the basics.</em>
        </h2>
        <div className="flex flex-wrap items-end gap-2">
          {CATEGORIES.map((f) => (
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
      <ProductGrid products={visible} />
    </section>
  );
}
