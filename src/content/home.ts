import type { Feature, Link, MediaCard, Slot } from "./types";

export const HOME = {
  meta: {
    title: "AURA | Rooftop restaurant and bar on Bassac Lane, Phnom Penh",
    // Same as the identity card's second line, so Google's snippet matches the page (151 characters).
    description:
      "Perfect for tasteful explorers to discover quality Cambodian culinary heritage with a modern twist and a contemporary rooftop atmosphere in Phnom Penh.",
  },

  hero: {
    eyebrow: "Welcome to AURA",
    title: "Welcome to AURA",
    text: "Mekong Modern Rooftop Dining",
    chips: ["Lunch", "Dinner", "Late drinks"],
    // Cross-fades through the slides in order, one slow Ken Burns zoom on each.
    slides: [
      { label: "AURA's rooftop restaurant and bar lit up at night, Bassac Lane", photo: "site/hero-slide-2.jpg" },
      { label: "Aerial view of AURA's rooftop restaurant and bar at night, Bassac Lane", photo: "site/hero-slide-3.jpg" },
      { label: "AURA's rooftop bar among the plants by day", photo: "site/rooftop-bar-day.jpg", zoomOut: true },
      { label: "View down AURA's rooftop staircase over Phnom Penh at dusk", photo: "site/hero-slide-4.jpg", position: "50% 60%" },
    ] satisfies Slot[],
    ctas: [
      { label: "View Menus", href: "/menu" },
      { label: "Book a Table", href: "/reservation" },
    ] satisfies Link[],
  },

  // Draft copy from the AURA identity slide — needs AURA sign-off before launch.
  identity: {
    title: ["Discover the world of Mekong Modern dining.", "Khmer-rooted, world-open."] as [string, string],
    body: [
      "Made for discerning explorers, AURA is where Cambodia's culinary heritage meets a modern twist. Khmer classics, signature steaks from the charcoal grill and craft cocktails with a local touch, served by a charming team in a warm, contemporary rooftop lounge in the heart of Phnom Penh.",
      // Also the meta description (search snippet).
      "Perfect for tasteful explorers to discover quality Cambodian culinary heritage with a modern twist and a contemporary rooftop atmosphere in Phnom Penh.",
    ],
    cta: { label: "Our Story", href: "/about" } satisfies Link,
  },

  // Outdoor and indoor shots in turn; the two staff shots kept apart.
  strip: [
    { label: "View down AURA's rooftop stairway over Phnom Penh", photo: "site/rooftop-stairway-view.jpg" },
    { label: "AURA's kitchen team in their aprons at the open kitchen", photo: "site/heart-of-the-house.jpg" },
    { label: "AURA's bar lit up after dark", photo: "site/rooftop-bar-night.jpg" },
    { label: "Guests toasting at a private event at AURA", photo: "events/guest-toast.jpg" },
    { label: "Close-up of AURA's chef carving a roast chicken", photo: "site/front-of-house.jpg" },
  ] satisfies Slot[],

  offersHeading: "Celebrate at AURA",
  // Placeholder copy and photos — AURA hasn't confirmed real offer content yet
  // (see docs/home-redesign-handover.md §8). Swap all four in once they do.
  offers: [
    {
      eyebrow: "Private Events",
      title: "Host your next event on the rooftop.",
      body: ["Buffet spreads, open-air seating and the charcoal grill, yours for the night."],
      slot: {
        label: "Guests posing for photos at a private rooftop event at AURA",
        photo: "events/private-event-rooftop-party.jpg",
      },
      cta: { label: "Enquire", href: "/events" },
      cta2: { label: "About Private Events", href: "/events" },
    },
    {
      eyebrow: "VIP Groups",
      title: "Gather your group on the rooftop.",
      body: ["Reserved seating, shareable plates and the charcoal grill, set up for your whole group."],
      slot: {
        label: "Guests celebrating at a private party at AURA",
        photo: "site/private-event-celebration.jpg",
        mobilePosition: "right",
      },
      cta: { label: "Reserve a Group", href: "/events" },
      cta2: { label: "About VIP Groups", href: "/events" },
    },
    {
      eyebrow: "New Year's Eve",
      title: "Ring in the new year on the rooftop.",
      body: ["Festive sharing plates and cocktails, among the plants high above Bassac Lane."],
      slot: { label: "Guests toasting at a festive celebration at AURA", photo: "events/14-meeting-and-event.jpg" },
      cta: { label: "Book Now", href: "/reservation" },
      cta2: { label: "About NYE", href: "/events" },
    },
    {
      eyebrow: "Birthday Nights",
      title: "Celebrate your birthday on the rooftop.",
      body: ["Balloon arches, a candle-lit plate and a toast around the whole table."],
      slot: { label: "Staff presenting a birthday celebration at AURA", photo: "events/32-meeting-and-event.jpg" },
      cta: { label: "Plan Your Birthday", href: "/reservation" },
      cta2: { label: "About Birthday Celebration", href: "/events" },
    },
  ] satisfies Feature[],

  taste: {
    title: "Taste",
    body: [
      "Not only a love letter to Kampong Chhnang Wagyu, but a city of flavour where the Mekong trades stories with the Mediterranean, over charcoal and craft.",
      "Explore our kitchen; fire-grilled Wagyu, hand-shaken cocktails, and a Mekong Modern menu built to share.",
    ],
    cta: { label: "Discover", href: "/menu" },
    slots: [
      {
        label: "Sliced charcoal-grilled Khmer Wagyu tomahawk, fresh off the grill",
        photo: "menu/signature/charcoal-grilled-khmer-wagyu-tomahawk-table.jpg",
        position: "50% 55%",
        title: "Khmer-bred Wagyu, Farm to Flame",
        body: ["Discover Cambodia's first home-bred Wagyu, raised on a specialty farm in Kampong Chhnang province. Patiently aged and seared over local charcoal for buttery, richly marbled steak cuts."],
        cta: { label: "Explore our Steak Menu", href: "/menu#menu-signature" },
      },
      {
        label: "Bartender pouring bitters over a line of signature cocktails in coupe glasses",
        photo: "site/cocktail-pour-coupes.png",
        position: "50% 85%",
        title: "Craft Cocktails with Khmer Soul",
        body: ["Taste our signatures - Khmer heritage with cosmopolitan twist. Poured from local award-winning distilleries with native botanicals like lemongrass and kampot pepper, echoing the spirit of modern Phnom Penh."],
        cta: { label: "Discover our signature Cocktails", href: "/menu#menu-signature-cocktail" },
      },
      {
        label: "Grilled tiger prawns platter with garlic butter, plated rooftop at AURA",
        photo: "menu/signature/grilled-tiger-prawns-platter.jpg",
        position: "58% 50%",
        title: "A Mekong Modern Culinary Experience",
        body: ["Savour Khmer Royal cuisine classics with a modern hand — from fish amok to beef lok lak — paired with a curated selection Pan-Asian specialties. Rooted in Cambodia, open to the world."],
        cta: { label: "See Our Local Specialties", href: "/menu#menu-main-course" },
      },
    ],
  } satisfies MediaCard,

  lunch: {
    title: "Lunch",
    body: [
      "Not only a midday pause, but a table built for business — quick enough for a meeting, complete enough to close on.",
      "Choose à la carte or our curated lunch sets with seasonal specialties, served swiftly at tables made for meeting up.",
    ],
    // TODO: point at the lunch section once AURA sends the lunch menu (none in menu.json yet).
    cta: { label: "See Our Lunch Menu", href: "/menu" },
    slots: [
      { label: "AURA's open-air terrace set for a daytime lunch", photo: "site/lunch-lounge-table-setting.webp" },
    ],
  } satisfies MediaCard,

  story: {
    eyebrow: "Why AURA",
    lead: "Rooftop garden dining above Bassac Lane.",
    body: "An open-air lounge among the plants, built around the charcoal grill: Kampong Chhnang Wagyu, Fish Amok and Saraman.",
    award: {
      label: "Tripadvisor Travelers' Choice",
      href: "https://www.tripadvisor.com/Restaurant_Review-g293940-d27106416-Reviews-AURA_Phnom_Penh-Phnom_Penh.html",
    } satisfies Link,
  },

  location: {
    eyebrow: "Bassac Lane",
    title: "Above Bassac Lane, among the plants.",
    slot: {
      label: "AURA storefront on Bassac Lane, street view with signage",
      photo: "site/exterior-storefront-street.jpg",
      position: "62% 50%",
    } satisfies Slot,
    cta: { label: "Get directions" } satisfies Omit<Link, "href">,
    // TODO before push: hours conflict — HOURS[0] in site.ts says "11:30 AM – 01:00 AM"
    // but src/app/(classic)/reservation/page.tsx:52 says "11:30 AM – 10:00 PM". AURA to
    // confirm the real closing time; this section uses HOURS[0] until then.
    // TODO before push: AURA to confirm which floor, lift or stairs, and where to
    // enter. Placeholder below is not real.
    gettingUp: "Ground floor, street entrance on St 308.",
  },

  reserve: {
    title: "Plan Your AURA Experience",
  },
};
