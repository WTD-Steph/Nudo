const STEPS = [
  {
    n: "01",
    title: "Weigh it, don’t guess it.",
    body:
      "A scale changes everything. Same beans, same grind, same weight in — and suddenly your coffee tastes the same on Tuesday as it did on Saturday.",
    tip: "A 0.1g scale is all you need to start. We sell one for $32.",
  },
  {
    n: "02",
    title: "Distribute, then tamp.",
    body:
      "Use the WDT tool to stir the bed first — this breaks up clumps and stops the water from finding the easy way out. Then tamp level.",
    tip: "Tamp until you can’t push any harder. That’s it.",
  },
  {
    n: "03",
    title: "Taste before you tweak.",
    body:
      "Sour means under, bitter means over. Pour into our sensory cup, take a sip, decide one thing to change next time. Then change just that thing.",
    tip: "Change one variable per brew — or you won’t know what worked.",
  },
];

export function Journey() {
  return (
    <section className="border-t border-rule-cream px-12 py-20">
      <div className="mb-14 grid items-end gap-12 md:grid-cols-2">
        <h2 className="m-0 text-balance text-[56px] font-bold leading-none tracking-[-0.03em]">
          Your <em className="not-italic text-rust">first brew</em>, in three
          honest steps.
        </h2>
        <p className="m-0 max-w-[440px] text-base text-ink/70">
          Not a 14-minute video. Not a long article. Just the three things that
          actually matter for your first cup at home — with the tools that make
          each one easier.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="relative flex min-h-[320px] flex-col gap-4 rounded-[22px] bg-cream-paper p-7"
          >
            <span className="inline-flex self-start rounded-full bg-green px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-cream">
              Step {s.n}
            </span>
            <h3 className="m-0 text-[28px] font-bold leading-[1.1] tracking-tight">
              {s.title}
            </h3>
            <p className="m-0 text-[15px] leading-snug text-ink/70">
              {s.body}
            </p>
            <div className="mt-auto flex items-start gap-2 border-t border-dashed border-rule-cream pt-4 text-[13px] text-ink/80">
              <b className="font-bold text-rust">Tip ·</b>
              <span>{s.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
