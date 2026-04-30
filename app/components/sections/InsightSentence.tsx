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
      // 130vh = the sticky inner pins for ~30vh of scroll. That's
      // enough for the word-by-word lighting animation to land
      // without leaving the user in a dead-air zone after the
      // animation completes. Was 200vh; trimmed to remove the empty
      // gap between this section and Section 3.
      style={{ minHeight: "130vh" }}
    >
      {/* No section bg / no per-section glow — the page-level
          PageBackground covers atmospheric lighting for this zone. */}

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

        {/*
          GROUNDING BLOCK — the bold line above is the punch; this
          immediately gives it specific, non-hype context. A short
          "For" line names the audience, three scannable pains
          mirror the product, and a closing line connects the
          problem to the promised output.
        */}
        <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-center md:bottom-14">
          <p
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--text-dim)" }}
          >
            {"// "}For DTC teams running Meta ads &amp; posting IG/FB
          </p>
          <ul
            className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-mono text-[11px]"
            style={{ color: "var(--text-dim)" }}
          >
            <li>creative takes weeks</li>
            <li aria-hidden>·</li>
            <li>voice gets polished away</li>
            <li aria-hidden>·</li>
            <li>hard to stay on-brand across formats</li>
          </ul>
          <p
            className="mx-auto max-w-[640px] text-balance text-sm leading-relaxed md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            You already have the best copy in your comments — you just
            can&apos;t ship it fast enough.
          </p>
        </div>
      </div>
    </section>
  );
}
