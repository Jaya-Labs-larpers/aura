import type { Card, Feature, Link, Slot, Taste } from "./types";

export const HOME = {
  meta: {
    title: "AURA | Rooftop restaurant and bar on Bassac Lane, Phnom Penh",
    // Same as the identity card's second line, so Google's snippet matches the page (151 characters).
    description:
      "Perfect for tasteful explorers to discover quality Cambodian culinary heritage with a modern twist and a contemporary rooftop atmosphere in Phnom Penh.",
  },

  hero: {
    eyebrow: "Welcome to AURA",
    title: "AURA Phnom Penh",
    text: "Mekong Modern Rooftop Dining",
    chips: ["Lunch", "Dinner", "Late drinks"],
    // Cross-fades through the slides in order, one slow Ken Burns zoom on each.
    slides: [
      { label: "AURA's rooftop restaurant and bar lit up at night, Bassac Lane", photo: "site/hero-slide-2.jpg" },
      { label: "Aerial view of AURA's rooftop restaurant and bar at night, Bassac Lane", photo: "site/hero-slide-3.jpg" },
      { label: "AURA's rooftop bar among the plants by day", photo: "site/rooftop-bar-day.jpg", zoomOut: true },
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
    cta: { label: "Our story", href: "/about" } satisfies Link,
  },

  cardsHeading: "From lunch to late",
  cards: [
    {
      title: ["Lunch in the", "lounge"],
      slot: { label: "AURA's open-air terrace by day", photo: "venue-highlights/02.jpg" },
      cta: { label: "Reservation", href: "/reservation" },
    },
    {
      title: ["Dinner from", "the grill"],
      slot: { label: "Charcoal-grilled Khmer Wagyu rib-eye", photo: "menu/signature/charcoal-grilled-khmer-wagyu-rib-eye-200g.jpg" },
      cta: { label: "View Menus", href: "/menu" },
    },
    {
      title: ["Late drinks", "at the bar"],
      slot: { label: "AURA's bar lit up at night", photo: "venue-highlights/03.jpg" },
      cta: { label: "View Menus", href: "/menu" },
    },
  ] satisfies Card[],

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
      eyebrow: "Happy Hour",
      title: "Return for happy hour on the lane.",
      body: ["Seasonal pours and chef's specials, Bassac Lane style. Check back for what's on."],
      slot: { label: "Mango colada, AURA signature cocktail", photo: "menu/signature-cocktail/mango-colada.jpg" },
      cta: { label: "View Menus", href: "/menu" },
    },
    {
      eyebrow: "Private Events",
      title: "Host your next event above the lane.",
      body: ["Buffet spreads, open-air seating and the charcoal grill, yours for the night."],
      slot: { label: "AURA's terrace set for a private event by night", photo: "site/event-catering.jpg" },
      cta: { label: "Enquire", href: "/events" },
    },
    {
      eyebrow: "New Year's Eve",
      title: "Ring in the new year on the rooftop.",
      body: ["Festive sharing plates and cocktails, among the plants high above Bassac Lane."],
      slot: { label: "Guests toasting at a festive celebration at AURA", photo: "events/14-meeting-and-event.jpg" },
      cta: { label: "Reserve your table", href: "/reservation" },
    },
    {
      eyebrow: "Birthday Nights",
      title: "Celebrate your birthday on the rooftop.",
      body: ["Balloon arches, a candle-lit plate and a toast around the whole table."],
      slot: { label: "Staff presenting a birthday celebration at AURA", photo: "events/32-meeting-and-event.jpg" },
      cta: { label: "Reserve your table", href: "/reservation" },
    },
  ] satisfies Feature[],

  taste: {
    eyebrow: "Taste",
    title: "Mekong Modern, fired over charcoal.",
    lead: "Our Wagyu is raised on pasture in Kampong Chhnang, grazed slowly for over two years until the marbling runs deep. We grill it over local charcoal, crust crackling, then finish it with a Kampot green peppercorn sauce. Smoke, spice and a Khmer soul in every bite.",
    slot: {
      label: "Charcoal-grilled Khmer Wagyu rib-eye, close-up on the grill char",
      photo: "menu/main-course/charcoal-grilled-local-khmer-wagyu-rib-eye-tek-bror-hok.jpg",
      position: "50% 55%",
    },
  } satisfies Taste,

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
    title: "Above the lane, among the plants.",
    slot: { label: "AURA rooftop at night from above, Bassac Lane", photo: "venue/05-venue-image.jpg" } satisfies Slot,
    cta: { label: "Get directions" } satisfies Omit<Link, "href">,
    // TODO before push: hours conflict — HOURS[0] in site.ts says "11:30 AM – 01:00 AM"
    // but src/app/(classic)/reservation/page.tsx:52 says "11:30 AM – 10:00 PM". AURA to
    // confirm the real closing time; this section uses HOURS[0] until then.
    // TODO before push: AURA to confirm which floor, lift or stairs, and where to
    // enter. Placeholder below is not real.
    gettingUp: "Ground floor, street entrance on St 308.",
  },

  reserve: {
    title: "Reserve your table",
  },
};
