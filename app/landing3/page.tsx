"use client";

/*
  /landing3 — "Aurora Spotlight"

  Third design variant. Same 11-section flow and waitlist conversion goal
  as /landing1 (Editorial Calm) and /landing2 (Kinetic Grid), but a third
  distinct visual identity:

    - Accent: electric blue (#4D9FFF) — NOT the lime green or the coral.
    - Composition: centered & symmetrical, spotlight-style.
    - Background: soft aurora glow orbs that drift slowly.
    - Motion: scale + blur-in reveals (vs. fade-ups / slide-ins).

  Build notes carried over from the brief:
    - Reviews and video co-lead with EQUAL weight so we can measure which
      capability pulls more waitlist interest.
    - Video social-proof slots are intentionally empty placeholders. No
      invented people, no fabricated quotes.
    - Pricing stays number-free: per-client + founder pricing only.
*/

import { useRef, useState, type FormEvent } from "react";
import { useReveal } from "../landing1/useReveal";

/* Accent + surface tokens local to this page so it never collides with
   the global lime brand tokens. */
const ACCENT = "#4D9FFF";
const ACCENT_SOFT = "#A9CEFF";
const CANVAS = "#070A12";

export default function Landing3() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden font-sans antialiased"
      style={{ backgroundColor: CANVAS, color: "#EAF1FF" }}
    >
      <AuroraBackground />
      <Nav />
      <Hero />
      <TrustBar />
      <DualFeature />
      <ReviewFunnel />
      <VideoEngine />
      <HowItWorks />
      <VideoProof />
      <WhoFor />
      <Pricing />
      <Waitlist />
      <Footer />
      <LocalStyles />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Background — drifting aurora orbs                                   */
/* ------------------------------------------------------------------ */

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* base vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(77,159,255,0.12), transparent 60%)",
        }}
      />
      <div
        className="l3-orb absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(77,159,255,0.22), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="l3-orb-slow absolute left-[8%] top-[40%] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.16), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="l3-orb absolute right-[6%] top-[60%] h-[30rem] w-[30rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.12), transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      {/* fine grid wash */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(100% 60% at 50% 30%, black, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="relative z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">
            reviewloop
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[14px] text-white/60 md:flex">
          <a href="#reviews" className="transition-colors hover:text-white">
            Reviews
          </a>
          <a href="#video" className="transition-colors hover:text-white">
            Video
          </a>
          <a href="#how" className="transition-colors hover:text-white">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
        </div>
        <a
          href="#waitlist"
          className="rounded-full px-5 py-2 text-[14px] font-semibold transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: ACCENT, color: CANVAS }}
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-lg"
      style={{ backgroundColor: ACCENT, color: CANVAS }}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — centered spotlight                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative z-10 px-6 pb-20 pt-16 text-center sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <span
          className="l3-pop inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium"
          style={{ borderColor: "rgba(77,159,255,0.35)", color: ACCENT_SOFT }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
          Built for social media agencies
        </span>

        <h1 className="l3-pop mt-7 text-balance text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight" style={{ animationDelay: "0.06s" }}>
          Turn client reviews into{" "}
          <span style={{ color: ACCENT }}>content</span>, and content into{" "}
          <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
            video.
          </span>
        </h1>

        <p className="l3-pop mx-auto mt-6 max-w-xl text-pretty text-[1.075rem] leading-relaxed text-white/65" style={{ animationDelay: "0.12s" }}>
          One platform to collect and showcase reviews for every client you
          manage — then spin those reviews into short-form video your clients
          actually want to post.
        </p>

        <div className="l3-pop mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "0.18s" }}>
          <a
            href="#waitlist"
            className="group relative w-full overflow-hidden rounded-full px-7 py-3.5 text-center text-[15px] font-semibold transition-transform hover:scale-[1.02] sm:w-auto"
            style={{ backgroundColor: ACCENT, color: CANVAS }}
          >
            Join the waitlist — start with a free trial
          </a>
          <a
            href="#how"
            className="w-full rounded-full border px-7 py-3.5 text-center text-[15px] font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
            style={{ borderColor: "rgba(255,255,255,0.16)" }}
          >
            See how it works
          </a>
        </div>

        <p className="l3-pop mt-4 text-[13px] text-white/40" style={{ animationDelay: "0.24s" }}>
          Free trial · No card required · Founder pricing for early members
        </p>
      </div>

      {/* Hero preview — split capability glance */}
      <HeroPreview />
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="l3-pop mx-auto mt-16 max-w-4xl" style={{ animationDelay: "0.3s" }}>
      <div
        className="grid gap-4 rounded-3xl border p-4 sm:grid-cols-2 sm:p-6"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          boxShadow: "0 40px 120px -40px rgba(77,159,255,0.35)",
        }}
      >
        {/* Reviews side */}
        <div className="rounded-2xl border p-5 text-left" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(0,0,0,0.25)" }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Review wall
          </p>
          <div className="mt-4 space-y-3">
            {[
              "Best decision we made all year.",
              "They handled everything — flawless.",
              "Our bookings doubled in a month.",
            ].map((q, i) => (
              <div key={i} className="rounded-xl border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <div className="flex gap-0.5" style={{ color: ACCENT }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <p className="mt-1.5 text-[13.5px] text-white/80">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video side */}
        <div className="relative flex flex-col rounded-2xl border p-5 text-left" style={{ borderColor: "rgba(77,159,255,0.25)", backgroundColor: "rgba(0,0,0,0.25)" }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Generated video
          </p>
          <div
            className="relative mt-4 flex flex-1 items-center justify-center overflow-hidden rounded-xl"
            style={{
              aspectRatio: "9 / 14",
              background:
                "linear-gradient(160deg, rgba(77,159,255,0.22), rgba(124,92,255,0.18))",
            }}
          >
            <div className="l3-ripple flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT, color: CANVAS }}>
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="absolute bottom-3 left-3 right-3 text-[12px] font-medium text-white/85">
              &ldquo;Our bookings doubled in a month.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trust bar                                                           */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-10">
      <div
        ref={ref}
        data-revealed="false"
        className="l3-reveal mx-auto max-w-4xl text-center"
      >
        <p className="text-[12px] uppercase tracking-[0.25em] text-white/35">
          For agencies managing multiple clients
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[15px] font-medium text-white/45">
          {["Social agencies", "Studios", "Freelance teams", "Brand managers"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dual feature — two co-equal pillars                                 */
/* ------------------------------------------------------------------ */

function DualFeature() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Two engines, one platform"
          title="Reviews and video — equally weighted"
          sub="Collect social proof for every client, then transform it into video. Use one, or run both together."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <PillarCard
            tag="Engine 01"
            title="Review collection & showcase"
            body="Branded review pages and embeddable walls for each client. Collect, moderate, and display social proof without juggling tools."
            points={["One workspace per client", "Branded request links", "Embeddable review walls"]}
          />
          <PillarCard
            tag="Engine 02"
            title="Review-to-video generation"
            body="Turn any review into a polished short-form clip — captioned, branded, and ready for Reels, TikTok, and Shorts."
            points={["Vertical-first templates", "Auto captions & branding", "Export per client"]}
            accentBorder
          />
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  tag,
  title,
  body,
  points,
  accentBorder,
}: {
  tag: string;
  title: string;
  body: string;
  points: string[];
  accentBorder?: boolean;
}) {
  return (
    <div
      className="l3-lift group rounded-3xl border p-7"
      style={{
        borderColor: accentBorder ? "rgba(77,159,255,0.3)" : "rgba(255,255,255,0.1)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
        style={{
          color: ACCENT,
          backgroundColor: "rgba(77,159,255,0.12)",
        }}
      >
        {tag}
      </span>
      <h3 className="mt-5 text-[1.45rem] font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{body}</p>
      <ul className="mt-6 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-[14.5px] text-white/75">
            <CheckDot />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Review funnel detail                                                */
/* ------------------------------------------------------------------ */

function ReviewFunnel() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="reviews" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
          <SectionKicker>Engine 01 — Reviews</SectionKicker>
          <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
            A review funnel for{" "}
            <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
              every client
            </span>{" "}
            you manage.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/60">
            Send branded request links, route happy customers to public
            reviews, and showcase the best ones on auto-updating walls — all
            organized per client, all in one place.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ["Collect", "Branded links and QR codes that make leaving a review effortless."],
              ["Curate", "Moderate and feature your strongest social proof per client."],
              ["Showcase", "Drop an embeddable, always-fresh review wall on any site."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-4">
                <CheckDot />
                <div>
                  <p className="text-[15px] font-semibold">{h}</p>
                  <p className="text-[14px] leading-relaxed text-white/55">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.25)" }}>
          <div className="flex items-center justify-between">
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/40">Client · Northside Studio</p>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}>4.9 avg</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Maya R.", "Genuinely the easiest agency we've worked with."],
              ["Devon K.", "They turned our reviews into content we actually post."],
              ["Priya S.", "Bookings are up and we barely lifted a finger."],
            ].map(([n, q]) => (
              <div key={n} className="rounded-2xl border px-4 py-3.5" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white/80">{n}</span>
                  <div className="flex gap-0.5" style={{ color: ACCENT }}>
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} />)}
                  </div>
                </div>
                <p className="mt-1.5 text-[13.5px] text-white/65">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Video engine detail                                                 */
/* ------------------------------------------------------------------ */

function VideoEngine() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="video" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="order-2 rounded-3xl border p-6 md:order-1" style={{ borderColor: "rgba(77,159,255,0.22)", backgroundColor: "rgba(0,0,0,0.25)" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40">Review → Video</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative flex items-end overflow-hidden rounded-xl border p-3"
                style={{
                  aspectRatio: "9 / 16",
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "linear-gradient(160deg, rgba(77,159,255,0.2), rgba(124,92,255,0.16))",
                }}
              >
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT, color: CANVAS }}>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <p className="text-[11px] font-medium leading-snug text-white/85">
                  &ldquo;Bookings doubled.&rdquo;
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[12px] text-white/40">
            One review, three ready-to-post formats
          </p>
        </div>

        <div className="order-1 md:order-2">
          <SectionKicker>Engine 02 — Video</SectionKicker>
          <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
            Every review becomes{" "}
            <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
              short-form video.
            </span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/60">
            Pick a review, choose a template, and generate a captioned, branded
            vertical clip in seconds. Give clients content they&apos;re excited
            to post — without a video editor.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ["Vertical-first", "Templates built for Reels, TikTok, and Shorts."],
              ["On-brand automatically", "Each client's colors, fonts, and logo applied."],
              ["Export & hand off", "Download or deliver straight to the client workspace."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-4">
                <CheckDot />
                <div>
                  <p className="text-[15px] font-semibold">{h}</p>
                  <p className="text-[14px] leading-relaxed text-white/55">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  const steps = [
    ["01", "Add your clients", "Spin up a branded workspace for each client in seconds."],
    ["02", "Collect reviews", "Share request links and watch social proof roll in."],
    ["03", "Generate video", "Turn the best reviews into ready-to-post clips."],
    ["04", "Deliver & repeat", "Hand off content and grow each client's presence."],
  ];
  return (
    <section id="how" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="How it works"
          title="From client onboarding to posted video"
          sub="A single loop your whole team can run for every account."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num, title, body], i) => (
            <div
              key={num}
              className="l3-lift relative rounded-2xl border p-6"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl text-[15px] font-bold"
                style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
              >
                {num}
              </span>
              <h3 className="mt-5 text-[1.05rem] font-semibold">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{body}</p>
              {i < steps.length - 1 && (
                <span className="absolute right-5 top-7 hidden text-white/15 lg:block">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Video proof — intentionally empty placeholders                      */
/* ------------------------------------------------------------------ */

function VideoProof() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="See it in motion"
          title="Real clips, coming soon"
          sub="We're collecting clips from our first agencies. Genuine examples will live here — no stock actors, no scripted quotes."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center rounded-2xl border p-6 text-center"
              style={{
                aspectRatio: "9 / 14",
                borderColor: "rgba(255,255,255,0.1)",
                borderStyle: "dashed",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: "rgba(77,159,255,0.3)", color: ACCENT }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <p className="mt-4 text-[14px] font-medium text-white/60">Clip coming soon</p>
              <p className="mt-1 text-[12px] text-white/35">Slot {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Who it's for                                                        */
/* ------------------------------------------------------------------ */

function WhoFor() {
  const ref = useReveal<HTMLDivElement>();
  const items = [
    ["Social media agencies", "Run reviews and video for a full roster of clients from one dashboard."],
    ["Studios & production teams", "Add a recurring content stream to your service menu."],
    ["Freelancers scaling up", "Look like a full team without hiring a video editor."],
  ];
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading kicker="Who it's for" title="Made for the people managing many clients" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(([t, b]) => (
            <div key={t} className="l3-lift rounded-2xl border p-7" style={{ borderColor: "rgba(255,255,255,0.1)", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}>
              <h3 className="text-[1.1rem] font-semibold">{t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing — number-free                                               */
/* ------------------------------------------------------------------ */

function Pricing() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="pricing" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-3xl text-center">
        <SectionHeading
          kicker="Pricing"
          title="Simple per-client pricing"
          sub="Pay for the clients you manage — scale up or down anytime. Early members get founder pricing locked in for life."
        />
        <div
          className="mt-12 rounded-3xl border p-8 text-left"
          style={{
            borderColor: "rgba(77,159,255,0.3)",
            background: "linear-gradient(180deg, rgba(77,159,255,0.08), rgba(255,255,255,0.01))",
            boxShadow: "0 40px 120px -50px rgba(77,159,255,0.5)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.15em]" style={{ backgroundColor: ACCENT, color: CANVAS }}>
              Founder pricing
            </span>
            <span className="text-[13px] text-white/45">Limited early spots</span>
          </div>
          <h3 className="mt-6 text-[1.5rem] font-bold tracking-tight">Everything, per client</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Unlimited review collection",
              "Embeddable review walls",
              "Review-to-video generation",
              "Per-client branding",
              "Team workspace",
              "Priority founder support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-[14.5px] text-white/75">
                <CheckDot />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            className="mt-8 block w-full rounded-full px-6 py-3.5 text-center text-[15px] font-semibold transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: ACCENT, color: CANVAS }}
          >
            Join the waitlist — start with a free trial
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

function Waitlist() {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailRef.current?.value) return;
    // Stub: wire to your waitlist endpoint / CRM later.
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="relative z-10 px-6 py-20">
      <div
        ref={ref}
        data-revealed="false"
        className="l3-reveal mx-auto max-w-2xl rounded-3xl border p-8 text-center sm:p-12"
        style={{
          borderColor: "rgba(77,159,255,0.3)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
          boxShadow: "0 40px 140px -50px rgba(77,159,255,0.45)",
        }}
      >
        {submitted ? (
          <div className="py-6">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT, color: CANVAS }}>
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <h2 className="mt-6 text-[1.6rem] font-bold">You&apos;re on the list</h2>
            <p className="mt-3 text-[15px] text-white/60">
              Thanks for joining. We&apos;ll reach out with early access and your
              founder pricing soon.
            </p>
          </div>
        ) : (
          <>
            <SectionKicker center>Join the waitlist</SectionKicker>
            <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-tight">
              Be first to run reviews{" "}
              <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
                and video
              </span>{" "}
              for every client.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Get early access plus founder pricing locked in for life.
            </p>
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3">
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="Your work email"
                className="w-full rounded-full border bg-transparent px-5 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[rgba(77,159,255,0.6)]"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              />
              <select
                defaultValue=""
                required
                className="w-full appearance-none rounded-full border bg-transparent px-5 py-3.5 text-[15px] text-white/80 outline-none focus:border-[rgba(77,159,255,0.6)]"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              >
                <option value="" disabled style={{ color: CANVAS }}>
                  How many clients do you manage?
                </option>
                <option value="1-5" style={{ color: CANVAS }}>1–5 clients</option>
                <option value="6-15" style={{ color: CANVAS }}>6–15 clients</option>
                <option value="16-40" style={{ color: CANVAS }}>16–40 clients</option>
                <option value="40+" style={{ color: CANVAS }}>40+ clients</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: ACCENT, color: CANVAS }}
              >
                Join the waitlist — start with a free trial
              </button>
            </form>
            <p className="mt-4 text-[13px] text-white/40">
              No card required · Founder pricing for early members
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative z-10 border-t px-6 py-10" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[14px] font-semibold">reviewloop</span>
        </div>
        <p className="text-[13px] text-white/40">
          © {new Date().getFullYear()} reviewloop. Reviews and video for agencies.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SectionKicker center>{kicker}</SectionKicker>
      <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-white/60">{sub}</p>}
    </div>
  );
}

function SectionKicker({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] ${center ? "" : ""}`}
      style={{ color: ACCENT }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
      {children}
    </span>
  );
}

function CheckDot() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: "rgba(77,159,255,0.15)", color: ACCENT }}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Local styles — aurora drift + reveal/lift motion                    */
/* ------------------------------------------------------------------ */

function LocalStyles() {
  return (
    <style>{`
      /* Entrance pop for hero items: scale + blur in */
      @keyframes l3Pop {
        from { opacity: 0; transform: translateY(16px) scale(0.98); filter: blur(8px); }
        to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      .l3-pop {
        opacity: 0;
        animation: l3Pop 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      /* Scroll reveal: scale + blur in, driven by data-revealed */
      .l3-reveal {
        opacity: 0;
        transform: translateY(24px) scale(0.985);
        filter: blur(6px);
        transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.7s ease;
      }
      .l3-reveal[data-revealed="true"] {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }

      /* Hover lift for cards */
      .l3-lift {
        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .l3-lift:hover {
        transform: translateY(-4px);
        border-color: rgba(77,159,255,0.35) !important;
        box-shadow: 0 30px 70px -40px rgba(77,159,255,0.5);
      }

      /* Drifting aurora orbs */
      @keyframes l3Drift {
        0%, 100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(0,30px) scale(1.06); }
      }
      @keyframes l3DriftSlow {
        0%, 100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(20px,-24px) scale(1.04); }
      }
      .l3-orb { animation: l3Drift 14s ease-in-out infinite; }
      .l3-orb-slow { animation: l3DriftSlow 20s ease-in-out infinite; }

      /* Play-button ripple */
      @keyframes l3Ripple {
        0%   { box-shadow: 0 0 0 0 rgba(77,159,255,0.5); }
        70%  { box-shadow: 0 0 0 22px rgba(77,159,255,0); }
        100% { box-shadow: 0 0 0 0 rgba(77,159,255,0); }
      }
      .l3-ripple { animation: l3Ripple 2.4s ease-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .l3-pop, .l3-orb, .l3-orb-slow, .l3-ripple { animation: none; }
        .l3-pop { opacity: 1; }
        .l3-reveal { transition: none; }
      }
    `}</style>
  );
}
