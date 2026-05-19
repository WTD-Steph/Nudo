// Kits = curated bundles. Each kit is a small wrapper around an
// ordered list of product slugs plus brand-voice copy.

export type Kit = {
  slug: string;
  name: string;
  jaSubtitle?: string;
  dek: string;
  longDesc: string;
  bundleNote: string; // "Why we bundled it this way" paragraph
  items: string[]; // product slugs
  price: string;
  alaCarte: string; // unbundled cost
  savings: string;
  honestExpectations: string;
  pairWithGuide?: { slug: string; title: string };
  tag?: { label: string; kind: "bestseller" | "new" };
};

export const KITS: Kit[] = [
  {
    slug: "first-brew",
    name: "First-Brew Kit",
    jaSubtitle: "初心者キット",
    dek: "The shortest path to a good first shot. Six pieces, one printed guide, no gatekeeping.",
    longDesc:
      "Tamper, dosing cup, distributor, knock mat, microfibre cloth, and a printed guide we wrote so you don't need to watch four YouTube videos before breakfast. The kit we'd hand a friend on their first day at home.",
    bundleNote:
      "We bundled it in this order because it's the order you'll use them in. Grind into the dosing cup. Stir with the distributor. Tamp on the mat. Brush the basket with the cloth. Read the guide when you want to know why.",
    items: [
      "dosing-cup",
      "distributor",
      "portafilter-basket",
      "tamping-mat",
      "scale-mini",
    ],
    price: "$98",
    alaCarte: "$122",
    savings: "Save 19%",
    honestExpectations:
      "This kit assumes you already have an espresso machine. If you don't, here are two we'd trust under $500 — neither is ours: the Breville Bambino Plus or the Gaggia Classic Pro. Email us before you buy either; we'll save you an hour.",
    pairWithGuide: {
      slug: "first-brew",
      title: "Your first brew, in three honest steps.",
    },
    tag: { label: "Bestseller", kind: "bestseller" },
  },
  {
    slug: "pour-over",
    name: "Pour-Over Kit",
    jaSubtitle: "ハンドドリップキット",
    dek: "Filter coffee for people who don't want an espresso machine. Quiet, simple, beautiful.",
    longDesc:
      "Portable V60, sharing pot, scale, and a box of drip bags for the days you don't want to think about it. Everything you need for two cups of hand-poured filter coffee — and a soft landing on the days you don't.",
    bundleNote:
      "Pour-over rewards consistency over equipment. We bundled the pieces you'll actually touch every brew, and skipped the gooseneck kettle — your existing kettle is fine to start. When you've decided you love this style, that's the upgrade we'd point to first.",
    items: [
      "portable-dripper",
      "sharing-pot",
      "scale-mini",
      "drip-bags",
    ],
    price: "$84",
    alaCarte: "$94",
    savings: "Save 11%",
    honestExpectations:
      "Pour-over is a quiet hobby. If you want a barista experience at home — steamed milk, latte art, espresso shots — this isn't the kit. The First-Brew Kit is. We won't be offended if you switch.",
    pairWithGuide: {
      slug: "first-brew",
      title: "Your first brew, in three honest steps.",
    },
  },
  {
    slug: "sensory",
    name: "Sensory Kit",
    jaSubtitle: "感覚キット",
    dek: "Built for the day you decide you want to taste what you're drinking. The Sensory Cup plus the tools that surround it.",
    longDesc:
      "The Sensory Cup, a Halo Mini Scale, a box of drip bags, and the printed first-brew guide. The kit for the person who's been drinking coffee for years and wants to start noticing it.",
    bundleNote:
      "Tasting is a skill — and like every skill, the right tools make it noticeably easier to learn. The cup concentrates aroma; the scale lets you make the same brew twice; the drip bags remove every variable except the bean. Compare two beans side-by-side using this kit and you'll start hearing your own preferences.",
    items: ["sensory-cup", "scale-mini", "drip-bags"],
    price: "$54",
    alaCarte: "$58",
    savings: "Save 7%",
    honestExpectations:
      "This won't make your coffee taste different. It'll make it easier to notice what it already tastes like. That's the whole gift.",
    pairWithGuide: {
      slug: "first-brew",
      title: "Your first brew, in three honest steps.",
    },
    tag: { label: "New", kind: "new" },
  },
];

export function getKit(slug: string): Kit | undefined {
  return KITS.find((k) => k.slug === slug);
}
