"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { errors?: Record<string, string> }
        | null;
      setErrorMsg(data?.errors?.email ?? "Couldn't subscribe — try again?");
      setStatus("error");
    } catch {
      setErrorMsg("Network hiccup. Try again in a moment.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-cream-paper px-12 py-20">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="m-0 text-balance text-[56px] font-bold leading-none tracking-[-0.03em]">
            Bad first shots,{" "}
            <em className="not-italic text-rust">fixed.</em>
          </h2>
          <p className="mt-4 max-w-[380px] text-base text-ink/70">
            One short email a week. One thing to try with the kit you already
            have. Unsubscribe whenever, no hard feelings.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
          aria-describedby={errorMsg ? "newsletter-error" : undefined}
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2.5 rounded-full border-[1.5px] border-green bg-cream p-2.5 pl-5 text-[15px] font-semibold text-green"
            >
              <span aria-hidden>✦</span>
              Thanks — check your inbox.
            </div>
          ) : (
            <div
              className={`flex items-center gap-2.5 rounded-full border-[1.5px] bg-cream p-2.5 ${
                status === "error" ? "border-rust" : "border-rule-cream"
              }`}
            >
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="your@email.com"
                aria-invalid={status === "error"}
                disabled={status === "submitting"}
                className="flex-1 border-0 bg-transparent px-4 py-3 text-[15px] text-ink outline-none placeholder:text-ink/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="cursor-pointer rounded-full border-0 bg-green px-5 py-3 text-sm font-bold text-cream transition hover:bg-green/90 disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : "Send tips"}
              </button>
            </div>
          )}
          {status === "error" && errorMsg && (
            <p
              id="newsletter-error"
              role="alert"
              className="px-5 text-[13px] text-rust"
            >
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
