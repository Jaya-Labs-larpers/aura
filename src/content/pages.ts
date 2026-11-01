import type { Feature, PageHero, Slot } from "./types";

export const ABOUT = {
  hero: {
    eyebrow: "About",
    title: "Our Story",
    text: "A rooftop garden restaurant and lounge in the heart of Bassac Lane.",
    slot: { label: "About hero", photo: "site/where-it-all-began.jpg" },
  } satisfies PageHero,
  mission: {
    eyebrow: "Our Mission",
    title: "An unforgettable experience, second to none",
    text: "Connecting families and friends so you can celebrate and enjoy life's moments.",
  },
  features: [
    {
      eyebrow: "Our History",
      title: "Where it all began",
      body: [
        "AURA Phnom Penh first opened its doors in December 2023.",
        "Located in the vibrant Bassac Lane neighbourhood, the multi-level rooftop venue established itself as a premier restaurant and lounge known for its refined atmosphere, international charcoal-grilled cuisine and curated signature cocktails.",
      ],
      slot: { label: "History", photo: "site/where-it-all-began.jpg" },
    },
    {
      eyebrow: "Our Standards",
      title: "Our Philosophy",
      body: [
        "Exceptional cuisine begins with exceptional ingredients. Our relationships with local farms, artisan producers and sustainable fisheries ensure every plate showcases the finest seasonal offerings.",
        "Our culinary team approaches each dish as a canvas, balancing flavours, textures and visual appeal to engage all the senses.",
      ],
      slot: { label: "Philosophy", photo: "site/our-philosophy.jpg" },
    },
  ] satisfies Feature[],
  values: [
    {
      title: "Sustainable Sourcing",
      text: "We partner with local farms and sustainable suppliers, so our ingredients are fresh, ethical and environmentally responsible.",
    },
    {
      title: "Expert Team",
      text: "Our culinary and service teams bring decades of combined experience from some of the world's most prestigious kitchens.",
    },
    {
      title: "Open Late",
      text: "Lunch, dinner and late-night lounge service, every day of the week until 1 AM.",
    },
  ],
};

export const MENU_PAGE = {
  hero: {
    eyebrow: "Menu",
    title: "Our Menus",
    text: "Seasonal ingredients, charcoal fire and crafted cocktails — à la carte, sharing platters and the bar.",
    slot: { label: "Menu hero", photo: "site/welcome-experience-1.webp" },
  } satisfies PageHero,
};

export const EVENTS = {
  hero: {
    eyebrow: "Events",
    title: "Celebrate at AURA",
    text: "From intimate gatherings to exclusive celebrations, tailored to your moment.",
    slot: { label: "Events hero", photo: "venue/16-venue-image.jpg" },
  } satisfies PageHero,
  features: [
    {
      eyebrow: "Up to 120 guests",
      title: "Private Dining",
      body: [
        "For a birthday, anniversary, business lunch or cocktail event, AURA's private dining spaces offer a comfortable, well-appointed setting.",
        "Our team arranges menu selections, beverage pairings, seating, lighting and decoration to suit your occasion. AURA is also available for exclusive use for weddings and corporate events.",
      ],
      slot: { label: "Private dining", photo: "site/private-dining.jpg" },
      cta: { label: "Enquire", href: "/contact" },
    },
    {
      eyebrow: "At your venue",
      title: "Event Catering",
      body: [
        "AURA offers off-site catering at your home or a venue of your choice.",
        "Our kitchen and service team bring the same standard of food and service found at the restaurant, for a well-organised and enjoyable event.",
      ],
      slot: { label: "Event catering", photo: "site/event-catering.jpg" },
      cta: { label: "Enquire", href: "/contact" },
    },
  ] satisfies Feature[],
  strip: [
    { label: "Buffet service", photo: "events/01-meeting-and-event.jpg" },
    { label: "Flambé station", photo: "events/33-meeting-and-event.jpg" },
    { label: "Chef carving", photo: "events/34-meeting-and-event.jpg" },
    { label: "Celebration toast", photo: "events/39-meeting-and-event.jpg" },
    { label: "Balloon arch table", photo: "venue/24-venue-image.jpg" },
    { label: "Candlelit long table", photo: "venue/22-venue-image.jpg" },
  ] satisfies Slot[],
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
