"use client";

import { useState } from "react";

type Errors = Record<string, string>;

const TOPICS = [
  { value: "general", label: "General question" },
  { value: "order", label: "About my order" },
  { value: "wholesale", label: "Wholesale" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      topic: String(fd.get("topic") ?? "general"),
      message: String(fd.get("message") ?? ""),
    };
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { errors?: Errors }
        | null;
      setErrors(data?.errors ?? { _: "Something went wrong. Try again?" });
      setStatus("error");
    } catch {
      setErrors({ _: "Network hiccup. Try again in a moment." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[22px] bg-green p-10 text-cream"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-mustard">
          Message sent
        </div>
        <h3 className="m-0 mt-2 text-[clamp(22px,2.4vw,32px)] font-bold leading-tight tracking-tight">
          We got it. A real person replies within a day.
        </h3>
        <p className="mt-3 text-[15px] text-cream/75">
          If your inbox is the bottleneck, we&rsquo;ll move to WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-[22px] bg-cream-paper p-6 sm:p-8"
    >
      {errors._ && (
        <p role="alert" className="rounded-md bg-rust/10 p-3 text-[14px] text-rust">
          {errors._}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <div>
        <label
          htmlFor="topic"
          className="mb-1.5 block text-[13px] font-semibold text-ink/70"
        >
          What&rsquo;s this about?
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue="general"
          className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
          aria-invalid={!!errors.topic}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p role="alert" className="mt-1 text-[12px] text-rust">
            {errors.topic}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[13px] font-semibold text-ink/70"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] leading-snug outline-none focus:border-green"
          placeholder="What's going on? More detail is better than less."
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p role="alert" className="mt-1 text-[12px] text-rust">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-ink/50">
          We&rsquo;ll only use your email to reply. No newsletters from this
          form.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-green px-6 py-3 text-[15px] font-bold text-cream hover:bg-green/90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink/70"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
      />
      {error && (
        <p role="alert" className="mt-1 text-[12px] text-rust">
          {error}
        </p>
      )}
    </div>
  );
}
