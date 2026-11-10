import type { Link } from "./types";

/** Brand, navigation and contact details used across every page. */
export const SITE = {
  name: "AURA",
  location: "Phnom Penh",
  tagline: "Rooftop garden dining above Bassac Lane",
  description:
    "Elevated rooftop dining above Bassac Lane, showcasing artisanal mixology and charcoal-grilled Kampong Chhnang grass-fed Wagyu with exceptional service.",
  logo: "/images/brand/aura-logo.png",
  favicon: "/images/brand/aura-logo-favicon.jpg",
  footerLine: "Rooftop garden dining above Bassac Lane — charcoal-grilled Wagyu, artisanal cocktails, Phnom Penh at your feet.",
  // TODO before push: re-check the live score/review count on AURA's Google profile.
  // Figure below is Glenn's audit number, not independently verified this round.
  // The strip only renders once these are filled in.
  rating: {
    score: "4.7",
    reviews: "998",
    source: "Google",
    href: "https://maps.app.goo.gl/NYRN24Ri7BGRSwZ6A",
  },
} as const;

export const NAV: Link[] = [
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export const RESERVE: Link = { href: "/reservation", label: "Reservations" };

export const CONTACT = {
  addressLines: ["14 St 308, Tonle Bassac", "Chamkar Mon, Phnom Penh"],
  // The same address split into fields, for search engines (schema.org PostalAddress).
  postal: {
    streetAddress: "14 St 308, Tonle Bassac, Chamkar Mon",
    addressLocality: "Phnom Penh",
    postalCode: "120101",
    addressCountry: "KH",
  },
  phone: "+855 92 663 389",
  phoneAlt: "+855 98 663 389",
  phoneHref: "tel:+85592663389",
  email: "sales@auracambodia.asia",
  googleMaps: "https://maps.app.goo.gl/NYRN24Ri7BGRSwZ6A",
} as const;

export const HOURS = [
  { label: "Monday – Sunday", value: "11:30 AM – 01:00 AM" },
  { label: "Lunch", value: "11:30 AM – 03:30 PM" },
  { label: "Dinner", value: "05:00 PM – 10:00 PM" },
] as const;

export type SocialIcon = "facebook" | "instagram" | "tiktok" | "whatsapp" | "telegram" | "linkedin";

export const SOCIALS: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "Instagram", href: "https://www.instagram.com/aura_phnompenh_/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/Aura.PhnomPenh/", icon: "facebook" },
  { label: "TikTok", href: "https://www.tiktok.com/@aura.phnompenh", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/85598663389", icon: "whatsapp" },
  { label: "Telegram", href: "https://t.me/auraphnompenh", icon: "telegram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/104087124/", icon: "linkedin" },
];
