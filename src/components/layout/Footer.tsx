import Link from "next/link";
import { CONTACT, HOURS, NAV, RESERVE, SITE, SOCIALS } from "@/content/site";
import { Pill } from "@/components/ui/Buttons";
import { SocialIcon } from "@/components/ui/Icons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Footer sits on the same glaze ground as "Why AURA" (Story), with tonal
 * leaves at the edges and a leaf watermark centered behind the four columns.
 * Sits above Location (sticky) in z-order so it slides up over that photo as
 * the page reaches bottom.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 flex min-h-dvh flex-col justify-center overflow-hidden bg-glaze text-ink md:min-h-0 md:flex-1">
      <LeafTone clear="radial-gradient(ellipse 52% 62% at 50% 46%, transparent 35%, #000 92%)" />
      <PlateLeaf
        sizes="42vmin"
        className="absolute top-1/2 left-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 opacity-45 mix-blend-multiply"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 pt-20 pb-10 md:px-8 md:pt-24">
        <div className="grid justify-items-center gap-14 text-center md:grid-cols-[1.1fr_1fr_1fr_1.1fr] md:justify-items-start md:gap-10 md:text-left">
          <Reveal>
            <p className="max-w-[26ch] font-display text-lg text-rim italic">{SITE.footerLine}</p>
            <Pill href={RESERVE.href} tone="dark" className="mt-7">
              {RESERVE.label}
            </Pill>
          </Reveal>

          <Reveal delay={80} className="text-sm">
            <FooterHeading>Visit</FooterHeading>
            <address className="not-italic">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={CONTACT.googleMaps} target="_blank" rel="noreferrer" className="mt-3 inline-block underline underline-offset-4">
              Directions
            </a>
          </Reveal>

          <Reveal delay={160} className="text-sm">
            <FooterHeading>Hours</FooterHeading>
            <dl className="space-y-2">
              {HOURS.map((row) => (
                <div key={row.label}>
                  <dt className="opacity-60">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={240} className="text-sm">
            <FooterHeading>Contact</FooterHeading>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="break-all">
                {CONTACT.email}
              </a>
            </p>
            <p>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
            <p>{CONTACT.phoneAlt}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-glaze"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}, {SITE.location}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-[11px] font-semibold tracking-[0.28em] uppercase opacity-70">{children}</h2>;
}
