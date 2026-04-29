"use client";

/*
  SECTION 5 — VARIANT A: THE MAGAZINE SHELF

  A horizontal scroll-snap shelf where each card has a different SIZE
  and a different INTERIOR composition — set in its own typographic
  system. Cards align to the bottom so the varying heights create a
  visible "rack of zines" silhouette across the top edge.

  The 6 archetypes each get a hand-built renderer below — they
  intentionally don't share a layout grid.
*/

import { ARCHETYPES } from "./_showcaseData";

export default function ShowcaseShelf() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-20">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT A — SHELF &nbsp;·&nbsp; BRAND SHOWCASE
        </p>
        <h2 className="mt-5 max-w-[900px] font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          Six brands.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Six personalities.
          </em>{" "}
          One product.
        </h2>
        <p
          className="mt-6 max-w-[640px] text-xl"
          style={{ color: "var(--text-muted)" }}
        >
          Your colors, your fonts, your logo. Six brands. Six totally
          different design languages. One tool.
        </p>
      </div>

      {/* THE SHELF — horizontal scroll-snap, full-bleed left edge. */}
      <div
        className="relative mt-14 overflow-x-auto pb-4 md:mt-16"
        style={{
          // Snap cards to start; allow free panning between snaps so it
          // doesn't feel locked.
          scrollSnapType: "x proximity",
        }}
      >
        <div className="flex w-max items-end gap-6 px-6 md:gap-8 md:px-20">
          <SkinCard a={ARCHETYPES[0]} />
          <StreetCard a={ARCHETYPES[1]} />
          <WellnessCard a={ARCHETYPES[2]} />
          <TechCard a={ARCHETYPES[3]} />
          <FoodCard a={ARCHETYPES[4]} />
          <LuxuryCard a={ARCHETYPES[5]} />
          {/* trailing spacer so the last card can sit fully in view on snap */}
          <div className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
}

/* ----- Shared shelf-item wrapper ----- */
function ShelfItem({
  width,
  label,
  children,
}: {
  width: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="shrink-0"
      style={{ width, scrollSnapAlign: "start" }}
    >
      {children}
      <p
        className="mt-3 font-mono text-[10px] uppercase"
        style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ===================================================================
   THE SIX CREATIVES — each is its own small composition.
   =================================================================== */

import type { Archetype } from "./_showcaseData";

/* 1) Minimalist skincare — calm cream square, italic serif quote. */
function SkinCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="280px" label={a.label}>
      <div
        className="relative h-[280px] w-[280px] overflow-hidden rounded-[28px] p-7"
        style={{ backgroundColor: "#F2E8D5", color: "#1A1A1A" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] opacity-60">
          daily · since 22
        </span>
        <p
          className="absolute left-7 right-7 top-1/2 -translate-y-1/2 font-display italic text-[20px] leading-[1.25]"
          style={{ fontWeight: 400 }}
        >
          {a.quote}
        </p>
        <span className="absolute bottom-6 right-7 font-mono text-[9px] opacity-50">
          {a.handle}
        </span>
      </div>
    </ShelfItem>
  );
}

/* 2) Loud streetwear — tall black portrait with red caps + halftone. */
function StreetCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="280px" label={a.label}>
      <div
        className="relative h-[420px] w-[280px] overflow-hidden rounded-[6px] p-6"
        style={{
          backgroundColor: "#0A0A0A",
          color: "#FF3B30",
          // halftone-ish dot pattern
          backgroundImage:
            "radial-gradient(rgba(255,59,48,0.15) 1px, transparent 1.5px)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0",
        }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/40">
          // drop 014
        </p>
        <p
          className="mt-2 leading-[0.9]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: 88,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#FF3B30",
          }}
        >
          DRIP.
        </p>
        <p
          className="absolute bottom-16 left-6 right-6 leading-[1.05]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            color: "#fff",
          }}
        >
          {a.quote}
        </p>
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[9px] uppercase tracking-[0.2em]">
          <span style={{ color: "#FF3B30" }}>{a.handle}</span>
          <span
            className="rounded-sm px-2 py-1"
            style={{ backgroundColor: "#FF3B30", color: "#0A0A0A" }}
          >
            $48
          </span>
        </div>
      </div>
    </ShelfItem>
  );
}

/* 3) Clean wellness — sage square with photographic blob. */
function WellnessCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="340px" label={a.label}>
      <div
        className="relative h-[340px] w-[340px] overflow-hidden rounded-[20px] p-7"
        style={{ backgroundColor: "#C8D4B8", color: "#22332B" }}
      >
        {/* abstract photographic blob */}
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #E8EFD9 0%, #A8B998 60%, #7A8B6E 100%)",
          }}
        />
        <p
          className="relative font-mono text-[10px] uppercase opacity-70"
          style={{ letterSpacing: "0.22em" }}
        >
          everwell  ·  vol. iii
        </p>
        <p
          className="absolute bottom-7 left-7 right-7 lowercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.45,
          }}
        >
          {a.quote.toLowerCase()}
        </p>
        <span className="absolute right-7 top-7 font-mono text-[9px] opacity-50">
          {a.handle}
        </span>
      </div>
    </ShelfItem>
  );
}

/* 4) Premium tech — wide horizontal navy with chrome accent. */
function TechCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="480px" label={a.label}>
      <div
        className="relative h-[300px] w-[480px] overflow-hidden rounded-[10px]"
        style={{ backgroundColor: "#0F1B2D", color: "#E8E4D8" }}
      >
        {/* hairline rules */}
        <div className="absolute inset-x-7 top-7 h-px" style={{ backgroundColor: "rgba(232,228,216,0.25)" }} />
        <div className="absolute inset-x-7 bottom-7 h-px" style={{ backgroundColor: "rgba(232,228,216,0.25)" }} />
        {/* chrome gradient strip */}
        <div
          aria-hidden
          className="absolute right-0 top-0 h-full w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #B8C8D8 30%, #E8F0F8 50%, #B8C8D8 70%, transparent 100%)",
          }}
        />

        <div className="absolute left-7 top-12">
          <span
            className="font-mono text-[9px] uppercase"
            style={{ letterSpacing: "0.4em", color: "#7AC4FF" }}
          >
            obj. 04
          </span>
          <h3
            className="mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 36,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            object
          </h3>
        </div>
        <p
          className="absolute bottom-12 left-7 right-7 max-w-[320px] text-[15px] leading-[1.5]"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {a.quote}
        </p>
        <span className="absolute bottom-3 right-7 font-mono text-[9px] uppercase tracking-[0.3em] opacity-50">
          {a.handle}
        </span>
      </div>
    </ShelfItem>
  );
}

/* 5) Vibrant food/bev — loud orange with emoji centerpiece. */
function FoodCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="320px" label={a.label}>
      <div
        className="relative h-[360px] w-[320px] overflow-hidden rounded-[36px] p-6"
        style={{ backgroundColor: "#FF7A2A", color: "#1A1A1A" }}
      >
        {/* sticker callout */}
        <span
          className="absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: "#FFE066",
            color: "#1A1A1A",
            transform: "rotate(8deg)",
            border: "2px solid #1A1A1A",
          }}
        >
          peel me
        </span>

        <div
          className="absolute inset-x-0 top-[28%] flex items-center justify-center text-[140px] leading-none"
          aria-hidden
        >
          🍊
        </div>

        <p
          className="absolute bottom-16 left-6 right-6 lowercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 17,
            lineHeight: 1.3,
          }}
        >
          {a.quote}
        </p>
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span style={{ fontWeight: 700 }}>SUNPEEL.CO</span>
          <span className="opacity-60">{a.handle}</span>
        </div>
      </div>
    </ShelfItem>
  );
}

/* 6) Luxury fashion — tall narrow bone-white with all-caps serif. */
function LuxuryCard({ a }: { a: Archetype }) {
  return (
    <ShelfItem width="280px" label={a.label}>
      <div
        className="relative h-[440px] w-[280px] overflow-hidden p-7"
        style={{
          backgroundColor: "#F4F1EC",
          color: "#1A1A1A",
          border: "1px solid #E0DBD2",
        }}
      >
        <p
          className="font-mono text-[9px] uppercase"
          style={{ letterSpacing: "0.5em" }}
        >
          maison &nbsp;—&nbsp; aw26
        </p>
        <div className="absolute inset-x-7 top-14 h-px" style={{ backgroundColor: "#1A1A1A" }} />
        <h3
          className="absolute left-7 right-7 top-[28%]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 38,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          AVELLA
        </h3>
        <p
          className="absolute bottom-20 left-7 right-7"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {a.quote}
        </p>
        <div
          className="absolute inset-x-7 bottom-12 h-px"
          style={{ backgroundColor: "#1A1A1A" }}
        />
        <span
          className="absolute bottom-6 left-7 font-mono text-[9px] uppercase"
          style={{ letterSpacing: "0.3em" }}
        >
          {a.handle}
        </span>
      </div>
    </ShelfItem>
  );
}
