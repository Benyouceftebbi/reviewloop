/*
  PAGE BACKGROUND — single shared canvas behind the entire page.

  Why this exists:
   Every section used to declare `backgroundColor: var(--bg-base)` AND
   plant its own purple-glow blob at the same top-left corner. As the
   user scrolled, that pattern restarted in every section — making the
   page read as a sequence of separate rooms instead of one continuous
   stage. This component replaces all that with ONE background that
   stretches behind everything, lit at deliberate vertical positions.

  Mechanics:
   - Mounted once at the top of <main>, absolutely positioned with
     `inset-0` so it fills the parent's full scroll height.
   - `-z-10` puts it behind every section's content.
   - Sections inside <main> are now transparent — they let this
     painting show through.
   - Trust intentionally re-asserts its own deeper background to read
     as "below the rhythm." FinalCTA also keeps its own canvas because
     the projector cone needs a true dark stage to draw on.

  Composition (top → bottom, percentages of total page height):
     0–10%   HERO ZONE — full dramatic lighting (matches the old
             HeroBackground): top-left purple source, diagonal beam,
             mid-zone kink, bottom-right cool blue.
     15–28%  Upper-mid atmospheric — soft purple drifting in from
             the right edge, diffuses through Insight + How sections.
     35–50%  Mid atmospheric — indigo from the left, lower opacity,
             travels through Demo + Showcase.
     55–68%  Lower-mid — purple from the right, warmer, sits behind
             UseCases + Compare.
     75–82%  Quiet zone — minimal lighting; Trust's own bg-deep
             dominates here intentionally.
     85–100% Late warmth — purple rising from left, prelude to the
             FinalCTA's projector cone.
   - A vertical fade-to-black at the very bottom cleans the edge
     before the footer.
*/

export default function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* ============ HERO ZONE (0-10%) — full dramatic lighting ============ */}

      {/* Top-left purple source. */}
      <div
        className="absolute h-[700px] w-[700px] rounded-full blur-[180px]"
        style={{
          top: "-200px",
          left: "-160px",
          backgroundColor: "var(--purple-glow)",
          opacity: 0.55,
        }}
      />

      {/* Diagonal beam — rotated rectangle with vertical gradient. */}
      <div
        className="absolute -rotate-[28deg] blur-[90px]"
        style={{
          top: "-4%",
          left: "8%",
          height: "60vh",
          width: "420px",
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.85) 0%, rgba(67,56,202,0.55) 45%, rgba(30,27,75,0) 100%)",
        }}
      />

      {/* Mid-page kink — bright concentrated indigo near the play thumb. */}
      <div
        className="absolute h-[520px] w-[380px] rounded-full blur-[110px]"
        style={{
          top: "5%",
          left: "18%",
          backgroundColor: "rgba(99,102,241,0.55)",
        }}
      />

      {/* Bottom-right cool blue — anchors the other end of the hero beam. */}
      <div
        className="absolute h-[600px] w-[800px] rounded-full blur-[160px]"
        style={{
          top: "5%",
          right: "-100px",
          backgroundColor: "rgba(29,78,216,0.45)",
        }}
      />

      {/* ============ UPPER-MID (15-28%) — soft purple right ============ */}
      <div
        className="absolute h-[900px] w-[900px] rounded-full blur-[220px]"
        style={{
          top: "16%",
          right: "-22%",
          backgroundColor: "rgba(99,102,241,0.32)",
        }}
      />

      {/* ============ MID (35-50%) — indigo left ============ */}
      <div
        className="absolute h-[1000px] w-[1000px] rounded-full blur-[240px]"
        style={{
          top: "36%",
          left: "-28%",
          backgroundColor: "rgba(67,56,202,0.3)",
        }}
      />

      {/* ============ LOWER-MID (55-68%) — purple right ============ */}
      <div
        className="absolute h-[900px] w-[900px] rounded-full blur-[220px]"
        style={{
          top: "55%",
          right: "-18%",
          backgroundColor: "rgba(79,70,229,0.32)",
        }}
      />

      {/* ============ LATE WARMTH (85-100%) — purple left, prelude to FinalCTA ============ */}
      <div
        className="absolute h-[900px] w-[900px] rounded-full blur-[220px]"
        style={{
          top: "84%",
          left: "-15%",
          backgroundColor: "rgba(99,102,241,0.38)",
        }}
      />

      {/* Bottom cleanup — fade slightly toward solid black so the
          page edge meets the footer cleanly. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[400px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,15,0.55) 100%)",
        }}
      />
    </div>
  );
}
