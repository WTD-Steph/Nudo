// Server-side Supabase client. Use inside Server Components, Route
// Handlers, and Server Actions. Cookies are read + (where allowed)
// written via next/headers so sessions persist across requests.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { type Database } from "@/types/database";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (local) and Vercel " +
        "(production + preview).",
    );
  }
  const cookieStore = cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // RSCs can't write cookies; we no-op there and let the
        // middleware refresh the session for the next request.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // intentionally swallowed — see above
        }
      },
    },
  });
}
