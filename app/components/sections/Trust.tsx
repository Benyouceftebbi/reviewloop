"use client";

/*
  SECTION 9 — TRUST + SECURITY (Variant A: The Trust Strip)

  The quietest section on the page. Almost a footer divider that
  happens to carry information.

  Design rules followed:
   - Vertical padding deliberately smaller than other sections.
   - No big headline / subhead / body framing — a strip is the section.
   - Background is --bg-deep (a deeper canvas than the rest of the page)
     so the section reads as "below the rhythm."
   - Purple beam used at minimum opacity — the dimmest beam on the page.
   - Lime is used ZERO times in this section. The "monastic" mood is the
     pitch.
   - No icons of locks/shields/keys. Just three small calm checkmarks.
   - Meta brand mark referenced inline as text only ("Meta's official
     OAuth"). No logo lockup, no implication of partnership.
   - Animation budget: a single 300ms fade on viewport entry. Confidence
     doesn't perform.
*/

import { useEffect, useRef, useState } from "react";

export default function Trust() {
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="on-record"
      className="relative px-6 py-14 md:px-20 md:py-16"
      style={{
        backgroundColor: "var(--bg-deep)",
        opacity: inView ? 1 : 0,
        transition: "opacity 300ms var(--ease-reveal)",
      }}
    >
      {/* The dimmest purple beam on the page — barely visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[180px]"
        style={{
          background:
            "radial-gradient(ellipse 720px 140px at 50% 0%, rgba(79,70,229,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        {/* No section heading. A tiny mono tag is the only label. */}
        <p
          className="mb-6 text-center font-mono text-[10px] uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.32em" }}
        >
          {"{/}"}&nbsp;&nbsp;ON RECORD
        </p>

        {/* Top hairline divider — extremely subtle. */}
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--border-subtle)" }}
        />

        {/*
          The strip. Three statements + two mono-dot separators.
          On desktop: single horizontal row, distributed.
          On mobile: vertical stack, same dim checkmark prefix on each.
        */}
        <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-5 md:py-10">
          <TrustItem>
            Built on Meta&apos;s official OAuth — we never see your password
          </TrustItem>
          <Dot />
          <TrustItem>
            Disconnect anytime in settings — access ends instantly
          </TrustItem>
          <Dot />
          <TrustItem>
            No ad account access — we can&apos;t spend a dollar of yours
          </TrustItem>
        </div>

        {/* Bottom hairline divider. */}
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--border-subtle)" }}
        />

        {/* Single small footnote line. Same restraint as the strip. */}
        <p
          className="mt-5 text-center font-mono text-[10px]"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          // the same public OAuth handshake every compliant app on Meta uses
        </p>
      </div>
    </section>
  );
}

/*
  TrustItem — one statement in the strip.
  Dim muted color; checkmark is the same dim color (not lime).
  flex-1 lets the three items distribute evenly across the row on desktop.
*/
function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-1 items-start gap-2.5 text-sm leading-snug md:items-center"
      style={{ color: "var(--text-muted)" }}
    >
      <Check />
      <span>{children}</span>
    </div>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[3px] h-3.5 w-3.5 shrink-0 md:mt-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--text-dim)" }}
      aria-hidden
    >
      <path d="M3 8l3 3 7-7" />
    </svg>
  );
}

/* Dot separator — visible only on desktop, between row items. */
function Dot() {
  return (
    <span
      aria-hidden
      className="hidden font-mono text-base md:inline"
      style={{ color: "var(--text-dim)", opacity: 0.45 }}
    >
      ·
    </span>
  );
}
