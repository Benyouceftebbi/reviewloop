"use client";

/*
  SECTION 4 — VARIANT B: THE MATRIX

  Layout:
   - Top strip: 6 brand-kit thumbnails (horizontal scroll on mobile).
   - Center stage: the current creative.
   - Bottom strip: 6 testimonial pills.
   - Tap any axis to swap that side; creative rebuilds (~2s) around the
     unchanged axis.

  First-3s telegraph: on viewport entry, one brand thumbnail pulses with
  a lime ring at 0.8s, then one testimonial pulses at 2.0s. After that
  the section is at rest with a finished creative on display.

  Rebuild: tapping any thumb/pill triggers a new build cycle that runs
  the CreativeCard's progress 0..1 over BUILD_MS.
*/

import { useEffect, useRef, useState } from "react";
import { BRANDS, TESTIMONIALS, CreativeCard, BrandThumb } from "./_demoData";

const BUILD_MS = 2000;

export default function DemoMatrix() {
  const ref = useRef<HTMLElement>(null);
  const [bIdx, setBIdx] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const [building, setBuilding] = useState(false);
  const [progress, setProgress] = useState(1); // start fully built
  // Telegraph hints — which axis is currently pulsing for first-3s teaching.
  const [hint, setHint] = useState<"none" | "brand" | "test" | "done">("none");

  // Build animation
  useEffect(() => {
    if (!building) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / BUILD_MS);
      setProgress(p);
      if (p >= 1) {
        setBuilding(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [building]);

  // First-3s telegraph
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hint === "none") {
          setHint("brand");
          setTimeout(() => setHint("test"), 1200);
          setTimeout(() => setHint("done"), 2400);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hint]);

  const swapBrand = (idx: number) => {
    if (idx === bIdx || building) return;
    setBIdx(idx);
    setProgress(0);
    setBuilding(true);
  };
  const swapTest = (idx: number) => {
    if (idx === tIdx || building) return;
    setTIdx(idx);
    setProgress(0);
    setBuilding(true);
  };

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
          {"{/}"}&nbsp;&nbsp;VARIANT B — THE MATRIX
        </p>
        <h2 className="mt-5 max-w-[820px] font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(34px,4.4vw,60px)]">
          Six brands.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Six testimonials.
          </em>
          {" "}Tap to mix.
        </h2>

        {/* TOP STRIP — brand thumbs */}
        <div className="mt-12 -mx-2 overflow-x-auto px-2 pb-2">
          <div className="flex min-w-min items-center gap-3 md:justify-center">
            {BRANDS.map((b, i) => (
              <div
                key={b.id}
                className="relative"
                style={{
                  // pulse the first thumb during telegraph
                  animation: hint === "brand" && i === 0 ? "thumbPulse 1s ease-out" : undefined,
                }}
              >
                <BrandThumb brand={b} active={i === bIdx} onClick={() => swapBrand(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER STAGE */}
        <div className="mx-auto mt-8 max-w-[560px]">
          <CreativeCard
            brand={BRANDS[bIdx]}
            testimonial={TESTIMONIALS[tIdx]}
            progress={progress}
          />
        </div>

        {/* BOTTOM STRIP — testimonial pills */}
        <div className="mt-8 -mx-2 overflow-x-auto px-2 pb-2">
          <div className="flex min-w-min items-center gap-2 md:flex-wrap md:justify-center">
            {TESTIMONIALS.map((t, i) => {
              const active = i === tIdx;
              const pulsing = hint === "test" && i === 0;
              return (
                <button
                  key={i}
                  onClick={() => swapTest(i)}
                  className="shrink-0 rounded-full px-4 py-2 text-sm transition-all duration-300"
                  style={{
                    backgroundColor: active ? "rgba(197,248,42,0.12)" : "var(--bg-elevated)",
                    color: active ? "var(--spec-lime)" : "var(--text-muted)",
                    border: active
                      ? "1px solid var(--spec-lime)"
                      : "1px solid var(--border-subtle)",
                    maxWidth: "260px",
                    animation: pulsing ? "thumbPulse 1s ease-out" : undefined,
                  }}
                >
                  <span className="block truncate">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p
          className="mt-8 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // 36 combinations · tap any cell to remix
        </p>
      </div>

      {/* Local keyframe for the telegraph pulse. */}
      <style>{`
        @keyframes thumbPulse {
          0%   { box-shadow: 0 0 0 0 var(--spec-lime); }
          50%  { box-shadow: 0 0 0 8px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>
    </section>
  );
}
