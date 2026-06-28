// Magic-link callback. Supabase redirects here with ?code=... after the
// user clicks the email link. We exchange the code for a session, set the
// cookies, and send the user to the journal.

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? ROUTES.account;

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `${ROUTES.signIn}?error=${encodeURIComponent("Missing code")}`,
        url.origin,
      ),
    );
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL(
          `${ROUTES.signIn}?error=${encodeURIComponent(error.message)}`,
          url.origin,
        ),
      );
    }
    return NextResponse.redirect(new URL(next, url.origin));
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.redirect(
      new URL(`${ROUTES.signIn}?error=${encodeURIComponent(msg)}`, url.origin),
    );
  }
}
