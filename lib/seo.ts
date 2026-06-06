// JSON-LD builders. Each returns a plain object that should be rendered
// via <JsonLd data={...} /> inside the relevant page.

import { type Product } from "@/lib/products";
import { type Kit } from "@/lib/kits";
import { type Guide } from "@/lib/guides";
import { type Post } from "@/lib/journal";

export const SITE = "https://www.nudo-lab.com";
export const ORG_NAME = "Nudo Lab";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE,
    logo: `${SITE}/icon.png`,
    description:
      "Friendly brewing tools for beginners. Espresso, pour-over, and starter kits, without the gatekeeping.",
    parentOrganization: {
      "@type": "Organization",
      name: "WTD",
      alternateName: "The Daily",
    },
    sameAs: [
      // TODO(founder): populate with real social URLs from lib/links.ts
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE,
    inLanguage: "en",
  };
}

export function breadcrumbLd(
  crumbs: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE + c.href,
    })),
  };
}

export function productLd(p: Product) {
  // Price is held as a string with a leading $; pull the numeric part.
  const priceNum = Number(p.price.replace(/[^0-9.]/g, ""));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.longDesc,
    image: SITE + p.image,
    brand: { "@type": "Brand", name: ORG_NAME },
    category: p.category,
    sku: `NUDO-${p.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      url: `${SITE}/shop/${p.slug}`,
      priceCurrency: "USD",
      price: priceNum,
      availability: p.placeholder
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
    },
  };
}

export function kitLd(k: Kit) {
  const priceNum = Number(k.price.replace(/[^0-9.]/g, ""));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: k.name,
    description: k.longDesc,
    brand: { "@type": "Brand", name: ORG_NAME },
    category: "kit",
    sku: `NUDO-KIT-${k.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      url: `${SITE}/kits/${k.slug}`,
      priceCurrency: "USD",
      price: priceNum,
      availability: "https://schema.org/PreOrder",
    },
  };
}

export function itemListLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/shop/${p.slug}`,
      name: p.name,
    })),
  };
}

export function howToLd(args: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT6M"
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    ...(args.totalTime ? { totalTime: args.totalTime } : {}),
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.dek,
    author: { "@type": "Organization", name: ORG_NAME },
    datePublished: post.publishedAt,
    url: `${SITE}/journal/${post.slug}`,
  };
}

export function guideLd(g: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.dek,
    author: { "@type": "Organization", name: ORG_NAME },
    url: `${SITE}/guides/${g.slug}`,
  };
}

export function faqLd(qa: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.question,
      acceptedAnswer: { "@type": "Answer", text: x.answer },
    })),
  };
}
