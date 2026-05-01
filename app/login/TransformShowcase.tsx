"use client";

/*
  TransformShowcase — the "video" panel on the right side of the
  login screen.

  This is a single continuously-looping animation that demos the
  product's whole promise in 7 seconds:

    [0.00 — 0.30]  RAW PHASE
                   A social-comment card sits in the upper third of
                   the panel. The testimonial typewrites in.
                   A "// captured" tag pulses on top.

    [0.30 — 0.50]  TRANSITION PHASE
                   The comment shrinks/lifts, a particle/light trail
                   sweeps from it down to the creative slot, the
                   creative card slot fades up at low opacity.

    [0.50 — 0.95]  BUILD PHASE
                   The CreativeCard component (reused from the rest
                   of the site) builds: brand bg → label → headline
                   typewrites → signature → ✓ ready tag.

    [0.95 — 1.00]  HOLD
                   Both cards visible, ✓ ready glowing, then the
                   loop snaps to the next (testimonial, brand) pair
                   and re-runs.

  Why no actual video file:
   - This animation is built from the same primitives the rest of
     the marketing site uses (BRANDS, TESTIMONIALS, CreativeCard).
     That keeps the brand language identical and means we don't
     ship/transcode any heavy media for the auth route.
*/

import { useEffect, useRef, useState } from "react";
import {
  BRANDS,
  TESTIMONIALS,
  CreativeCard,
} from "../components/sections/_demoData";

const LOOP_MS = 7000;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function TransformShowcase() {
  // 0..1 across the full loop
  const [t, setT] = useState(0);
  // Which (testimonial, brand) pair is currently playing.
  const [pairIdx, setPairIdx] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    let raf = 0;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = (elapsed % LOOP_MS) / LOOP_MS;
      setT(progress);
      // When we cross from the tail of one loop into the next,
      // bump the pair index so a new comment + brand combo plays.
      if (elapsed >= LOOP_MS) {
        startRef.current = now;
        setPairIdx((i) => (i + 1) % Math.max(BRANDS.length, TESTIMONIALS.length));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const testimonial = TESTIMONIALS[pairIdx % TESTIMONIALS.length];
  const brand = BRANDS[pairIdx % BRANDS.length];

  // Phase progressions.
  const rawTypeProgress = clamp(t / 0.30, 0, 1);          // 0→1 over [0, .30]
  const transitionProgress = clamp((t - 0.30) / 0.20, 0, 1); // 0→1 over [.30, .50]
  const buildProgress = clamp((t - 0.50) / 0.45, 0, 1);   // 0→1 over [.50, .95]

  // Raw card transforms upward + slightly shrinks during transition.
  const rawY = -transitionProgress * 24;
  const rawScale = 1 - transitionProgress * 0.06;
  const rawOpacity = 1 - transitionProgress * 0.25;

  // Creative card lifts in during the build.
  const creativeY = (1 - clamp(buildProgress * 2, 0, 1)) * 24;
  const creativeOpacity = clamp(buildProgress * 2, 0, 1);

  // Beam trail strength peaks during the transition.
  const beamStrength =
    transitionProgress < 0.5
      ? transitionProgress * 2
      : (1 - transitionProgress) * 2;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 md:p-10">
      {/* Atmospheric backdrop — purple bloom, mirrors the FinalCTA
          beam treatment but static + low intensity so it doesn't
          fight the active animation. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(139,127,232,0.12), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(197,248,42,0.08), transparent 70%)",
        }}
      />

      {/* Subtle grid lines for the "studio" feel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex w-full max-w-[460px] flex-col gap-6">
        {/* Step label above the raw card */}
        <StepLabel index={1} label="raw comment" />

        {/* RAW COMMENT CARD */}
        <div
          className="relative"
          style={{
            transform: `translateY(${rawY}px) scale(${rawScale})`,
            opacity: rawOpacity,
            transition:
              "transform 200ms var(--ease-reveal), opacity 200ms var(--ease-reveal)",
          }}
        >
          <RawCommentCard
            testimonial={testimonial}
            typeProgress={rawTypeProgress}
            keyId={pairIdx}
          />
        </div>

        {/* CONNECTOR — vertical light beam between the two cards.
            Strongest during the transition phase. */}
        <div className="relative mx-auto h-12 w-full">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--purple-soft), transparent)",
              opacity: 0.25 + beamStrength * 0.55,
              filter: `blur(${0.5 + beamStrength * 1.5}px)`,
            }}
          />
          {/* Traveling spark */}
          <div
            aria-hidden
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              top: `${transitionProgress * 100}%`,
              opacity: beamStrength,
              backgroundColor: "var(--spec-lime)",
              boxShadow:
                "0 0 14px var(--spec-lime), 0 0 30px rgba(197,248,42,0.6)",
              transform: `translate(-50%, -50%) scale(${0.6 + beamStrength * 0.6})`,
            }}
          />
          {/* Arrow icon mid-pipe */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: 0.5 + beamStrength * 0.5 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              style={{ color: "var(--purple-soft)" }}
              aria-hidden
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        <StepLabel index={2} label="ad-ready creative" />

        {/* CREATIVE CARD — reuses the CreativeCard from _demoData
            so the "after" state matches every other build sequence
            on the marketing site. */}
        <div
          style={{
            transform: `translateY(${creativeY}px)`,
            opacity: creativeOpacity,
            transition:
              "transform 200ms var(--ease-reveal), opacity 200ms var(--ease-reveal)",
          }}
        >
          <CreativeCard
            brand={brand}
            testimonial={testimonial}
            progress={buildProgress}
          />
        </div>
      </div>

      {/* Loop progress bar — calm cue that the animation is alive
          without being attention-grabbing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden"
        style={{ backgroundColor: "var(--border-subtle)" }}
      >
        <div
          className="h-full"
          style={{
            width: `${t * 100}%`,
            backgroundColor: "var(--spec-lime)",
            boxShadow: "0 0 8px var(--lime-glow)",
          }}
        />
      </div>

      <p
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-dim)" }}
      >
        // comment → ad · in real time
      </p>
    </div>
  );
}

/* ---------- Step label ---------- */

function StepLabel({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-6 w-6 place-items-center rounded-full font-mono text-[10px]"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "var(--text-muted)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {index}
      </span>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-dim)" }}
      >
        // {label}
      </span>
    </div>
  );
}

/* ---------- Raw comment card ---------- */
/*
  Looks like a generic Meta/Instagram comment row: avatar disc,
  handle, time, text. Only stylistic difference: subtle dark card
  bg + soft border so it sits on the dark studio backdrop without
  visually fighting the creative card.
*/
function RawCommentCard({
  testimonial,
  typeProgress,
  keyId,
}: {
  testimonial: string;
  typeProgress: number;
  keyId: number;
}) {
  const visibleCount = Math.floor(typeProgress * testimonial.length);
  const visible = testimonial.slice(0, visibleCount);
  const stillTyping =
    visibleCount > 0 && visibleCount < testimonial.length;

  return (
    <div
      key={keyId}
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-soft)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-medium"
          style={{
            backgroundColor: "rgba(139,127,232,0.18)",
            color: "var(--purple-soft)",
            border: "1px solid rgba(139,127,232,0.35)",
          }}
        >
          ac
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-white">
            @anon_customer
          </span>
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--text-dim)" }}
          >
            instagram · 17m ago
          </span>
        </div>
        <span
          className="ml-auto rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{
            color: "var(--purple-soft)",
            backgroundColor: "rgba(139,127,232,0.10)",
            border: "1px solid rgba(139,127,232,0.25)",
          }}
        >
          captured
        </span>
      </div>

      <p
        className="mt-3 text-base leading-relaxed text-white/95"
        style={{ minHeight: "2.6em" }}
      >
        {visible}
        {stillTyping && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[2px] animate-caret-blink bg-white/80"
          />
        )}
      </p>

      <div className="mt-4 flex items-center gap-4 text-white/40">
        <Reaction icon={<HeartIcon />} count="1.2k" />
        <Reaction icon={<ReplyIcon />} count="48" />
        <Reaction icon={<ShareIcon />} count="12" />
      </div>
    </div>
  );
}

function Reaction({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: string;
}) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px]">
      {icon}
      {count}
    </span>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21s-7-4.35-9-8.5C1.5 9 4 5.5 7.5 5.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5C20 5.5 22.5 9 21 12.5 19 16.65 12 21 12 21z" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
    </svg>
  );
}
