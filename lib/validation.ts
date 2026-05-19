// Tiny boundary-validation helpers. We don't pull in zod for three
// stub endpoints — manual checks keep the dep tree clean.

// RFC-5322-lite. Catches typos, doesn't try to parse every legal edge case.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, string> };

export function validateEmail(raw: unknown): ValidationResult<string> {
  if (typeof raw !== "string") {
    return { ok: false, errors: { email: "Email is required." } };
  }
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length === 0) {
    return { ok: false, errors: { email: "Email is required." } };
  }
  if (trimmed.length > 254) {
    return { ok: false, errors: { email: "Email is too long." } };
  }
  if (!EMAIL_RE.test(trimmed)) {
    return { ok: false, errors: { email: "That email doesn't look right." } };
  }
  return { ok: true, value: trimmed };
}

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  topic: string;
};

export function validateContact(raw: unknown): ValidationResult<ContactPayload> {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { _: "Bad payload." } };
  }
  const r = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = typeof r.name === "string" ? r.name.trim() : "";
  if (!name) errors.name = "Tell us what to call you.";
  else if (name.length > 120) errors.name = "Name is too long.";

  const emailRes = validateEmail(r.email);
  let email = "";
  if (!emailRes.ok) errors.email = emailRes.errors.email;
  else email = emailRes.value;

  const message = typeof r.message === "string" ? r.message.trim() : "";
  if (!message) errors.message = "Tell us what's going on.";
  else if (message.length < 10) errors.message = "A little more detail helps.";
  else if (message.length > 5000) errors.message = "That's a lot — try email.";

  const topic = typeof r.topic === "string" ? r.topic.trim() : "general";
  const allowed = ["general", "order", "wholesale", "press", "other"];
  if (!allowed.includes(topic)) errors.topic = "Pick one of the options.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, email, message, topic } };
}

export type TrackOrderPayload = { orderNumber: string; email: string };

export function validateTrackOrder(
  raw: unknown,
): ValidationResult<TrackOrderPayload> {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { _: "Bad payload." } };
  }
  const r = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const orderNumber =
    typeof r.orderNumber === "string" ? r.orderNumber.trim() : "";
  if (!orderNumber) errors.orderNumber = "Order number is required.";
  else if (!/^[A-Za-z0-9\-]{3,32}$/.test(orderNumber))
    errors.orderNumber = "That doesn't look like an order number.";

  const emailRes = validateEmail(r.email);
  let email = "";
  if (!emailRes.ok) errors.email = emailRes.errors.email;
  else email = emailRes.value;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { orderNumber, email } };
}
