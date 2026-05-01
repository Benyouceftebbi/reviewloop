"use client";

/*
  Creative generation screen for a single testimonial.

  Layout
    [Header — back link + source pill + meta + media (photo / audio)]
    [Quote block — the actual comment, large and readable]
    [Two-column main]
      LEFT  — Mode tabs (Generic | AI) + the controls for whichever
              mode is active. No vibe selector — output is locked to
              the brand vibe so it always feels on-brand.
      RIGHT — Live preview of the creative + Generate CTA + actions.

  Modes
    "generic"  — pick one of the existing brand templates from
                 _demoData.tsx. The CreativeCard there is reused
                 directly so the dashboard stays in lockstep with
                 the marketing demo.
    "ai"       — pick post type (normal / ad) and aspect ratio (1:1,
                 4:5, 9:16, 16:9, 3:4). Renders a custom AI-styled
                 card at the chosen aspect using the brand vibe.

  Source media
    Testimonials can be text, photo (image attached) or audio (voice
    note). The header renders the appropriate widget. For audio the
    transcript stored in `t.text` is what gets baked into the
    creative — same as text testimonials.

  Generate animation
    A 1.5s requestAnimationFrame loop drives the same staged
    progress 0..1 that CreativeCard in _demoData.tsx already
    consumes — bg fades, label appears, testimonial typewrites in,
    signature appears, lime "ready" tag pops at the end. The AI
    card here mirrors the same staged reveal so both modes feel
    consistent.
*/

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  PLATFORM_META,
  relativeTime,
  type Testimonial,
} from "../../_data/testimonials";
import {
  BRANDS,
  BrandThumb,
  CreativeCard,
} from "../../../components/sections/_demoData";

type Mode = "generic" | "ai";
type PostType = "normal" | "ad";
type AspectId = "1:1" | "4:5" | "9:16" | "16:9" | "3:4";

const ASPECTS: { id: AspectId; label: string; ratio: number; hint: string }[] = [
  { id: "1:1", label: "1:1", ratio: 1, hint: "Feed post" },
  { id: "4:5", label: "4:5", ratio: 4 / 5, hint: "IG portrait" },
  { id: "9:16", label: "9:16", ratio: 9 / 16, hint: "Story / Reel" },
  { id: "16:9", label: "16:9", ratio: 16 / 9, hint: "YouTube / web" },
  { id: "3:4", label: "3:4", ratio: 3 / 4, hint: "Pinterest" },
];

// One canonical, on-brand vibe — dark canvas, lime accent, display
// italic for the quote so the AI output always matches the rest of
// the site's typography.
const BRAND_VIBE = {
  bg: "#0A0A0F",
  text: "#FFFFFF",
  accent: "#C5F82A",
};

export default function GenerateView({ testimonial: t }: { testimonial: Testimonial }) {
  const meta = PLATFORM_META[t.platform];
  const kind = t.kind ?? "text";

  const [mode, setMode] = useState<Mode>("ai");

  // Generic-template state
  const [brandIdx, setBrandIdx] = useState(0);

  // AI state
  const [postType, setPostType] = useState<PostType>("ad");
  const [aspect, setAspect] = useState<AspectId>("1:1");

  // Shared generation state
  const [progress, setProgress] = useState(0);
  const [generating, setGenerating] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Reset preview whenever the user changes anything that affects output.
  useEffect(() => {
    setProgress(0);
    setGenerating(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [mode, brandIdx, postType, aspect]);

  const generate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setGenerating(true);
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const e = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - e, 3);
      setProgress(eased);
      if (e < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setGenerating(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const isReady = progress >= 0.95;
  const brand = BRANDS[brandIdx] ?? BRANDS[0];
  const aspectMeta = ASPECTS.find((a) => a.id === aspect) ?? ASPECTS[0];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:px-8 md:py-10">
      {/* Back link */}
      <Link
        href="/dashboard/testimonials"
        className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white"
      >
        <span aria-hidden>←</span> back to inbox
      </Link>

      {/* Header card with source + author + media + quote */}
      <header
        className="flex flex-col gap-4 rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: meta.color, backgroundColor: meta.bg }}
            >
              {meta.icon}
              {meta.label}
            </span>
            {kind !== "text" && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{
                  color: kind === "audio" ? "var(--spec-lime)" : "rgba(255,255,255,0.85)",
                  backgroundColor:
                    kind === "audio"
                      ? "rgba(197,248,42,0.12)"
                      : "rgba(255,255,255,0.06)",
                }}
              >
                {kind === "audio" ? <MicIcon /> : <PhotoIcon />}
                {kind === "audio" ? "voice note" : "photo attached"}
              </span>
            )}
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            {relativeTime(t.postedAt)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-medium"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {initialsOf(t.author)}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-[14px] font-medium text-white">{t.author}</span>
            <span className="text-[12px] text-white/55">{t.handle}</span>
          </div>
        </div>

        {/* Media: photo or audio player */}
        {kind === "photo" && t.imageUrl && (
          <div
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <img
              src={t.imageUrl}
              alt={t.imageAlt ?? "Customer photo"}
              className="h-full w-full max-h-[320px] object-cover"
            />
          </div>
        )}

        {kind === "audio" && (
          <AudioPlayer
            duration={t.audioDuration ?? 0}
            waveform={t.waveform ?? []}
          />
        )}

        {/* Quote (caption for photo, transcript for audio) */}
        <blockquote className="text-[18px] leading-relaxed text-white/90 md:text-[20px]">
          {kind === "audio" && (
            <span
              className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--text-dim)" }}
            >
              // transcript
            </span>
          )}
          <span className="font-display italic text-white/40">&ldquo;</span>
          {t.text}
          <span className="font-display italic text-white/40">&rdquo;</span>
        </blockquote>

        {t.postContext && (
          <span
            className="font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-dim)" }}
          >
            ↳ {t.postContext}
          </span>
        )}
      </header>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* LEFT — controls */}
        <section
          className="flex flex-col gap-5 rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          {/* Mode tabs */}
          <div className="flex flex-col gap-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--text-dim)" }}
            >
              // method
            </span>
            <div
              className="grid grid-cols-2 gap-1 rounded-pill border p-1"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <ModeTab
                label="AI generate"
                active={mode === "ai"}
                onClick={() => setMode("ai")}
                badge="new"
              />
              <ModeTab
                label="Generic template"
                active={mode === "generic"}
                onClick={() => setMode("generic")}
              />
            </div>
          </div>

          {mode === "generic" ? (
            <GenericControls brandIdx={brandIdx} onBrandIdx={setBrandIdx} />
          ) : (
            <AIControls
              postType={postType}
              onPostType={setPostType}
              aspect={aspect}
              onAspect={setAspect}
            />
          )}
        </section>

        {/* RIGHT — preview + actions */}
        <section
          className="flex flex-col gap-5 rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--text-dim)" }}
            >
              // preview {mode === "ai" ? `· ${aspect} · ${postType} post` : ""}
            </span>
            {generating && (
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--spec-lime)" }}
              >
                rendering · {Math.round(progress * 100)}%
              </span>
            )}
          </div>

          <div className="relative">
            {mode === "generic" ? (
              <CreativeCard brand={brand} testimonial={t.text} progress={progress} />
            ) : (
              <AICreativeCard
                aspect={aspectMeta.ratio}
                postType={postType}
                testimonial={t.text}
                progress={progress}
              />
            )}

            {/* Empty state */}
            {progress === 0 && !generating && (
              <div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl text-center"
                style={{
                  backgroundColor: "rgba(10,10,15,0.55)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(197,248,42,0.12)",
                    color: "var(--spec-lime)",
                    boxShadow: "0 0 24px var(--lime-glow)",
                  }}
                >
                  <SparkleIcon />
                </span>
                <p className="text-[12px] text-white/70">
                  {mode === "generic"
                    ? "Pick a template, then generate."
                    : "Pick a format & size, then generate."}
                </p>
              </div>
            )}
          </div>

          {/* Generate */}
          <button
            onClick={generate}
            disabled={generating}
            className="group inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3.5 text-[14px] font-medium transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
            style={{
              backgroundColor: "var(--spec-lime)",
              color: "#1A1A1A",
              boxShadow: "0 0 28px var(--lime-glow)",
            }}
          >
            {generating ? (
              <>
                <Spinner /> Generating ({Math.round(progress * 100)}%)
              </>
            ) : isReady ? (
              <>
                Regenerate
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  ↻
                </span>
              </>
            ) : (
              <>
                Generate {mode === "ai" ? "with AI" : "creative"}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </>
            )}
          </button>

          {isReady && (
            <div className="grid grid-cols-2 gap-2">
              <SecondaryBtn label="Download PNG" />
              <SecondaryBtn label="Share to socials" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Audio player                                                        */
/* ------------------------------------------------------------------ */

function AudioPlayer({ duration, waveform }: { duration: number; waveform: number[] }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const startedAt = performance.now() - progress * duration * 1000;
    const tick = (now: number) => {
      const elapsed = (now - startedAt) / 1000;
      const ratio = Math.min(1, elapsed / Math.max(1, duration));
      setProgress(ratio);
      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, duration]);

  const onToggle = () => {
    if (progress >= 1) setProgress(0);
    setPlaying((p) => !p);
  };

  return (
    <div
      className="flex items-center gap-4 rounded-xl border p-3"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "rgba(197,248,42,0.04)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
        style={{
          backgroundColor: "var(--spec-lime)",
          color: "#1A1A1A",
          boxShadow: "0 0 20px var(--lime-glow)",
        }}
        aria-label={playing ? "Pause voice note" : "Play voice note"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <Waveform bars={waveform} progress={progress} className="h-10 flex-1" />

      <span
        className="shrink-0 font-mono text-[11px] tabular-nums"
        style={{ color: "var(--text-dim)" }}
      >
        {formatDuration(progress * duration)} / {formatDuration(duration)}
      </span>
    </div>
  );
}

function Waveform({
  bars,
  progress = 0,
  className,
}: {
  bars: number[];
  progress?: number;
  className?: string;
}) {
  const cutoff = Math.floor(bars.length * progress);
  return (
    <span
      aria-hidden
      className={`flex items-center gap-[3px] ${className ?? ""}`}
    >
      {bars.map((amp, i) => (
        <span
          key={i}
          className="block w-[3px] rounded-full transition-colors"
          style={{
            height: `${Math.max(15, amp * 100)}%`,
            backgroundColor:
              i < cutoff ? "var(--spec-lime)" : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </span>
  );
}

function formatDuration(sec: number) {
  const safe = Math.max(0, sec);
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Generic template controls                                           */
/* ------------------------------------------------------------------ */

function GenericControls({
  brandIdx,
  onBrandIdx,
}: {
  brandIdx: number;
  onBrandIdx: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          // brand template
        </span>
        <span className="text-[11px] text-white/50">{BRANDS[brandIdx]?.label ?? ""}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {BRANDS.map((b, i) => (
          <BrandThumb
            key={b.id}
            brand={b}
            active={i === brandIdx}
            onClick={() => onBrandIdx(i)}
          />
        ))}
      </div>

      <div
        className="rounded-xl border p-3 font-mono text-[11px] leading-relaxed"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        Generic templates are pre-tuned brand archetypes from the system. Pick
        the closest match, then hit generate.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI controls                                                         */
/* ------------------------------------------------------------------ */

function AIControls({
  postType,
  onPostType,
  aspect,
  onAspect,
}: {
  postType: PostType;
  onPostType: (p: PostType) => void;
  aspect: AspectId;
  onAspect: (a: AspectId) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Post type */}
      <div className="flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          // post type
        </span>
        <div className="grid grid-cols-2 gap-2">
          <PostTypeCard
            label="Normal post"
            description="Organic feed creative · lighter copy, no CTA"
            active={postType === "normal"}
            onClick={() => onPostType("normal")}
          />
          <PostTypeCard
            label="Ad post"
            description="Paid creative · headline + CTA badge"
            active={postType === "ad"}
            onClick={() => onPostType("ad")}
          />
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="flex flex-col gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-dim)" }}
        >
          // size
        </span>
        <div className="flex flex-wrap gap-2">
          {ASPECTS.map((a) => (
            <AspectChip
              key={a.id}
              label={a.label}
              hint={a.hint}
              ratio={a.ratio}
              active={aspect === a.id}
              onClick={() => onAspect(a.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="rounded-xl border p-3 font-mono text-[11px] leading-relaxed"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        Output is locked to the brand vibe — dark canvas, lime accent,
        editorial type. Pick the format and size, then generate.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI creative card                                                    */
/* ------------------------------------------------------------------ */

function AICreativeCard({
  aspect,
  postType,
  testimonial,
  progress,
}: {
  aspect: number;
  postType: PostType;
  testimonial: string;
  progress: number;
}) {
  const v = BRAND_VIBE;
  const p = clamp(progress, 0, 1);
  const bgOpacity = clamp(p / 0.15, 0, 1);
  const labelOpacity = clamp((p - 0.15) / 0.25, 0, 1);
  const textCount = Math.floor(clamp((p - 0.4) / 0.45, 0, 1) * testimonial.length);
  const sigOpacity = clamp((p - 0.85) / 0.1, 0, 1);
  const readyOn = p >= 0.95;

  const visible = testimonial.slice(0, textCount);
  const stillTyping = textCount > 0 && textCount < testimonial.length;

  const fontStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontStyle: "italic",
    fontWeight: 400,
  };

  const adOverlay =
    postType === "ad"
      ? `radial-gradient(120% 80% at 0% 0%, ${v.accent}26, transparent 60%), radial-gradient(120% 80% at 100% 100%, ${v.accent}1f, transparent 60%)`
      : `radial-gradient(120% 80% at 50% 0%, ${v.accent}14, transparent 70%)`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        aspectRatio: `${aspect}`,
        backgroundColor: v.bg,
        opacity: 0.2 + 0.8 * bgOpacity,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        backgroundImage: adOverlay,
        transition: "background-color 300ms var(--ease-reveal)",
      }}
    >
      {/* Grain / scanline texture for the futuristic feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-7">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: v.text, opacity: 0.7 * labelOpacity }}
          >
            // ai · {postType} post
          </span>
          {postType === "ad" && (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{
                color: v.bg,
                backgroundColor: v.accent,
                opacity: labelOpacity,
              }}
            >
              SPONSORED
            </span>
          )}
        </div>

        {/* Quote */}
        <p
          className="leading-[1.18] text-[clamp(16px,2.4vw,28px)]"
          style={{
            ...fontStyle,
            color: v.text,
            minHeight: "2.6em",
          }}
        >
          <span className="font-display italic" style={{ opacity: 0.45 }}>
            &ldquo;
          </span>
          {visible}
          {stillTyping && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[2px] animate-caret-blink"
              style={{ backgroundColor: v.text }}
            />
          )}
          {!stillTyping && p > 0.4 && (
            <span className="font-display italic" style={{ opacity: 0.45 }}>
              &rdquo;
            </span>
          )}
        </p>

        {/* Bottom row */}
        <div className="flex items-end justify-between gap-3">
          <span
            className="font-mono text-[10px]"
            style={{ color: v.text, opacity: 0.55 * sigOpacity }}
          >
            @anon_customer
          </span>

          {postType === "ad" ? (
            <span
              className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor: readyOn ? "var(--spec-lime)" : "transparent",
                color: readyOn ? "#1A1A1A" : "transparent",
                boxShadow: readyOn ? "0 0 24px var(--lime-glow)" : "none",
                transition: "all 200ms var(--ease-reveal)",
              }}
            >
              SHOP NOW →
            </span>
          ) : (
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor: readyOn ? "var(--spec-lime)" : "transparent",
                color: readyOn ? "#1A1A1A" : "transparent",
                boxShadow: readyOn ? "0 0 24px var(--lime-glow)" : "none",
                transition: "all 200ms var(--ease-reveal)",
              }}
            >
              ✓ ready
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pickers                                                             */
/* ------------------------------------------------------------------ */

function ModeTab({
  label,
  active,
  onClick,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center gap-2 rounded-pill px-4 py-2 text-[12px] font-medium transition-colors"
      style={{
        backgroundColor: active ? "var(--spec-lime)" : "transparent",
        color: active ? "#1A1A1A" : "rgba(255,255,255,0.75)",
        boxShadow: active ? "0 0 24px var(--lime-glow)" : undefined,
      }}
    >
      {label}
      {badge && (
        <span
          className="rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em]"
          style={{
            backgroundColor: active ? "rgba(0,0,0,0.18)" : "rgba(197,248,42,0.18)",
            color: active ? "#1A1A1A" : "var(--spec-lime)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function PostTypeCard({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all"
      style={{
        borderColor: active ? "rgba(197,248,42,0.55)" : "var(--border-subtle)",
        backgroundColor: active ? "rgba(197,248,42,0.06)" : "rgba(255,255,255,0.02)",
        boxShadow: active ? "0 0 0 1px rgba(197,248,42,0.35), 0 0 24px rgba(197,248,42,0.10)" : undefined,
      }}
    >
      <span
        className="text-[13px] font-medium"
        style={{ color: active ? "var(--spec-lime)" : "white" }}
      >
        {label}
      </span>
      <span className="text-[11px] leading-relaxed text-white/55">{description}</span>
    </button>
  );
}

function AspectChip({
  label,
  hint,
  ratio,
  active,
  onClick,
}: {
  label: string;
  hint: string;
  ratio: number;
  active: boolean;
  onClick: () => void;
}) {
  // Tiny visual rectangle so the user can see the shape — width is
  // capped, height derives from the ratio.
  const w = 22;
  const h = Math.round(w / ratio);
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 transition-colors"
      style={{
        borderColor: active ? "rgba(197,248,42,0.55)" : "var(--border-subtle)",
        backgroundColor: active ? "rgba(197,248,42,0.08)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span
        aria-hidden
        className="flex items-center justify-center"
        style={{ width: 22, height: 22 }}
      >
        <span
          style={{
            width: `${w}px`,
            height: `${Math.min(h, 22)}px`,
            border: `1px solid ${active ? "var(--spec-lime)" : "rgba(255,255,255,0.4)"}`,
            borderRadius: 3,
          }}
        />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span
          className="font-mono text-[11px]"
          style={{ color: active ? "var(--spec-lime)" : "white" }}
        >
          {label}
        </span>
        <span className="text-[10px] text-white/50">{hint}</span>
      </span>
    </button>
  );
}

function SecondaryBtn({ label }: { label: string }) {
  return (
    <button
      className="rounded-pill border px-4 py-2.5 text-[12px] font-medium text-white/85 transition-colors hover:border-white/25 hover:text-white"
      style={{
        borderColor: "var(--border-soft)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function SparkleIcon() {
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
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M5.6 5.6l2.8 2.8" />
      <path d="M15.6 15.6l2.8 2.8" />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M21 17l-5-4-9 7" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0014 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "");
}
