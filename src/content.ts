/**
 * content.ts — all the words & numbers in one place.
 *
 * This is your edit-here file, Nic. Change copy, prices, services, contact
 * info, and service-area towns here without digging through components.
 * Anything marked TODO is a placeholder you'll want to fill in for real.
 */

export const business = {
  name: "Friendly Pressure",
  tagline: "Pressure washing, done with a smile.",
  email: "FriendlyPressureWA@gmail.com",
  // TODO: real business phone later. 555-WASH (555-9274) is a placeholder.
  phone: "555-WASH",
  phoneHref: "tel:555-9274",
  // TODO: confirm your home base town for the service-area copy
  homeBase: "Your Town",
  owner: "Nic",
};

export const hero = {
  // Big swing line. Honest, warm, a little cheeky — not "100% SATISFACTION GUARANTEED!!!"
  headline: "Hi, I'm Nic. I make grimy things look new again.",
  sub: "Friendly Pressure is just me, a good machine, and a genuine care for your property. No upsells, no corporate script — just careful work and a fair price.",
  primaryCta: "Get a free quote",
  secondaryCta: "See the before & afters",
};

export type Service = {
  icon: string; // emoji for now — easy to swap for SVGs later
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    icon: "🏠",
    title: "House & siding wash",
    blurb:
      "Soft-washing for vinyl, stucco, and brick. Knocks down the green stuff and cobwebs without blasting your siding to bits.",
  },
  {
    icon: "🚗",
    title: "Driveways & walkways",
    blurb:
      "Concrete, pavers, and that one oil stain you've been staring at for two years. Surface-cleaned for an even, stripe-free finish.",
  },
  {
    icon: "🪵",
    title: "Decks & fences",
    blurb:
      "Wood gets the gentle treatment — clean it up without chewing up the grain. Great prep before a re-stain.",
  },
  {
    icon: "🧱",
    title: "Patios & pavers",
    blurb:
      "Bring the patio back so it's actually nice to sit on again. Optional sand re-application for paver joints.",
  },
  {
    icon: "🪟",
    title: "Gutters & exterior",
    blurb:
      "Gutter face brightening, soffits, eaves, and the dingy bits up high you can't reach. Ask me what else needs love.",
  },
  {
    icon: "✨",
    title: "Something else?",
    blurb:
      "Got a weird job? A rusty fence, a mossy roof walkway, a dumpster pad? Ask. Worst case I say it's not my thing and point you somewhere good.",
  },
];

export type PriceRange = {
  label: string;
  range: string;
  note: string;
};

// Real talk: these are ballparks, not contracts. Honest framing > fake precision.
export const pricing = {
  intro:
    "Every property's different, so I won't pretend a price chart off the internet is accurate. Here's an honest ballpark — your real quote is free, fast, and based on your actual place.",
  ranges: [
    { label: "Driveway / walkway", range: "$80–$180", note: "Most single & double driveways" },
    { label: "House soft-wash", range: "$200–$450", note: "Depends on size & stories" },
    { label: "Deck or patio", range: "$120–$300", note: "By square footage & condition" },
    { label: "Bundle it", range: "Save ~15%", note: "Driveway + house together = best value" },
  ] as PriceRange[],
  footnote:
    "No hidden fees. No “fuel surcharge” nonsense. If something changes once I'm on-site, I tell you before I do it — never after.",
};

export type BeforeAfter = {
  title: string;
  // TODO: drop real photos in /public/gallery and point these there
  before: string;
  after: string;
};

export const gallery: BeforeAfter[] = [
  { title: "Driveway", before: "", after: "" },
  { title: "Siding", before: "", after: "" },
  { title: "Back patio", before: "", after: "" },
];

export const process = {
  heading: "How I work (and why your storm drain will thank me)",
  intro:
    "Pressure washing sends a lot of water — and whatever it lifts — straight toward the gutter and into local waterways. I actually care about that, so I work clean on purpose.",
  steps: [
    {
      title: "Walk it together",
      body: "I look at the job with you first, point out what'll clean up great and what won't, and set honest expectations before any water runs.",
    },
    {
      title: "Right pressure, right surface",
      body: "Soft-wash where soft-wash belongs, more muscle where it's safe. Your siding and wood get protected, not punished.",
    },
    {
      title: "Stormwater-safe cleanup",
      body: "I manage runoff, keep nasty stuff out of storm drains, and use cleaners that get the job done without trashing your yard or the creek downstream.",
    },
    {
      title: "Leave it better than I found it",
      body: "Gear packed, area rinsed, gate latched, nothing left behind but a clean surface and a wave goodbye.",
    },
  ],
};

export const about = {
  heading: "About Nic",
  // First-person, genuine. This is the heart of the site — keep it human.
  body: [
    "I started doing this the old-fashioned way: helping neighbors. People saw me fixing irrigation, tidying landscaping, and washing down a driveway, and word got around. Seven clients later, here we are.",
    "I'm not a franchise and I'm not a guy reading a sales script. When I show up, it's me — I'll treat your property like it's my mom's, do the job right, and charge you a number we both feel good about.",
    "If being genuinely nice and doing careful work costs me a few jobs to the lowest bidder, I'm honestly fine with that. I'd rather have clients who'd recommend me to a friend.",
  ],
  // TODO: swap for a real photo of you (working, smiling, holding a wand — whatever feels right)
  photo: "",
};

export const serviceArea = {
  heading: "Where I work",
  intro:
    "Based in {homeBase} and happy to travel a reasonable distance. If you're a little outside the list, just ask — I'm flexible.",
  // TODO: replace with your actual towns / neighborhoods
  towns: [
    "Your Town",
    "Neighbor Town",
    "Lakeside",
    "Riverbend",
    "Oak Hills",
    "Maplewood",
  ],
};

export const quote = {
  heading: "Get a free quote",
  intro:
    "Tell me a bit about the job. I'll text or email you back — usually same day. No pressure (the only pressure here is the good kind).",
  // Where the form sends. Mailto works with zero backend for now.
  // TODO (optional upgrade): swap to a Formspree / Netlify Forms endpoint for a real inbox form.
  successNote:
    "Thanks! Your email app should've opened with the details ready to send. Hit send and I'll get right back to you.",
};

export const footer = {
  line: "Friendly Pressure — a small, friendly, do-it-right operation.",
  // Word-of-mouth is the whole business. Make referrals easy to mention.
  referral: "Best compliment you can give me is telling a neighbor.",
};
