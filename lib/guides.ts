// Guide registry — metadata only; the body is a TSX page at /guides/[slug].

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  readingTimeMin: number;
  category: "brew" | "reference" | "care";
};

export const GUIDES: Guide[] = [
  {
    slug: "first-brew",
    title: "Your first brew, in three honest steps.",
    dek: "The shortest path we know to a cup that's better than yesterday's. No 14-minute videos. No gatekeeping. Six minutes of reading.",
    readingTimeMin: 6,
    category: "brew",
  },
  {
    slug: "coffee-words",
    title: "Coffee words, explained.",
    dek: "Every word we use on this site, in one sentence each. If we missed one, tell us — we'll add it.",
    readingTimeMin: 8,
    category: "reference",
  },
  {
    slug: "why-first-shot-was-bad",
    title: "Why your first shot was bad.",
    dek: "It wasn't the beans. It was almost certainly one of these five things. Probably the second one.",
    readingTimeMin: 4,
    category: "brew",
  },
  {
    slug: "care-and-cleaning",
    title: "Care & cleaning, made simple.",
    dek: "How to clean your gear in the time it takes to drink the coffee you just made.",
    readingTimeMin: 5,
    category: "care",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getRelatedGuides(slug: string, n = 2): Guide[] {
  const me = getGuide(slug);
  const same = GUIDES.filter(
    (g) => g.slug !== slug && (!me || g.category === me.category),
  );
  const others = GUIDES.filter((g) => g.slug !== slug && !same.includes(g));
  return [...same, ...others].slice(0, n);
}
