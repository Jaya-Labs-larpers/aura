import type { Metadata } from "next";
import { BookingForm } from "@/components/features/reservation/BookingForm";
import { CheckStatus } from "@/components/features/reservation/CheckStatus";
import { Eyebrow } from "@/components/ui/Buttons";
import { Placeholder, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { RESERVATION } from "@/content/pages";
import { CONTACT, HOURS } from "@/content/site";

export const metadata: Metadata = { title: "Reservations" };

/** Split screen: pinned media panel on the left, booking on the right. */
export default function ReservationPage() {
  return (
    <div className="grid bg-jungle text-cream lg:grid-cols-2">
      <div className="relative h-[60svh] lg:sticky lg:top-0 lg:h-svh">
        <Placeholder slot={RESERVATION.slot} bare className="h-full w-full bg-moss" />
        <SlotCaption slot={RESERVATION.slot} className="absolute top-24 left-5 z-10 items-start md:top-28 md:left-12" />
        <div className="absolute inset-0 bg-linear-to-t from-jungle via-jungle/30 to-jungle/60" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <Reveal variant="fade">
            <Eyebrow>Reservations</Eyebrow>
          </Reveal>
          <RevealText as="h1" text={RESERVATION.title} delay={150} className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl" />
        </div>
      </div>

      <div className="px-5 pt-16 pb-28 md:px-12 lg:pt-36">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <p className="text-[15px] leading-relaxed opacity-80">{RESERVATION.text}</p>
          </Reveal>
          <Reveal delay={150} className="mt-12">
            <BookingForm />
          </Reveal>

          <Reveal className="mt-16 border-t border-cream/15 pt-10">
            <CheckStatus />
          </Reveal>

          <div className="mt-16 grid gap-10 border-t border-cream/15 pt-10 sm:grid-cols-2">
            <Reveal>
              <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">Hours</h2>
              <dl className="mt-4 space-y-2 text-sm">
                {HOURS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="opacity-65">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={CONTACT.phoneHref} className="mt-5 inline-block text-sm underline underline-offset-4">
                {CONTACT.phone}
              </a>
            </Reveal>
            <div className="space-y-6">
              {RESERVATION.policies.map((policy, i) => (
                <Reveal key={policy.title} delay={i * 80}>
                  <h2 className="font-display text-xl">{policy.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed opacity-70">{policy.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
