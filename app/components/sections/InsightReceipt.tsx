"use client";

/*
  VARIANT B — THE RECEIPT

  Concept: a long itemized printer receipt unfurls as the user scrolls.
  Beside it, a parallel column of customer comments tagged "$0 used".
  At one specific scroll moment the totals lock side-by-side: $8,400 paid
  vs. $0 captured. That single frame is the whole pitch.

  Build:
   - Outer section is 220vh tall; inner content uses position:sticky to
     stay centered while the user scrolls past.
   - A scroll listener computes a 0–1 progress and uses it to drive:
      * which receipt lines have appeared
      * which comment lines have appeared
      * a "moment" boolean that flips when totals are visible together
   - Pure DOM + opacity transitions — no canvas, no heavy libs.
*/

import { useEffect, useRef, useState } from "react";

const RECEIPT = [
  ["UGC creator — skincare reel",       400],
  ["UGC creator — testimonial story",   250],
  ["UGC creator — review post (×3)",    900],
  ["Edit revisions",                    180],
  ["UGC creator — unboxing reel (×2)",  650],
  ["Brief / coordination time",         320],
  ["UGC creator — talking head",        700],
  ["UGC creator — product demo",        850],
  ["Concepting fees",                   420],
  ["UGC creator — lifestyle shoot",   1180],
  ["Re-shoots",                         430],
  ["UGC creator — review post (×2)",    560],
  ["Misc agency markup",                560],
] as Array<[string, number]>;

const COMMENTS = [
  "this stuff actually works i'm shocked",
  "broke my whole skincare routine in the best way",
  "obsessed isn't a strong enough word",
  "my friend asked what i was using and now she's using it too",
  "wait i actually look forward to using this every morning",
  "shipping was so fast it was almost suspicious lol",
  "this is the only thing that's worked on my texture",
  "i'm telling everyone i know about you guys",
  "scent is so good it makes my whole bathroom smell good",
  "best $40 i've spent on skin in years",
  "ok fine you converted me",
  "my mom stole mine i had to buy another one",
  "literally changed my mornings",
];

export default function InsightReceipt() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const passed = -rect.top;
      setProgress(Math.max(0, Math.min(1, passed / scrollable)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal lines progressively. The receipt and comments each get the
  // full 0..0.85 of progress to fill in; the last 0.15 is the "moment".
  const fillProgress = Math.min(1, progress / 0.85);
  const visibleReceipt = Math.floor(fillProgress * RECEIPT.length);
  const visibleComments = Math.floor(fillProgress * COMMENTS.length);
  const isMoment = progress >= 0.78;

  const total = RECEIPT.reduce((s, [, n]) => s + n, 0);
  const runningTotal = RECEIPT.slice(0, visibleReceipt).reduce(
    (s, [, n]) => s + n,
    0
  );

  return (
    <section
      ref={ref}
      className="relative"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "220vh" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      {/*
        Sticky inner: stays centered for the duration of the scroll range.
        Heading lives here too so it pins above the dual columns.
      */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-20">
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="mb-8 md:mb-12">
            <p
              className="font-mono text-xs uppercase"
              style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
            >
              {"{/}"}&nbsp;&nbsp;VARIANT B — THE RECEIPT
            </p>
            <h2 className="mt-4 font-medium leading-[1.08] tracking-[-0.01em] text-white text-[clamp(28px,3.4vw,46px)]">
              You{"'"}re paying for one column.{" "}
              <em
                className="font-display italic font-normal"
                style={{ color: "var(--purple-soft)" }}
              >
                Ignoring the other.
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {/* LEFT — receipt column */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="mb-4 font-mono text-[10px] uppercase"
                style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
              >
                // april — ugc invoice
              </p>
              <ul className="space-y-2 text-sm">
                {RECEIPT.map(([label, amt], i) => (
                  <li
                    key={i}
                    className="flex justify-between gap-4 transition-opacity duration-500"
                    style={{
                      color: "var(--text-muted)",
                      opacity: i < visibleReceipt ? 1 : 0,
                      transitionDelay: `${(i - visibleReceipt + 2) * 40}ms`,
                    }}
                  >
                    <span className="truncate">{label}</span>
                    <span className="shrink-0 font-mono text-white">
                      ${amt.toLocaleString("en-US")}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 flex items-end justify-between border-t pt-4 transition-opacity duration-700"
                style={{
                  borderColor: "var(--border-subtle)",
                  opacity: visibleReceipt >= RECEIPT.length ? 1 : 0.3,
                }}
              >
                <span
                  className="font-mono text-xs uppercase"
                  style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
                >
                  Total
                </span>
                <span
                  className="font-display italic text-[clamp(32px,3.6vw,48px)] leading-none text-white"
                  style={{
                    textShadow: isMoment
                      ? "0 0 24px var(--purple-glow)"
                      : "none",
                    transition: "text-shadow 600ms var(--ease-reveal)",
                  }}
                >
                  ${runningTotal.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            {/* RIGHT — customer comments column */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: isMoment
                  ? "1px solid var(--spec-lime)"
                  : "1px solid var(--border-subtle)",
                boxShadow: isMoment ? "0 0 40px var(--lime-glow)" : "none",
                transition:
                  "border-color 600ms var(--ease-reveal), box-shadow 600ms var(--ease-reveal)",
              }}
            >
              <p
                className="mb-4 font-mono text-[10px] uppercase"
                style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
              >
                // april — actual customers
              </p>
              <ul className="space-y-2 text-sm">
                {COMMENTS.map((c, i) => (
                  <li
                    key={i}
                    className="flex justify-between gap-4 transition-opacity duration-500"
                    style={{
                      color: "var(--text-muted)",
                      opacity: i < visibleComments ? 1 : 0,
                      transitionDelay: `${(i - visibleComments + 2) * 40}ms`,
                    }}
                  >
                    <span className="truncate">{c}</span>
                    <span
                      className="shrink-0 font-mono"
                      style={{ color: "var(--text-dim)" }}
                    >
                      $0 used
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 flex items-end justify-between border-t pt-4 transition-opacity duration-700"
                style={{
                  borderColor: "var(--border-subtle)",
                  opacity: visibleComments >= COMMENTS.length ? 1 : 0.3,
                }}
              >
                <span
                  className="font-mono text-xs uppercase"
                  style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
                >
                  Captured
                </span>
                <span
                  className="font-display italic text-[clamp(32px,3.6vw,48px)] leading-none"
                  style={{
                    color: isMoment
                      ? "var(--spec-lime)"
                      : "var(--text-primary)",
                    textShadow: isMoment ? "0 0 24px var(--lime-glow)" : "none",
                    transition: "all 600ms var(--ease-reveal)",
                  }}
                >
                  $0
                </span>
              </div>
            </div>
          </div>

          <p
            className="mt-6 text-center font-mono text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            // monthly UGC spend on the left; what your customers said for free
            on the right
          </p>
        </div>
      </div>
    </section>
  );
}
