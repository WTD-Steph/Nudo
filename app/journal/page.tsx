import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Journal — Nudo Lab" };

export default function JournalPage() {
  return (
    <ComingSoon
      eyebrow="Journal · coming soon"
      title="What we're learning, packed in writing."
      blurb="Operations notes, gear recommendations (sometimes for competitors), and honest pieces about starting. First post lands next week."
    />
  );
}
