import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";

// POST to sign out, then redirect home. We use POST (not GET) so prefetch
// crawls and accidental link clicks can't silently log the user out.
export async function POST(request: Request) {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // env vars missing — fall through; the user is already signed out client-side
  }
  const url = new URL(request.url);
  return NextResponse.redirect(new URL(ROUTES.home, url.origin), {
    status: 303,
  });
}
