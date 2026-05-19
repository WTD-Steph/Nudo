import { ComingSoon } from "@/components/ComingSoon";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata = { title: "Contact — Nudo Lab" };

export default function ContactPage() {
  return (
    <ComingSoon
      eyebrow="Contact · we read everything"
      title="Say hi. A real person replies within a day."
      blurb={`Email us at ${CONTACT_EMAIL} for anything — a question about your order, a brewing problem, or a complaint about the site. The contact form is coming next week; for now, email is the fastest path.`}
    />
  );
}
