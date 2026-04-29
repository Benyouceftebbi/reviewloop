"use client";

/*
  SECTION 10 — PRICING (Direction B: Free-First)

  Layout hierarchy (top → bottom):
   1. Eyebrow tag + heading + subhead.
   2. HERO FREE PANEL — the largest, brightest element on the page.
      Lime border, soft inner purple glow, giant italic "10", and a
      single dominant CTA. This is intentionally larger than any tier
      card below it: the spec calls free-trial sign-up the highest-
      conversion event, so it gets the most pixels.
   3. SECONDARY TIER ROW — three paid tiers (Starter / Brand / Studio).
      Smaller and quieter than the hero. Brand has a 4px lime top
      border and a slightly larger price, plus a "Where most teams
      land" pill — restrained because the row itself is already
      secondary in the page hierarchy.
   4. HONESTY STRIP — mono fine print at the bottom listing what
      the pricing does NOT charge for. Preempts SaaS bloat anxiety.

  CTA hierarchy per spec:
   - Starter: outline lime
   - Brand:   filled lime
   - Studio:  ghost / text-only
   The hero panel's CTA is its own filled-lime button — the brightest
   button on the section, intentionally outshining the tiers' CTAs.

  Animation budget: every transition <= 600ms. No promo theatrics.
*/

import { useEffect, useRef, useState } from "react";

type CtaStyle = "filled" | "outline" | "ghost";

type Tier = {
  name: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaStyle: CtaStyle;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    priceUnit: "for 10 creatives",
    description: "Try without a card.",
    features: [
      "10 free creatives",
      "1 connected brand",
      "Auto-post or download",
      "No time limit on the 10",
    ],
    ctaLabel: "Start free",
    ctaStyle: "outline",
  },
  {
    name: "Brand",
    price: "$X",
    priceUnit: "/ month",
    description: "For most DTC brands.",
    features: [
      "~100 creatives / month",
      "1 brand, both modes",
      "Priority detection",
      "Email support",
    ],
    ctaLabel: "Start 14-day trial",
    ctaStyle: "filled",
    recommended: true,
  },
  {
    name: "Studio",
    price: "$Y",
    priceUnit: "/ month",
    description: "For agencies & multi-brand operators.",
    features: [
      "500 creatives / month",
      "5 brands",
      "Team seats included",
      "Slack support",
    ],
    ctaLabel: "Talk to us",
    ctaStyle: "ghost",
  },
];

export default function Pricing() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        {/* HEADER */}
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT B — FREE-FIRST &nbsp;·&nbsp; PRICING
        </p>
        <h2 className="mt-5 max-w-[900px] font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Simple
          </em>{" "}
          pricing. No seats. No setup fees.
        </h2>
        <p
          className="mt-6 max-w-[640px] text-xl"
          style={{ color: "var(--text-muted)" }}
        >
          Start free. Upgrade when you&apos;ve seen it work.
        </p>

        {/* HERO FREE PANEL */}
        <FreeHero inView={inView} />

        {/* SECONDARY TIER ROW. On mobile, Brand stacks first so the
            "obvious choice" hierarchy survives a vertical layout. */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          {/* On mobile we reorder via CSS order: Brand=1, Starter=2, Studio=3 */}
          <TierCard tier={TIERS[0]} inView={inView} delay={140} mobileOrder={2} />
          <TierCard tier={TIERS[1]} inView={inView} delay={240} mobileOrder={1} />
          <TierCard tier={TIERS[2]} inView={inView} delay={340} mobileOrder={3} />
        </div>

        {/* HONESTY STRIP — preempts SaaS-bloat anxiety. */}
        <p
          className="mt-14 text-center font-mono text-xs leading-relaxed md:mt-16"
          style={{ color: "var(--text-dim)" }}
        >
          // no per-seat &nbsp;·&nbsp; no setup &nbsp;·&nbsp; no overages
          &nbsp;·&nbsp; no annual lock-in &nbsp;·&nbsp; cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ---------- Hero free panel ---------- */

function FreeHero({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative mt-14 overflow-hidden rounded-3xl px-8 py-12 transition-all duration-500 md:mt-16 md:px-14 md:py-16"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--spec-lime)",
        boxShadow: "0 0 0 1px rgba(197,248,42,0.25), 0 24px 80px rgba(197,248,42,0.12)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionTimingFunction: "var(--ease-reveal)",
      }}
    >
      {/* Inner purple glow — soft, lower-right, matches the page-wide light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--purple-glow)", opacity: 0.55 }}
      />

      <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div>
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--spec-lime)", letterSpacing: "0.22em" }}
          >
            {"{/}"}&nbsp;&nbsp;START FREE
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {/*
              The big italic "10" — single largest type on the section.
              Serif italic earns its keep on price numbers per spec.
            */}
            <span
              className="font-display italic font-normal leading-none tracking-[-0.03em]"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(80px, 13vw, 160px)",
              }}
            >
              10
            </span>
            <span
              className="font-medium leading-tight text-white text-[clamp(22px,2.6vw,36px)]"
            >
              free creatives.
            </span>
          </div>

          <p
            className="mt-5 font-mono text-sm"
            style={{ color: "var(--text-dim)" }}
          >
            // no card &nbsp;·&nbsp; no time limit on the 10
            &nbsp;·&nbsp; disconnect anytime
          </p>
        </div>

        {/* CTA cluster on the right (stacks below on mobile). */}
        <div className="flex flex-col items-stretch gap-3 md:items-end">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-5 text-base font-medium transition-transform duration-300 hover:scale-[1.02] md:text-lg"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#1A1A1A",
              boxShadow: "0 0 36px var(--lime-glow)",
              whiteSpace: "nowrap",
            }}
          >
            Start free
            <span aria-hidden>→</span>
          </a>
          <p
            className="text-center font-mono text-[10px] uppercase tracking-[0.18em] md:text-right"
            style={{ color: "var(--text-dim)" }}
          >
            // ~30 seconds to set up
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tier card ---------- */

function TierCard({
  tier,
  inView,
  delay,
  mobileOrder,
}: {
  tier: Tier;
  inView: boolean;
  delay: number;
  mobileOrder: number;
}) {
  const isRec = !!tier.recommended;

  return (
    <div
      className="relative flex flex-col rounded-2xl p-6 transition-all duration-500 md:p-7"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        // Brand gets a lime top stripe — restrained signal that this row
        // is secondary in the page hierarchy.
        borderTop: isRec ? "4px solid var(--spec-lime)" : undefined,
        // On mobile we use `order` to push Brand to the top of the stack.
        order: mobileOrder,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "var(--ease-reveal)",
      }}
    >
      {isRec && (
        <span
          className="absolute -top-3 left-6 inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            backgroundColor: "var(--spec-lime)",
            color: "#1A1A1A",
            // Pill fades in 400ms after the card itself per spec budget.
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(-4px)",
            transition: `all 400ms var(--ease-reveal) ${delay + 350}ms`,
          }}
        >
          Where most teams land
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {tier.name}
        </h3>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span
          className="font-display italic font-normal leading-none tracking-[-0.02em]"
          style={{
            color: "var(--text-primary)",
            // Brand's price is one step larger — the typographic signal.
            fontSize: isRec ? "clamp(52px, 5.4vw, 68px)" : "clamp(42px, 4.2vw, 52px)",
          }}
        >
          {tier.price}
        </span>
        <span className="text-sm" style={{ color: "var(--text-dim)" }}>
          {tier.priceUnit}
        </span>
      </div>

      <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
        {tier.description}
      </p>

      <ul className="mt-6 space-y-2.5">
        {tier.features.map((f, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="mt-[3px] font-mono text-[10px]"
              style={{ color: "var(--text-dim)" }}
            >
              {"{/}"}
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA — visually distinct per tier, per the spec's hierarchy rule. */}
      <div className="mt-7 flex-1" />
      <CtaButton style={tier.ctaStyle}>{tier.ctaLabel}</CtaButton>
    </div>
  );
}

function CtaButton({
  children,
  style,
}: {
  children: React.ReactNode;
  style: CtaStyle;
}) {
  if (style === "filled") {
    return (
      <a
        href="#"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition-transform duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
          boxShadow: "0 0 24px var(--lime-glow)",
        }}
      >
        {children}
        <span aria-hidden>→</span>
      </a>
    );
  }
  if (style === "outline") {
    return (
      <a
        href="#"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition-colors duration-300"
        style={{
          color: "var(--spec-lime)",
          border: "1px solid var(--spec-lime)",
          backgroundColor: "transparent",
        }}
      >
        {children}
        <span aria-hidden>→</span>
      </a>
    );
  }
  // ghost
  return (
    <a
      href="#"
      className="inline-flex w-full items-center justify-center gap-2 px-2 py-3 font-medium transition-colors duration-300"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
