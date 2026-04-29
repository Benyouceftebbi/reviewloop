"use client";

/*
  SECTION 6 — VARIANT B: TWO STACKED MINI-PAGES

  Each mode gets a full-width chapter. Organic stacks above paid.
  Larger mockups, more breathing room, alternating side-of-screen
  for the mockup so each chapter has its own visual rhythm.
*/

const QUOTE = "this serum literally changed my skin in 2 weeks";

export default function UseCasesStacked() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="px-6 pt-24 md:px-20 md:pt-[140px]">
        <div className="mx-auto max-w-[1280px]">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
          >
            {"{/}"}&nbsp;&nbsp;VARIANT B — STACKED &nbsp;·&nbsp; USE CASES
          </p>
          <h2 className="mt-5 max-w-[900px] text-center font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)] md:mx-auto">
            Same product.{" "}
            <em
              className="font-display italic font-normal"
              style={{ color: "var(--purple-soft)" }}
            >
              Two
            </em>{" "}
            jobs.
          </h2>
        </div>
      </div>

      {/* CHAPTER 1 — Organic */}
      <OrganicChapter />

      {/* Chapter divider — small mono "or" caption */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-20">
        <div className="flex items-center gap-4 py-6">
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border-subtle)" }}
          />
          <span
            className="font-mono text-[10px] uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.32em" }}
          >
            or
          </span>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border-subtle)" }}
          />
        </div>
      </div>

      {/* CHAPTER 2 — Paid */}
      <PaidChapter />

      <div className="px-6 pb-24 md:px-20 md:pb-[140px]">
        <p
          className="mt-12 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // most brands run both. one tool, two outputs.
        </p>
      </div>
    </section>
  );
}

/* =================================================================
   CHAPTER 1 — Organic (copy left, mockup right)
   ================================================================= */
function OrganicChapter() {
  return (
    <div className="relative px-6 py-16 md:px-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)", opacity: 0.6 }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        {/* COPY (left) */}
        <div>
          <p
            className="font-mono text-[10px] uppercase"
            style={{
              color: "var(--purple-soft)",
              letterSpacing: "0.22em",
            }}
          >
            {"{/}"}&nbsp;&nbsp;CHAPTER 1 — AUTO-POST
          </p>
          <h3 className="mt-4 font-medium leading-[1.1] tracking-[-0.01em] text-white text-[clamp(28px,3.4vw,46px)]">
            A daily testimonial drip.{" "}
            <em
              className="font-display italic font-normal"
              style={{ color: "var(--purple-soft)" }}
            >
              Without the daily.
            </em>
          </h3>
          <p
            className="mt-6 max-w-[520px] text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            We auto-post a fresh branded creative to your IG every 48 hours,
            in your brand&apos;s voice, from comments your customers already
            wrote.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Auto-post approved creatives on your weekly schedule",
              "Daily drip — without you opening Canva once",
              "Approval-only mode if you want a final eye on each",
            ].map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="mt-1.5 font-mono text-[10px]"
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
            className="mt-10 inline-flex items-center gap-2 font-medium"
            style={{ color: "var(--purple-soft)" }}
          >
            See organic mode <span aria-hidden>→</span>
          </a>
        </div>

        {/* MOCKUP (right) — phone with feed history */}
        <div className="flex justify-center">
          <PhoneFeedHistory />
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   CHAPTER 2 — Paid (mockup left, copy right) — alternates rhythm
   ================================================================= */
function PaidChapter() {
  return (
    <div className="relative px-6 py-16 md:px-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--lime-glow)", opacity: 0.4 }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        {/* MOCKUP (left, but on mobile this stacks BELOW the copy) */}
        <div className="order-2 flex justify-center md:order-1">
          <FullDashboardMockup />
        </div>

        {/* COPY (right) */}
        <div className="order-1 md:order-2">
          <p
            className="font-mono text-[10px] uppercase"
            style={{
              color: "var(--spec-lime)",
              letterSpacing: "0.22em",
            }}
          >
            {"{/}"}&nbsp;&nbsp;CHAPTER 2 — AD CREATIVE
          </p>
          <h3 className="mt-4 font-medium leading-[1.1] tracking-[-0.01em] text-white text-[clamp(28px,3.4vw,46px)]">
            Customer language{" "}
            <em
              className="font-display italic font-normal"
              style={{ color: "var(--spec-lime)" }}
            >
              converts better than your copywriter&apos;s.
            </em>
          </h3>
          <p
            className="mt-6 max-w-[520px] text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Every Meta ad you&apos;ve ever run is 5–8 lines of polished copy a
            writer wrote. Real customer language beats it. We give you the
            creatives in the format Ads Manager wants.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              { lead: "1:1 · 4:5 · 9:16", body: "sized for every Meta placement out of the box" },
              { lead: "5–8×", body: "higher CTR than copywriter-polished ad copy in beta" },
              { lead: "$0.04", body: "per creative vs $80–$300/UGC creator" },
            ].map((b, i) => (
              <li
                key={i}
                className="flex items-baseline gap-4 text-base"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="shrink-0 font-display italic font-normal"
                  style={{ color: "var(--spec-lime)", minWidth: 110 }}
                >
                  {b.lead}
                </span>
                <span>{b.body}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 font-medium"
            style={{ color: "var(--spec-lime)" }}
          >
            See ad mode <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   MOCKUPS — larger versions for the stacked chapters.
   ================================================================= */

/* Phone with feed history — taller, shows multiple auto-posted
   creatives with timestamps as the proof of "schedule." */
function PhoneFeedHistory() {
  const posts = [
    { ts: "auto-posted 2h ago",    accent: true,  bg: "#F2E8D5" },
    { ts: "auto-posted yesterday", accent: false, bg: "#0A0A0A", text: "#FF3B30" },
    { ts: "auto-posted 3d ago",    accent: false, bg: "#C8D4B8", textColor: "#22332B" },
  ];
  return (
    <div className="relative" style={{ width: 280, height: 560 }}>
      <div
        className="absolute inset-0 rounded-[44px] p-[6px]"
        style={{
          backgroundColor: "#1A1A1A",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[38px]"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="flex h-7 items-center justify-between px-5 text-[10px] text-white/80">
            <span>9:41</span>
            <span className="opacity-50">●●●</span>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 top-[6px] h-[18px] w-20 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: "#000" }}
          />

          <div className="space-y-3 p-3">
            {posts.map((p, i) => (
              <div key={i} className="space-y-1">
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ backgroundColor: p.bg }}
                >
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div
                      className="h-5 w-5 rounded-full"
                      style={{
                        backgroundColor:
                          (p as { textColor?: string }).textColor ||
                          (p as { text?: string }).text ||
                          "#1A1A1A",
                      }}
                    />
                    <p
                      className="text-[9px] font-bold"
                      style={{
                        color:
                          (p as { textColor?: string }).textColor ||
                          (p as { text?: string }).text ||
                          "#1A1A1A",
                      }}
                    >
                      @yourbrand
                    </p>
                    {p.accent && (
                      <span
                        className="ml-auto rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: "var(--spec-lime)",
                          color: "#1A1A1A",
                        }}
                      >
                        new
                      </span>
                    )}
                  </div>
                  <div className="px-3 pb-3 pt-0">
                    <p
                      className="text-[11px] leading-[1.3]"
                      style={{
                        color:
                          (p as { textColor?: string }).textColor ||
                          (p as { text?: string }).text ||
                          "#1A1A1A",
                        fontFamily: i === 0 ? "var(--font-display)" : "inherit",
                        fontStyle: i === 0 ? "italic" : "normal",
                        fontWeight: i === 1 ? 700 : 400,
                        textTransform: i === 1 ? "uppercase" : "none",
                      }}
                    >
                      {QUOTE}
                    </p>
                  </div>
                </div>
                <p
                  className="text-center font-mono text-[8px]"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.2em",
                  }}
                >
                  // {p.ts}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Larger ad-platform composer mockup with multiple creatives
   loaded — proves the testing-volume pitch. */
function FullDashboardMockup() {
  const creatives = [
    { bg: "#F2E8D5", text: "#1A1A1A", style: "italic", ctr: "3.4%" },
    { bg: "#0A0A0A", text: "#FF3B30", style: "uppercase", ctr: "2.9%" },
    { bg: "#C8D4B8", text: "#22332B", style: "lowercase", ctr: "4.1%" },
    { bg: "#FF7A2A", text: "#1A1A1A", style: "lowercase", ctr: "5.2%" },
  ];

  return (
    <div
      className="w-full max-w-[560px] overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "#0A0A0E",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
        </div>
        <span
          className="font-mono text-[9px] uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
        >
          ads composer · ad set view
        </span>
        <span className="w-8" />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <p
            className="font-mono text-[10px] uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
          >
            // 4 creatives, 1 testimonial
          </p>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "rgba(197,248,42,0.12)",
              color: "var(--spec-lime)",
              border: "1px solid var(--spec-lime)",
            }}
          >
            live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {creatives.map((c, i) => (
            <div key={i} className="space-y-1.5">
              <div
                className="aspect-square overflow-hidden rounded-lg p-3"
                style={{ backgroundColor: c.bg, color: c.text }}
              >
                <p
                  className="font-mono text-[7px] uppercase"
                  style={{ opacity: 0.55, letterSpacing: "0.22em" }}
                >
                  // your brand
                </p>
                <p
                  className="mt-2 leading-[1.2]"
                  style={{
                    fontSize: 10,
                    fontStyle: c.style === "italic" ? "italic" : "normal",
                    fontFamily:
                      c.style === "italic" ? "var(--font-display)" : "inherit",
                    fontWeight: c.style === "uppercase" ? 800 : 500,
                    textTransform:
                      c.style === "uppercase"
                        ? "uppercase"
                        : c.style === "lowercase"
                        ? "lowercase"
                        : "none",
                  }}
                >
                  {QUOTE}
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span style={{ color: "var(--text-dim)" }}>creative {i + 1}</span>
                <span style={{ color: "var(--spec-lime)" }}>CTR {c.ctr}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance trend */}
        <div
          className="mt-4 rounded-lg p-3"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center justify-between">
            <p
              className="font-mono text-[9px] uppercase"
              style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
            >
              cpa · last 14 days
            </p>
            <p
              className="font-display italic"
              style={{ color: "var(--spec-lime)", fontSize: 16 }}
            >
              −32%
            </p>
          </div>
          <svg viewBox="0 0 200 30" className="mt-2 h-6 w-full">
            <polyline
              points="0,22 30,20 60,18 90,14 120,11 150,7 180,4 200,3"
              fill="none"
              stroke="var(--spec-lime)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
