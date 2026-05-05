"use client";

/*
  WAITLIST FORM — email + flag-prefixed phone.

  Visual reference: the supplied screenshot showing a white-card phone
  field with a US flag dropdown trigger, the dial code as a visible
  prefix, and the placeholder "(+1) 234-567-89". We mirror that exact
  pattern but in our dark canvas system, with the lime focus ring +
  rounded-2xl input shape used by the existing LoginForm so the two
  pages feel like one product.

  Country picker is a custom popover (no external dep) with a search
  field and a scrollable list. Click outside or Escape to close.

  After successful submit we swap the form for a calm "you're in"
  success state — we don't route anywhere because the SaaS isn't live
  yet (the entire countdown leans on that fact).
*/

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "./_data/countries";

export default function WaitlistForm() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    setSubmitting(true);
    // Demo: pretend to ping a "/api/waitlist" endpoint. Real wiring
    // (Supabase, Resend, etc.) can drop in here later.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return <SuccessState email={email} />;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* ---------- Email ---------- */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@brand.com"
          className="w-full rounded-2xl border bg-transparent px-4 py-3.5 text-base text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
          style={{
            borderColor: "var(--border-soft)",
            backgroundColor: "var(--bg-elevated)",
          }}
        />
      </label>

      {/* ---------- Phone ---------- */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          Phone Number
        </span>
        <PhoneField
          country={country}
          onCountry={setCountry}
          phone={phone}
          onPhone={setPhone}
        />
      </label>

      {/* ---------- Submit ---------- */}
      <button
        type="submit"
        disabled={submitting}
        className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-6 py-4 text-base font-medium text-canvas transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          backgroundColor: "var(--spec-lime)",
          boxShadow: "0 0 36px var(--lime-glow)",
        }}
      >
        {/* Shimmer that sweeps across the pill on hover, matching
            the same lime-fill trick used by the navbar primary CTA. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/40 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
        />
        <span className="relative">
          {submitting ? "Joining…" : "Join the waitlist"}
        </span>
        {!submitting && (
          <span aria-hidden className="relative">
            →
          </span>
        )}
      </button>

      <p
        className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-dim)" }}
      >
        {"// "}we&apos;ll text you the moment we open the door
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Phone field — flag selector + dial prefix + numeric input          */
/* ------------------------------------------------------------------ */

function PhoneField({
  country,
  onCountry,
  phone,
  onPhone,
}: {
  country: Country;
  onCountry: (c: Country) => void;
  phone: string;
  onPhone: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = COUNTRIES.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.iso.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="flex items-center gap-2 rounded-2xl border px-2 transition focus-within:border-lime focus-within:ring-2 focus-within:ring-lime/40"
        style={{
          borderColor: "var(--border-soft)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        {/* Country trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
        >
          <span aria-hidden className="text-lg leading-none">
            {country.flag}
          </span>
          <Chevron open={open} />
        </button>

        {/* Dial prefix — visually part of the field, not editable */}
        <span
          aria-hidden
          className="select-none text-sm text-white/60"
          style={{ fontFeatureSettings: '"tnum" 1' }}
        >
          ({country.dial})
        </span>

        {/* Number input */}
        <input
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => onPhone(formatPhone(e.target.value))}
          placeholder="234-567-89"
          className="flex-1 bg-transparent py-3.5 pr-3 text-base text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>

      {/* ---------- Country popover ---------- */}
      {open && (
        <div
          role="listbox"
          aria-label="Select country"
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            backgroundColor: "var(--bg-elevated)",
            borderColor: "var(--border-soft)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
          }}
        >
          <div
            className="border-b p-2"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full rounded-xl bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>

          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li
                className="px-4 py-3 text-sm"
                style={{ color: "var(--text-dim)" }}
              >
                No matches.
              </li>
            )}
            {filtered.map((c) => {
              const active = c.iso === country.iso;
              return (
                <li key={c.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onCountry(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/[0.04]"
                    style={
                      active
                        ? {
                            backgroundColor: "rgba(197,248,42,0.08)",
                            color: "var(--spec-lime)",
                          }
                        : undefined
                    }
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span aria-hidden className="text-base">
                        {c.flag}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span
                      className="font-mono text-xs tabular-nums"
                      style={{
                        color: active
                          ? "var(--spec-lime)"
                          : "var(--text-dim)",
                      }}
                    >
                      {c.dial}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

// Lightweight US-style hyphen formatter so the placeholder pattern
// in the screenshot ("234-567-89") is reflected in the typed value.
// Strips everything except digits, then inserts hyphens at 3/3/4
// boundaries up to 10 digits. Works fine for the demo across most
// countries; international formatting libs can replace this later.
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 text-white/60 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Success state                                                       */
/* ------------------------------------------------------------------ */

function SuccessState({ email }: { email: string }) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-3xl border px-6 py-10 text-center"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: "rgba(197,248,42,0.14)",
          color: "var(--spec-lime)",
          boxShadow: "0 0 32px var(--lime-glow)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>

      <p
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--spec-lime)" }}
      >
        {"// "}you&apos;re on the list
      </p>

      <h3 className="font-medium text-[1.5rem] leading-tight text-white">
        See you on launch{" "}
        <em className="font-display italic font-normal text-white/95">day</em>.
      </h3>

      <p className="text-sm text-white/65">
        We&apos;ll text{" "}
        <span className="font-medium text-white">{email}</span> the
        moment your account is ready.
      </p>
    </div>
  );
}
