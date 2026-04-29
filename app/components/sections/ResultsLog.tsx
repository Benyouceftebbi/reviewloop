"use client";

/*
  SECTION 8 — SOCIAL PROOF / EARLY RESULTS

  Two-column composition:
   - LEFT: a hero pull-quote with oversized purple serif-italic glyphs
     bracketing the testimonial. The glyphs scale + rotate on reveal
     (per spec: 0.9 → 1, -3deg → 0).
   - RIGHT: an "early results" panel — a profile row at the top, a 2×2
     grid of stylized branded creatives below. Together they prove
     the product works without leaning on logos we don't have.

  Restraint:
   - No photos of real people. Avatar is a generic gradient with an
     initial — generic enough to read as a placeholder.
   - Mini creatives are abstract compositions, not photo content.
   - One small mono honesty line below the panel.
*/

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const QUOTE =
  "We turned a week of customer DMs into a month of ad creative in about twenty minutes. The speed is unsettling.";

export default function ResultsLog() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay: number): CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 700ms var(--ease-reveal) ${delay}ms, transform 700ms var(--ease-reveal) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="early-results"
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)", opacity: 0.5 }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <p
          className="mb-12 font-mono text-xs uppercase md:mb-16"
          style={{
            color: "var(--text-dim)",
            letterSpacing: "0.18em",
            ...reveal(0),
          }}
        >
          {"{/}"}&nbsp;&nbsp;ON THE RECORD
        </p>

        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <PullQuote inView={inView} reveal={reveal} />
          <EarlyResultsPanel inView={inView} reveal={reveal} />
        </div>

        {/* Honest closing — small mono line, restrained. */}
        <p
          className="mt-14 text-center font-mono text-xs leading-relaxed md:mt-16"
          style={{
            color: "var(--text-dim)",
            letterSpacing: "0.12em",
            ...reveal(800),
          }}
        >
          // {"{count}"} brands shipping &nbsp;·&nbsp; launched {"{date}"}
          &nbsp;·&nbsp; founder-level support is currently free
        </p>
      </div>
    </section>
  );
}

/* ---------- LEFT: pull quote ---------- */

function PullQuote({
  inView,
  reveal,
}: {
  inView: boolean;
  reveal: (d: number) => CSSProperties;
}) {
  return (
    <div className="relative">
      {/*
        Opening glyph — top-left, oversized.
        Spec animation: scale 0.9 → 1, rotate -3deg → 0 on reveal.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display italic font-normal leading-none select-none"
        style={{
          color: "var(--purple-soft)",
          fontSize: "clamp(120px, 18vw, 200px)",
          top: "-0.32em",
          left: "-0.06em",
          opacity: inView ? 0.85 : 0,
          transform: inView ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(-3deg)",
          transformOrigin: "bottom right",
          transition:
            "opacity 700ms var(--ease-reveal), transform 700ms var(--ease-reveal)",
        }}
      >
        &ldquo;
      </span>

      {/* The quote — italic serif, large, generous line-height. */}
      <p
        className="relative font-display italic font-normal tracking-[-0.01em]"
        style={{
          color: "var(--text-primary)",
          fontSize: "clamp(22px, 2.8vw, 34px)",
          lineHeight: 1.3,
          paddingLeft: "clamp(20px, 4vw, 56px)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingRight: "clamp(20px, 4vw, 60px)",
          paddingBottom: "clamp(40px, 5vw, 60px)",
          ...reveal(200),
        }}
      >
        {QUOTE}
      </p>

      {/* Closing glyph — bottom-right, oversized. */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display italic font-normal leading-none select-none"
        style={{
          color: "var(--purple-soft)",
          fontSize: "clamp(120px, 18vw, 200px)",
          bottom: "-0.42em",
          right: "0",
          opacity: inView ? 0.85 : 0,
          transform: inView ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(3deg)",
          transformOrigin: "top left",
          transition:
            "opacity 700ms var(--ease-reveal) 120ms, transform 700ms var(--ease-reveal) 120ms",
        }}
      >
        &rdquo;
      </span>
    </div>
  );
}

/* ---------- RIGHT: early results panel ---------- */

function EarlyResultsPanel({
  inView,
  reveal,
}: {
  inView: boolean;
  reveal: (d: number) => CSSProperties;
}) {
  return (
    <div className="flex flex-col">
      <p
        className="mb-4 text-base"
        style={{ color: "var(--text-muted)", ...reveal(300) }}
      >
        The early results.
      </p>

      <div
        className="overflow-hidden rounded-3xl p-4 md:p-5"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          ...reveal(380),
        }}
      >
        {/* Profile row */}
        <div
          className="flex items-center gap-3 rounded-2xl p-3 md:p-4"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <Avatar />
          <div>
            <p className="text-base font-medium text-white">Sarah,</p>
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Founder of [Brand]
            </p>
          </div>
        </div>

        {/* 2×2 creative grid — staggered reveal. */}
        <div className="mt-3 grid grid-cols-2 gap-2 md:gap-3">
          <MiniCreative variant="video"     inView={inView} delay={520} />
          <MiniCreative variant="product"   inView={inView} delay={600} />
          <MiniCreative variant="lifestyle" inView={inView} delay={680} />
          <MiniCreative variant="editorial" inView={inView} delay={760} />
        </div>
      </div>
    </div>
  );
}

/* Generic gradient avatar with an initial — no real-person photo. */
function Avatar() {
  return (
    <div
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display italic font-normal text-xl text-white md:h-14 md:w-14"
      style={{
        background: "linear-gradient(135deg, #C8A2C8 0%, #6B5BD8 100%)",
      }}
      aria-label="Sarah"
    >
      S
    </div>
  );
}

/*
  MiniCreative — abstract stylized thumbnails representing four kinds of
  generated branded creatives. No photo content; each is purely composed
  from gradient + type + simple shapes.
*/
function MiniCreative({
  variant,
  inView,
  delay,
}: {
  variant: "video" | "product" | "lifestyle" | "editorial";
  inView: boolean;
  delay: number;
}) {
  const baseStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.95)",
    transition: `opacity 500ms var(--ease-reveal) ${delay}ms, transform 500ms var(--ease-reveal) ${delay}ms`,
  };

  if (variant === "video") {
    return (
      <div
        className="relative aspect-square overflow-hidden rounded-2xl"
        style={{ ...baseStyle }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #6B5BD8 0%, #3A2A6E 60%, #1A1530 100%)",
          }}
        />
        {/* Soft highlight to suggest a video frame, not a flat color. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 35%, rgba(255,255,255,0.18), transparent 50%)",
          }}
        />
        {/* Play button */}
        <div
          className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 translate-x-[1px]"
            fill="#1A1A1A"
            aria-hidden
          >
            <polygon points="2,1.5 11,6 2,10.5" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "product") {
    return (
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #2A2A30 0%, #16161A 100%)",
          ...baseStyle,
        }}
      >
        {/* Abstract circular product silhouette with chrome glint. */}
        <div
          className="h-14 w-14 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, #6B6B72, #1F1F25 70%)",
            boxShadow:
              "inset 0 0 0 2px rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.4)",
          }}
        />
      </div>
    );
  }

  if (variant === "lifestyle") {
    return (
      <div
        className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl p-3"
        style={{
          background:
            "linear-gradient(135deg, #C8A695 0%, #8B6F5A 60%, #4A3A30 100%)",
          ...baseStyle,
        }}
      >
        <p
          className="font-display italic font-normal leading-tight text-white/90"
          style={{ fontSize: "11px" }}
        >
          this stuff actually works
        </p>
      </div>
    );
  }

  // editorial
  return (
    <div
      className="relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-3"
      style={{ backgroundColor: "#F4F1EC", ...baseStyle }}
    >
      <div
        className="h-px w-full"
        style={{ backgroundColor: "rgba(0,0,0,0.18)" }}
      />
      <p
        className="font-display italic font-normal text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "#1A1A1A" }}
      >
        Edition
      </p>
      <div
        className="h-px w-full"
        style={{ backgroundColor: "rgba(0,0,0,0.18)" }}
      />
    </div>
  );
}
