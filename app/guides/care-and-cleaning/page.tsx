import { GuideLayout } from "@/components/GuideLayout";
import { ProductChip } from "@/components/ProductChip";
import { getGuide, getRelatedGuides } from "@/lib/guides";

const SLUG = "care-and-cleaning";

export const metadata = {
  title: "Care & cleaning, made simple",
  description:
    "How to clean your espresso and pour-over gear in the time it takes to drink the coffee you just made. Daily, weekly, monthly.",
};

export default function CarePage() {
  const guide = getGuide(SLUG)!;
  const related = getRelatedGuides(SLUG);

  return (
    <GuideLayout guide={guide} related={related}>
      <p>
        The longest your gear should ever go without a wipe is a single
        coffee. The whole game is doing tiny amounts of work, often,
        instead of a big cleaning push that you put off forever.
      </p>
      <p>
        We&rsquo;ve organised this by frequency rather than by piece of
        gear, so you can skim &ldquo;daily&rdquo; in 30 seconds.
      </p>

      <h2>Daily — the 30-second routine</h2>
      <p>
        Do these every time you finish brewing, before the coffee in your
        cup gets cold.
      </p>
      <ul>
        <li>
          <span aria-hidden /> Wipe the steam wand{" "}
          <em>immediately</em> after use with a damp microfibre cloth.
          Dried milk is a tax on tomorrow you.
        </li>
        <li>
          <span aria-hidden /> Knock the puck out of the portafilter and
          rinse the basket under hot water. If a puck is sloppy or
          cracked, fix it tomorrow — start with distribution before you
          tamp.
        </li>
        <li>
          <span aria-hidden /> Run a blank shot — water with no coffee —
          to flush the group head.
        </li>
        <li>
          <span aria-hidden /> Rinse the{" "}
          <ProductChip slug="milk-jug">milk jug</ProductChip>{" "}
          immediately. Dry inside with the cloth.
        </li>
        <li>
          <span aria-hidden /> Wipe the{" "}
          <ProductChip slug="tamping-mat">tamping mat</ProductChip> and the
          counter where grounds landed.
        </li>
      </ul>

      <h2>Weekly — 5 minutes, once a week</h2>
      <p>
        Pick a day. Sunday morning is a classic. Do these before your
        first brew.
      </p>
      <ul>
        <li>
          <span aria-hidden /> Backflush the espresso machine with plain
          water using a blind basket. Pump, release, pump, release — five
          cycles.
        </li>
        <li>
          <span aria-hidden /> Soak the basket and shower screen in hot
          water with espresso machine detergent (Cafiza, Pulycaff, any
          generic). 15 minutes. Rinse like you mean it.
        </li>
        <li>
          <span aria-hidden /> Empty and rinse the drip tray. Yes, even if
          it&rsquo;s only half full.
        </li>
        <li>
          <span aria-hidden /> Brush out the grinder hopper and chute.
          Coffee oils go rancid; you don&rsquo;t want a week-old film
          flavoring tomorrow&rsquo;s shot.
        </li>
      </ul>

      <h2>Monthly — 20 minutes, once a month</h2>
      <p>
        Put this in your calendar. We mean it.
      </p>
      <ul>
        <li>
          <span aria-hidden /> Backflush with detergent (Cafiza or
          equivalent). Five cycles with detergent, then five with plain
          water to flush it out.
        </li>
        <li>
          <span aria-hidden /> Descale if your machine asks for it
          (most modern machines have an indicator). Use the manufacturer&rsquo;s
          descaler or citric acid solution. Follow the manual — descaling
          incorrectly can void warranties.
        </li>
        <li>
          <span aria-hidden /> Take the grinder apart enough to clean the
          burrs (consult its manual; some are easy, some are an
          ordeal). A grinder cleaning tablet works well and is
          beginner-friendly.
        </li>
      </ul>

      <h2>Pour-over gear</h2>
      <ul>
        <li>
          <span aria-hidden /> The{" "}
          <ProductChip slug="pour-over-stand">Pour-Over Stand</ProductChip>{" "}
          and the{" "}
          <ProductChip slug="sharing-pot">Sharing Pot</ProductChip>{" "}
          want hot water and a soft sponge after each use. The stand is
          powder-coated — skip abrasive sponges. The pot is glass; if it
          stains, white vinegar overnight clears it.
        </li>
        <li>
          <span aria-hidden /> The{" "}
          <ProductChip slug="vacuum-jar">Vacuum Jar</ProductChip>{" "}
          should be hand-washed every couple of weeks. Coffee oils film
          the inside — beans still taste fine but the seal works less
          well; a quick wash brings it back.
        </li>
      </ul>

      <h2>The Prism Rocks Glass</h2>
      <p>
        Hand-finished glass is forgiving. Wash by hand with warm water
        and a soft cloth — no abrasive sponges, no hot/cold shocks, no
        dishwasher if you can avoid it. The colored prism is in the
        glass itself, not a coating, so it doesn&rsquo;t fade.
      </p>

      <blockquote>
        If you&rsquo;re ever in doubt: tiny amounts of work, often, beats
        a big project. The best gear is the gear you&rsquo;ve cleaned.
      </blockquote>
    </GuideLayout>
  );
}
