// Sign-up confirmation handler. The custom "Confirm signup" mailer template
// (PATCHed via Supabase Management API) links here with ?token_hash=…
// The hardcoded type bypasses Supabase's template engine, which silently
// rewrites custom `type=` query params on URLs in the /auth/ namespace.

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const next = url.searchParams.get("next") ?? ROUTES.account;

  const back = (msg: string) =>
    NextResponse.redirect(
      new URL(`${ROUTES.signIn}?error=${encodeURIComponent(msg)}`, url.origin),
    );

  if (!tokenHash) return back("Missing verification token");

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "signup",
    });
    if (error) return back(error.message);
    return NextResponse.redirect(new URL(next, url.origin));
  } catch (e) {
    return back(e instanceof Error ? e.message : "Unknown error");
  }
}
