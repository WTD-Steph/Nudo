"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "sent" | "error";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${origin}/auth/callback` },
      });
      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[22px] bg-green p-10 text-cream"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-mustard">
          Email sent
        </div>
        <h2 className="m-0 mt-2 text-balance text-[clamp(22px,2.4vw,30px)] font-bold leading-tight tracking-tight">
          Check {email} for the link.
        </h2>
        <p className="mt-3 text-[15px] text-cream/80">
          Click the link from any device and you&rsquo;ll be signed in.
          If you don&rsquo;t see it in two minutes, check spam — and then
          email us, the link delivery is on our list.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-[22px] bg-cream-paper p-6 sm:p-8"
      aria-describedby={errorMsg ? "signin-error" : undefined}
    >
      <div>
        <label
          htmlFor="signin-email"
          className="mb-1.5 block text-[13px] font-semibold text-ink/75"
        >
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          disabled={status === "submitting"}
          className="w-full rounded-md border border-rule-cream bg-cream px-3 py-2.5 text-[16px] outline-none focus:border-green disabled:opacity-50"
        />
      </div>
      {errorMsg && (
        <p
          id="signin-error"
          role="alert"
          className="rounded-md bg-rust/10 p-3 text-[13px] text-rust"
        >
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-green px-6 py-3 text-[15px] font-bold text-cream hover:bg-green/90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending the link…" : "Email me a link"}
      </button>
      <p className="text-[12px] leading-snug text-ink/65">
        No passwords. We email you a sign-in link. Click it from any
        device and you&rsquo;re in. The link expires in an hour.
      </p>
    </form>
  );
}
