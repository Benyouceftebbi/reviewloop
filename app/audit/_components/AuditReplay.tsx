"use client";

/*
  AuditReplay
  -----------

  Standalone version of the landing page's "Variant A — The Replay"
  cinematic, sized for embedding inside the audit pages' "How it works"
  section. A single 4.2s morph turns one IG-style comment card into a
  warm-cream branded creative, then a "↻ play again" pill appears.

  This is a copy of the cinematic stage from app/components/sections/
  HowReplay.tsx — without the surrounding 3-step grid and without the
  section-level heading. The audit pages provide their own framing.

  Stages, all derived purely from `t` (ms elapsed):
     0–800ms     IG-style comment card (raw)
     800–1700ms  scan pulse sweeps across
     1600–2400ms brand colors slot in (cream background + dark border)
     2400–3400ms typewriter creative copy
     3400–4200ms lime ✓ "ready" tag fades in
     >= 4200ms   replay button appears, loop is idle

  The opening play is gated by an IntersectionObserver so the replay
  doesn't auto-fire below the fold.
*/

import { useEffect, useRef, useState } from "react";

const FULL_TEXT = "this serum literally changed my skin in 2 weeks";

export default function AuditReplay() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [t, setT] = useState(0);

  // Auto-start the FIRST play when the stage scrolls into view. After
  // it completes, only the replay button can re-trigger it.
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

  // Single RAF loop drives `t` for the duration of one play.
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
    requestAnimationFrame(() => setPlaying(true));
  };

  const elapsed = playing ? t : done ? 4200 : 0;
  const showStage = playing || done;
  const showScan = elapsed >= 800 && elapsed < 1700;
  const showBrand = elapsed >= 1600;
  const showText = elapsed >= 2400;
  const showReady = elapsed >= 3400;

  // Typewriter — reveal one character at a time inside the text window.
  const typewriterIndex = Math.floor(
    Math.min(1, Math.max(0, (elapsed - 2400) / 1000)) * FULL_TEXT.length
  );
  const visibleText = FULL_TEXT.slice(0, typewriterIndex);
  const seconds = (elapsed / 1000).toFixed(1);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div
        className="relative h-[260px] w-full max-w-[520px] overflow-hidden rounded-3xl transition-colors duration-500"
        style={{
          backgroundColor: showBrand ? "#F2E8D5" : "var(--bg-elevated)",
          border: showBrand
            ? "1px solid #E0D2B5"
            : "1px solid var(--border-subtle)",
        }}
      >
        {/* Scan pulse sweeps across only during the scan window. */}
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

        {/* Raw comment view — visible until the brand kit slots in. */}
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

        {/* Branded creative view — fades in as the brand kit lands. */}
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

      {/* Timer + replay control */}
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
            className="rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-white/5"
            style={{
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
            }}
          >
            ↻ play again
          </button>
        )}
      </div>
    </div>
  );
}
