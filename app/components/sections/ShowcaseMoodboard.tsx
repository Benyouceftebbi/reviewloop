"use client";

/*
  SECTION 5 — VARIANT C: THE MOODBOARD

  A designer's pinboard. Six creatives are absolutely positioned at
  varying tilts, sizes, and "object types" (poster, polaroid, sticker,
  square, tall portrait). They overlap slightly. Each has subtle
  shadow and small details — pin tacks, masking-tape corners — to
  read as physical artifacts rather than UI cells.

  Hover (or tap on mobile) lifts a creative — tilt corrects to 0,
  card scales 1.04, shadow extends, a small mono caption appears.

  Mobile: collapses to a vertical stack of objects. Tilts are reduced
  but preserved for character; the wall feel is lost but the variety
  of object types still proves the range.
*/

import { useState } from "react";
import { ARCHETYPES } from "./_showcaseData";
import type { Archetype } from "./_showcaseData";

// Layout positions for desktop wall. Coordinates are percentages
// inside the wall container (which is 1100px wide × 760px tall).
type WallPos = {
  left: string;
  top: string;
  rotate: number;        // resting tilt in degrees
  z: number;             // stacking order
};

const POSITIONS: WallPos[] = [
  { left: "3%",  top: "4%",  rotate: -3, z: 2 }, // skin
  { left: "26%", top: "10%", rotate:  2, z: 3 }, // street
  { left: "60%", top: "5%",  rotate: -1, z: 2 }, // wellness
  { left: "8%",  top: "52%", rotate:  4, z: 3 }, // tech
  { left: "42%", top: "55%", rotate: -5, z: 4 }, // food
  { left: "72%", top: "45%", rotate:  1, z: 3 }, // luxury
];

export default function ShowcaseMoodboard() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-[140px]"
      // bg now provided by the page-wide <PageBackground /> layer
      style={{ backgroundColor: "transparent" }}
    >
      {/* Per-section ambient blob removed — page-wide PageBackground
          now provides one continuous lighting layer. */}

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-20">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT C — MOODBOARD &nbsp;·&nbsp; BRAND SHOWCASE
        </p>
        <h2 className="mt-5 max-w-[900px] font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          Six brands.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Six designers.
          </em>{" "}
          Same product.
        </h2>
        <p
          className="mt-6 max-w-[640px] text-xl"
          style={{ color: "var(--text-muted)" }}
        >
          Curated, not generated. Hover any artifact to see the brief.
        </p>

        {/*
          DESKTOP WALL: absolute-positioned objects on a fixed-height
          canvas. We build a "paper" texture via subtle noise.
        */}
        <div
          className="relative mt-14 hidden md:block"
          style={{
            height: 760,
            // Faint warm-paper tint for the board itself — picks up
            // a hint of the section's purple bg, but warmer.
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)",
          }}
        >
          {ARCHETYPES.map((a, i) => (
            <PinnedObject
              key={a.id}
              a={a}
              pos={POSITIONS[i]}
              type={a.id}
            />
          ))}
        </div>

        {/* MOBILE STACK: same objects, vertical, smaller tilts. */}
        <div className="mt-14 flex flex-col gap-10 md:hidden">
          {ARCHETYPES.map((a) => (
            <div
              key={a.id}
              className="mx-auto"
              style={{
                transform: `rotate(${
                  (Math.random() - 0.5) * 4
                }deg)`,
              }}
            >
              <Object type={a.id} a={a} />
              <p
                className="mt-3 text-center font-mono text-[10px] uppercase"
                style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
              >
                {a.label} &nbsp;·&nbsp; {a.vibe}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Pinned object on the desktop wall ----- */
function PinnedObject({
  a,
  pos,
  type,
}: {
  a: Archetype;
  pos: WallPos;
  type: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="absolute"
      style={{
        left: pos.left,
        top: pos.top,
        zIndex: hover ? 50 : pos.z,
        transform: `rotate(${hover ? 0 : pos.rotate}deg) scale(${hover ? 1.04 : 1})`,
        transition: "transform 350ms var(--ease-reveal)",
        filter: hover
          ? "drop-shadow(0 24px 40px rgba(0,0,0,0.55))"
          : "drop-shadow(0 10px 20px rgba(0,0,0,0.35))",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Pin tack — small dark dot at the top center */}
      <span
        aria-hidden
        className="absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #5C5C5C 0%, #1A1A1A 70%)",
          boxShadow:
            "inset 0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)",
        }}
      />
      <Object type={type} a={a} />

      {/* Hover caption */}
      <p
        className="absolute left-0 right-0 -bottom-7 text-center font-mono text-[10px] uppercase"
        style={{
          color: "var(--text-dim)",
          letterSpacing: "0.2em",
          opacity: hover ? 1 : 0,
          transition: "opacity 250ms var(--ease-reveal)",
        }}
      >
        {a.label} &nbsp;·&nbsp; {a.vibe}
      </p>
    </div>
  );
}

/* ===================================================================
   OBJECT — six different physical artifact types per archetype.
   =================================================================== */
function Object({ type, a }: { type: string; a: Archetype }) {
  switch (type) {
    case "skin":
      return <SkinObject a={a} />;
    case "street":
      return <StreetObject a={a} />;
    case "wellness":
      return <WellnessObject a={a} />;
    case "tech":
      return <TechObject a={a} />;
    case "food":
      return <FoodObject a={a} />;
    case "luxury":
      return <LuxuryObject a={a} />;
    default:
      return null;
  }
}

/* 1) Skin — small square card with subtle paper grain. */
function SkinObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative h-[220px] w-[220px] overflow-hidden rounded-[6px] p-5"
      style={{
        backgroundColor: "#F2E8D5",
        color: "#1A1A1A",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.012) 0 2px, transparent 2px 4px)",
      }}
    >
      <span
        className="font-mono text-[8px] uppercase opacity-60"
        style={{ letterSpacing: "0.32em" }}
      >
        daily · since 22
      </span>
      <p
        className="absolute inset-x-5 top-1/2 -translate-y-1/2 font-display italic text-[15px] leading-[1.3]"
        style={{ fontWeight: 400 }}
      >
        {a.quote}
      </p>
      <span className="absolute bottom-4 right-5 font-mono text-[8px] opacity-50">
        {a.handle}
      </span>
    </div>
  );
}

/* 2) Streetwear — tall poster with bleed + tape corner. */
function StreetObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative h-[340px] w-[240px] overflow-hidden rounded-[2px] p-5"
      style={{
        backgroundColor: "#0A0A0A",
        color: "#FF3B30",
        backgroundImage:
          "radial-gradient(rgba(255,59,48,0.15) 1px, transparent 1.5px)",
        backgroundSize: "8px 8px",
      }}
    >
      {/* Masking tape corner */}
      <span
        aria-hidden
        className="absolute -top-2 -left-3 h-6 w-16"
        style={{
          backgroundColor: "rgba(232,220,180,0.7)",
          transform: "rotate(-12deg)",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        }}
      />
      <p
        className="font-mono text-[8px] uppercase"
        style={{
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.32em",
        }}
      >
        // drop 014
      </p>
      <p
        className="mt-2 leading-[0.85]"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 900,
          fontSize: 76,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        DRIP.
      </p>
      <p
        className="absolute bottom-12 left-5 right-5 leading-[1.05]"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 13,
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        {a.quote}
      </p>
      <div
        className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-[8px] uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        <span style={{ color: "#FF3B30" }}>{a.handle}</span>
        <span
          className="rounded-sm px-2 py-0.5"
          style={{ backgroundColor: "#FF3B30", color: "#0A0A0A" }}
        >
          $48
        </span>
      </div>
    </div>
  );
}

/* 3) Wellness — Polaroid-style, white border, square photo area. */
function WellnessObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative w-[260px] p-4 pb-12"
      style={{
        backgroundColor: "#FAFAF6",
        boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* photo area */}
      <div
        className="aspect-[4/3] w-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #E8EFD9 0%, #B5C3A0 50%, #6E8060 100%)",
        }}
      />
      <p
        className="mt-4 lowercase"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: 13,
          lineHeight: 1.4,
          color: "#22332B",
        }}
      >
        {a.quote.toLowerCase()}
      </p>
      <p
        className="absolute bottom-3 right-4 font-mono text-[8px] uppercase"
        style={{ color: "#22332B", opacity: 0.5, letterSpacing: "0.2em" }}
      >
        {a.handle}
      </p>
    </div>
  );
}

/* 4) Tech — sleek dark card with subtle reflective sheen. */
function TechObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative h-[230px] w-[300px] overflow-hidden rounded-[8px] p-6"
      style={{
        backgroundColor: "#0F1B2D",
        color: "#E8E4D8",
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
      }}
    >
      <div
        className="absolute inset-x-6 top-6 h-px"
        style={{ backgroundColor: "rgba(232,228,216,0.25)" }}
      />
      <div
        className="absolute right-0 top-0 h-full w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #B8C8D8 30%, #E8F0F8 50%, #B8C8D8 70%, transparent 100%)",
        }}
      />
      <p
        className="mt-6 font-mono text-[8px] uppercase"
        style={{ color: "#7AC4FF", letterSpacing: "0.4em" }}
      >
        obj. 04
      </p>
      <h3
        className="mt-1"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 28,
          letterSpacing: "-0.02em",
        }}
      >
        object
      </h3>
      <p
        className="mt-3 max-w-[240px] text-[12px] leading-[1.5]"
        style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
      >
        {a.quote}
      </p>
      <span
        className="absolute bottom-3 right-6 font-mono text-[8px] uppercase opacity-40"
        style={{ letterSpacing: "0.3em" }}
      >
        {a.handle}
      </span>
    </div>
  );
}

/* 5) Food — round-cornered sticker with peeling corner shadow. */
function FoodObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative h-[260px] w-[260px] overflow-visible rounded-[28px] p-5"
      style={{
        backgroundColor: "#FF7A2A",
        color: "#1A1A1A",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.35), inset -2px -3px 0 rgba(0,0,0,0.05)",
      }}
    >
      {/* peel corner — a small triangle "lifting" off the bottom-right */}
      <span
        aria-hidden
        className="absolute -bottom-1 -right-1 h-6 w-6"
        style={{
          backgroundColor: "#1A1A1A",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          opacity: 0.18,
          transform: "rotate(-2deg)",
        }}
      />
      <span
        className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
        style={{
          backgroundColor: "#FFE066",
          color: "#1A1A1A",
          transform: "rotate(8deg)",
          border: "2px solid #1A1A1A",
        }}
      >
        peel me
      </span>
      <div
        className="absolute inset-x-0 top-[28%] flex justify-center text-[100px]"
        aria-hidden
      >
        🍊
      </div>
      <p
        className="absolute bottom-12 left-5 right-5 lowercase"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 13,
          lineHeight: 1.3,
        }}
      >
        {a.quote}
      </p>
      <div
        className="absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase"
        style={{ letterSpacing: "0.1em" }}
      >
        <span style={{ fontWeight: 700 }}>SUNPEEL.CO</span>
        <span className="opacity-60">{a.handle}</span>
      </div>
    </div>
  );
}

/* 6) Luxury — tall narrow proof, all-caps wide-tracked serif. */
function LuxuryObject({ a }: { a: Archetype }) {
  return (
    <div
      className="relative h-[360px] w-[230px] overflow-hidden p-6"
      style={{
        backgroundColor: "#F4F1EC",
        color: "#1A1A1A",
        border: "1px solid #E0DBD2",
      }}
    >
      <p
        className="font-mono text-[8px] uppercase"
        style={{ letterSpacing: "0.5em" }}
      >
        maison &nbsp;—&nbsp; aw26
      </p>
      <div
        className="absolute inset-x-6 top-12 h-px"
        style={{ backgroundColor: "#1A1A1A" }}
      />
      <h3
        className="absolute left-6 right-6 top-[30%]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: 32,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.05,
        }}
      >
        AVELLA
      </h3>
      <p
        className="absolute bottom-16 left-6 right-6"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 11,
          lineHeight: 1.5,
        }}
      >
        {a.quote}
      </p>
      <div
        className="absolute inset-x-6 bottom-10 h-px"
        style={{ backgroundColor: "#1A1A1A" }}
      />
      <span
        className="absolute bottom-5 left-6 font-mono text-[8px] uppercase"
        style={{ letterSpacing: "0.3em" }}
      >
        {a.handle}
      </span>
    </div>
  );
}
