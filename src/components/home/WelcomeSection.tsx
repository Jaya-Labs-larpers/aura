import { RevealGroup, RevealItem } from "@/components/site/Reveal";

const IMAGES = [
  { src: "/images/home/welcome-experience-1.webp", alt: "Aura Experience 1" },
  { src: "/images/home/welcome-experience-2.webp", alt: "Aura Experience 2" },
];

export function WelcomeSection() {
  return (
    <RevealGroup as="section" className="py-12 md:py-16 px-4 sm:px-6 text-center bg-[#F2FFF7] text-[#26332F] overflow-hidden">
      <RevealItem className="max-w-5xl mx-auto flex flex-col items-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
        <div className="w-10 h-10 rounded-full bg-[#D92B78]/10 flex items-center justify-center mb-3 text-[#D92B78] border border-[#D92B78]/30 shadow-md transition-transform duration-500 hover:rotate-12 hover:scale-110">
          <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17352F] tracking-wide">Welcome to Aura</h2>

        <div className="w-16 h-[2px] bg-[#D92B78] my-3 transition-all duration-700 hover:w-24"></div>

        <p className="text-xs sm:text-sm md:text-base text-[#53615C] font-medium leading-relaxed tracking-wide mb-8 md:mb-10 max-w-2xl sm:leading-5 md:leading-6">
          Exceptional culinary artistry, skyline views, and crafted cocktails in an unforgettable atmosphere.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full items-center justify-items-center max-w-4xl mx-auto">
          {IMAGES.map((image) => (
            <div
              key={image.src}
              className="group relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-none md:w-full transition-all duration-500 hover:-translate-y-1"
            >
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-[#D92B78]/20 bg-[#102823]/50">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          ))}
        </div>
      </RevealItem>
    </RevealGroup>
  );
}
