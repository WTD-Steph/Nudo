import { freshnessFromRoastDate } from "@/lib/journal/freshness";

const TONE: Record<string, string> = {
  green: "bg-green text-cream",
  mustard: "bg-mustard text-ink",
  rust: "bg-rust text-cream",
  ink: "bg-sand text-ink",
};

type Props = {
  roastDate: string | null | undefined;
  /** Layout: "pill" for inline cards, "block" for detail pages. */
  variant?: "pill" | "block";
};

export function FreshnessIndicator({ roastDate, variant = "pill" }: Props) {
  const f = freshnessFromRoastDate(roastDate);
  if (!f) {
    if (variant === "pill") return null;
    return (
      <div className="rounded-full bg-cream-paper px-3 py-1 text-[12px] text-ink/60">
        No roast date yet
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${TONE[f.tone]}`}
      >
        <span aria-hidden>●</span>
        {f.label}
      </span>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-[14px] font-semibold ${TONE[f.tone]}`}
    >
      <span>{f.label}</span>
      <span className="font-mono text-[11px] uppercase tracking-widest opacity-80">
        {f.bucket.replace("-", " ")}
      </span>
    </div>
  );
}
