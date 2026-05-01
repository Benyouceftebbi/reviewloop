"use client";

/*
  LoginForm — local UI state only.

  No backend wired in (this PR is the marketing-side handoff from the
  landing page to the auth route). When the auth provider is added,
  drop the submit handler in here and keep the visual.

  Field styling matches the spec:
   - Input rows: subtle white border (--border-soft), bg-elevated.
   - Focus ring: lime so it visually pairs with the primary CTA.
   - Primary action: lime pill — same look as every "Get 10 free
     creatives" button across the site so users recognize it.
   - Google button: white pill with Google "G" mark.
*/

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Auth integration goes here. We hold the spinner state for a
    // beat so the button doesn't flash before the route flips, which
    // is also a nicer demo of the disabled state, then flip to the
    // dashboard.
    await new Promise((r) => setTimeout(r, 500));
    router.push("/dashboard");
  };

  const onGoogle = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    router.push("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Email */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-dim)" }}
        >
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@brand.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border bg-transparent px-4 py-3.5 text-base text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
          style={{
            borderColor: "var(--border-soft)",
            backgroundColor: "var(--bg-elevated)",
          }}
        />
      </label>

      {/* Password + show/hide */}
      <label className="flex flex-col gap-2">
        <span
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-dim)" }}
        >
          <span>Password</span>
          <a
            href="#"
            className="normal-case tracking-normal text-white/60 transition hover:text-white"
          >
            Forgot?
          </a>
        </span>
        <div
          className="flex items-center gap-2 rounded-2xl border px-4 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40"
          style={{
            borderColor: "var(--border-soft)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <input
            type={showPw ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent py-3.5 text-base text-white placeholder:text-white/30 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="p-1 text-white/50 transition hover:text-white"
          >
            {showPw ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>

      {/* Primary submit — same lime pill as the marketing CTAs. */}
      <button
        type="submit"
        disabled={submitting}
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-pill px-6 py-4 text-base font-medium transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
          boxShadow: "0 0 32px var(--lime-glow)",
        }}
      >
        {submitting ? (
          <Spinner />
        ) : (
          <>
            Sign in
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </>
        )}
      </button>

      {/* OR divider */}
      <div className="my-2 flex items-center gap-4">
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border-subtle)" }}
        />
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          or
        </span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border-subtle)" }}
        />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={onGoogle}
        disabled={submitting}
        className="inline-flex items-center justify-center gap-3 rounded-pill bg-white px-6 py-4 text-base font-medium text-canvas transition-all duration-300 hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <GoogleMark />
        Continue with Google
      </button>
    </form>
  );
}

/* ---------- Inline icons ---------- */

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function Eye() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a18.7 18.7 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}
