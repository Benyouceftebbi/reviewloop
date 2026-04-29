"use client";

/*
  SECTION 6 — VARIANT C: THE DIVERGING PIPELINE

  A Y-fork visualization. One input (a customer comment card) at the
  top splits into TWO destinations: an auto-posted phone feed (left)
  and an ads-composer dashboard (right). The pipeline IS the pitch:
  same input, two outputs.

  Mobile: the Y-fork can't survive a single column literally. We swap
  to a single arrow with a small "branch" icon, then stack the two
  destinations vertically — preserving cause-effect without the
  branching geometry.
*/

const QUOTE = "this serum literally changed my skin in 2 weeks";

export default function UseCasesPipeline() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT C — PIPELINE &nbsp;·&nbsp; USE CASES
        </p>
        <h2 className="mt-5 max-w-[900px] text-center font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)] md:mx-auto">
          One comment.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Two
          </em>{" "}
          destinations.
        </h2>

        {/* INPUT NODE — centered at top */}
        <div className="mt-14 flex justify-center md:mt-16">
          <CommentInputCard />
        </div>

        {/* DESKTOP Y-FORK */}
        <div className="hidden md:block">
          <ForkSVG />
        </div>

        {/* MOBILE single-arrow + branch indicator */}
        <div className="my-6 flex flex-col items-center gap-2 md:hidden">
          <ArrowDown />
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.32em" }}
          >
            ↙ both forks ↘
          </p>
        </div>

        {/* DESTINATIONS — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <OrganicDestination />
          <PaidDestination />
        </div>

        <p
          className="mt-12 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // most brands take both forks. one tool, two destinations.
        </p>
      </div>
    </section>
  );
}

/* =================================================================
   INPUT CARD — the comment that gets routed to both destinations
   ================================================================= */
function CommentInputCard() {
  return (
    <div
      className="relative w-full max-w-[440px] rounded-2xl p-5"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-soft)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-9 w-9 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />
        <div className="flex-1">
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.22em" }}
          >
            // input · raw customer comment
          </p>
          <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-dim)" }}>
            @anon_customer · 2h
          </p>
        </div>
      </div>
      <p className="mt-3 text-base text-white/90">{QUOTE}</p>
    </div>
  );
}

/* =================================================================
   Y-FORK SVG — desktop only.
   Two paths drawn from the input center down to the two destinations.
   ================================================================= */
function ForkSVG() {
  return (
    <div className="relative my-6" style={{ height: 100 }}>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="purple-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(139,127,232,0.4)" />
            <stop offset="100%" stopColor="rgba(139,127,232,0.9)" />
          </linearGradient>
          <linearGradient id="lime-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(197,248,42,0.4)" />
            <stop offset="100%" stopColor="rgba(197,248,42,0.9)" />
          </linearGradient>
        </defs>

        {/* shared trunk */}
        <line
          x1="500" y1="0" x2="500" y2="40"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />

        {/* left branch — purple */}
        <path
          d="M500 40 Q500 60, 350 70 T 200 100"
          stroke="url(#purple-line)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 4"
        />
        {/* right branch — lime */}
        <path
          d="M500 40 Q500 60, 650 70 T 800 100"
          stroke="url(#lime-line)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 4"
        />

        {/* arrow heads */}
        <polygon
          points="200,100 195,93 205,93"
          fill="rgba(139,127,232,0.9)"
        />
        <polygon
          points="800,100 795,93 805,93"
          fill="rgba(197,248,42,0.9)"
        />

        {/* fork node */}
        <circle cx="500" cy="40" r="4" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 12 24" className="h-6 w-3">
      <path
        d="M6 0 L6 22 M2 18 L6 22 L10 18"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

/* =================================================================
   LEFT DESTINATION — Organic / Auto-post
   ================================================================= */
function OrganicDestination() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-7 md:p-8"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--purple-glow)", opacity: 0.55 }}
      />

      <div className="relative">
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "var(--purple-soft)", letterSpacing: "0.22em" }}
        >
          {"{/}"}&nbsp;&nbsp;FORK 1 — AUTO-POST
        </p>
        <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-white md:text-[26px]">
          Posts on your schedule.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            You stay in approval-only mode.
          </em>
        </h3>

        {/* Compact phone mockup — the destination of the left fork */}
        <div className="my-7 flex justify-center">
          <SmallPhoneMockup />
        </div>

        <ul className="space-y-2.5">
          {[
            "auto-posts to IG + FB on your weekly schedule",
            "approval queue if you want a final eye on each",
            "set once · runs forever",
          ].map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="mt-1 font-mono text-[10px]"
                style={{ color: "var(--text-dim)" }}
              >
                {"{/}"}
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="mt-7 inline-flex items-center gap-2 font-medium"
          style={{ color: "var(--purple-soft)" }}
        >
          See organic mode <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* =================================================================
   RIGHT DESTINATION — Paid / Ad creative download
   ================================================================= */
function PaidDestination() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-7 md:p-8"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--lime-glow)", opacity: 0.45 }}
      />

      <div className="relative">
        <p
          className="font-mono text-[10px] uppercase"
          style={{ color: "var(--spec-lime)", letterSpacing: "0.22em" }}
        >
          {"{/}"}&nbsp;&nbsp;FORK 2 — AD CREATIVE
        </p>
        <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-white md:text-[26px]">
          Sized for Meta.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--spec-lime)" }}
          >
            Real language, higher CTR.
          </em>
        </h3>

        {/* Compact dashboard mockup — destination of the right fork */}
        <div className="my-7 flex justify-center">
          <SmallDashboardMockup />
        </div>

        <ul className="space-y-2.5">
          {[
            { lead: "1:1, 4:5, 9:16", body: "all Meta placements out of the box" },
            { lead: "5–8×", body: "higher CTR than copywriter-polished copy" },
            { lead: "$0.04", body: "per creative · vs $80–$300/UGC creator" },
          ].map((b, i) => (
            <li
              key={i}
              className="flex items-baseline gap-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="shrink-0 font-display italic font-normal"
                style={{ color: "var(--spec-lime)", minWidth: 90 }}
              >
                {b.lead}
              </span>
              <span>{b.body}</span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="mt-7 inline-flex items-center gap-2 font-medium"
          style={{ color: "var(--spec-lime)" }}
        >
          See ad mode <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* =================================================================
   Compact mockups — smaller versions tuned for the pipeline layout.
   ================================================================= */

function SmallPhoneMockup() {
  return (
    <div className="relative" style={{ width: 200, height: 380 }}>
      <div
        className="absolute inset-0 rounded-[34px] p-[5px]"
        style={{
          backgroundColor: "#1A1A1A",
          boxShadow:
            "0 24px 48px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[28px]"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="flex h-6 items-center justify-between px-4 text-[9px] text-white/80">
            <span>9:41</span>
            <span className="opacity-50">●●●</span>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 top-1.5 h-3.5 w-14 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: "#000" }}
          />

          <div className="space-y-2 p-2">
            <div
              className="rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                height: 36,
              }}
            />
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: "#F2E8D5" }}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                <div className="h-5 w-5 rounded-full bg-[#1A1A1A]" />
                <p className="text-[9px] font-bold text-[#1A1A1A]">
                  @yourbrand
                </p>
                <span
                  className="ml-auto rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--spec-lime)",
                    color: "#1A1A1A",
                  }}
                >
                  posted
                </span>
              </div>
              <div className="px-3 pb-3">
                <p
                  className="font-display italic leading-[1.25]"
                  style={{
                    color: "#1A1A1A",
                    fontWeight: 400,
                    fontSize: 11,
                  }}
                >
                  {QUOTE}
                </p>
              </div>
            </div>
            <p
              className="text-center font-mono text-[7px]"
              style={{
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.2em",
              }}
            >
              // auto-posted just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallDashboardMockup() {
  return (
    <div
      className="w-full max-w-[280px] overflow-hidden rounded-xl"
      style={{
        backgroundColor: "#0A0A0E",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-2.5 py-1.5"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
        </div>
        <span
          className="font-mono text-[8px] uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
        >
          ads composer
        </span>
        <span className="w-6" />
      </div>
      <div className="space-y-2 p-2.5">
        <div
          className="overflow-hidden rounded-md p-2.5"
          style={{ backgroundColor: "#F2E8D5" }}
        >
          <p
            className="font-mono text-[7px] uppercase"
            style={{
              color: "#1A1A1A",
              opacity: 0.55,
              letterSpacing: "0.22em",
            }}
          >
            // your brand
          </p>
          <p
            className="mt-1.5 font-display italic leading-[1.2]"
            style={{ color: "#1A1A1A", fontSize: 10, fontWeight: 400 }}
          >
            {QUOTE}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[7px]" style={{ color: "rgba(0,0,0,0.5)" }}>
              @anon
            </span>
            <span
              className="rounded-full px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--spec-lime)",
                color: "#1A1A1A",
              }}
            >
              ✓ ready
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "ctr", value: "3.4%" },
            { label: "cpa", value: "$12" },
            { label: "Δ", value: "−32%" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded p-1.5 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="font-mono text-[7px] uppercase"
                style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
              >
                {m.label}
              </p>
              <p
                className="font-display italic leading-none"
                style={{ color: "var(--spec-lime)", fontSize: 11 }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
