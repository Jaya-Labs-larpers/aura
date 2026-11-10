"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { ENQUIRE_ID } from "@/components/features/events/EventActions";
import { Field, INPUT, Notice, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";
import { Eyebrow } from "@/components/ui/Buttons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";

interface EventEnquiryProps {
  eyebrow: string;
  title: string;
  text: string;
  types: readonly string[];
  spaces: readonly { value: string; label: string }[];
  defaultGuests: number;
  message: string;
  submit: string;
  sending: string;
  done: string;
}

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// The visitor's date; the server snapshot is empty so the static HTML never bakes in the build date.
const noop = () => () => {};
const todaySnapshot = () => isoDate(new Date());

const TYPE_PILL =
  "inline-flex h-9 sm:h-11 cursor-pointer items-center rounded-full border border-ink/30 px-4 sm:px-5 text-[12px] sm:text-[13px] font-medium tracking-wide transition-colors duration-500 ease-out-expo hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-glaze has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-bloom";

// Native date/time pickers read the card's own ground, not the page's dark default.
const INPUT_LIGHT = INPUT.replace("[color-scheme:dark]", "[color-scheme:light]");

// Smaller at mobile widths so date/start/end sit three-across without crowding.
const INPUT_LIGHT_COMPACT = INPUT_LIGHT.replace("text-[15px]", "text-[13px] sm:text-[15px]");

/**
 * Event enquiry form on the Events page, in a card on the same glaze ground
 * and leaf motif as the footer. Fields follow CÉ LA VI's private events form.
 * Static like the rest of the page: no scroll reveals.
 */
export function EventEnquiry({
  eyebrow,
  title,
  text,
  types,
  spaces,
  defaultGuests,
  message,
  submit,
  sending,
  done,
}: EventEnquiryProps) {
  const today = useSyncExternalStore(noop, todaySnapshot, () => "");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSent(false);
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setSent(true);
      form.reset();
      setDate("");
    });
  };

  return (
    <section id={ENQUIRE_ID} className="scroll-mt-20 px-3 py-10 sm:py-14 md:px-6 md:py-16">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-glaze px-5 py-5 text-ink ring-1 ring-ink/10 sm:px-8 sm:py-8 md:px-12 md:py-10">
        <LeafTone clear="radial-gradient(ellipse 60% 68% at 50% 46%, transparent 35%, #000 94%)" />
        <PlateLeaf
          sizes="34vmin"
          className="absolute top-1/2 left-1/2 h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-multiply"
        />
        <div className="relative">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-1 font-display text-2xl leading-[1.1] sm:mt-2 sm:text-3xl md:text-4xl">{title}</h2>
          <p className="mt-1 text-[14px] opacity-70 sm:mt-2 sm:text-[15px]">{text}</p>

          <form onSubmit={onSubmit} className="mt-4 space-y-3 sm:mt-7 sm:space-y-5">
            {sent && <Notice variant="light">{done}</Notice>}

            <fieldset>
              <legend className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">Type of event</legend>
              <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5">
                {types.map((type) => (
                  <label key={type} className={TYPE_PILL}>
                    <input type="radio" name="type" value={type} required className="sr-only" />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-4 sm:gap-7">
              <Field label="First name">
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  placeholder="First name"
                  className={INPUT_LIGHT}
                />
              </Field>
              <Field label="Last name">
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  placeholder="Last name"
                  className={INPUT_LIGHT}
                />
              </Field>
              <Field label="Email address">
                <input type="email" name="email" autoComplete="email" required placeholder="Your email" className={INPUT_LIGHT} />
              </Field>
              <Field label="Phone number">
                <input type="tel" name="phone" autoComplete="tel" required placeholder="+855" className={INPUT_LIGHT} />
              </Field>
            </div>

            <Field label="Company name (optional)">
              <input type="text" name="company" autoComplete="organization" placeholder="Company name" className={INPUT_LIGHT} />
            </Field>

            <div className="grid grid-cols-[2fr_1fr] gap-4 sm:gap-7">
              <Field label="Choose the space">
                <select name="space" required defaultValue="" className={INPUT_LIGHT}>
                  <option value="" disabled className="bg-glaze">
                    Select
                  </option>
                  {spaces.map((space) => (
                    <option key={space.value} value={space.value} className="bg-glaze">
                      {space.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Guests">
                <input type="number" name="guests" min={1} required defaultValue={defaultGuests} className={INPUT_LIGHT} />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-7">
              <Field label="Date">
                <input
                  type="date"
                  name="date"
                  required
                  value={date || today}
                  min={today || undefined}
                  onChange={(event) => setDate(event.target.value)}
                  className={INPUT_LIGHT_COMPACT}
                />
              </Field>
              <Field label="Start time">
                <input type="time" name="start" required className={INPUT_LIGHT_COMPACT} />
              </Field>
              <Field label="End time">
                <input type="time" name="end" required className={INPUT_LIGHT_COMPACT} />
              </Field>
            </div>

            <Field label="Message">
              <textarea name="message" rows={1} placeholder={message} className={INPUT_LIGHT} />
            </Field>

            <SubmitButton loading={loading} idle={submit} busy={sending} variant="light" />
          </form>
        </div>
      </div>
    </section>
  );
}
