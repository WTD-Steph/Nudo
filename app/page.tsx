import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Reassure } from "@/components/sections/Reassure";
import { Catalog } from "@/components/sections/Catalog";
import { StarterKit } from "@/components/sections/StarterKit";
import { Journey } from "@/components/sections/Journey";
import { Story } from "@/components/sections/Story";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main-content" className="bg-cream">
        <Hero />
        <TrustBand />
        <Reassure />
        <Catalog />
        <StarterKit />
        <Journey />
        <Story />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
