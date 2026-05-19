import type { MetadataRoute } from "next";

const SITE = "https://nudolab.vercel.app";

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
