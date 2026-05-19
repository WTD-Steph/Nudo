import { JournalLayout } from "@/components/JournalLayout";
import { Term } from "@/components/Term";
import { getPost } from "@/lib/journal";

const SLUG = "cheapest-grinder-we-recommend";

export const metadata = {
  title: "The cheapest grinder we'd actually recommend",
  description:
    "Spoiler: it's not ours — we don't sell a grinder. Here's the one we'd buy under $200, and why we'd buy it.",
};

export default function Post() {
  const post = getPost(SLUG)!;
  return (
    <JournalLayout post={post}>
      <p>
        We get this question more than any other: <em>what grinder
        should I buy under $200?</em>
      </p>
      <p>
        We don&rsquo;t sell a grinder. We&rsquo;ve thought about it.
        The honest answer is the market is already saturated at this
        price point with grinders we couldn&rsquo;t meaningfully
        improve on — and adding a Nudo-branded version would just be
        marketing.
      </p>
      <p>
        So here&rsquo;s the one we&rsquo;d buy if we were starting
        today: <strong>Timemore Chestnut C2</strong>. Hand grinder.
        About $80. Conical burrs. It will outlast your first three
        espresso machines.
      </p>

      <h2>Why hand-cranked, not electric</h2>
      <p>
        At $80 you can have a great hand grinder or a mediocre
        electric. A mediocre electric makes mediocre coffee with
        less effort; a great hand grinder makes good coffee with
        more.
      </p>
      <p>
        The C2 has stepped adjustment so you can&rsquo;t get lost
        between settings, low{" "}
        <Term slug="retention">retention</Term> because there&rsquo;s
        nowhere for grounds to hide, and a steel body that doesn&rsquo;t
        flex. It&rsquo;s also small enough to take on holiday.
      </p>

      <h2>What it&rsquo;s not</h2>
      <p>
        It&rsquo;s not espresso-capable, really. You can grind fine
        enough, but it takes ages and the grind isn&rsquo;t quite
        uniform enough to dial in espresso confidently. If you&rsquo;re
        only making espresso, save up for a 1Zpresso J-Max
        (~$180) instead.
      </p>
      <p>
        For pour-over, French press, AeroPress, and drip — the C2 is
        a forever-tool.
      </p>

      <h2>The Nudo angle</h2>
      <p>
        We&rsquo;d rather tell you what to buy when we don&rsquo;t sell
        it than not tell you and lose your trust. That&rsquo;s the
        whole brand. When we make a grinder ourselves — and we might,
        eventually — it&rsquo;ll be because we&rsquo;ve found
        something specific to improve, not because we want a margin.
      </p>

      <blockquote>
        The best gear recommendation is from someone who isn&rsquo;t
        trying to sell it to you. We aim to be that, even at the
        cost of an obvious sale.
      </blockquote>
    </JournalLayout>
  );
}
