import Link from "next/link";
import { BeanForm } from "@/components/journal/BeanForm";
import { createBean } from "@/lib/journal/actions";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Add a bean" };

export default function NewBeanPage() {
  return (
    <section className="px-5 sm:px-8 lg:px-12 py-12">
      <div className="mx-auto max-w-[720px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
          <Link href={ROUTES.beans}>Beans</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">New</span>
        </nav>
        <div className="mt-6 font-mono text-[12px] uppercase tracking-widest text-rust">
          New bean
        </div>
        <h1 className="m-0 mt-2 text-[clamp(32px,4vw,48px)] font-bold leading-tight tracking-tight">
          What&rsquo;s the new bag?
        </h1>
        <p className="mt-3 max-w-[520px] text-[16px] leading-snug text-ink/80">
          Name and roast date are what we&rsquo;ll use to track freshness.
          Everything else is optional — fill what you have, come back when
          you taste more.
        </p>
        <div className="mt-8">
          <BeanForm action={createBean} submitLabel="Save bean" />
        </div>
      </div>
    </section>
  );
}
