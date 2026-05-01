import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import TransformShowcase from "./TransformShowcase";

/*
  LOGIN — split-screen "front door" for ReviewLoop.

  LEFT  (form column)
    - Logo + "Welcome back" headline (display italic on the keyword,
      same trick the Hero uses for emphasis).
    - Email + password inputs.
    - Primary "Sign in" pill (lime — same primary CTA color as the
      rest of the marketing site so the visual handoff from landing
      to product is seamless).
    - "Continue with Google" secondary action.
    - "Don't have an account?" → sign up link.

  RIGHT (showcase column)
    - A continuously-looping animated demo of the product's promise:
      a raw social comment card morphs into a brand-styled creative
      ad. Cycles through the same 6 brand archetypes used everywhere
      else on the site for consistency.
    - Stays visible on >=md viewports; on mobile it collapses (we
      don't shrink the form, we just drop the showcase below the
      fold-equivalent so the form stays the immediate focus).

  TYPOGRAPHY
    - font-sans (Manrope) inherited from <html>.
    - font-display (Libre Baskerville italic) on the one accent word
      so the page feels stitched to the rest of the brand.
*/

export const metadata: Metadata = {
  title: "Sign in — ReviewLoop",
  description:
    "Sign in to ReviewLoop and turn your reviews, comments, and DMs into Meta-ready ad creatives.",
};

export default function LoginPage() {
  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Subtle ambient glow in the top-right of the form column to
          echo the projector light from the FinalCTA section. Low
          opacity, no animation — just brand atmosphere. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[60vh] w-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(139,127,232,0.18), transparent 70%)",
        }}
      />

      <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* ===================== LEFT — FORM ===================== */}
        <section className="relative flex flex-col px-6 py-10 md:px-12 md:py-14 lg:px-20">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-medium tracking-tight text-white"
            >
              reviewloop
            </Link>
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
            >
              ← back to site
            </Link>
          </header>

          <div className="flex flex-1 flex-col justify-center py-12 md:py-0">
            <div className="mx-auto w-full max-w-[440px]">
              <p
                className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--text-dim)" }}
              >
                {"// "}sign in
              </p>

              <h1 className="font-medium leading-[1.05] tracking-tight text-white text-[clamp(2.2rem,4vw,3rem)]">
                Welcome{" "}
                <em className="font-display italic font-normal text-white/95">
                  back
                </em>
                .
              </h1>

              <p className="mt-4 text-body-m text-muted">
                Pick up where you left off — your reviews, comments,
                and DMs are still working for you.
              </p>

              <div className="mt-10">
                <LoginForm />
              </div>

              <p className="mt-8 text-center text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-white underline-offset-4 transition hover:text-lime hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <footer
            className="font-mono text-[11px] tracking-wide"
            style={{ color: "var(--text-dim)" }}
          >
            <span className="text-white/50">OAuth</span> · no password
            access · disconnect anytime
          </footer>
        </section>

        {/* ===================== RIGHT — SHOWCASE ===================== */}
        <aside
          className="relative flex items-center justify-center overflow-hidden border-t md:border-l md:border-t-0"
          style={{
            backgroundColor: "var(--bg-deep)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <TransformShowcase />
        </aside>
      </div>
    </main>
  );
}
