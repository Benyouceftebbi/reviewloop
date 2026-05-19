"use client";

/* ================================================================== */
/*  /audit/results — scan results page                                 */
/*  ----------------------------------------------------------------- */
/*  Single-purpose deliverable page shown right after a scan finishes. */
/*  Eight sections, top to bottom:                                     */
/*    1. The Reveal (hero numbers)                                     */
/*    2. Top 10 reviews (the actual report)                            */
/*    3. 3 sample creatives (Path B delivery)                          */
/*    4. DM teaser (locked, drives curiosity)                          */
/*    5. The Stakes (one-line agitation)                               */
/*    6. Founding Member offer (CTA → qualifier modal)                 */
/*    7. Email confirmation note                                       */
/*    8. Footer (Privacy · Terms · Contact)                            */
/*                                                                     */
/*  Until the backend is wired up, the scan results come from a mock   */
/*  object shaped like the `ScanResults` interface in the spec, with   */
/*  handle + email pulled from sessionStorage (set by /audit form).    */
/* ================================================================== */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/* ---------------- Types (mirrors spec) ---------------- */

interface Review {
  text: string;
  authorHandle: string;
  postedAt: string; // ISO
  qualityScore: number; // 1-10
  likes: number;
  replies: number;
}

interface Creative {
  id: string;
  sourceReviewText: string;
  sourceAuthor: string;
}

interface ScanResults {
  scanId: string;
  handle: string;
  scannedAt: string;
  totalReviews: number;
  totalComments: number;
  estimatedValue: number;
  topReviews: Review[];
  sampleCreatives: Creative[];
}

/* ---------------- Mock data (replace with API call later) ---------------- */

const MOCK_REVIEWS: Review[] = [
  {
    text: "this serum literally changed my skin in 2 weeks. obsessed.",
    authorHandle: "sara_l",
    postedAt: "2026-04-28",
    qualityScore: 10,
    likes: 47,
    replies: 4,
  },
  {
    text: "my friends keep asking what i'm using. best purchase ever.",
    authorHandle: "maya.k",
    postedAt: "2026-04-21",
    qualityScore: 10,
    likes: 38,
    replies: 6,
  },
  {
    text: "okay i don't usually do reviews but this stuff is unreal. day 9 and my texture is gone.",
    authorHandle: "ami_w",
    postedAt: "2026-05-02",
    qualityScore: 9,
    likes: 29,
    replies: 2,
  },
  {
    text: "third bottle. nothing has worked like this for my hyperpigmentation.",
    authorHandle: "jenna.b",
    postedAt: "2026-05-09",
    qualityScore: 9,
    likes: 24,
    replies: 1,
  },
  {
    text: "told my whole group chat. so good i'm scared they'll discontinue it lol",
    authorHandle: "rae__c",
    postedAt: "2026-04-12",
    qualityScore: 9,
    likes: 22,
    replies: 7,
  },
  {
    text: "skin barrier is finally calm. nothing else worked. thank you.",
    authorHandle: "lin.studio",
    postedAt: "2026-04-30",
    qualityScore: 8,
    likes: 18,
    replies: 0,
  },
  {
    text: "got mine yesterday and the packaging alone made my morning. ingredients are gold.",
    authorHandle: "tay.beauty",
    postedAt: "2026-05-11",
    qualityScore: 8,
    likes: 14,
    replies: 1,
  },
  {
    text: "i've tried literally every brand in this category. yours actually delivered.",
    authorHandle: "noor.skn",
    postedAt: "2026-04-04",
    qualityScore: 8,
    likes: 12,
    replies: 0,
  },
  {
    text: "wearing zero foundation today and feeling good about it for the first time in years",
    authorHandle: "bri_ll",
    postedAt: "2026-05-05",
    qualityScore: 7,
    likes: 9,
    replies: 0,
  },
  {
    text: "the texture and absorption are top tier. my face doesn't feel sticky at all.",
    authorHandle: "kate_dxb",
    postedAt: "2026-04-18",
    qualityScore: 7,
    likes: 8,
    replies: 1,
  },
];

const MOCK_RESULTS: Omit<ScanResults, "handle"> = {
  scanId: "mock_scan_001",
  scannedAt: new Date().toISOString(),
  totalReviews: 247,
  totalComments: 412,
  estimatedValue: 247 * 30,
  topReviews: MOCK_REVIEWS,
  sampleCreatives: [
    { id: "c1", sourceReviewText: MOCK_REVIEWS[0].text, sourceAuthor: MOCK_REVIEWS[0].authorHandle },
    { id: "c2", sourceReviewText: MOCK_REVIEWS[1].text, sourceAuthor: MOCK_REVIEWS[1].authorHandle },
    { id: "c3", sourceReviewText: MOCK_REVIEWS[2].text, sourceAuthor: MOCK_REVIEWS[2].authorHandle },
  ],
};

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function ResultsPage() {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHandle(sessionStorage.getItem("audit_handle") || "");
      setEmail(sessionStorage.getItem("audit_email") || "");
    }
  }, []);

  // Build the full ScanResults object once handle is known.
  const data: ScanResults = useMemo(
    () => ({ ...MOCK_RESULTS, handle: handle || "yourbrand" }),
    [handle]
  );

  return (
    <main
      className="min-h-screen font-sans text-white"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Header — logo only, no nav (single-purpose page) */}
      <header className="px-4 py-6 md:px-8">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/"
            className="text-xl font-medium tracking-tight text-white"
          >
            reviewloop
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-4 md:px-6">
        <RevealSection data={data} />
        <TopReviewsSection reviews={data.topReviews} />
        <SampleCreativesSection creatives={data.sampleCreatives} />
        <DmTeaserSection totalComments={data.totalComments} />
        <StakesSection
          totalReviews={data.totalReviews}
          estimatedValue={data.estimatedValue}
        />
        <FoundingMemberSection handle={data.handle} email={email} />
        <EmailConfirmationNote email={email} />
      </div>

      {/* Footer — same minimal pattern as /audit */}
      <footer
        className="mt-20 border-t py-8 text-center text-[13px]"
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

/* ================================================================== */
/*  Section 1 — The Reveal                                             */
/* ================================================================== */

function RevealSection({ data }: { data: ScanResults }) {
  return (
    <section className="pt-6 pb-12 text-center">
      <SectionLabel>// SCAN COMPLETE</SectionLabel>
      <p className="mt-4 text-[clamp(1.25rem,3vw,1.5rem)] font-medium text-white">
        @{data.handle}
      </p>

      {/* Massive number */}
      <p
        className="mt-6 font-display font-bold leading-none tabular-nums"
        style={{
          color: "var(--spec-lime)",
          fontSize: "clamp(5rem, 18vw, 9rem)",
          textShadow: "0 0 60px rgba(197,248,42,0.25)",
        }}
      >
        {data.totalReviews.toLocaleString()}
      </p>
      <p
        className="mt-2 text-[15px] uppercase tracking-[0.18em]"
        style={{ color: "var(--text-muted)" }}
      >
        unused reviews found
      </p>

      <Divider />

      {/* Dollar value */}
      <p className="text-[clamp(2rem,6vw,3rem)] font-bold leading-none text-white tabular-nums">
        ${data.estimatedValue.toLocaleString()}
      </p>
      <p
        className="mt-2 text-[14px] uppercase tracking-[0.18em]"
        style={{ color: "var(--text-muted)" }}
      >
        estimated content value
      </p>
      <p
        className="mt-3 text-[11px] italic"
        style={{ color: "var(--text-dim)" }}
      >
        *Based on $30 average UGC creator cost per asset.
      </p>
    </section>
  );
}

/* ================================================================== */
/*  Section 2 — Top 10 reviews                                         */
/* ================================================================== */

function TopReviewsSection({ reviews }: { reviews: Review[] }) {
  const sorted = [...reviews].sort((a, b) => b.qualityScore - a.qualityScore);
  return (
    <section className="py-16">
      <SectionLabel>// YOUR TOP 10 REVIEWS</SectionLabel>
      <h2 className="mt-3 text-balance text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight text-white">
        Ranked by content quality
      </h2>
      <p
        className="mt-2 text-[15px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        These are your best unused reviews — ready to become creatives.
      </p>

      <ul className="mt-8 space-y-3">
        {sorted.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </ul>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  // 9-10 = lime, 7-8 = neutral, <7 = dim
  const tier =
    review.qualityScore >= 9
      ? "high"
      : review.qualityScore >= 7
        ? "mid"
        : "low";
  const badgeStyle: React.CSSProperties =
    tier === "high"
      ? {
          color: "var(--spec-lime)",
          backgroundColor: "rgba(197,248,42,0.12)",
          border: "1px solid rgba(197,248,42,0.3)",
        }
      : tier === "mid"
        ? {
            color: "white",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }
        : {
            color: "var(--text-dim)",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          };

  return (
    <li
      className="rounded-2xl border p-5"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      <span
        className="inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] tabular-nums tracking-[0.1em]"
        style={badgeStyle}
      >
        {review.qualityScore}/10
      </span>
      <p className="mt-3 text-[16px] leading-relaxed text-white">
        &ldquo;{review.text}&rdquo;
      </p>
      <p
        className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]"
        style={{ color: "var(--text-dim)" }}
      >
        @{review.authorHandle} · {formatDate(review.postedAt)} · {review.likes}{" "}
        likes
      </p>
    </li>
  );
}

/* ================================================================== */
/*  Section 3 — Sample creatives                                       */
/* ================================================================== */

function SampleCreativesSection({ creatives }: { creatives: Creative[] }) {
  return (
    <section className="py-16">
      <SectionLabel>// SAMPLE CREATIVES</SectionLabel>
      <h2 className="mt-3 text-balance text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight text-white">
        3 creatives made from your top reviews
      </h2>
      <p
        className="mt-2 text-[15px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        Posts-ready. These are auto-generated — your real ones use your brand
        kit.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {creatives.map((c) => (
          <CreativeCard key={c.id} creative={c} />
        ))}
      </div>
    </section>
  );
}

function CreativeCard({ creative }: { creative: Creative }) {
  return (
    <figure className="space-y-3">
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border p-6"
        style={{
          borderColor: "var(--border-subtle)",
          background:
            "radial-gradient(120% 90% at 30% 0%, rgba(197,248,42,0.08), transparent 60%), var(--bg-elevated)",
        }}
      >
        {/* PREVIEW watermark, top-right corner */}
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{
            color: "var(--text-dim)",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Preview
        </span>

        {/* Tiny brand mark, bottom-left */}
        <span
          className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.18em]"
          style={{ color: "var(--text-dim)" }}
        >
          // your brand
        </span>

        {/* Quote body */}
        <div className="text-center">
          <span
            className="block font-display text-[40px] leading-none"
            style={{ color: "var(--spec-lime)" }}
            aria-hidden
          >
            &ldquo;
          </span>
          <p
            className="mt-2 font-display italic leading-snug text-white"
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)" }}
          >
            {creative.sourceReviewText}
          </p>
          <p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-muted)" }}
          >
            @{creative.sourceAuthor}
          </p>
        </div>
      </div>

      <figcaption
        className="text-center font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: "var(--text-dim)" }}
      >
        from @{creative.sourceAuthor}
      </figcaption>
    </figure>
  );
}

/* ================================================================== */
/*  Section 4 — DM teaser (locked)                                     */
/* ================================================================== */

function DmTeaserSection({ totalComments }: { totalComments: number }) {
  const low = Math.round(totalComments * 0.3);
  const high = Math.round(totalComments * 0.5);

  return (
    <section className="py-16">
      <div
        className="relative overflow-hidden rounded-3xl border p-8 text-center"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(197,248,42,0.1)",
            border: "1px solid rgba(197,248,42,0.25)",
            color: "var(--spec-lime)",
          }}
        >
          <LockIcon />
        </div>

        <h3 className="text-balance text-[clamp(1.25rem,3.5vw,1.6rem)] font-bold leading-snug text-white">
          ~{low}–{high}{" "}
          <span style={{ color: "var(--spec-lime)" }}>MORE</span> reviews hidden
          in your DMs
        </h3>

        {/* Blurred fake DM cards behind a frosted overlay */}
        <div className="relative mx-auto mt-6 max-w-md">
          <div
            className="space-y-2 select-none"
            aria-hidden
            style={{ filter: "blur(6px)" }}
          >
            {["Hey just wanted to say...", "omg the cleanser is amazing—", "so this is my third order and"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-xl border px-4 py-3 text-left"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    @anon_dm · 2d
                  </p>
                  <p className="mt-1 text-[14px] text-white/80">{t}</p>
                </div>
              )
            )}
          </div>

          {/* Frosted overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              backgroundColor: "rgba(10,10,15,0.55)",
              backdropFilter: "blur(2px)",
            }}
          />
        </div>

        <p
          className="mt-6 text-[14px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Founding members unlock DM scanning at launch.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Section 5 — The Stakes                                             */
/* ================================================================== */

function StakesSection({
  totalReviews,
  estimatedValue,
}: {
  totalReviews: number;
  estimatedValue: number;
}) {
  return (
    <section className="py-20 text-center">
      <h2 className="text-balance text-[clamp(1.6rem,5vw,2.4rem)] font-bold leading-[1.1] text-white">
        You&apos;re using{" "}
        <span
          className="font-display italic"
          style={{ color: "var(--spec-lime)" }}
        >
          0%
        </span>{" "}
        of the {totalReviews} reviews you&apos;ve already earned.
      </h2>
      <p
        className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        That&apos;s ${estimatedValue.toLocaleString()} in content sitting
        unused.
      </p>
    </section>
  );
}

/* ================================================================== */
/*  Section 6 — Founding Member offer (CTA)                            */
/* ================================================================== */

function FoundingMemberSection({
  handle,
  email,
}: {
  handle: string;
  email: string;
}) {
  const totalSpots = 50;
  const claimed = 18;
  const remaining = totalSpots - claimed;

  // Modal + thank-you state.
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [spend, setSpend] = useState<string | null>(null);

  const handleSubmit = (value: string) => {
    setSpend(value);
    // Stub: in production, POST { handle, email, spend } to /api/waitlist.
    setSubmitted(true);
  };

  const benefits = [
    "Lifetime 50% off ($24/mo, not $49)",
    "Skip the public launch waitlist",
    "1:1 onboarding call with founder",
    "First 10 creatives made by us, free",
  ];

  if (submitted) {
    return (
      <section className="py-16">
        <div
          className="rounded-3xl border p-8 text-center"
          style={{
            borderColor: "rgba(197,248,42,0.3)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.1), 0 0 60px -20px rgba(197,248,42,0.18)",
          }}
        >
          <SectionLabel>// SPOT RESERVED</SectionLabel>
          <h3 className="mt-3 text-balance text-[clamp(1.4rem,4vw,1.8rem)] font-bold text-white">
            You&apos;re in. Welcome to the founding 50.
          </h3>
          <p
            className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            We&apos;ll email{" "}
            <span className="text-white">{email || "you"}</span> when your
            access is ready and book your onboarding call.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16">
        <div
          className="rounded-3xl border p-8"
          style={{
            borderColor: "rgba(197,248,42,0.25)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.08), 0 0 60px -20px rgba(197,248,42,0.18)",
          }}
        >
          <div className="text-center">
            <SectionLabel>// FOUNDING MEMBER ACCESS</SectionLabel>
            <p
              className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              First {totalSpots} brands ·{" "}
              <span className="text-white">{claimed} spots claimed</span> ·{" "}
              <span style={{ color: "var(--spec-lime)" }}>
                {remaining} left
              </span>
            </p>
          </div>

          <ul className="mx-auto mt-8 max-w-md space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px]">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(197,248,42,0.15)",
                    color: "var(--spec-lime)",
                  }}
                >
                  <CheckIcon />
                </span>
                <span className="text-white/90">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-8 max-w-md">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block w-full rounded-full px-6 py-4 text-center text-[15px] font-semibold transition-transform hover:scale-[1.01]"
              style={{
                backgroundColor: "var(--spec-lime)",
                color: "#0A0A0F",
                boxShadow: "0 0 40px -10px rgba(197,248,42,0.5)",
              }}
            >
              Reserve my founding spot
            </button>
            <p
              className="mt-3 text-center text-[12px] leading-relaxed"
              style={{ color: "var(--text-dim)" }}
            >
              One quick question, then you&apos;re in. We never charge without
              consent.
            </p>
          </div>
        </div>
      </section>

      {open && (
        <QualifierModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          handle={handle}
        />
      )}
      {/* Suppress unused-var warning in dev */}
      <span className="hidden">{spend}</span>
    </>
  );
}

/* ---------- Qualifier modal ---------- */

function QualifierModal({
  onClose,
  onSubmit,
  handle,
}: {
  onClose: () => void;
  onSubmit: (value: string) => void;
  handle: string;
}) {
  const options = ["$0", "$1–500", "$500–2,000", "$2,000+"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(10,10,15,0.75)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qualifier-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border p-6 sm:p-8"
        style={{
          borderColor: "rgba(197,248,42,0.25)",
          backgroundColor: "var(--bg-elevated)",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -20px rgba(197,248,42,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
        >
          <CloseIcon />
        </button>

        <SectionLabel>// ONE QUICK QUESTION</SectionLabel>
        <h3
          id="qualifier-title"
          className="mt-3 text-balance text-[clamp(1.2rem,3.5vw,1.4rem)] font-bold leading-tight text-white"
        >
          How much does @{handle || "yourbrand"} currently spend on UGC
          creatives per month?
        </h3>
        <p
          className="mt-2 text-[13px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Helps us tailor your founding-member onboarding.
        </p>

        <div className="mt-5 grid gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSubmit(opt)}
              className="w-full rounded-xl border px-5 py-4 text-left text-[15px] font-medium text-white transition-colors"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(197,248,42,0.4)";
                e.currentTarget.style.backgroundColor =
                  "rgba(197,248,42,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.02)";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Section 7 — Email confirmation note                                */
/* ================================================================== */

function EmailConfirmationNote({ email }: { email: string }) {
  return (
    <p
      className="pb-4 text-center text-[13px] leading-relaxed"
      style={{ color: "var(--text-dim)" }}
    >
      Your full report PDF has also been sent to{" "}
      <span className="text-white">{email || "your email"}</span>.
    </p>
  );
}

/* ================================================================== */
/*  Shared bits                                                        */
/* ================================================================== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-[11px] uppercase tracking-[0.22em]"
      style={{ color: "var(--spec-lime)" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      className="my-10 h-px w-full"
      style={{ backgroundColor: "var(--border-subtle)" }}
    />
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const now = Date.now();
  const diffDays = Math.floor((now - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}

/* ---------- Icons ---------- */

function CheckIcon() {
  return (
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
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
