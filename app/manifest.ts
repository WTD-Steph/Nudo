import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nudo Lab",
    short_name: "Nudo",
    description: "Friendly brewing tools for beginners. For every first brews.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF8DE",
    theme_color: "#0D330E",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
