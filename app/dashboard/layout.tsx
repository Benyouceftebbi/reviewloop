/*
  Dashboard shell.

  Layout pattern:
    [Sidebar (fixed, 240px)]  [Main column: Topbar + scrolling content]

  Visual language carries the marketing site's brand into a denser
  product surface:
    - bg-base canvas with a subtle grid + radial lime aurora to keep
      the futuristic mood without being noisy.
    - Manrope (font-sans) for product copy, Libre Baskerville italic
      (font-display) for hero numerals and accents.
    - Lime (#C5F82A) is reserved for selection / active state /
      primary action — never decorative.
    - Borders use the spec's --border-subtle / --border-soft tokens.

  No backend yet — the layout is a marketing-side mock that can be
  swapped to real data when auth + storage land.
*/

import type { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen w-full text-white"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Ambient backdrop — fixed under everything. */}
      <BackdropFx />

      <Sidebar />

      {/* Main column — offset by sidebar width on md+. */}
      <div className="relative z-10 flex min-h-screen w-full flex-col md:pl-[240px]">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

/*
  BackdropFx — three stacked layers that sell the "futuristic" feel:
   1. A faint dot grid (pure CSS) for spatial depth.
   2. A wide lime aurora in the bottom-left, very low opacity.
   3. A vertical scanline gradient at the top edge to suggest a HUD.
  All `pointer-events-none` so they never block clicks.
*/
function BackdropFx() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "-1px -1px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
        }}
      />
      {/* Lime aurora */}
      <div
        className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(197,248,42,0.16) 0%, rgba(197,248,42,0) 70%)",
        }}
      />
      {/* Indigo aurora */}
      <div
        className="absolute -top-40 right-[-180px] h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.18) 0%, rgba(79,70,229,0) 70%)",
        }}
      />
      {/* Top scanline */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(197,248,42,0.4), transparent)",
        }}
      />
    </div>
  );
}
