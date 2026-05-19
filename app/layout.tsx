import type { Metadata } from "next";
import { Urbanist, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nudolab.vercel.app"),
  title: {
    default: "Nudo Lab — For every first brews",
    template: "%s · Nudo Lab",
  },
  description:
    "Friendly brewing tools for beginners who want to learn, experiment, and enjoy coffee without the pressure. Because great coffee doesn't have to be complicated.",
  openGraph: {
    title: "Nudo Lab — For every first brews",
    description:
      "Friendly brewing tools for beginners. Espresso, pour-over, and starter kits without the gatekeeping.",
    type: "website",
    images: ["/og?title=For%20every%20first%20brews."],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nudo Lab — For every first brews",
    description:
      "Friendly brewing tools for beginners. Espresso, pour-over, and starter kits without the gatekeeping.",
    images: ["/og?title=For%20every%20first%20brews."],
  },
  themeColor: "#0D330E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${jetbrains.variable} ${notoJp.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
