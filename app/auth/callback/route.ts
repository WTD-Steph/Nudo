// Auth callback. Supports two flows:
//
// 1. PKCE (?code=…) — same-device flow. SignInForm calls signInWithOtp on the
//    browser, which stores a PKCE verifier in a cookie. Supabase emails a link
//    that routes through its /auth/v1/verify endpoint, which redirects here
//    with ?code=… The exchange uses the cookie-stored verifier.
//
// 2. token_hash (?token_hash=…&type=…) — cross-device flow. Custom email
//    templates link DIRECTLY here (bypassing Supabase's verify endpoint) so
//    the user can click the link in any browser/device — no cookie required.
//
// Both paths converge on a session cookie + a redirect to ?next= (default /account).

import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = url.searchParams.get("next") ?? ROUTES.account;

  const back = (msg: string) =>
    NextResponse.redirect(
      new URL(`${ROUTES.signIn}?error=${encodeURIComponent(msg)}`, url.origin),
    );

  try {
    const supabase = createClient();

    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type,
      });
      if (error) return back(error.message);
      return NextResponse.redirect(new URL(next, url.origin));
    }

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) return back(error.message);
      return NextResponse.redirect(new URL(next, url.origin));
    }

    return back("Missing verification code");
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return back(msg);
  }
}
