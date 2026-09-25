import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "AURA",
  description:
    "Elevated rooftop dining above Bassac Lane, showcasing artisanal mixology and charcoal-grilled Kampong Chhnang grass-fed Wagyu with Exceptional Services.",
  icons: {
    icon: "/images/brand/aura-logo-favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
