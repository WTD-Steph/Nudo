import Link from "next/link";
import { notFound } from "next/navigation";
import { getBean, listBrews } from "@/lib/journal/queries";
import { FreshnessIndicator } from "@/components/journal/FreshnessIndicator";
import { methodLabel, getMethod } from "@/lib/journal/methods";
import { ROUTES } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const bean = await getBean(params.id);
  return { title: bean?.name ?? "Bean" };
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BeanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const bean = await getBean(params.id);
  if (!bean) notFound();
  const brews = await listBrews({ beanId: bean.id, limit: 50 });

  const facts: { label: string; value: string }[] = [
    { label: "Roaster", value: bean.roaster ?? "—" },
    { label: "Origin", value: bean.origin ?? "—" },
    { label: "Process", value: bean.process ?? "—" },
    { label: "Roast date", value: fmtDate(bean.roast_date) },
  ];

  return (
    <section className="px-5 sm:px-8 lg:px-12 py-12">
      <div className="mx-auto max-w-[920px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
          <Link href={ROUTES.beans}>Beans</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{bean.name}</span>
        </nav>

        <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Bean
            </div>
            <h1 className="m-0 mt-2 text-[clamp(32px,4vw,48px)] font-bold leading-tight tracking-tight">
              {bean.name}
            </h1>
            {bean.roaster && (
              <p className="mt-1 text-[15px] text-ink/75">{bean.roaster}</p>
            )}
          </div>
          <Link
            href={`${ROUTES.newBrew}?bean=${bean.id}`}
            className="rounded-full bg-green px-5 py-3 text-[14px] font-bold text-cream hover:bg-green/90"
          >
            + Log a brew with this bean
          </Link>
        </header>

        <div className="mt-8">
          <FreshnessIndicator roastDate={bean.roast_date} variant="block" />
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[22px] bg-cream-paper p-6 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] font-mono uppercase tracking-widest text-ink/65">
                {f.label}
              </dt>
              <dd className="mt-1 text-[15px] font-semibold text-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        {(bean.bag_notes || bean.my_notes) && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bean.bag_notes && (
              <NotesBlock title="From the bag" text={bean.bag_notes} />
            )}
            {bean.my_notes && (
              <NotesBlock title="Your notes" text={bean.my_notes} />
            )}
          </div>
        )}

        <section className="mt-12">
          <header className="mb-4 flex items-end justify-between">
            <h2 className="m-0 text-[24px] font-bold tracking-tight">
              Brews with this bean
            </h2>
            <span className="text-[13px] text-ink/65">{brews.length} total</span>
          </header>

          {brews.length === 0 ? (
            <div className="rounded-[14px] bg-sand p-6 text-[15px] text-ink/80">
              Nothing logged yet. The first brew is always the noisiest —
              that&rsquo;s the data point you&rsquo;ll measure the rest against.
            </div>
          ) : (
            <ul className="divide-y divide-rule-cream rounded-[14px] border border-rule-cream">
              {brews.map((b) => (
                <li key={b.id}>
                  <Link
                    href={ROUTES.brew(b.id)}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 hover:bg-cream-paper"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 text-[14px] text-ink/75">
                        <span className="text-[16px]">
                          {getMethod(b.method).emoji}
                        </span>
                        <span className="font-semibold text-ink">
                          {methodLabel(b.method)}
                        </span>
                        {b.variable_changed && (
                          <span className="text-rust">
                            · Δ {b.variable_changed}
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-ink/65">
                        {fmtDate(b.brewed_at)} · {b.dose_g ?? "—"} g →{" "}
                        {b.yield_g ?? "—"} g · {b.time_s ?? "—"} s
                      </div>
                    </div>
                    <div className="font-mono text-[12px] text-ink/75">
                      {b.rating ? `${b.rating}/5` : ""}{" "}
                      {b.would_brew_again === true
                        ? "✓"
                        : b.would_brew_again === false
                          ? "·"
                          : ""}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}

function NotesBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[14px] bg-cream-paper p-5">
      <div className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
        {title}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-[15px] leading-snug text-ink">
        {text}
      </p>
    </div>
  );
}
