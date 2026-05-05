import type { Metadata } from "next";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import WaitlistForm from "./WaitlistForm";

/*
  WAITLIST — landing destination for every primary CTA on the marketing
  site. The product hasn't shipped yet, so instead of dropping users
  into an empty dashboard we ask them to:

    1. Watch the launch clock tick down in real time (drives urgency,
       reframes the wait as a countable thing).
    2. Drop their email + phone (matches the screenshot reference: a
       flag-prefixed phone field with the dial code visible).

  LAYOUT
    Single centered column. The countdown is the visual hero — four
    big segmented tiles like a real launch board — with the form
    docked beneath in a tighter max-width so the page reads as
    "you came here to do ONE thing".

  TYPOGRAPHY
    font-sans (Manrope) for body, font-display italic on the accent
    word ("days") to match the brand voice used in Hero / FinalCTA.
    Mono uppercase for tag-style microcopy.

  BRANDING
    Same canvas / lime / purple-glow tokens as the rest of the site.
    The ambient purple bloom in the background mirrors the FinalCTA
    projector light so the marketing → waitlist handoff feels like
    one continuous environment.
*/

export const metadata: Metadata = {
  title: "Join the waitlist — ReviewLoop",
  description:
    "Be first to turn social comments, DMs, and reviews into ad-ready creatives. Drop your email + phone and we'll text you the moment we open the door.",
};

export default function WaitlistPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Ambient brand glows — purple bloom + lime undertone, both
          low-opacity so they don't fight the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139,127,232,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[60vh] w-[100vw] -translate-x-1/2 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(197,248,42,0.10), transparent 70%)",
        }}
      />

      {/* ---------- Header ---------- */}
      <header className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link
          href="/"
          className="text-2xl font-medium tracking-tight text-white"
        >
          reviewloop
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
        >
          ← back to site
        </Link>
      </header>

      {/* ---------- Centered hero column ---------- */}
      <section className="relative z-10 mx-auto flex max-w-[920px] flex-col items-center gap-12 px-6 pb-24 pt-8 md:gap-16 md:pt-16">
        {/* --- Headline --- */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "var(--spec-lime)",
              borderColor: "rgba(197,248,42,0.32)",
              backgroundColor: "rgba(197,248,42,0.06)",
            }}
          >
            {"// "}private beta · launching soon
          </span>

          <h1 className="font-medium leading-[1.05] tracking-tight text-white text-[clamp(2.4rem,5.5vw,4.25rem)] text-balance">
            We launch in{" "}
            <em className="font-display italic font-normal text-white/95">
              days
            </em>
            .
          </h1>

          <p className="max-w-[560px] text-body-m text-pretty text-white/65 md:text-lg">
            Be first to turn comments, DMs and reviews into
            ad-ready creatives — automatically, in your brand,
            ready for Meta the moment they land.
          </p>
        </div>

        {/* --- Countdown --- */}
        <CountdownTimer />

        {/* --- Form card --- */}
        <div
          className="w-full max-w-[520px] rounded-3xl border p-6 md:p-8"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "rgba(17,17,24,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,248,42,0.06)",
          }}
        >
          <WaitlistForm />
        </div>

        {/* --- Social proof footer --- */}
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          1,247 founders already in the queue
        </p>
      </section>
    </main>
  );
}
