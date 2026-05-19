import { GuideLayout } from "@/components/GuideLayout";
import { Term } from "@/components/Term";
import { ProductChip } from "@/components/ProductChip";
import { getGuide, getRelatedGuides } from "@/lib/guides";

const SLUG = "why-first-shot-was-bad";

export const metadata = {
  title: "Why your first shot was bad",
  description:
    "It wasn't the beans. It was almost certainly one of these five things. Probably the second one.",
};

export default function WhyFirstShotWasBadPage() {
  const guide = getGuide(SLUG)!;
  const related = getRelatedGuides(SLUG);

  return (
    <GuideLayout guide={guide} related={related}>
      <p>
        Your first shot at home was bad. Probably your first ten. This
        is fine — even expected. Pulling consistent espresso is a small
        skill that takes a couple of weeks of small adjustments to
        learn.
      </p>
      <p>
        But your second shot can be noticeably better than your first.
        And the difference is almost always one of the following five
        things. We&rsquo;ve listed them in order of how often we see
        them in the studio.
      </p>

      <h2>1 · You guessed the dose</h2>
      <p>
        If you scooped the coffee instead of weighing it, you have no
        idea what your <Term slug="dose">dose</Term> was. A tablespoon
        of one bean weighs different to a tablespoon of another. You
        are not making the same drink twice.
      </p>
      <p>
        Fix: weigh, with a 0.1 g scale. Same dose every time.
      </p>
      <ul>
        <li>
          <span aria-hidden />{" "}
          <ProductChip slug="scale-mini">Halo Mini Scale</ProductChip>
        </li>
      </ul>

      <h2>2 · You skipped distribution</h2>
      <p>
        This is the one. Every grinder produces clumps. Clumps in the
        basket mean water finds the path of least resistance and shoots
        out one spot — <Term slug="channeling">channeling</Term> — instead
        of extracting evenly across the bed. The shot tastes both sour{" "}
        <em>and</em> harsh at once, which is the giveaway.
      </p>
      <p>
        Fix: <Term slug="wdt">WDT</Term> the bed before tamping. Eight
        thin pins, ten seconds of stirring. It really is that simple.
      </p>
      <ul>
        <li>
          <span aria-hidden />{" "}
          <ProductChip slug="distributor">Gravity Leveler &amp; Distributor</ProductChip>
        </li>
      </ul>

      <h2>3 · The grind was wrong</h2>
      <p>
        Espresso lives in a narrow range of{" "}
        <Term slug="grind-size">grind sizes</Term>. Too coarse: the
        shot rushes out under 20 seconds and tastes sour and weak. Too
        fine: it chokes the machine and tastes burnt.
      </p>
      <p>
        Fix: aim for a 25&ndash;30 second shot for an 18 g dose pulling
        36 g out. If it&rsquo;s faster than that, grind one notch finer.
        Slower, one notch coarser. Don&rsquo;t change two things at once.
      </p>

      <h2>4 · The basket was wrong for your dose</h2>
      <p>
        Stock baskets on entry-level machines are often optimised for a
        narrow dose range (sometimes only 14&ndash;16 g) and the holes
        aren&rsquo;t evenly drilled. If you&rsquo;re dosing 19 g into a
        stock 16 g basket, you have no{" "}
        <Term slug="headspace">headspace</Term> and the puck will deform.
      </p>
      <p>
        Fix: upgrade to a precision basket. The{" "}
        <ProductChip slug="portafilter-basket">Ultra Precision Basket</ProductChip>{" "}
        takes 17&ndash;19 g and has properly drilled holes.
      </p>

      <h2>5 · The beans were old</h2>
      <p>
        Beans want to be roasted within the last 2&ndash;4 weeks for
        espresso. (Yes, supermarket espresso beans that say
        &ldquo;best by 2027&rdquo; are stale on the shelf.) Fresh beans
        give off CO₂ — you&rsquo;ll see the puck bloom and rise as the
        shot starts.
      </p>
      <p>
        Fix: buy from a local roaster. Use it within a month of the
        roast date.
      </p>
      <ul>
        <li>
          <span aria-hidden />{" "}
          <ProductChip slug="storage-tube">Coffee Storage Tubes</ProductChip>{" "}
          for keeping the beans you&rsquo;re drinking now close — and the
          rest sealed.
        </li>
      </ul>

      <blockquote>
        If you fix all five and the shot&rsquo;s still bad — email us.
        Honestly. We&rsquo;ll help you figure out which of the dozen
        less-common things is the culprit. (Probably the water. Or the
        temperature. Or the puck-screen. We&rsquo;ve been here.)
      </blockquote>
    </GuideLayout>
  );
}
