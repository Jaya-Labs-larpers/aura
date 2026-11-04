import Image from "next/image";
import type { Link } from "@/content/types";
import { Pill } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Reveal";

interface IdentityProps {
  lead: string;
  accent: string;
  body: string[];
  cta: Link;
  logo: { src: string; alt: string };
}

/**
 * Who AURA is, in a nutshell, right under the hero (the CÉ LA VI / Zuma /
 * Amazónico intro), centered on the textured green ground and led by the
 * wordmark, as Zuma does it.
 */
export function Identity({ lead, accent, body, cta, logo }: IdentityProps) {
  return (
    <section id="identity" className="px-6 py-24 text-center text-cream md:px-12 md:py-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Reveal variant="fade">
          <Image src={logo.src} alt={logo.alt} width={478} height={140} className="h-12 w-auto md:h-16" />
        </Reveal>
        <Reveal delay={200} className="mt-8">
          <h2 className="text-[13px] font-medium tracking-[0.22em] text-balance uppercase md:text-lg">
            {lead} {accent}
          </h2>
        </Reveal>
        <Reveal delay={300} className="mt-7">
          <span aria-hidden className="block h-px w-14 bg-rim" />
        </Reveal>
        <Reveal delay={400} className="mt-7 grid max-w-[52ch] gap-4 text-[15px] leading-relaxed text-cream/80 md:text-lg">
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
