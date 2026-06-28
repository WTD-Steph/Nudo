"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MethodPicker } from "@/components/journal/MethodPicker";
import { FreshnessIndicator } from "@/components/journal/FreshnessIndicator";
import type { Bean, Brew, BrewMethod } from "@/types/database";
import { ROUTES } from "@/lib/links";

type Props = {
  beans: Pick<
    Bean,
    "id" | "name" | "roaster" | "roast_date"
  >[];
  /** Optional bean to preselect (e.g. from ?bean=... or "log brew from bean page"). */
  initialBeanId?: string | null;
  /** Optional last brew of the selected bean — drives the "what's different?" pre-fill. */
  prefill?: Brew | null;
  action: (formData: FormData) => Promise<void>;
};

const FIELDS: { key: string; label: string }[] = [
  { key: "grind_clicks", label: "Grind" },
  { key: "dose_g", label: "Dose" },
  { key: "yield_g", label: "Yield" },
  { key: "time_s", label: "Time" },
  { key: "water_temp_c", label: "Temp" },
  { key: "gear_used", label: "Gear" },
];

export function BrewForm({ beans, initialBeanId, prefill, action }: Props) {
  const [beanId, setBeanId] = useState(initialBeanId ?? "");
  const selectedBean = useMemo(
    () => beans.find((b) => b.id === beanId) ?? null,
    [beans, beanId],
  );

  return (
    <form
      action={action}
      className="grid gap-6 rounded-[22px] bg-cream-paper p-6 sm:p-8"
    >
      {/* Bean */}
      <div>
        <label
          htmlFor="brew-bean"
          className="mb-1.5 block text-[13px] font-semibold text-ink/75"
        >
          Bean
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <select
            id="brew-bean"
            name="bean_id"
            value={beanId}
            onChange={(e) => setBeanId(e.target.value)}
            className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
          >
            <option value="">— No bean —</option>
            {beans.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
                {b.roaster ? ` · ${b.roaster}` : ""}
              </option>
            ))}
          </select>
          <Link
            href={ROUTES.newBean}
            className="self-center text-[13px] font-semibold text-green hover:underline"
          >
            + New bean
          </Link>
        </div>
        {selectedBean && (
          <div className="mt-2">
            <FreshnessIndicator roastDate={selectedBean.roast_date} />
          </div>
        )}
      </div>

      {/* Method */}
      <MethodPicker defaultValue={(prefill?.method as BrewMethod) ?? "espresso"} />

      {/* "What's different?" — only when we pre-filled */}
      {prefill && (
        <div className="rounded-[14px] bg-mustard p-4">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink/80">
            Change one thing
          </div>
          <p className="mt-1 text-[14px] leading-snug text-ink">
            We pre-filled this from your last brew of{" "}
            <strong>{selectedBean?.name}</strong>. The brand rule is{" "}
            <em>change one thing</em> — tell us what:
          </p>
          <input
            type="text"
            name="variable_changed"
            placeholder="e.g. grind one click finer · 2 °C hotter water · longer bloom"
            defaultValue={prefill.variable_changed ?? ""}
            className="mt-3 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 text-[14px] outline-none focus:border-ink"
          />
        </div>
      )}

      {/* Numbers */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumField
          label="Dose (g)"
          name="dose_g"
          step="0.1"
          defaultValue={prefill?.dose_g ?? null}
        />
        <NumField
          label="Yield (g)"
          name="yield_g"
          step="0.1"
          defaultValue={prefill?.yield_g ?? null}
        />
        <NumField
          label="Time (s)"
          name="time_s"
          step="1"
          defaultValue={prefill?.time_s ?? null}
        />
        <TextField
          label="Grind (clicks / setting)"
          name="grind_clicks"
          defaultValue={prefill?.grind_clicks ?? ""}
          placeholder="e.g. 18 clicks · 4.5"
        />
        <NumField
          label="Water temp (°C)"
          name="water_temp_c"
          step="1"
          defaultValue={prefill?.water_temp_c ?? null}
        />
        <TextField
          label="Gear used"
          name="gear_used"
          defaultValue={prefill?.gear_used ?? ""}
          placeholder="Machine, dripper, basket, etc."
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="brew-notes"
          className="mb-1.5 block text-[13px] font-semibold text-ink/75"
        >
          Tasting notes
        </label>
        <textarea
          id="brew-notes"
          name="notes"
          rows={4}
          defaultValue={prefill?.notes ?? ""}
          placeholder="What did it taste like? Sour, bitter, balanced, thin, syrupy…"
          className="w-full resize-y rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] leading-snug outline-none focus:border-green"
        />
      </div>

      {/* Rating + would-brew-again */}
      <div className="grid gap-5 sm:grid-cols-2">
        <RatingField defaultValue={prefill?.rating ?? null} />
        <WouldBrewAgainField defaultValue={prefill?.would_brew_again ?? null} />
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Link
          href={ROUTES.myJournal}
          className="text-[13px] font-semibold text-ink/75 hover:text-ink"
        >
          ← Cancel
        </Link>
        <button
          type="submit"
          className="rounded-full bg-green px-6 py-3 text-[15px] font-bold text-cream hover:bg-green/90"
        >
          Save brew
        </button>
      </div>
    </form>
  );
}

function NumField({
  label,
  name,
  step,
  defaultValue,
}: {
  label: string;
  name: string;
  step: string;
  defaultValue: number | null;
}) {
  const id = `brew-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink/75"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        step={step}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
      />
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const id = `brew-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink/75"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
      />
    </div>
  );
}

function RatingField({ defaultValue }: { defaultValue: number | null }) {
  const [value, setValue] = useState<number | "">(defaultValue ?? "");
  return (
    <div>
      <div className="mb-1.5 text-[13px] font-semibold text-ink/75">
        How was it? (1–5)
      </div>
      <input type="hidden" name="rating" value={value} />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setValue(value === n ? "" : n)}
            aria-label={`${n} of 5`}
            className={`rounded-md px-3 py-2 text-[15px] font-bold transition ${
              value && value >= n
                ? "bg-mustard text-ink"
                : "bg-cream text-ink/40 hover:bg-cream-paper"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

function WouldBrewAgainField({
  defaultValue,
}: {
  defaultValue: boolean | null;
}) {
  const [value, setValue] = useState<"yes" | "no" | "">(
    defaultValue === true ? "yes" : defaultValue === false ? "no" : "",
  );
  return (
    <div>
      <div className="mb-1.5 text-[13px] font-semibold text-ink/75">
        Would you brew it again?
      </div>
      <input type="hidden" name="would_brew_again" value={value} />
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((v) => (
          <button
            type="button"
            key={v}
            onClick={() => setValue(value === v ? "" : v)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              value === v
                ? v === "yes"
                  ? "bg-green text-cream"
                  : "bg-rust text-cream"
                : "bg-cream text-ink/75 hover:bg-cream-paper"
            }`}
          >
            {v === "yes" ? "✓ Yes" : "· No"}
          </button>
        ))}
      </div>
    </div>
  );
}
