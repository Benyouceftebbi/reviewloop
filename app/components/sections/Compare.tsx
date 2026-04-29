"use client";

/*
  SECTION 7 — WHY THIS VS. THE ALTERNATIVES

  A 4-column × 4-row comparison that reads as a table conceptually but
  is custom-styled (no spreadsheet feel).

  Layout — CSS grid with 5 tracks:
    [ row label ] [ competitor A ] [ competitor B ] [ competitor C ] [ Us ]

  Visual treatment per spec:
   - Three competitor columns: dim text, --bg-base, subtle row dividers.
   - "Us" column: --bg-elevated (slightly lighter), 4px lime left border,
     soft purple glow behind the entire column. No row dividers inside
     the Us column so it reads as one continuous block.
   - Punchline values inside Us cells are white serif italic.
   - A small lime "← what you're looking at" pill floats above the Us
     column header.

  Reveal:
   - IntersectionObserver fires once at 0.2 threshold.
   - Each row reveals its 4 competitor cells left-to-right (80ms stagger).
   - The Us cell on each row reveals an EXTRA 300ms after its row's
     competitor cells — that's the spec's "400ms after the others" beat.
   - After everything lands, the Us column's lime border does a single
     soft pulse (CSS keyframe defined inline).
*/

import { useEffect, useRef, useState } from "react";

type Row = {
  label: string;
  ugc: string;
  canva: string;
  full: string;
  us: string;
};

const ROWS: Row[] = [
  { label: "Time per creative",   ugc: "3–7 days",     canva: "20–40 min",                  full: "20–40 min",                  us: "<60 sec" },
  { label: "Cost per creative",   ugc: "$80–$300",     canva: "Your time + tool fees",      full: "Your time + tool fees",      us: "Pennies" },
  { label: "Real customer voice", ugc: "Manufactured", canva: "Real, but you copy-paste",   full: "Real, but you copy-paste",   us: "Real, automatic" },
  { label: "Stays on-brand",      ugc: "Hit or miss",  canva: "If you're a designer",       full: "If you're a designer",       us: "Always" },
];

const COMPETITORS = ["UGC creators", "Canva + scheduler", "Full social tools"];

export default function Compare() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [pulseUs, setPulseUs] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // After all reveals complete (~1.6s after inView), pulse the Us border once.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPulseUs(true), 1600);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      // bg now provided by the page-wide <PageBackground /> layer
      style={{ backgroundColor: "transparent" }}
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
          {"{/}"}&nbsp;&nbsp;VS. THE ALTERNATIVES
        </p>
        <h2 className="mt-5 max-w-[1000px] font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            Not
          </em>{" "}
          a Canva. Not a Hootsuite. Not a UGC creator.
        </h2>
        <p
          className="mt-6 max-w-[640px] text-xl"
          style={{ color: "var(--text-muted)" }}
        >
          We do one thing — and we do it in under a minute.
        </p>

        {/* TABLE */}
        <div className="mt-16 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible">
          <div className="relative grid min-w-[860px] grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
            {/* Purple glow behind the Us column. */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-6%] top-[-10%] z-0 h-[120%] w-[34%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--purple-glow) 0%, transparent 70%)",
                opacity: inView ? 1 : 0,
                transition: "opacity 900ms var(--ease-reveal) 800ms",
              }}
            />

            {/* HEADER ROW */}
            <HeaderCell />
            {COMPETITORS.map((name, i) => (
              <HeaderCell key={name} inView={inView} delay={120 + i * 100}>
                <ColumnLabel>{name}</ColumnLabel>
              </HeaderCell>
            ))}
            <HeaderCell isUs inView={inView} delay={700}>
              <div className="relative">
                <UsPill inView={inView} />
                <ColumnLabel isUs>Us</ColumnLabel>
              </div>
            </HeaderCell>

            {/* DATA ROWS */}
            {ROWS.map((row, ri) => {
              const isLast = ri === ROWS.length - 1;
              const base = 500 + ri * 130;
              return (
                <RowCells
                  key={ri}
                  row={row}
                  inView={inView}
                  baseDelay={base}
                  isLast={isLast}
                  pulseUs={pulseUs && isLast}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/*
        One-shot pulse for the Us column's lime border after reveal.
        Triggered by adding `data-pulse-us` to Us cells.
      */}
      <style>{`
        @keyframes limePulse {
          0%   { box-shadow: 0 0 0 0 rgba(197,248,42,0.55); }
          50%  { box-shadow: 0 0 0 8px rgba(197,248,42,0); }
          100% { box-shadow: 0 0 0 0 rgba(197,248,42,0); }
        }
        [data-pulse-us="true"] {
          animation: limePulse 900ms ease-out 1;
        }
      `}</style>
    </section>
  );
}

/* ---------- Cells ---------- */

function HeaderCell({
  children,
  inView = true,
  delay = 0,
  isUs = false,
}: {
  children?: React.ReactNode;
  inView?: boolean;
  delay?: number;
  isUs?: boolean;
}) {
  return (
    <div
      className="relative z-[1] px-5 pb-5 pt-2"
      style={{
        backgroundColor: isUs ? "var(--bg-elevated)" : "transparent",
        borderLeft: isUs ? "4px solid var(--spec-lime)" : "none",
        borderTopLeftRadius: isUs ? 12 : undefined,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `all 500ms var(--ease-reveal) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ColumnLabel({
  children,
  isUs,
}: {
  children: React.ReactNode;
  isUs?: boolean;
}) {
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-[0.22em]"
      style={{ color: isUs ? "var(--spec-lime)" : "var(--text-dim)" }}
    >
      {"{/}"}&nbsp;&nbsp;{children}
    </span>
  );
}

function UsPill({ inView }: { inView: boolean }) {
  return (
    <span
      className="absolute -top-12 right-0 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
      style={{
        backgroundColor: "var(--spec-lime)",
        color: "#1A1A1A",
        boxShadow: "0 0 24px var(--lime-glow)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(-6px)",
        transition: "all 600ms var(--ease-reveal) 1100ms",
      }}
    >
      ← what you&apos;re looking at
    </span>
  );
}

function RowCells({
  row,
  inView,
  baseDelay,
  isLast,
  pulseUs,
}: {
  row: Row;
  inView: boolean;
  baseDelay: number;
  isLast: boolean;
  pulseUs: boolean;
}) {
  return (
    <>
      {/* row label (first column) */}
      <DataCell inView={inView} delay={baseDelay} isLast={isLast}>
        <div className="flex items-start gap-2">
          <span
            className="mt-[3px] font-mono text-[10px]"
            style={{ color: "var(--text-dim)" }}
          >
            {"{/}"}
          </span>
          <span
            className="text-sm font-medium md:text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {row.label}
          </span>
        </div>
      </DataCell>

      <DataCell inView={inView} delay={baseDelay + 80} isLast={isLast}>
        <CompText>{row.ugc}</CompText>
      </DataCell>
      <DataCell inView={inView} delay={baseDelay + 160} isLast={isLast}>
        <CompText>{row.canva}</CompText>
      </DataCell>
      <DataCell inView={inView} delay={baseDelay + 240} isLast={isLast}>
        <CompText>{row.full}</CompText>
      </DataCell>

      <DataCell
        isUs
        inView={inView}
        delay={baseDelay + 540}
        isLast={isLast}
        pulse={pulseUs}
      >
        <span
          className="font-display italic font-normal text-base md:text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          {row.us}
        </span>
      </DataCell>
    </>
  );
}

function DataCell({
  children,
  inView,
  delay,
  isUs = false,
  isLast = false,
  pulse = false,
}: {
  children: React.ReactNode;
  inView: boolean;
  delay: number;
  isUs?: boolean;
  isLast?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      data-pulse-us={isUs && pulse ? "true" : undefined}
      className="relative z-[1] px-5 py-5"
      style={{
        backgroundColor: isUs ? "var(--bg-elevated)" : "var(--bg-base)",
        borderTop: isUs ? "none" : "1px solid var(--border-subtle)",
        borderLeft: isUs ? "4px solid var(--spec-lime)" : "none",
        borderBottomLeftRadius: isUs && isLast ? 12 : undefined,
        borderBottomRightRadius: isUs && isLast ? 12 : undefined,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 500ms var(--ease-reveal) ${delay}ms, transform 500ms var(--ease-reveal) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CompText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
      {children}
    </span>
  );
}
