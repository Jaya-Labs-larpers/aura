import { SITE } from "@/content/site";
import type { Link } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { Reveal, RevealText } from "@/components/ui/Reveal";

interface StoryProps {
  eyebrow: string;
  lead: string;
  body: string;
  award: Link;
}

export function Story({ eyebrow, lead, body, award }: StoryProps) {
  const rating = SITE.rating;
  return (
    // The glaze panel sits inside a band of the green ground, so both leaf patterns show where they meet.
    <section id="credentials" className="scroll-mt-20 py-8 md:py-12">
      <div className="relative overflow-hidden bg-glaze px-6 pt-48 pb-20 text-ink md:px-12 md:pt-56 md:pb-28 xl:pt-28">
        <LeafTone clear="radial-gradient(ellipse 60% 75% at 50% 58%, transparent 45%, #000 100%)" />
        {/* Below xl the leaf sits whole in the space above the copy; on wide screens it moves to the clear gutter. */}
        <PlateLeaf
          sizes="(min-width: 1280px) min(22vw, 380px), (min-width: 768px) 220px, 160px"
          className="absolute top-8 right-6 h-auto w-40 rotate-[-14deg] opacity-40 mix-blend-multiply md:top-10 md:right-12 md:w-[220px] xl:top-10 xl:-right-[8vw] xl:w-[min(22vw,380px)] xl:opacity-35"
        />
        <div className="relative mx-auto max-w-2xl">
          <Reveal variant="fade">
            <Eyebrow className="text-ink/60">{eyebrow}</Eyebrow>
          </Reveal>
          <RevealText
            text={lead}
            className="mt-4 font-display text-3xl leading-[1.15] md:text-5xl"
          />
          <Reveal delay={400} className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
            <p>{body}</p>
          </Reveal>
          <Reveal delay={500} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm opacity-80">
            {rating.score && rating.reviews && (
              <a href={rating.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                ★ {rating.score} {rating.source}
              </a>
            )}
            <a href={award.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              {award.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
