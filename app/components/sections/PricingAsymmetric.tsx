"use client";

/*
  SECTION 10 — PRICING (Variant C: Asymmetric / Decision-Made)

  Layout:
   - No "Most picked" pill. The middle tier dominates the layout
     because it's literally larger; the size IS the signal.
   - Desktop grid: 28fr / 40fr / 32fr (Starter / Brand / Studio).
   - Brand has a much bigger price (italic ~80px), more padding,
     soft purple glow behind it, and a lime border.
   - Starter and Studio are smaller, marked as "or — for solo brands"
     and "or — for agencies" so they read as deviations from the
     default rather than equal alternatives.
   - Free trial is the hero feature inside the Starter card itself
     (price = $0, italic, with mono fine print underneath).
   - Mobile: stack vertically with Brand FIRST so the visual hierarchy
     survives without horizontal layout.

  Risk: the asymmetry can read as pushy. Mitigated by giving Starter
  the genuinely valuable "free trial" feature so it doesn't feel
  punished — and by keeping Studio's value proposition clear ("for
  agencies") so it has a real role.
*/

import { useEffect, useRef, useState } from "react";

type CtaStyle = "filled" | "outline" | "ghost";

type Tier = {
  name: string;
  altLabel?: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaStyle: CtaStyle;
  big?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    altLabel: "or — for solo brands",
    price: "$0",
    priceUnit: "for 10 creatives",
    description: "Try without a card.",
    features: [
      "10 free creatives",
      "1 connected brand",
      "No time limit on the 10",
      "Auto-post or download",
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
    big: true,
  },
  {
    name: "Studio",
    altLabel: "or — for agencies",
    price: "$Y",
    priceUnit: "/ month",
    description: "Multi-brand operators.",
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

export default function PricingAsymmetric() {
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
          {"{/}"}&nbsp;&nbsp;VARIANT C — ASYMMETRIC &nbsp;·&nbsp; PRICING
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

        {/*
          ASYMMETRIC GRID. On desktop: 28 / 40 / 32 — Brand dominates.
          On mobile: 1fr stacked, Brand re-ordered to top.
          Items are aligned to a stretched height using `items-stretch`
          so smaller cards fill vertical space without looking dwarfed.
        */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-4 md:mt-16 md:grid-cols-[28fr_40fr_32fr] md:gap-5">
          <AsymCard tier={TIERS[0]} inView={inView} delay={140} mobileOrder={2} />
          <AsymCard tier={TIERS[1]} inView={inView} delay={240} mobileOrder={1} />
          <AsymCard tier={TIERS[2]} inView={inView} delay={340} mobileOrder={3} />
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

/* ---------- Asymmetric tier card ---------- */

function AsymCard({
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
  const big = !!tier.big;

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 md:p-8"
      style={{
        backgroundColor: "var(--bg-elevated)",
        // Brand gets a lime border + purple inner glow. Alternatives
        // get a quiet subtle border. The lime border on Brand is the
        // ONLY pricing-styled lime affordance in the section's grid —
        // size + border together carry the "this is the pick" signal.
        border: big
          ? "1px solid var(--spec-lime)"
          : "1px solid var(--border-subtle)",
        boxShadow: big ? "0 0 60px rgba(197,248,42,0.10)" : "none",
        order: mobileOrder,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "var(--ease-reveal)",
      }}
    >
      {/* Soft purple glow inside Brand only. */}
      {big && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full blur-[140px]"
          style={{ backgroundColor: "var(--purple-glow)", opacity: 0.5 }}
        />
      )}

      <div className="relative">
        {tier.altLabel && (
          <p
            className="font-mono text-[10px] uppercase"
            style={{
              color: "var(--text-dim)",
              letterSpacing: "0.2em",
            }}
          >
            {tier.altLabel}
          </p>
        )}

        <h3
          className={`tracking-tight text-white ${
            big ? "mt-1 text-2xl font-semibold md:text-3xl" : "mt-1 text-lg font-semibold"
          }`}
        >
          {tier.name}
        </h3>

        <div className="mt-4 flex items-baseline gap-2">
          <span
            className="font-display italic font-normal leading-none tracking-[-0.03em]"
            style={{
              color: "var(--text-primary)",
              fontSize: big
                ? "clamp(72px, 7.2vw, 96px)"
                : "clamp(40px, 3.8vw, 48px)",
            }}
          >
            {tier.price}
          </span>
          <span
            className={big ? "text-base" : "text-sm"}
            style={{ color: "var(--text-dim)" }}
          >
            {tier.priceUnit}
          </span>
        </div>

        <p
          className={`mt-3 ${big ? "text-base md:text-lg" : "text-sm"}`}
          style={{ color: "var(--text-muted)" }}
        >
          {tier.description}
        </p>

        <ul className={`${big ? "mt-7 space-y-3" : "mt-5 space-y-2"}`}>
          {tier.features.map((f, i) => (
            <li
              key={i}
              className={`flex items-start gap-2.5 ${big ? "text-base" : "text-sm"}`}
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
      </div>

      <div className={big ? "mt-9 flex-1" : "mt-6 flex-1"} />
      <CtaButton style={tier.ctaStyle} big={big}>
        {tier.ctaLabel}
      </CtaButton>
    </div>
  );
}

function CtaButton({
  children,
  style,
  big,
}: {
  children: React.ReactNode;
  style: CtaStyle;
  big?: boolean;
}) {
  if (style === "filled") {
    return (
      <a
        href="#"
        className="relative inline-flex w-full items-center justify-center gap-2 rounded-full px-6 font-medium transition-transform duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
          boxShadow: "0 0 28px var(--lime-glow)",
          padding: big ? "16px 24px" : "12px 20px",
          fontSize: big ? "1.05rem" : "1rem",
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
        className="relative inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition-colors duration-300"
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
      className="relative inline-flex w-full items-center justify-center gap-2 px-2 py-3 font-medium transition-colors duration-300"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
