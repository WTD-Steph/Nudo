"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/links";

const STORAGE_KEY = "nl-announce-dismissed-v1";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-green text-cream">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-12 py-2 text-[13px]">
        <Link
          href={ROUTES.firstBrewKit}
          className="font-medium hover:text-mustard"
        >
          New here? Try the First-Brew Kit — free shipping, no-questions returns →
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => {
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {}
            setDismissed(true);
          }}
          className="rounded-full px-2 text-cream/60 hover:text-cream"
        >
          ×
        </button>
      </div>
    </div>
  );
}
