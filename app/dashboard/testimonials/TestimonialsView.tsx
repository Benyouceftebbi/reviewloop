"use client";

/*
  Testimonials inbox + side panel.

  Two columns at lg:
    [List 60%] [Detail panel 40%]

  At md and below, selecting a testimonial promotes the panel to a
  full-width sheet that slides in from the right.

  Selecting a row:
    - Marks active visually (lime left bar + lime ring).
    - Loads the detail in the side panel.
    - Detail panel offers brand template selection + a "Generate
      creative" button. Clicking that runs a 1.4s progress animation
      that drives the existing CreativeCard's reveal stages exactly
      like the marketing-page demo, so the dashboard feels like a
      direct extension of the landing page.
*/

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PLATFORM_META,
  relativeTime,
  type Platform,
  type Testimonial,
} from "../_data/testimonials";
import { BRANDS, BrandThumb, CreativeCard } from "../../components/sections/_demoData";

type Filter = "all" | Platform | "unread";

export default function TestimonialsView({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [brandIdx, setBrandIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 generation progress
  const [generating, setGenerating] = useState(false);
  const rafRef = useRef<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((t) => t.unread);
    return items.filter((t) => t.platform === filter);
  }, [items, filter]);

  const active = items.find((t) => t.id === activeId) ?? items[0];

  // Reset the generated creative whenever the user picks a different
  // testimonial or a different brand template — they should always
  // see the *current* selection's draft state.
  useEffect(() => {
    setProgress(0);
    setGenerating(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [activeId, brandIdx]);

  const generate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setGenerating(true);
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const e = Math.min(1, (t - start) / dur);
      // ease-out-cubic for a satisfying decel
      const eased = 1 - Math.pow(1 - e, 3);
      setProgress(eased);
      if (e < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setGenerating(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Tab counts (use unfiltered items so counts don't shift while filtering).
  const counts = useMemo(() => {
    return {
      all: items.length,
      unread: items.filter((t) => t.unread).length,
      instagram: items.filter((t) => t.platform === "instagram").length,
      tiktok: items.filter((t) => t.platform === "tiktok").length,
      google: items.filter((t) => t.platform === "google").length,
      x: items.filter((t) => t.platform === "x").length,
      trustpilot: items.filter((t) => t.platform === "trustpilot").length,
      dm: items.filter((t) => t.platform === "dm").length,
      email: items.filter((t) => t.platform === "email").length,
    } as Record<Filter, number>;
  }, [items]);

  return (
    <div className="grid grid-cols-1 gap-5 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      {/* LEFT — list */}
      <section className="flex min-w-0 flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            // inbox · {filtered.length} of {items.length}
          </span>
          <h1 className="font-sans text-[28px] font-medium leading-[1.1] text-white md:text-[34px]">
            Your{" "}
            <span className="font-display italic font-normal" style={{ color: "var(--spec-lime)" }}>
              testimonials
            </span>
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          <FilterChip label="All" count={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label="Unread" count={counts.unread} active={filter === "unread"} onClick={() => setFilter("unread")} dot />
          <FilterChip label="Instagram" count={counts.instagram} active={filter === "instagram"} onClick={() => setFilter("instagram")} />
          <FilterChip label="TikTok" count={counts.tiktok} active={filter === "tiktok"} onClick={() => setFilter("tiktok")} />
          <FilterChip label="Google" count={counts.google} active={filter === "google"} onClick={() => setFilter("google")} />
          <FilterChip label="X" count={counts.x} active={filter === "x"} onClick={() => setFilter("x")} />
          <FilterChip label="Trustpilot" count={counts.trustpilot} active={filter === "trustpilot"} onClick={() => setFilter("trustpilot")} />
          <FilterChip label="DM" count={counts.dm} active={filter === "dm"} onClick={() => setFilter("dm")} />
          <FilterChip label="Email" count={counts.email} active={filter === "email"} onClick={() => setFilter("email")} />
        </div>

        {/* List */}
        <ul className="flex flex-col gap-2">
          {filtered.map((t) => (
            <Row
              key={t.id}
              t={t}
              active={t.id === active?.id}
              onSelect={() => setActiveId(t.id)}
            />
          ))}
          {filtered.length === 0 && (
            <li
              className="rounded-2xl border p-8 text-center text-sm text-white/50"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              No testimonials match that filter yet.
            </li>
          )}
        </ul>
      </section>

      {/* RIGHT — detail panel */}
      <aside className="flex min-w-0 flex-col">
        <div
          className="sticky top-[88px] flex flex-col gap-5 overflow-hidden rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          {active ? (
            <DetailPanel
              t={active}
              brandIdx={brandIdx}
              onBrandIdx={setBrandIdx}
              progress={progress}
              generating={generating}
              onGenerate={generate}
            />
          ) : (
            <p className="text-sm text-white/50">Select a testimonial to view details.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function Row({
  t,
  active,
  onSelect,
}: {
  t: Testimonial;
  active: boolean;
  onSelect: () => void;
}) {
  const meta = PLATFORM_META[t.platform];
  return (
    <li>
      <button
        onClick={onSelect}
        className="group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all"
        style={{
          borderColor: active ? "rgba(197,248,42,0.55)" : "var(--border-subtle)",
          backgroundColor: active ? "rgba(197,248,42,0.04)" : "var(--bg-elevated)",
          boxShadow: active ? "0 0 0 1px rgba(197,248,42,0.35), 0 0 32px rgba(197,248,42,0.10)" : undefined,
        }}
      >
        {active && (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 rounded-r-full"
            style={{
              backgroundColor: "var(--spec-lime)",
              boxShadow: "0 0 12px var(--lime-glow)",
            }}
          />
        )}

        {/* Platform chip */}
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: meta.bg, color: meta.color }}
        >
          {meta.icon}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px]">
            <span className="font-medium text-white">{t.author}</span>
            <span className="text-white/35">·</span>
            <span className="text-white/55">{t.handle}</span>
            <span className="text-white/35">·</span>
            <span className="text-white/45">{relativeTime(t.postedAt)}</span>
            {typeof t.rating === "number" && (
              <>
                <span className="text-white/35">·</span>
                <span className="flex items-center gap-0.5" style={{ color: "#FBBC05" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </span>
              </>
            )}
          </div>
          <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-white/85">
            {t.text}
          </p>
          {t.postContext && (
            <p
              className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-dim)" }}
            >
              ↳ {t.postContext}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 pl-2">
          {t.unread && (
            <span
              aria-label="unread"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "var(--spec-lime)",
                boxShadow: "0 0 8px var(--lime-glow)",
              }}
            />
          )}
          <span
            className="hidden rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] sm:inline"
            style={{ color: meta.color, backgroundColor: meta.bg }}
          >
            {meta.label}
          </span>
        </div>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Detail panel                                                        */
/* ------------------------------------------------------------------ */

function DetailPanel({
  t,
  brandIdx,
  onBrandIdx,
  progress,
  generating,
  onGenerate,
}: {
  t: Testimonial;
  brandIdx: number;
  onBrandIdx: (i: number) => void;
  progress: number;
  generating: boolean;
  onGenerate: () => void;
}) {
  const meta = PLATFORM_META[t.platform];
  const brand = BRANDS[brandIdx] ?? BRANDS[0];
  const isReady = progress >= 0.95;

  return (
    <>
      {/* Source pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: meta.color, backgroundColor: meta.bg }}
        >
          {meta.icon}
          {meta.label}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          {relativeTime(t.postedAt)}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-medium"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {initialsOf(t.author)}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-[14px] font-medium text-white">{t.author}</span>
          <span className="text-[12px] text-white/55">{t.handle}</span>
        </div>
      </div>

      {/* Quote */}
      <blockquote
        className="rounded-xl border p-4 text-[15px] leading-relaxed text-white/90"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <span className="font-display italic text-white/40">&ldquo;</span>
        {t.text}
        <span className="font-display italic text-white/40">&rdquo;</span>
      </blockquote>

      {t.postContext && (
        <div
          className="rounded-xl border p-3 font-mono text-[11px]"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          ↳ {t.postContext}
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: "var(--border-subtle)" }} />

      {/* Brand picker */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            // brand template
          </span>
          <span className="text-[11px] text-white/50">{BRANDS[brandIdx]?.label ?? ""}</span>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {BRANDS.map((b, i) => (
            <BrandThumb
              key={b.id}
              brand={b}
              active={i === brandIdx}
              onClick={() => onBrandIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Creative preview */}
      <div className="relative">
        <CreativeCard brand={brand} testimonial={t.text} progress={progress} />

        {/* Empty-state overlay */}
        {progress === 0 && !generating && (
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl text-center"
            style={{ backgroundColor: "rgba(10,10,15,0.55)", backdropFilter: "blur(2px)" }}
          >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(197,248,42,0.12)",
                color: "var(--spec-lime)",
                boxShadow: "0 0 24px var(--lime-glow)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v4" />
                <path d="M12 17v4" />
                <path d="M3 12h4" />
                <path d="M17 12h4" />
                <path d="M5.6 5.6l2.8 2.8" />
                <path d="M15.6 15.6l2.8 2.8" />
              </svg>
            </span>
            <p className="text-[12px] text-white/70">
              Pick a template, then generate the ad creative.
            </p>
          </div>
        )}
      </div>

      {/* Generate / actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onGenerate}
          disabled={generating}
          className="group inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3.5 text-[14px] font-medium transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
          style={{
            backgroundColor: "var(--spec-lime)",
            color: "#1A1A1A",
            boxShadow: "0 0 28px var(--lime-glow)",
          }}
        >
          {generating ? (
            <>
              <Spinner /> Generating ({Math.round(progress * 100)}%)
            </>
          ) : isReady ? (
            <>
              Regenerate
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                ↻
              </span>
            </>
          ) : (
            <>
              Generate ad creative
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </>
          )}
        </button>

        {isReady && (
          <div className="grid grid-cols-2 gap-2">
            <SecondaryBtn label="Download PNG" />
            <SecondaryBtn label="Send to Meta" />
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Bits                                                                */
/* ------------------------------------------------------------------ */

function FilterChip({
  label,
  count,
  active,
  onClick,
  dot,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  dot?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] transition-colors"
      style={{
        borderColor: active ? "rgba(197,248,42,0.55)" : "var(--border-subtle)",
        backgroundColor: active ? "rgba(197,248,42,0.10)" : "var(--bg-elevated)",
        color: active ? "var(--spec-lime)" : "rgba(255,255,255,0.7)",
      }}
    >
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: active ? "var(--spec-lime)" : "rgba(197,248,42,0.6)",
            boxShadow: active ? "0 0 8px var(--lime-glow)" : undefined,
          }}
        />
      )}
      <span className="font-medium">{label}</span>
      <span
        className="rounded-full px-1.5 py-0.5 font-mono text-[9px]"
        style={{
          backgroundColor: active ? "rgba(197,248,42,0.15)" : "rgba(255,255,255,0.04)",
          color: active ? "var(--spec-lime)" : "rgba(255,255,255,0.5)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

function SecondaryBtn({ label }: { label: string }) {
  return (
    <button
      className="rounded-pill border px-4 py-2.5 text-[12px] font-medium text-white/85 transition-colors hover:border-white/25 hover:text-white"
      style={{
        borderColor: "var(--border-soft)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      {label}
    </button>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "");
}
