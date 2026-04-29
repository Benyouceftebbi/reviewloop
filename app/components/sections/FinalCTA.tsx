"use client";

/*
  SECTION 12 — FINAL CTA (Variant A: The Mirror Resolution)

  The page's bookend. The hero's purple beam comes from bottom-LEFT;
  this section's beam comes from bottom-RIGHT. Same lime CTA pair as
  the hero, same heading scale rhythm, mirrored corner. The page closes
  the same shape it opened, in reverse.

  Restraint:
   - Three sentences total: heading + button + fine print. Nothing else.
   - No bullets, no recap, no second CTA, no badges, no pressure.
   - Generous vertical padding (200px desktop) — the page exhales here.

  Animations:
   - Reveal-on-scroll fade-up at 700ms (same as other sections).
   - The CTA pill carries a permanent lime-glow micro-pulse on a 3s loop.
     This is the ONLY persistent animation on the page; everything else
     has been calm. By the time the user reaches this section, that
     subtle breathing draws the eye without performing.
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

  // Shared reveal style — opacity fade + 12px translateY, 700ms ease-reveal.
  // Children stagger via individual delays.
  const reveal = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 700ms var(--ease-reveal) ${delay}ms, transform 700ms var(--ease-reveal) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="get-started"
      className="relative overflow-hidden px-6 py-24 md:py-[200px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/*
        MIRRORED BEAM — bottom-right corner.
        The hero's HeroBackground placed its strongest beam at bottom-left.
        Here we put the equivalent shape at bottom-right. Same blur, same
        glow color, opposite corner. The two together make the page feel
        symmetric end-to-end without ever being identical.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[800px] w-[800px] rounded-full blur-[180px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />
      {/* A second softer blob for depth, mid-right, lower opacity. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(79, 70, 229, 0.25)",
        }}
      />

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
        <p
          className="font-mono text-xs uppercase"
          style={{
            color: "var(--text-dim)",
            letterSpacing: "0.18em",
            ...reveal(0),
          }}
        >
          {"{/}"}&nbsp;&nbsp;GET STARTED
        </p>

        <h2
          className="mt-8 font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(40px,5.4vw,72px)]"
          style={reveal(120)}
        >
          Connect your Meta account in{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            30 seconds.
          </em>
        </h2>

        {/* CTA pair — same construction as the hero's, different label. */}
        <div className="mt-12 md:mt-14" style={reveal(280)}>
          <CTAPair />
        </div>

        <p
          className="mt-7 font-mono text-xs"
          style={{
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
            ...reveal(420),
          }}
        >
          // 10 free creatives. No credit card. Disconnect anytime.
        </p>
      </div>
    </section>
  );
}

/* ---------- CTA pair (arrow orb + lime pill) ---------- */
/*
  Mirrors the hero's "endless arrow" construction:
   - Outer wrapper is a single anchor tag (`group`) so hovering anywhere
     on the pair triggers both the arrow slide and the color flip.
   - Arrow circle: overflow-hidden so the second arrow stays clipped
     until hover translates the column up.
   - Pill: filled lime, with the permanent `animate-cta-pulse` halo
     defined in tailwind.config (3s loop, 20→36px lime-glow).
*/
function CTAPair() {
  return (
    <a href="#" className="group inline-flex items-center gap-1">
      {/* Arrow orb — mirrors hero. Endless-arrow column slides on hover. */}
      <span
        className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-full transition-colors duration-300 group-hover:bg-white"
        style={{ backgroundColor: "var(--spec-lime)", color: "#1A1A1A" }}
      >
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2">
          <span className="flex h-16 items-center justify-center">
            <ArrowUp />
          </span>
          <span className="flex h-16 items-center justify-center">
            <ArrowUp />
          </span>
        </span>
      </span>

      {/* Lime pill with permanent micro-pulse. */}
      <span
        className="rounded-full px-8 py-5 font-medium animate-cta-pulse transition-colors duration-300 group-hover:bg-white md:px-10"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
        }}
      >
        Connect your Meta account
      </span>
    </a>
  );
}

function ArrowUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 shrink-0"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
