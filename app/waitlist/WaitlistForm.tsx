"use client";

/*
  WAITLIST FORM — email + country + flag-prefixed phone + business type.

  Visual reference: the supplied screenshot showing a white-card phone
  field with a US flag dropdown trigger, the dial code as a visible
  prefix, and the placeholder "(+1) 234-567-89". We mirror that exact
  pattern but in our dark canvas system, with the lime focus ring +
  rounded-2xl input shape used by the existing LoginForm so the two
  pages feel like one product.

  Country picker is a custom popover (no external dep) with a search
  field and a scrollable list. Click outside or Escape to close. The
  same popover is used twice — once for the standalone "Country"
  field (where the business is operating) and once inline inside the
  phone field for the dial-code prefix.

  Business type renders as a chip grid pre-seeded with the verticals
  ReviewLoop targets. Picking "Other" reveals an inline text input so
  longer-tail businesses can self-describe without a free-text field
  cluttering the default state.

  After successful submit we swap the form for a calm "you're in"
  success state — we don't route anywhere because the SaaS isn't live
  yet (the entire countdown leans on that fact).
*/

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "./_data/countries";

/* ------------------------------------------------------------------ */
/* Business type options                                              */
/*                                                                     */
/* Curated to the verticals ReviewLoop is shaped for. The "id" is what */
/* gets persisted; the "label" is what the user sees. Keeping this    */
/* tight (8 + Other) keeps the chip grid scannable on mobile.         */
/* ------------------------------------------------------------------ */

type BusinessType = {
  id: string;
  label: string;
};

const BUSINESS_TYPES: BusinessType[] = [
  { id: "ecommerce",   label: "E-commerce / DTC" },
  { id: "beauty",      label: "Beauty & skincare" },
  { id: "fashion",     label: "Fashion & apparel" },
  { id: "food",        label: "Food & beverage" },
  { id: "restaurant",  label: "Restaurants & cafés" },
  { id: "fitness",     label: "Fitness & wellness" },
  { id: "hotel",       label: "Hotels & travel" },
  { id: "creator",     label: "Creators & agencies" },
];

const OTHER_ID = "other";

export default function WaitlistForm() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bizType, setBizType] = useState<string>("");
  const [bizOther, setBizOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !bizType) return;
    if (bizType === OTHER_ID && !bizOther.trim()) return;

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

      {/* ---------- Country (where the business is) ---------- */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          Country
        </span>
        <CountryField value={country} onChange={setCountry} />
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
          country={phoneCountry}
          onCountry={setPhoneCountry}
          phone={phone}
          onPhone={setPhone}
        />
      </label>

      {/* ---------- Business type ---------- */}
      <fieldset className="flex flex-col gap-2">
        <legend
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          What kind of business?
        </legend>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BUSINESS_TYPES.map((b) => (
            <BizChip
              key={b.id}
              label={b.label}
              active={bizType === b.id}
              onClick={() => setBizType(b.id)}
            />
          ))}
          <BizChip
            label="Other"
            active={bizType === OTHER_ID}
            onClick={() => setBizType(OTHER_ID)}
          />
        </div>

        {/* Inline text input when Other is selected. Slides into the
            same field grid so the form doesn't jump heights. */}
        {bizType === OTHER_ID && (
          <input
            type="text"
            required
            autoFocus
            value={bizOther}
            onChange={(e) => setBizOther(e.target.value)}
            placeholder="Tell us what you do"
            className="mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-base text-white placeholder:text-white/30 transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
            style={{
              borderColor: "var(--border-soft)",
              backgroundColor: "var(--bg-elevated)",
            }}
          />
        )}
      </fieldset>

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
/* Business-type chip                                                  */
/* ------------------------------------------------------------------ */

function BizChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative flex items-center justify-center rounded-2xl border px-3 py-3 text-center text-[13px] font-medium transition-all duration-200 hover:-translate-y-[1px]"
      style={
        active
          ? {
              borderColor: "var(--spec-lime)",
              backgroundColor: "rgba(197,248,42,0.10)",
              color: "var(--spec-lime)",
              boxShadow: "0 0 28px rgba(197,248,42,0.18)",
            }
          : {
              borderColor: "var(--border-soft)",
              backgroundColor: "var(--bg-elevated)",
              color: "rgba(255,255,255,0.85)",
            }
      }
    >
      <span className="leading-tight">{label}</span>
      {active && (
        <span
          aria-hidden
          className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full"
          style={{
            backgroundColor: "var(--spec-lime)",
            color: "var(--canvas)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-2.5 w-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Country field — full-width selector with name + flag visible       */
/* ------------------------------------------------------------------ */

function CountryField({
  value,
  onChange,
}: {
  value: Country;
  onChange: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

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

  const filtered = filterCountries(query);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border bg-transparent px-4 py-3.5 text-left text-base text-white transition focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
        style={{
          borderColor: "var(--border-soft)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="text-lg leading-none">
            {value.flag}
          </span>
          <span className="truncate">{value.name}</span>
        </span>
        <Chevron open={open} />
      </button>

      {open && (
        <CountryPopover
          value={value}
          onPick={(c) => {
            onChange(c);
            setOpen(false);
            setQuery("");
          }}
          query={query}
          onQuery={setQuery}
          filtered={filtered}
        />
      )}
    </div>
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

  const filtered = filterCountries(query);

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

      {open && (
        <CountryPopover
          value={country}
          onPick={(c) => {
            onCountry(c);
            setOpen(false);
            setQuery("");
          }}
          query={query}
          onQuery={setQuery}
          filtered={filtered}
          showDial
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared country popover                                              */
/* ------------------------------------------------------------------ */

function CountryPopover({
  value,
  onPick,
  query,
  onQuery,
  filtered,
  showDial = false,
}: {
  value: Country;
  onPick: (c: Country) => void;
  query: string;
  onQuery: (s: string) => void;
  filtered: Country[];
  showDial?: boolean;
}) {
  return (
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
          onChange={(e) => onQuery(e.target.value)}
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
          const active = c.iso === value.iso;
          return (
            <li key={c.iso}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => onPick(c)}
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
                {showDial && (
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
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Helpers ---------- */

function filterCountries(query: string): Country[] {
  if (!query.trim()) return COUNTRIES;
  const q = query.toLowerCase();
  return COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.iso.toLowerCase().includes(q),
  );
}

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
