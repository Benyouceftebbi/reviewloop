"use client";

/*
  SECTION 10 — PRICING (Variant A: The Polished Default)

  Layout hierarchy (top → bottom):
   1. Eyebrow tag + heading + subhead.
   2. FREE-TRIAL BANNER — a single-row strip above the tier cards.
      Same vertical weight as a tier card (intentionally — this is
      Variant A's compromise: free trial gets equal billing, not hero
      billing).
   3. THREE EQUAL-WIDTH TIER CARDS. Brand has a 1px lime border
      (not a top stripe), a slightly larger price, and a small
      "Where most teams land" pill. Restraint is the differentiator.
   4. HONESTY STRIP — mono fine print listing what isn't charged for.

  CTA hierarchy per spec:
   - Starter: outline lime
   - Brand:   filled lime
   - Studio:  ghost / text-only
   The free banner has its own filled-lime "Start free" button — the
   single brightest button on the section.

  Animation budget: every transition <= 600ms.
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

export default function PricingPolished() {
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
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT A — POLISHED DEFAULT &nbsp;·&nbsp; PRICING
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

        {/* FREE-TRIAL BANNER — equal in weight to a card. */}
        <FreeBanner inView={inView} />

        {/* THREE EQUAL CARDS. Mobile reorders to put Brand first. */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <PolishedCard tier={TIERS[0]} inView={inView} delay={140} mobileOrder={2} />
          <PolishedCard tier={TIERS[1]} inView={inView} delay={240} mobileOrder={1} />
          <PolishedCard tier={TIERS[2]} inView={inView} delay={340} mobileOrder={3} />
        </div>

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

/* ---------- Free-trial banner ---------- */

function FreeBanner({ inView }: { inView: boolean }) {
  return (
    <div
      className="mt-14 flex flex-col items-stretch gap-5 overflow-hidden rounded-2xl px-6 py-6 transition-all duration-500 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-7"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--spec-lime)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transitionTimingFunction: "var(--ease-reveal)",
      }}
    >
      <div>
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "var(--spec-lime)", letterSpacing: "0.22em" }}
        >
          {"{/}"}&nbsp;&nbsp;10 FREE CREATIVES
        </p>
        <p
          className="mt-2 font-mono text-sm"
          style={{ color: "var(--text-dim)" }}
        >
          // no card &nbsp;·&nbsp; no time limit on the 10
          &nbsp;·&nbsp; disconnect anytime
        </p>
      </div>

      <a
        href="#"
        className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-transform duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
          boxShadow: "0 0 28px var(--lime-glow)",
          whiteSpace: "nowrap",
        }}
      >
        Start free
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}

/* ---------- Tier card ---------- */

function PolishedCard({
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
        // Restrained Brand treatment per Variant A: 1px lime border
        // (not a 4px top stripe). Subtler than B, for the polished
        // default feel.
        border: isRec ? "1px solid var(--spec-lime)" : "1px solid var(--border-subtle)",
        boxShadow: isRec ? "0 0 36px rgba(197,248,42,0.06)" : "none",
        // Brand is ~24px taller at desktop — typographic / spatial signal.
        paddingTop: isRec ? 36 : undefined,
        paddingBottom: isRec ? 36 : undefined,
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
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(-4px)",
            transition: `all 400ms var(--ease-reveal) ${delay + 350}ms`,
          }}
        >
          Where most teams land
        </span>
      )}

      <h3 className="text-lg font-semibold tracking-tight text-white">
        {tier.name}
      </h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span
          className="font-display italic font-normal leading-none tracking-[-0.02em]"
          style={{
            color: "var(--text-primary)",
            fontSize: isRec ? "clamp(56px, 5.6vw, 72px)" : "clamp(44px, 4.4vw, 56px)",
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
