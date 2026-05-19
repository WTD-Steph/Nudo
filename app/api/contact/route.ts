import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

/**
 * Contact form stub. Validates payload and logs.
 * TODO(provider): forward to support inbox / helpdesk:
 *   - Resend/Sendgrid SMTP to CONTACT_EMAIL, or
 *   - HelpScout / Front / Zendesk API integration
 *   - throttle by IP (a real form is a real spam target)
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const res = validateContact(body);
  if (!res.ok) {
    return NextResponse.json({ errors: res.errors }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("[contact]", res.value);

  return NextResponse.json({ ok: true });
}
