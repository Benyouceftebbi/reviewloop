"use client";

/*
  LANDING 1 — "Editorial Calm"

  One of three A/B landing variants for ReviewLoop's agency product.
  All three share the same section flow and conversion goal (waitlist
  signups) but differ in design + motion personality.

  Variant 1 personality:
   - Generous whitespace, large Libre-Baskerville italic accents.
   - Calm reveal-on-scroll fade-ups (no aggressive parallax).
   - Brand dark canvas + lime accent + soft purple glow.

  Two capabilities co-lead the page with equal weight (reviews->posts
  AND video testimonials) so we can watch which one pulls more signups.

  IMPORTANT: the video social-proof section is intentionally empty —
  no invented quotes, names, or people. Real clips drop in later.
*/

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useReveal } from "./useReveal";

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function Landing1() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0A0A0F] text-white">
      <BackgroundGlow />
      <Header />
      <Hero />
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
  Reveal — wraps children, attaches the IntersectionObserver ref, and
  applies the fade-up via Tailwind's data-variant. `delay` staggers
  siblings (cards in a grid) so they cascade rather than pop together.
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
        "translate-y-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 " +
        className
      }
    >
      {children}
    </div>
  );
}

/* Primary CTA — pill with the brand's lime-fill hover sweep. */
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
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#C5F82A] px-7 py-4 text-[15px] font-semibold text-[#0A0A0F] transition-transform hover:scale-[1.02] " +
        className
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-[#0A0A0F] text-[#C5F82A]">
        <ArrowRight />
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#C5F82A]">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-balance text-[clamp(1.8rem,4.5vw,2.75rem)] font-bold leading-[1.1] tracking-tight">
        {children}
      </h2>
    </div>
  );
}

/* ================================================================== */
/*  Background                                                         */
/* ================================================================== */

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute h-[640px] w-[640px] rounded-full blur-[180px]"
        style={{ top: "-220px", left: "-160px", backgroundColor: "rgba(79,70,229,0.42)" }}
      />
      <div
        className="absolute h-[520px] w-[760px] rounded-full blur-[170px]"
        style={{ top: "2%", right: "-160px", backgroundColor: "rgba(29,78,216,0.32)" }}
      />
      <div
        className="absolute h-[700px] w-[700px] rounded-full blur-[220px]"
        style={{ top: "55%", left: "-22%", backgroundColor: "rgba(99,102,241,0.22)" }}
      />
      <div
        className="absolute h-[640px] w-[640px] rounded-full blur-[200px]"
        style={{ bottom: "-10%", right: "-12%", backgroundColor: "rgba(79,70,229,0.30)" }}
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
      <div className="absolute inset-0 border-b border-white/5 bg-black/30 backdrop-blur-md" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#top" className="text-xl font-semibold tracking-tight">
          reviewloop
        </a>
        <a
          href="#waitlist"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#0A0A0F]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#C5F82A] transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
          />
          <span className="relative z-10">Join waitlist</span>
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
    <section id="top" className="relative px-4 pb-20 pt-36 md:px-8 md:pt-44">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[12px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5F82A]" />
            For social media agencies & freelance managers
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 text-balance text-[clamp(2.4rem,6.5vw,4.25rem)] font-bold leading-[1.04] tracking-tight">
            Reviews and video testimonials,{" "}
            <span className="font-display italic font-normal text-[#8B7FE8]">
              for every client you manage
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[1.125rem] leading-relaxed text-white/65">
            Auto-collect Google reviews and customer video testimonials for
            all your clients, turn the best into branded social content, and
            publish everything from one dashboard.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <WaitlistButton />
            <p className="text-[13px] text-white/45">
              Free trial for early members · No card required
            </p>
          </div>
        </Reveal>

        {/* Hero visual — split preview of the two co-equal capabilities. */}
        <Reveal delay={320} className="mt-16">
          <HeroSplitPreview />
        </Reveal>
      </div>
    </section>
  );
}

/*
  HeroSplitPreview — two glass panels, left = reviews->posts, right =
  video testimonials. Deliberately equal-width so neither capability
  visually outranks the other.
*/
function HeroSplitPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Reviews -> post */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Reviews → posts
        </p>
        <div className="mt-4 rounded-2xl bg-[#0A0A0F] p-4 ring-1 ring-white/10">
          <Stars />
          <p className="mt-2 text-[14px] leading-snug text-white/85">
            “Best facial I&apos;ve had in the city — booking again already.”
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-white/40">via Google</span>
            <span className="rounded-full bg-[#C5F82A] px-2.5 py-1 text-[10px] font-semibold text-[#0A0A0F]">
              Post ready
            </span>
          </div>
        </div>
      </div>

      {/* Video testimonial */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Video testimonials
        </p>
        <div className="mt-4 grid aspect-[4/3] place-items-center rounded-2xl bg-[#0A0A0F] ring-1 ring-white/10">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white">
            <PlayIcon />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-white/40">Customer clip</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/60">
            Collected
          </span>
        </div>
      </div>
    </div>
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
          <span className="font-display italic font-normal text-[#8B7FE8]">
            stuck
          </span>
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[#C5F82A]">
                  <DotGrid />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold">{p.title}</h3>
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
        <SectionHeading eyebrow="Two capabilities, one dashboard">
          Everything your clients earn,{" "}
          <span className="font-display italic font-normal text-[#8B7FE8]">
            working as content
          </span>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Feature A — Reviews to posts */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <Eyebrow>01 · Reviews → branded posts</Eyebrow>
              <h3 className="mt-3 text-[1.5rem] font-bold leading-tight">
                Turn reviews into branded posts
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                Auto-collect Google reviews from each client&apos;s customers
                via SMS and email. The strongest become on-brand social posts —
                bulk-approve, then publish or schedule across every client.
              </p>
              <div className="mt-7 rounded-2xl bg-[#0A0A0F] p-5 ring-1 ring-white/10">
                <div className="space-y-3">
                  {["Glow Skin Spa", "Northside Dental", "Bella Cucina"].map(
                    (client, idx) => (
                      <div
                        key={client}
                        className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-[11px] font-semibold">
                            {client[0]}
                          </span>
                          <span className="text-[13px] text-white/75">
                            {client}
                          </span>
                        </div>
                        <span
                          className={
                            idx === 0
                              ? "rounded-full bg-[#C5F82A] px-2.5 py-1 text-[10px] font-semibold text-[#0A0A0F]"
                              : "rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/50"
                          }
                        >
                          {idx === 0 ? "Published" : "Queued"}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Feature B — Video testimonials */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
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
                    className="grid aspect-[3/4] place-items-center rounded-2xl bg-[#0A0A0F] ring-1 ring-white/10"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
                      <PlayIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
        <SectionHeading eyebrow="How it works">
          Live in three steps
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span className="font-display text-[2.5rem] italic leading-none text-[#C5F82A]">
                  {s.n}
                </span>
                <h3 className="mt-4 text-[18px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">
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
  const posts = [
    {
      quote: "Honestly the most relaxing spa day I&apos;ve ever booked. The staff remembered my name.",
      client: "Glow Skin Spa",
    },
    {
      quote: "Walked in nervous, walked out smiling. Painless cleaning and the friendliest team.",
      client: "Northside Dental",
    },
    {
      quote: "The pasta tastes like my nonna&apos;s kitchen. We&apos;re back every single Friday now.",
      client: "Bella Cucina",
    },
  ];
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Branded post proof">
          From a review to a{" "}
          <span className="font-display italic font-normal text-[#8B7FE8]">
            scroll-stopping post
          </span>
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.client} delay={i * 90}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
                <div className="p-7">
                  <Stars />
                  <p
                    className="mt-4 text-[1.05rem] font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `“${p.quote}”` }}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-white/8 px-7 py-4">
                  <span className="text-[13px] font-medium text-white/70">
                    {p.client}
                  </span>
                  <GoogleLabel />
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
/*  7 — Video social proof (intentionally empty placeholders)          */
/* ================================================================== */

function VideoProof() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="From the field">
          Hear it from agencies using ReviewLoop
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-xl text-center text-[14px] text-white/45">
          Real clips from our first agencies are landing here soon.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((n) => (
            <Reveal key={n} delay={n * 90}>
              {/* Empty by design — no invented people or quotes. */}
              <div className="group grid aspect-video place-items-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
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
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-12 text-center">
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
        <SectionHeading eyebrow="Pricing">
          Simple per-client pricing
        </SectionHeading>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/60">
            Pay for the clients you manage — nothing you don&apos;t. Early
            members start with a{" "}
            <span className="text-white">free trial</span> and lock in{" "}
            <span className="font-display italic text-[#C5F82A]">
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
      className="relative mx-4 my-20 overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 md:mx-8 md:px-12"
      style={{
        background:
          "radial-gradient(120% 140% at 50% 0%, rgba(79,70,229,0.28) 0%, rgba(10,10,15,0) 60%), #0c0c12",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.08] tracking-tight">
            Join the waitlist —{" "}
            <span className="font-display italic font-normal text-[#8B7FE8]">
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
      <div className="mx-auto mt-9 max-w-md rounded-2xl border border-[#C5F82A]/30 bg-white/[0.03] p-7">
        <p className="text-[17px] font-semibold text-[#C5F82A]">
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
        className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-[#C5F82A]/50"
      />

      <label className="mb-2 mt-5 block text-[12px] font-medium text-white/55">
        Clients managed
      </label>
      <select
        value={clients}
        onChange={(e) => setClients(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white outline-none transition focus:border-[#C5F82A]/50"
      >
        <option value="" className="bg-[#0A0A0F]">
          Select a range
        </option>
        <option value="1-5" className="bg-[#0A0A0F]">1–5 clients</option>
        <option value="6-15" className="bg-[#0A0A0F]">6–15 clients</option>
        <option value="16-40" className="bg-[#0A0A0F]">16–40 clients</option>
        <option value="40+" className="bg-[#0A0A0F]">40+ clients</option>
      </select>

      <button
        type="submit"
        className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#C5F82A] px-7 py-4 text-[15px] font-semibold text-[#0A0A0F] transition-transform hover:scale-[1.01]"
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

function DotGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <circle cx="6" cy="6" r="1.6" />
      <circle cx="12" cy="6" r="1.6" />
      <circle cx="18" cy="6" r="1.6" />
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="12" cy="18" r="1.6" />
      <circle cx="18" cy="18" r="1.6" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#C5F82A]" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLabel() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
      </svg>
      Google
    </span>
  );
}
