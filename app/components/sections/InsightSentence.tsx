"use client";

/*
  VARIANT C — THE SENTENCE

  Concept: one sentence fills the viewport. As the user scrolls, words light
  up one at a time. Behind them, dim ghost-comments drift slowly across the
  canvas — your wasted testimonials, ghosting like dust in a beam.

  The "moment": when the italic word "free" lights up, a specific ghost
  comment in the background simultaneously dims to nearly invisible.
  The eye gets pulled from the lit word to the dying ghost a beat later,
  which is what lands the insight without ever stating a number.

  Build:
   - Outer section is 200vh; inner content is sticky and centered.
   - A scroll listener computes 0..1 progress through the section.
   - That progress maps to an `activeIndex` for the sentence words.
     Each word reveals from opacity 0.18 → 1 with a small delay band.
   - Two specific words ("fake" and "free") trigger a paired ghost dim.
   - 6 ghost-comments use a CSS keyframe (`ghost-drift`) for ambient motion.
*/

import { useEffect, useRef, useState } from "react";

type Word = { text: string; italic?: boolean; isPunch?: "fake" | "free" };

const SENTENCE: Word[] = [
  { text: "You're" },
  { text: "paying" },
  { text: "strangers" },
  { text: "thousands" },
  { text: "to" },
  { text: "fake", italic: true, isPunch: "fake" },
  { text: "what" },
  { text: "your" },
  { text: "customers" },
  { text: "already" },
  { text: "say" },
  { text: "for" },
  { text: "free.", italic: true, isPunch: "free" },
];

const GHOSTS = [
  "this changed my whole routine",
  "best $40 I've spent this year",
  "obsessed obsessed obsessed",
  "shipping was insane fast",
  "my friend asked what i was using",
  "ok fine you converted me",
];

export default function InsightSentence() {
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

  // Map progress (0..1) → which word is "active". Reserve a small lead-in
  // (0..0.1) so the user can read the eyebrow tag before words start lighting.
  const liftedProgress = Math.max(0, (progress - 0.1) / 0.85);
  const activeIndex = Math.floor(liftedProgress * SENTENCE.length);

  // Punch-word triggers — fire when their word is the active one.
  const fakeLit = SENTENCE.findIndex((w) => w.isPunch === "fake") <= activeIndex;
  const freeLit = SENTENCE.findIndex((w) => w.isPunch === "free") <= activeIndex;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "200vh" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-20">
        {/* Ghosts — sit behind the sentence, dim, drifting. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {GHOSTS.map((g, i) => {
            // Pair specific ghosts to specific punch words. When the punch
            // word lights up, the matched ghost dims to near-invisible —
            // the visual cost of letting the testimonial die.
            const pairsToFake = i === 1;
            const pairsToFree = i === 4;
            const dim =
              (pairsToFake && fakeLit) || (pairsToFree && freeLit);
            return (
              <span
                key={i}
                className="absolute font-mono text-sm md:text-base animate-ghost-drift"
                style={{
                  color: "var(--text-dim)",
                  opacity: dim ? 0.04 : 0.18,
                  top: `${10 + i * 13}%`,
                  left: `${(i * 23 + 5) % 78}%`,
                  animationDelay: `${-i * 3}s`,
                  transition: "opacity 700ms var(--ease-reveal)",
                }}
              >
                {g}
              </span>
            );
          })}
        </div>

        {/* Eyebrow tag, top of viewport while sentence is centered. */}
        <p
          className="absolute left-6 top-10 font-mono text-xs uppercase md:left-20"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT C — THE SENTENCE
        </p>

        {/* The sentence. */}
        <h2 className="relative z-10 mx-auto max-w-[1100px] text-center font-medium leading-[1.1] tracking-[-0.01em] text-white text-[clamp(36px,5.4vw,76px)]">
          {SENTENCE.map((w, i) => {
            const lit = i <= activeIndex;
            const isCurrent = i === activeIndex;
            return (
              <span
                key={i}
                className={`inline-block ${w.italic ? "font-display italic font-normal" : ""}`}
                style={{
                  marginRight: "0.28em",
                  opacity: lit ? 1 : 0.15,
                  color: w.italic && lit ? "var(--purple-soft)" : undefined,
                  textShadow:
                    isCurrent && w.italic
                      ? "0 0 32px var(--purple-glow)"
                      : "none",
                  transition: "all 450ms var(--ease-reveal)",
                }}
              >
                {w.text}
              </span>
            );
          })}
        </h2>

        {/* Tiny caption at bottom — mono fine print. */}
        <p
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // scroll
        </p>
      </div>
    </section>
  );
}
