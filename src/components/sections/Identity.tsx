import type { Link } from "@/content/types";
import { Pill } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Reveal";

interface IdentityProps {
  title: [string, string];
  body: string[];
  cta: Link;
}

/**
 * Who AURA is, in a nutshell, right under the hero (the CÉ LA VI / Zuma /
 * Amazónico intro), centered on the textured green ground and led by the
 * wordmark, as Zuma does it.
 */
export function Identity({ title, body, cta }: IdentityProps) {
  return (
    <section id="identity" className="px-6 pt-16 pb-10 text-center text-cream md:px-12 md:pt-24 md:pb-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <Reveal variant="fade">
          <h2 className="text-[13px] font-medium tracking-[0.22em] text-balance uppercase md:text-2xl">
            <span className="block">{title[0]}</span>
            <span className="block">{title[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={300} className="mt-7">
          <span aria-hidden className="block h-px w-14 bg-rim" />
        </Reveal>
        <Reveal delay={400} className="mt-7 grid max-w-[75ch] gap-4 text-pretty text-[15px] leading-relaxed text-cream/80 md:text-lg">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={500} className="mt-10">
          <Pill href={cta.href} tone="outline">
            {cta.label} →
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
