"use client";

/*
  HERO VARIANT A — Loss angle (shock the number)
  
  Tagline: Free review audit · For skincare DTC brands
  Headline: 200 reviews in your DMs. 0 of them turned into content. Let's fix that.
  Focus: Instagram handle input, 60-second scan, free audit
*/

import { useState } from "react";

export default function HeroVariantA() {
  const [handle, setHandle] = useState("");

  return (
    <section className="relative min-h-screen border-t border-white/10">
      {/* Variant label */}
      <div className="absolute left-4 top-4 z-20 rounded-full bg-lime px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas">
        Variant A — Loss angle
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-10 pt-32">
        {/* Tagline */}
        <p className="mb-5 text-center font-mono text-body-s text-muted tracking-wide">
          Free review audit · For skincare DTC brands
        </p>

        {/* Headline — shock the number */}
        <h1 className="mx-auto max-w-[1100px] text-center font-medium leading-[1.08] tracking-tight text-[clamp(2.4rem,4.8vw,4rem)]">
          <span className="font-display italic text-lime">200</span> reviews in your DMs.{" "}
          <span className="font-display italic text-white/60">0</span> of them turned into content.{" "}
          <em className="font-display italic font-normal text-white/95">
            Let&apos;s fix that.
          </em>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-center font-mono text-body-s tracking-wide text-muted">
          {"// "}free Instagram scan. See every review you&apos;ve received in 90 days, ranked by quality.
        </p>

        {/* Two columns */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:px-12">
          <p className="text-body-m text-muted">
            Enter your Instagram handle. We scan your last 90 days of comments
            and DMs in under 60 seconds. No login, no card.
          </p>
          <p className="text-body-m text-muted">
            You get back: your unused review count, the top 10 ranked by
            quality, and what they&apos;d cost as branded content.
          </p>
        </div>

        {/* Three badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:px-12">
          <ProofBadge text="60-second scan" />
          <span aria-hidden className="hidden h-3 w-px bg-white/20 md:block" />
          <ProofBadge text="No signup, no card" />
          <span aria-hidden className="hidden h-3 w-px bg-white/20 md:block" />
          <ProofBadge text="Built for skincare DTC brands" />
        </div>

        {/* Tags + What you get + CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end md:px-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Tag>Skincare</Tag>
              <Tag>DTC</Tag>
              <Tag>Shopify</Tag>
            </div>
            <ul className="flex flex-col gap-1 font-mono text-body-s text-muted">
              <li>
                <span className="text-white/70">What you get:</span>{" "}
                your unused review count · top 10 ranked · estimated content value
              </li>
              <li>
                <span className="text-white/70">How it starts:</span>{" "}
                enter your Instagram handle (no login needed)
              </li>
            </ul>
          </div>

          {/* CTA with handle input */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-pill border px-4 py-3"
                style={{
                  borderColor: "var(--border-soft)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <span className="text-white/40">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="yourhandle"
                  className="w-32 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
              <a
                href="/waitlist"
                className="group flex items-center gap-1"
              >
                <span className="rounded-pill bg-lime px-8 py-3 font-medium text-canvas transition-colors duration-300 group-hover:bg-white">
                  Run my free scan
                </span>
              </a>
            </div>
            <p className="font-mono text-body-s text-muted text-center md:text-right max-w-sm">
              Enter your handle. We scan your last 90 days. Get your number in about 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBadge({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--spec-lime)" }}
      />
      <span className="font-mono text-body-s text-white/70">{text}</span>
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-pill bg-white/5 px-5 py-2 text-body-s">
      {children}
    </span>
  );
}
