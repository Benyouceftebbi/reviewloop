"use client";

/*
  SECTION 6 — VARIANT A: ASYMMETRIC SPLIT

  Two side-by-side panels with INTENTIONALLY DIFFERENT internal
  layouts. The organic side is sparse + photographic (one phone
  mockup centered with breathing room). The paid side is denser +
  metrics-led (a wide dashboard composition with metric callouts
  in the header).

  The asymmetry between the two sides IS the message: these are
  two different jobs, not two flavors of the same job.
*/

const QUOTE = "this serum literally changed my skin in 2 weeks";

export default function UseCasesSplit() {
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
          {"{/}"}&nbsp;&nbsp;VARIANT A — ASYMMETRIC &nbsp;·&nbsp; USE CASES
        </p>
        <h2 className="mt-5 text-center font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          Same product.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Two
          </em>{" "}
          jobs.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          <OrganicPanel />
          <PaidPanel />
        </div>

        <p
          className="mt-10 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // most brands run both. one tool, two outputs.
        </p>
      </div>
    </section>
  );
}

/* =================================================================
   LEFT — ORGANIC PANEL (sparse, photographic, phone-dominant)
   ================================================================= */
function OrganicPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 md:p-10"
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
          style={{
            color: "var(--purple-soft)",
            letterSpacing: "0.22em",
          }}
        >
          {"{/}"}&nbsp;&nbsp;AUTO-POST
        </p>
        <h3 className="mt-3 max-w-[420px] text-2xl font-medium leading-tight tracking-tight md:text-[28px]">
          Your feed runs while you don&apos;t.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Posts a fresh creative every 48 hours.
          </em>
        </h3>
        <p
          className="mt-4 max-w-[420px] text-base"
          style={{ color: "var(--text-muted)" }}
        >
          Your IG schedule is a job nobody wants. We make it disappear.
        </p>

        {/* Centered phone mockup with massive breathing room. */}
        <div className="my-10 flex items-center justify-center md:my-12">
          <PhoneMockup />
        </div>

        <ul className="space-y-3">
          {[
            "Auto-post approved creatives on your weekly schedule",
            "Daily testimonial drip — without opening Canva once",
            "Approval-only mode if you want a final eye on each",
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
          className="mt-8 inline-flex items-center gap-2 font-medium"
          style={{ color: "var(--purple-soft)" }}
        >
          See organic mode <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* =================================================================
   RIGHT — PAID PANEL (denser, metrics-led, dashboard-dominant)
   ================================================================= */
function PaidPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 md:p-10"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--lime-glow)", opacity: 0.5 }}
      />

      <div className="relative">
        {/* Header row — heading on left, metric callout on right (asymmetric). */}
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <p
              className="font-mono text-[10px] uppercase"
              style={{
                color: "var(--spec-lime)",
                letterSpacing: "0.22em",
              }}
            >
              {"{/}"}&nbsp;&nbsp;AD CREATIVE
            </p>
            <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight md:text-[28px]">
              Real customer voice.{" "}
              <em
                className="font-display italic font-normal"
                style={{ color: "var(--spec-lime)" }}
              >
                Meta-ready in one click.
              </em>
            </h3>
          </div>
          <MetricCallout />
        </div>

        <p
          className="mt-4 max-w-[480px] text-base"
          style={{ color: "var(--text-muted)" }}
        >
          Your highest-converting ad copy is already in your DMs. We render
          it for the platform.
        </p>

        {/* Dashboard mockup — denser, fills more horizontal space. */}
        <div className="my-7 md:my-8">
          <AdsDashboardMockup />
        </div>

        {/* Number-led bullets to fit performance-marketer reading register. */}
        <ul className="space-y-3">
          {[
            { lead: "1:1, 4:5, 9:16", body: "sized for every Meta placement out of the box" },
            { lead: "5–8×", body: "higher CTR than copywriter-polished ad copy in beta" },
            { lead: "$0.04", body: "cost per creative vs $80–$300/UGC creator" },
          ].map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="mt-[1px] shrink-0 font-display italic text-base font-normal"
                style={{ color: "var(--spec-lime)", minWidth: 80 }}
              >
                {b.lead}
              </span>
              <span>{b.body}</span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 font-medium"
          style={{ color: "var(--spec-lime)" }}
        >
          See ad mode <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* =================================================================
   MOCKUPS — stylized, recognizable-from-shape, not screenshot-real.
   ================================================================= */

/* Phone mockup: dark device frame, simple feed inside.
   We don't reproduce Instagram chrome — generic "@yourbrand" feed,
   with a small lime "posting" badge on the freshly auto-posted card. */
function PhoneMockup() {
  return (
    <div
      className="relative"
      style={{ width: 240, height: 460 }}
    >
      <div
        className="absolute inset-0 rounded-[40px] p-[6px]"
        style={{
          backgroundColor: "#1A1A1A",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[34px]"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          {/* status bar */}
          <div className="flex h-7 items-center justify-between px-5 text-[10px] text-white/80">
            <span>9:41</span>
            <span className="opacity-50">●●●</span>
          </div>
          {/* notch */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[6px] h-[18px] w-20 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: "#000" }}
          />

          {/* feed */}
          <div className="space-y-2 p-2">
            {/* peek of previous post */}
            <div
              className="rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                height: 40,
              }}
            />

            {/* main post — the auto-posted creative */}
            <div
              className="overflow-hidden rounded-2xl"
              style={{ backgroundColor: "#F2E8D5" }}
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="h-6 w-6 rounded-full bg-[#1A1A1A]" />
                <p className="text-[10px] font-bold text-[#1A1A1A]">
                  @yourbrand
                </p>
                <span
                  className="ml-auto rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--spec-lime)",
                    color: "#1A1A1A",
                  }}
                >
                  posting
                </span>
              </div>
              <div className="p-4 pt-0">
                <p
                  className="font-display italic text-[13px] leading-[1.3]"
                  style={{ color: "#1A1A1A", fontWeight: 400 }}
                >
                  {QUOTE}
                </p>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-[10px] text-[#1A1A1A]">
                <span>♡ 247</span>
                <span className="opacity-60">2h</span>
              </div>
            </div>

            <p
              className="text-center font-mono text-[8px]"
              style={{
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.2em",
              }}
            >
              // auto-posted 2h ago
            </p>

            {/* peek of next post */}
            <div
              className="rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                height: 56,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Metric callout floating in the header of the paid panel. */
function MetricCallout() {
  return (
    <div
      className="hidden shrink-0 rounded-2xl px-4 py-3 text-right md:block"
      style={{
        backgroundColor: "rgba(197,248,42,0.08)",
        border: "1px solid var(--spec-lime)",
      }}
    >
      <p
        className="font-mono text-[9px] uppercase"
        style={{ color: "var(--spec-lime)", letterSpacing: "0.2em" }}
      >
        avg. cpa change
      </p>
      <p
        className="mt-1 font-display italic leading-none"
        style={{ color: "var(--spec-lime)", fontSize: 28 }}
      >
        −32%
      </p>
    </div>
  );
}

/* Ad-platform composer mockup. Three-column layout: nav rail,
   creative preview, metric cards. Stylized, no real brand UI. */
function AdsDashboardMockup() {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "#0A0A0E",
        border: "1px solid var(--border-subtle)",
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
          ads composer
        </span>
        <span className="w-8" />
      </div>

      <div
        className="grid gap-3 p-3"
        style={{
          gridTemplateColumns: "70px 1fr 110px",
          minHeight: 220,
        }}
      >
        {/* nav rail */}
        <div className="space-y-1.5">
          {Array.from({ length: 6 }).map((_, i) => {
            const active = i === 1;
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded px-1.5 py-1"
                style={{
                  backgroundColor: active ? "rgba(197,248,42,0.08)" : "transparent",
                }}
              >
                <div
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{
                    backgroundColor: active
                      ? "var(--spec-lime)"
                      : "rgba(255,255,255,0.18)",
                  }}
                />
                <div
                  className="h-1.5 flex-1 rounded"
                  style={{
                    backgroundColor: active
                      ? "rgba(197,248,42,0.35)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* creative preview */}
        <div className="flex flex-col gap-2">
          <p
            className="font-mono text-[9px] uppercase"
            style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
          >
            // creative — 1:1
          </p>
          <div
            className="overflow-hidden rounded-lg p-3"
            style={{ backgroundColor: "#F2E8D5" }}
          >
            <p
              className="font-mono text-[8px] uppercase"
              style={{
                color: "#1A1A1A",
                opacity: 0.55,
                letterSpacing: "0.22em",
              }}
            >
              // your brand
            </p>
            <p
              className="mt-2 font-display italic leading-[1.2]"
              style={{ color: "#1A1A1A", fontSize: 12, fontWeight: 400 }}
            >
              {QUOTE}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[8px]" style={{ color: "rgba(0,0,0,0.5)" }}>
                @anon_customer
              </span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "var(--spec-lime)",
                  color: "#1A1A1A",
                }}
              >
                ✓ ready
              </span>
            </div>
          </div>
          {/* form-row stand-ins */}
          <div className="space-y-1.5">
            {[
              ["primary text", 0.7],
              ["headline", 0.5],
              ["call to action", 0.4],
            ].map(([label, width], i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded px-2 py-1.5 text-[9px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "var(--text-dim)",
                }}
              >
                <span>{String(label)}</span>
                <span
                  className="h-1 rounded"
                  style={{
                    width: `${(width as number) * 80}px`,
                    backgroundColor: "rgba(255,255,255,0.18)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* metrics */}
        <div className="space-y-2">
          {[
            { label: "CTR", value: "3.4%" },
            { label: "CPA", value: "$12.40" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded p-2"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="font-mono text-[8px] uppercase"
                style={{
                  color: "var(--text-dim)",
                  letterSpacing: "0.18em",
                }}
              >
                {m.label}
              </p>
              <p
                className="font-display italic leading-none"
                style={{ color: "var(--spec-lime)", fontSize: 16 }}
              >
                {m.value}
              </p>
            </div>
          ))}
          <div
            className="rounded p-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <p
              className="font-mono text-[8px] uppercase"
              style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
            >
              14d trend
            </p>
            <svg viewBox="0 0 60 18" className="mt-1 h-4 w-full">
              <polyline
                points="0,15 12,12 24,10 36,7 48,4 60,2"
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
    </div>
  );
}
