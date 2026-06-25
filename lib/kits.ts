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
    dek: "The shortest path to a good first shot. Five pieces, one printed guide, no gatekeeping.",
    longDesc:
      "Dosing scoop, tamping mat, scale, sharing pot, and a printed guide we wrote so you don't need to watch four YouTube videos before breakfast. The kit we'd hand a friend on their first day at home.",
    bundleNote:
      "We bundled it in this order because it's the order you'll use them in. Scoop the beans. Weigh on the scale. Tamp on the mat. Pour into the pot. Read the guide when you want to know why.",
    items: [
      "dosing-scoop",
      "tamping-mat",
      "scale-cube",
      "sharing-pot",
    ],
    price: "$92",
    alaCarte: "$112",
    savings: "Save 18%",
    honestExpectations:
      "This kit assumes you already have an espresso machine or a dripper. If you don't, here are two espresso machines we'd trust under $500 — neither is ours: the Breville Bambino Plus or the Gaggia Classic Pro. Email us before you buy either; we'll save you an hour.",
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
      "Pour-over stand with chilling ball, a sharing pot to pour into, and the Lite scale that does everything a pour-over scale needs. Everything you need for two cups of hand-poured filter coffee — and a setup you don't mind looking at on the counter.",
    bundleNote:
      "Pour-over rewards consistency over equipment. The stand fixes one variable — your dripper alignment — so you can focus on the pour. The chilling ball is for the iced day. The scale is the cheapest, biggest upgrade you can make.",
    items: ["pour-over-stand", "sharing-pot", "scale-lite"],
    price: "$108",
    alaCarte: "$114",
    savings: "Save 5%",
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
    dek: "Built for the day you decide you want to taste what you're drinking. The Prism Rocks Glass and the tools that surround it.",
    longDesc:
      "The Prism Rocks Glass, a Lite scale, and the printed first-brew guide. The kit for the person who's been drinking coffee for years and wants to start noticing it — iced filter, an espresso tonic, a deliberate cup.",
    bundleNote:
      "Tasting is a skill — and like every skill, the right tools make it noticeably easier to learn. The glass catches light differently every time you set it down; the scale lets you make the same brew twice. Compare two beans side-by-side and you'll start hearing your own preferences.",
    items: ["rocks-glass", "scale-lite", "sharing-pot"],
    price: "$58",
    alaCarte: "$64",
    savings: "Save 9%",
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
