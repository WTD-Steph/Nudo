const CARDS = [
  {
    num: "01",
    title: "The lingo.",
    body:
      "Channeling, distribution, retention — we explain everything in plain English. If we use a coffee word, we tell you what it means.",
    feat: false,
  },
  {
    num: "02",
    title: "The first try.",
    body:
      "Your first shot will be bad. That’s normal — even expected. Our tools and guides make the second one noticeably better.",
    feat: true,
  },
  {
    num: "03",
    title: "The price tag.",
    body:
      "Starter doesn’t mean cheap-feeling. Every Nudo piece is the one we’d hand a friend — tested, reliable, and not overbuilt.",
    feat: false,
  },
];

export function Reassure() {
  return (
    <section className="px-12 py-20">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="m-0 max-w-[720px] text-balance text-[56px] font-bold leading-[1.02] tracking-[-0.03em]">
          Three things you don&rsquo;t need to be{" "}
          <em className="not-italic text-clay">intimidated</em> by.
        </h2>
        <div className="text-right font-mono text-[13px] uppercase tracking-wider text-mute">
          No-gatekeep zone
          <br />
          Brewed since 2025
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.num}
            className={`flex min-h-[280px] flex-col justify-between gap-4 rounded-[22px] p-7 pb-8 ${
              c.feat ? "bg-charcoal text-cream" : "bg-cream-2 text-charcoal"
            }`}
          >
            <div
              className={`text-[64px] font-bold leading-none tracking-[-0.04em] ${
                c.feat ? "text-cream opacity-20" : "text-charcoal opacity-20"
              }`}
            >
              {c.num}
            </div>
            <div>
              <h3 className="m-0 text-[26px] font-bold leading-[1.15] tracking-tight">
                {c.title}
              </h3>
              <p
                className={`mt-2 text-[15px] leading-snug ${
                  c.feat ? "text-cream/75" : "text-charcoal-soft"
                }`}
              >
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
