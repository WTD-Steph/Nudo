import Link from "next/link";
import { BrewForm } from "@/components/journal/BrewForm";
import { createBrew } from "@/lib/journal/actions";
import {
  getLastBrewForBean,
  listBeans,
} from "@/lib/journal/queries";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Log a brew" };
export const dynamic = "force-dynamic";

export default async function NewBrewPage({
  searchParams,
}: {
  searchParams?: { bean?: string };
}) {
  const beans = await listBeans();
  const initialBeanId = searchParams?.bean ?? null;

  // "What's different?" pre-fill: last brew of the selected bean.
  const prefill =
    initialBeanId && beans.some((b) => b.id === initialBeanId)
      ? await getLastBrewForBean(initialBeanId)
      : null;

  return (
    <section className="px-5 sm:px-8 lg:px-12 py-12">
      <div className="mx-auto max-w-[920px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
          <Link href={ROUTES.myJournal}>Brews</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">New</span>
        </nav>

        <div className="mt-6 font-mono text-[12px] uppercase tracking-widest text-rust">
          New brew
        </div>
        <h1 className="m-0 mt-2 text-[clamp(32px,4vw,48px)] font-bold leading-tight tracking-tight">
          {prefill ? "What's different this time?" : "Log this brew."}
        </h1>
        <p className="mt-3 max-w-[520px] text-[16px] leading-snug text-ink/80">
          {prefill
            ? "We pulled in numbers from your last brew of this bean. Change one thing, brew it, tell us what happened."
            : "Pick a bean (or none), pick a method, fill what you measured. Tomorrow's brew compares itself to this one."}
        </p>
        <div className="mt-8">
          <BrewForm
            beans={beans.map((b) => ({
              id: b.id,
              name: b.name,
              roaster: b.roaster,
              roast_date: b.roast_date,
            }))}
            initialBeanId={initialBeanId}
            prefill={prefill}
            action={createBrew}
          />
        </div>
      </div>
    </section>
  );
}
