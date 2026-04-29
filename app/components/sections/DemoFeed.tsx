"use client";

/*
  SECTION 4 — VARIANT C: THE LIVE FEED

  Layout:
   - Left/top: a vertical scrolling comment feed (CSS-driven loop).
   - Right/bottom: a stack of "captured" creatives.
   - Tap any comment in the feed → it lifts off, glides to the captured
     stack, morphs into a creative card.

  Mechanics:
   - The feed uses the existing `feed-scroll` keyframe (translateY 0→-50%)
     with PAIRS rendered twice for seamless loop.
   - On viewport entry, after 1.8s, a synthetic capture fires on a fixed
     index — passive scrollers see the demo unfold once.
   - Each capture rotates through brand kits deterministically so 6
     captures show the full range.
*/

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { BRANDS, TESTIMONIALS, CreativeCard } from "./_demoData";

type Captured = {
  id: number;
  testimonialIdx: number;
  brandIdx: number;
  progress: number;
  startedAt: number;
};

const CAPTURE_BUILD_MS = 3000;
const SWIPE_THRESHOLD = 80; // px — drag past this to commit a swipe

export default function DemoFeed() {
  const ref = useRef<HTMLElement>(null);
  const cycleRef = useRef(0);
  const triggeredRef = useRef(false);
  const [captured, setCaptured] = useState<Captured[]>([]);
  const [now, setNow] = useState(0); // tick for progress calculation

  // RAF loop for animating each captured card's progress.
  useEffect(() => {
    if (captured.length === 0) return;
    let raf = 0;
    const tick = (t: number) => {
      setNow(t);
      const stillBuilding = captured.some(
        (c) => t - c.startedAt < CAPTURE_BUILD_MS
      );
      if (stillBuilding) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [captured.length]);

  // Auto-capture once on viewport entry.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setTimeout(() => capture(0), 1800);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = (testimonialIdx: number) => {
    const brandIdx = cycleRef.current % BRANDS.length;
    cycleRef.current += 1;
    setCaptured((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        testimonialIdx,
        brandIdx,
        progress: 0,
        startedAt: performance.now(),
      },
    ]);
  };

  const clear = () => {
    setCaptured([]);
    cycleRef.current = 0;
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      // bg now provided by the page-wide <PageBackground /> layer
      style={{ backgroundColor: "transparent" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT C — THE LIVE FEED
        </p>
        <h2 className="mt-5 max-w-[820px] font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(34px,4.4vw,60px)]">
          Tap any comment.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Keep it.
          </em>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px] md:gap-10">
          {/* FEED — left on desktop, top on mobile */}
          <Feed onCapture={capture} />

          {/* CAPTURED DECK — right on desktop, bottom on mobile */}
          <Deck captured={captured} now={now} onClear={clear} />
        </div>

        <p
          className="mt-8 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // each tap rotates through the 6 brand archetypes — see the range
        </p>
      </div>
    </section>
  );
}

/*
  Feed — vertical scrolling comments. The track is a flex column with
  TWO copies of TESTIMONIALS animating translateY 0 → -50% on a 24s
  loop. Tapping a comment fires onCapture(index).

  We use `pointer-events-auto` on the cards specifically so the moving
  parent can be tap-targets despite being mid-animation.
*/
function Feed({ onCapture }: { onCapture: (index: number) => void }) {
  return (
    <div
      className="relative h-[440px] overflow-hidden rounded-3xl md:h-[580px]"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute left-5 top-5 z-10 font-mono text-[10px] uppercase"
        style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
      >
        // live feed
      </span>

      <div className="absolute inset-x-0 top-0 flex flex-col gap-3 p-5 animate-feed-scroll">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
          const realIdx = i % TESTIMONIALS.length;
          return (
            <button
              key={i}
              onClick={() => onCapture(realIdx)}
              className="text-left rounded-2xl p-4 transition-transform active:scale-[0.98] hover:scale-[1.015]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                />
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  @anon_customer · {(realIdx + 1) * 17}m
                </span>
              </div>
              <p className="mt-2 text-sm text-white/90">{t}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/*
  Deck — captured creatives stacked like a deck of cards.

  Behavior:
   - Most recent capture is on top.
   - Older captures stack BEHIND with progressively larger offsets,
     rotation, and lower opacity so the stack reads as physical depth.
   - The TOP card is draggable left/right (touch + mouse via Pointer
     Events). Drag past SWIPE_THRESHOLD commits a swipe — the top card
     animates off-screen and the next-newest card snaps into the top.
   - Prev/Next buttons mirror the same action for non-swipe users.

  When a fresh capture is added, deckIdx auto-advances to it so the
  newly-arrived card is what the user sees building.
*/
function Deck({
  captured,
  now,
  onClear,
}: {
  captured: Captured[];
  now: number;
  onClear: () => void;
}) {
  // Index into `captured` of the card currently on top of the deck.
  // captured.length - 1 = newest is on top.
  const [deckIdx, setDeckIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  // When a new capture is pushed, jump the deck to it (newest on top).
  useEffect(() => {
    if (captured.length === 0) return;
    setDeckIdx(captured.length - 1);
  }, [captured.length]);

  const next = () =>
    setDeckIdx((i) => Math.min(captured.length - 1, i + 1));
  const prev = () => setDeckIdx((i) => Math.max(0, i - 1));

  const onPointerDown = (e: ReactPointerEvent) => {
    if (captured.length <= 1) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    setDrag(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (drag < -SWIPE_THRESHOLD) prev();      // swipe left → older card forward
    else if (drag > SWIPE_THRESHOLD) next();  // swipe right → newer card forward
    setDrag(0);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
        >
          // your stack ({captured.length})
        </p>
        {captured.length > 0 && (
          <button
            onClick={onClear}
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-dim)" }}
          >
            reset
          </button>
        )}
      </div>

      {/* DECK STAGE */}
      <div
        className="relative h-[280px] select-none md:h-[340px]"
        style={{ touchAction: "pan-y" }}
      >
        {captured.length === 0 && (
          <div
            className="absolute inset-0 grid place-items-center rounded-2xl"
            style={{
              border: "1.5px dashed var(--border-soft)",
              color: "var(--text-dim)",
            }}
          >
            <p className="font-mono text-xs">// tap a comment to start</p>
          </div>
        )}

        {/*
          Render up to 4 cards: the top card + 3 behind it.
          `depth` = how far behind the top: 0 = on top, 1 = 1 behind, ...
        */}
        {captured.map((c, i) => {
          const depth = deckIdx - i;
          if (depth < 0) return null;       // newer cards (already revealed)
          if (depth > 3) return null;       // too deep — hide
          const isTop = depth === 0;

          // Build progress for THIS specific card.
          const elapsed = now - c.startedAt;
          const progress = Math.min(1, elapsed / CAPTURE_BUILD_MS);

          // Resting transform per depth: sit slightly down + alternating tilt.
          const offsetY = depth * 10;
          const offsetX = depth * 6;
          const tilt = depth === 0 ? 0 : (depth % 2 === 0 ? 1 : -1) * (depth * 1.6);
          const scale = 1 - depth * 0.045;

          // Top card during a drag: follow the pointer + slight rotation.
          const transform = isTop && dragging.current
            ? `translate(${drag}px, 0) rotate(${drag * 0.04}deg)`
            : `translate(${offsetX}px, ${offsetY}px) rotate(${tilt}deg) scale(${scale})`;

          return (
            <div
              key={c.id}
              className="absolute inset-0"
              style={{
                transform,
                opacity: 1 - depth * 0.18,
                zIndex: 100 - depth,
                transition: dragging.current && isTop
                  ? "none"
                  : "transform 350ms var(--ease-reveal), opacity 350ms",
                cursor: isTop && captured.length > 1 ? "grab" : "default",
              }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <CreativeCard
                brand={BRANDS[c.brandIdx]}
                testimonial={TESTIMONIALS[c.testimonialIdx]}
                progress={progress}
              />
            </div>
          );
        })}
      </div>

      {/* NAV BUTTONS + INDEX */}
      {captured.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={deckIdx === 0}
            aria-label="previous"
            className="grid h-10 w-10 place-items-center rounded-full transition-opacity disabled:opacity-30"
            style={{
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
            }}
          >
            ←
          </button>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums"
            style={{ color: "var(--text-dim)" }}
          >
            {captured.length === 0 ? 0 : deckIdx + 1} / {captured.length}
          </span>
          <button
            onClick={next}
            disabled={deckIdx >= captured.length - 1}
            aria-label="next"
            className="grid h-10 w-10 place-items-center rounded-full transition-opacity disabled:opacity-30"
            style={{
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
