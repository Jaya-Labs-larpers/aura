import type { ReactNode } from "react";
import type { Slot } from "@/content/types";
import { RESERVE } from "@/content/site";
import { Pill } from "@/components/ui/Buttons";
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
  text = "Lunch, dinner or late-night drinks above Bassac Lane.",
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
        <Reveal delay={200}>
          <p className="mt-5 text-[15px] opacity-80">{text}</p>
        </Reveal>
        <Reveal delay={350} className="mt-9">
          <Pill href={cta.href}>{cta.label}</Pill>
        </Reveal>
      </div>
    </Section>
  );
}
