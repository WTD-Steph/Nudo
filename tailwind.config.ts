import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — see brand brief page 10
        green: "#0D330E",
        rust: "#A3481A",
        sand: "#F1DAAE",
        mustard: "#E3AD55",
        cream: {
          DEFAULT: "#FDF8DE",
          // a slightly warmer cream for nested cards
          paper: "#FAF6E6",
        },
        // Neutral / system
        ink: {
          DEFAULT: "#1A1A1A",
          70: "rgba(26,26,26,0.7)",
          40: "rgba(26,26,26,0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        ja: [
          "var(--font-noto-jp)",
          "var(--font-urbanist)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderColor: {
        "rule-cream": "rgba(26,26,26,0.12)",
        "rule-green": "rgba(253,248,222,0.14)",
      },
      transitionTimingFunction: {
        nudo: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
      },
    },
  },
  plugins: [],
};

export default config;
