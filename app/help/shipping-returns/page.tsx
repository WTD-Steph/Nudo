import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { ROUTES, CONTACT_EMAIL } from "@/lib/links";

export const metadata = {
  title: "Shipping & Returns",
  description:
    "Free shipping over $40. 30-day no-questions returns. Honest about what we can and can't do.",
};

const FAQ = [
  {
    question: "How long does shipping take?",
    answer:
      "Domestic (Indonesia): 2–4 business days. International: 7–14 business days, customs depending. We ship within 48 hours of order confirmation.",
  },
  {
    question: "What's the return policy?",
    answer:
      "30 days, no questions asked, for anything you can repack. We'll send you a prepaid label for domestic returns; international returns are at-cost.",
  },
  {
    question: "What if it arrives broken?",
    answer:
      "Email us a photo. We send a replacement within 24 hours and don't ask you to return the broken one. This is the policy because we've broken enough sharing pots ourselves to know.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Duties and taxes are paid by the recipient — we don't mark items as gifts to dodge customs (and you shouldn't either; it bites you later).",
  },
];

export default function ShippingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(FAQ),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Help", href: ROUTES.contact },
            { name: "Shipping & Returns", href: ROUTES.shipping },
          ]),
        ]}
      />
      <Nav />
      <main id="main-content" className="bg-cream">
        <section className="px-12 pt-16">
          <div className="mx-auto max-w-[920px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink/60">
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Shipping & Returns</span>
            </nav>
            <div className="mt-8 font-mono text-[12px] uppercase tracking-widest text-rust">
              Help · policy
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,72px)] font-bold leading-[0.98] tracking-tight">
              Shipping &amp; returns, in plain English.
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              The short version: free shipping over $40, 30-day no-questions
              returns, replacements when stuff breaks. The longer version
              below.
            </p>
          </div>
        </section>

        {/* Quick cards */}
        <section className="px-12 py-12">
          <div className="mx-auto grid max-w-[920px] gap-4 md:grid-cols-2">
            <div className="rounded-[22px] bg-cream-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Free shipping
              </div>
              <p className="mt-2 text-[16px] leading-snug">
                Orders over <strong>$40</strong> ship free anywhere we
                deliver. Under that, shipping is calculated at checkout.
              </p>
            </div>
            <div className="rounded-[22px] bg-cream-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                30-day returns
              </div>
              <p className="mt-2 text-[16px] leading-snug">
                No questions, no restocking fee. Repackable items only.
              </p>
            </div>
            <div className="rounded-[22px] bg-sand p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Broken in transit
              </div>
              <p className="mt-2 text-[16px] leading-snug">
                Photo + email = replacement within 24h. No return required.
              </p>
            </div>
            <div className="rounded-[22px] bg-sand p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Real humans
              </div>
              <p className="mt-2 text-[16px] leading-snug">
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </Link>
                . A real person replies within a day.
              </p>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="px-12 py-12">
          <div className="mx-auto max-w-[920px]">
            <h2 className="m-0 mb-6 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
              Regions &amp; rates.
            </h2>
            <div className="overflow-hidden rounded-[14px] border border-rule-cream">
              <table className="w-full text-left">
                <thead className="bg-cream-paper text-[12px] uppercase tracking-widest text-ink/60">
                  <tr>
                    <th className="p-4 font-semibold">Region</th>
                    <th className="p-4 font-semibold">Time</th>
                    <th className="p-4 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-[15px]">
                  <tr className="border-t border-rule-cream">
                    <td className="p-4 font-medium">Indonesia · Jakarta</td>
                    <td className="p-4">1–2 business days</td>
                    <td className="p-4">From Rp 25,000</td>
                  </tr>
                  <tr className="border-t border-rule-cream">
                    <td className="p-4 font-medium">Indonesia · other</td>
                    <td className="p-4">2–4 business days</td>
                    <td className="p-4">From Rp 35,000</td>
                  </tr>
                  <tr className="border-t border-rule-cream">
                    <td className="p-4 font-medium">SEA · regional</td>
                    <td className="p-4">5–10 business days</td>
                    <td className="p-4">From $15</td>
                  </tr>
                  <tr className="border-t border-rule-cream">
                    <td className="p-4 font-medium">Rest of world</td>
                    <td className="p-4">7–14 business days</td>
                    <td className="p-4">From $25</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13px] text-ink/50">
              Free over $40 in all regions. Duties &amp; taxes paid by the
              recipient for international shipments.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-12 py-16">
          <div className="mx-auto max-w-[920px]">
            <h2 className="m-0 mb-6 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
              Frequently asked.
            </h2>
            <dl className="grid gap-3">
              {FAQ.map((q) => (
                <details
                  key={q.question}
                  className="group rounded-[14px] bg-cream-paper p-6 open:bg-sand"
                >
                  <summary className="cursor-pointer text-[17px] font-semibold marker:hidden list-none">
                    <div className="flex items-center justify-between">
                      <span>{q.question}</span>
                      <span
                        aria-hidden
                        className="ml-4 inline-block text-rust transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </div>
                  </summary>
                  <dd className="mt-3 text-[15px] leading-snug text-ink/80">
                    {q.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
