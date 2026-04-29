"use client";

/*
  FOOTER — page bookend.

  The spec doesn't define a footer section explicitly, so this component
  follows the design system from docs/landing_page_design_spec.md:

   - Background: `--bg-deep` (#050507) — one shade deeper than the
     Final CTA's `--bg-base`, so the footer reads as the page's
     literal foundation, not just another section.
   - Ambient lighting: a single soft purple radial beam from the
     bottom-left corner — mirrors the hero (which beams from the
     bottom-left) so the page closes on the same chord it opened on.
     The Final CTA beams from the top-right; together the three
     create a diagonal of light through the document.
   - Typography: serif italic accent on one word in the parting line
     ("Built with *care*"), `{/}` mono column tags, mono `--text-dim`
     copyright. No headings outside the brand mark.
   - Reveal: identical 700ms fade-up + 12px translateY pattern used
     by every other section, staggered by 120ms across the columns.

  Layout:
   - Top row (desktop): brand mark + tagline on the left, four short
     link columns on the right.
   - Divider (1px `--border-subtle`).
   - Bottom row: status pill ("All systems normal", with a softly
     pulsing lime dot — same lime accent as the CTA pill, but at
     low intensity so it never competes with the real CTA above) +
     copyright + social icon trio.
*/

import { useEffect, useRef, useState } from "react";

const COLUMNS: { label: string; links: string[] }[] = [
  { label: "PRODUCT", links: ["How it works", "Pricing", "Live demo", "Changelog"] },
  { label: "COMPANY", links: ["About", "Customers", "Careers", "Press kit"] },
  { label: "RESOURCES", links: ["Docs", "Brand kit guide", "API status", "Help center"] },
  { label: "LEGAL", links: ["Privacy", "Terms", "GDPR", "DPA"] },
];

export default function Footer() {
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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Same reveal-on-scroll pattern used in FinalCTA / ResultsLog.
  const reveal = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 700ms var(--ease-reveal) ${delay}ms, transform 700ms var(--ease-reveal) ${delay}ms`,
  });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      {/* Ambient bottom-left purple beam — mirrors the hero's lighting. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-40 -left-40 h-[640px] w-[640px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(79, 70, 229, 0.22)" }}
        />
        <div
          className="absolute -bottom-24 left-[18%] h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(139, 127, 232, 0.14)" }}
        />
        {/* Top hairline — a 1px gradient that fades in from the corners,
            so the footer feels welded to the section above instead of
            sitting on a hard rule. */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.10) 70%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-12 pt-24 md:px-20 md:pb-16 md:pt-32">
        {/* ===== Top row: brand + columns ===== */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))] md:gap-10">
          {/* Brand block */}
          <div style={reveal(0)}>
            <a
              href="#"
              className="inline-flex items-baseline gap-1 font-display text-[34px] leading-none tracking-tight text-white"
            >
              <span>reviewloop</span>
              <span
                className="italic"
                style={{ color: "var(--purple-soft)" }}
              >
                .
              </span>
            </a>

            <p
              className="mt-6 max-w-[320px] font-display text-[20px] leading-[1.35] text-white/85"
            >
              Built with{" "}
              <em className="italic" style={{ color: "var(--purple-soft)" }}>
                care
              </em>{" "}
              for the brands that already hear from their customers.
            </p>

            <p
              className="mt-5 max-w-[340px] text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Turn the testimonials sitting in your DMs into Meta-ready creatives
              before your coffee cools.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col, i) => (
            <FooterColumn
              key={col.label}
              label={col.label}
              links={col.links}
              style={reveal(120 + i * 80)}
            />
          ))}
        </div>

        {/* ===== Divider ===== */}
        <div
          className="mt-16 h-px w-full md:mt-20"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.10) 18%, rgba(255,255,255,0.10) 82%, transparent)",
            ...reveal(420),
          }}
        />

        {/* ===== Bottom row ===== */}
        <div
          className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-center md:justify-between"
          style={reveal(500)}
        >
          {/* Left: copyright + status pill */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p
              className="font-mono text-[11px] uppercase"
              style={{ color: "var(--text-dim)", letterSpacing: "0.12em" }}
            >
              {`// `}© 2026 reviewloop. All rights reserved.
            </p>
            <StatusPill />
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-2">
            <SocialIcon label="X / Twitter" href="#">
              <XIcon />
            </SocialIcon>
            <SocialIcon label="LinkedIn" href="#">
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon label="GitHub" href="#">
              <GitHubIcon />
            </SocialIcon>
            <SocialIcon label="Email us" href="mailto:hi@reviewloop.app">
              <MailIcon />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ========== Sub-components ========== */

function FooterColumn({
  label,
  links,
  style,
}: {
  label: string;
  links: string[];
  style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <p
        className="mb-5 font-mono text-[11px]"
        style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
      >
        {`{/}  `}
        {label}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group inline-flex items-center text-[15px] text-white/85 transition-colors duration-300 hover:text-white"
            >
              {/*
                Lime underline that grows from left on hover — keeps the
                footer aligned with the page's CTA color, but only as a
                hover detail so it never shouts.
              */}
              <span className="relative">
                {link}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                  style={{ backgroundColor: "var(--spec-lime)" }}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* "All systems normal" pill — softly pulsing lime dot. */
function StatusPill() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300 hover:border-white/20"
      style={{
        backgroundColor: "var(--pill-bg)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ backgroundColor: "var(--spec-lime)" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            backgroundColor: "var(--spec-lime)",
            boxShadow: "0 0 10px var(--lime-glow)",
          }}
        />
      </span>
      <span
        className="font-mono text-[11px]"
        style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
      >
        All systems normal
      </span>
    </a>
  );
}

/* A single social icon button — circular, subtle, lifts on hover. */
function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
      style={{
        backgroundColor: "var(--pill-bg)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {children}
    </a>
  );
}

/* ========== Icons ========== */

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.52 7.45L22.5 22h-6.84l-4.84-6.32L4.95 22H2.18l7-7.99L1.5 2h7l4.36 5.78L18.244 2Zm-2.4 18.27h1.66L7.27 3.62H5.5l10.343 16.65Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
