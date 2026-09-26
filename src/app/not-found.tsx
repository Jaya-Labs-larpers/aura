import { Pill } from "@/components/ui/Buttons";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-jungle px-5 text-center text-cream">
      <p className="font-mono text-xs opacity-50">404</p>
      <h1 className="mt-4 font-display text-5xl md:text-7xl">Lost in the garden</h1>
      <p className="mt-5 text-[15px] opacity-75">This page doesn&apos;t exist.</p>
      <Pill href="/" className="mt-10">
        Back home
      </Pill>
    </section>
  );
}
