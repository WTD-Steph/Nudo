import { ComingSoon } from "@/components/ComingSoon";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata = { title: "Track an order — Nudo Lab" };

export default function TrackOrderPage() {
  return (
    <ComingSoon
      eyebrow="Help"
      title="Order tracking — landing next week."
      blurb={`Until the order-tracking form is live, email ${CONTACT_EMAIL} with your order number and we'll send you a tracking link by hand. Usually within an hour.`}
    />
  );
}
