import type { Metadata } from "next";
import { Manrope, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

/*
  next/font handles font loading the right way for Next.js:
   - Downloads + self-hosts the font at build time (zero layout shift).
   - Generates a CSS variable we can hand to Tailwind.

  Why these two fonts:
   - Manrope: free Google Font that's geometrically closest to Gordita
     (Arounda's paid sans). Same vertical proportions, similar curves.
   - Libre Baskerville italic: open-source, the literal font Arounda uses.
*/
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReviewLoop — Turn your reviews, comments & DMs into Meta-ready ads",
  description:
    "ReviewLoop pulls the testimonials sitting in your reviews, comments, and DMs and ships them as scroll-stopping Meta ad creatives — in minutes, not weeks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${libreBaskerville.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
