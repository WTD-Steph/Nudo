// Single source of truth for the product catalog.
// Phase 1 keeps this in TypeScript — simpler than MDX for 11 SKUs.
// When real e-commerce ships, replace with a Shopify / CMS fetch.

export type Category =
  | "espresso"
  | "pour-over"
  | "scales"
  | "accessories"
  | "drip-bags";

export type ProductTag = {
  label: string;
  kind: "bestseller" | "new" | "easy" | "kit";
};

export type ProductSpec = { label: string; value: string };

export type SensoryIcon = {
  symbol: string; // unicode glyph, used as the icon
  label: string;
};

export type HowToStep = string;

export type ColorOption = { name: string; swatch: string };

export type Product = {
  slug: string;
  name: string;
  jaSubtitle?: string; // optional katakana / kanji subtitle for PDP eyebrow
  desc: string;
  longDesc: string;
  price: string;
  was?: string;
  tag?: ProductTag;
  image: string; // hero image — already in /public/products/
  gallery?: string[]; // additional images
  silhouette?: "sensory-cup" | "drip-bag"; // missing-photo fallback
  category: Category;
  specs: ProductSpec[];
  useFor: string[];
  honestExpectations: string;
  crossSell: string[]; // slugs
  placeholder?: boolean;

  // Optional special-treatment fields (currently used by Sensory Cup).
  sensoryIcons?: SensoryIcon[];
  howToEnjoy?: HowToStep[];
  colors?: ColorOption[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "dosing-cup",
    name: "Espresso Dosing Cup",
    jaSubtitle: "ドージングカップ",
    desc: "Lightweight, clean transfers, consistent doses. Fits 58 mm portafilters.",
    longDesc:
      "The dosing cup that taught us most beginners don't have a dosing problem — they have a transfer problem. Coffee on the counter, coffee on the scale, coffee mostly in the basket. This solves that.",
    price: "$18",
    tag: { label: "Bestseller", kind: "bestseller" },
    image: "/products/dosing-cup.png",
    category: "espresso",
    specs: [
      { label: "Material", value: "Borosilicate glass" },
      { label: "Fits", value: "58 mm portafilter" },
      { label: "Capacity", value: "70 ml" },
      { label: "In the box", value: "Dosing cup" },
    ],
    useFor: [
      "Transferring grounds from grinder to portafilter without spilling.",
      "Weighing your dose on a scale before the puck stage.",
    ],
    honestExpectations:
      "It won't make your grind any better. It will stop you blaming your coffee for what was actually a transfer mess.",
    crossSell: ["distributor", "scale-mini", "tamping-mat"],
  },
  {
    slug: "distributor",
    name: "Gravity Leveler & Distributor",
    jaSubtitle: "ディストリビューター",
    desc: "Spring-loaded, eight pins. Levels the bed before tamping — fewer channeling problems.",
    longDesc:
      "Eight thin needles stir the bed so water can't take a shortcut. Spring-loaded so you can't tamp too hard by accident. This is the tool that fixed the most beginner-shot problems we've watched in our studio.",
    price: "$24",
    tag: { label: "New", kind: "new" },
    image: "/products/distributor.png",
    category: "espresso",
    specs: [
      { label: "Material", value: "Stainless steel + walnut handle" },
      { label: "Fits", value: "58 mm baskets" },
      { label: "Pins", value: "8" },
      { label: "Mechanism", value: "Spring-loaded, fixed depth" },
    ],
    useFor: [
      "Breaking up grind clumps before tamping.",
      "Setting an even bed so water flows evenly.",
    ],
    honestExpectations:
      "It won't fix a wildly wrong grind. It will stop you from blaming your tamping when the real culprit was an uneven bed.",
    crossSell: ["dosing-cup", "portafilter-basket", "tamping-mat"],
  },
  {
    slug: "portafilter-basket",
    name: "Ultra Precision Basket",
    jaSubtitle: "バスケット",
    desc: "58 mm stainless basket, 17–19 g. Even extraction, even on entry-level machines.",
    longDesc:
      "The stock basket on most home machines is the cheapest part of the machine — and it shows. This is a properly machined replacement with consistent hole spacing. It does for your shot what a flat bed does for sleep.",
    price: "$28",
    image: "/products/portafilter-basket.png",
    category: "espresso",
    specs: [
      { label: "Material", value: "Stainless steel" },
      { label: "Diameter", value: "58 mm" },
      { label: "Dose range", value: "17–19 g" },
      { label: "Hole pattern", value: "Precision-laser drilled" },
    ],
    useFor: [
      "Upgrading from a stock basket on an entry-level espresso machine.",
      "Pulling a more even shot at the same dose and grind.",
    ],
    honestExpectations:
      "It won't make a bad machine good. It will close most of the gap between an entry-level machine and a midrange one.",
    crossSell: ["distributor", "dosing-cup", "scale-mini"],
  },
  {
    slug: "tamping-mat",
    name: "Silicone Tamping Mat",
    desc: "Saves your wrist and your counter. Knock-friendly, dishwasher safe.",
    longDesc:
      "The thing you didn't know you needed until you tamped on a granite countertop and felt the shockwave in your shoulder. Soft enough to be friendly. Stiff enough to be flat.",
    price: "$22",
    image: "/products/tamping-mat.png",
    category: "accessories",
    specs: [
      { label: "Material", value: "Food-grade silicone" },
      { label: "Size", value: "200 × 150 mm" },
      { label: "Care", value: "Dishwasher safe" },
    ],
    useFor: [
      "Tamping without rattling your counter or your wrist.",
      "Knocking your portafilter clean before rinsing.",
    ],
    honestExpectations: "It's a mat. It will not improve your coffee. It will improve your kitchen.",
    crossSell: ["distributor", "milk-jug", "dosing-cup"],
  },
  {
    slug: "scale-mini",
    name: "Halo Mini Coffee Scale",
    jaSubtitle: "ハロミニ・スケール",
    desc: "0.1 g precision, Type-C rechargeable. The thing that fixes your inconsistent brews.",
    longDesc:
      "If you only buy one thing from us, buy this. Same beans, same grind, same weight in — and suddenly your coffee tastes the same on Tuesday as it did on Saturday. A scale is the cheapest, biggest single upgrade in home coffee.",
    price: "$32",
    tag: { label: "Bestseller", kind: "bestseller" },
    image: "/products/scale-mini.png",
    category: "scales",
    specs: [
      { label: "Precision", value: "0.1 g" },
      { label: "Capacity", value: "2 kg" },
      { label: "Charging", value: "USB-C, ~30 days per charge" },
      { label: "Timer", value: "Built-in, auto-start on weight" },
    ],
    useFor: [
      "Weighing your dose before brewing.",
      "Tracking your shot's weight and time together for consistent results.",
    ],
    honestExpectations:
      "It won't make a bad bean taste good. But it will make your good bean taste the same every time.",
    crossSell: ["dosing-cup", "distributor", "portable-dripper"],
  },
  {
    slug: "portable-dripper",
    name: "Portable V60 Dripper",
    desc: "Stainless mesh, no paper needed. Pour-over anywhere — desk, camp, hotel room.",
    longDesc:
      "A pour-over cone that folds flat and never asks for filter paper. The mesh extracts a little more body than paper does, which sounds bad in theory and tastes fine in practice. Throw it in a bag.",
    price: "$26",
    tag: { label: "Easy", kind: "easy" },
    image: "/products/portable-dripper.png",
    category: "pour-over",
    specs: [
      { label: "Material", value: "Stainless mesh + silicone collar" },
      { label: "Capacity", value: "1–2 cups" },
      { label: "Folds", value: "Yes — fits in a pouch" },
    ],
    useFor: [
      "Pour-over coffee without paper filters.",
      "Travelling — desk, hotel, camping, in-laws.",
    ],
    honestExpectations:
      "Mesh lets more oils through than paper, which makes the cup a touch heavier in body. Some people prefer it. If you don't, swap to our V60 paper drippers.",
    crossSell: ["sharing-pot", "scale-mini", "drip-bags"],
  },
  {
    slug: "sharing-pot",
    name: "Sharing Pot Glass · 400 ml",
    desc: "Heat-resistant glass server. Built to fit under a V60 and pour clean.",
    longDesc:
      "A small glass server that fits under a dripper, takes heat without complaining, and pours without a sad dribble down the side. Two cups, comfortable handle, looks good on a counter.",
    price: "$24",
    image: "/products/sharing-pot.png",
    category: "pour-over",
    specs: [
      { label: "Material", value: "Borosilicate glass + walnut handle" },
      { label: "Capacity", value: "400 ml" },
      { label: "Fits", value: "Most V60-style drippers" },
    ],
    useFor: [
      "Brewing two cups of pour-over in one session.",
      "Serving filter coffee without it cooling on the counter.",
    ],
    honestExpectations:
      "Glass. Drop it on a tile floor and you'll know. We'll send a replacement once.",
    crossSell: ["portable-dripper", "scale-mini", "storage-tube"],
  },
  {
    slug: "milk-jug",
    name: "Stainless Milk Jug",
    desc: "Steam, swirl, pour. Comfortable handle, sharp spout, easy to clean.",
    longDesc:
      "A 350 ml stainless jug that pours clean and doesn't slip when your hand's wet from steam. Good spout geometry is the thing nobody talks about until they've used a bad one.",
    price: "$19",
    image: "/products/milk-jug.png",
    category: "accessories",
    specs: [
      { label: "Material", value: "Stainless steel" },
      { label: "Capacity", value: "350 ml" },
      { label: "Spout", value: "Pointed for latte art" },
    ],
    useFor: [
      "Steaming and pouring milk for cappuccinos and lattes.",
      "Practicing latte art without splashing your machine.",
    ],
    honestExpectations:
      "It won't teach you latte art. It will stop a bad jug being part of the reason you're struggling.",
    crossSell: ["tamping-mat", "dosing-cup", "distributor"],
  },
  {
    slug: "storage-tube",
    name: "Coffee Storage Tubes",
    desc: "Glass display set. See your beans, keep them fresh.",
    longDesc:
      "Six small glass tubes on a walnut tray. Decant 50–100 g into each — single-day quantities. The beans you're drinking now stay close; the rest stays sealed in the bag.",
    price: "$36",
    image: "/products/storage-tube.png",
    category: "accessories",
    specs: [
      { label: "Material", value: "Borosilicate glass + walnut tray" },
      { label: "Capacity", value: "6 × ~100 g" },
      { label: "Care", value: "Hand wash glass" },
    ],
    useFor: [
      "Keeping a single-day amount of beans on the counter without compromising the rest.",
      "Showing off a small bean library to friends who definitely wanted to know.",
    ],
    honestExpectations:
      "Decanted beans stay fresh for a day or two. Don't fill all six and forget about them — that's a slow road to stale.",
    crossSell: ["sharing-pot", "scale-mini", "milk-jug"],
  },
  {
    slug: "sensory-cup",
    name: "Sensory Cup",
    jaSubtitle: "感覚カップ",
    desc: "Tulip-shaped porcelain. Made to help you actually taste what you're brewing.",
    longDesc:
      "A small porcelain cup with a deliberate tulip shape — wider at the middle, narrower at the rim — that concentrates aroma at your nose as you sip. No handle, because you should feel the temperature of the coffee in your palm. It's a cup designed for one job: making it easier to tell the difference between two shots.",
    price: "$14",
    image: "/brand/sticker-cover.png", // placeholder — real photography missing
    silhouette: "sensory-cup",
    category: "accessories",
    placeholder: true,
    specs: [
      { label: "Material", value: "Porcelain" },
      { label: "Capacity", value: "360 ml" },
      { label: "Weight", value: "±350 g" },
      { label: "Available in", value: "White · Pink · Transparent" },
    ],
    useFor: [
      "Tasting coffee deliberately — noticing aroma, acidity, body.",
      "Side-by-side comparisons when you're dialling in a new bean.",
    ],
    honestExpectations:
      "It won't change what your coffee tastes like. It will change how easy it is to notice. That's the whole point.",
    crossSell: ["scale-mini", "portable-dripper", "sharing-pot"],
    sensoryIcons: [
      { symbol: "✦", label: "Aroma concentration" },
      { symbol: "◐", label: "Temperature sensitivity" },
      { symbol: "◉", label: "Flavor control" },
      { symbol: "◯", label: "Handle-less design" },
    ],
    howToEnjoy: [
      "Pour your coffee into the cup to activate its aroma.",
      "Feel the temperature in your hands.",
      "Use the rim to direct the liquid toward the center of your palate for a fuller taste.",
      "Sip slowly and enjoy the experience.",
    ],
    colors: [
      { name: "White", swatch: "#FDF8DE" },
      { name: "Pink", swatch: "#E8C9B8" },
      { name: "Transparent", swatch: "#E8E4D4" },
    ],
  },
  {
    slug: "drip-bags",
    name: "Non-Woven Drip Bags",
    jaSubtitle: "ドリップバッグ",
    desc: "Just add water. The easiest pour-over you'll ever make.",
    longDesc:
      "Single-serve drip bags — pre-ground, sealed, ready. Hook over a mug, pour hot water slowly, drink. The result is a clean filter coffee with no equipment. We sell them as a starting point — a way to taste good coffee at home before you commit to the gear.",
    price: "$12",
    tag: { label: "Easy", kind: "easy" },
    image: "/brand/sticker-cover.png", // placeholder — real photography missing
    silhouette: "drip-bag",
    category: "drip-bags",
    placeholder: true,
    specs: [
      { label: "Format", value: "Non-woven (food-grade)" },
      { label: "Count", value: "8 bags per box" },
      { label: "Brew", value: "200 ml per bag, 90 °C water, ~3 min" },
    ],
    useFor: [
      "Pour-over coffee with no equipment.",
      "Travel, the office, or as a low-commitment way to try a new bean.",
    ],
    honestExpectations:
      "Drip bags are a starting point, not a destination. When you start tasting the difference between two bags, you're ready for a proper dripper.",
    crossSell: ["portable-dripper", "sharing-pot", "scale-mini"],
  },
];

export const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "pour-over", label: "Pour-over" },
  { key: "drip-bags", label: "Drip bags" },
  { key: "scales", label: "Scales" },
  { key: "accessories", label: "Accessories" },
];

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: Category | "all"): Product[] {
  if (cat === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === cat);
}
