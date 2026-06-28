import Link from "next/link";
import {
  getJournalStats,
  listBeans,
  listBrews,
} from "@/lib/journal/queries";
import { getMethod, methodLabel } from "@/lib/journal/methods";
import { FreshnessIndicator } from "@/components/journal/FreshnessIndicator";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AccountDashboard() {
  const [stats, recentBrews, beans] = await Promise.all([
    getJournalStats(),
    listBrews({ limit: 5 }),
    listBeans(),
  ]);

  const beanById = new Map(beans.map((b) => [b.id, b]));
  const freshestBeans = beans
    .filter((b) => b.roast_date)
    .sort((a, b) =>
      (b.roast_date ?? "").localeCompare(a.roast_date ?? ""),
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="px-12 pt-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-center gap-3">
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Dashboard
            </div>
            <span
              lang="ja"
              className="font-ja text-[12px] tracking-wider text-ink/65"
            >
              · 日々 (day by day)
            </span>
          </div>
          <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,72px)] font-bold leading-[0.98] tracking-tight">
            Welcome back to your{" "}
            <em className="not-italic text-rust">journal.</em>
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-snug text-ink/80">
            Coffee is a practice, not a performance. Log today&rsquo;s brew,
            change one thing tomorrow, watch the line improve.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="px-12 py-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 md:grid-cols-4">
          <Stat
            label="Total brews"
            value={String(stats.brewCount)}
            href={ROUTES.myJournal}
          />
          <Stat
            label="Beans on the shelf"
            value={String(stats.beanCount)}
            href={ROUTES.beans}
          />
          <Stat
            label="Last brew"
            value={
              stats.lastBrewMethod ? methodLabel(stats.lastBrewMethod) : "—"
            }
            sub={fmtDate(stats.lastBrewAt)}
          />
          <CTAStat />
        </div>
      </section>

      {/* Recent + Fresh beans */}
      <section className="px-12 pb-16">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Recent */}
          <div>
            <h2 className="m-0 mb-4 text-[24px] font-bold tracking-tight">
              Recent brews
            </h2>
            {recentBrews.length === 0 ? (
              <div className="rounded-[22px] bg-sand p-8">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-green">
                  Empty
                </div>
                <p className="mt-2 text-[15px] text-ink/80">
                  No brews logged yet. Make today&rsquo;s coffee, log
                  what you did, and we&rsquo;ll start tracking the
                  pattern.
                </p>
                <Link
                  href={ROUTES.newBrew}
                  className="mt-4 inline-flex rounded-full bg-green px-5 py-2.5 text-[14px] font-bold text-cream hover:bg-green/90"
                >
                  + Log a brew
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-rule-cream rounded-[22px] border border-rule-cream">
                {recentBrews.map((b) => {
                  const bean = b.bean_id ? beanById.get(b.bean_id) : null;
                  const meta = getMethod(b.method);
                  return (
                    <li key={b.id}>
                      <Link
                        href={ROUTES.brew(b.id)}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 hover:bg-cream-paper"
                      >
                        <span className="text-[24px]" aria-hidden>
                          {meta.emoji}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">
                            {methodLabel(b.method)}
                          </div>
                          <div className="truncate text-[13px] text-ink/75">
                            {bean ? bean.name : "No bean"} ·{" "}
                            {b.dose_g ?? "—"} g → {b.yield_g ?? "—"} g
                          </div>
                        </div>
                        <div className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
                          {fmtDate(b.brewed_at)}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Fresh beans */}
          <div>
            <h2 className="m-0 mb-4 text-[24px] font-bold tracking-tight">
              Freshness window
            </h2>
            {freshestBeans.length === 0 ? (
              <div className="rounded-[22px] bg-cream-paper p-6 text-[14px] text-ink/80">
                Add roast dates to your beans and we&rsquo;ll show their
                window here.
              </div>
            ) : (
              <ul className="grid gap-3">
                {freshestBeans.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={ROUTES.bean(b.id)}
                      className="flex items-center justify-between gap-3 rounded-[14px] bg-cream-paper p-4 hover:bg-cream"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-[15px] font-bold">
                          {b.name}
                        </div>
                        <div className="text-[12px] text-ink/65">
                          Roasted {fmtDate(b.roast_date)}
                        </div>
                      </div>
                      <FreshnessIndicator roastDate={b.roast_date} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: string;
  sub?: string;
  href?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-1 rounded-[22px] bg-cream-paper p-5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
        {label}
      </span>
      <span className="text-[28px] font-bold tracking-tight">{value}</span>
      {sub && <span className="text-[12px] text-ink/65">{sub}</span>}
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block transition hover:-translate-y-0.5">
        {inner}
      </Link>
    );
  }
  return inner;
}

function CTAStat() {
  return (
    <Link
      href={ROUTES.newBrew}
      className="flex flex-col items-start justify-between gap-3 rounded-[22px] bg-green p-5 text-cream transition hover:-translate-y-0.5"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-mustard">
        New brew
      </span>
      <span className="text-[18px] font-bold leading-tight">
        Log today&rsquo;s cup →
      </span>
    </Link>
  );
}
