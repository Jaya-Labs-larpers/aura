import type { Metadata, Viewport } from "next";
import { Kantumruy_Pro, Miranda_Sans, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HOME } from "@/content/home";
import { SITE } from "@/content/site";
import "../globals.css";

// Fonts are downloaded at build time and served from this site (no Google requests).
const display = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
// Next has no fallback metrics for Miranda Sans; the build prints a harmless warning about it.
const body = Miranda_Sans({ subsets: ["latin"], variable: "--font-body" });
const khmer = Kantumruy_Pro({ subsets: ["khmer"], variable: "--font-kh", preload: false });

export const metadata: Metadata = {
  title: { default: `${SITE.name} ${SITE.location}`, template: `%s · ${SITE.name}` },
  description: HOME.meta.description,
  icons: { icon: SITE.favicon },
};

export const viewport: Viewport = {
  themeColor: "#04201a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${khmer.variable}`}>
      <body>
        {/* Without JavaScript, show content that would otherwise wait for a scroll reveal. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}.word>span{transform:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
