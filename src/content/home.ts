import type { Card, Feature, Link, Slot } from "./types";

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
      { label: "AURA's rooftop bar among the plants by day", photo: "site/rooftop-bar-day.jpg" },
      { label: "AURA's rooftop garden from above by day, Bassac Lane", photo: "venue-highlights/04.jpg" },
    ] satisfies Slot[],
    ctas: [
      { label: "View Menus", href: "/menu" },
      { label: "Reservation", href: "/reservation" },
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
    { label: "AURA's service team bringing drinks to a guest's table", photo: "events/38-meeting-and-event.jpg", position: "center 40%" },
    { label: "Guests toasting at a private event at AURA", photo: "events/guest-toast.jpg" },
    { label: "AURA chef carving a roast chicken at the table", photo: "site/front-of-house.jpg", position: "center 75%" },
  ] satisfies Slot[],

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
  },
};
