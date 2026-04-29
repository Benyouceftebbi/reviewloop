/*
  PAGE BACKGROUND — a single ambient lighting layer that spans the
  entire <main>, so every section sits on the same continuous canvas
  instead of each one re-painting its own dark rectangle.

  Pattern: a *zigzag* of large blurred glows that alternate from the
  left edge to the right edge as you scroll down the page. Colors
  rotate through the brand palette (purple → indigo → blue → purple)
  so the lighting feels like one continuous beam snaking through the
  page rather than 11 disconnected section ambients.

  Mounting: dropped as the first child of <main className="relative">
  with `absolute inset-0 -z-10`, so it covers the full document
  height. Sections must therefore use a transparent background so
  this layer shows through. The body keeps `bg-ink` as the deepest
  base tone, which provides contrast where no blob is overlapping.
*/
export default function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/*
        Each blob is positioned by a percentage of <main>'s total
        height. Sides alternate: L → R → L → R → … to form the
        zigzag. Colors rotate purple → indigo → blue so the
        chromatic temperature drifts as the eye travels down.

        Sizes are intentionally generous (700–820px) and blurs are
        heavy (160–200px) so adjacent blobs bleed into each other,
        masking the section seams that previously broke continuity.
      */}

      {/* 1. HERO — purple, top-left (matches the original hero source) */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-violet-700/55 blur-[180px]"
        style={{ top: "-4%", left: "-12%" }}
      />

      {/* 2. mid-hero highlight — indigo, top-right (the kink that bookends the hero) */}
      <div
        className="absolute h-[560px] w-[560px] rounded-full bg-indigo-500/55 blur-[150px]"
        style={{ top: "4%", right: "-8%" }}
      />

      {/* 3. logo strip → insight — blue, left */}
      <div
        className="absolute h-[680px] w-[680px] rounded-full bg-blue-700/45 blur-[170px]"
        style={{ top: "13%", left: "-14%" }}
      />

      {/* 4. how-it-works — violet, right */}
      <div
        className="absolute h-[700px] w-[700px] rounded-full bg-violet-600/45 blur-[180px]"
        style={{ top: "23%", right: "-12%" }}
      />

      {/* 5. demo feed — indigo, left */}
      <div
        className="absolute h-[720px] w-[720px] rounded-full bg-indigo-600/45 blur-[180px]"
        style={{ top: "33%", left: "-12%" }}
      />

      {/* 6. showcase — blue, right (cooler temperature midway down) */}
      <div
        className="absolute h-[640px] w-[640px] rounded-full bg-blue-600/40 blur-[160px]"
        style={{ top: "43%", right: "-10%" }}
      />

      {/* 7. use-cases — violet, left */}
      <div
        className="absolute h-[700px] w-[700px] rounded-full bg-violet-700/45 blur-[180px]"
        style={{ top: "53%", left: "-14%" }}
      />

      {/* 8. compare — indigo, right */}
      <div
        className="absolute h-[680px] w-[680px] rounded-full bg-indigo-700/45 blur-[170px]"
        style={{ top: "63%", right: "-12%" }}
      />

      {/* 9. results-log — blue, left */}
      <div
        className="absolute h-[660px] w-[660px] rounded-full bg-blue-700/40 blur-[160px]"
        style={{ top: "72%", left: "-10%" }}
      />

      {/* 10. trust + pricing — violet, right */}
      <div
        className="absolute h-[720px] w-[720px] rounded-full bg-violet-700/45 blur-[180px]"
        style={{ top: "81%", right: "-14%" }}
      />

      {/* 11. final CTA — indigo, left (warms back up before the projector) */}
      <div
        className="absolute h-[680px] w-[680px] rounded-full bg-indigo-600/45 blur-[170px]"
        style={{ top: "90%", left: "-12%" }}
      />

      {/* 12. footer — deep blue, right (anchors the page bottom) */}
      <div
        className="absolute h-[640px] w-[640px] rounded-full bg-blue-800/45 blur-[160px]"
        style={{ top: "97%", right: "-10%" }}
      />

      {/*
        Vertical fade — keeps the very bottom slightly deeper than
        the rest, so the footer area reads as the page's resting
        ground. Same trick the old HeroBackground used at hero scale,
        now applied at page scale.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />
    </div>
  );
}
