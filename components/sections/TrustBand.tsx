const ITEMS = [
  "Free shipping over $40",
  "30-day no-questions returns",
  "Beginner-friendly guides included",
  "Real humans on chat 9–6 ET",
];

export function TrustBand() {
  return (
    <div className="mx-12 flex flex-wrap items-center gap-8 border-t border-rule-cream pt-7 text-[13px] font-medium text-charcoal-soft">
      {ITEMS.map((label) => (
        <span key={label} className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          {label}
        </span>
      ))}
    </div>
  );
}
