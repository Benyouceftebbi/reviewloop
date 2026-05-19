"use client";

/*
  AuditCommentsMarquee
  --------------------

  A low-opacity background marquee that fills the entire hero with
  three stacked horizontal rows of "comment → creative" pair tiles:

    Row 1 — scrolls left  (slow)
    Row 2 — scrolls right (medium, reversed)
    Row 3 — scrolls left  (medium)

  Each tile is a raw IG-style comment card, an arrow, and a finished
  branded creative card — visually summarising the product promise.

  Implementation:
    - Each row contains the pair tiles TWICE in sequence; the keyframe
      translates the track -50% (or +50% for the reversed row), so the
      duplicate sits flush at the wrap point and the loop is seamless.
    - Rows are stacked with `flex-col` and `justify-between` inside a
      vertically-padded full-height viewport so they spread across the
      whole hero, not a single line.
    - The viewport has both horizontal AND vertical mask-fade so tiles
      dissolve at the edges rather than clipping hard against the
      hero's CTA / copy.
    - Each row uses a different archetype offset so adjacent rows
      don't show identical tiles stacked on top of each other.
    - Whole component is `pointer-events-none` and absolutely
      positioned — never intercepts clicks on the hero.
*/

import { ARCHETYPES } from "@/app/components/sections/_showcaseData";

// Rotate the archetype list so each row starts at a different tile,
// preventing visible vertical "columns" of identical pairs.
function rotate<T>(arr: T[], n: number): T[] {
  const k = ((n % arr.length) + arr.length) % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

export default function AuditCommentsMarquee() {
  const row1 = [...ARCHETYPES, ...ARCHETYPES];
  const row2 = [...rotate(ARCHETYPES, 2), ...rotate(ARCHETYPES, 2)];
  const row3 = [...rotate(ARCHETYPES, 4), ...rotate(ARCHETYPES, 4)];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // Soft fade at all four edges so cards dissolve into the hero
        // background instead of clipping hard against the section.
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        maskComposite: "intersect",
      }}
    >
      <div
        className="flex h-full flex-col justify-between py-6"
        style={{ opacity: 0.16 }}
      >
        <Row tiles={row1} variant="slow" />
        <Row tiles={row2} variant="reverse" />
        <Row tiles={row3} variant="default" />
      </div>
    </div>
  );
}

function Row({
  tiles,
  variant,
}: {
  tiles: { id: string; quote: string; handle: string; label: string }[];
  variant: "default" | "slow" | "reverse";
}) {
  const trackClass =
    variant === "slow"
      ? "audit-marquee-track-slow"
      : variant === "reverse"
        ? "audit-marquee-track-reverse"
        : "audit-marquee-track";

  return (
    <div className={`${trackClass} flex w-max items-center gap-6 px-6`}>
      {tiles.map((a, i) => (
        <PairTile key={`${a.id}-${i}`} archetype={a} />
      ))}
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
