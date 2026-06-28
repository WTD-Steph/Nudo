import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Absolute production safety: if anything anywhere throws, the request
  // is passed through unchanged. The site stays up; the auth flow may
  // misbehave for that one request, but we don't 500 the marketing site.
  try {
    return await updateSession(request);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[mw-root] passthrough on error", e);
    return NextResponse.next({ request });
  }
}

export const config = {
  // Run on every request except Next internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
