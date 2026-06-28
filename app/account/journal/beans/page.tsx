import Link from "next/link";
import { listBeans } from "@/lib/journal/queries";
import { FreshnessIndicator } from "@/components/journal/FreshnessIndicator";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Beans" };
export const dynamic = "force-dynamic";

export default async function BeansIndex() {
  const beans = await listBeans();

  return (
    <section className="px-12 py-12">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Beans · your library
            </div>
            <h1 className="m-0 mt-2 text-[clamp(36px,4.5vw,56px)] font-bold leading-tight tracking-tight">
              {beans.length} bean{beans.length === 1 ? "" : "s"} on the shelf.
            </h1>
          </div>
          <Link
            href={ROUTES.newBean}
            className="rounded-full bg-green px-5 py-3 text-[14px] font-bold text-cream hover:bg-green/90"
          >
            + Add a bean
          </Link>
        </header>

        {beans.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {beans.map((b) => (
              <li key={b.id}>
                <Link
                  href={ROUTES.bean(b.id)}
                  className="group flex h-full flex-col gap-3 rounded-[22px] bg-cream-paper p-6 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="m-0 truncate text-[20px] font-bold tracking-tight">
                        {b.name}
                      </h2>
                      {b.roaster && (
                        <p className="text-[13px] text-ink/75">
                          {b.roaster}
                        </p>
                      )}
                    </div>
                    <FreshnessIndicator roastDate={b.roast_date} />
                  </div>
                  {b.origin && (
                    <p className="text-[13px] text-ink/75">
                      {b.origin}
                      {b.process ? ` · ${b.process}` : ""}
                    </p>
                  )}
                  {b.bag_notes && (
                    <p className="line-clamp-2 text-[14px] leading-snug text-ink/80">
                      {b.bag_notes}
                    </p>
                  )}
                  <span className="mt-auto text-[13px] font-semibold text-green group-hover:underline">
                    Open bean →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[22px] bg-sand p-10">
      <div className="font-mono text-[12px] font-semibold uppercase tracking-widest text-green">
        Empty shelf
      </div>
      <h2 className="m-0 mt-2 text-[clamp(22px,2.4vw,28px)] font-bold leading-tight">
        No beans yet. Add one to start logging brews.
      </h2>
      <p className="mt-3 text-[15px] text-ink/80">
        A bean carries a name, a roaster, a roast date — the things you
        need to compare today&rsquo;s brew with yesterday&rsquo;s.
      </p>
      <Link
        href={ROUTES.newBean}
        className="mt-6 inline-flex rounded-full bg-green px-5 py-2.5 text-[14px] font-bold text-cream hover:bg-green/90"
      >
        + Add your first bean
      </Link>
    </div>
  );
}
