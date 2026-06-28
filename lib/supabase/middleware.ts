// Refresh the Supabase session on every request so server components
// see a fresh auth.uid(). Mounted by middleware.ts at the project root.
//
// Hard invariant: this function must NEVER throw a request to a 500.
// The entire body is wrapped in try/catch — any error logs to the
// platform and the request is passed through unchanged. Auth-gated
// pages will surface their own "not signed in" state.

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { type Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  const passthrough = NextResponse.next({ request });

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return passthrough;

    let response = passthrough;

    const supabase = createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("[mw] cookies.setAll threw", e);
          }
        },
      },
    });

    // Touch the session so it auto-refreshes. If this throws (network,
    // revoked PAT, etc.) we still want the request to complete.
    try {
      await supabase.auth.getUser();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[mw] auth.getUser threw", e);
    }

    return response;
  } catch (e) {
    // Absolute last-resort guard. Production must never 500 from middleware.
    // eslint-disable-next-line no-console
    console.error("[mw] updateSession threw — passthrough", e);
    return passthrough;
  }
}
