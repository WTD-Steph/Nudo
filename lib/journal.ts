export type Post = {
  slug: string;
  title: string;
  dek: string;
  publishedAt: string; // ISO date
  readingTimeMin: number;
  author: string;
  tone: "ops" | "advice" | "voice";
};

export const POSTS: Post[] = [
  {
    slug: "packing-1000-first-brew-kits",
    title: "What we learned packing 1,000 First-Brew Kits.",
    dek: "Six things we didn't expect — and the one we should have. Honest notes from the studio floor.",
    publishedAt: "2026-05-12",
    readingTimeMin: 5,
    author: "Nudo team",
    tone: "ops",
  },
  {
    slug: "cheapest-grinder-we-recommend",
    title: "The cheapest grinder we'd actually recommend.",
    dek: "Spoiler: it's not ours. We don't sell a grinder — and the one we'd buy under $200 is from a competitor. Here's why.",
    publishedAt: "2026-05-05",
    readingTimeMin: 4,
    author: "Nudo team",
    tone: "advice",
  },
  {
    slug: "pour-over-for-instant-drinkers",
    title: "Pour-over for people who already drink instant.",
    dek: "If you live on Nescafé sachets, this is the lowest-pressure way to try something different. No moral lectures, no jargon.",
    publishedAt: "2026-04-28",
    readingTimeMin: 6,
    author: "Nudo team",
    tone: "voice",
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsSorted(): Post[] {
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
