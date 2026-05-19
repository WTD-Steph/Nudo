import { JournalLayout } from "@/components/JournalLayout";
import { getPost } from "@/lib/journal";

const SLUG = "packing-1000-first-brew-kits";

export const metadata = {
  title: "What we learned packing 1,000 First-Brew Kits",
  description:
    "Six things we didn't expect — and the one we should have. Honest notes from the studio floor.",
};

export default function Post() {
  const post = getPost(SLUG)!;
  return (
    <JournalLayout post={post}>
      <p>
        Between February and April we packed and shipped a thousand
        First-Brew Kits. Most of them got there fine. A handful taught
        us things we should have known earlier. This is the list.
      </p>

      <h2>1 · The box matters more than the kit</h2>
      <p>
        Our first run shipped in a plain corrugated box and a Nudo
        sticker. The sticker peeled in transit. Forty percent of
        photos customers tagged us in showed the kit on a counter
        beside a half-peeled sticker. We&rsquo;ve since switched to a
        printed inner box with the wordmark and the katakana — and the
        photo-sharing rate roughly doubled.
      </p>
      <p>
        The lesson is obvious in hindsight: the moment the customer
        sees the brand is the moment they open the box.
      </p>

      <h2>2 · Microfibre cloths are 30% of the support email volume</h2>
      <p>
        Half of our support email is &ldquo;mine had two cloths but my
        friend&rsquo;s had three&rdquo; or &ldquo;is this the brand
        that comes with the cloth.&rdquo; We standardised at two and
        added a note in the printed guide.
      </p>

      <h2>3 · People read the printed guide</h2>
      <p>
        We almost cut the printed first-brew guide as a cost-saving
        measure. We&rsquo;re glad we didn&rsquo;t. The single biggest
        predictor of a positive review is whether the customer reads
        the guide before the first brew.
      </p>

      <h2>4 · The dosing cup is the favourite</h2>
      <p>
        Of the six items in the kit, the dosing cup gets mentioned by
        name in customer photos more often than the other five
        combined. We didn&rsquo;t expect this.
      </p>

      <h2>5 · International shipping is brutal</h2>
      <p>
        About 4% of international shipments arrived with a cracked
        sharing-pot. We&rsquo;ve added a foam sleeve and a second
        layer of bubble wrap, which adds about 22 cents per kit and
        seems to have fixed it. The next run will tell us for sure.
      </p>

      <h2>6 · The thing we should have known</h2>
      <p>
        We launched without a way to track when a customer reordered.
        Most of our customers come back; we just didn&rsquo;t know
        who. We&rsquo;re fixing this with the new checkout. If
        you&rsquo;ve bought a kit and want anything else, email us
        — we&rsquo;ll put you on the list for early access.
      </p>

      <blockquote>
        The pattern across all six is the same: the small details we
        almost cut for cost or time were the ones the customer
        noticed. Listen to the kit.
      </blockquote>
    </JournalLayout>
  );
}
