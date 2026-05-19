import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { GUIDES } from "@/lib/guides";
import { POSTS } from "@/lib/journal";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/products";

const SITE = "https://nudolab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/shop",
    "/kits",
    "/guides",
    "/journal",
    "/about",
    "/about/makker",
    "/help/contact",
    "/help/shipping-returns",
    "/help/track-order",
  ].map((path) => ({
    url: SITE + path,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const shopCategoryRoutes: MetadataRoute.Sitemap = CATEGORIES
    .filter((c) => c.key !== "all")
    .map((c) => ({
      url: `${SITE}/shop?category=${c.key}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: `${SITE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const kitRoutes: MetadataRoute.Sitemap = KITS.map((k) => ({
    url: `${SITE}/kits/${k.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE}/journal/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...shopCategoryRoutes,
    ...productRoutes,
    ...kitRoutes,
    ...guideRoutes,
    ...postRoutes,
  ];
}
