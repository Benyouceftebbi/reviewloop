"use client";

/*
  /audit — single-purpose squeeze page, restyled to match the
  marketing site's hero language.

  Design notes:
   - Wraps the page in <PageBackground /> so the same purple/blue
     glow choreography that runs under the home page also runs here.
     The page now reads like one continuous stage instead of a
     standalone Hormozi template.
   - Section labels use the brand "{/} LABEL" mono pattern instead
     of lime chips.
   - Headlines use the landing-page typographic mix: large white sans
     + italic lavender serif accent (`font-display italic`) on the
     emotional words.
   - Primary CTA uses the same endless-arrow + lime pill pattern as
     Hero/FinalCTA so all conversion clicks feel like one button.
   - Logo, footer, and the embedded form keep their existing roles —
     the only thing changing is the visual language.
*/

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageBackground from "../components/PageBackground";

export default function AuditPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden font-sans text-white">
      {/* Shared marketing-site background — same component as / */}
      <PageBackground />

      {/* Logo only — no nav. Identical to the marketing logo mark. */}
      <header className="relative z-10 flex items-center justify-center pt-10">
        <Link href="/" aria-label="reviewloop home" className="opacity-90 hover:opacity-100 transition-opacity">
          <LogoMark />
        </Link>
      </header>

      <HeroSection />
      <WhoSection />
      <ProblemSection />
      <HowItWorksSection />
      <SampleReportSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />

      {/* Minimal footer */}
      <footer
        className="relative z-10 border-t py-10 text-center text-body-s text-muted"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
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
          <a href="mailto:hello@reviewloop.app" className="hover:text-white transition-colors">
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
/* Hero                                                                */
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
    if (typeof window !== "undefined") {
      sessionStorage.setItem("audit_handle", handle.trim());
      sessionStorage.setItem("audit_email", email.trim());
    }
    router.push("/audit/scanning");
  };

  return (
    <section className="relative z-10 mx-auto max-w-[1300px] px-6 pb-24 pt-20 md:px-10">
      {/* Mono pre-headline — matches Hero's "// from comment to ad" cadence */}
      <p className="mb-5 text-center font-mono text-body-s tracking-wide text-muted">
        {"// "}for skincare DTC founders doing $500K–$5M a year
      </p>

      {/* Big landing-page-style headline:
          white sans + italic lavender serif on the emotional words. */}
      <h1 className="mx-auto max-w-[1100px] text-center font-medium leading-[1.08] tracking-tight text-[clamp(2.2rem,5.4vw,4.4rem)]">
        There are{" "}
        <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
          247+
        </em>{" "}
        untapped reviews <br className="hidden md:inline" />
        hiding in your{" "}
        <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
          Instagram
        </em>
        .
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-center text-body-m leading-relaxed text-muted">
        Most skincare brands are sitting on five figures of customer content in
        their DMs and comments. We scan it, rank it, and show you exactly what
        it&apos;s worth — no login, no card, no work on your end.
      </p>

      {/* Trust strip — same ProofPoint pattern as the marketing hero */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <ProofPoint metric="<60s" label="full report" />
        <span aria-hidden className="hidden h-3 w-px bg-white/20 md:block" />
        <ProofPoint metric="public only" label="no password access" />
        <span aria-hidden className="hidden h-3 w-px bg-white/20 md:block" />
        <ProofPoint metric="$0" label="no card needed" />
      </div>

      {/* Two-column body */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left — bullets + form */}
        <div>
          <ul className="space-y-3 text-body-m">
            {[
              "Your exact unused review count",
              "Top 10 reviews ranked by content quality",
              "Estimated dollar value of unused content",
              "Full report delivered in 60 seconds",
              "Zero login, zero card, zero hassle",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={onSubmit} className="mt-10 space-y-4">
            <FormField label="Instagram handle">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40">
                <span className="text-muted">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="yourbrand"
                  className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
              />
            </FormField>

            {/* Primary CTA — endless-arrow + lime pill pattern */}
            <button
              type="submit"
              disabled={submitting}
              className="group mt-2 flex w-full items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-lime text-canvas transition-colors duration-300 group-hover:bg-white">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2">
                  <span className="flex h-14 items-center justify-center"><ArrowUp /></span>
                  <span className="flex h-14 items-center justify-center"><ArrowUp /></span>
                </span>
              </span>
              <span className="rounded-pill bg-lime px-8 py-4 text-[15px] font-medium text-canvas transition-colors duration-300 group-hover:bg-white">
                {submitting ? "Scanning…" : "Run my free scan now"}
              </span>
            </button>

            <p className="text-center text-body-s leading-relaxed text-muted">
              100% free. No card. We never post, message, or share your data.
              Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Right — mock report card */}
        <div className="flex items-start justify-center lg:justify-end">
          <MockReportCard />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mock report card                                                    */
/* ------------------------------------------------------------------ */

function MockReportCard() {
  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 p-6"
      style={{
        backgroundColor: "rgba(20,18,32,0.55)",
        backdropFilter: "blur(14px)",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.10), 0 0 60px -20px rgba(167,139,250,0.18)",
      }}
    >
      <span className="mb-4 inline-block font-mono text-body-s tracking-wide text-muted">
        {"{/}"} EXAMPLE REPORT
      </span>

      <p className="text-[clamp(2.5rem,6vw,3.5rem)] font-medium leading-none">
        <span className="font-display italic font-normal" style={{ color: "#a78bfa" }}>247</span>
      </p>
      <p className="mt-1 text-body-m text-white/70">unused reviews found</p>

      <div className="my-5 h-px w-full bg-white/10" />

      <p className="text-[clamp(1.8rem,4vw,2.2rem)] font-medium leading-none text-white">
        $7,400
      </p>
      <p className="mt-1 text-body-m text-white/70">in unused content value</p>

      {/* Lavender glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(167,139,250,0.18)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Who this is for                                                     */
/* ------------------------------------------------------------------ */

function WhoSection() {
  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>WHO THIS IS FOR</SectionLabel>
        <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
          Built for{" "}
          <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
            real
          </em>{" "}
          DTC operators.
        </h2>
        <ul className="mx-auto mt-10 max-w-md space-y-4 text-left text-body-m">
          {[
            "Skincare DTC brands on Shopify",
            "$500K–$5M annual revenue",
            "Active Instagram engagement (5K+ followers, daily comments)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-white/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

function ProblemSection() {
  const items = [
    { title: "Buried in DMs", desc: "Great reviews hide in message threads nobody scrolls." },
    { title: "Too slow to use", desc: "One review → one creative takes 20–40 minutes in Canva." },
    { title: "No ranking system", desc: "No way to know which reviews are worth using first." },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionLabel>THE PROBLEM</SectionLabel>
          <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
            Why most brands{" "}
            <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
              waste
            </em>{" "}
            their reviews.
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-white/10 p-6"
              style={{
                backgroundColor: "rgba(20,18,32,0.45)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-[16px] font-medium text-white">{item.title}</p>
              <p className="mt-2 text-body-s leading-relaxed text-muted">{item.desc}</p>
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
    { num: "01", title: "Drop your Instagram handle", desc: "Just your public @handle — no login required." },
    { num: "02", title: "We scan your last 90 days", desc: "Comments, replies, tagged posts — all public content." },
    { num: "03", title: "Get your report", desc: "Review count, top 10 ranked, estimated value — in 60 seconds." },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionLabel>HOW IT WORKS</SectionLabel>
          <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
            3 steps.{" "}
            <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
              60 seconds.
            </em>{" "}
            Done.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="text-left">
              <span className="font-mono text-body-s tracking-wide text-muted">
                Step {s.num}
              </span>
              <p className="mt-2 text-[18px] font-medium text-white">{s.title}</p>
              <p className="mt-1 text-body-s leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sample report                                                       */
/* ------------------------------------------------------------------ */

function SampleReportSection() {
  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionLabel>SAMPLE REPORT</SectionLabel>
          <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
            Here&apos;s what{" "}
            <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
              you&apos;ll get
            </em>
            .
          </h2>
        </div>

        <div
          className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-white/10"
          style={{
            backgroundColor: "rgba(20,18,32,0.55)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-body-s"
                style={{
                  backgroundColor: "rgba(167,139,250,0.16)",
                  color: "#a78bfa",
                }}
              >
                @
              </span>
              <div>
                <p className="font-medium text-white">glowskinco</p>
                <p className="text-body-s text-muted">Scanned May 17, 2026</p>
              </div>
            </div>
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                backgroundColor: "rgba(208,246,1,0.14)",
                color: "var(--spec-lime, #d0f601)",
              }}
            >
              Complete
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Unused reviews", value: "312" },
              { label: "Top quality", value: "47" },
              { label: "Est. value", value: "$9,200" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <p className="font-display italic font-normal text-[clamp(1.5rem,4vw,2rem)] leading-none" style={{ color: "#a78bfa" }}>
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Top reviews */}
          <div className="border-t border-white/10 px-6 py-5">
            <p className="mb-4 font-mono text-body-s tracking-wide text-muted">
              {"{/}"} TOP 3 BY QUALITY SCORE
            </p>
            <ul className="space-y-3">
              {[
                { text: '"This completely changed my skin in 2 weeks. I\'m obsessed."', score: 98 },
                { text: '"Finally a product that actually does what it promises!"', score: 94 },
                { text: '"My friends keep asking what I\'m using. Best purchase ever."', score: 91 },
              ].map((r, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <p className="text-body-m leading-relaxed text-white/85">{r.text}</p>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]"
                    style={{
                      backgroundColor: "rgba(208,246,1,0.14)",
                      color: "var(--spec-lime, #d0f601)",
                    }}
                  >
                    {r.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social proof                                                        */
/* ------------------------------------------------------------------ */

function SocialProofSection() {
  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>SOCIAL PROOF</SectionLabel>
        <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
          Brands using{" "}
          <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
            reviewloop
          </em>
          .
        </h2>

        <div
          className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 p-8"
          style={{
            backgroundColor: "rgba(20,18,32,0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="text-body-m leading-relaxed text-muted">
            We&apos;ll add real testimonials here as soon as our first customers
            share their results. No fake quotes — ever.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQ_ITEMS = [
  { q: "Is this safe? Do you store my data?", a: "We only access public data (comments, tagged posts). We don't store your content — just the analysis. You can request deletion anytime." },
  { q: "Do I need to give you my Instagram login?", a: "No. We only need your public handle. No passwords, no OAuth, no access to your account." },
  { q: "Why is this free?", a: "The audit is free because we want to show you what's possible. If you like the results, you can upgrade to auto-generate creatives from your reviews." },
  { q: "What happens after I get my report?", a: "You'll receive an email with your full report. No obligations, no auto-billing. If you want to turn those reviews into ads, we'll show you how." },
  { q: "How long does this take?", a: "60 seconds or less. Most scans complete in under 30." },
];

function FAQSection() {
  return (
    <section className="relative z-10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-medium leading-tight tracking-tight text-[clamp(1.7rem,4vw,2.4rem)]">
            Questions?{" "}
            <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
              Answered.
            </em>
          </h2>
        </div>

        <dl className="mt-10 space-y-4">
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
      className="rounded-2xl border border-white/10"
      style={{
        backgroundColor: "rgba(20,18,32,0.45)",
        backdropFilter: "blur(10px)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[15px] font-medium text-white">{q}</span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
          style={{
            backgroundColor: open ? "rgba(167,139,250,0.18)" : "rgba(255,255,255,0.06)",
            color: open ? "#a78bfa" : "white",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          <PlusIcon />
        </span>
      </button>
      <div style={{ height }} className="overflow-hidden transition-[height] duration-300 ease-out">
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-body-m leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTASection() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !email.trim()) return;
    setSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("audit_handle", handle.trim());
      sessionStorage.setItem("audit_email", email.trim());
    }
    router.push("/audit/scanning");
  };

  return (
    <section className="relative z-10 overflow-hidden px-6 py-24 md:px-10">
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-medium leading-tight tracking-tight text-[clamp(1.9rem,5vw,2.7rem)]">
          Find your{" "}
          <em className="font-display italic font-normal" style={{ color: "#a78bfa" }}>
            hidden
          </em>{" "}
          reviews — free.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-body-m leading-relaxed text-muted">
          Drop your handle, get your report. No login, no card, no work on your end.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-4 text-left">
          <FormField label="Instagram handle">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40">
              <span className="text-muted">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourbrand"
                className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
            />
          </FormField>

          <button
            type="submit"
            disabled={submitting}
            className="group mt-2 flex w-full items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-lime text-canvas transition-colors duration-300 group-hover:bg-white">
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2">
                <span className="flex h-14 items-center justify-center"><ArrowUp /></span>
                <span className="flex h-14 items-center justify-center"><ArrowUp /></span>
              </span>
            </span>
            <span className="rounded-pill bg-lime px-8 py-4 text-[15px] font-medium text-canvas transition-colors duration-300 group-hover:bg-white">
              {submitting ? "Scanning…" : "Run my free scan now"}
            </span>
          </button>

          <p className="text-center text-body-s leading-relaxed text-muted">
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

/* Brand-style "{/} LABEL" section header (mono dim text). */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-body-s tracking-wide text-muted">
      {"{/}"} {children}
    </span>
  );
}

/* Small label above each input — mono dim. */
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

/* Lime + lavender mixed-color trust strip — same as marketing hero. */
function ProofPoint({ metric, label }: { metric: string; label: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span
        className="font-display italic font-normal"
        style={{ color: "var(--spec-lime, #d0f601)" }}
      >
        {metric}
      </span>
      <span className="font-mono text-body-s text-muted">{label}</span>
    </span>
  );
}

function LogoMark() {
  return (
    <span className="flex items-center gap-2 text-[18px] font-semibold text-white">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(208,246,1,0.15)",
          color: "var(--spec-lime, #d0f601)",
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
        backgroundColor: "rgba(208,246,1,0.18)",
        color: "var(--spec-lime, #d0f601)",
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

function ArrowUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
