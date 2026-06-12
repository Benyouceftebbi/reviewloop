"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuditReplay from "./_components/AuditReplay";

/* ================================================================== */
/*  /audit — Hormozi-style squeeze page                                */
/*                                                                     */
/*  Single-purpose landing: free Instagram audit for skincare DTC.     */
/*  No nav, repeated CTA, value bullets, risk reversal, FAQ, minimal   */
/*  footer. Uses the existing brand tokens (canvas, lime, font-display)*/
/*  so it feels like the same product.                                 */
/* ================================================================== */

export default function AuditPage() {
  return (
    <main
      className="min-h-screen font-sans text-white"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Logo only — no nav */}
      <header className="flex items-center justify-center py-8">
        <Link href="/" aria-label="reviewloop home">
          <LogoMark />
        </Link>
      </header>

      {/* Hero — above the fold */}
      <HeroSection />

      {/* Trust strip — pattern interrupt + risk reversal reinforcement */}
      <TrustStrip />

      {/* Who this is for */}
      <WhoSection />

      {/* Why most brands waste their reviews */}
      <ProblemSection />

      {/* How it works — 3 steps */}
      <HowItWorksSection />

      {/* Sample report */}
      <SampleReportSection />

      {/* Social proof placeholder */}
      <SocialProofSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA repeat */}
      <FinalCTASection />

      {/* Minimal footer */}
      <footer
        className="border-t py-8 text-center text-[13px]"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-dim)",
        }}
      >
        <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <span aria-hidden>·</span>
          <a
            href="mailto:hello@reviewloop.app"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
        <p className="mt-4 opacity-60">
          © {new Date().getFullYear()} reviewloop. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Hero Section                                                        */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !email.trim()) return;
    setSubmitting(true);
    // Store handle for the scanning page, then navigate
    if (typeof window !== "undefined") {
      sessionStorage.setItem("audit_handle", handle.trim());
      sessionStorage.setItem("audit_email", email.trim());
    }
    router.push("/audit/scanning");
  };

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 md:px-8">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Pre-headline */}
        <p
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--spec-lime)" }}
        >
          Attention skincare DTC founders doing $500K–$5M a year:
        </p>

        {/* Headline — specificity over safety, no "+" hedge */}
        <h1 className="text-balance text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-white">
          How to find the{" "}
          <span className="font-display italic" style={{ color: "var(--spec-lime)" }}>
            247
          </span>{" "}
          customer reviews hiding in your Instagram — free, in 60 seconds.
        </h1>

        {/* Subheadline — single job: what you get, in one sentence */}
        <p
          className="mt-6 max-w-2xl text-[1.125rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Free Instagram scan. We find every review you&apos;ve earned in the
          last 90 days, rank them by quality, and{" "}
          <span className="text-white">
            generate 3 sample creatives from your top reviews
          </span>{" "}
          — in 60 seconds.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left — bullets + form */}
          <div>
            {/*
              Bullet stack — 4 outcome bullets first, then 2 friction-killers.
              Hormozi-style: lead with what they get, then de-risk.
            */}
            <ul className="space-y-3 text-[15px]">
              {[
                "Your exact unused review count",
                "Top 10 reviews ranked by content quality",
                "3 sample creatives generated from your top reviews",
                "Estimated dollar value of unused content",
                "Full report delivered in 60 seconds",
                "Zero login, zero card, zero hassle",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-10 space-y-4">
              <label className="block">
                <span
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  Instagram handle
                </span>
                <div
                  className="flex items-center gap-2 rounded-2xl border px-4 py-3 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40"
                  style={{
                    borderColor: "var(--border-soft)",
                    backgroundColor: "var(--bg-elevated)",
                  }}
                >
                  <span style={{ color: "var(--text-dim)" }}>@</span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="yourbrand"
                    className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border bg-transparent px-4 py-3 text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
                  style={{
                    borderColor: "var(--border-soft)",
                    backgroundColor: "var(--bg-elevated)",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="group relative mt-2 w-full overflow-hidden rounded-pill py-4 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  backgroundColor: "var(--spec-lime)",
                  color: "#0A0A0F",
                }}
              >
                {submitting ? "Scanning…" : "Run my free scan now"}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-pill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 32px var(--lime-glow)" }}
                />
              </button>

              {/* Risk reversal */}
              <p
                className="text-center text-[12px] leading-relaxed"
                style={{ color: "var(--text-dim)" }}
              >
                100% free. No card. We never post, message, or share your data.
                Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Right — mock report visual */}
          <div className="flex items-start justify-center lg:justify-end">
            <MockReportCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mock Report Card                                                    */
/* ------------------------------------------------------------------ */

function MockReportCard() {
  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border p-6"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.08), 0 0 60px -20px rgba(197,248,42,0.12)",
      }}
    >
      {/* Badge */}
      <span
        className="mb-4 inline-block rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em]"
        style={{
          color: "var(--spec-lime)",
          backgroundColor: "rgba(197,248,42,0.12)",
        }}
      >
        Example report
      </span>

      {/* Big numbers */}
      <p
        className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none"
        style={{ color: "var(--spec-lime)" }}
      >
        247
      </p>
      <p className="text-[14px] text-white/70">unused reviews found</p>

      <div
        className="my-5 h-px w-full"
        style={{ backgroundColor: "var(--border-subtle)" }}
      />

      <p className="text-[clamp(1.8rem,4vw,2.2rem)] font-bold leading-none text-white">
        $7,400
      </p>
      <p className="text-[14px] text-white/70">in unused content value</p>

      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(197,248,42,0.08)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Who this is for                                                     */
/* ------------------------------------------------------------------ */

function WhoSection() {
  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionBadge>Who this is for</SectionBadge>
        <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
          This audit is built for:
        </h2>
        <ul className="mx-auto mt-8 max-w-md space-y-4 text-left text-[15px]">
          {[
            "Skincare DTC brands on Shopify",
            "$500K–$5M annual revenue",
            "Active Instagram engagement (5K+ followers receiving daily comments)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Problem Section                                                     */
/* ------------------------------------------------------------------ */

function ProblemSection() {
  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionBadge>The problem</SectionBadge>
        <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
          Why most brands waste their reviews
        </h2>

        {/*
          Hero agitation — one emotionally heavy frame before the polite
          3-card breakdown. Drives the dollar cost home so the cards
          below read as mechanism, not just diagnosis.
        */}
        <p
          className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          While you scroll past{" "}
          <span className="text-white font-semibold">247 reviews</span> you
          already earned, your competitors are paying UGC creators{" "}
          <span className="text-white font-semibold">$30 a piece</span> for the
          exact same content. You&apos;re sitting on{" "}
          <span
            className="font-display italic"
            style={{ color: "var(--spec-lime)" }}
          >
            $7,400
          </span>{" "}
          in free assets.
        </p>

        <ul className="mx-auto mt-10 grid gap-6 text-left sm:grid-cols-3">
          {[
            {
              title: "Buried in DMs",
              desc: "Great reviews hide in message threads nobody scrolls.",
            },
            {
              title: "Too slow to use",
              desc: "Turning one review into a creative takes 20–40 minutes in Canva.",
            },
            {
              title: "No ranking system",
              desc: "No way to know which reviews are worth using first.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border p-5"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <p className="font-semibold text-white">{item.title}</p>
              <p
                className="mt-2 text-[14px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Drop your Instagram handle",
      desc: "Just your public @handle — no login required.",
    },
    {
      num: "02",
      title: "We scan your last 90 days",
      desc: "Comments, replies, tagged posts — all public content.",
    },
    {
      num: "03",
      title: "Get your report + 3 free creatives",
      desc: "Review count, top 10 ranked, estimated value, and 3 sample creatives — in 60 seconds.",
    },
  ];

  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <SectionBadge>How it works</SectionBadge>
        <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
          3 steps. 60 seconds. Done.
        </h2>

        {/* Replay cinematic — visually shows the comment → creative
            transformation that the steps describe. */}
        <div className="mt-12">
          <AuditReplay />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="text-left">
              <span
                className="font-mono text-[11px] tracking-[0.22em]"
                style={{ color: "var(--spec-lime)" }}
              >
                Step {s.num}
              </span>
              <p className="mt-2 text-[18px] font-semibold text-white">
                {s.title}
              </p>
              <p
                className="mt-1 text-[14px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sample Report                                                       */
/* ------------------------------------------------------------------ */

function SampleReportSection() {
  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionBadge>Sample report</SectionBadge>
          <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
            Here&apos;s what you&apos;ll get
          </h2>
        </div>

        {/* Simulated report UI */}
        <div
          className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px]"
                style={{
                  backgroundColor: "rgba(197,248,42,0.12)",
                  color: "var(--spec-lime)",
                }}
              >
                @
              </span>
              <div>
                <p className="font-medium text-white">glowskinco</p>
                <p
                  className="text-[12px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  Scanned May 17, 2026
                </p>
              </div>
            </div>
            <span
              className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{
                color: "var(--spec-lime)",
                backgroundColor: "rgba(197,248,42,0.12)",
              }}
            >
              Complete
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: "var(--border-subtle)" }}>
            {[
              { label: "Unused reviews", value: "312" },
              { label: "Top quality", value: "47" },
              { label: "Est. value", value: "$9,200" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <p
                  className="text-[clamp(1.5rem,4vw,2rem)] font-bold"
                  style={{ color: "var(--spec-lime)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1 text-[11px] uppercase tracking-wide"
                  style={{ color: "var(--text-dim)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Top reviews list */}
          <div
            className="border-t px-6 py-5"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-dim)" }}
            >
              Top 3 reviews by quality score
            </p>
            <ul className="space-y-3">
              {[
                {
                  text: '"This completely changed my skin in 2 weeks. I\'m obsessed."',
                  score: 98,
                },
                {
                  text: '"Finally a product that actually does what it promises!"',
                  score: 94,
                },
                {
                  text: '"My friends keep asking what I\'m using. Best purchase ever."',
                  score: 91,
                },
              ].map((r, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-4 rounded-xl border p-3"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <p className="text-[14px] leading-relaxed text-white/85">
                    {r.text}
                  </p>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]"
                    style={{
                      color: "var(--spec-lime)",
                      backgroundColor: "rgba(197,248,42,0.12)",
                    }}
                  >
                    {r.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          Methodology footnote — transparent calc builds trust.
          Spec calls this out explicitly: never show a $ value
          without showing the math behind it.
        */}
        <p
          className="mx-auto mt-6 max-w-2xl text-center text-[12px]"
          style={{ color: "var(--text-dim)" }}
        >
          Estimated value based on $30 average UGC creator cost per asset.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social Proof                                                        */
/* ------------------------------------------------------------------ */

function SocialProofSection() {
  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionBadge>Proof</SectionBadge>
          <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
            Why you can trust this scan
          </h2>
        </div>

        {/*
          Three credibility legs replacing the empty-testimonials block:
          (1) Founder line, (2) technical stack, (3) live demo proof.
          Honest about pre-launch state — no fabricated logos or quotes.
        */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* Founder credibility */}
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--spec-lime)" }}
            >
              Built by
            </p>
            <p className="mt-3 text-[15px] font-semibold text-white">
              Ben Youcef
            </p>
            <p
              className="mt-1 text-[13px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Ex-DTC operator. Spent 4 years watching skincare brands burn
              budget on UGC they already had sitting in their DMs.
            </p>
          </div>

          {/* Technical credibility */}
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--spec-lime)" }}
            >
              Powered by
            </p>
            <p className="mt-3 text-[15px] font-semibold text-white">
              Meta Graph API
            </p>
            <p
              className="mt-1 text-[13px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Public-data only, Shopify integration ready. We never touch
              private DMs or post on your behalf.
            </p>
          </div>

          {/* Live demo proof */}
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--spec-lime)" }}
            >
              See it run
            </p>
            <a
              href="https://www.loom.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
            >
              Watch 30-sec demo
              <span aria-hidden>↗</span>
            </a>
            <p
              className="mt-1 text-[13px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A live scan in motion — see exactly what the report looks like
              before you drop your handle.
            </p>
          </div>
        </div>

        {/* Honest note about testimonials */}
        <p
          className="mx-auto mt-8 max-w-md text-center text-[13px] leading-relaxed"
          style={{ color: "var(--text-dim)" }}
        >
          We&apos;ll add real customer testimonials here as soon as our first
          users share their results. No fake quotes — ever.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQ_ITEMS = [
  {
    q: "Is this safe? Do you store my data?",
    a: "We only access public data (comments, tagged posts). We don't store your content — just the analysis. You can request deletion anytime.",
  },
  {
    q: "Do I need to give you my Instagram login?",
    a: "No. We only need your public handle. No passwords, no OAuth, no access to your account.",
  },
  {
    q: "Why is this free?",
    a: "We include 3 sample creatives so you can see what's possible. If you want creatives from all your top reviews — not just 3 — that's the paid upgrade. The audit and the 3 samples are 100% free, with no card and no obligation.",
  },
  {
    q: "What happens after I get my report?",
    a: "You'll receive an email with your full report and your 3 free sample creatives. No obligations, no auto-billing. If you want to turn the rest of your reviews into ads, we'll show you how.",
  },
  {
    q: "How long does this take?",
    a: "60 seconds or less. Most scans complete in under 30.",
  },
];

function FAQSection() {
  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-bold text-white">
            Questions? Answered.
          </h2>
        </div>

        <dl className="mt-10 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className="rounded-2xl border"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[15px] font-medium text-white">{q}</span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
          style={{
            backgroundColor: open
              ? "rgba(197,248,42,0.15)"
              : "rgba(255,255,255,0.06)",
            color: open ? "var(--spec-lime)" : "white",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          <PlusIcon />
        </span>
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTASection() {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !email.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    alert("Check your inbox — your report is on the way.");
  };

  return (
    <section
      className="relative overflow-hidden border-t px-4 py-24 md:px-8"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(197,248,42,0.06)" }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.8rem,5vw,2.5rem)] font-bold leading-tight text-white">
          Find your{" "}
          <span className="font-display italic" style={{ color: "var(--spec-lime)" }}>
            hidden
          </span>{" "}
          reviews — free.
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Drop your handle, get your report. No login, no card, no work on your
          end.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-md space-y-4 text-left"
        >
          <label className="block">
            <span
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-dim)" }}
            >
              Instagram handle
            </span>
            <div
              className="flex items-center gap-2 rounded-2xl border px-4 py-3 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40"
              style={{
                borderColor: "var(--border-soft)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <span style={{ color: "var(--text-dim)" }}>@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourbrand"
                className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-dim)" }}
            >
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-2xl border bg-transparent px-4 py-3 text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
              style={{
                borderColor: "var(--border-soft)",
                backgroundColor: "var(--bg-elevated)",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-2 w-full overflow-hidden rounded-pill py-4 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#0A0A0F",
            }}
          >
            {submitting ? "Scanning…" : "Run my free scan now"}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-pill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "0 0 32px var(--lime-glow)" }}
            />
          </button>

          <p
            className="text-center text-[12px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            100% free. No card. We never post, message, or share your data.
            Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

/*
  Trust strip — three credibility badges between the hero and the
  qualifier section. Acts as a pattern interrupt right after the form
  and reinforces the risk reversal a second time. Spec called this out
  explicitly: skipping it leaves the page jumping straight from form
  into "Who this is for" with no pause.
*/
function TrustStrip() {
  const badges = [
    { label: "60-second scan", icon: ClockIcon },
    { label: "No signup, no card", icon: ShieldIcon },
    { label: "Built for skincare DTC brands", icon: SparkleIcon },
  ];
  return (
    <div
      className="border-t border-b px-4 py-6 md:px-8"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-deep)",
      }}
    >
      <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {badges.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-[13px] font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            <span style={{ color: "var(--spec-lime)" }}>
              <Icon />
            </span>
            <span className="text-white/90">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
      style={{
        color: "var(--spec-lime)",
        backgroundColor: "rgba(197,248,42,0.10)",
      }}
    >
      {children}
    </span>
  );
}

function LogoMark() {
  return (
    <span className="flex items-center gap-2 text-[18px] font-semibold text-white">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(197,248,42,0.15)",
          color: "var(--spec-lime)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </span>
      reviewloop
    </span>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor: "rgba(197,248,42,0.15)",
        color: "var(--spec-lime)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
    </svg>
  );
}
