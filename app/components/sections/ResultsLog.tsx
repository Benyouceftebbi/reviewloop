"use client";

/*
  SECTION 8 — SOCIAL PROOF / EARLY RESULTS

  Two-column composition:
   - LEFT: a hero pull-quote with oversized purple serif-italic glyphs
     bracketing the testimonial. The glyphs scale + rotate on reveal
     (per spec: 0.9 → 1, -3deg → 0).
   - RIGHT: an "early results" panel — a profile row at the top, a 2×2
     grid of real branded creatives below. Together they prove
     the product works without leaning on logos we don't have.

  Animation:
   - Reveal-on-scroll fade + translateY (700ms, --ease-reveal).
   - Quote glyphs scale + rotate in.
   - Creative tiles stagger (520/600/680/760ms).
   - Panel itself has a slow ambient float (8s ease-in-out, infinite)
     once it has revealed — gives the whole right column a "live" feel.
   - Each creative tile lifts and brightens on hover.
   - Video tile play-button pulses softly forever.
*/

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const QUOTE =
  "We turned a week of customer DMs into a month of ad creative in about twenty minutes. The speed is terrifying.";

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
      // bg now provided by the page-wide <PageBackground /> layer
      style={{ backgroundColor: "transparent" }}
    >
      {/* Per-section ambient beam removed — page-wide PageBackground
          now provides one continuous lighting layer. */}

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

      {/* Local keyframes for ambient panel float + play-button pulse. */}
      <style jsx>{`
        @keyframes panelFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes playPulse {
          0%,
          100% {
            box-shadow:
              0 4px 20px rgba(0, 0, 0, 0.3),
              0 0 0 0 rgba(255, 255, 255, 0.45);
          }
          50% {
            box-shadow:
              0 4px 20px rgba(0, 0, 0, 0.3),
              0 0 0 12px rgba(255, 255, 255, 0);
          }
        }
        :global(.rl-panel-float) {
          animation: panelFloat 8s ease-in-out infinite;
        }
        :global(.rl-play-pulse) {
          animation: playPulse 2.4s ease-in-out infinite;
        }
      `}</style>
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
      {/* Opening glyph — top-left, oversized. */}
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
        className={`relative overflow-hidden rounded-3xl p-4 md:p-5 ${
          inView ? "rl-panel-float" : ""
        }`}
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,127,232,0.04) inset",
          ...reveal(380),
        }}
      >
        {/* faint inner top-edge highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        {/* Profile row */}
        <div
          className="flex items-center gap-3 rounded-2xl p-3 md:p-4"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full md:h-14 md:w-14"
            style={{
              boxShadow:
                "0 0 0 2px rgba(139,127,232,0.25), 0 6px 18px rgba(0,0,0,0.35)",
            }}
          >
            <Image
              src="/results/avatar-sarah.jpg"
              alt="Sarah, founder"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
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
          <MiniCreative
            src="/results/creative-video.jpg"
            alt="Founder UGC video creative"
            variant="video"
            inView={inView}
            delay={520}
          />
          <MiniCreative
            src="/results/creative-product.jpg"
            alt="Smartwatch product creative"
            variant="product"
            inView={inView}
            delay={600}
          />
          <MiniCreative
            src="/results/creative-lifestyle.jpg"
            alt="Lifestyle creative"
            variant="lifestyle"
            inView={inView}
            delay={680}
          />
          <MiniCreative
            src="/results/creative-editorial.jpg"
            alt="Editorial fashion creative"
            variant="editorial"
            inView={inView}
            delay={760}
          />
        </div>
      </div>
    </div>
  );
}

/*
  MiniCreative — image-backed 1:1 tile representing a generated branded
  creative. Hover lifts the tile and slightly scales the underlying
  image. The "video" variant overlays a softly-pulsing play button.
*/
function MiniCreative({
  src,
  alt,
  variant,
  inView,
  delay,
}: {
  src: string;
  alt: string;
  variant: "video" | "product" | "lifestyle" | "editorial";
  inView: boolean;
  delay: number;
}) {
  const baseStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.95)",
    transition: `opacity 500ms var(--ease-reveal) ${delay}ms, transform 500ms var(--ease-reveal) ${delay}ms`,
  };

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1"
      style={baseStyle}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 220px, 40vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Subtle vignette so tiles read as a set against the dark panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {variant === "video" && (
        <div
          aria-hidden
          className="rl-play-pulse absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
          }}
        >
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 translate-x-[1px]"
            fill="#1A1A1A"
          >
            <polygon points="2,1.5 11,6 2,10.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
