"use client";

import { useState } from "react";

export function TrackOrderForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: String(fd.get("orderNumber") ?? ""),
          email: String(fd.get("email") ?? ""),
        }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { errors?: Record<string, string> }
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
          Lookup queued
        </div>
        <h3 className="m-0 mt-2 text-[24px] font-bold leading-tight tracking-tight">
          Check your email in a few minutes.
        </h3>
        <p className="mt-3 text-[14px] text-cream/75">
          If nothing arrives within an hour, email us directly — we&rsquo;ll
          look it up by hand.
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
        <p
          role="alert"
          className="rounded-md bg-rust/10 p-3 text-[14px] text-rust"
        >
          {errors._}
        </p>
      )}

      <div>
        <label
          htmlFor="orderNumber"
          className="mb-1.5 block text-[13px] font-semibold text-ink/70"
        >
          Order number
        </label>
        <input
          id="orderNumber"
          name="orderNumber"
          required
          placeholder="e.g. NL-2026-0419"
          aria-invalid={!!errors.orderNumber}
          className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
        />
        {errors.orderNumber && (
          <p role="alert" className="mt-1 text-[12px] text-rust">
            {errors.orderNumber}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[13px] font-semibold text-ink/70"
        >
          Email used at checkout
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!errors.email}
          className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-green"
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-[12px] text-rust">
            {errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-green px-6 py-3 text-[15px] font-bold text-cream hover:bg-green/90 disabled:opacity-50"
      >
        {status === "submitting" ? "Looking up…" : "Find my order"}
      </button>
    </form>
  );
}
