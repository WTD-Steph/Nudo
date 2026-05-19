import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { ROUTES, CONTACT_EMAIL, WA_URL } from "@/lib/links";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Email or message us about anything — an order, a brewing problem, or a complaint about the site. A real person replies within a day.",
};

const FAQ = [
  {
    question: "How long until I hear back?",
    answer:
      "A real person replies within one business day, often within an hour. We're a small team and we read everything ourselves.",
  },
  {
    question: "Do you do wholesale?",
    answer:
      "Yes — for cafés, roasters, and shops carrying starter coffee gear. Pick 'Wholesale' in the form below and tell us a bit about your space; we'll send a price list.",
  },
  {
    question: "Can I return something I bought?",
    answer:
      "30-day no-questions returns on anything you can repack. We'll send you a prepaid label.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(FAQ),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Help", href: ROUTES.contact },
            { name: "Contact", href: ROUTES.contact },
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
              <span className="text-ink">Contact</span>
            </nav>
            <div className="mt-8 font-mono text-[12px] uppercase tracking-widest text-rust">
              Contact · we read everything
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,80px)] font-bold leading-[0.98] tracking-tight">
              Say hi. A real person <em className="not-italic text-rust">replies within a day.</em>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              Question about an order, a brewing problem you can&rsquo;t crack,
              a complaint about the site — all welcome. Email is fastest if
              you&rsquo;d rather skip the form.
            </p>
          </div>
        </section>

        {/* Quick channels */}
        <section className="px-12 py-12">
          <div className="mx-auto grid max-w-[920px] gap-4 md:grid-cols-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group rounded-[22px] bg-cream-paper p-6 transition hover:-translate-y-0.5"
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                Email
              </div>
              <div className="mt-2 text-[20px] font-bold">{CONTACT_EMAIL}</div>
              <p className="mt-2 text-[14px] text-ink/60">
                The fastest path. A real person replies within a day.
              </p>
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[22px] bg-sand p-6 transition hover:-translate-y-0.5"
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-rust">
                WhatsApp
              </div>
              <div className="mt-2 text-[20px] font-bold">
                Message us on WhatsApp
              </div>
              <p className="mt-2 text-[14px] text-ink/60">
                Faster for short questions. We&rsquo;re online 9–6 local
                time.
              </p>
            </a>
          </div>
        </section>

        {/* Form */}
        <section className="px-12 py-12">
          <div className="mx-auto max-w-[920px]">
            <h2 className="m-0 mb-6 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
              Or send a message.
            </h2>
            <ContactForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-12 py-16">
          <div className="mx-auto max-w-[920px]">
            <h2 className="m-0 mb-8 text-[clamp(24px,2.6vw,36px)] font-bold leading-tight tracking-tight">
              Things people ask first.
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
                        className="ml-4 inline-block transition group-open:rotate-45 text-rust"
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
