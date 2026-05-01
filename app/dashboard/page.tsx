/*
  Dashboard Overview.

  A welcome surface that proves the product works at a glance:
    - Big greeting with a Libre Baskerville italic accent (matches
      the marketing-page display words).
    - 4 KPI tiles in a flexbox grid.
    - "Recent comments" preview that links to /dashboard/testimonials.
    - "Latest creatives" strip that previews finished ad cards.
*/

import Link from "next/link";
import { TESTIMONIALS, PLATFORM_META, relativeTime } from "./_data/testimonials";
import { BRANDS, CreativeCard } from "../components/sections/_demoData";

export default function OverviewPage() {
  const recent = TESTIMONIALS.slice(0, 4);
  const featured = BRANDS.slice(0, 3);

  return (
    <div className="px-5 py-8 md:px-8 md:py-10">
      {/* Greeting */}
      <div className="mb-8 flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          // workspace · brand
        </span>
        <h1 className="font-sans text-[34px] font-medium leading-[1.1] text-white md:text-[44px]">
          Welcome back,{" "}
          <span className="font-display italic font-normal" style={{ color: "var(--spec-lime)" }}>
            Ben
          </span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
          You have <span className="text-white">3 new testimonials</span> waiting to be turned into Meta-ready creatives. Convert one in under a minute.
        </p>
      </div>

      {/* KPIs */}
      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="New testimonials" value="12" delta="+3 today" tone="lime" />
        <Kpi label="Creatives generated" value="38" delta="+5 this week" />
        <Kpi label="Sources connected" value="6" delta="IG · TikTok · GMB · X · Trustpilot · Email" />
        <Kpi label="Avg. CTR uplift" value="2.4×" delta="vs. stock ads" tone="lime" />
      </div>

      {/* Two-column: recent comments + latest creatives */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent comments */}
        <section
          className="lg:col-span-2 rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <header className="mb-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--text-dim)" }}
              >
                // recent
              </span>
              <h2 className="text-[18px] font-medium text-white">Latest testimonials</h2>
            </div>
            <Link
              href="/dashboard/testimonials"
              className="text-[12px] text-white/60 transition-colors hover:text-white"
            >
              View all →
            </Link>
          </header>

          <ul className="flex flex-col gap-2">
            {recent.map((t) => {
              const meta = PLATFORM_META[t.platform];
              return (
                <li
                  key={t.id}
                  className="flex items-start gap-3 rounded-xl border p-3.5 transition-colors hover:border-white/15"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="font-medium text-white">{t.author}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/50">{meta.label}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/40">{relativeTime(t.postedAt)}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-white/80">
                      {t.text}
                    </p>
                  </div>
                  {t.unread && (
                    <span
                      aria-label="unread"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: "var(--spec-lime)",
                        boxShadow: "0 0 8px var(--lime-glow)",
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Latest creatives */}
        <section
          className="rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <header className="mb-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--text-dim)" }}
              >
                // creatives
              </span>
              <h2 className="text-[18px] font-medium text-white">Recently generated</h2>
            </div>
          </header>

          <div className="flex flex-col gap-3">
            {featured.map((b, i) => (
              <div key={b.id} className="overflow-hidden rounded-xl">
                <CreativeCard
                  brand={b}
                  testimonial={
                    [
                      "this serum literally changed my skin in 2 weeks",
                      "ok this is unreasonably good",
                      "best $40 I've spent this year",
                    ][i]
                  }
                  progress={1}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "lime" | "default";
}) {
  const isLime = tone === "lime";
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      {isLime && (
        <span
          aria-hidden
          className="absolute right-0 top-0 h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(197,248,42,0.6))",
          }}
        />
      )}
      <p
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </p>
      <p className="mt-2 font-display italic text-[40px] leading-none text-white">
        {value}
      </p>
      {delta && (
        <p
          className="mt-3 text-[11px]"
          style={{ color: isLime ? "var(--spec-lime)" : "rgba(255,255,255,0.45)" }}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
