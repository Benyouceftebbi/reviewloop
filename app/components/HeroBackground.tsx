/*
  HERO BACKGROUND — extracted into its own component so it can wrap
  multiple sections (Hero + LogoStrip) and let the directional light
  beam bleed continuously across them.

  Recipe (same as before, but now lives at the page level):
   - Solid #0b0b0b base.
   - Top-left purple source.
   - Rotated diagonal beam (this is what creates the directional feel).
   - Mid-page hot spot near the hero's play thumbnail.
   - Cool blue glow in the bottom-right.
   - Subtle vertical fade at the bottom for volume.

  Use it inside any element that's `relative isolate overflow-hidden`.
  The component fills its parent with `absolute inset-0`.
*/
export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink">
      {/* Top-left purple source */}
      <div className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-violet-700/55 blur-[180px]" />

      {/* Diagonal beam — rotated rectangle with vertical gradient, blurred. */}
      <div
        className="absolute left-[8%] top-[-10%] h-[140%] w-[420px] -rotate-[28deg] blur-[90px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.85) 0%, rgba(67,56,202,0.55) 45%, rgba(30,27,75,0) 100%)",
        }}
      />

      {/* Mid-page kink — bright concentrated spot near the play thumb. */}
      <div className="absolute left-[18%] top-[42%] h-[520px] w-[380px] rounded-full bg-indigo-500/60 blur-[110px]" />

      {/* Bottom-right cool blue glow — anchors the other end of the beam. */}
      <div className="absolute -bottom-32 right-0 h-[600px] w-[800px] rounded-full bg-blue-700/45 blur-[160px]" />

      {/* Subtle vertical fade at the bottom — adds depth, makes the
          beam feel "volumetric" instead of like flat shapes. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
    </div>
  );
}
