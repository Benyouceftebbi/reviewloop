"use client";

/*
  AuditCommentsMarquee
  --------------------

  A low-opacity background marquee that scrolls horizontally right-to-left
  beneath the audit hero. Each tile is a "comment → creative" pair: a raw
  Instagram-style comment card on the left, an arrow, a finished branded
  creative card on the right — visually summarising the product promise.

  Implementation:
    - One single track containing the pair tiles TWICE in sequence.
    - The track translates from 0 to -50% on a CSS keyframe (defined in
      globals.css as `audit-marquee-track`). Because the duplicate sits
      flush at the end of the first run, the loop is seamless.
    - The track sits inside a viewport with horizontal mask-fade so the
      tiles dissolve at both edges instead of clipping hard.
    - The whole component is `pointer-events-none` and absolutely
      positioned so it never intercepts clicks on the hero copy/CTA.

  This is a *background* element only — the hero copy renders above it
  with z-10. Keep opacity around 0.18 so the gradient backgrounds and
  tokens stay readable.
*/

import { ARCHETYPES } from "@/app/components/sections/_showcaseData";

export default function AuditCommentsMarquee() {
  // Each archetype yields one comment → creative pair tile. We render
  // the tiles twice in sequence so the keyframe can translate -50%
  // and seamlessly wrap.
  const tiles = [...ARCHETYPES, ...ARCHETYPES];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // Soft horizontal fade at both edges so cards dissolve instead
        // of clipping hard against the section bounds.
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div
        className="audit-marquee-track flex h-full w-max items-center gap-6 px-6"
        style={{ opacity: 0.18 }}
      >
        {tiles.map((a, i) => (
          <PairTile key={`${a.id}-${i}`} archetype={a} />
        ))}
      </div>
    </div>
  );
}

/*
  PairTile — one [comment] → [creative] unit.

  Comment side stays on the dark canvas like a raw IG comment.
  Creative side flips to the warm cream brand-kit treatment used in
  the landing page replay so the visual story reads at a glance:
  raw → branded.
*/
function PairTile({
  archetype,
}: {
  archetype: { quote: string; handle: string; label: string };
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      {/* Raw comment card */}
      <div
        className="flex h-[120px] w-[260px] flex-col justify-center rounded-2xl px-4 py-3"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          />
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--text-dim)" }}
          >
            {archetype.handle} · 2h
          </span>
        </div>
        <p
          className="mt-2 line-clamp-3 text-[13px] leading-snug"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          {archetype.quote}
        </p>
      </div>

      {/* Arrow */}
      <span
        className="font-mono text-base"
        style={{ color: "var(--text-dim)" }}
      >
        →
      </span>

      {/* Branded creative card */}
      <div
        className="flex h-[120px] w-[220px] flex-col justify-between rounded-2xl px-4 py-3"
        style={{
          backgroundColor: "#F2E8D5",
          border: "1px solid #E0D2B5",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#1A1A1A" }}
          />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.2em]"
            style={{ color: "#1A1A1A" }}
          >
            // your brand
          </span>
        </div>
        <p
          className="font-display italic font-normal leading-tight text-[15px]"
          style={{ color: "#1A1A1A" }}
        >
          {archetype.quote.length > 60
            ? archetype.quote.slice(0, 58).trim() + "…"
            : archetype.quote}
        </p>
        <div className="flex items-center justify-end">
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em]"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#1A1A1A",
            }}
          >
            ✓ ready
          </span>
        </div>
      </div>
    </div>
  );
}
