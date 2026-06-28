import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { DOMark } from "@/components/DOMark";
import { ROUTES } from "@/lib/links";

export const metadata = { title: "Lost — Nudo Lab" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        <section className="mx-auto flex max-w-[760px] flex-col items-center px-5 sm:px-8 lg:px-12 py-32 text-center">
          <DOMark size={88} variant="black" className="mb-8 opacity-30" />
          <div className="font-mono text-[12px] uppercase tracking-widest text-rust">
            404 · page not found
          </div>
          <h1 className="m-0 mt-3 text-balance text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight">
            Lost? Same — that&rsquo;s how most of us started.
          </h1>
          <p className="mt-6 max-w-[480px] text-[17px] leading-snug text-ink/70">
            The page you&rsquo;re looking for doesn&rsquo;t exist (or is still
            being written). Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ROUTES.home}
              className="rounded-full bg-green px-6 py-3 text-[15px] font-semibold text-cream hover:-translate-y-0.5"
            >
              Back home
            </Link>
            <Link
              href={ROUTES.shop}
              className="rounded-full border-[1.5px] border-green px-6 py-3 text-[15px] font-semibold text-ink hover:bg-green hover:text-cream"
            >
              Shop the basics →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
