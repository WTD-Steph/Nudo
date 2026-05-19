import { NextResponse } from "next/server";
import { validateEmail } from "@/lib/validation";

/**
 * Newsletter signup stub. Validates the email and logs to stdout.
 * TODO(provider): wire to Resend / ConvertKit / Mailchimp.
 *   - on receipt, forward to provider's /audience or /list endpoint
 *   - return 200 only after the provider acknowledges
 *   - rate-limit by IP if abuse appears
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const res = validateEmail((body as { email?: unknown })?.email);
  if (!res.ok) {
    return NextResponse.json({ errors: res.errors }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("[subscribe]", res.value);

  return NextResponse.json({ ok: true });
}
