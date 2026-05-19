import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#212121",
          2: "#2c2a26",
          soft: "#383634",
        },
        cream: {
          DEFAULT: "#f9f4de",
          2: "#f3eed5",
          soft: "#ece5c5",
        },
        warm: "#e8c97a",
        clay: "#c46a3a",
        mute: "#76716a",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderColor: {
        "rule-cream": "rgba(33, 33, 33, 0.12)",
        "rule-charcoal": "rgba(249, 244, 222, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
