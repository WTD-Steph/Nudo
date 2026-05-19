import Link from "next/link";
import { getGlossaryEntry } from "@/lib/glossary";
import { ROUTES } from "@/lib/links";

type Props = {
  /** Slug of a glossary entry. */
  slug: string;
  /** Optional override for the visible text — defaults to the entry's term. */
  children?: React.ReactNode;
};

/**
 * Inline glossary term with a definition tooltip + link to the glossary entry.
 * Uses the native <abbr> + a hidden popover for the tooltip — no JS needed.
 */
export function Term({ slug, children }: Props) {
  const entry = getGlossaryEntry(slug);
  if (!entry) return <span>{children}</span>;

  return (
    <Link
      href={`${ROUTES.glossary}#${slug}`}
      className="group relative inline-block whitespace-nowrap border-b border-dotted border-rust text-ink"
    >
      {children ?? entry.term}
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md bg-ink p-3 text-[12px] font-normal leading-snug text-cream opacity-0 transition group-hover:visible group-hover:opacity-100"
      >
        <strong className="block text-mustard">{entry.term}</strong>
        {entry.short}
      </span>
    </Link>
  );
}
