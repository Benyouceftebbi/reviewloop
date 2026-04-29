"use client";

/*
  SECTION 3 — VARIANT A: THE REPLAY

  Concept: a single, deliberate 4.2s cinematic morphs ONE comment into ONE
  finished branded creative on a continuous stage. After it ends, a
  "↻ play again — 4.2s" button appears. A live timer ticks under the
  stage so the speed reads explicitly.

  Implementation:
   - One `<Stage>` element holds the morphing card.
   - A single requestAnimationFrame loop drives `t` (ms elapsed).
   - Visual states are derived purely from `t`:
        0–800ms     IG-style comment card (raw)
        800–1600ms  scan pulse sweeps across
        1600–2400ms brand colors slot in (background + border tint)
        2400–3400ms typewriter creative copy + tiny brand logo
        3400–4200ms lime ✓ "ready to post" tag
   - When t >= 4200, a replay button fades in.

  Generic-looking comment + creative — no real brand surfaces or
  trademarks reproduced.
*/

import { useEffect, useRef, useState } from "react";

const FULL_TEXT = "this serum literally changed my skin in 2 weeks";

export default function HowReplay() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [t, setT] = useState(0);

  // Trigger when the stage enters the viewport. Once done, viewport
  // re-entry alone won't re-trigger — only the replay button can.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing && !done) {
          setPlaying(true);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [playing, done]);

  // RAF loop — single source of truth for visual stages.
  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setT(elapsed);
      if (elapsed >= 4200) {
        setPlaying(false);
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const replay = () => {
    setDone(false);
    setT(0);
    // Defer the play start by one frame so React re-renders the stage
    // back to the idle state before the new RAF loop reads `t`.
    requestAnimationFrame(() => setPlaying(true));
  };

  const elapsed = playing ? t : done ? 4200 : 0;
  const showStage = playing || done;
  const showScan = elapsed >= 800 && elapsed < 1700;
  const showBrand = elapsed >= 1600;
  const showText = elapsed >= 2400;
  const showReady = elapsed >= 3400;

  // Typewriter — reveal one character per ~20ms inside the text window.
  const typewriterIndex = Math.floor(
    Math.min(1, Math.max(0, (elapsed - 2400) / 1000)) * FULL_TEXT.length
  );
  const visibleText = FULL_TEXT.slice(0, typewriterIndex);

  const seconds = (elapsed / 1000).toFixed(1);

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

      <div className="relative mx-auto max-w-[1280px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT A — THE REPLAY
        </p>
        <h2 className="mt-5 max-w-[900px] font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          From a customer comment to a branded ad,{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            in four seconds.
          </em>
        </h2>

        {/* THE STAGE */}
        <div className="mt-16 flex flex-col items-center">
          <div
            className="relative h-[260px] w-full max-w-[520px] overflow-hidden rounded-3xl transition-colors duration-500"
            style={{
              backgroundColor: showBrand
                ? "#F2E8D5" /* warm cream brand kit */
                : "var(--bg-elevated)",
              border: showBrand
                ? "1px solid #E0D2B5"
                : "1px solid var(--border-subtle)",
            }}
          >
            {/* SCAN PULSE — sweeps across only during the scan window. */}
            {showStage && showScan && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 z-20 w-[60%] animate-scan-sweep"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--spec-lime) 50%, transparent 100%)",
                  opacity: 0.5,
                  filter: "blur(8px)",
                }}
              />
            )}

            {/* RAW COMMENT VIEW — visible until the brand kit slots in. */}
            <div
              className="absolute inset-0 flex flex-col justify-center p-6 transition-opacity duration-300"
              style={{ opacity: showBrand ? 0 : 1 }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-dim)" }}
                >
                  @anon_customer · 2h
                </span>
              </div>
              <p className="mt-3 text-base text-white/90">{FULL_TEXT}</p>
            </div>

            {/* BRANDED CREATIVE VIEW — fades in as the brand kit lands. */}
            <div
              className="absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-500"
              style={{ opacity: showBrand ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: "#1A1A1A" }}
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#1A1A1A" }}
                >
                  // your brand
                </span>
              </div>

              <div className="flex-1 px-1 pt-4">
                <p
                  className="font-display italic font-normal leading-[1.15] text-[28px]"
                  style={{ color: "#1A1A1A", minHeight: "2.4em" }}
                >
                  {showText ? visibleText : ""}
                  {showText && !showReady && (
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[2px] animate-caret-blink"
                      style={{ backgroundColor: "#1A1A1A" }}
                    />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "rgba(0,0,0,0.5)" }}
                >
                  @anon_customer
                </span>
                <span
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    backgroundColor: showReady ? "var(--spec-lime)" : "transparent",
                    color: showReady ? "#1A1A1A" : "transparent",
                    boxShadow: showReady ? "0 0 24px var(--lime-glow)" : "none",
                  }}
                >
                  ✓ ready
                </span>
              </div>
            </div>
          </div>

          {/* TIMER + REPLAY */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p
              className="font-mono text-sm tabular-nums"
              style={{ color: "var(--text-dim)" }}
            >
              // {seconds}s
            </p>
            {done && (
              <button
                onClick={replay}
                className="rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300"
                style={{
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                ↻ play again
              </button>
            )}
          </div>

          <p
            className="mt-10 max-w-[480px] text-center font-mono text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            // industry average across 8,341 brands measured: 47 minutes per
            creative
          </p>
        </div>
      </div>
    </section>
  );
}
