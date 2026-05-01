"use client";

/*
  Sidebar — fixed 240px left rail.

  Visual:
    - Sits on bg-deep (#050507) so it reads as a slightly recessed
      surface vs. the bg-base canvas.
    - Active item gets a thin lime left-bar + lime icon + lime label.
      Inactive items live in muted white with a 1px bg-elevated chip
      backdrop on hover.
    - Top: brand mark identical to the marketing nav (white square +
      "ReviewLoop" wordmark in font-sans).
    - Bottom: credits pill (mock) + tiny avatar chip.
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <IconGrid /> },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: <IconMessage /> },
  { href: "/dashboard/creatives", label: "Creatives", icon: <IconSpark /> },
  { href: "/dashboard/connections", label: "Connections", icon: <IconLink /> },
  { href: "/dashboard/settings", label: "Settings", icon: <IconCog /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-20 hidden w-[240px] flex-col border-r md:flex"
      style={{
        backgroundColor: "var(--bg-deep)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Brand */}
      <div className="flex h-[64px] items-center gap-2.5 px-5">
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-canvas"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 4v5h-5" />
          </svg>
        </span>
        <span className="font-sans text-[15px] font-medium tracking-tight text-white">
          ReviewLoop
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
        <p
          className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          Workspace
        </p>
        {NAV.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
              style={{
                color: isActive ? "var(--spec-lime)" : "rgba(255,255,255,0.72)",
                backgroundColor: isActive ? "rgba(197,248,42,0.06)" : "transparent",
              }}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full"
                  style={{
                    backgroundColor: "var(--spec-lime)",
                    boxShadow: "0 0 12px var(--lime-glow)",
                  }}
                />
              )}
              <span
                className="flex h-5 w-5 items-center justify-center transition-colors group-hover:text-white"
                style={{ color: isActive ? "var(--spec-lime)" : "rgba(255,255,255,0.55)" }}
              >
                {item.icon}
              </span>
              <span className="transition-colors group-hover:text-white">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t p-4" style={{ borderColor: "var(--border-subtle)" }}>
        <div
          className="flex items-center justify-between rounded-xl border px-3 py-2.5"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <div className="flex flex-col">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.22em]"
              style={{ color: "var(--text-dim)" }}
            >
              Credits
            </span>
            <span className="font-display italic text-[18px] leading-none text-white">
              7 <span className="text-white/40 not-italic font-sans text-[12px]">/ 10</span>
            </span>
          </div>
          <button
            className="rounded-pill px-3 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "var(--spec-lime)", color: "#1A1A1A" }}
          >
            Top up
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium"
            style={{ backgroundColor: "rgba(197,248,42,0.15)", color: "var(--spec-lime)" }}
          >
            BY
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[12px] text-white">Ben Y.</span>
            <span className="truncate text-[10px]" style={{ color: "var(--text-dim)" }}>
              ben@brand.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Inline icons (1.5px stroke, 20×20 viewbox) ---------- */
function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      {children}
    </svg>
  );
}
function IconGrid() {
  return (
    <IconBase>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </IconBase>
  );
}
function IconMessage() {
  return (
    <IconBase>
      <path d="M21 12a8 8 0 0 1-11.6 7.16L4 20l.84-5.4A8 8 0 1 1 21 12z" />
    </IconBase>
  );
}
function IconSpark() {
  return (
    <IconBase>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M5.6 5.6l2.8 2.8" />
      <path d="M15.6 15.6l2.8 2.8" />
      <path d="M5.6 18.4l2.8-2.8" />
      <path d="M15.6 8.4l2.8-2.8" />
    </IconBase>
  );
}
function IconLink() {
  return (
    <IconBase>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5" />
    </IconBase>
  );
}
function IconCog() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 0 1-4 0v-.07A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 0 1 0-4h.07A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 0 1 4 0v.07A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87 1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 0 1 0 4h-.07a1.7 1.7 0 0 0-1.56 1.04z" />
    </IconBase>
  );
}
