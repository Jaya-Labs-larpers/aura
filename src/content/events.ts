import type { EventSpace, Slot } from "./types";

// Events page, modelled on Amazónico's private dining page: an intro split, one
// full-height split per space (photo slider + text), event catering, then the
// enquiry form. Space copy comes from AURA's corporate events deck (Spaces
// section); the rest of the deck is sales material and stays off the site. Space
// photos are placeholders for now.
const spaces = [
  {
    value: "pavilion",
    title: "AURA Pavilion",
    tags: ["Up to 25", "Air-conditioned", "In-room KTV", "TV"],
    body: [
      "Tucked away from the bustle, this is our principal indoor private space. It can be configured flexibly as a single long table or cabaret-style clusters. It's ideal for intimate business meetings & dinners, private birthday celebrations, client appreciation nights and team farewells.",
    ],
    bestFor: "Business dinners, farewell parties, karaoke nights",
    slides: [
      { label: "The AURA Pavilion dressed for a private celebration, with rose petals and a balloon arch" },
      { label: "A private celebration under way in the AURA Pavilion" },
      { label: "An AURA chef carving at the table during a private celebration in the AURA Pavilion" },
    ],
  },
  {
    value: "terrasse",
    title: "The Terrasse",
    tags: ["Up to 20", "Covered", "Fan-cooled", "Semi-private"],
    body: [
      "Just off the main dining floor, long tables sit beneath an elegant Khmer-timber pergola. Close enough to feel the energy of the restaurant and private enough to hold your own conversation, it's made for client dinners and farewell parties that want atmosphere without the crowd.",
    ],
    bestFor: "Client dinners & team gatherings",
    slides: [
      { label: "Long tables on the Terrasse, beside the glass walls of the AURA Pavilion" },
      { label: "A long candlelit table dressed for a client dinner on the Terrasse" },
      { label: "The Terrasse's long table set for a dinner, with candles and florals" },
    ],
  },
  {
    value: "main-deck",
    title: "The Main Deck",
    tags: ["Up to 60", "Outdoor", "Fan-cooled", "Live band stage"],
    body: [
      "The heart of the AURA atmosphere, our central dining floor wraps around the bar and our live band stage. It's made for bigger occasions like year-end parties, launches and networking nights. Add the AURA Pavilion, the Terrasse, the bar and the Upper Rooftop wings and the whole venue is yours, seating up to 125.",
    ],
    bestFor: "Year-end parties, launches, networking",
    slides: [
      { label: "Guests gathered on the Main Deck during an evening event" },
      { label: "The open-air main dining floor at AURA, beneath the AURA sign" },
      { label: "Guests raising a toast with their host in the band corner during an evening event" },
    ],
  },
  {
    value: "upper-rooftop",
    title: "Upper Rooftop",
    tags: ["Up to 25 each", "Covered", "Fan-cooled", "Private"],
    body: [
      "One floor up, two covered wings sit apart from the bustle of the main floor: private, sheltered and all yours. Take one for a quiet business dinner, or both for a team celebration or brand event. And if the weather turns, they make a sheltered rain plan for smaller open-air events.",
    ],
    bestFor: "Business dinners & private team parties",
    slides: [
      { label: "A covered wing of the Upper Rooftop set for dinner, seen from its open side" },
      { label: "A covered wing of the Upper Rooftop with marble tables under timber louvres" },
      { label: "A wing of the Upper Rooftop set up with a balloon arch for a celebration" },
    ],
  },
] satisfies EventSpace[];

const buyout = {
  value: "whole-venue",
  title: "Whole-venue buyout",
  tags: ["125 seated", "200 standing"],
  text: "The whole rooftop venue. We curate the layout around you.",
};

export const EVENTS = {
  meta: {
    title: "Private Events",
    description:
      "Private dining, celebrations and corporate events at AURA, a rooftop garden restaurant above Bassac Lane in Phnom Penh, for up to 125 seated or 200 standing guests.",
  },
  intro: {
    title: "Events at AURA",
    // Copy and photos carried over from the home page's "Celebrate at AURA" offers
    // (see content/home.ts `offers`).
    body: [
      "Private Events: host your next event above the lane — buffet spreads, open-air seating and the charcoal grill, yours for the night.",
      "VIP Groups: gather your group on the rooftop, with reserved seating, shareable plates and the charcoal grill set up for your whole group.",
      "New Year's Eve: ring in the new year on the rooftop with festive sharing plates and cocktails, among the plants high above Bassac Lane.",
      "Birthday Nights: celebrate your birthday on the rooftop, with balloon arches, a candle-lit plate and a toast around the whole table.",
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
    text: "Every space has unique character.",
    items: spaces,
    buyout,
  },
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
  // Form fields follow CÉ LA VI Singapore's private events enquiry form.
  enquiry: {
    eyebrow: "Event Enquiries",
    title: "Plan your event",
    text: "For event enquiries, please fill in the form below. Our team will reply by email.",
    types: ["Lunch", "Dinner", "Cocktail Reception", "Others"],
    spaces: [...spaces, buyout].map(({ value, title }) => ({ value, label: title })),
    defaultGuests: 10,
    message:
      "Add more information about your event here: agenda, food and beverage preferences and any special requests, so we can understand what your event needs.",
    submit: "Submit",
    sending: "Sending…",
    done: "Thank you — your enquiry has been received. Our team will reply by email.",
  },
};
