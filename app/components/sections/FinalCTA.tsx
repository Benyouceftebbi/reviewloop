"use client";

/*
  SECTION 12 — FINAL CTA (Variant A: The Mirror Resolution, refreshed)

  The page's bookend. A single sentence in serif italic, one lime pill,
  one line of fine print — set against a dramatic diagonal purple beam
  cutting in from the top-right corner.

  Restraint:
   - Three pieces of copy total: heading + button + fine print.
   - No eyebrow, no bullets, no recap, no second CTA.
   - Generous vertical padding — the page exhales here.

  Animations:
   - Reveal-on-scroll fade-up at 700ms, staggered 0 / 200 / 380ms.
   - The beam itself is alive: a slow 9s opacity+rotation sweep on the
     cone shape, a 7s out-of-phase drift on its bright inner core, and
     a row of low-opacity dust motes drifting downward through the
     light at 12s intervals. Reads as a living spotlight, not a static
     gradient.
   - The CTA pill keeps its 3s lime-glow micro-pulse.
*/

import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Shared reveal style — opacity fade + 12px translateY, 700ms.
  const reveal = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 700ms var(--ease-reveal) ${delay}ms, transform 700ms var(--ease-reveal) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="get-started"
      className="relative overflow-hidden px-6 py-28 md:py-[180px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <BeamLight />

      <div className="relative mx-auto flex max-w-[960px] flex-col items-center text-center">
        <h2
          className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-white text-[clamp(44px,7.2vw,88px)]"
          style={reveal(0)}
        >
          Your best{" "}
          <em className="italic" style={{ color: "var(--purple-soft)" }}>
            ads
          </em>{" "}
          are already in your DMs.
        </h2>

        <div className="mt-10 md:mt-14" style={reveal(200)}>
          <ConnectPill />
        </div>

        <p
          className="mt-7 font-mono text-[11px] md:text-xs"
          style={{
            color: "var(--text-dim)",
            letterSpacing: "0.08em",
            ...reveal(380),
          }}
        >
          10 free creatives. No credit card. Disconnect anytime.
        </p>
      </div>
    </section>
  );
}

/* ---------- Beam light ---------- */
/*
  Three layered elements compose the diagonal spotlight from the
  top-right corner:

   1. CONE — a clip-path polygon filled with a vertical purple
      gradient, rotated ~6deg, blurred ~36px. This is the visible
      shape of the light. animate-beam-sweep gives it a slow
      breathing rotation + opacity drift.

   2. CORE — a tall rotated radial-gradient ellipse anchored near
      the top-right. It's the bright lavender highlight inside the
      cone. animate-beam-core drifts it slightly out of phase with
      the cone above so the highlight appears to move within the
      light.

   3. MOTES — three tiny low-opacity circles seeded at different
      positions and animation delays, drifting downward along the
      beam axis. They give the light texture without performing.

   Plus two ambient blurred blobs at the corner for color depth,
   and a subtle full-section vignette at the bottom-left to keep
   the headline area readable.
*/
function BeamLight() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* (1) CONE — clip-path polygon, slow sweep */}
      <div
        className="absolute right-0 top-0 h-[160%] w-[75%] origin-top-right animate-beam-sweep"
        style={{
          background:
            "linear-gradient(200deg, rgba(170, 100, 240, 0.55) 0%, rgba(138, 71, 217, 0.40) 22%, rgba(110, 58, 199, 0.22) 45%, rgba(79, 70, 229, 0.08) 70%, transparent 88%)",
          clipPath: "polygon(55% 0, 100% 0, 100% 22%, 8% 100%, 32% 100%)",
          filter: "blur(36px)",
        }}
      />

      {/* (2) CORE — bright inner highlight, drifts out of phase */}
      <div
        className="absolute -top-24 right-[-6%] h-[760px] w-[440px] rotate-[28deg] animate-beam-core"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(196, 130, 255, 0.85), rgba(138, 71, 217, 0.45) 35%, rgba(79, 70, 229, 0.15) 60%, transparent 78%)",
          filter: "blur(56px)",
        }}
      />

      {/* Ambient corner glow blobs for color depth */}
      <div
        className="absolute -right-28 -top-28 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(155, 81, 224, 0.42)" }}
      />
      <div
        className="absolute right-[10%] top-[28%] h-[360px] w-[360px] rounded-full blur-[110px]"
        style={{ backgroundColor: "rgba(79, 70, 229, 0.22)" }}
      />

      {/* (3) MOTES — three drifting particles along the beam axis */}
      <Mote top="6%"  right="18%" delay="0s"   size={4} opacity={0.45} />
      <Mote top="3%"  right="32%" delay="3.4s" size={3} opacity={0.35} />
      <Mote top="10%" right="9%"  delay="6.8s" size={5} opacity={0.5}  />
      <Mote top="2%"  right="24%" delay="9.2s" size={2} opacity={0.4}  />

      {/* Bottom-left vignette to keep headline crisp on dark side */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 100%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />
    </div>
  );
}

/* A single drifting dust mote inside the beam. */
function Mote({
  top,
  right,
  delay,
  size,
  opacity,
}: {
  top: string;
  right: string;
  delay: string;
  size: number;
  opacity: number;
}) {
  return (
    <span
      className="absolute block rounded-full animate-beam-motes"
      style={{
        top,
        right,
        width: size,
        height: size,
        backgroundColor: `rgba(220, 180, 255, ${opacity})`,
        boxShadow: "0 0 8px rgba(196, 130, 255, 0.6)",
        animationDelay: delay,
        filter: "blur(0.5px)",
      }}
    />
  );
}

/* ---------- Connect pill ---------- */
/*
  A single lime pill with an inset darker-tinted circle on the left
  that holds the arrow icon — matches the reference image's compact,
  one-piece silhouette. The whole anchor is the hover group:
   - On hover the pill flips to white and the inner circle darkens.
   - The arrow has an "endless arrow" column that slides up on hover
     so a second arrow rises into place — same micro-motion as the
     hero's CTA, kept consistent across the page.
   - The lime-glow micro-pulse (3s loop) lives on the outer pill.
*/
function ConnectPill() {
  return (
    <a
      href="#"
      className="group relative inline-flex items-center rounded-full py-2 pl-2 pr-6 md:pr-8 animate-cta-pulse transition-colors duration-300 hover:bg-white"
      style={{ backgroundColor: "var(--spec-lime)", color: "#1A1A1A" }}
    >
      <span
        className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full md:h-11 md:w-11"
        style={{
          backgroundColor: "rgba(20, 28, 8, 0.18)",
          boxShadow: "inset 0 0 0 1px rgba(20, 28, 8, 0.28)",
        }}
      >
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2">
          <span className="flex h-10 items-center justify-center md:h-11">
            <ArrowRight />
          </span>
          <span className="flex h-10 items-center justify-center md:h-11">
            <ArrowRight />
          </span>
        </span>
      </span>

      <span className="ml-3 text-[15px] font-medium md:text-[16px]">
        Connect your Meta account.
      </span>
    </a>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] shrink-0"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
