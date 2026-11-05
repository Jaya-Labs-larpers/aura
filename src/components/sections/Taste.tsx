import type { Slot } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealText } from "@/components/ui/Reveal";

interface TasteProps {
  eyebrow: string;
  title: string;
  lead: string;
  slot: Slot;
}

export function Taste({ eyebrow, title, lead, slot }: TasteProps) {
  return (
    // The glaze panel sits inside a band of the green ground, same as the old Story panel it replaces.
    // Fixed to one viewport tall; the photo (a flex/grid sponge, not a fixed aspect ratio) absorbs whatever
    // height copy and tags leave over, so the whole section fits on screen on any device.
    <section id="taste" className="scroll-mt-20 pt-10 pb-10 md:pt-14 md:pb-14">
      <div className="relative flex h-[calc(100dvh-5rem)] flex-col overflow-hidden bg-glaze px-6 py-5 text-ink md:px-10 md:py-7 lg:px-16 lg:py-9">
        <LeafTone clear="radial-gradient(ellipse 60% 75% at 50% 58%, transparent 45%, #000 100%)" />
        <PlateLeaf
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 24vw, 90px"
          className="absolute top-3 right-4 w-[90px] rotate-[-14deg] opacity-40 mix-blend-multiply md:top-6 md:-right-[2%] md:w-[24vw] md:opacity-35 lg:top-2.5 lg:-right-14 lg:w-[20vw]"
        />
        <div className="relative mx-auto grid w-full min-h-0 max-w-[1120px] flex-1 grid-rows-[auto_minmax(0,1fr)] gap-4 lg:grid-cols-[5fr_7fr] lg:grid-rows-1 lg:items-stretch lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-center">
            <Reveal variant="fade">
              <Eyebrow className="text-ink/60">{eyebrow}</Eyebrow>
            </Reveal>
            <RevealText
              text={title}
              className="mt-3 max-w-[13ch] text-balance font-display text-3xl leading-[1.08] md:text-4xl lg:text-5xl"
            />
            <Reveal delay={400} className="mt-3 max-w-md text-[15px] leading-relaxed opacity-80">
              <p>{lead}</p>
            </Reveal>
          </div>

          <figure className="-mx-6 min-h-0 md:-mx-10 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:-mr-16">
            {/* Frameless, edge-to-edge: no radius, no border, bleeds to the panel's edge rather than sitting in an inset card. */}
            <div className="relative h-full min-h-0 w-full overflow-hidden bg-moss">
              <Photo
                slot={slot}
                sizes="(min-width: 1024px) 58vw, 100vw"
                bare
                className="h-full w-full"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
