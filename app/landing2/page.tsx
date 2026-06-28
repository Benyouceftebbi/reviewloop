"use client";

/*
  LANDING 2 — "Kinetic Grid"

  Second of three A/B landing variants for ReviewLoop's agency product.
  Same 11-section flow + waitlist goal as landing1, but a deliberately
  different design + motion personality so we can A/B the feel.

  Variant 2 personality:
   - Structured, bordered grid system with hairline dividers and
     sharper corners (vs. landing1's soft, airy editorial feel).
   - Kinetic motion: a running client marquee, clip/slide-in reveals,
     and hover-lift cards with an accent border glow.
   - Accent color is WARM CORAL-ORANGE (#FF6A3D) — the lime green is
     intentionally dropped for this variant.

  Two capabilities co-lead with equal weight (reviews->posts AND video
  testimonials) so we can watch which one pulls more signups.

  IMPORTANT: the video social-proof section is intentionally empty —
  no invented quotes, names, or people. Real clips drop in later.
*/

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useReveal } from "../landing1/useReveal";
import { TemplatePicker } from "../landing-templates/templates";

/* Accent token for this variant. Change here to retune the whole page. */
const ACCENT = "#FF6A3D";

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function Landing2() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0A09] text-white">
      <BackgroundFx />
      <Header />
      <Hero />
      <ClientMarquee />
      <Problem />
      <Features />
      <HowItWorks />
      <BrandedPostProof />
      <VideoProof />
      <WhoItsFor />
      <PricingTeaser />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ================================================================== */
/*  Shared atoms                                                       */
/* ================================================================== */

/*
  Reveal — clip/slide-in motion for this variant. Starts shifted left
  with a left-edge clip and slides into place. `delay` staggers grids.
*/
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      data-revealed="false"
      style={{ transitionDelay: `${delay}ms` }}
      className={
        "-translate-x-6 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(0_35%_0_0)] data-[revealed=true]:translate-x-0 data-[revealed=true]:opacity-100 data-[revealed=true]:[clip-path:inset(0_0_0_0)] " +
        className
      }
    >
      {children}
    </div>
  );
}

/* Primary CTA — squared pill, accent fill, arrow that slides on hover. */
function WaitlistButton({
  children = "Join the waitlist — start with a free trial",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#waitlist"
      className={
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-lg px-7 py-4 text-[15px] font-semibold text-[#0B0A09] transition-transform hover:scale-[1.02] " +
        className
      }
      style={{ backgroundColor: ACCENT }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight />
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]"
      style={{ color: ACCENT }}
    >
      <span className="h-px w-6" style={{ backgroundColor: ACCENT }} />
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  children,
  align = "left",
}: {
  eyebrow: string;
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={align === "center" ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="mt-4 text-balance text-[clamp(1.8rem,4.5vw,2.85rem)] font-bold leading-[1.05] tracking-tight">
        {children}
      </h2>
    </div>
  );
}

/* ================================================================== */
/*  Background                                                         */
/* ================================================================== */

function BackgroundFx() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid lines — reinforce the structured personality. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Warm glows. */}
      <div
        className="absolute h-[560px] w-[560px] rounded-full blur-[170px]"
        style={{ top: "-200px", right: "-120px", backgroundColor: "rgba(255,106,61,0.30)" }}
      />
      <div
        className="absolute h-[620px] w-[620px] rounded-full blur-[200px]"
        style={{ top: "48%", left: "-20%", backgroundColor: "rgba(255,138,76,0.16)" }}
      />
      <div
        className="absolute h-[520px] w-[520px] rounded-full blur-[180px]"
        style={{ bottom: "-12%", right: "-10%", backgroundColor: "rgba(214,64,33,0.22)" }}
      />
    </div>
  );
}

/* ================================================================== */
/*  1 — Sticky header                                                  */
/* ================================================================== */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-0 border-b border-white/8 bg-black/40 backdrop-blur-md" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md" style={{ backgroundColor: ACCENT }}>
            <span className="h-2.5 w-2.5 rounded-sm bg-[#0B0A09]" />
          </span>
          reviewloop
        </a>
        <a
          href="#waitlist"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-white/15 px-5 py-2.5 text-[14px] font-semibold text-white"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
            style={{ backgroundColor: ACCENT }}
          />
          <span className="relative z-10 transition-colors group-hover:text-[#0B0A09]">
            Join waitlist
          </span>
        </a>
      </div>
    </header>
  );
}

/* ================================================================== */
/*  2 — Hero                                                           */
/* ================================================================== */

function Hero() {
  return (
    <section id="top" className="relative px-4 pb-16 pt-36 md:px-8 md:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-4 py-1.5 text-[12px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              For social media agencies &amp; freelance managers
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-balance text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.02] tracking-tight">
              Reviews and video testimonials,{" "}
              <span className="font-display italic font-normal" style={{ color: ACCENT }}>
                for every client you manage
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-white/65">
              Auto-collect Google reviews and customer video testimonials for
              all your clients, turn the best into branded social content, and
              publish everything from one dashboard.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-start gap-3">
              <WaitlistButton />
              <p className="text-[13px] text-white/45">
                Free trial for early members · No card required
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right — split preview of the two co-equal capabilities. */}
        <Reveal delay={320}>
          <HeroSplitPreview />
        </Reveal>
      </div>
    </section>
  );
}

/*
  HeroSplitPreview — stacked equal-height panels: reviews->posts on top,
  video testimonials below. Equal visual weight so neither outranks the
  other.
*/
function HeroSplitPreview() {
  return (
    <div className="grid gap-4">
      {/* Reviews -> post */}
      <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Reviews → posts
        </p>
        <div className="mt-4 rounded-lg bg-[#0B0A09] p-4 ring-1 ring-white/10">
          <Stars />
          <p className="mt-2 text-[14px] leading-snug text-white/85">
            “Best facial I&apos;ve had in the city — booking again already.”
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-white/40">via Google</span>
            <span
              className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-[#0B0A09]"
              style={{ backgroundColor: ACCENT }}
            >
              Post ready
            </span>
          </div>
        </div>
      </div>

      {/* Video testimonial */}
      <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Video testimonials
        </p>
        <div className="mt-4 grid aspect-[16/7] place-items-center rounded-lg bg-[#0B0A09] ring-1 ring-white/10">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white">
            <PlayIcon />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-white/40">Customer clip</span>
          <span className="rounded-md border border-white/15 px-2.5 py-1 text-[10px] text-white/60">
            Collected
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Client marquee — kinetic strip unique to this variant             */
/* ================================================================== */

function ClientMarquee() {
  const items = [
    "Glow Skin Spa",
    "Northside Dental",
    "Bella Cucina",
    "Pulse Fitness",
    "Coastal Barbers",
    "Verde Yoga",
    "Aurora Nails",
    "Harbor Cafe",
  ];
  const loop = [...items, ...items];
  return (
    <section
      className="relative overflow-hidden border-y border-white/8 py-5"
      aria-hidden
    >
      <div className="flex w-max animate-[l2marquee_36s_linear_infinite] gap-10 whitespace-nowrap pr-10">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-3 text-[14px] font-medium text-white/35"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            {name}
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0B0A09] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B0A09] to-transparent" />
      <style>{`
        @keyframes l2marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[l2marquee_36s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  3 — Problem                                                        */
/* ================================================================== */

function Problem() {
  const pains = [
    {
      title: "Reviews trapped per client",
      body: "Every client earns great Google reviews — but they sit on Maps, never becoming content that wins the next customer.",
    },
    {
      title: "Fresh content at scale is brutal",
      body: "Producing on-brand posts for ten, twenty, fifty local businesses every week is the bottleneck that caps how many clients you can take.",
    },
    {
      title: "Too many disconnected tools",
      body: "Review widgets, schedulers, design apps, video folders — switching between them for each client eats the hours you should bill.",
    },
  ];
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="The problem">
          Great client content is{" "}
          <span className="font-display italic font-normal" style={{ color: ACCENT }}>
            stuck
          </span>
        </SectionHeading>
        <div className="mt-12 grid divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="group h-full bg-white/[0.02] p-7 transition-colors hover:bg-white/[0.04]">
                <span
                  className="font-mono text-[12px] font-semibold"
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[18px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4 — Two equal feature blocks                                       */
/* ================================================================== */

function Features() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Two capabilities, one dashboard" align="center">
          Everything your clients earn,{" "}
          <span className="font-display italic font-normal" style={{ color: ACCENT }}>
            working as content
          </span>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Feature A — Reviews to posts */}
          <Reveal>
            <FeatureCard>
              <Eyebrow>01 · Reviews → branded posts</Eyebrow>
              <h3 className="mt-3 text-[1.5rem] font-bold leading-tight">
                Turn reviews into branded posts
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                Auto-collect Google reviews from each client&apos;s customers
                via SMS and email. The strongest become on-brand social posts —
                bulk-approve, then publish or schedule across every client.
              </p>
              <div className="mt-7 rounded-xl bg-[#0B0A09] p-5 ring-1 ring-white/10">
                <div className="space-y-3">
                  {["Glow Skin Spa", "Northside Dental", "Bella Cucina"].map(
                    (client, idx) => (
                      <div
                        key={client}
                        className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[11px] font-semibold">
                            {client[0]}
                          </span>
                          <span className="text-[13px] text-white/75">
                            {client}
                          </span>
                        </div>
                        <span
                          className="rounded-md px-2.5 py-1 text-[10px] font-semibold"
                          style={
                            idx === 0
                              ? { backgroundColor: ACCENT, color: "#0B0A09" }
                              : { border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }
                          }
                        >
                          {idx === 0 ? "Published" : "Queued"}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          {/* Feature B — Video testimonials */}
          <Reveal delay={120}>
            <FeatureCard>
              <Eyebrow>02 · Video testimonials</Eyebrow>
              <h3 className="mt-3 text-[1.5rem] font-bold leading-tight">
                Collect video testimonials
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                After each visit, a client&apos;s customers record a short video
                testimonial from their phone. You collect, manage, and share
                them as ready-to-post content — all from the same dashboard.
              </p>
              <div className="mt-7 grid flex-1 grid-cols-3 gap-3">
                {[0, 1, 2].map((n) => (
                  <div
                    key={n}
                    className="grid aspect-[3/4] place-items-center rounded-xl bg-[#0B0A09] ring-1 ring-white/10"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
                      <PlayIcon />
                    </span>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Hover-lift card with accent border glow — kinetic personality. */
function FeatureCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1"
      style={{ ["--accent" as string]: ACCENT }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,61,0.5)";
        e.currentTarget.style.boxShadow = "0 24px 60px -24px rgba(255,106,61,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/*  5 — How it works                                                   */
/* ================================================================== */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Connect your clients",
      body: "Add each local business to one dashboard in minutes — no per-client setup marathon.",
    },
    {
      n: "02",
      title: "Auto-collect reviews & videos",
      body: "We request Google reviews and video testimonials from their customers automatically over SMS and email.",
    },
    {
      n: "03",
      title: "Generate & post content",
      body: "Approve the best, turn them into branded posts, and publish or schedule across every client.",
    },
  ];
  return (
    <section id="how-it-works" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it works" align="center">
          Live in three steps
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span
                  className="absolute -right-2 -top-4 font-display text-[5rem] italic leading-none text-white/[0.06]"
                >
                  {s.n}
                </span>
                <span
                  className="relative font-mono text-[12px] font-semibold tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  STEP {s.n}
                </span>
                <h3 className="relative mt-4 text-[18px] font-semibold">{s.title}</h3>
                <p className="relative mt-2 text-[14px] leading-relaxed text-white/55">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6 — Branded post proof                                             */
/* ================================================================== */

function BrandedPostProof() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Branded post proof" align="center">
          From a review to a{" "}
          <span className="font-display italic font-normal" style={{ color: ACCENT }}>
            scroll-stopping post
          </span>
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-xl text-center text-[14px] text-white/45">
          Every review can become a post — choose from 40+ ready-made,
          on-brand templates. Here are five to start.
        </p>
        <Reveal>
          <div className="mt-12">
            {/* Coral accent matches landing2's brand color. */}
            <TemplatePicker accent={ACCENT} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7 — Video social proof (intentionally empty placeholders)          */
/* ================================================================== */

function VideoProof() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="From the field" align="center">
          Hear it from agencies using ReviewLoop
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-xl text-center text-[14px] text-white/45">
          Real clips from our first agencies are landing here soon.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((n) => (
            <Reveal key={n} delay={n * 90}>
              {/* Empty by design — no invented people or quotes. */}
              <div
                className="group grid aspect-video place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,106,61,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
              >
                <div className="flex flex-col items-center gap-3 text-white/35">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/8 text-white/60 transition group-hover:bg-white/12">
                    <PlayIcon />
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.2em]">
                    Clip coming soon
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  8 — Who it's for                                                   */
/* ================================================================== */

function WhoItsFor() {
  return (
    <section className="px-4 py-16 md:px-8">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-12 text-center">
          <p className="text-[clamp(1.2rem,3vw,1.6rem)] font-medium leading-relaxed text-white/80">
            Built for{" "}
            <span className="text-white">social media agencies</span> and{" "}
            <span className="text-white">freelance managers</span> running
            content for spas, salons, clinics, restaurants — any local business
            that lives on Google Maps.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  9 — Pricing teaser (no numbers)                                    */
/* ================================================================== */

function PricingTeaser() {
  return (
    <section id="pricing" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Pricing</Eyebrow>
        </div>
        <h2 className="mt-4 text-balance text-[clamp(1.8rem,4.5vw,2.85rem)] font-bold leading-[1.05] tracking-tight">
          Simple per-client pricing
        </h2>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/60">
            Pay for the clients you manage — nothing you don&apos;t. Early
            members start with a{" "}
            <span className="text-white">free trial</span> and lock in{" "}
            <span className="font-display italic" style={{ color: ACCENT }}>
              founder pricing
            </span>{" "}
            for life.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-9 flex justify-center">
            <WaitlistButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  10 — Final CTA band + waitlist form                                */
/* ================================================================== */

function FinalCta() {
  return (
    <section
      id="waitlist"
      className="relative mx-4 my-20 overflow-hidden rounded-2xl border border-white/10 px-6 py-16 md:mx-8 md:px-12"
      style={{
        background:
          "radial-gradient(120% 140% at 50% 0%, rgba(255,106,61,0.26) 0%, rgba(11,10,9,0) 60%), #0d0c0b",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.08] tracking-tight">
            Join the waitlist —{" "}
            <span className="font-display italic font-normal" style={{ color: ACCENT }}>
              start with a free trial
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
            Be first to run reviews and video testimonials for every client
            from one dashboard. Founder pricing for early members.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}

/*
  WaitlistForm — captures work email + number of clients managed.
  No payment at this stage. Submit is a local success state; wire the
  POST to your list provider (or swap the action for a mailto) later.
*/
function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [clients, setClients] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to real waitlist endpoint / mailto.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="mx-auto mt-9 max-w-md rounded-2xl border bg-white/[0.03] p-7"
        style={{ borderColor: "rgba(255,106,61,0.35)" }}
      >
        <p className="text-[17px] font-semibold" style={{ color: ACCENT }}>
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-white/60">
          We&apos;ll email <span className="text-white">{email}</span> with your
          free-trial invite and founder pricing as soon as a spot opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-9 max-w-md text-left">
      <label className="mb-2 block text-[12px] font-medium text-white/55">
        Work email
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@agency.com"
        className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-[#FF6A3D]/60"
      />

      <label className="mb-2 mt-5 block text-[12px] font-medium text-white/55">
        Clients managed
      </label>
      <select
        value={clients}
        onChange={(e) => setClients(e.target.value)}
        className="w-full appearance-none rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white outline-none transition focus:border-[#FF6A3D]/60"
      >
        <option value="" className="bg-[#0B0A09]">
          Select a range
        </option>
        <option value="1-5" className="bg-[#0B0A09]">1–5 clients</option>
        <option value="6-15" className="bg-[#0B0A09]">6–15 clients</option>
        <option value="16-40" className="bg-[#0B0A09]">16–40 clients</option>
        <option value="40+" className="bg-[#0B0A09]">40+ clients</option>
      </select>

      <button
        type="submit"
        className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg px-7 py-4 text-[15px] font-semibold text-[#0B0A09] transition-transform hover:scale-[1.01]"
        style={{ backgroundColor: ACCENT }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
        />
        <span className="relative z-10">
          Join the waitlist — start with a free trial
        </span>
      </button>
    </form>
  );
}

/* ================================================================== */
/*  11 — Footer                                                        */
/* ================================================================== */

function Footer() {
  return (
    <footer className="border-t border-white/8 px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-[13px] text-white/40 sm:flex-row">
        <span className="text-[16px] font-semibold text-white/70">reviewloop</span>
        <p>© {new Date().getFullYear()} ReviewLoop. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="transition hover:text-white/70">Privacy</a>
          <a href="#" className="transition hover:text-white/70">Terms</a>
          <a href="#" className="transition hover:text-white/70">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Icons                                                              */
/* ================================================================== */

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" style={{ color: ACCENT }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

