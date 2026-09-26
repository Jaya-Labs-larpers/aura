import type { Card, Link, Slot } from "./types";

export const HOME = {
  hero: {
    eyebrow: "Phnom Penh",
    title: "Welcome to AURA",
    text: "Rooftop garden dining above Bassac Lane",
    // Replace with the hero film once it is shot: loop, 16:9, muted, ≤ 8 MB MP4 + poster.
    slot: { label: "Hero film · 16:9 muted loop", photo: "site/hero-slide-3.jpg" } satisfies Slot,
  },

  intro: {
    eyebrow: "Step inside",
    title: "A garden in the sky, a table for every moment",
    text: "Exceptional culinary artistry, skyline views and crafted cocktails in an unforgettable atmosphere. Refined Khmer heritage and international cuisine, charcoal-grilled and served from lunch to late-night lounge — connecting families and friends so you can celebrate life's moments.",
    ctas: [
      { label: "View Menu", href: "/menu" },
      { label: "Book a Table", href: "/reservation" },
    ] satisfies Link[],
  },

  strip: [
    { label: "Glasshouse greenery", photo: "venue/03-venue-image.jpg" },
    { label: "Sashimi platter", photo: "site/welcome-experience-2.webp" },
    { label: "Leaf-print table setting", photo: "venue/10-venue-image.jpg" },
    { label: "Chef at the carving station", photo: "site/hero-slide-1.jpg" },
    { label: "Cocktail toast", photo: "events/14-meeting-and-event.jpg" },
    { label: "Curtained dining room", photo: "venue/12-venue-image.jpg" },
  ] satisfies Slot[],

  cards: [
    {
      title: "Our Menu",
      text: "Khmer heritage, charcoal-grilled Wagyu and sharing platters, with signature cocktails from the bar.",
      slot: { label: "Menu feature", photo: "site/welcome-experience-1.webp" },
      cta: { label: "Discover", href: "/menu" },
    },
    {
      title: "Events",
      text: "Birthdays, business lunches and weddings — exclusive use for up to 120 guests.",
      slot: { label: "Events feature", photo: "venue/17-venue-image.jpg" },
      cta: { label: "See more", href: "/events" },
    },
    {
      title: "The Venue",
      text: "A multi-level rooftop garden overlooking the Phnom Penh skyline, open-air lounge and indoor dining.",
      slot: { label: "Venue feature", photo: "site/venue-aura-phnom-penh.jpg" },
      cta: { label: "See more", href: "/gallery" },
    },
    {
      title: "Meet Chef Dun Sophol",
      text: "Khmer and Western kitchens in balance, with locally sourced steak prepared to a high standard.",
      slot: { label: "Chef feature", photo: "site/hero-slide-1.jpg" },
      cta: { label: "See more", href: "/team" },
    },
  ] satisfies Card[],

  award: {
    title: "Tripadvisor Travelers' Choice",
    text: "Recognised by guests among the top experiences in Phnom Penh.",
    slot: { label: "Award badge", photo: "site/tripadvisor-travelers-choice.png" } satisfies Slot,
  },
};
