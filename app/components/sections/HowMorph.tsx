"use client";

/*
  SECTION 3 — VARIANT C: THE MORPH

  Concept: a giant sentence — *Connect Meta. Catch testimonials. Post creatives.*
  Each phrase morphs IN PLACE into the actual UI it names as the user scrolls.
  The text doesn't get replaced — it transforms, so the words literally
  *become* the product.

  Implementation:
   - Section is ~250vh; inner container is `position: sticky` so it pins
     while the user scrolls past.
   - A scroll listener computes 0..1 progress through the section.
   - Progress maps to three bands (0..0.33, 0.33..0.66, 0.66..1).
   - Inside each band:
        sub 0..0.30  → text fully visible, UI hidden
        sub 0.30..0.70 → text fades + scaleY-stretches, UI fades in
        sub 0.70..1   → text hidden, UI fully visible
   - Text and UI occupy the same screen coordinates so the morph reads
     as a transformation, not a replacement.

  Generic UI surfaces — no Meta brand assets, no real Instagram chrome.
*/

import { useEffect, useRef, useState } from "react";

type Phrase = {
  pre?: string;       // optional non-italic lead-in word
  italic: string;     // the italic punch word
  post?: string;      // optional non-italic tail
  ui: "oauth" | "comment" | "creative";
};

const PHRASES: Phrase[] = [
  { pre: "", italic: "Connect.", ui: "oauth" },
  { pre: "", italic: "Catch.", ui: "comment" },
  { pre: "", italic: "Post.", ui: "creative" },
];

export default function HowMorph() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const passed = -rect.top;
      setProgress(Math.max(0, Math.min(1, passed / scrollable)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active phrase index (0..2) and sub-progress within it (0..1).
  const bandSize = 1 / PHRASES.length;
  const activeIndex = Math.min(
    PHRASES.length - 1,
    Math.floor(progress / bandSize)
  );
  const subProgress = (progress - activeIndex * bandSize) / bandSize;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "260vh" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-6 pt-12 md:px-20 md:pt-16">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
          >
            {"{/}"}&nbsp;&nbsp;VARIANT C — THE MORPH
          </p>
          <p
            className="mt-2 font-mono text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            // {Math.round(progress * 100)}% &nbsp;·&nbsp; phrase {activeIndex + 1} of 3
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          {/*
            Render only the active phrase. We'd render all three to allow
            cross-fade between phrases, but for clarity here we swap in/out
            with a quick fade based on sub-progress edges.
          */}
          {PHRASES.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 250ms var(--ease-reveal)",
                }}
              >
                {isActive && <PhraseStage phrase={p} sub={subProgress} />}
              </div>
            );
          })}
        </div>

        <p
          className="pb-10 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // scroll
        </p>
      </div>
    </section>
  );
}

/*
  PhraseStage — renders both the headline text and the UI in the same
  centered area, with opacity controlled by sub-progress.
*/
function PhraseStage({ phrase, sub }: { phrase: Phrase; sub: number }) {
  // Three timing bands inside the phrase.
  const morphStart = 0.3;
  const morphEnd = 0.7;
  // Smooth interp from 0..1 across the morph window.
  const morphAmount =
    sub <= morphStart
      ? 0
      : sub >= morphEnd
      ? 1
      : (sub - morphStart) / (morphEnd - morphStart);

  const textOpacity = 1 - morphAmount;
  const uiOpacity = morphAmount;
  // Letters elongate slightly during morph (peaks mid-window).
  const stretch = Math.sin(morphAmount * Math.PI) * 0.15;

  return (
    <div className="relative flex h-[440px] w-full max-w-[860px] items-center justify-center">
      {/* TEXT */}
      <h2
        className="absolute font-medium leading-none tracking-[-0.02em] text-white text-[clamp(56px,9vw,128px)]"
        style={{
          opacity: textOpacity,
          transform: `scaleY(${1 + stretch}) scaleX(${1 - stretch * 0.3})`,
          transition: "opacity 200ms linear",
        }}
      >
        {phrase.pre}
        <em
          className="font-display italic font-normal"
          style={{ color: "var(--purple-soft)" }}
        >
          {phrase.italic}
        </em>
        {phrase.post}
      </h2>

      {/* UI */}
      <div
        className="absolute"
        style={{
          opacity: uiOpacity,
          transform: `scale(${0.92 + 0.08 * uiOpacity})`,
          transition: "opacity 200ms linear, transform 200ms linear",
        }}
      >
        {phrase.ui === "oauth" && <OAuthDemo />}
        {phrase.ui === "comment" && <CommentDemo />}
        {phrase.ui === "creative" && <CreativeDemo />}
      </div>
    </div>
  );
}

/* ---------- UI demos ---------- */

function OAuthDemo() {
  return (
    <button
      className="flex items-center gap-3 rounded-2xl px-8 py-5 text-lg font-semibold text-white shadow-2xl"
      style={{
        backgroundColor: "#1877F2",
        boxShadow: "0 0 60px rgba(24, 119, 242, 0.35)",
      }}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-sm">
        ⌘
      </span>
      Sign in with your social account
      <span className="ml-3 font-mono text-xs opacity-70">{"// secure oauth"}</span>
    </button>
  );
}

function CommentDemo() {
  return (
    <div
      className="relative w-[440px] overflow-hidden rounded-2xl p-5"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-9 w-9 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />
        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          @anon_customer · 2h
        </span>
      </div>
      <p className="mt-3 text-base text-white/90">
        this serum literally changed my skin in 2 weeks
      </p>
      {/* Lime detection sweep */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[60%] animate-scan-sweep"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--spec-lime) 50%, transparent 100%)",
          opacity: 0.45,
          filter: "blur(10px)",
        }}
      />
      <p
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--spec-lime)" }}
      >
        // testimonial detected
      </p>
    </div>
  );
}

function CreativeDemo() {
  return (
    <div
      className="flex w-[440px] flex-col justify-between rounded-2xl p-7 aspect-[5/4] shadow-2xl"
      style={{ backgroundColor: "#F2E8D5" }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "#1A1A1A", opacity: 0.7 }}
      >
        // your brand
      </span>
      <p
        className="font-display italic font-normal text-[28px] leading-[1.15]"
        style={{ color: "#1A1A1A" }}
      >
        this serum literally changed my skin in 2 weeks
      </p>
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px]"
          style={{ color: "rgba(0,0,0,0.5)" }}
        >
          @anon_customer
        </span>
        <span
          className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            backgroundColor: "var(--spec-lime)",
            color: "#1A1A1A",
            boxShadow: "0 0 24px var(--lime-glow)",
          }}
        >
          ✓ ready
        </span>
      </div>
    </div>
  );
}
