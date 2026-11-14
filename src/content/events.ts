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
    tags: [`Up${NBSP}to${NBSP}25`, "Air-conditioned", "KTV", "Presentation screen"],
    body: [
      `Our principal indoor private room, tucked away from the bustle. Set it as one long table or in cabaret-style clusters, with a 75-inch screen for presentations and karaoke for later in the night.`,
    ],
    bestFor: "Private dining, VIP groups, business dinners, intimate celebrations, karaoke nights",
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
      "Long tables under a Khmer-timber pergola, just off the main dining floor, with a direct view of the event stage. Private enough for intimate conversations, and it combines seamlessly with the Main Deck for bigger nights.",
    ],
    bestFor: "Client dinners, team gatherings, happy hours",
    slides: [
      { label: "The Terrasse's long table set for a dinner, with candles and florals", photo: "venue/25-venue-image.jpg" },
      { label: "Long tables on the Terrasse, beside the glass walls of the AURA Pavilion", photo: "spaces/terrasse-long-tables.jpg" },
      { label: "A long candlelit table dressed for a client dinner on the Terrasse", photo: "venue/22-venue-image.jpg" },
    ],
  },
  {
    value: "main-deck",
    title: "The Main Deck",
    tags: [`60${NBSP}seated`, `150${NBSP}standing`, "Semi-covered", "Fan-cooled"],
    body: [
      "The heart of AURA: our central dining floor, wrapped around the bar and the live band stage. It is built for bigger nights, with speeches, awards and music on one floor.",
    ],
    bestFor: "Company parties, product launches, networking events, concerts, buffet dining, happy hours & live music",
    slides: [
      { label: "The open-air main dining floor at AURA, beneath the AURA sign", photo: "spaces/main-deck-open-air-floor.jpg" },
      { label: "Guests raising a toast with their host in the band corner during an evening event", photo: "spaces/main-deck-band-corner-toast.jpg" },
    ],
  },
  {
    value: "upper-rooftop",
    title: "Upper Rooftop",
    tags: [`Up${NBSP}to${NBSP}60${NBSP}(2${NBSP}wings${NBSP}of${NBSP}30)`, "Covered", "Fan-cooled"],
    body: [
      "One floor up, two covered wings sit apart from the main floor. Take one for a quiet business dinner, or both for a team party. If the weather turns, they become the rain plan.",
    ],
    bestFor: "Private groups, intimate business dinners, team parties, banquets, flexible table set-ups",
    slides: [
      { label: "A covered wing of the Upper Rooftop under its timber roof, with rattan lanterns, frangipani trees and planters", photo: "spaces/upper-rooftop-wing-day.jpg" },
      { label: "A covered wing of the Upper Rooftop with marble tables under timber louvres", photo: "spaces/upper-rooftop-wing-louvres.jpg" },
      { label: "A wing of the Upper Rooftop set up with a balloon arch for a celebration", photo: "venue/20-venue-image.jpg" },
    ],
  },
] satisfies EventSpace[];

const buyout = {
  value: "whole-venue",
  title: "The whole venue",
  tags: ["165 seated", "200 standing"],
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

// Title and intro as the client wrote them; the items keep the deck's own
// wording (slide "Event services"), each with the deck's icon.
const included = {
  eyebrow: "Event services",
  title: "Well-equipped to host different event types",
  text: "AURA is set up as a flexible venue with modern infrastructure. Want to go further? Just let us know, we'll gladly arrange it.",
  items: [
    { icon: "wifi", title: "Wi-Fi", text: "Fast connection for all guests" },
    { icon: "screen", title: "Large-size TV screen", text: "75-inch screen, for presentations & videos" },
    { icon: "planner", title: "Event planner", text: "Yours from start to finish" },
    { icon: "sound", title: "Professional sound system", text: `Speakers and a${NBSP}microphone` },
    { icon: "karaoke", title: "Karaoke (KTV)", text: `In the AURA${NBSP}Pavilion` },
    { icon: "camera", title: "Event photography", text: "Shots of the night to keep" },
    { icon: "layout", title: "Layout customisation", text: `Your layout, plus a check-in${NBSP}desk` },
    { icon: "styling", title: "Table styling", text: `Decorative dining${NBSP}setting` },
    { icon: "menus", title: "Menus & name cards", text: "Personalised for each guest" },
    { icon: "signage", title: "Logo signage", text: `Your logo at${NBSP}the${NBSP}entrance` },
    { icon: "lighting", title: "Branded lighting", text: `The venue lit in${NBSP}your${NBSP}colours` },
    { icon: "valet", title: "Valet parking service", text: `A hassle‑free${NBSP}arrival` },
  ] satisfies EventGridItem[],
};

export const EVENTS = {
  meta: {
    title: "Private Events",
    description:
      "Private dining, celebrations and corporate events at AURA, a rooftop garden restaurant above Bassac Lane in Phnom Penh, for up to 165 seated or 200 standing guests.",
  },
  intro: {
    title: "Private Events",
    // DRAFT copy, pending client sign-off (comments 8-10). Lead paragraph in
    // the Zuma / Cé La Vie register, then the flexible-spaces line, then the
    // value proposition that carries the buttons.
    body: [
      `AURA offers unique spaces, perfect for any event. Our private pavilion, covered terrasse, open-air main deck and rooftop wings are the ideal setting for a corporate lunch, brunch, cocktail reception or dinner, in a rooftop garden above Bassac${NBSP}Lane.`,
      `A variety of flexible spaces accommodates any occasion. Whether you are looking for an intimate spot or want to book out the whole venue, we have you covered: from private dinners to 200${NBSP}standing${NBSP}guests.`,
    ],
    valueProp: `Let us know what you have in mind. We customise the menu, layout and set-up around your event, with one planner looking after you from first enquiry to last${NBSP}toast.`,
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
    title: `Plan your event at${NBSP}AURA`,
    columns: {
      details: "Event details",
      yours: "Your details",
      message: "Message",
    },
    guestsLabel: `Group Size (# of${NBSP}Guests)`,
    contactViaLabel: `Where should we contact${NBSP}you`,
    contactLead: `Or call us directly${NBSP}via`,
    typePlaceholder: "e.g. year-end party, client dinner, birthday",
    contactMethods: ["WhatsApp", "Telegram", "Email"],
    defaultGuests: 10,
    timeSlots: { from: "11:00", to: "23:00", stepMinutes: 15 },
    message: `Agenda, food & drink, special${NBSP}requests.`,
    submit: "Send Enquiry",
    sending: "Sending…",
    done: {
      heading: "Enquiry sent",
      nextStep: `We'll contact you via {method} to plan the${NBSP}details.`,
      summaryLabels: {
        date: "Date",
        time: "Start time",
        guests: "Group size",
        type: "Event type",
      },
      again: `Send another${NBSP}enquiry`,
    },
  },
};
