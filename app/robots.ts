import type { MetadataRoute } from "next";

const SITE = "https://www.nudo-lab.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/og"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
