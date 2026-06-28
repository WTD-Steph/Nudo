import Link from "next/link";
import { notFound } from "next/navigation";
import { getBean, getBrew } from "@/lib/journal/queries";
import { getMethod, methodLabel } from "@/lib/journal/methods";
import { FreshnessIndicator } from "@/components/journal/FreshnessIndicator";
import { deleteBrew } from "@/lib/journal/actions";
import { ROUTES } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const brew = await getBrew(params.id);
  return {
    title: brew ? `${methodLabel(brew.method)} · brew` : "Brew",
  };
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function BrewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const brew = await getBrew(params.id);
  if (!brew) notFound();
  const bean = brew.bean_id ? await getBean(brew.bean_id) : null;
  const meta = getMethod(brew.method);

  const ratio =
    brew.dose_g && brew.yield_g
      ? `1:${(brew.yield_g / brew.dose_g).toFixed(1)}`
      : "—";

  const numbers: { label: string; value: string }[] = [
    { label: "Dose", value: brew.dose_g != null ? `${brew.dose_g} g` : "—" },
    { label: "Yield", value: brew.yield_g != null ? `${brew.yield_g} g` : "—" },
    { label: "Ratio", value: ratio },
    { label: "Time", value: brew.time_s != null ? `${brew.time_s} s` : "—" },
    { label: "Grind", value: brew.grind_clicks ?? "—" },
    {
      label: "Water",
      value: brew.water_temp_c != null ? `${brew.water_temp_c} °C` : "—",
    },
  ];

  async function onDelete() {
    "use server";
    await deleteBrew(brew!.id);
  }

  return (
    <section className="px-12 py-12">
      <div className="mx-auto max-w-[920px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
          <Link href={ROUTES.myJournal}>Brews</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{methodLabel(brew.method)}</span>
        </nav>

        <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              {fmtDateTime(brew.brewed_at)}
            </div>
            <h1 className="m-0 mt-2 flex items-center gap-3 text-[clamp(32px,4vw,48px)] font-bold leading-tight tracking-tight">
              <span aria-hidden>{meta.emoji}</span>
              {methodLabel(brew.method)}
            </h1>
            {bean && (
              <p className="mt-1 text-[15px] text-ink/80">
                with{" "}
                <Link
                  href={ROUTES.bean(bean.id)}
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {bean.name}
                </Link>
                {bean.roaster ? ` · ${bean.roaster}` : ""}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {bean && (
              <Link
                href={`${ROUTES.newBrew}?bean=${bean.id}`}
                className="rounded-full bg-green px-4 py-2 text-[13px] font-bold text-cream hover:bg-green/90"
              >
                + Log another with this bean
              </Link>
            )}
          </div>
        </header>

        {bean?.roast_date && (
          <div className="mt-6">
            <FreshnessIndicator
              roastDate={bean.roast_date}
              variant="block"
            />
          </div>
        )}

        {brew.variable_changed && (
          <div className="mt-6 rounded-[14px] bg-mustard p-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink/80">
              Δ Variable changed
            </div>
            <p className="mt-1 text-[16px] font-semibold text-ink">
              {brew.variable_changed}
            </p>
          </div>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[22px] bg-cream-paper p-6 sm:grid-cols-3 lg:grid-cols-6">
          {numbers.map((n) => (
            <div key={n.label}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
                {n.label}
              </dt>
              <dd className="mt-1 text-[18px] font-bold text-ink">
                {n.value}
              </dd>
            </div>
          ))}
        </dl>

        {brew.gear_used && (
          <Block title="Gear" text={brew.gear_used} className="mt-6" />
        )}
        {brew.notes && (
          <Block title="Tasting notes" text={brew.notes} className="mt-6" />
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[14px] bg-cream-paper p-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
            Verdict
          </span>
          {brew.rating ? (
            <span className="rounded-full bg-mustard px-3 py-1 text-[13px] font-bold text-ink">
              {"★".repeat(brew.rating)}
              {"☆".repeat(5 - brew.rating)}
            </span>
          ) : (
            <span className="text-[13px] text-ink/65">No rating</span>
          )}
          {brew.would_brew_again === true && (
            <span className="rounded-full bg-green/10 px-3 py-1 text-[13px] font-semibold text-green">
              ✓ Would brew again
            </span>
          )}
          {brew.would_brew_again === false && (
            <span className="rounded-full bg-rust/10 px-3 py-1 text-[13px] font-semibold text-rust">
              · Won&rsquo;t brew again
            </span>
          )}
        </div>

        <form action={onDelete} className="mt-10">
          <button
            type="submit"
            className="text-[12px] text-ink/55 underline-offset-4 hover:text-rust hover:underline"
          >
            Delete this brew
          </button>
        </form>
      </div>
    </section>
  );
}

function Block({
  title,
  text,
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[14px] bg-cream-paper p-5 ${className}`}>
      <div className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
        {title}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-[15px] leading-snug text-ink">
        {text}
      </p>
    </div>
  );
}
