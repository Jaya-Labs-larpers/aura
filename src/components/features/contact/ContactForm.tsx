"use client";

import { useState, type FormEvent } from "react";
import { Field, INPUT, Notice, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";

export function ContactForm() {
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
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {sent && <Notice>Thank you — your message has been sent. We&apos;ll be in touch soon.</Notice>}
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Name">
          <input type="text" name="name" autoComplete="name" required placeholder="Your name" className={INPUT} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" className={INPUT} />
        </Field>
      </div>
      <Field label="Subject">
        <input type="text" name="subject" required placeholder="What is this regarding?" className={INPUT} />
      </Field>
      <Field label="Message">
        <textarea name="message" rows={5} required placeholder="Your message…" className={INPUT} />
      </Field>
      <SubmitButton loading={loading} idle="Send message" busy="Sending…" />
    </form>
  );
}
