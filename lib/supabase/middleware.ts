// Refresh the Supabase session on every request so server components
// see a fresh auth.uid(). Mounted by middleware.ts at the project root.

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { type Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Graceful fallback: when Supabase env vars aren't configured (e.g. a
  // Vercel deploy without the secrets), pass the request through unchanged
  // instead of throwing a 500 on every route. Auth-gated pages will surface
  // their own "not signed in" state; the public marketing site keeps working.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return response;

  const supabase = createServerClient<Database>(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Touch the session so it auto-refreshes. We don't redirect from
  // here — auth-gated areas guard themselves in their own layouts.
  await supabase.auth.getUser();

  return response;
}
