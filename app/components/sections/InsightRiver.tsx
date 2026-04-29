"use client";

/*
  VARIANT A — THE RIVER

  Concept: customer comments stream down through the section. Most fall
  through and dissolve; a few veer right and land on a glowing lime
  "catcher" — your product visualized.

  Build:
   - Pre-render N comment cards, each with its own animation-delay.
   - All cards use one of two CSS keyframe animations (riverFall / riverCatch)
     defined in tailwind.config — no per-frame React work.
   - Two indices in the array are flagged as "caught" — those cards veer
     right mid-fall and land on the catcher rail.
   - A counter at the top ticks "caught / wasted" via setInterval to make
     the ratio feel cumulative even though the cards themselves loop.
*/

import { useEffect, useState } from "react";

const COMMENTS = [
  "this serum literally changed my skin in 2 weeks 😭",
  "best $40 I've spent this year, running back for a 2nd",
  "okay this product is unreasonably good",
  "shipped fast, packaging is so cute",
  "I've tried 6 brands. This is the one",
  "wait the founder replied to my DM??",
  "you guys actually listen to feedback",
  "telling literally everyone about this",
  "scent is unreal, broke my whole routine",
  "obsessed obsessed obsessed",
  "my friends keep asking what I'm using",
  "got my mom one for her birthday, she loves it",
];

const CAUGHT_INDICES = new Set([4, 11]);

export default function InsightRiver() {
  const [tally, setTally] = useState({ caught: 0, wasted: 0 });

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      const isCaught = CAUGHT_INDICES.has(i % COMMENTS.length);
      setTally((p) => ({
        caught: p.caught + (isCaught ? 1 : 0),
        wasted: p.wasted + (isCaught ? 0 : 1),
      }));
      i++;
    }, 700);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-[860px] overflow-hidden px-6 py-24 md:px-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT A — THE RIVER
        </p>
        <h2 className="mt-5 font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          Your customers say it{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            for free.
          </em>
          <br />
          You let it fall.
        </h2>
        <p
          className="mt-6 font-mono text-sm"
          style={{ color: "var(--text-dim)" }}
        >
          // caught: <span className="text-white">{tally.caught}</span>
          {"  "}·{"  "}
          wasted:{" "}
          <span style={{ color: "var(--purple-soft)" }}>{tally.wasted}</span>
        </p>
      </div>

      {/* The falling comments. They live behind the heading via z-0. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {COMMENTS.map((text, i) => {
          const caught = CAUGHT_INDICES.has(i);
          // Spread the spawn x-positions across 0–55% so caught cards still
          // have room to veer right onto the rail at ~85%.
          const left = 4 + ((i * 9) % 55);
          const delay = i * 0.65;
          return (
            <div
              key={i}
              className={`absolute top-0 max-w-[260px] rounded-2xl px-4 py-3 text-sm text-white/90 ${
                caught ? "animate-river-catch" : "animate-river-fall"
              }`}
              style={{
                left: `${left}%`,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                animationDelay: `${delay}s`,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      {/* The lime catcher rail — visual landing zone for the caught comments. */}
      <div className="pointer-events-none absolute right-6 top-[28vh] z-0 hidden h-[140px] w-[280px] md:block">
        <div
          className="h-full w-full rounded-2xl"
          style={{
            border: "1.5px dashed var(--spec-lime)",
            boxShadow: "0 0 40px var(--lime-glow)",
          }}
        />
        <p
          className="mt-3 font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // captured by your tool
        </p>
      </div>
    </section>
  );
}
