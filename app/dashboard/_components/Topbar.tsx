"use client";

/*
  Topbar — sits above main content, sticky.
  Pieces:
    [page breadcrumb] ........ [search] [generate CTA] [bell]
  The "Generate creative" button is the dashboard's marketing-CTA
  echo: same lime pill that appears across the landing page so users
  feel continuity from sign-in into the product.
*/

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname() || "/dashboard";
  const segments = pathname.split("/").filter(Boolean);
  // ["dashboard", "testimonials"] → "Testimonials"
  const last = segments[segments.length - 1] ?? "dashboard";
  const title =
    last === "dashboard"
      ? "Overview"
      : last.charAt(0).toUpperCase() + last.slice(1);

  return (
    <header
      className="sticky top-0 z-10 flex h-[64px] items-center justify-between border-b px-5 backdrop-blur-md md:px-8"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "rgba(10,10,15,0.65)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          / {segments[0] ?? "dashboard"}
        </span>
        <span className="text-white/30">›</span>
        <span className="font-sans text-[15px] font-medium text-white">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <label
          className="hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-white/40"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search testimonials, brands…"
            className="w-56 bg-transparent text-[12px] text-white placeholder:text-white/30 focus:outline-none"
          />
          <span
            className="rounded border px-1.5 py-0.5 font-mono text-[9px] text-white/50"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            ⌘K
          </span>
        </label>

        {/* Bell */}
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white/5"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9z" />
            <path d="M10 21a2 2 0 0 0 4 0" />
          </svg>
          <span
            aria-hidden
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "var(--spec-lime)",
              boxShadow: "0 0 8px var(--lime-glow)",
            }}
          />
        </button>

        {/* Primary CTA */}
        <button
          className="hidden items-center gap-2 rounded-pill px-4 py-2 text-[13px] font-medium transition-transform hover:scale-[1.02] sm:inline-flex"
          style={{
            backgroundColor: "var(--spec-lime)",
            color: "#1A1A1A",
            boxShadow: "0 0 28px var(--lime-glow)",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v4" />
            <path d="M12 17v4" />
            <path d="M3 12h4" />
            <path d="M17 12h4" />
            <path d="M5.6 5.6l2.8 2.8" />
            <path d="M15.6 15.6l2.8 2.8" />
          </svg>
          New creative
        </button>
      </div>
    </header>
  );
}
