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
   - PROJECTOR INTRO (4.2s, runs once when the section enters view):
       1. Lamp turns on far right (off-axis).
       2. Cone sweeps right → left across the canvas.
       3. Cone sweeps left → right.
       4. Cone settles centered, locked on the headline.
       At the moment of lock-in the headline "lights up" with a soft
       purple text-glow (textLightUp keyframe), and the ambient
       breathing animations (beam-sweep / beam-core) take over so the
       light keeps living gently after the intro.
   - The CTA pill keeps its 3s lime-glow micro-pulse.
*/

import { useEffect, useRef, useState } from "react";

// Must match the projector animation duration in tailwind.config.ts
// (`beamProjector` / `beamProjectorCore` = 4200ms). When this elapses
// we swap the cone from the one-shot intro to the gentle breathing.
const PROJECTOR_DURATION_MS = 4200;

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [beamSettled, setBeamSettled] = useState(false);

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

  // Once the section reveals, schedule the moment the projector
  // sweep finishes — that's when the headline lights up and the
  // beam transitions into its ambient breathing loop.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBeamSettled(true), PROJECTOR_DURATION_MS);
    return () => clearTimeout(t);
  }, [inView]);

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
      <BeamLight inView={inView} settled={beamSettled} />

      <div className="relative mx-auto flex max-w-[960px] flex-col items-center text-center">
        {/*
          Two-layer headline so the projector beam can actually
          "light up" the text as it sweeps: a dim base layer is
          always visible, and a bright layer on top is revealed
          only under a moving radial mask (see globals.css).
        */}
        <h2
          className="relative font-display font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(44px,7.2vw,88px)]"
          style={reveal(0)}
        >
          <span className="cta-text-base">
            Your best <em>ads</em> are already in your DMs.
          </span>
          {inView && (
            <span
              aria-hidden
              className="cta-text-spot absolute inset-0"
            >
              Your best <em>ads</em> are already in your DMs.
            </span>
          )}
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
  The diagonal spotlight is now anchored at the BOTTOM-RIGHT corner,
  fanning up-and-to-the-left across the headline like a stage
  projector aimed up from below.

  Composition:

   1. CONE — clip-path polygon (mirrored vertically from the original
      top-right design) filled with a purple gradient whose brightest
      stop sits at the bottom-right origin and dims toward the wide
      top-left mouth of the cone. While the section enters view it
      runs the one-shot `beam-projector` keyframe (R→L→R→settle).
      Once settled it switches to the `beam-sweep` ambient breathing.

   2. CORE — a tall rotated radial-gradient ellipse anchored near the
      bottom-right corner. The radial focus is moved to the BOTTOM of
      the ellipse so the highlight ignites at the corner. Same dual-
      state animation as the cone with its own slightly out-of-phase
      excursion.

   3. MOTES — tiny dust particles RISING through the beam from the
      light source upward into the wide end (matches the new
      bottom-up direction of the `beamMotes` keyframe).

   Plus two ambient blurred blobs at the bottom-right corner for
   color depth, and a subtle vignette at the OPPOSITE corner
   (top-left) to deepen the dark side and keep the headline edge
   crisp against the now-bright bottom of the canvas.
*/
function BeamLight({ inView, settled }: { inView: boolean; settled: boolean }) {
  // While the section is offscreen the beam is fully hidden so that
  // when it scrolls in, the projector intro plays from a true cold
  // start — no half-faded sweep mid-scroll.
  if (!inView) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* (1) CONE — narrow at bottom-right, fans up-left */}
      <div
        className={`absolute right-0 bottom-0 h-[160%] w-[75%] origin-bottom-right ${
          settled ? "animate-beam-sweep" : "animate-beam-projector"
        }`}
        style={{
          // Vertical mirror of the original 200deg gradient (= 340deg)
          // so the brightest stop sits at the bottom-right origin and
          // fades upward toward the mouth of the cone.
          background:
            "linear-gradient(340deg, rgba(170, 100, 240, 0.6) 0%, rgba(138, 71, 217, 0.42) 22%, rgba(110, 58, 199, 0.24) 45%, rgba(79, 70, 229, 0.08) 70%, transparent 88%)",
          // Vertical mirror of the original polygon: narrow end now
          // sits in the bottom-right corner, wide mouth opens upward.
          clipPath: "polygon(55% 100%, 100% 100%, 100% 78%, 8% 0%, 32% 0%)",
          filter: "blur(36px)",
        }}
      />

      {/* (2) CORE — bright inner highlight, anchored at the bottom-right */}
      <div
        className={`absolute -bottom-24 right-[-6%] h-[760px] w-[440px] origin-bottom-right ${
          settled ? "animate-beam-core" : "animate-beam-projector-core"
        }`}
        style={{
          // Focus moved from "at top" → "at bottom" so the radial
          // brightness peaks at the bottom-right corner origin.
          background:
            "radial-gradient(ellipse at bottom, rgba(196, 130, 255, 0.88), rgba(138, 71, 217, 0.48) 35%, rgba(79, 70, 229, 0.16) 60%, transparent 78%)",
          filter: "blur(56px)",
          // Default rotation matches the settled state of the projector
          // keyframe (rotate(28deg)) so the swap is seamless.
          transform: settled ? "rotate(28deg)" : undefined,
        }}
      />

      {/* Ambient corner glow blobs at the bottom-right for color depth */}
      <div
        className="absolute -right-28 -bottom-28 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{
          backgroundColor: "rgba(155, 81, 224, 0.42)",
          opacity: settled ? 1 : 0.55,
          transition: "opacity 800ms ease-out",
        }}
      />
      <div
        className="absolute right-[10%] bottom-[28%] h-[360px] w-[360px] rounded-full blur-[110px]"
        style={{
          backgroundColor: "rgba(79, 70, 229, 0.22)",
          opacity: settled ? 1 : 0.4,
          transition: "opacity 800ms ease-out",
        }}
      />

      {/* (3) MOTES — rise through the beam after it settles */}
      {settled && (
        <>
          <Mote bottom="6%"  right="18%" delay="0s"   size={4} opacity={0.45} />
          <Mote bottom="3%"  right="32%" delay="3.4s" size={3} opacity={0.35} />
          <Mote bottom="10%" right="9%"  delay="6.8s" size={5} opacity={0.5}  />
          <Mote bottom="2%"  right="24%" delay="9.2s" size={2} opacity={0.4}  />
        </>
      )}

      {/* Top-left vignette — opposite the new beam corner — to keep
          the headline edge crisp against the brightening lower-right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />
    </div>
  );
}

/* A single drifting dust mote inside the beam. */
function Mote({
  bottom,
  right,
  delay,
  size,
  opacity,
}: {
  bottom: string;
  right: string;
  delay: string;
  size: number;
  opacity: number;
}) {
  return (
    <span
      className="absolute block rounded-full animate-beam-motes"
      style={{
        bottom,
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
