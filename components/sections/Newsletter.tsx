"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-cream-2 px-12 py-20">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="m-0 text-balance text-[56px] font-bold leading-none tracking-[-0.03em]">
            Bad first shots,{" "}
            <em className="not-italic text-clay">fixed.</em>
          </h2>
          <p className="mt-4 max-w-[380px] text-base text-charcoal-soft">
            One short email a week. One thing to try with the kit you already
            have. Unsubscribe whenever, no hard feelings.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSubmitted(true);
          }}
          className="flex items-center gap-2.5 rounded-full border-[1.5px] border-rule-cream bg-cream p-2.5"
        >
          {submitted ? (
            <div className="flex-1 px-4 py-3 text-[15px] font-semibold text-charcoal">
              Thanks — check your inbox. ✦
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-0 bg-transparent px-4 py-3 text-[15px] text-charcoal outline-none placeholder:text-mute"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-full border-0 bg-charcoal px-5 py-3 text-sm font-bold text-cream"
              >
                Send tips
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
