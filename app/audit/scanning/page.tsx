"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ================================================================== */
/*  /audit/scanning — scan progress page                               */
/*                                                                     */
/*  Split layout like login:                                           */
/*    LEFT  — Loader with 2-min countdown + scrolling status messages  */
/*    RIGHT — TransformShowcase animation (comments → creatives)       */
/* ================================================================== */

const SCAN_DURATION_MS = 2 * 60 * 1000; // 2 minutes

// Status messages that appear during the scan
const STATUS_MESSAGES = [
  { at: 0, text: "Connecting to Instagram API..." },
  { at: 3, text: "Authenticating scan request..." },
  { at: 6, text: "Fetching public profile data..." },
  { at: 10, text: "Scanning recent posts..." },
  { at: 15, text: "Extracting comments from posts..." },
  { at: 22, text: "Found 47 comments so far..." },
  { at: 28, text: "Analyzing comment sentiment..." },
  { at: 35, text: "Scanning tagged posts..." },
  { at: 42, text: "Found 89 comments total..." },
  { at: 50, text: "Extracting mentions and replies..." },
  { at: 58, text: "Found 134 potential reviews..." },
  { at: 65, text: "Running quality scoring algorithm..." },
  { at: 72, text: "Ranking reviews by engagement..." },
  { at: 80, text: "Found 198 high-quality reviews..." },
  { at: 88, text: "Calculating content value..." },
  { at: 95, text: "Generating top 10 recommendations..." },
  { at: 102, text: "Found 247 total unused reviews!" },
  { at: 108, text: "Compiling final report..." },
  { at: 115, text: "Report ready! Redirecting..." },
];

export default function ScanningPage() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [timeLeft, setTimeLeft] = useState(SCAN_DURATION_MS);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const startTimeRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get handle from session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("audit_handle");
      if (stored) setHandle(stored);
    }
  }, []);

  // Timer countdown and status message progression
  useEffect(() => {
    startTimeRef.current = Date.now();
    let lastMessageIndex = -1;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, SCAN_DURATION_MS - elapsed);
      setTimeLeft(remaining);

      // Add new status messages based on elapsed seconds
      const elapsedSec = Math.floor(elapsed / 1000);
      const newMessages: string[] = [];
      
      STATUS_MESSAGES.forEach((msg, idx) => {
        if (msg.at <= elapsedSec && idx > lastMessageIndex) {
          newMessages.push(msg.text);
          lastMessageIndex = idx;
        }
      });

      if (newMessages.length > 0) {
        setVisibleMessages((prev) => [...prev, ...newMessages]);
      }

      // Redirect when complete
      if (remaining <= 0) {
        clearInterval(interval);
        // Navigate to results (placeholder for now)
        router.push("/audit/results");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const progress = 1 - timeLeft / SCAN_DURATION_MS;

  return (
    <main
      className="relative min-h-screen w-full font-sans"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[60vh] w-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(139,127,232,0.18), transparent 70%)",
        }}
      />

      <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* ===================== LEFT — LOADER ===================== */}
        <section className="relative flex flex-col px-6 py-10 md:px-12 md:py-14 lg:px-20">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-medium tracking-tight text-white"
            >
              reviewloop
            </Link>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-dim)" }}
            >
              // scanning
            </span>
          </header>

          <div className="flex flex-1 flex-col justify-center py-12 md:py-0">
            <div className="mx-auto w-full max-w-[440px]">
              {/* Handle being scanned */}
              <div className="mb-8 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm"
                  style={{
                    backgroundColor: "rgba(197,248,42,0.12)",
                    color: "var(--spec-lime)",
                    border: "1px solid rgba(197,248,42,0.25)",
                  }}
                >
                  @
                </span>
                <div>
                  <p className="text-lg font-medium text-white">
                    {handle || "yourbrand"}
                  </p>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Instagram scan in progress
                  </p>
                </div>
              </div>

              {/* Big countdown timer */}
              <div className="mb-8 text-center">
                <p
                  className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  Time remaining
                </p>
                <div className="flex items-center justify-center gap-4">
                  <TimeBlock value={minutes} label="min" />
                  <span
                    className="text-4xl font-light"
                    style={{ color: "var(--spec-lime)" }}
                  >
                    :
                  </span>
                  <TimeBlock value={seconds} label="sec" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div
                  className="h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--border-subtle)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress * 100}%`,
                      backgroundColor: "var(--spec-lime)",
                      boxShadow: "0 0 20px var(--lime-glow)",
                    }}
                  />
                </div>
                <p
                  className="mt-2 text-center font-mono text-[11px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {Math.round(progress * 100)}% complete
                </p>
              </div>

              {/* Animated loader */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div
                    className="h-16 w-16 animate-spin rounded-full border-[3px] border-t-transparent"
                    style={{
                      borderColor: "var(--border-subtle)",
                      borderTopColor: "transparent",
                    }}
                  />
                  <div
                    className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-[3px] border-t-transparent"
                    style={{
                      borderColor: "var(--spec-lime)",
                      borderTopColor: "transparent",
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: "var(--spec-lime)" }}
                  >
                    <ScanIcon />
                  </div>
                </div>
              </div>

              {/* Status messages */}
              <div
                className="h-48 overflow-y-auto rounded-2xl border p-4"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <p
                  className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  // extraction log
                </p>
                <div className="space-y-2">
                  {visibleMessages.map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-[13px]"
                      style={{
                        animation: "fadeSlideIn 0.3s ease-out",
                      }}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            i === visibleMessages.length - 1
                              ? "var(--spec-lime)"
                              : "var(--text-dim)",
                          boxShadow:
                            i === visibleMessages.length - 1
                              ? "0 0 8px var(--lime-glow)"
                              : "none",
                        }}
                      />
                      <span
                        style={{
                          color:
                            i === visibleMessages.length - 1
                              ? "var(--spec-lime)"
                              : "var(--text-muted)",
                        }}
                      >
                        {msg}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <p
                className="mt-6 text-center text-[13px]"
                style={{ color: "var(--text-dim)" }}
              >
                Please keep this page open while we analyze your account.
              </p>
            </div>
          </div>

          <footer
            className="font-mono text-[11px] tracking-wide"
            style={{ color: "var(--text-dim)" }}
          >
            <span className="text-white/50">Secure</span> · read-only access · no
            data stored
          </footer>
        </section>

        {/* ===================== RIGHT — SHOWCASE ===================== */}
        <aside
          className="relative hidden items-center justify-center overflow-hidden border-l md:flex"
          style={{
            backgroundColor: "var(--bg-deep)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <ScanShowcase progress={progress} />
        </aside>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

/* ---------- Time Block ---------- */
function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl border text-4xl font-bold tabular-nums"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
          color: "var(--spec-lime)",
          boxShadow: "0 0 30px rgba(197,248,42,0.08)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <p
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ---------- Scan Icon ---------- */
function ScanIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </svg>
  );
}

/* ================================================================== */
/*  ScanShowcase — comments transforming into creatives                */
/*                                                                     */
/*  Similar to TransformShowcase but synced with scan progress.        */
/* ================================================================== */

const BRANDS = [
  {
    name: "glow",
    bg: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
    accent: "#C5F82A",
    label: "GLOW · Skincare",
  },
  {
    name: "aura",
    bg: "linear-gradient(145deg, #2d1b4e 0%, #1a1a2e 100%)",
    accent: "#E879F9",
    label: "AURA · Beauty",
  },
  {
    name: "zen",
    bg: "linear-gradient(145deg, #1e3a3a 0%, #0f2027 100%)",
    accent: "#5EEAD4",
    label: "ZEN · Wellness",
  },
];

const COMMENTS = [
  "This completely changed my skin in 2 weeks. Obsessed!",
  "Finally a product that actually does what it promises.",
  "My friends keep asking what I'm using. Best purchase ever.",
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ScanShowcase({ progress }: { progress: number }) {
  const [pairIdx, setPairIdx] = useState(0);
  const [localT, setLocalT] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const LOOP_MS = 5000;
    let raf = 0;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = (elapsed % LOOP_MS) / LOOP_MS;
      setLocalT(t);

      if (elapsed >= LOOP_MS) {
        startRef.current = now;
        setPairIdx((i) => (i + 1) % BRANDS.length);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const brand = BRANDS[pairIdx % BRANDS.length];
  const comment = COMMENTS[pairIdx % COMMENTS.length];

  const rawTypeProgress = clamp(localT / 0.25, 0, 1);
  const transitionProgress = clamp((localT - 0.25) / 0.15, 0, 1);
  const buildProgress = clamp((localT - 0.40) / 0.50, 0, 1);

  const rawY = -transitionProgress * 20;
  const rawScale = 1 - transitionProgress * 0.05;
  const rawOpacity = 1 - transitionProgress * 0.2;

  const creativeY = (1 - clamp(buildProgress * 2, 0, 1)) * 20;
  const creativeOpacity = clamp(buildProgress * 2, 0, 1);

  const beamStrength =
    transitionProgress < 0.5
      ? transitionProgress * 2
      : (1 - transitionProgress) * 2;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 md:p-10">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(139,127,232,0.12), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(197,248,42,0.08), transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex w-full max-w-[400px] flex-col gap-4">
        {/* Raw comment */}
        <div
          className="rounded-2xl p-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-soft)",
            transform: `translateY(${rawY}px) scale(${rawScale})`,
            opacity: rawOpacity,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-medium"
              style={{
                backgroundColor: "rgba(139,127,232,0.18)",
                color: "var(--purple-soft)",
              }}
            >
              ac
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">@customer</p>
              <p
                className="font-mono text-[9px]"
                style={{ color: "var(--text-dim)" }}
              >
                instagram · 2h
              </p>
            </div>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider"
              style={{
                color: "var(--purple-soft)",
                backgroundColor: "rgba(139,127,232,0.10)",
              }}
            >
              raw
            </span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {comment.slice(0, Math.floor(rawTypeProgress * comment.length))}
            {rawTypeProgress < 1 && rawTypeProgress > 0 && (
              <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-white/70" />
            )}
          </p>
        </div>

        {/* Connector beam */}
        <div className="relative mx-auto h-8 w-full">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--purple-soft), transparent)",
              opacity: 0.2 + beamStrength * 0.5,
            }}
          />
          <div
            aria-hidden
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              top: `${transitionProgress * 100}%`,
              opacity: beamStrength,
              backgroundColor: "var(--spec-lime)",
              boxShadow: "0 0 12px var(--spec-lime)",
            }}
          />
        </div>

        {/* Creative card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            transform: `translateY(${creativeY}px)`,
            opacity: creativeOpacity,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="relative p-5"
            style={{
              background: brand.bg,
              minHeight: 180,
            }}
          >
            <span
              className="inline-block rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider mb-3"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: brand.accent,
                opacity: clamp(buildProgress * 3, 0, 1),
              }}
            >
              {brand.label}
            </span>

            <p
              className="text-lg font-semibold text-white leading-snug"
              style={{
                opacity: clamp((buildProgress - 0.2) * 2, 0, 1),
              }}
            >
              &ldquo;{comment}&rdquo;
            </p>

            <div
              className="mt-4 flex items-center justify-between"
              style={{
                opacity: clamp((buildProgress - 0.6) * 3, 0, 1),
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: brand.accent }}
              >
                — verified customer
              </span>
              {buildProgress >= 0.9 && (
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase"
                  style={{
                    backgroundColor: brand.accent,
                    color: "#000",
                  }}
                >
                  ready
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 h-px w-32 -translate-x-1/2 overflow-hidden"
        style={{ backgroundColor: "var(--border-subtle)" }}
      >
        <div
          className="h-full"
          style={{
            width: `${localT * 100}%`,
            backgroundColor: "var(--spec-lime)",
          }}
        />
      </div>

      <p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em]"
        style={{ color: "var(--text-dim)" }}
      >
        // transforming reviews into creatives
      </p>
    </div>
  );
}
