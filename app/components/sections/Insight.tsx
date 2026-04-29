"use client";

/*
  SECTION 2 — THE INSIGHT

  Built to docs/landing_page_design_spec.md § "Section 2 — The Problem".

  Layout:
   - Full-width dark canvas (--bg-base) with one purple beam from top-left.
   - Row 1 (heading): mono "{/}  THE INSIGHT" tag, big mixed-typography
     headline with `social proof` in serif italic / --purple-soft, and a
     muted subhead.
   - Row 2 (stats): 3-column grid of huge italic numbers + {/}-prefixed labels.
   - Beneath the stats: a thin horizontal bar showing 3.5% lime fill of the
     full width, with a mono caption.

  Animations:
   - Reveal-on-scroll: elements slide up from translateY(24px) and fade in
     when the section crosses 15% of the viewport. 700ms with the spec's
     `cubic-bezier(0.16, 1, 0.3, 1)` curve.
   - "social proof" gets a 200ms delay AND a soft purple text-shadow that
     fades out as it lands — drawing the eye to the punchline word.
   - Stats COUNT UP from 0 to their target over 1.4s using easeOutCubic,
     driven by requestAnimationFrame (smooth, frame-perfect).
   - Bar fills width 0% → 3.5% over 1.6s, AFTER the count-up completes,
     so the eye reads "340 → 12 → 8400" first, THEN sees the visual ratio.

  The intersection observer fires once and disconnects — no re-running
  on re-entry, animations only play on first scroll-in.
*/

import { useEffect, useRef, useState } from "react";

export default function Insight() {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="the-insight"
      className="relative overflow-hidden px-6 py-20 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/*
        Single purple beam from top-left — per spec.
        Heavy blur turns the colored circle into atmospheric glow.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        {/* ---------- ROW 1: HEADING ---------- */}
        <div className="mx-auto max-w-[1000px] text-center">
          <Reveal inView={inView} delay={0}>
            <p
              className="font-mono text-xs uppercase"
              style={{ color: "var(--text-dim)", letterSpacing: "0.15em" }}
            >
              {"{/}"}&nbsp;&nbsp;THE INSIGHT
            </p>
          </Reveal>

          <Reveal inView={inView} delay={100}>
            <h2 className="mt-8 font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(40px,5vw,72px)]">
              Your customers are already giving you the{" "}
              <SocialProof inView={inView} />{" "}
              you&apos;re paying UGC creators thousands to manufacture.
            </h2>
          </Reveal>

          <Reveal inView={inView} delay={400}>
            <p
              className="mx-auto mt-8 max-w-[640px] text-xl"
              style={{ color: "var(--text-muted)" }}
            >
              It&apos;s sitting in your comments and DMs. You&apos;re doing nothing with it.
            </p>
          </Reveal>
        </div>

        {/* ---------- ROW 2: STATS ---------- */}
        <div className="mt-24 grid grid-cols-1 gap-16 md:mt-32 md:grid-cols-3 md:gap-12">
          <Stat
            inView={inView}
            target={340}
            label="testimonials a typical DTC brand receives per month"
            startDelay={500}
          />
          <Stat
            inView={inView}
            target={12}
            label="that ever become a creative asset"
            startDelay={650}
          />
          <Stat
            inView={inView}
            target={8400}
            prefix="$"
            label="average monthly UGC creator spend"
            startDelay={800}
          />
        </div>

        {/*
          Bar viz: 3.5% lime fill of full width.
          Triggered AFTER counts finish — count starts at ~800ms, runs
          for 1400ms, so we delay the bar to ~2200ms total.
        */}
        <BarViz inView={inView} delay={2200} />
      </div>
    </section>
  );
}

/* ---------- Sub-components ---------- */

/*
  Reveal — generic fade+slide-up wrapper. Reads the spec's easing variable.
*/
function Reveal({
  inView,
  delay,
  children,
}: {
  inView: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="transition-all duration-700"
      style={{
        transitionTimingFunction: "var(--ease-reveal)",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/*
  SocialProof — the italic punchline word.
  Inherits font-size from the parent <h2> (no size override).
  On reveal: fades in with 200ms extra delay AND drops a soft purple
  text-shadow that fades out at the same time, like a glow landing.
*/
function SocialProof({ inView }: { inView: boolean }) {
  return (
    <em
      className="font-display italic font-normal transition-all duration-700"
      style={{
        color: "var(--purple-soft)",
        transitionTimingFunction: "var(--ease-reveal)",
        transitionDelay: "300ms",
        opacity: inView ? 1 : 0,
        // textShadow fades from soft purple glow to none.
        textShadow: inView
          ? "0 0 0 rgba(79, 70, 229, 0)"
          : "0 0 30px rgba(79, 70, 229, 0.45)",
      }}
    >
      social proof
    </em>
  );
}

/*
  Stat — single column with count-up number, {/} tag and label.

  The count-up uses requestAnimationFrame instead of setInterval so it's
  framerate-independent and smooth at any refresh rate. easeOutCubic is
  the spec's chosen curve — front-loads the motion so the number "lands"
  rather than crawling at the end.
*/
function Stat({
  inView,
  target,
  prefix = "",
  label,
  startDelay,
}: {
  inView: boolean;
  target: number;
  prefix?: string;
  label: string;
  startDelay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // spec: 1.4s
    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (start === 0) start = now;
      const elapsed = now - start - startDelay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic = 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, startDelay]);

  // Format with comma separators (e.g. 8400 → "8,400").
  const formatted = prefix + value.toLocaleString("en-US");

  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <p
        className="font-display italic font-normal leading-none tracking-[-0.02em]"
        style={{ color: "var(--text-primary)", fontSize: "clamp(64px, 7vw, 96px)" }}
      >
        {formatted}
      </p>
      <p
        className="mt-6 flex items-start gap-3 max-w-[280px] text-base"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>
          {"{/}"}
        </span>
        <span>{label}</span>
      </p>
    </div>
  );
}

/*
  BarViz — full-width thin bar, 3.5% lime fill.
  We control width via an inline style that flips after `delay` ms.
  The CSS transition handles the tween.
*/
function BarViz({ inView, delay }: { inView: boolean; delay: number }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setFilled(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div className="mx-auto mt-16 max-w-[1000px] md:mt-20">
      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--border-subtle)" }}
      >
        {/*
          Lime fill — width transitions from 0 to 3.5% over 1.6s.
          Box shadow gives it a soft halo so the sliver reads as bright
          and "alive" against the dim track.
        */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            backgroundColor: "var(--spec-lime)",
            boxShadow: "0 0 12px var(--lime-glow)",
            width: filled ? "3.5%" : "0%",
            transition: "width 1600ms var(--ease-reveal)",
          }}
        />
      </div>
      <p
        className="mt-4 font-mono text-xs"
        style={{ color: "var(--text-dim)" }}
      >
        // 96.5% of your social proof is being thrown away
      </p>
    </div>
  );
}
