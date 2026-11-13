import type { EventGridItem, EventSpace, Slot } from "./types";

// Events page, modelled on Amazónico's private dining page: an intro split, a
// spaces header, one full-height split per space (photo slider + text), two
// grids (occasions, included extras), event catering, then the enquiry form.
// Space, occasion and included copy comes from AURA's corporate events deck;
// the rest of the deck is sales material and stays off the site.
const NBSP = " ";

const spaces = [
  {
    value: "pavilion",
    title: "AURA Pavilion",
    tags: [`Up${NBSP}to${NBSP}25`, "Air-conditioned", "KTV"],
    body: [
      `Our principal indoor private room, tucked away from the bustle. Set it as one long table or in cabaret-style clusters, with a 75-inch screen for slides and karaoke for later in the night.`,
    ],
    bestFor: "Business dinners, farewells, karaoke nights",
    slides: [
      { label: "The AURA Pavilion dressed for a private celebration, with rose petals and a balloon arch", photo: "spaces/pavilion-private-celebration.jpg" },
      { label: "The AURA Pavilion", photo: "venue/19-venue-image.jpg" },
      { label: "An AURA chef carving at the table during a private celebration in the AURA Pavilion", photo: "spaces/pavilion-chef-carving.jpg" },
    ],
  },
  {
    value: "terrasse",
    title: "The Terrasse",
    tags: [`Up${NBSP}to${NBSP}20`, "Covered", "Semi-private"],
    body: [
      "Long tables under a Khmer-timber pergola, just off the main dining floor. Close enough to feel the restaurant's energy, private enough to hold your own conversation.",
    ],
    bestFor: "Client dinners, team gatherings",
    slides: [
      { label: "Long tables on the Terrasse, beside the glass walls of the AURA Pavilion", photo: "spaces/terrasse-long-tables.jpg" },
      { label: "A long candlelit table dressed for a client dinner on the Terrasse", photo: "venue/22-venue-image.jpg" },
      { label: "The Terrasse's long table set for a dinner, with candles and florals", photo: "venue/25-venue-image.jpg" },
    ],
  },
  {
    value: "main-deck",
    title: "The Main Deck",
    tags: [`60${NBSP}seated`, `150${NBSP}standing`, "Outdoor"],
    body: [
      "The heart of AURA: our central dining floor, wrapped around the bar and the live band stage. It is built for bigger nights, with speeches, awards and music on one floor.",
    ],
    bestFor: "Year-end parties, launches, networking",
    slides: [
      { label: "The open-air main dining floor at AURA, beneath the AURA sign", photo: "spaces/main-deck-open-air-floor.jpg" },
      { label: "Guests raising a toast with their host in the band corner during an evening event", photo: "spaces/main-deck-band-corner-toast.jpg" },
    ],
  },
  {
    value: "upper-rooftop",
    title: "Upper Rooftop",
    tags: [`Up${NBSP}to${NBSP}25 per${NBSP}wing`, "Covered"],
    body: [
      "One floor up, two covered wings sit apart from the main floor. Take one for a quiet business dinner, or both for a team party. If the weather turns, they become the rain plan.",
    ],
    bestFor: "Business dinners, team parties",
    slides: [
      { label: "A covered wing of the Upper Rooftop set for dinner, seen from its open side", photo: "spaces/upper-rooftop-wing-dinner.jpg" },
      { label: "A covered wing of the Upper Rooftop with marble tables under timber louvres", photo: "spaces/upper-rooftop-wing-louvres.jpg" },
      { label: "A wing of the Upper Rooftop set up with a balloon arch for a celebration", photo: "venue/20-venue-image.jpg" },
    ],
  },
] satisfies EventSpace[];

const buyout = {
  value: "whole-venue",
  title: "The whole venue",
  tags: ["125 seated", "200 standing"],
  text: "Every space on both levels, with the stage, the bar and the kitchen, reserved for your guests alone. Your logo at the door, and no other guests but yours.",
};

const occasions = {
  eyebrow: "Occasions",
  title: "Whatever the occasion",
  items: [
    { title: "Large corporate events", text: `Year-end and Christmas parties, festivals and company${NBSP}milestones.` },
    { title: "Business & networking", text: "Client dinners, appreciation nights and industry mixers." },
    { title: "Team celebrations", text: "Welcome and farewell parties, onboarding and recruitment days." },
    { title: "Promotional events", text: `Product launches, brand activations and${NBSP}announcements.` },
  ] satisfies EventGridItem[],
};

const included = {
  eyebrow: "Event services",
  title: "Included with every event",
  text: "AURA is set up as a flexible venue. Want to go further? Just let us know.",
  items: [
    { title: "Wi-Fi", text: "Fast connection for all guests" },
    { title: "TV screen", text: "75-inch screen, for slides & videos" },
    { title: "Event planner", text: "Yours from start to finish" },
    { title: "Sound system", text: `Speakers and a${NBSP}microphone` },
    { title: "Karaoke (KTV)", text: `In the AURA${NBSP}Pavilion` },
    { title: "Event photos", text: "Shots of the night to keep" },
    { title: "Custom layout", text: `Your layout, plus a check-in${NBSP}desk` },
    { title: "Table styling", text: `Decorative dining${NBSP}setting` },
    { title: "Menus & cards", text: "Personalised for each guest" },
    { title: "Logo signage", text: `Your logo at${NBSP}the${NBSP}entrance` },
    { title: "Brand lighting", text: `The venue lit in${NBSP}your${NBSP}colours` },
    { title: "Valet parking", text: `A hassle‑free${NBSP}arrival` },
  ] satisfies EventGridItem[],
};

export const EVENTS = {
  meta: {
    title: "Private Events",
    description:
      "Private dining, celebrations and corporate events at AURA, a rooftop garden restaurant above Bassac Lane in Phnom Penh, for up to 125 seated or 200 standing guests.",
  },
  intro: {
    title: "Private events at AURA",
    body: [
      `Private dining, celebrations and company nights in our rooftop garden above Bassac${NBSP}Lane, from intimate dinners to 200${NBSP}standing guests across the whole${NBSP}venue.`,
      `One event planner looks after you from first enquiry to last toast. Our General Manager, Chamroeun${NBSP}Pok, oversees every event.`,
    ],
    slides: [
      { label: "Guests posing for photos at a private rooftop event at AURA", photo: "events/private-event-rooftop-party.jpg" },
      { label: "Guests celebrating at a private party at AURA", photo: "site/private-event-celebration.jpg", mobilePosition: "right" },
      { label: "Guests toasting at a festive celebration at AURA", photo: "events/14-meeting-and-event.jpg" },
      { label: "Staff presenting a birthday celebration at AURA", photo: "events/32-meeting-and-event.jpg" },
    ] satisfies Slot[],
    enquire: "Enquire",
    call: "Call Now",
  },
  spaces: {
    eyebrow: "Spaces",
    title: "Find your place at AURA",
    text: `Two levels, four spaces, from intimate dinners to 200${NBSP}standing${NBSP}guests.`,
    items: spaces,
    buyout,
  },
  occasions,
  included,
  // AURA's own copy; no photos supplied yet, so both slides are placeholders.
  catering: {
    title: "Event Catering",
    body: [
      "AURA offers off-site catering at your home or a venue of your choice.",
      "Our kitchen and service team bring the same standard of food and service found at the restaurant, for a well-organised and enjoyable event.",
    ],
    slides: [
      { label: "Event catering 1: AURA's team serving off-site" },
      { label: "Event catering 2: canapés at a private venue" },
    ] satisfies Slot[],
  },
  // Form fields follow Zuma London's private events enquiry form.
  enquiry: {
    eyebrow: "Event Enquiries",
    title: "Plan your event",
    contact: {
      lead: "Or speak to",
      name: "Chamroeun Pok, General Manager",
    },
    typePlaceholder: "e.g. year-end party, client dinner, birthday",
    contactMethods: ["WhatsApp", "Telegram", "Email"],
    defaultGuests: 10,
    timeSlots: { from: "11:00", to: "23:00", stepMinutes: 15 },
    message: "Agenda, food & drink, special requests.",
    submit: "Enquire",
    sending: "Sending…",
    done: "Thanks — we'll be in touch soon.",
  },
};
