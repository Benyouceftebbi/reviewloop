"use client";

/*
  Testimonials inbox.

  Single-column list. Each row is a Next.js <Link> that takes you to
  /dashboard/testimonials/[id], where the full creative-generation
  flow lives. Filter chips across the top let you slice by platform
  or unread state. Counts are computed off the full dataset so the
  numbers don't shift while filtering.
*/

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PLATFORM_META,
  relativeTime,
  type Platform,
  type Testimonial,
} from "../_data/testimonials";

type Filter = "all" | Platform | "unread";

export default function TestimonialsView({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((t) => t.unread);
    return items.filter((t) => t.platform === filter);
  }, [items, filter]);

  const counts = useMemo(
    () =>
      ({
        all: items.length,
        unread: items.filter((t) => t.unread).length,
        instagram: items.filter((t) => t.platform === "instagram").length,
        tiktok: items.filter((t) => t.platform === "tiktok").length,
        google: items.filter((t) => t.platform === "google").length,
        x: items.filter((t) => t.platform === "x").length,
        trustpilot: items.filter((t) => t.platform === "trustpilot").length,
        dm: items.filter((t) => t.platform === "dm").length,
        email: items.filter((t) => t.platform === "email").length,
      } as Record<Filter, number>),
    [items],
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 md:px-8 md:py-10">
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
          <span
            className="font-display italic font-normal"
            style={{ color: "var(--spec-lime)" }}
          >
            testimonials
          </span>
        </h1>
        <p className="text-[13px] text-white/55 md:text-[14px]">
          Pick any comment to turn it into a branded creative.
        </p>
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
          <Row key={t.id} t={t} />
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function Row({ t }: { t: Testimonial }) {
  const meta = PLATFORM_META[t.platform];
  return (
    <li>
      <Link
        href={`/dashboard/testimonials/${t.id}`}
        className="group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-[1px]"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        {/* Hover lime sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 0 1px rgba(197,248,42,0.45), 0 0 32px rgba(197,248,42,0.10)",
          }}
        />

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
          <span
            aria-hidden
            className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ color: "var(--spec-lime)" }}
          >
            generate →
          </span>
        </div>
      </Link>
    </li>
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

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </svg>
  );
}
