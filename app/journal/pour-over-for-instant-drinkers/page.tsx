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

      <h2>Start with a $4 dripper. Not anything else.</h2>
      <p>
        Walk into any supermarket and buy the cheapest plastic V60-style
        cone you can find. Three or four dollars. A pack of paper
        filters next to it. That&rsquo;s the start of pour-over.
      </p>
      <p>
        Hook the cone over your mug, drop a filter in, scoop coffee
        in, pour hot water through it slowly, drink. It takes the
        same amount of time as instant — maybe an extra 90 seconds.
      </p>
      <p>
        The result is filter coffee. Brighter than instant. More
        flavour, less &ldquo;coffee-flavoured.&rdquo; Often a touch
        more acidic, which sounds bad in theory and is mostly fine
        in practice.
      </p>

      <h2>What changes</h2>
      <p>
        For about a week, drink one pour-over a day and one instant a
        day. Don&rsquo;t commit to anything. Don&rsquo;t learn any
        vocabulary. Just drink both and notice.
      </p>
      <p>
        Most people start preferring the pour-over without ever
        deciding to. That&rsquo;s the moment to think about a small
        upgrade.
      </p>

      <h2>If you want to upgrade after that</h2>
      <p>
        The first thing that&rsquo;s worth spending money on is a
        scale. The{" "}
        <ProductChip slug="scale-lite">Essential Scale · Lite</ProductChip>{" "}
        is what we&rsquo;d hand you — 0.1 g precision, no Bluetooth, no
        nonsense, and just enough timer to keep you honest.
      </p>
      <p>
        The next thing — once you know you want this to look as good
        as it tastes — is a{" "}
        <ProductChip slug="sharing-pot">Sharing Pot</ProductChip> to
        catch the brew, and eventually a{" "}
        <ProductChip slug="pour-over-stand">Pour-Over Stand</ProductChip>{" "}
        that holds the dripper at the right height every time.
      </p>

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
