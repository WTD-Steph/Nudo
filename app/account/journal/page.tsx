import Link from "next/link";
import { listBeans, listBrews } from "@/lib/journal/queries";
import { getMethod, methodLabel } from "@/lib/journal/methods";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Brews" };
export const dynamic = "force-dynamic";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function JournalIndex() {
  const [brews, beans] = await Promise.all([
    listBrews({ limit: 200 }),
    listBeans(),
  ]);
  const beanById = new Map(beans.map((b) => [b.id, b]));

  return (
    <section className="px-5 sm:px-8 lg:px-12 py-12">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
              Brews · your log
            </div>
            <h1 className="m-0 mt-2 text-[clamp(36px,4.5vw,56px)] font-bold leading-tight tracking-tight">
              {brews.length} brew{brews.length === 1 ? "" : "s"}, ordered by
              latest.
            </h1>
          </div>
          <Link
            href={ROUTES.newBrew}
            className="rounded-full bg-green px-5 py-3 text-[14px] font-bold text-cream hover:bg-green/90"
          >
            + Log a brew
          </Link>
        </header>

        {brews.length === 0 ? (
          <EmptyState hasBean={beans.length > 0} />
        ) : (
          <ul className="grid gap-2 md:grid-cols-2">
            {brews.map((b) => {
              const bean = b.bean_id ? beanById.get(b.bean_id) : null;
              const meta = getMethod(b.method);
              return (
                <li key={b.id}>
                  <Link
                    href={ROUTES.brew(b.id)}
                    className="group flex h-full flex-col gap-2 rounded-[14px] bg-cream-paper p-5 transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[15px] font-bold">
                          <span aria-hidden>{meta.emoji}</span>
                          <span>{methodLabel(b.method)}</span>
                        </div>
                        <div className="truncate text-[13px] text-ink/75">
                          {bean ? bean.name : "No bean"}
                        </div>
                      </div>
                      <div className="font-mono text-[11px] uppercase tracking-widest text-ink/65">
                        {fmtDate(b.brewed_at)}
                      </div>
                    </div>
                    <div className="text-[13px] text-ink/80">
                      {b.dose_g ?? "—"} g → {b.yield_g ?? "—"} g ·{" "}
                      {b.time_s ?? "—"} s
                      {b.grind_clicks ? ` · grind ${b.grind_clicks}` : ""}
                    </div>
                    {b.variable_changed && (
                      <div className="text-[13px] text-rust">
                        Δ {b.variable_changed}
                      </div>
                    )}
                    <div className="mt-auto flex items-center gap-3 pt-1 text-[12px] text-ink/65">
                      {b.rating ? (
                        <span className="font-mono">{"★".repeat(b.rating)}</span>
                      ) : null}
                      {b.would_brew_again === true && (
                        <span className="rounded-full bg-green/10 px-2 py-0.5 font-semibold text-green">
                          ✓ Again
                        </span>
                      )}
                      {b.would_brew_again === false && (
                        <span className="rounded-full bg-rust/10 px-2 py-0.5 font-semibold text-rust">
                          · Skip
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function EmptyState({ hasBean }: { hasBean: boolean }) {
  return (
    <div className="rounded-[22px] bg-sand p-10">
      <div className="font-mono text-[12px] font-semibold uppercase tracking-widest text-green">
        First brew
      </div>
      <h2 className="m-0 mt-2 text-[clamp(22px,2.4vw,28px)] font-bold leading-tight">
        Your first shot will be bad. That&rsquo;s normal.
      </h2>
      <p className="mt-3 max-w-[520px] text-[15px] text-ink/80">
        Log it anyway — that&rsquo;s the data point you compare the next
        five against. Change one thing at a time and watch the line
        improve.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {!hasBean && (
          <Link
            href={ROUTES.newBean}
            className="rounded-full border-[1.5px] border-green px-5 py-2.5 text-[14px] font-bold text-ink hover:bg-green hover:text-cream"
          >
            Add a bean first
          </Link>
        )}
        <Link
          href={ROUTES.newBrew}
          className="rounded-full bg-green px-5 py-2.5 text-[14px] font-bold text-cream hover:bg-green/90"
        >
          + Log a brew
        </Link>
      </div>
    </div>
  );
}
