"use client";

import { useState } from "react";
import { METHODS } from "@/lib/journal/methods";
import type { BrewMethod } from "@/types/database";

type Props = {
  name?: string;
  defaultValue?: BrewMethod;
};

export function MethodPicker({ name = "method", defaultValue = "espresso" }: Props) {
  const [picked, setPicked] = useState<BrewMethod>(defaultValue);

  return (
    <div>
      <div className="mb-1.5 text-[13px] font-semibold text-ink/75">
        Method <span className="text-rust">*</span>
      </div>
      <input type="hidden" name={name} value={picked} />
      <div
        role="radiogroup"
        aria-label="Brew method"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {METHODS.map((m) => {
          const active = m.key === picked;
          return (
            <button
              type="button"
              key={m.key}
              role="radio"
              aria-checked={active}
              onClick={() => setPicked(m.key)}
              className={`flex flex-col items-start gap-1 rounded-[14px] border px-3 py-3 text-left transition ${
                active
                  ? "border-green bg-green text-cream"
                  : "border-rule-cream bg-cream hover:border-green"
              }`}
            >
              <div className="flex items-center gap-2 text-[15px] font-bold">
                <span aria-hidden>{m.emoji}</span>
                <span>{m.label}</span>
              </div>
              <span
                className={`text-[11px] leading-snug ${active ? "text-cream/80" : "text-ink/70"}`}
              >
                {m.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
