import type { Slot } from "./types";

/** Copy and options for the reservation overlay (`<ReservationOverlay>`). */
export const RESERVATION = {
  hero: { label: "Spiral staircase to the rooftop bar at night", photo: "site/rooftop-bar-spiral-staircase-night.jpg" } satisfies Slot,
  eyebrow: "Reservations",
  title: "Reserve your table",
  text: "Tell us the space, the date and the party size. Our host will confirm by email.",
  spaces: [
    { value: "indoor", label: "Indoor" },
    { value: "outdoor", label: "Outdoor" },
  ],
} as const;
