import Image from "next/image";
import { SITE } from "@/content/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { LeafTone } from "@/components/ui/LeafMotif";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Own section between "Celebrate at AURA" and Location, on the site's green
 * ground (same leaf tile + grain as the body, via `.leaf-card`), with a
 * glaze card for the score — same fill and tonal leaf as the footer.
 */
export function TripadvisorBand() {
  const ta = SITE.tripadvisor;
  return (
    <section className="relative overflow-hidden py-12 text-cream md:py-16">
      <Reveal className="relative">
        <a
          href={ta.href}
          target="_blank"
          rel="noreferrer"
          className="group relative flex w-full items-center gap-5 overflow-hidden bg-glaze px-6 py-8 text-ink shadow-[0_4px_24px_rgba(4,32,26,0.35)] transition-colors duration-500 ease-out-expo hover:bg-glaze/90 md:gap-8 md:px-12 md:py-10"
        >
          <LeafTone clear="radial-gradient(ellipse 60% 70% at 50% 50%, transparent 8%, #000 45%)" />
          <Image
            src="/images/badges/tripadvisor-travelers-choice-2026.svg"
            alt={ta.award}
            width={395}
            height={500}
            className="relative h-20 w-auto shrink-0 sm:h-24 md:h-28"
          />
          <span className="relative flex flex-col gap-2">
            <span className="text-[13px] font-medium uppercase tracking-wide text-ink/60">Tripadvisor</span>
            <span className="flex items-baseline gap-2">
              <span className="font-display text-3xl leading-none md:text-4xl">{ta.score}</span>
              <span className="text-[13px] font-medium text-ink/70">{ta.reviews} reviews</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide">
              Read what our customers think
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
