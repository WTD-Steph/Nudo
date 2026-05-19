import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { TrackOrderForm } from "@/components/TrackOrderForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { ROUTES, CONTACT_EMAIL } from "@/lib/links";

export const metadata = {
  title: "Track an order",
  description:
    "Find your order. Enter your order number and the email you ordered with — we'll send the tracking link.",
};

export default function TrackOrderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", href: ROUTES.home },
          { name: "Help", href: ROUTES.contact },
          { name: "Track order", href: ROUTES.trackOrder },
        ])}
      />
      <Nav />
      <main id="main-content" className="bg-cream">
        <section className="px-12 pt-16">
          <div className="mx-auto max-w-[760px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink/75">
              <Link href={ROUTES.home}>Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Track an order</span>
            </nav>
            <div className="mt-8 font-mono text-[12px] uppercase tracking-widest text-rust">
              Help · order tracking
            </div>
            <h1 className="m-0 mt-3 text-balance text-[clamp(40px,5vw,72px)] font-bold leading-[0.98] tracking-tight">
              Find your order.
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-snug text-ink/70">
              Enter the order number from your confirmation email plus the
              email you used at checkout. We&rsquo;ll send the tracking link
              to that email within a few minutes.
            </p>
          </div>
        </section>

        <section className="px-12 py-12">
          <div className="mx-auto max-w-[640px]">
            <TrackOrderForm />
          </div>
        </section>

        <section className="border-t border-rule-cream px-12 py-12">
          <div className="mx-auto max-w-[640px] text-center">
            <p className="text-[15px] text-ink/70">
              Can&rsquo;t find your order number?
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Order%20lookup`}
              className="mt-2 inline-block border-b-2 border-mustard pb-0.5 text-[15px] font-semibold"
            >
              Email {CONTACT_EMAIL} →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
