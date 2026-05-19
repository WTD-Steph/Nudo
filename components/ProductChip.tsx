import Link from "next/link";
import { getProduct } from "@/lib/products";
import { ROUTES } from "@/lib/links";

type Props = {
  slug: string;
  children?: React.ReactNode;
};

/**
 * Inline product reference inside a guide. Renders as a small Rust-outlined
 * chip that links to the PDP — keeps guide reading flow but makes the
 * product easy to find.
 */
export function ProductChip({ slug, children }: Props) {
  const p = getProduct(slug);
  if (!p) return <span>{children}</span>;

  return (
    <Link
      href={ROUTES.product(slug)}
      className="mx-0.5 inline-flex items-baseline gap-1.5 rounded-full border border-rust/40 bg-cream-paper px-2 py-0.5 text-[14px] font-medium text-ink hover:border-rust hover:bg-sand"
    >
      <span className="text-[11px] uppercase tracking-wider text-rust">→</span>
      {children ?? p.name}
    </Link>
  );
}
