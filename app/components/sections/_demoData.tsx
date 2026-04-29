/*
  Shared data for Section 4 demo variants.

  Six brand archetypes per the spec's Section 5 — kept consistent so the
  three variants below feel like the same product.
  Six testimonials in real-feeling DTC voice (typos, emojis, run-ons).
*/

import type { CSSProperties, ReactNode } from "react";

export type BrandKit = {
  id: string;
  label: string;
  bg: string;
  text: string;
  accent: string;
  font: "sans" | "serif";
  style?: "uppercase" | "normal";
};

export const BRANDS: BrandKit[] = [
  { id: "minimalist", label: "// minimalist skin", bg: "#F2E8D5", text: "#1A1A1A", accent: "#8B6F47", font: "serif" },
  { id: "streetwear", label: "// loud st.",        bg: "#0A0A0A", text: "#FF3B30", accent: "#F5DD2B", font: "sans", style: "uppercase" },
  { id: "wellness",   label: "// clean wellness",  bg: "#C8D4B8", text: "#22332B", accent: "#5C7048", font: "sans" },
  { id: "tech",       label: "// premium tech",    bg: "#0F1B2D", text: "#E8E4D8", accent: "#7AC4FF", font: "serif" },
  { id: "vibrant",    label: "// vibrant DTC",     bg: "#FF7A2A", text: "#1A1A1A", accent: "#FFE066", font: "sans" },
  { id: "luxury",     label: "// luxury fashion",  bg: "#F4F1EC", text: "#1A1A1A", accent: "#A8956F", font: "serif", style: "uppercase" },
];

export const TESTIMONIALS = [
  "this serum literally changed my skin in 2 weeks 😭",
  "best $40 I've spent this year, running back for a 2nd",
  "okay this product is unreasonably good",
  "obsessed obsessed obsessed",
  "my mom stole mine i had to buy another one",
  "ok fine you converted me",
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/*
  CreativeCard — the build sequence.
  `progress` 0..1 controls staged reveal:
   0.00–0.15 background fades up
   0.15–0.40 brand label appears
   0.40–0.85 testimonial typewrites in
   0.85–0.95 signature appears
   0.95–1.00 lime ✓ ready tag pops
*/
export function CreativeCard({
  brand,
  testimonial,
  progress,
}: {
  brand: BrandKit;
  testimonial: string;
  progress: number;
}) {
  const p = clamp(progress, 0, 1);

  const bgOpacity = clamp(p / 0.15, 0, 1);
  const labelOpacity = clamp((p - 0.15) / 0.25, 0, 1);
  const textCount = Math.floor(clamp((p - 0.40) / 0.45, 0, 1) * testimonial.length);
  const sigOpacity = clamp((p - 0.85) / 0.10, 0, 1);
  const readyOn = p >= 0.95;

  const visibleText = testimonial.slice(0, textCount);
  const stillTyping = textCount > 0 && textCount < testimonial.length;

  const fontStyle: CSSProperties =
    brand.font === "serif"
      ? { fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }
      : { fontFamily: "var(--font-sans)", fontWeight: 600 };

  const isUpper = brand.style === "uppercase";

  return (
    <div
      className="relative flex aspect-[5/4] w-full flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-7"
      style={{
        backgroundColor: brand.bg,
        opacity: 0.2 + 0.8 * bgOpacity,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        transition: "background-color 300ms var(--ease-reveal)",
      }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: brand.text, opacity: 0.6 * labelOpacity }}
      >
        {brand.label}
      </span>

      <p
        className="leading-[1.18] text-[clamp(18px,2.4vw,28px)]"
        style={{
          ...fontStyle,
          color: brand.text,
          textTransform: isUpper ? "uppercase" : "none",
          letterSpacing: isUpper ? "0.02em" : undefined,
          minHeight: "2.6em",
        }}
      >
        {visibleText}
        {stillTyping && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[2px] animate-caret-blink"
            style={{ backgroundColor: brand.text }}
          />
        )}
      </p>

      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px]"
          style={{ color: brand.text, opacity: 0.5 * sigOpacity }}
        >
          @anon_customer
        </span>
        <span
          className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            backgroundColor: readyOn ? "var(--spec-lime)" : "transparent",
            color: readyOn ? "#1A1A1A" : "transparent",
            boxShadow: readyOn ? "0 0 24px var(--lime-glow)" : "none",
            transition: "all 200ms var(--ease-reveal)",
          }}
        >
          ✓ ready
        </span>
      </div>
    </div>
  );
}

/* Tiny brand thumbnail used by Variant B's matrix. */
export function BrandThumb({
  brand,
  active,
  onClick,
}: {
  brand: BrandKit;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl md:h-20 md:w-20"
      style={{
        backgroundColor: brand.bg,
        boxShadow: active
          ? "0 0 0 2px var(--spec-lime), 0 0 24px var(--lime-glow)"
          : "0 0 0 1px var(--border-subtle)",
        transform: active ? "scale(1.06)" : undefined,
        transition: "all 250ms var(--ease-reveal)",
      }}
      aria-pressed={active}
      aria-label={brand.id}
    >
      <span
        className="font-mono text-[8px] uppercase tracking-[0.18em]"
        style={{ color: brand.text, opacity: 0.55 }}
      >
        {brand.id}
      </span>
    </button>
  );
}
