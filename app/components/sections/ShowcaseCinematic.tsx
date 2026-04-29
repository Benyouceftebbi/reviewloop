"use client";

/*
  SECTION 5 — VARIANT B: THE CINEMATIC STAGES

  Six full-viewport stages stacked vertically. Each stage has its
  own background, composition, density, and aesthetic. The user
  scrolls and the screen visibly transforms with each scroll-snap.

  Implementation:
   - Outer section uses scroll-snap-type: y proximity (forgiving snap
     so users can still skim past).
   - Each stage is min-height: 100vh and snap-aligned to start.
   - Pagination dots on the right edge let users jump.
*/

import { useEffect, useRef, useState } from "react";
import { ARCHETYPES } from "./_showcaseData";
import type { Archetype } from "./_showcaseData";

export default function ShowcaseCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1); // -1 = intro

  // Track which stage is currently centered for the pagination dots.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const stages = el.querySelectorAll<HTMLElement>("[data-stage]");
      let best = -1;
      let bestDist = Infinity;
      const center = window.innerHeight / 2;
      stages.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const stageCenter = r.top + r.height / 2;
        const d = Math.abs(stageCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: "var(--bg-base)",
        scrollSnapType: "y proximity",
      }}
    >
      {/* INTRO STAGE — chrome only, then the six brand stages. */}
      <div
        data-stage
        className="relative flex min-h-screen items-center justify-center px-6 md:px-20"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
          style={{ backgroundColor: "var(--purple-glow)" }}
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
          >
            {"{/}"}&nbsp;&nbsp;VARIANT B — CINEMATIC &nbsp;·&nbsp; BRAND SHOWCASE
          </p>
          <h2 className="mt-5 font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(40px,5.4vw,76px)]">
            Six brands.{" "}
            <em
              className="font-display italic font-normal"
              style={{ color: "var(--purple-soft)" }}
            >
              Six worlds.
            </em>{" "}
            One product.
          </h2>
          <p
            className="mx-auto mt-6 max-w-[560px] text-xl"
            style={{ color: "var(--text-muted)" }}
          >
            Each stage below is one tool, rendering for one brand. Scroll.
          </p>
          <p
            className="mt-10 font-mono text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            // scroll ↓
          </p>
        </div>
      </div>

      {/* SIX BRAND STAGES */}
      <SkinStage a={ARCHETYPES[0]} />
      <StreetStage a={ARCHETYPES[1]} />
      <WellnessStage a={ARCHETYPES[2]} />
      <TechStage a={ARCHETYPES[3]} />
      <FoodStage a={ARCHETYPES[4]} />
      <LuxuryStage a={ARCHETYPES[5]} />

      {/* PAGINATION DOTS — fixed on right edge (only inside this section). */}
      <PaginationDots
        active={active}
        count={ARCHETYPES.length}
        labels={ARCHETYPES.map((a) => a.label)}
      />
    </section>
  );
}

/* ----- Pagination dots (visible while inside the section) ----- */
function PaginationDots({
  active,
  count,
  labels,
}: {
  active: number;
  count: number;
  labels: string[];
}) {
  const visible = active >= 0;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-300 md:flex"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          title={labels[i]}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? 8 : 6,
            height: i === active ? 8 : 6,
            backgroundColor:
              i === active ? "var(--spec-lime)" : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

/* ----- Stage shell ----- */
function Stage({
  bg,
  children,
}: {
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-stage
      className="relative flex min-h-screen items-center"
      style={{ backgroundColor: bg, scrollSnapAlign: "start" }}
    >
      {children}
    </div>
  );
}

/* ===================================================================
   SIX STAGES — each owns the full viewport with its own composition.
   =================================================================== */

/* 1) Minimalist — vast cream emptiness with one tiny serif card. */
function SkinStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#F2E8D5">
      <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-20">
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "#1A1A1A", opacity: 0.5, letterSpacing: "0.32em" }}
        >
          daily &nbsp;—&nbsp; minimalist skincare
        </p>
        {/* tiny centered card surrounded by negative space */}
        <div className="mt-12 flex justify-center">
          <div
            className="rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            style={{ backgroundColor: "#FBF6EA", maxWidth: 360 }}
          >
            <p
              className="font-display italic text-[20px] leading-[1.3]"
              style={{ color: "#1A1A1A", fontWeight: 400 }}
            >
              {a.quote}
            </p>
            <p
              className="mt-6 font-mono text-[10px] uppercase"
              style={{ color: "#1A1A1A", opacity: 0.5, letterSpacing: "0.3em" }}
            >
              {a.handle}
            </p>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* 2) Streetwear — black with a giant red word that touches the edges. */
function StreetStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#0A0A0A">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,59,48,0.10) 1px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col justify-center px-6 py-16 md:px-20">
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.32em" }}
        >
          // drop 014 &nbsp;·&nbsp; loud streetwear
        </p>
        <h3
          className="mt-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 900,
            fontSize: "clamp(96px, 22vw, 280px)",
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            lineHeight: 0.85,
            color: "#FF3B30",
          }}
        >
          DRIP.
        </h3>
        <p
          className="mt-8 max-w-[640px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(20px, 2.4vw, 32px)",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {a.quote}
        </p>
        <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em]">
          <span style={{ color: "#FF3B30" }}>{a.handle}</span>
          <span
            className="rounded-sm px-3 py-1.5"
            style={{ backgroundColor: "#FF3B30", color: "#0A0A0A" }}
          >
            $48
          </span>
        </div>
      </div>
    </Stage>
  );
}

/* 3) Wellness — sage with a photographic blob and gentle lowercase. */
function WellnessStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#C8D4B8">
      <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[1fr_1fr] md:px-20">
        {/* Photographic blob suggestion */}
        <div
          className="aspect-[4/5] w-full rounded-[40px]"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #E8EFD9 0%, #B5C3A0 50%, #6E8060 100%)",
          }}
        />
        <div>
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "#22332B", opacity: 0.55, letterSpacing: "0.28em" }}
          >
            everwell &nbsp;—&nbsp; vol. iii
          </p>
          <p
            className="mt-6 lowercase"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              lineHeight: 1.3,
              color: "#22332B",
            }}
          >
            {a.quote.toLowerCase()}
          </p>
          <p
            className="mt-8 font-mono text-[10px] uppercase"
            style={{ color: "#22332B", opacity: 0.5, letterSpacing: "0.3em" }}
          >
            {a.handle}
          </p>
        </div>
      </div>
    </Stage>
  );
}

/* 4) Tech — navy with hairline rules, chrome gradient, italic blockquote. */
function TechStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#0F1B2D">
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 md:px-20">
        <div
          className="h-px w-full"
          style={{ backgroundColor: "rgba(232,228,216,0.2)" }}
        />
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p
              className="font-mono text-[10px] uppercase"
              style={{
                color: "#7AC4FF",
                letterSpacing: "0.4em",
              }}
            >
              obj. 04
            </p>
            <h3
              className="mt-4"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(48px, 5.6vw, 84px)",
                letterSpacing: "-0.02em",
                color: "#E8E4D8",
                lineHeight: 0.95,
              }}
            >
              object
            </h3>
            <p
              className="mt-6 max-w-[280px] font-mono text-[11px] uppercase"
              style={{
                color: "rgba(232,228,216,0.55)",
                letterSpacing: "0.18em",
                lineHeight: 1.7,
              }}
            >
              cnc-machined &nbsp;·&nbsp; weighs more than it should
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 32px)",
              lineHeight: 1.45,
              color: "#E8E4D8",
            }}
          >
            “{a.quote}”
          </p>
        </div>
        {/* Chrome gradient strip */}
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #B8C8D8 25%, #E8F0F8 50%, #B8C8D8 75%, transparent 100%)",
          }}
        />
        <p
          className="mt-3 font-mono text-[10px] uppercase"
          style={{ color: "rgba(232,228,216,0.4)", letterSpacing: "0.3em" }}
        >
          {a.handle}
        </p>
      </div>
    </Stage>
  );
}

/* 5) Food — full-bleed orange, giant emoji, loud type. */
function FoodStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#FF7A2A">
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 text-center md:px-20">
        <span
          className="absolute right-6 top-12 inline-block rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-wider md:right-20"
          style={{
            backgroundColor: "#FFE066",
            color: "#1A1A1A",
            transform: "rotate(8deg)",
            border: "3px solid #1A1A1A",
          }}
        >
          peel me
        </span>

        <div
          aria-hidden
          className="select-none"
          style={{ fontSize: "clamp(180px, 28vw, 360px)", lineHeight: 1 }}
        >
          🍊
        </div>

        <p
          className="mx-auto mt-4 max-w-[800px] lowercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.15,
            color: "#1A1A1A",
          }}
        >
          {a.quote}
        </p>
        <div className="mt-10 flex items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-wider">
          <span style={{ fontWeight: 800 }}>SUNPEEL.CO</span>
          <span style={{ opacity: 0.6 }}>{a.handle}</span>
        </div>
      </div>
    </Stage>
  );
}

/* 6) Luxury — bone white, single all-caps serif word, footnote testimonial. */
function LuxuryStage({ a }: { a: Archetype }) {
  return (
    <Stage bg="#F4F1EC">
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 md:px-20">
        <div className="flex items-baseline justify-between">
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "#1A1A1A", letterSpacing: "0.5em" }}
          >
            maison
          </p>
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "#1A1A1A", letterSpacing: "0.5em" }}
          >
            aw26
          </p>
        </div>
        <div className="mt-6 h-px w-full" style={{ backgroundColor: "#1A1A1A" }} />

        <h3
          className="mt-20"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(80px, 16vw, 220px)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#1A1A1A",
            lineHeight: 0.95,
          }}
        >
          AVELLA
        </h3>

        <div
          className="mt-20 flex justify-end"
          style={{ minHeight: 120 }}
        >
          <p
            className="max-w-[420px]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.4vw, 17px)",
              lineHeight: 1.6,
              color: "#1A1A1A",
              textAlign: "right",
            }}
          >
            {a.quote}
            <br />
            <span
              className="mt-3 inline-block font-mono not-italic text-[9px] uppercase"
              style={{ letterSpacing: "0.4em", opacity: 0.6 }}
            >
              {a.handle}
            </span>
          </p>
        </div>
      </div>
    </Stage>
  );
}
