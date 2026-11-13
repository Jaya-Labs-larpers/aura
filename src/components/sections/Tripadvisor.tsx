import { SITE } from "@/content/site";
import { ArrowIcon, TripadvisorIcon } from "@/components/ui/Icons";
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
          className="group relative flex w-full flex-col items-center gap-4 overflow-hidden bg-glaze px-6 py-10 text-ink shadow-[0_4px_24px_rgba(4,32,26,0.35)] transition-colors duration-500 ease-out-expo hover:bg-glaze/90 sm:flex-row sm:justify-center sm:gap-10 md:gap-16 md:px-12 md:py-14"
        >
          <LeafTone clear="radial-gradient(ellipse 60% 70% at 50% 50%, transparent 8%, #000 45%)" />
          <span className="relative flex items-center gap-3">
            <TripadvisorIcon className="h-8 w-8 shrink-0 md:h-9 md:w-9" />
            <span className="text-2xl font-medium tracking-tight lowercase md:text-3xl">tripadvisor</span>
          </span>
          <span className="relative font-display text-3xl leading-none md:text-4xl">{ta.score}</span>
          <span className="relative inline-flex items-center gap-2 text-[13px] font-medium tracking-wide">
            Read Reviews
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
