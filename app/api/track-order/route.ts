import { NextResponse } from "next/server";
import { validateTrackOrder } from "@/lib/validation";

/**
 * Order tracking stub. Validates and logs; returns 200 so the form
 * can show its success state. The real fulfilment lookup lands with
 * checkout.
 * TODO(provider): query the order system (Shopify Order Status,
 * AfterShip, etc.) using { orderNumber, email } and return a
 * tracking URL or carrier status.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const res = validateTrackOrder(body);
  if (!res.ok) {
    return NextResponse.json({ errors: res.errors }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("[track-order]", res.value);

  return NextResponse.json({ ok: true });
}
