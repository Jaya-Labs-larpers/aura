import type { Feature, PageHero, Slot } from "./types";

export const ABOUT = {
  hero: {
    eyebrow: "About",
    title: "Our Story",
    text: "A rooftop garden restaurant and lounge in the heart of Bassac Lane.",
    slot: { label: "About hero", photo: "site/where-it-all-began.jpg" },
  } satisfies PageHero,
  // Copy and section order from the AURA Wagyu story one-pager (AURA_Menu_Combined_v14.pdf, page 1).
  // Its four photos are all marked "placeholder image" in the source, so no `photo` is set here yet.
  beef: {
    eyebrow: "Our Beef",
    title: "Discover Khmer Wagyu, from pasture to plate",
    text: "All our beef is raised on a single specialist farm in the lowlands of Kampong Chhnang, the first producer of Cambodia-bred Wagyu. Patiently aged, precision-cut and prepared with pride, every steak is a masterclass in local Khmer heritage.",
  },
  beefFeatures: [
    {
      eyebrow: "I · The Origin",
      title: "Quality begins on the pasture",
      body: [
        "The cattle roam open pasture for two years, grazing on grass enriched with corn, cassava and rice bran. A year or more of grain finishing follows, with molasses in the daily feed, until the marbling is fine, even and wonderfully full of flavour.",
      ],
      slot: { label: "Our own herd on the Kampong Chhnang pasture" },
    },
    {
      eyebrow: "II · The Evolution",
      title: "Carefully aged and expertly cut",
      body: [
        "After harvest, each carcass rests for at least 14 days while time deepens its flavour and tenderness. Every steak is then cut by hand and trimmed to the right weight and thickness for its character, before it meets our glowing charcoal grill.",
      ],
      slot: { label: "Our butcher at work, or the herd in the stables" },
    },
    {
      eyebrow: "III · The Craft",
      title: "Seared over Cambodian charcoal",
      body: [
        "Every steak meets the intense heat of locally sourced charcoal, which builds a deep, caramelised crust and a gentle smokiness. We keep it simple, so the true character of the beef shines through clearly on every plate we serve at AURA.",
      ],
      slot: { label: "A Khmer Wagyu cut over our charcoal grill" },
    },
    {
      eyebrow: "IV · The Destination",
      title: "A place at the table",
      body: [
        "Every cut on our menu has its own texture and depth of flavour, from lean and delicate to bold and generous. Tell us how you like your steak, and our team will gladly suggest the right cut for you to enjoy with us here at AURA tonight.",
      ],
      slot: { label: "A finished AURA steak, served at the table" },
    },
  ] satisfies Feature[],
};

export const MENU_PAGE = {
  hero: {
    eyebrow: "Menu",
    title: "Our Menus",
    text: "Seasonal ingredients, charcoal fire and crafted cocktails — à la carte, sharing platters and the bar.",
    slot: { label: "Menu hero", photo: "site/welcome-experience-1.webp" },
  } satisfies PageHero,
};

export const GALLERY_PAGE = {
  hero: {
    eyebrow: "Gallery",
    title: "Moments at AURA",
    slot: { label: "Gallery hero", photo: "venue/11-venue-image.jpg" },
  } satisfies PageHero,
};

export const TEAM = {
  hero: {
    eyebrow: "Team",
    title: "The People of AURA",
    text: "The professionals who bring AURA's culinary vision to life every day.",
    slot: { label: "Team hero", photo: "site/heart-of-the-house.jpg" },
  } satisfies PageHero,
  features: [
    {
      eyebrow: "Executive Chef",
      title: "Chef Dun Sophol",
      body: [
        "Chef Dun Sophol leads the kitchen at AURA, bringing experience in both Khmer and Western cuisine.",
        "His menu balances traditional Cambodian dishes and international favourites, with a focus on locally sourced steak prepared to a high standard.",
      ],
      slot: { label: "Chef portrait", photo: "site/chef-dun-sophol.jpg" },
    },
    {
      eyebrow: "The Culinary Team",
      title: "Heart of the House",
      body: [
        "Cambodian cuisine is a living heritage, not a relic of nostalgia. Our chefs, trained in traditional Khmer kitchens and international fine dining, reimagine amok, lok lak and saraman for the modern table.",
        "Long before guests arrive, the team is sourcing at dawn and refining every sauce and plate — for a table of two or a gala of two hundred.",
      ],
      slot: { label: "Kitchen team", photo: "site/heart-of-the-house.jpg" },
    },
    {
      eyebrow: "Host, Service & Bar",
      title: "Front of House",
      body: [
        "If the kitchen is AURA's heart, the front-of-house team is its voice — trained in authentic Khmer hospitality and international service standards.",
        "From mixologists crafting signature cocktails to a full house on a Friday evening, hospitality that feels effortless.",
      ],
      slot: { label: "Service team", photo: "events/38-meeting-and-event.jpg" },
    },
  ] satisfies Feature[],
  join: {
    title: "Join Our Team",
    text: "We're always looking for talented people who share our passion for hospitality.",
  },
};

export const RESERVATION = {
  title: "Reserve Your Table",
  text: "Book online for lunch, dinner or late-night drinks. Groups larger than 8, please call us directly.",
  slot: { label: "Reservation panel", photo: "venue/12-venue-image.jpg" } satisfies Slot,
  policies: [
    { title: "Party Size", text: "We welcome parties from 1 to 120 guests. For groups larger than 8, please contact us directly." },
    { title: "Cancellation", text: "Please give at least 24 hours' notice. Same-day cancellations may incur a fee." },
    { title: "Special Requests", text: "Dietary needs, allergies and occasions — note them in the form and we'll prepare." },
  ],
};

export const CONTACT_PAGE = {
  hero: {
    eyebrow: "Contact",
    title: "Get in Touch",
    text: "Questions, feedback or special requests — our team is here to help.",
    slot: { label: "Contact hero", photo: "venue/02-venue-image.jpg" },
  } satisfies PageHero,
};
