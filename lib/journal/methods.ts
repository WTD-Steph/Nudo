import { type BrewMethod } from "@/types/database";

export type MethodMeta = {
  key: BrewMethod;
  label: string;
  short: string; // 1-line summary, used as method-picker hint
  defaultDoseRange: [number, number]; // g
  defaultRatio: [number, number]; // 1:X
  emoji: string; // small visual cue in pickers
};

export const METHODS: MethodMeta[] = [
  {
    key: "espresso",
    label: "Espresso",
    short: "Pressurised, fine grind, 25–30 s shot.",
    defaultDoseRange: [17, 19],
    defaultRatio: [2, 2],
    emoji: "☕",
  },
  {
    key: "pour-over",
    label: "Pour-over",
    short: "V60 / Kalita / Origami. Medium grind, ~3 min total.",
    defaultDoseRange: [15, 18],
    defaultRatio: [16, 17],
    emoji: "💧",
  },
  {
    key: "aeropress",
    label: "AeroPress",
    short: "Immersion + press. Forgiving, fast, travel-friendly.",
    defaultDoseRange: [12, 17],
    defaultRatio: [13, 15],
    emoji: "🌀",
  },
  {
    key: "french-press",
    label: "French Press",
    short: "Full immersion. Coarse grind, 4 min steep.",
    defaultDoseRange: [25, 30],
    defaultRatio: [15, 17],
    emoji: "🧪",
  },
  {
    key: "moka-pot",
    label: "Moka Pot",
    short: "Stovetop pressure. Medium-fine grind, low heat.",
    defaultDoseRange: [16, 20],
    defaultRatio: [4, 5],
    emoji: "🔥",
  },
  {
    key: "drip-bag",
    label: "Drip Bag",
    short: "Single-serve pour-over. Just add hot water.",
    defaultDoseRange: [10, 12],
    defaultRatio: [16, 17],
    emoji: "📦",
  },
];

export function getMethod(key: BrewMethod): MethodMeta {
  return METHODS.find((m) => m.key === key) ?? METHODS[0];
}

export function methodLabel(key: BrewMethod | null | undefined): string {
  if (!key) return "—";
  return getMethod(key).label;
}
