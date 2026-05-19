// Coffee vocabulary, in one sentence each.
// Voice rule: if a beginner would have to Google it to understand a
// sentence, the sentence is wrong. Definitions trade precision for
// clarity — they're a starting point, not a textbook.

export type GlossaryEntry = {
  slug: string; // anchor + tooltip key
  term: string;
  short: string; // one-sentence definition (used in inline tooltips)
  long?: string; // optional second sentence for the dedicated page
  see?: string[]; // related slugs
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "bloom",
    term: "Bloom",
    short:
      "The first pour in a pour-over — just enough water to wet the grounds and let gas escape.",
    long: "Fresh coffee gives off CO₂. The bloom is a 30-second pause that lets the bed degas, so the rest of the water can actually extract flavor instead of pushing past bubbles.",
    see: ["pour-over", "extraction"],
  },
  {
    slug: "channeling",
    term: "Channeling",
    short:
      "When water finds an easy path through the coffee bed instead of flowing evenly.",
    long: "Caused by uneven distribution, a soft tamp, or a too-fine grind. The result is sour, weak shots — water extracted everything in one spot and skipped the rest.",
    see: ["distribution", "wdt", "tamp"],
  },
  {
    slug: "dialing-in",
    term: "Dialing in",
    short:
      "The process of adjusting grind, dose, and time until a coffee tastes the way you want.",
    long: "When you switch beans, you usually need to dial in again — grind one step finer or coarser, taste, adjust, repeat. Three to five shots is normal.",
    see: ["grind-size", "ratio", "shot"],
  },
  {
    slug: "distribution",
    term: "Distribution",
    short:
      "Spreading the grounds evenly in the basket so water flows through evenly.",
    long: "The fix for most beginner channeling problems. A WDT tool (or any thin pin, honestly) breaks up clumps before you tamp.",
    see: ["channeling", "wdt", "tamp"],
  },
  {
    slug: "dose",
    term: "Dose",
    short: "The weight of dry coffee you put into the portafilter, in grams.",
    long: "Most 58 mm baskets are designed for 17–19 g. Going higher is fine if you grind coarser to compensate; going lower works if you grind finer.",
    see: ["ratio", "yield", "portafilter"],
  },
  {
    slug: "drip-bag",
    term: "Drip bag",
    short:
      "A single-serve pour-over: pre-ground coffee in a paper bag that hooks over a mug.",
    long: "Just add hot water. The easiest possible filter coffee — good for travel, the office, or trying a new bean without committing to gear.",
    see: ["pour-over"],
  },
  {
    slug: "espresso",
    term: "Espresso",
    short:
      "Concentrated coffee made by forcing hot water through a tightly packed bed of fine grounds.",
    long: "30–35 ml of liquid out, usually in 25–30 seconds. Everything else in espresso — milk drinks, americano — starts here.",
    see: ["shot", "portafilter", "ratio"],
  },
  {
    slug: "extraction",
    term: "Extraction",
    short:
      "What the water pulls out of the coffee — flavor, oils, acidity, bitterness, the lot.",
    long: "Under-extract: sour. Over-extract: bitter. Just right: balanced. Most of dialing in is moving along that curve until you like where you are.",
    see: ["dialing-in", "sour-bitter"],
  },
  {
    slug: "fines",
    term: "Fines",
    short:
      "The dust-fine particles that come out of any grinder, no matter how good.",
    long: "Fines extract faster than the rest of the grounds and can over-extract bitterness or clog the basket. Better grinders make fewer of them.",
    see: ["grind-size"],
  },
  {
    slug: "grind-size",
    term: "Grind size",
    short:
      "How fine or coarse the coffee is ground — finer = slower flow, coarser = faster.",
    long: "Espresso wants fine (~250 microns). Pour-over wants medium (~600 microns). French press wants coarse (~900 microns). A scale to grind is a normal step.",
    see: ["dialing-in", "extraction"],
  },
  {
    slug: "headspace",
    term: "Headspace",
    short:
      "The gap between the puck and the shower screen when you lock the portafilter in.",
    long: "Too little headspace and water can't bloom across the puck. Too much and the puck swells. Aim for 2–4 mm.",
    see: ["puck", "portafilter"],
  },
  {
    slug: "microfoam",
    term: "Microfoam",
    short:
      "Milk steamed to a smooth, paint-like texture — no big bubbles, no thin liquid layer.",
    long: "What latte art is poured into. Steam with the wand just below the surface until you hear a soft tearing sound, then dive deeper to swirl.",
    see: [],
  },
  {
    slug: "portafilter",
    term: "Portafilter",
    short:
      "The handle-and-basket assembly you lock into an espresso machine.",
    long: "Comes in two main sizes — 58 mm (most prosumer machines) and 51 mm (most home machines). Bottomless portafilters have no spout, which makes channeling visible.",
    see: ["basket", "headspace"],
  },
  {
    slug: "basket",
    term: "Basket",
    short:
      "The metal cup inside a portafilter where the coffee sits.",
    long: "Cheap baskets have uneven holes; precision baskets are laser-drilled and pour more evenly. One of the biggest cheap upgrades on entry-level machines.",
    see: ["portafilter", "dose"],
  },
  {
    slug: "pour-over",
    term: "Pour-over",
    short:
      "Filter coffee made by pouring hot water by hand over a bed of grounds in a cone.",
    long: "Most common cones: V60, Kalita Wave, Origami. Each behaves a little differently. The cone is less important than your grind, water, and pour technique.",
    see: ["bloom", "drip-bag"],
  },
  {
    slug: "pre-infusion",
    term: "Pre-infusion",
    short:
      "A gentle, low-pressure wet of the puck before full pressure starts.",
    long: "Some espresso machines do this automatically; on others you can mimic it by slow-starting the pump. Helps with channeling on stubborn beans.",
    see: ["puck", "channeling"],
  },
  {
    slug: "puck",
    term: "Puck",
    short:
      "The disc of coffee in the basket — formed by your dose, distribution, and tamp.",
    long: "After the shot, the puck should pop out as a clean, dry disc. Sloppy, soaked, or cracked pucks usually mean something went wrong upstream.",
    see: ["dose", "tamp", "headspace"],
  },
  {
    slug: "ratio",
    term: "Ratio",
    short: "How much coffee in vs. how much liquid out — usually written 1:2.",
    long: "Espresso ratio: 18 g in, ~36 g out = 1:2. Pour-over: 15 g in, 250 g water = 1:16.7. Once you have a ratio you like, keep it stable while you change other variables.",
    see: ["dose", "yield"],
  },
  {
    slug: "refractometer",
    term: "Refractometer",
    short:
      "A small gadget that measures how much coffee is dissolved in your cup.",
    long: "Useful for serious dialing in. Yes, you can ignore this for a while — most of us did.",
    see: ["extraction"],
  },
  {
    slug: "retention",
    term: "Retention",
    short:
      "Grounds that stay inside the grinder instead of coming out with your dose.",
    long: "Bad retention means you weigh 18 g in but only 17.6 g comes out. Single-dosing grinders (you weigh in for each shot) have lower retention.",
    see: ["grinder"],
  },
  {
    slug: "shot",
    term: "Shot",
    short:
      "A single serving of espresso — typically 30–40 ml in 25–30 seconds.",
    long: "Two simultaneous shots from one portafilter is a 'double'; that's the standard for most home setups.",
    see: ["espresso", "yield", "ratio"],
  },
  {
    slug: "sour-bitter",
    term: "Sour vs. bitter",
    short:
      "Two ways an espresso can go wrong — sour = under-extracted, bitter = over-extracted.",
    long: "Sour: grind finer, or pull longer. Bitter: grind coarser, or pull shorter. If it's both, you have a distribution problem, not an extraction one.",
    see: ["extraction", "channeling"],
  },
  {
    slug: "tamp",
    term: "Tamp",
    short:
      "Pressing the coffee bed flat in the basket before locking the portafilter.",
    long: "Tamp until the puck stops moving — usually around 15 kg of pressure. Level is way more important than hard. A calibrated tamper takes the variable out.",
    see: ["puck", "channeling"],
  },
  {
    slug: "tds",
    term: "TDS",
    short:
      "Total Dissolved Solids — how strong your cup is, measured by a refractometer.",
    long: "Espresso TDS is typically 8–12%; filter coffee is 1.2–1.5%. The number you actually need to learn is your own preference, which is fine to find by taste alone.",
    see: ["refractometer", "extraction"],
  },
  {
    slug: "v60",
    term: "V60",
    short:
      "A specific brand of pour-over cone (Hario's), but the name people use for any 60-degree cone.",
    long: "Spirals on the inside help the filter sit slightly off the wall, which lets air escape during brewing.",
    see: ["pour-over"],
  },
  {
    slug: "wdt",
    term: "WDT",
    short:
      "Weiss Distribution Technique — stirring the coffee bed with thin needles before tamping.",
    long: "Breaks up clumps from the grinder, evens out the bed, drastically reduces channeling. The thing that fixes the most beginner shots in our studio.",
    see: ["distribution", "channeling"],
  },
  {
    slug: "yield",
    term: "Yield",
    short: "How much liquid coffee comes out — measured in grams.",
    long: "For espresso, you almost always weigh your yield rather than measure volume — crema makes volume unreliable. 36 g of liquid is 36 g of liquid; 36 ml might be 25 ml of liquid with foam.",
    see: ["ratio", "dose", "shot"],
  },
  {
    slug: "grinder",
    term: "Grinder",
    short:
      "The single most important piece of gear in your setup — more than the machine.",
    long: "A bad grinder makes consistent coffee impossible. If you're choosing between upgrading the machine or the grinder, upgrade the grinder.",
    see: ["grind-size", "retention", "fines"],
  },
  {
    slug: "burr",
    term: "Burr",
    short:
      "The two metal discs inside a proper grinder that crush coffee into a consistent size.",
    long: "Flat burrs and conical burrs taste different — flats are usually more uniform, conicals more textured. Either works.",
    see: ["grinder", "fines"],
  },
  {
    slug: "channel-of-shame",
    term: "Channel of shame",
    short: "Affectionate term for a visibly bad shot from a bottomless portafilter.",
    long: "You'll see a thin jet shoot out one side at high speed. We've all made one. Re-distribute, re-tamp, try again.",
    see: ["channeling", "portafilter"],
  },
  {
    slug: "blooming-pour",
    term: "Blooming pour",
    short:
      "The first pour in a pour-over — roughly 2× the weight of coffee, poured slowly.",
    long: "For 15 g of coffee, bloom with ~30 g of water for ~30 seconds. Watch for bubbles to slow before continuing.",
    see: ["bloom", "pour-over"],
  },
  {
    slug: "drip",
    term: "Drip coffee",
    short: "Filter coffee — water passes through grounds via gravity, not pressure.",
    long: "Pour-overs are drip. So are automatic coffee makers. The opposite of espresso.",
    see: ["pour-over", "drip-bag"],
  },
  {
    slug: "dosing-cup",
    term: "Dosing cup",
    short:
      "A small cup you grind into, then transfer from. Keeps grounds where they belong.",
    long: "Solves the 'half my coffee is on the counter' problem most beginners don't realize they have.",
    see: ["dose"],
  },
  {
    slug: "milk-jug",
    term: "Milk jug / pitcher",
    short: "The stainless jug you steam milk in.",
    long: "Spout shape matters more than capacity for latte art. 350 ml is a comfortable size for one or two drinks.",
    see: ["microfoam"],
  },
  {
    slug: "single-dose",
    term: "Single-dosing",
    short:
      "Weighing out one shot's worth of beans, putting them in the grinder, grinding them all.",
    long: "Opposite of leaving beans in the hopper. Better for freshness and means less retention waste — but slower.",
    see: ["retention", "grinder"],
  },
  {
    slug: "rosetta",
    term: "Rosetta",
    short:
      "A specific latte art pattern — looks like a leaf with a stem running through it.",
    long: "First pattern most people learn after the heart. Takes weeks of bad attempts. That's normal.",
    see: ["microfoam"],
  },
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}

export function getGlossarySorted(): GlossaryEntry[] {
  return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
}
