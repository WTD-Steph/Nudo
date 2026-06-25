// Single source of truth for the product catalog.
// V2 lineup (June 2026) — the photographed product family:
// 3 scales · 2 dosing scoops · 2 tamping mats · sharing pot · pour-over
// stand · vacuum jar · milk jug · prism rocks glass.

export type Category =
  | "espresso"
  | "pour-over"
  | "scales"
  | "cups-mugs"
  | "accessories";

export type ProductTag = {
  label: string;
  kind: "bestseller" | "new" | "easy" | "kit";
};

export type ProductSpec = { label: string; value: string };

export type SensoryIcon = { symbol: string; label: string };
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
  gallery?: string[];
  silhouette?: "sensory-cup" | "drip-bag"; // missing-photo fallback (unused in V2; kept for type back-compat)
  category: Category;
  specs: ProductSpec[];
  useFor: string[];
  honestExpectations: string;
  crossSell: string[]; // slugs
  placeholder?: boolean; // true while specs are unconfirmed by founder

  // Optional special-treatment fields (unused in V2; kept for type back-compat)
  sensoryIcons?: SensoryIcon[];
  howToEnjoy?: HowToStep[];
  colors?: ColorOption[];
};

export const PRODUCTS: Product[] = [
  // ── Scales ──────────────────────────────────────────────────────────
  {
    slug: "scale-cube",
    name: "Smart Precision Scale · Cube",
    jaSubtitle: "スマートスケール",
    desc: "0.1 g precision in a clean white cube. Type-C rechargeable, built-in timer.",
    longDesc:
      "The cheapest, biggest single upgrade in home coffee. Same beans, same grind, same weight in — and suddenly your coffee tastes the same on Tuesday as it did on Saturday. A scale is the thing that takes guessing out of the loop.",
    price: "$38",
    tag: { label: "Bestseller", kind: "bestseller" },
    image: "/products/scale-cube.png",
    category: "scales",
    placeholder: true,
    specs: [
      { label: "Precision", value: "0.1 g" },
      { label: "Capacity", value: "2 kg" },
      { label: "Charging", value: "USB-C" },
      { label: "Timer", value: "Built-in, auto-start on weight" },
      { label: "Finish", value: "White" },
    ],
    useFor: [
      "Weighing your dose before brewing.",
      "Tracking shot weight and time together for consistent results.",
    ],
    honestExpectations:
      "It won't make a bad bean taste good. But it will make your good bean taste the same every time.",
    crossSell: ["dosing-scoop", "tamping-mat", "sharing-pot"],
  },
  {
    slug: "scale-lite",
    name: "Essential Scale · Lite",
    jaSubtitle: "ライトスケール",
    desc: "The entry scale. 0.1 g precision, fewer buttons, lower price.",
    longDesc:
      "Everything you need on a scale, nothing you don't. The Lite is what we hand a friend who's still deciding whether they want to be a coffee person. By the time they outgrow it, they've already figured out it was worth it.",
    price: "$24",
    image: "/products/scale-lite.png",
    category: "scales",
    placeholder: true,
    specs: [
      { label: "Precision", value: "0.1 g" },
      { label: "Capacity", value: "2 kg" },
      { label: "Charging", value: "USB-C" },
      { label: "Finish", value: "White" },
    ],
    useFor: [
      "A first scale that won't make you feel underqualified.",
      "Pour-over weighing — the simplest of all scale tasks.",
    ],
    honestExpectations:
      "No flow-rate display, no app, no Bluetooth. If you want those, the Round is for you.",
    crossSell: ["dosing-scoop", "sharing-pot", "pour-over-stand"],
  },
  {
    slug: "scale-round",
    name: "Professional Scale · Round",
    jaSubtitle: "プロフェッショナル",
    desc: "Bigger surface, faster refresh, for the day you start watching flow rate.",
    longDesc:
      "The Round is what you graduate to when your shot timing matters more than your shot weight, and when you're putting a portafilter on top of the scale instead of just a cup. Bigger surface, faster refresh — built for the espresso bar at home.",
    price: "$58",
    image: "/products/scale-round.png",
    category: "scales",
    placeholder: true,
    specs: [
      { label: "Precision", value: "0.1 g" },
      { label: "Capacity", value: "3 kg" },
      { label: "Refresh", value: "Fast (suitable for flow tracking)" },
      { label: "Charging", value: "USB-C" },
      { label: "Finish", value: "Round, brushed" },
    ],
    useFor: [
      "Espresso flow tracking — when you can see the slow-then-fast-then-slow shape of a good extraction.",
      "Larger pour-overs (1L+) that won't fit on a small scale.",
    ],
    honestExpectations:
      "Overkill for your first month. Probably right by month three.",
    crossSell: ["tamping-mat-pro", "milk-jug", "vacuum-jar"],
  },

  // ── Dosing scoops ──────────────────────────────────────────────────
  {
    slug: "dosing-scoop",
    name: "Bean Dosing Scoop · 15 ml",
    jaSubtitle: "ドージングスクープ",
    desc: "Stainless 304, satisfying weight. The grinder-to-portafilter transfer, fixed.",
    longDesc:
      "Solves the problem nobody warns you about: half your dose ends up on the counter when you transfer from the grinder. The scoop gives the beans somewhere to land, your hand somewhere to hold, and the basket a clean pour.",
    price: "$14",
    tag: { label: "Bestseller", kind: "bestseller" },
    image: "/products/dosing-scoop.png",
    category: "espresso",
    placeholder: true,
    specs: [
      { label: "Material", value: "Stainless steel 304" },
      { label: "Capacity", value: "15 ml" },
      { label: "Finish", value: "Brushed" },
    ],
    useFor: [
      "Transferring beans from grinder to portafilter without spilling.",
      "Single-dosing — weigh in the scoop, grind, dose.",
    ],
    honestExpectations:
      "Won't fix a grind problem. Will stop you blaming your beans for what was actually a transfer mess.",
    crossSell: ["scale-cube", "tamping-mat", "vacuum-jar"],
  },
  {
    slug: "dosing-scoop-white",
    name: "Bean Dosing Scoop · White",
    desc: "Same scoop, white finish. For the white-and-wood kitchen.",
    longDesc:
      "Identical to the brushed scoop in every measurable way; if you've already chosen white for the rest of your gear, this is the version that doesn't fight it.",
    price: "$14",
    image: "/products/dosing-scoop-white.png",
    category: "espresso",
    placeholder: true,
    specs: [
      { label: "Material", value: "Stainless steel 304, white powder coat" },
      { label: "Capacity", value: "15 ml" },
    ],
    useFor: [
      "Bean transfer in a setup where brushed steel doesn't fit.",
    ],
    honestExpectations:
      "It's a finish choice. The coffee won't notice.",
    crossSell: ["scale-lite", "milk-jug", "rocks-glass"],
  },

  // ── Tamping mats ────────────────────────────────────────────────────
  {
    slug: "tamping-mat",
    name: "Silicone Tamping Mat · Minimalist",
    jaSubtitle: "タンピングマット",
    desc: "Soft enough to be friendly, stiff enough to be flat. Saves your wrist and your counter.",
    longDesc:
      "The thing you didn't know you needed until you tamped on a granite countertop and felt the shockwave in your shoulder. Knock-friendly, food-safe silicone. Pure black, no logo, no shine — the minimalist version.",
    price: "$18",
    image: "/products/tamping-mat.png",
    category: "espresso",
    specs: [
      { label: "Material", value: "Food-grade silicone" },
      { label: "Size", value: "200 × 150 mm" },
      { label: "Finish", value: "Matte black" },
      { label: "Care", value: "Dishwasher safe" },
    ],
    useFor: [
      "Tamping without rattling your counter or your wrist.",
      "Knocking your portafilter clean before rinsing.",
    ],
    honestExpectations:
      "It's a mat. It will not improve your coffee. It will improve your kitchen.",
    crossSell: ["dosing-scoop", "scale-cube", "milk-jug"],
  },
  {
    slug: "tamping-mat-pro",
    name: "Silicone Tamping Mat · Pro",
    desc: "Heavier, thicker, more grip. Available in Pro Black & Pro Grey.",
    longDesc:
      "The Pro is the same mat, denser. More weight, less slide, slightly more grip on the portafilter ear. Comes in Pro Black or Pro Grey — both look right next to a chrome machine.",
    price: "$24",
    image: "/products/tamping-mat-pro.png",
    category: "espresso",
    placeholder: true,
    specs: [
      { label: "Material", value: "Food-grade silicone (denser blend)" },
      { label: "Size", value: "220 × 160 mm" },
      { label: "Finish", value: "Pro Black or Pro Grey" },
    ],
    useFor: [
      "Heavier daily use where the Minimalist mat moves around.",
      "A slightly more permanent home for your portafilter between shots.",
    ],
    honestExpectations:
      "It's the Minimalist with more material. If you're already happy with the Minimalist, you don't need this.",
    crossSell: ["scale-round", "milk-jug", "dosing-scoop"],
  },

  // ── Pour-over ───────────────────────────────────────────────────────
  {
    slug: "sharing-pot",
    name: "Sharing Pot Glass · 300 / 450 ml",
    jaSubtitle: "シェアリングポット",
    desc: "Borosilicate glass server. Two sizes. Built to fit under a V60 and pour clean.",
    longDesc:
      "A glass server that fits under your dripper, takes the heat, and pours without a sad dribble down the side. 300 ml for a single cup; 450 ml for two. We sell more 450s.",
    price: "$22",
    image: "/products/sharing-pot.png",
    category: "pour-over",
    specs: [
      { label: "Material", value: "Borosilicate glass" },
      { label: "Sizes", value: "300 ml · 450 ml" },
      { label: "Care", value: "Hand wash" },
    ],
    useFor: [
      "Brewing pour-over for one or two cups.",
      "Serving filter coffee without it cooling on the counter.",
    ],
    honestExpectations:
      "Glass. Drop it on a tile floor and you'll know. We'll send a replacement once.",
    crossSell: ["pour-over-stand", "scale-lite", "rocks-glass"],
  },
  {
    slug: "pour-over-stand",
    name: "Pour-Over Stand with Chilling Ball",
    jaSubtitle: "ドリップスタンド",
    desc: "Black powder-coated stand. Spiral dripper rail + a chilling ball for iced pours.",
    longDesc:
      "A height-adjustable stand with a spiral dripper rail, a chilling ball for over-the-ice pours, and a textured base that keeps it where you put it. Pour-over as a small ritual, on a counter you don't mind looking at.",
    price: "$68",
    tag: { label: "New", kind: "new" },
    image: "/products/pour-over-stand.png",
    category: "pour-over",
    placeholder: true,
    specs: [
      { label: "Material", value: "Powder-coated steel, textured silicone base" },
      { label: "Includes", value: "Chilling ball for iced pours" },
      { label: "Height", value: "Adjustable" },
      { label: "Finish", value: "Matte black" },
    ],
    useFor: [
      "Pour-over with a built-in pour-into-the-server alignment.",
      "Iced filter coffee — drip directly onto the chilling ball into ice.",
    ],
    honestExpectations:
      "It won't teach you to pour. It will give you a fixed setup so you stop fiddling with cone height every brew.",
    crossSell: ["sharing-pot", "scale-cube", "rocks-glass"],
  },

  // ── Storage / accessories ──────────────────────────────────────────
  {
    slug: "vacuum-jar",
    name: "Stainless Vacuum Jar · 400 / 800 / 1200 ml",
    jaSubtitle: "バキュームジャー",
    desc: "Push-button vacuum seal. Three sizes. Beans that taste like yesterday's beans.",
    longDesc:
      "The push-button on top pulls a real vacuum, which is the only thing that actually slows the oxidation that makes coffee taste flat. Stainless body, blackout interior — beans stay dark.",
    price: "$42",
    image: "/products/vacuum-jar.png",
    category: "accessories",
    placeholder: true,
    specs: [
      { label: "Material", value: "Stainless steel" },
      { label: "Sizes", value: "400 ml · 800 ml · 1200 ml" },
      { label: "Seal", value: "Push-button vacuum" },
    ],
    useFor: [
      "Storing the bag of beans you're drinking right now — vacuum-sealed.",
      "Travelling with beans without a stale-in-three-days problem.",
    ],
    honestExpectations:
      "Beans still go stale. Just slower. A vacuum jar buys you a week or two, not a month.",
    crossSell: ["scale-cube", "dosing-scoop", "milk-jug"],
  },
  {
    slug: "milk-jug",
    name: "Stainless Milk Jug · 500 ml",
    jaSubtitle: "ミルクジャグ",
    desc: "Steam, swirl, pour. Large 500 ml, sharp spout, easy to clean.",
    longDesc:
      "A 500 ml stainless jug for the household where everyone wants a latte. Comfortable handle, sharp spout, polished interior that comes clean without help.",
    price: "$24",
    image: "/products/milk-jug.png",
    category: "cups-mugs",
    specs: [
      { label: "Material", value: "Stainless steel" },
      { label: "Capacity", value: "500 ml" },
      { label: "Spout", value: "Pointed for latte art" },
    ],
    useFor: [
      "Steaming and pouring milk for two drinks at once.",
      "Practicing latte art without running out of milk halfway.",
    ],
    honestExpectations:
      "It won't teach you latte art. It will stop a bad jug being part of the reason you're struggling.",
    crossSell: ["tamping-mat", "scale-round", "rocks-glass"],
  },
  {
    slug: "rocks-glass",
    name: "Prism Rocks Glass",
    jaSubtitle: "プリズムグラス",
    desc: "Hand-finished colored prism pattern. For coffee that deserves a deliberate cup.",
    longDesc:
      "A short rocks glass with a colored prism pattern that catches light differently every time you set it down. Built for cold brew, an espresso tonic, an iced filter — anything you'd rather not pour into a mug.",
    price: "$18",
    tag: { label: "New", kind: "new" },
    image: "/products/rocks-glass.png",
    category: "cups-mugs",
    placeholder: true,
    specs: [
      { label: "Material", value: "Hand-finished glass" },
      { label: "Capacity", value: "~260 ml" },
      { label: "Care", value: "Hand wash" },
    ],
    useFor: [
      "Iced coffee, cold brew, espresso tonics.",
      "Tasting deliberately — when the cup is part of the moment.",
    ],
    honestExpectations:
      "Hand-finished glass. Each one's pattern is slightly different — that's the point, but tell us if you want a refund instead.",
    crossSell: ["sharing-pot", "pour-over-stand", "vacuum-jar"],
  },
];

export const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "pour-over", label: "Pour-over" },
  { key: "scales", label: "Scales" },
  { key: "cups-mugs", label: "Cups & Mugs" },
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
