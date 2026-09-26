import Link from "next/link";
import { CONTACT, HOURS, NAV, RESERVE, SITE, SOCIALS } from "@/content/site";
import { SocialIcon } from "@/components/ui/Icons";
import { Reveal, RevealText } from "@/components/ui/Reveal";

/** Sand footer with a faint leaf pattern, echoing AURA's leaf-print plates. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-sand text-ink">
      <LeafPattern />
      <div className="relative mx-auto max-w-[1600px] px-5 pt-24 pb-10 md:px-8">
        <RevealText
          as="p"
          text={SITE.footerLine}
          className="mx-auto max-w-3xl text-center font-display text-3xl leading-tight md:text-5xl"
        />

        <div className="mt-20 grid gap-12 border-t border-ink/15 pt-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
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

          <Reveal delay={80}>
            <FooterHeading>Find Us</FooterHeading>
            <address className="not-italic">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={CONTACT.googleMaps} target="_blank" rel="noreferrer" className="mt-3 inline-block underline underline-offset-4">
              Google Maps
            </a>
          </Reveal>

          <Reveal delay={160}>
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-2">
              <li>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>{CONTACT.phoneAlt}</li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="break-all">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <FooterHeading>Follow</FooterHeading>
            <ul className="flex flex-wrap gap-3">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-sand"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {[...NAV, RESERVE].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            © {year} {SITE.name} {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-[11px] font-semibold tracking-[0.28em] uppercase">{children}</h2>;
}

function LeafPattern() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.05]" aria-hidden="true">
      <defs>
        <pattern id="leaf" width="140" height="140" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path
            d="M70 12c26 18 34 46 0 116C36 58 44 30 70 12Zm0 0v116M70 44l-18-12M70 44l18-12M70 70l-24-14M70 70l24-14M70 96l-20-12M70 96l20-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf)" />
    </svg>
  );
}
