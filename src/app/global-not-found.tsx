import type { Metadata } from "next";
import Link from "next/link";
import { Miranda_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const body = Miranda_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Not found · AURA",
  description: "This page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-svh flex-col items-center justify-center bg-jungle px-5 text-center text-cream">
        <p className="font-mono text-xs opacity-50">404</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Lost in the garden</h1>
        <p className="mt-5 text-[15px] opacity-75">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-11 items-center justify-center rounded-full border border-cream bg-cream px-6 text-[13px] font-medium tracking-wide text-jungle transition-colors duration-500 ease-out-expo hover:border-forest hover:bg-forest hover:text-cream"
        >
          Back home
        </Link>
      </body>
    </html>
  );
}
