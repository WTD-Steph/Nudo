import { JournalLayout } from "@/components/JournalLayout";
import { ProductChip } from "@/components/ProductChip";
import { getPost } from "@/lib/journal";

const SLUG = "pour-over-for-instant-drinkers";

export const metadata = {
  title: "Pour-over for people who already drink instant",
  description:
    "If you live on Nescafé sachets, this is the lowest-pressure way to try something different. No moral lectures, no jargon.",
};

export default function Post() {
  const post = getPost(SLUG)!;
  return (
    <JournalLayout post={post}>
      <p>
        Instant coffee gets a lot of unfair stick. It works. It&rsquo;s
        fast. It costs almost nothing per cup. Half the world wakes up
        on it.
      </p>
      <p>
        But if you&rsquo;ve been curious about &ldquo;real&rdquo;
        coffee and felt vaguely intimidated about the leap — this is
        for you. We&rsquo;re going to skip every part of the
        conversation that requires you to buy gear, learn vocabulary,
        or take any of it seriously.
      </p>

      <h2>Start with drip bags. Not anything else.</h2>
      <p>
        A drip bag is pre-ground coffee in a small paper pouch with
        a folding hook on top. You tear it open, hook it over your
        mug, pour hot water through it slowly, drink. It takes the
        same amount of time as instant — maybe an extra 90 seconds.
      </p>
      <p>
        The result is filter coffee. Brighter than instant. More
        flavour, less &ldquo;coffee-flavoured.&rdquo; Often a touch
        more acidic, which sounds bad in theory and is mostly fine
        in practice.
      </p>
      <ul>
        <li>
          <span aria-hidden /> The product:{" "}
          <ProductChip slug="drip-bags">Non-Woven Drip Bags</ProductChip>{" "}
          (8 per box).
        </li>
      </ul>

      <h2>What changes</h2>
      <p>
        For about a week, drink one drip bag a day and one instant a
        day. Don&rsquo;t commit to anything. Don&rsquo;t learn any
        vocabulary. Just drink both and notice.
      </p>
      <p>
        Most people start preferring the drip bag without ever
        deciding to. That&rsquo;s the moment to think about a small
        upgrade.
      </p>

      <h2>If you want to upgrade after that</h2>
      <p>
        The cheapest upgrade is a Portable V60 + a kettle. The
        portable dripper folds flat and uses no paper filters; the
        kettle can be any electric kettle you already own (a
        gooseneck makes it easier but isn&rsquo;t required at this
        stage).
      </p>
      <ul>
        <li>
          <span aria-hidden /> Total cost of the upgrade:{" "}
          <ProductChip slug="portable-dripper">$26</ProductChip>.
        </li>
      </ul>

      <h2>What we&rsquo;re not going to tell you</h2>
      <p>
        We&rsquo;re not going to tell you instant is bad. It&rsquo;s
        not. We&rsquo;re not going to ask you to weigh anything. We&rsquo;re
        not going to use the word <em>extraction</em>. We&rsquo;re
        not going to ask you to grind your own beans.
      </p>
      <p>
        Those are all things you can graduate into if you want. But
        the first step is just trying something different, with no
        commitment. Drip bags are that step.
      </p>

      <blockquote>
        Coffee that&rsquo;s &ldquo;better&rdquo; than what you have
        is only better if you actually drink it. Start where you
        are.
      </blockquote>
    </JournalLayout>
  );
}
