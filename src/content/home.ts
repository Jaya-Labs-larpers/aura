import type { Card, Feature, Link, Slot } from "./types";

export const HOME = {
  meta: {
    title: "AURA | Rooftop restaurant and bar on Bassac Lane, Phnom Penh",
    description: "Charcoal-grilled Wagyu, Khmer classics and cocktails, from lunch until late.",
  },

  hero: {
    title: "Rooftop restaurant and bar on Bassac Lane",
    text: "Charcoal-grilled Wagyu, Khmer classics and cocktails, from lunch until late.",
    // Cross-fades slide 1 → slide 2, slow Ken Burns on each.
    slides: [
      { label: "AURA's rooftop restaurant and bar lit up at night, Bassac Lane", photo: "site/hero-slide-2.jpg" },
      { label: "Aerial view of AURA's rooftop restaurant and bar at night, Bassac Lane", photo: "site/hero-slide-3.jpg" },
    ] satisfies [Slot, Slot],
    ctas: [
      { label: "Book a table", href: "/reservation" },
      { label: "View menu", href: "/menu" },
    ] satisfies Link[],
  },

  rooftop: {
    title: "The rooftop",
    body: ["On Bassac Lane: an open-air lounge among the plants, and indoor seating by the bar."],
    slot: { label: "AURA rooftop at night from above, Bassac Lane", photo: "venue/05-venue-image.jpg" },
  } satisfies Feature,

  cardsHeading: "From lunch to late",
  cards: [
    {
      title: "Lunch in the open-air lounge",
      slot: { label: "AURA's open-air terrace by day", photo: "venue-highlights/02.jpg" },
      cta: { label: "Book a table", href: "/reservation" },
    },
    {
      title: "Dinner from the charcoal grill · Wagyu, Fish Amok, Saraman",
      // R2 source for this photo (Wagyu on stone) is offline; stays a placeholder until it's back.
      slot: { label: "Charcoal-grilled Wagyu on stone" },
      cta: { label: "View menu", href: "/menu" },
    },
    {
      title: "Late drinks at the bar",
      slot: { label: "AURA's bar lit up at night", photo: "venue-highlights/03.jpg" },
      cta: { label: "View menu", href: "/menu" },
    },
  ] satisfies Card[],

  chefAndTeam: {
    title: "Chef and team",
    body: [
      "Our kitchen is built around the charcoal grill: Kampong Chhnang Wagyu, plus Khmer classics like Fish Amok and Saraman.",
    ],
    // R2 source for this photo (staff serving) is offline; stays a placeholder until it's back.
    slot: { label: "AURA staff serving at the table" },
  } satisfies Feature,

  // Hidden until F1–F4 (opening hours facts) are confirmed; see website-audit handover.
  gettingHere: undefined as Link | undefined,

  strip: [
    { label: "Aerial view of AURA's rooftop restaurant and bar at night, Bassac Lane", photo: "site/hero-slide-3.jpg" },
    { label: "AURA's lounge among the plants by day", photo: "venue-highlights/01.jpg" },
    // R2 source for this photo (drink pouring) is offline; stays a placeholder until it's back.
    { label: "Cocktail being poured at AURA's bar" },
    { label: "Khmer sharing platter on green marble", photo: "site/welcome-experience-1.webp" },
    // R2 source for this photo (event table) is offline; stays a placeholder until it's back.
    { label: "Table set for a private event at AURA" },
  ] satisfies Slot[],

  award: {
    title: "Tripadvisor Travelers' Choice",
    text: "Recognised by guests among the top experiences in Phnom Penh.",
    slot: { label: "Award badge", photo: "site/tripadvisor-travelers-choice.png" } satisfies Slot,
  },

  booking: {
    title: "Lunch, dinner or late drinks: book your table.",
  },
};
