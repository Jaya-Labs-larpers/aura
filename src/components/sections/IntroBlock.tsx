import type { Link } from "@/content/types";
import { Eyebrow, Pill } from "@/components/ui/Buttons";
import { Reveal, RevealText } from "@/components/ui/Reveal";

interface IntroBlockProps {
  eyebrow?: string;
  title: string;
  text?: string;
  ctas?: Link[];
}

/** Centred statement on plain green: eyebrow, serif headline, paragraph, buttons. */
export function IntroBlock({ eyebrow, title, text, ctas }: IntroBlockProps) {
  return (
    <section className="bg-jungle px-5 py-28 text-center text-cream md:py-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {eyebrow && (
          <Reveal variant="fade">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <RevealText text={title} className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl" />
        {text && (
          <Reveal delay={250}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed opacity-80 md:text-base">{text}</p>
          </Reveal>
        )}
        {ctas && ctas.length > 0 && (
          <Reveal delay={400} className="mt-10 flex flex-wrap justify-center gap-3">
            {ctas.map((cta, i) => (
              <Pill key={cta.href} href={cta.href} tone={i === 0 ? "outline" : "solid"}>
                {cta.label}
              </Pill>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
