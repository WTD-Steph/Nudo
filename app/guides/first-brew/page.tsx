import { GuideLayout } from "@/components/GuideLayout";
import { Term } from "@/components/Term";
import { ProductChip } from "@/components/ProductChip";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, howToLd } from "@/lib/seo";
import { getGuide, getRelatedGuides } from "@/lib/guides";
import { ROUTES } from "@/lib/links";

const SLUG = "first-brew";

export const metadata = {
  title: "Your first brew, in three honest steps",
  description:
    "The shortest path we know to a cup of coffee that's better than yesterday's. Plain English, no gatekeeping.",
};

export default function FirstBrewGuide() {
  const guide = getGuide(SLUG)!;
  const related = getRelatedGuides(SLUG);

  return (
    <>
      <JsonLd
        data={[
          howToLd({
            name: guide.title,
            description: guide.dek,
            totalTime: "PT6M",
            steps: [
              {
                name: "Weigh it, don't guess it",
                text:
                  "Use a 0.1 g scale to weigh your dose and your yield. Same beans, same grind, same weight in — consistent coffee out.",
              },
              {
                name: "Distribute, then tamp (espresso) / bloom, then pour (filter)",
                text:
                  "For espresso, WDT the bed before tamping. For pour-over, bloom with twice the weight of your dose for 30 seconds, then pour slowly in spirals.",
              },
              {
                name: "Taste before you tweak",
                text:
                  "Pour into a deliberate cup and sip slowly. Sour means under-extracted; bitter means over-extracted. Change one thing next time.",
              },
              {
                name: "Brew it again tomorrow",
                text:
                  "Coffee is a practice, not a performance. Make the same brew, the same way, for a week. Notice what drifts.",
              },
            ],
          }),
          breadcrumbLd([
            { name: "Home", href: ROUTES.home },
            { name: "Guides", href: ROUTES.guides },
            { name: guide.title, href: ROUTES.guide(guide.slug) },
          ]),
        ]}
      />
      <GuideLayout guide={guide} related={related}>
      <p>
        Your first cup at home doesn&rsquo;t have to be perfect. It just has
        to be a little better than yesterday&rsquo;s. This is the shortest
        path we know — three steps, six minutes of reading, plus however
        long it takes to actually brew the cup.
      </p>
      <p>
        If you&rsquo;ve never made coffee at home before, we&rsquo;ll assume
        you have <em>some</em> kind of brewer (an espresso machine, a V60,
        an AeroPress, a French press, anything) and a bag of fresh-ish
        beans. The advice that follows is true for all of them.
      </p>

      <h2>The whole guide, in one sentence</h2>
      <p>
        Weigh your coffee in, weigh your coffee out, taste what you made,
        change <em>one</em> thing next time.
      </p>
      <p>
        That&rsquo;s it. The rest of the article is just expanding each
        word.
      </p>

      <h2>Step 01 — Weigh it, don&rsquo;t guess it</h2>
      <p>
        A scale is the cheapest, biggest single upgrade in home coffee.
        Same beans, same grind, same weight in — and suddenly your coffee
        tastes the same on Tuesday as it did on Saturday.
      </p>
      <p>
        Tablespoons lie. The same scoop of beans by volume can vary by
        15&ndash;20% in weight depending on bean shape and roast. If
        you&rsquo;re trying to figure out why your coffee tastes different
        every day and you&rsquo;re scooping, that&rsquo;s the answer.
      </p>
      <p>
        What you need:
      </p>
      <ul>
        <li>
          <span aria-hidden /> A scale that measures to{" "}
          <strong>0.1 g</strong> precision. Ours is the{" "}
          <ProductChip slug="scale-cube" />, but anything in this range works.
        </li>
        <li>
          <span aria-hidden /> A <Term slug="dose">dose</Term> you can repeat. For
          espresso, 17&ndash;19 g into a 58 mm basket. For pour-over,
          15&ndash;18 g.
        </li>
        <li>
          <span aria-hidden /> A <Term slug="ratio">ratio</Term> you can repeat. For
          espresso, 1:2 (18 g in &rarr; 36 g out). For pour-over, 1:16 (15 g
          in &rarr; 240 g of water).
        </li>
      </ul>

      <h2>Step 02 — Distribute, then tamp (espresso) / bloom, then pour (filter)</h2>
      <p>
        This is the step where most beginners lose. Not because
        it&rsquo;s hard, but because it&rsquo;s the step where every
        YouTube video starts using jargon.
      </p>

      <h3>If you&rsquo;re making espresso</h3>
      <p>
        Grind your <Term slug="dose">dose</Term> using a{" "}
        <Term slug="dosing-cup">dosing scoop</Term> (or straight into the
        portafilter, but the scoop is cleaner). Stir the bed with any
        thin pin — the <Term slug="wdt">WDT</Term> technique — to break
        up the clumps that come out of any grinder, no matter how fancy.
        Then tamp until the puck stops moving.{" "}
        <Term slug="channeling">Channeling</Term> — water finding the easy
        way out — is the most common cause of bad shots, and you just
        prevented most of it.
      </p>
      <ul>
        <li>
          <span aria-hidden /> Dosing scoop: <ProductChip slug="dosing-scoop" />
        </li>
        <li>
          <span aria-hidden /> Tamping mat:{" "}
          <ProductChip slug="tamping-mat">Tamping mat</ProductChip>
        </li>
      </ul>

      <h3>If you&rsquo;re making pour-over</h3>
      <p>
        Pour twice the weight of your dose in water and wait 30 seconds —
        this is the <Term slug="bloom">bloom</Term>. Then pour the rest
        slowly, in spirals from the center out, keeping the bed roughly
        level. The whole brew should take 2:30&ndash;3:00.
      </p>
      <p>
        If your pour-over is finishing in 1:30, your grind is too coarse.
        If it&rsquo;s taking 4:30, too fine. Adjust one notch on the
        grinder. (Yes, one notch is enough. Bigger jumps make this
        miserable.)
      </p>

      <h2>Step 03 — Taste before you tweak</h2>
      <p>
        Pour what you just made into something you can taste from. The{" "}
        <ProductChip slug="rocks-glass" /> is what we use — short, glass,
        and noticeably different from a mug; you taste with your eyes too.
        Any small cup works, but a deliberate one helps you notice.
      </p>
      <p>
        Sip slowly. You&rsquo;re looking for one of three things:
      </p>
      <blockquote>
        Sour means under-extracted. Bitter means over-extracted. If you
        can&rsquo;t tell which, you have a <Term slug="distribution">distribution</Term> problem, not an extraction one — go back to Step 02.
      </blockquote>
      <p>
        See <Term slug="sour-bitter">sour vs. bitter</Term> in the
        glossary if those words don&rsquo;t map onto anything yet — both
        are vocabulary you build by tasting bad coffee on purpose.
      </p>

      <h3>Change one thing, not three</h3>
      <p>
        This is the rule we model in everything we make: one variable
        per brew. If you change the grind <em>and</em> the dose{" "}
        <em>and</em> the ratio between two cups, you have no idea which
        change did what.
      </p>
      <p>
        Pick the lever that&rsquo;s most likely the culprit. Sour or
        weak? Grind finer. Bitter or harsh? Grind coarser. Make
        tomorrow&rsquo;s cup with that change and see what moves.
      </p>

      <h2>Step 04 — Brew it again tomorrow</h2>
      <p>
        Coffee is a practice, not a performance. The most important
        habit you can build is making the same brew, the same way, for
        a week. Notice what stays the same. Notice what drifts. The
        drift is interesting.
      </p>
      <p>
        And if it&rsquo;s bad tomorrow too — that&rsquo;s normal. Your
        first shot was bad. Your second one is noticeably better. By
        the fifth, you&rsquo;re the friend who makes coffee.
      </p>
      <p>
        Ok, you got this.
      </p>
    </GuideLayout>
    </>
  );
}
