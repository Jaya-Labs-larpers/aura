import type { Metadata } from "next";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { Section } from "@/components/sections/Bands";
import { PageHero } from "@/components/sections/PageHero";
import { SocialIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_PAGE } from "@/content/pages";
import { CONTACT, HOURS, SOCIALS } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero {...CONTACT_PAGE.hero} />
      <Section>
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <Label>Address</Label>
              <address className="font-display text-2xl leading-snug not-italic">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a href={CONTACT.googleMaps} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">
                Open in Google Maps
              </a>
            </Reveal>
            <Reveal delay={80}>
              <Label>Phone & Email</Label>
              <p className="space-y-1 text-[15px]">
                <a href={CONTACT.phoneHref} className="block">
                  {CONTACT.phone}
                </a>
                <span className="block">{CONTACT.phoneAlt}</span>
                <a href={`mailto:${CONTACT.email}`} className="block">
                  {CONTACT.email}
                </a>
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Label>Hours</Label>
              <p className="text-[15px]">
                {HOURS[0].label}: {HOURS[0].value}
              </p>
            </Reveal>
            <Reveal delay={240} className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-jungle"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
      <Reveal variant="clip" className="bg-jungle px-3 pb-3 md:px-6 md:pb-6">
        <Placeholder slot={{ label: "Map embed · 14 St 308, Tonle Bassac" }} className="h-[50svh] w-full bg-moss text-cream" />
      </Reveal>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">{children}</h2>;
}
