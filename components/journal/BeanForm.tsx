import Link from "next/link";
import { type Bean } from "@/types/database";
import { ROUTES } from "@/lib/links";

type Props = {
  bean?: Bean | null;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
};

export function BeanForm({ bean, action, submitLabel = "Save bean" }: Props) {
  return (
    <form
      action={action}
      className="grid gap-5 rounded-[22px] bg-cream-paper p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          defaultValue={bean?.name ?? ""}
          placeholder="Ethiopia Yirgacheffe"
        />
        <Field
          label="Roaster"
          name="roaster"
          defaultValue={bean?.roaster ?? ""}
          placeholder="e.g. Common Room"
        />
        <Field
          label="Origin"
          name="origin"
          defaultValue={bean?.origin ?? ""}
          placeholder="Ethiopia"
        />
        <Field
          label="Process"
          name="process"
          defaultValue={bean?.process ?? ""}
          placeholder="Washed / Natural / Honey"
        />
        <Field
          label="Roast date"
          name="roast_date"
          type="date"
          defaultValue={bean?.roast_date ?? ""}
        />
      </div>

      <TextArea
        label="Tasting notes (from the bag)"
        name="bag_notes"
        defaultValue={bean?.bag_notes ?? ""}
        placeholder="Notes the roaster put on the bag — citrus, chocolate, brown sugar…"
      />

      <TextArea
        label="Your own notes"
        name="my_notes"
        defaultValue={bean?.my_notes ?? ""}
        placeholder="What you actually taste in the cup. Add to this as you drink through the bag."
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Link
          href={bean ? ROUTES.bean(bean.id) : ROUTES.beans}
          className="text-[13px] font-semibold text-ink/75 hover:text-ink"
        >
          ← Cancel
        </Link>
        <button
          type="submit"
          className="rounded-full bg-green px-6 py-3 text-[15px] font-bold text-cream hover:bg-green/90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  const id = `bean-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink/75"
      >
        {label}
        {required && <span className="ml-1 text-rust">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
      />
    </div>
  );
}

function TextArea({
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
  const id = `bean-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink/75"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={3}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-y rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] leading-snug outline-none focus:border-green"
      />
    </div>
  );
}
