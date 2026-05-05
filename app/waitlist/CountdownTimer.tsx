"use client";

/*
  COUNTDOWN TIMER — hero element on the waitlist page.

  Renders four big segments (DAYS · HOURS · MINUTES · SECONDS) that
  tick down toward LAUNCH_AT. Each segment is its own card with a
  subtle lime border, a tabular-nums display, and a vertical divider
  inside on >= md to mimic the segmented "clock board" feel of a
  real launch countdown.

  Hydration-safe: the first server render shows "--" placeholders so
  the hydrated React tree matches the SSR HTML. Once mounted on the
  client, a 1Hz interval drives the actual tick.
*/

import { useEffect, useState } from "react";

// Fixed launch target — ~2 days from "today" (5/5/2026) per the
// product brief. Picked at 18:00 UTC so the live demo always reads
// roughly two-and-change days remaining.
export const LAUNCH_AT = new Date("2026-05-07T18:00:00Z");

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function diff(now: number): Remaining {
  const ms = LAUNCH_AT.getTime() - now;
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, done: false };
}

export default function CountdownTimer() {
  // `null` while we're still pre-mount — renders the dashed
  // placeholders below. After mount we tick every second.
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    setT(diff(Date.now()));
    const id = window.setInterval(() => {
      setT(diff(Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <Segment label="Days"    value={t?.days} />
        <Segment label="Hours"   value={t?.hours} />
        <Segment label="Minutes" value={t?.minutes} />
        <Segment label="Seconds" value={t?.seconds} pulsing />
      </div>

      {t?.done && (
        <p
          className="mt-6 text-center font-mono text-[12px] uppercase tracking-[0.22em]"
          style={{ color: "var(--spec-lime)" }}
        >
          {"// "}we&apos;re live — refresh to enter
        </p>
      )}
    </div>
  );
}

/* ---------- One numeric segment ---------- */

function Segment({
  label,
  value,
  pulsing,
}: {
  label: string;
  value: number | undefined;
  pulsing?: boolean;
}) {
  // Pre-mount placeholder so SSR + first hydration render match.
  const display = value === undefined ? "--" : String(value).padStart(2, "0");

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border px-2 py-5 sm:py-6 md:py-8"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.02), 0 14px 40px -16px rgba(0,0,0,0.6)",
      }}
    >
      {/* Soft top highlight — gives the cards a slight bevel so they
          read as physical "tiles" rather than flat rectangles. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(197,248,42,0.28), transparent)",
        }}
      />

      {/* Subtle lime ambient glow under the numerals on the SECONDS
          segment so the live tick is the visual anchor. */}
      {pulsing && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(197,248,42,0.10), transparent 70%)",
          }}
        />
      )}

      <span
        className="relative font-medium tabular-nums leading-none text-white"
        style={{
          fontSize: "clamp(2.4rem, 8vw, 5.25rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {display}
      </span>

      <span
        className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}
