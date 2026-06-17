// Bean freshness window logic.
// Pragmatic rules from the first-brew guide:
//   - 0–3 days post-roast: still degassing, too gassy for espresso
//   - 4–14 days: peak window (sweet spot)
//   - 15–28 days: still good, slightly muted
//   - 29–45 days: getting old, sometimes nice for filter
//   - 45+ days: past their best
//
// Returned for the FreshnessIndicator component.

export type FreshnessBucket =
  | "too-fresh"
  | "sweet-spot"
  | "good"
  | "fading"
  | "old";

export type FreshnessResult = {
  daysOld: number;
  bucket: FreshnessBucket;
  label: string; // shown to the user
  tone: "rust" | "green" | "mustard" | "ink"; // for UI styling
};

export function freshnessFromRoastDate(
  roastDate: string | null | undefined,
  now: Date = new Date(),
): FreshnessResult | null {
  if (!roastDate) return null;
  const roast = new Date(roastDate + "T00:00:00Z");
  if (Number.isNaN(roast.getTime())) return null;
  const diffMs = now.getTime() - roast.getTime();
  const daysOld = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (daysOld < 4) {
    return {
      daysOld,
      bucket: "too-fresh",
      label: `Day ${daysOld} — still degassing`,
      tone: "mustard",
    };
  }
  if (daysOld <= 14) {
    return {
      daysOld,
      bucket: "sweet-spot",
      label: `Day ${daysOld} — sweet spot`,
      tone: "green",
    };
  }
  if (daysOld <= 28) {
    return {
      daysOld,
      bucket: "good",
      label: `Day ${daysOld} — still good`,
      tone: "ink",
    };
  }
  if (daysOld <= 45) {
    return {
      daysOld,
      bucket: "fading",
      label: `Day ${daysOld} — getting old`,
      tone: "mustard",
    };
  }
  return {
    daysOld,
    bucket: "old",
    label: `Day ${daysOld} — past their best`,
    tone: "rust",
  };
}
