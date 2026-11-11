import type { Slot } from "./types";

/** Copy and options for the reservation overlay (`<ReservationOverlay>`). */
export const RESERVATION = {
  hero: { label: "Spiral staircase to the rooftop bar at night", photo: "site/rooftop-bar-spiral-staircase-night.jpg" } satisfies Slot,
  eyebrow: "Reservations",
  title: "Reserve your table",
  text: "Pick your space, date and party size. We'll confirm by email.",
  spaceLabel: "Preferred Seating Area",
  spaces: [
    { value: "indoor", label: "Indoor" },
    { value: "outdoor", label: "Outdoor" },
  ],
  contactMethods: ["Mobile", "WhatsApp", "Telegram"],
  dietary: {
    label: "Any dietary restrictions or allergies?",
    detailLabel: "Please list them",
    placeholder: "e.g. nut allergy, vegetarian, no pork",
  },
  submit: "Submit Booking Request",
  sending: "Sending…",
  // Shown in place of the form once a request is sent. The email line is copy only
  // until a booking backend exists (frontend-only site).
  confirmation: {
    eyebrow: "Request received",
    title: "Thank you, we have your request.",
    emailNote: "A copy of your request is on its way to",
    nextStep: "Our host will confirm your table by email within 24 hours.",
    contactNote: "Need it sooner?",
    again: "Make another request",
  },
} as const;
