/*
  PAGE BACKGROUND — a single ambient lighting layer that spans the
  entire <main>, so every section sits on the same continuous canvas
  instead of each one re-painting its own dark rectangle.

  Composition (back → front):

    [base]   A continuous vertical gradient that drifts through the
             brand palette so there is *never* a dark gap between
             blobs. This is what eliminates the "section seam" that
             the user reported — without it, regions between blob
             positions could collapse to pure ink.

    [zigzag] A column of large blurred glows that alternate L → R →
             L → R as you scroll. Each blob's vertical extent
             overlaps the next by ~50% (top: 0%, 8%, 16%, …) so
             adjacent glows bleed into each other instead of leaving
             dark bands. Colors rotate violet → indigo → blue so the
             chromatic temperature drifts naturally down the page.

    [floor]  A subtle bottom-fade to ink so the page anchors visually
             into the footer, instead of glowing all the way to the
             very last pixel.

  Mounting: the very first child of <main className="relative isolate
  overflow-hidden">. Sections must keep their backgroundColor
  transparent so this layer shows through; the body's `bg-ink` is
  the deepest base tone where nothing else lights up.
*/
export default function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* ---------- (base) continuous chromatic wash ---------- */}
      {/*
        Vertical gradient through the brand palette. Stops are placed
        every ~12% so the color shift is gradual; alpha values are
        modest (0.18–0.28) so individual blobs above can still pop
        their own brighter spots on top.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(91,33,182,0.28) 0%, rgba(67,56,202,0.22) 14%, rgba(29,78,216,0.20) 28%, rgba(76,29,149,0.22) 42%, rgba(67,56,202,0.20) 56%, rgba(29,78,216,0.18) 70%, rgba(76,29,149,0.22) 84%, rgba(30,27,75,0.28) 100%)",
        }}
      />

      {/* ---------- (zigzag) overlapping blob column ---------- */}
      {/*
        Sides alternate L → R → L … to form the zigzag. Vertical
        spacing is 8% so blobs (≈700px / blur 180px) overlap each
        other vertically by roughly 50%, killing the seams.
      */}

      {/* 1. L  — violet (hero) */}
      <div
        className="absolute h-[820px] w-[820px] rounded-full bg-violet-700/45 blur-[200px]"
        style={{ top: "-6%", left: "-14%" }}
      />
      {/* 2. R  — indigo */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-indigo-500/45 blur-[180px]"
        style={{ top: "2%", right: "-10%" }}
      />
      {/* 3. L  — blue */}
      <div
        className="absolute h-[780px] w-[780px] rounded-full bg-blue-700/40 blur-[190px]"
        style={{ top: "10%", left: "-12%" }}
      />
      {/* 4. R  — violet */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-violet-600/40 blur-[180px]"
        style={{ top: "18%", right: "-12%" }}
      />
      {/* 5. L  — indigo */}
      <div
        className="absolute h-[800px] w-[800px] rounded-full bg-indigo-600/40 blur-[190px]"
        style={{ top: "26%", left: "-12%" }}
      />
      {/* 6. R  — blue */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-blue-600/38 blur-[180px]"
        style={{ top: "34%", right: "-10%" }}
      />
      {/* 7. L  — violet */}
      <div
        className="absolute h-[780px] w-[780px] rounded-full bg-violet-700/40 blur-[190px]"
        style={{ top: "42%", left: "-14%" }}
      />
      {/* 8. R  — indigo */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-indigo-700/40 blur-[180px]"
        style={{ top: "50%", right: "-12%" }}
      />
      {/* 9. L  — blue */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-blue-700/38 blur-[180px]"
        style={{ top: "58%", left: "-10%" }}
      />
      {/* 10. R — violet */}
      <div
        className="absolute h-[800px] w-[800px] rounded-full bg-violet-700/40 blur-[200px]"
        style={{ top: "66%", right: "-14%" }}
      />
      {/* 11. L — indigo */}
      <div
        className="absolute h-[780px] w-[780px] rounded-full bg-indigo-600/40 blur-[190px]"
        style={{ top: "74%", left: "-12%" }}
      />
      {/* 12. R — blue */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-blue-600/38 blur-[180px]"
        style={{ top: "82%", right: "-10%" }}
      />
      {/* 13. L — violet */}
      <div
        className="absolute h-[760px] w-[760px] rounded-full bg-violet-700/40 blur-[180px]"
        style={{ top: "90%", left: "-14%" }}
      />
      {/* 14. R — indigo (anchors the bottom near the final CTA) */}
      <div
        className="absolute h-[720px] w-[720px] rounded-full bg-indigo-700/38 blur-[170px]"
        style={{ top: "97%", right: "-12%" }}
      />

      {/* ---------- (floor) bottom-fade to ink ---------- */}
      {/*
        Eases the final 12% of the page down toward the body's
        `bg-ink`, so the footer reads as the page's resting ground
        and the last blob doesn't appear to "float" off the bottom.
      */}
      <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-b from-transparent to-ink/70" />
    </div>
  );
}
