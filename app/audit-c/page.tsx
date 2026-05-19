"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuditReplay from "../audit/_components/AuditReplay";

/* ================================================================== */
/*  /audit-c — VERSION C — Free Review Audit for indie DTC skincare    */
/*                                                                     */
/*  Variant of /audit aimed at smaller, indie skincare brands. Same    */
/*  brand tokens (canvas, lime, font-display) so the page still feels  */
/*  like reviewloop, but the copy + structure are tuned to indies:     */
/*    - Headline reframed as "you have N reviews, you've used 0"       */
/*    - Two parallel copy columns explaining the trade (handle in,     */
/*      ranked report out)                                             */
/*    - Three trust badges, indie / skincare / shopify tag chips       */
/*    - Single "what you get" microsummary, single CTA, microcopy      */
/*  No nav, no FAQ, no sample report block — keep this page short and  */
/*  laser-focused on the trade. Submits straight to /audit/scanning.   */
/* ================================================================== */

export default function AuditCPage() {
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

      <HeroSection />
      <HowItWorksSection />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — the entire page                                              */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("audit_handle", handle.trim());
    }
    router.push("/audit/scanning");
  };

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-4 md:px-8">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Variant tag */}
        <p
          className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          {"{/}"}  variant c — indie skincare
        </p>

        {/* Tagline */}
        <p
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--spec-lime)" }}
        >
          Free review audit · For indie skincare brands
        </p>

        {/* Headline */}
        <h1 className="text-balance text-[clamp(2rem,5.4vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-white">
          You have{" "}
          <span
            className="font-display italic"
            style={{ color: "var(--spec-lime)" }}
          >
            30 customer reviews.
          </span>
          <br className="hidden sm:block" /> You&apos;ve used{" "}
          <span
            className="font-display italic"
            style={{ color: "var(--spec-lime)" }}
          >
            0
          </span>{" "}
          of them as content.{" "}
          <span className="font-display italic">Let&apos;s fix that.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 max-w-3xl text-[1.05rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="font-mono text-[12px] tracking-[0.18em]" style={{ color: "var(--spec-lime)" }}>
            {"// "}
          </span>
          free Instagram scan. See every review you&apos;ve earned, ranked by
          quality. Built for indie skincare brands competing against the
          giants.
        </p>

        {/* Tag chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["Indie", "Skincare", "Shopify"].map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>

        {/* Two-column copy: the trade */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Left — what you give */}
          <CopyCard
            kicker="You give"
            heading="Your Instagram handle"
            body="Drop your Instagram handle. We scan every comment and DM you've received in the last 90 days — even if you only have a few hundred followers. No login, no card."
          />

          {/* Right — what you get */}
          <CopyCard
            kicker="You get back"
            heading="A ranked review report"
            body="Your unused review count, your top 10 ranked by quality, and what they'd cost from a real designer. Your customer reviews are your unfair advantage. Most indie brands never use them."
            highlight
          />
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {[
            "60-second scan",
            "No signup, no card",
            "Built for indie skincare brands",
          ].map((badge) => (
            <TrustBadge key={badge}>{badge}</TrustBadge>
          ))}
        </div>

        {/* What you get microsummary */}
        <div
          className="mt-10 rounded-2xl border px-5 py-4"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <p
            className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            What you get
          </p>
          <ul className="flex flex-col gap-2 text-[14px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            {[
              "Your unused review count",
              "Top 10 ranked",
              "Designer-cost estimate",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA form */}
        <form onSubmit={onSubmit} className="mt-10 max-w-xl">
          <p
            className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            How it starts
          </p>
          <p className="mb-4 text-[14px]" style={{ color: "var(--text-muted)" }}>
            Drop your Instagram handle (no login needed).
          </p>

          <label className="block">
            <span className="sr-only">Instagram handle</span>
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
                aria-label="Instagram handle"
                autoComplete="off"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-4 w-full overflow-hidden rounded-pill py-4 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#0A0A0F",
            }}
          >
            {submitting ? "Scanning…" : "Run my free scan"}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-pill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "0 0 32px var(--lime-glow)" }}
            />
          </button>

          <p
            className="mt-3 text-center text-[12px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            Enter your handle. We scan everything you&apos;ve earned. Get your
            number in 60 seconds.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works — replay cinematic + 3-step strip                      */
/* ------------------------------------------------------------------ */

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Drop your handle",
      desc: "Just your public Instagram @handle — no login, no card.",
    },
    {
      num: "02",
      title: "We rank every review",
      desc: "Your last 90 days of comments and DMs, scored for content quality.",
    },
    {
      num: "03",
      title: "See what they're worth",
      desc: "Top 10 reviews + estimated designer cost — back in 60 seconds.",
    },
  ];

  return (
    <section
      className="border-t px-4 py-20 md:px-8"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--spec-lime)" }}
        >
          How it works
        </p>
        <h2 className="mt-3 text-balance text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-[1.1] text-white">
          From a customer comment to a branded ad,{" "}
          <span
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            in four seconds.
          </span>
        </h2>

        {/* Replay cinematic — the same comment-to-creative morph from
            the landing page, embedded above the 3-step strip. */}
        <div className="mt-12">
          <AuditReplay />
        </div>

        {/* 3-step strip below the replay. */}
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
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function CopyCard({
  kicker,
  heading,
  body,
  highlight,
}: {
  kicker: string;
  heading: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: highlight
          ? "rgba(197,248,42,0.35)"
          : "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
        boxShadow: highlight
          ? "0 0 0 1px rgba(197,248,42,0.08), 0 30px 70px -30px rgba(197,248,42,0.18)"
          : "none",
      }}
    >
      <p
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{
          color: highlight ? "var(--spec-lime)" : "var(--text-dim)",
        }}
      >
        {kicker}
      </p>
      <p className="text-[18px] font-semibold text-white">{heading}</p>
      <p
        className="mt-3 text-[14px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {body}
      </p>
    </div>
  );
}

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px]"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
        color: "var(--text-muted)",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--spec-lime)" }}
      />
      {children}
    </span>
  );
}

function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
      style={{
        color: "var(--spec-lime)",
        backgroundColor: "rgba(197,248,42,0.10)",
        border: "1px solid rgba(197,248,42,0.25)",
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
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
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
