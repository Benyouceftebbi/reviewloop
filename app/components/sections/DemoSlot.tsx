"use client";

/*
  SECTION 4 — VARIANT A: THE SLOT MACHINE

  Layout:
   - Center stage: the building creative card.
   - Two reels above the stage: testimonial reel + brand-kit reel.
   - One giant lime PULL button below.
   - Mono counter underneath the button.

  Mechanics:
   - On scroll-into-view, the slot auto-pulls itself once (passive demo).
   - User taps PULL → reels spin for 1.6s with custom deceleration easing,
     they snap on a fresh random pair, then the creative builds for 2.8s.
   - PULL button is disabled during spin/build, glows again when ready.
   - Pull counter ticks up.

  Reel mechanic: the reel is a tall vertical strip of items. Spin = a
  large negative translateY transition. The transition timing function
  is heavily ease-out so the visible items rip past at first then crawl
  to a stop. End offset is calculated to land the chosen index at the
  visible window.
*/

import { useEffect, useRef, useState } from "react";
import { BRANDS, TESTIMONIALS, CreativeCard } from "./_demoData";

const ITEM_HEIGHT = 56;     // px — height of one reel cell
const SPIN_LOOPS = 5;       // full pass-throughs before stopping
const SPIN_DURATION = 1600; // ms
const BUILD_DURATION = 2800;

export default function DemoSlot() {
  const ref = useRef<HTMLElement>(null);
  const autoPlayed = useRef(false);

  const [tIdx, setTIdx] = useState(0);
  const [bIdx, setBIdx] = useState(0);
  const [tOffset, setTOffset] = useState(0);
  const [bOffset, setBOffset] = useState(0);
  const [phase, setPhase] = useState<"idle" | "spinning" | "building" | "ready">("idle");
  const [buildT, setBuildT] = useState(0);
  const [pullCount, setPullCount] = useState(47128);

  const pull = () => {
    if (phase === "spinning" || phase === "building") return;
    const newT = Math.floor(Math.random() * TESTIMONIALS.length);
    const newB = Math.floor(Math.random() * BRANDS.length);
    // Avoid consecutive identical pulls — feels boring otherwise.
    const finalT = newT === tIdx ? (newT + 1) % TESTIMONIALS.length : newT;
    const finalB = newB === bIdx ? (newB + 1) % BRANDS.length : newB;
    setTIdx(finalT);
    setBIdx(finalB);
    // Each spin extends offset further in the negative direction so
    // multiple loops of items appear to rip past.
    setTOffset((cur) => cur - (SPIN_LOOPS * TESTIMONIALS.length + finalT) * ITEM_HEIGHT);
    setBOffset((cur) => cur - ((SPIN_LOOPS + 1) * BRANDS.length + finalB) * ITEM_HEIGHT);
    setPhase("spinning");
    setPullCount((c) => c + 1);
  };

  // After the spin transition completes, kick off the build phase.
  useEffect(() => {
    if (phase !== "spinning") return;
    const t = setTimeout(() => setPhase("building"), SPIN_DURATION + 80);
    return () => clearTimeout(t);
  }, [phase]);

  // Build phase: drive a 0..1 progress over BUILD_DURATION with RAF.
  useEffect(() => {
    if (phase !== "building") return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setBuildT(elapsed);
      if (elapsed >= BUILD_DURATION) {
        setPhase("ready");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Auto-pull once when the section first enters the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoPlayed.current) {
          autoPlayed.current = true;
          // Slight delay so the user sees the resting state before the auto-pull.
          setTimeout(pull, 600);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildProgress = phase === "ready" ? 1 : phase === "building" ? buildT / BUILD_DURATION : 0;
  const buttonDisabled = phase === "spinning" || phase === "building";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1080px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT A — THE SLOT
        </p>
        <h2 className="mt-5 max-w-[820px] font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(34px,4.4vw,60px)]">
          Pull the lever.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Get a creative.
          </em>
        </h2>

        {/* SLOT WIDGET */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_400px] md:gap-12">
          {/* CREATIVE STAGE */}
          <div className="flex items-center">
            <div className="w-full">
              <CreativeCard
                brand={BRANDS[bIdx]}
                testimonial={TESTIMONIALS[tIdx]}
                progress={buildProgress}
              />
            </div>
          </div>

          {/* REELS + LEVER */}
          <div className="flex flex-col gap-5">
            <Reel
              label="testimonial"
              items={TESTIMONIALS}
              offset={tOffset}
              spinning={phase === "spinning"}
              currentIdx={tIdx}
            />
            <Reel
              label="brand kit"
              items={BRANDS.map((b) => b.id)}
              offset={bOffset}
              spinning={phase === "spinning"}
              currentIdx={bIdx}
              durationMs={SPIN_DURATION + 200} // slightly delayed stop, layered feel
            />

            <button
              onClick={pull}
              disabled={buttonDisabled}
              className="mt-2 rounded-full py-5 font-medium uppercase tracking-[0.18em] text-[#1A1A1A] transition-all duration-300"
              style={{
                backgroundColor: "var(--spec-lime)",
                boxShadow: buttonDisabled
                  ? "0 0 0 rgba(0,0,0,0)"
                  : "0 0 36px var(--lime-glow)",
                opacity: buttonDisabled ? 0.55 : 1,
                fontFamily: "var(--font-sans)",
              }}
            >
              {phase === "building" ? "building…" : phase === "spinning" ? "spinning…" : "↓ PULL"}
            </button>

            <p
              className="text-center font-mono text-xs tabular-nums"
              style={{ color: "var(--text-dim)" }}
            >
              // pulls today: {pullCount.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Reel — vertical strip of items, smooth-translates to a target offset
  on spin. CSS transition handles the deceleration via cubic-bezier.
*/
function Reel({
  label,
  items,
  offset,
  spinning,
  currentIdx,
  durationMs = SPIN_DURATION,
}: {
  label: string;
  items: string[];
  offset: number;
  spinning: boolean;
  currentIdx: number;
  durationMs?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        height: `${ITEM_HEIGHT}px`,
      }}
    >
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>

      <div
        className="will-change-transform"
        style={{
          transform: `translateY(${offset}px)`,
          transition: spinning
            ? `transform ${durationMs}ms cubic-bezier(0.05, 0.7, 0.1, 1)`
            : "none",
        }}
      >
        {/* Render items 6× so the spin always has fresh items to scroll past. */}
        {Array.from({ length: 6 }).flatMap((_, copy) =>
          items.map((it, i) => (
            <div
              key={`${copy}-${i}`}
              className="flex items-center px-4 text-sm text-white/90"
              style={{ height: `${ITEM_HEIGHT}px` }}
            >
              <span className="truncate">{it}</span>
            </div>
          ))
        )}
      </div>

      {/* Lime cell-flash when this index is the winning one and spin just stopped. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          boxShadow: !spinning && currentIdx >= 0 ? "inset 0 0 0 1px var(--spec-lime)" : "inset 0 0 0 1px transparent",
        }}
      />
    </div>
  );
}
