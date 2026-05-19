import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Guides" };

export default function GuidesPage() {
  return (
    <ComingSoon
      eyebrow="Guides · coming soon"
      title="Plain-English coffee, one cup at a time."
      blurb="We're writing the First-Brew Guide, a glossary of every coffee word we use on this site, and a short maintenance guide for the gear we sell. Back next week. No jargon, no gatekeeping."
    />
  );
}
