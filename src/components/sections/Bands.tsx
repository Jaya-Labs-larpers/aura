import type { ReactNode } from "react";
import type { Link, Slot } from "@/content/types";
import { RESERVE, SOCIALS } from "@/content/site";
import { Pill, TextLink } from "@/components/ui/Buttons";
import { SocialIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Tone = "jungle" | "forest" | "ivory";

const TONES: Record<Tone, string> = {
  jungle: "bg-jungle text-cream",
  forest: "bg-forest text-cream",
  ivory: "bg-ivory text-ink",
};

/** Page section with consistent vertical rhythm and a colour tone. */
export function Section({
  tone = "jungle",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return <section className={cn("px-5 py-24 md:px-8 md:py-36", TONES[tone], className)}>{children}</section>;
}

/** Thin ivory band with a small badge and a line of recognition. */
export function AwardBand({ title, text, slot }: { title: string; text: string; slot: Slot }) {
  return (
    <section className="bg-ivory px-5 py-14 text-ink md:px-8">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Photo slot={slot} sizes="80px" fit="contain" bare className="h-20 w-20 shrink-0 rounded-full" />
        <div>
          <p className="font-display text-2xl md:text-3xl">{title}</p>
          <p className="mt-1 text-sm opacity-70">{text}</p>
        </div>
      </Reveal>
    </section>
  );
}

/** Closing call to action, repeated at the end of inner pages. */
export function CtaBand({
  title = "Reserve your table",
  text,
  cta = RESERVE,
}: {
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Section tone="forest" className="text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <RevealText text={title} className="font-display text-4xl leading-[1.1] md:text-6xl" />
        {text && (
          <Reveal delay={200}>
            <p className="mt-5 text-[15px] opacity-80">{text}</p>
          </Reveal>
        )}
        <Reveal delay={350} className="mt-9">
          <Pill href={cta.href}>{cta.label}</Pill>
        </Reveal>
      </div>
    </Section>
  );
}

/** Compact reservation card on the green ground: the last ask before the footer. */
export function ReserveCard({ title }: { title: string }) {
  const wa = SOCIALS.find((s) => s.icon === "whatsapp")!;
  const tg = SOCIALS.find((s) => s.icon === "telegram")!;
  return (
    <section id="reserve" className="scroll-mt-20 px-6 py-16 text-center text-cream md:px-12 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <RevealText text={title} className="font-display text-4xl leading-[1.1] md:text-5xl" />
        <Reveal delay={300} className="mt-7 grid w-full max-w-sm grid-cols-2 gap-2.5 md:w-auto md:max-w-none md:flex md:flex-nowrap">
          <Pill href={RESERVE.href} className="col-span-2 md:col-span-1">
            {RESERVE.label}
          </Pill>
          <Pill tone="outline" href={wa.href} className="gap-2">
            <SocialIcon name="whatsapp" />
            {wa.label}
          </Pill>
          <Pill tone="outline" href={tg.href} className="gap-2">
            <SocialIcon name="telegram" />
            {tg.label}
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One-line band linking to the Getting here details. Renders nothing until a
 * link is supplied — see HOME.gettingHere in content/home.ts.
 */
export function GettingHereBand({ link }: { link?: Link }) {
  if (!link) return null;
  return (
    <Section tone="ivory" className="py-10 text-center md:py-10">
      <Reveal>
        <TextLink href={link.href} className="text-base">
          {link.label}
        </TextLink>
      </Reveal>
    </Section>
  );
}
