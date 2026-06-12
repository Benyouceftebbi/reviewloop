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
          Unlock with your $1 founding spot below{" "}
          <span aria-hidden style={{ color: "var(--spec-lime)" }}>
            ↓
          </span>
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
/*  Section 6 — $1 Founding Member offer + Launch Countdown            */
/* ================================================================== */

/*
  Launch date is a hardcoded ISO timestamp — same for every visitor,
  NOT a per-visit fake timer. Today is 5/19/2026, so we set launch to
  exactly 7 days out at 09:00 UTC. When the spec's backend lands this
  becomes a config var (LAUNCH_DATE), but the timer behavior is
  identical: tick every second, freeze at zero, flip CTA + label.
*/
const LAUNCH_DATE = "2026-05-26T09:00:00Z";
const FOUNDING_MEMBER_CAP = 50;
const ULTIMATE_TIER_PRICE_DISPLAY = 199;

/*
  Spots claimed is hardcoded for the v0 build (per spec: "Stubbed for
  v0 — acceptable. Do NOT fake-decrement"). Replace with a real
  /api/founding-stats call once the DB is wired.
*/
const SPOTS_CLAIMED_STUB = 18;

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(launchDate: string): TimeLeft {
  const total = new Date(launchDate).getTime() - Date.now();
  return {
    total,
    days: Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((total / 1000 / 60) % 60)),
    seconds: Math.max(0, Math.floor((total / 1000) % 60)),
  };
}

function FoundingMemberSection({
  handle,
  email,
}: {
  handle: string;
  email: string;
}) {
  const remaining = FOUNDING_MEMBER_CAP - SPOTS_CLAIMED_STUB;

  /*
    Initialize timeLeft to null on the server so SSR never renders a
    countdown that immediately mismatches when the client hydrates.
    First useEffect tick fills it in.
  */
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(LAUNCH_DATE));
    const interval = setInterval(() => {
      const next = calculateTimeLeft(LAUNCH_DATE);
      setTimeLeft(next);
      if (next.total <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const launched = timeLeft !== null && timeLeft.total <= 0;

  const handleClaim = () => {
    /*
      Stripe integration intentionally skipped per the user's request.
      In production this POSTs to /api/founding/checkout, which creates
      a one-time `mode: "payment"` Stripe Checkout session for $1 (NOT
      a subscription — auto-renewal would trigger chargebacks) and
      returns a redirect URL. For now, just flip into the confirmed
      state so the founding-confirmed UI is reachable end-to-end.
    */
    setSubmitted(true);
  };

  const benefits = [
    "Unlimited AI creative generation",
    "Full Meta + Shopify + Trustpilot integration",
    "Custom brand kit (logo, colors, fonts)",
    "DM scanning (the locked section above)",
    "Auto-posting to Instagram + Facebook",
    "Priority support — direct line to founder",
    "Analytics dashboard",
  ];

  /* ---------------- Confirmed (post-claim) state ---------------- */
  if (submitted) {
    const spotNumber = SPOTS_CLAIMED_STUB + 1;
    const launchPretty = new Date(LAUNCH_DATE).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return (
      <section className="py-16">
        <div
          className="rounded-3xl border p-8 text-center sm:p-10"
          style={{
            borderColor: "rgba(197,248,42,0.3)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.1), 0 0 60px -20px rgba(197,248,42,0.18)",
          }}
        >
          <SectionLabel>// YOU&apos;RE IN</SectionLabel>
          <h3 className="mt-3 text-balance text-[clamp(1.6rem,4vw,2rem)] font-bold text-white">
            Spot #{spotNumber} secured for{" "}
            <span style={{ color: "var(--spec-lime)" }}>
              @{handle || "yourbrand"}
            </span>
          </h3>
          <p
            className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            We&apos;ll email you at{" "}
            <span className="text-white">
              {email || "your inbox"}
            </span>{" "}
            on launch day ({launchPretty}) with login details.
          </p>

          <div className="mx-auto mt-8 max-w-sm">
            <Link
              href="https://calendly.com/"
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center text-[15px] font-semibold transition-transform hover:scale-[1.01]"
              style={{
                backgroundColor: "var(--spec-lime)",
                color: "#0A0A0F",
                boxShadow: "0 0 40px -10px rgba(197,248,42,0.5)",
              }}
            >
              Book your onboarding call →
            </Link>
            <p
              className="mt-3 text-center text-[12px] leading-relaxed"
              style={{ color: "var(--text-dim)" }}
            >
              Optional — first 50 get a 1:1 with the founder.
            </p>
          </div>

          <div
            className="mx-auto mt-8 max-w-md border-t pt-6 text-left text-[14px] leading-relaxed"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <p>
              In the meantime, your audit report is in your inbox. Reply if
              you have any questions — I read every email.
            </p>
            <p className="mt-3 text-white">— Ben</p>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Pre-claim offer card ---------------- */
  return (
    <section className="py-16">
      <div
        className="rounded-3xl border p-8 sm:p-10"
        style={{
          borderColor: "rgba(197,248,42,0.25)",
          backgroundColor: "var(--bg-elevated)",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.08), 0 0 60px -20px rgba(197,248,42,0.18)",
        }}
      >
        {/* Countdown */}
        <div className="text-center">
          <SectionLabel>
            // {launched ? "LAUNCHING NOW" : "LAUNCHING IN"}
          </SectionLabel>
          <div className="mt-5">
            {launched ? (
              <p
                className="font-display text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight"
                style={{ color: "var(--spec-lime)" }}
              >
                Launching now
              </p>
            ) : (
              <CountdownDisplay timeLeft={timeLeft} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px w-full"
          style={{ backgroundColor: "var(--border-subtle)" }}
        />

        {/* Offer */}
        <div className="text-center">
          <p
            className="font-mono text-[12px] uppercase tracking-[0.22em]"
            style={{ color: "var(--spec-lime)" }}
          >
            Founding Member · $1
          </p>
          <h3 className="mt-3 text-balance text-[clamp(1.4rem,4vw,1.8rem)] font-bold leading-tight text-white">
            Get 1 month of full Ultimate access at launch — for one dollar.
          </h3>
        </div>

        {/* Benefits */}
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

        {/* Anchor price */}
        <p
          className="mx-auto mt-8 max-w-md text-center text-[15px]"
          style={{ color: "var(--text-muted)" }}
        >
          Normally{" "}
          <span className="text-white line-through">
            ${ULTIMATE_TIER_PRICE_DISPLAY}/mo
          </span>{" "}
          — yours for{" "}
          <span
            className="font-display italic font-semibold"
            style={{ color: "var(--spec-lime)" }}
          >
            $1
          </span>
          .
        </p>

        {/* CTA */}
        <div className="mx-auto mt-8 max-w-md">
          <button
            type="button"
            onClick={handleClaim}
            className="block w-full rounded-full px-6 py-4 text-center text-[15px] font-semibold transition-transform hover:scale-[1.01]"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#0A0A0F",
              boxShadow: "0 0 40px -10px rgba(197,248,42,0.5)",
            }}
          >
            {launched ? "Activate my access" : "Claim my $1 founding spot"}
          </button>
        </div>

        {/* Reassurances */}
        <ul className="mx-auto mt-5 max-w-md space-y-2">
          {[
            "One-time $1 charge. No auto-renewal.",
            "Cancel anytime during your month.",
            "Keep your spot even if you don't continue.",
          ].map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 text-[13px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                aria-hidden
                className="mt-[2px] shrink-0"
                style={{ color: "var(--spec-lime)" }}
              >
                <CheckIcon />
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        {/* Spots remaining */}
        <p
          className="mt-8 text-center font-mono text-[12px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-white">{remaining}</span> of{" "}
          {FOUNDING_MEMBER_CAP} spots remaining
        </p>
      </div>
    </section>
  );
}

/* ---------- Countdown display ---------- */

function CountdownDisplay({ timeLeft }: { timeLeft: TimeLeft | null }) {
  // Render zeros on first paint so SSR/CSR markup matches.
  const safe = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-3">
      <TimeUnit value={safe.days} label="DAYS" />
      <Colon />
      <TimeUnit value={safe.hours} label="HRS" />
      <Colon />
      <TimeUnit value={safe.minutes} label="MIN" />
      <Colon />
      <TimeUnit value={safe.seconds} label="SEC" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display text-[clamp(2rem,7vw,3.5rem)] font-bold tabular-nums leading-none"
        style={{
          color: "var(--spec-lime)",
          textShadow: "0 0 40px rgba(197,248,42,0.35)",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      aria-hidden
      className="font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-none"
      style={{ color: "var(--text-dim)", paddingBottom: "clamp(20px,3vw,32px)" }}
    >
      :
    </span>
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
      <span className="text-white">{email || "your email"}</span>. We&apos;ll
      send your launch-day access link to the same address if you grab a
      founding spot.
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
