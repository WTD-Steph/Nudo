import { Fragment } from "react";

const ROWS: { label: string; nudo: string; exakt: string }[] = [
  {
    label: "Brand role",
    nudo: "OEM-based starter tools",
    exakt: "Custom-built, better materials",
  },
  {
    label: "Positioning",
    nudo: "Friendly starter kit for beginners",
    exakt: "Thoughtful companion for makers",
  },
  {
    label: "Target Audience",
    nudo: "Coffee beginners or early enthusiasts",
    exakt: "Coffee enthusiasts ready to upgrade",
  },
  {
    label: "Tone & Voice",
    nudo: "Friendly, supportive",
    exakt: "Refined, thoughtful, confident",
  },
  {
    label: "Emotional Tone",
    nudo: "Helps you get started",
    exakt: "Helps you build your practice",
  },
  {
    label: "Brand examples",
    nudo: "Muvna, Timemore Basic",
    exakt: "Fellow, Origami, Hario",
  },
];

export function ExaktComparison() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-rule-cream">
      <div className="grid grid-cols-[1.2fr_1fr_1fr]">
        <div className="bg-cream-paper p-5 font-mono text-[11px] uppercase tracking-widest text-ink/65" />
        <div className="bg-cream-paper p-5 text-[15px] font-bold">Nudo Lab</div>
        <div className="bg-cream-paper p-5 text-[15px] font-bold text-green">
          Exakt
        </div>
        {ROWS.map((r, i) => {
          const bg = i % 2 ? "bg-cream" : "bg-cream-paper/40";
          return (
            <Fragment key={r.label}>
              <div className={`p-5 text-[13px] font-semibold text-ink/75 ${bg}`}>
                {r.label}
              </div>
              <div className={`p-5 text-[15px] leading-snug ${bg}`}>
                {r.nudo}
              </div>
              <div className={`p-5 text-[15px] leading-snug ${bg}`}>
                {r.exakt}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
