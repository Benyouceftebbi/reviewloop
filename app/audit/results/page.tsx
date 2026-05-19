"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ================================================================== */
/*  /audit/results — scan results page                                 */
/* ================================================================== */

export default function ResultsPage() {
  const [handle, setHandle] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("audit_handle");
      if (stored) setHandle(stored);
    }
  }, []);

  return (
    <main
      className="min-h-screen font-sans text-white px-4 py-12"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="text-center mb-12">
          <Link
            href="/"
            className="text-2xl font-medium tracking-tight text-white"
          >
            reviewloop
          </Link>
        </header>

        {/* Success badge */}
        <div className="text-center mb-8">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{
              color: "var(--spec-lime)",
              backgroundColor: "rgba(197,248,42,0.12)",
              border: "1px solid rgba(197,248,42,0.25)",
            }}
          >
            <CheckIcon />
            Scan complete
          </span>
        </div>

        {/* Main card */}
        <div
          className="rounded-3xl border p-8 text-center"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.08), 0 0 60px -20px rgba(197,248,42,0.12)",
          }}
        >
          <p
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-dim)" }}
          >
            @{handle || "yourbrand"}
          </p>

          <p
            className="text-[clamp(3rem,8vw,5rem)] font-bold leading-none"
            style={{ color: "var(--spec-lime)" }}
          >
            247
          </p>
          <p className="text-lg text-white/80 mt-2">unused reviews found</p>

          <div
            className="my-8 h-px w-full"
            style={{ backgroundColor: "var(--border-subtle)" }}
          />

          <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-none text-white">
            $7,400
          </p>
          <p className="text-lg text-white/80 mt-2">
            estimated content value
          </p>

          <div
            className="my-8 h-px w-full"
            style={{ backgroundColor: "var(--border-subtle)" }}
          />

          <p
            className="text-sm mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Your full report has been sent to your email.
            <br />
            Want to turn these reviews into ad creatives automatically?
          </p>

          <Link
            href="/waitlist"
            className="inline-block w-full rounded-pill py-4 text-center font-semibold transition-transform hover:scale-[1.01]"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#0A0A0F",
            }}
          >
            Join the waitlist
          </Link>

          <p
            className="mt-4 text-[12px]"
            style={{ color: "var(--text-dim)" }}
          >
            Be first to access ReviewLoop when we launch.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link
            href="/audit"
            className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-white"
            style={{ color: "var(--text-dim)" }}
          >
            ← Run another scan
          </Link>
        </footer>
      </div>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
