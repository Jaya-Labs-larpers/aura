import { Reveal } from "@/components/site/Reveal";

export function ChefsSection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-20 overflow-hidden text-[#26332F] bg-[#F2FFF7] transition-colors duration-700 ease-out border-t border-[#EEE8DD]">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <Reveal className="relative w-full max-w-xl md:max-w-6xl transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-[#E5DED2] bg-[#F7F3EC] group">
            <img
              src="/images/home/chef-dun-sophol.jpg"
              alt="Chef Don Sophol"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </Reveal>

        <Reveal className="text-center mt-6 md:mt-10 max-w-3xl transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest uppercase text-[#17352F]">CHEFS</h2>
          <div className="w-14 h-[2px] bg-[#D92B78] mx-auto mt-2.5 mb-3 md:mt-3 md:mb-5"></div>

          <h3 className="text-base sm:text-lg md:text-xl text-[#D92B78] mb-2.5 md:mb-3">Chef Dun Sophol</h3>

          <p className="text-[#5F6965] text-xs sm:text-sm md:text-base font-light leading-relaxed px-2 sm:px-0 sm:leading-5 md:leading-6">
            Chef Dun Sophol leads the kitchen at AURA, bringing experience in both Khmer and Western cuisine. His menu
            features a balance of traditional Cambodian dishes and international favorites, with a focus on locally
            sourced steak prepared to a high standard. Guests can expect consistent quality and a menu designed to suit a
            variety of tastes and occasions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
