import { SITE } from "@/content/site";
import { Eyebrow } from "@/components/ui/Buttons";
import { PlateLeaf } from "@/components/ui/LeafMotif";
import { Reveal, RevealText } from "@/components/ui/Reveal";

interface StoryProps {
  eyebrow: string;
  lead: string;
  body: string;
  award: string;
}

export function Story({ eyebrow, lead, body, award }: StoryProps) {
  const rating = SITE.rating;
  return (
    <section
      id="credentials"
      className="relative scroll-mt-20 overflow-hidden bg-glaze px-6 pt-48 pb-20 text-ink md:px-12 md:pt-56 md:pb-28 xl:pt-28"
    >
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
            <a href={rating.href} target="_blank" rel="noreferrer" className="hover:underline">
              ★ {rating.score} {rating.source}
            </a>
          )}
          <span>{award}</span>
        </Reveal>
      </div>
    </section>
  );
}
