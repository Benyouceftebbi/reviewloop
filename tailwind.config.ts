import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pulled from arounda.agency live styles.
        ink: "#0b0b0b",         // body bg
        canvas: "#141515",      // text-black token
        lime: "#d0f601",        // CTA accent (also serves as the green hover icon color)
        muted: "rgba(245, 247, 255, 0.6)",
        chip: "rgba(217, 217, 217, 0.11)",
        // Xenon-style neon hover-icon colors. Saturated, slightly off-primary
        // so they pop against the dark blue glow background.
        xeno: {
          green: "#d0f601",
          pink:  "#ff2bd6",
          blue:  "#00d4ff",
        },
      },
      fontFamily: {
        // Gordita is paid; Satoshi is the closest free match (load via @fontsource or Fontshare).
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Libre Baskerville italic is what they use for the display words.
        display: ["var(--font-display)", "Times New Roman", "serif"],
      },
      fontSize: {
        // Arounda uses html { font-size: 10px } so 1rem = 10px there.
        // We'll keep our html at 16px and translate: their 8rem (80px) = our 5rem.
        "display-1": ["clamp(3.8rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(3rem, 6vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "body-xl": ["1.625rem", { lineHeight: "1.45" }],   // 26px
        "body-l": ["1.375rem", { lineHeight: "1.5" }],     // 22px
        "body-m": ["1.125rem", { lineHeight: "1.55" }],    // 18px
        "body-s": ["0.875rem", { lineHeight: "1.5" }],     // 14px
      },
      borderRadius: {
        pill: "48px",    // arounda's pill radius
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Variant A — The River.
        // Falls a comment from above the section to far below, with a brief
        // fade-in at start and fade-out near the bottom.
        riverFall: {
          "0%":   { transform: "translateY(-15vh)",  opacity: "0" },
          "8%":   { opacity: "1" },
          "85%":  { opacity: "1" },
          "100%": { transform: "translateY(110vh)",  opacity: "0" },
        },
        // The "caught" path: the comment veers right partway down,
        // shrinks, and lands on the catcher rail. Then resets.
        riverCatch: {
          "0%":   { transform: "translate(0, -15vh) scale(1)",  opacity: "0" },
          "8%":   { opacity: "1" },
          "45%":  { transform: "translate(0, 35vh) scale(1)",   opacity: "1" },
          "70%":  { transform: "translate(38vw, 25vh) scale(0.55)", opacity: "1" },
          "100%": { transform: "translate(38vw, 25vh) scale(0.55)", opacity: "0" },
        },
        // Variant C (Section 2) — slow ambient drift for ghost comments.
        ghostDrift: {
          "0%":   { transform: "translate(0,0) rotate(-2deg)" },
          "50%":  { transform: "translate(60px,-30px) rotate(1deg)" },
          "100%": { transform: "translate(0,0) rotate(-2deg)" },
        },
        // Section 3 Variant B — Mirror feed scroll.
        // Translates a duplicated stack of cards upward by 50% so the
        // second copy slides into the first copy's starting position.
        feedScroll: {
          "0%":   { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        // Section 3 Variant A — scan pulse line that sweeps across the stage.
        scanSweep: {
          "0%":   { transform: "translateX(-110%)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateX(110%)",  opacity: "0" },
        },
        // Section 3 Variant A — typewriter blink on the cursor.
        caretBlink: {
          "0%, 50%":  { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        // Section 12 — Final CTA persistent micro-pulse.
        // 20px → 36px → 20px lime-glow halo over a 3s loop. The only
        // permanent animation on the page; everything else is calm.
        ctaPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(197,248,42,0.35)" },
          "50%":      { boxShadow: "0 0 36px rgba(197,248,42,0.6)" },
        },
        // Section 12 — Diagonal purple beam.
        // The cone-shaped spotlight from the top-right corner gently
        // breathes: opacity rises and the cone rotates a hair so the
        // light feels alive without becoming theatrical.
        beamSweep: {
          "0%, 100%": { opacity: "0.55", transform: "rotate(0deg) translateX(0)" },
          "50%":      { opacity: "0.9",  transform: "rotate(-1.5deg) translateX(-14px)" },
        },
        // The brighter inner core of the beam — slower, larger drift.
        // Pairs with beamSweep so the highlight inside the cone shifts
        // slightly out of phase with the cone itself. Anchored at the
        // bottom-right corner so positive Y would push the core down
        // off-screen; we drift upward instead so it floats further
        // into view as it breathes.
        beamCore: {
          "0%, 100%": { opacity: "0.55", transform: "translate(0,0) scale(1)" },
          "50%":      { opacity: "0.95", transform: "translate(-10px, -18px) scale(1.06)" },
        },
        // Faint dust motes rising through the beam — a 12s upward
        // drift with horizontal sway. Beam now originates at the
        // bottom-right corner, so motes ascend toward the wide end
        // of the cone (top-left) instead of falling.
        beamMotes: {
          "0%":   { transform: "translate(0, 0)",           opacity: "0" },
          "10%":  { opacity: "0.6" },
          "90%":  { opacity: "0.4" },
          "100%": { transform: "translate(-40px, -220px)",  opacity: "0" },
        },
        // Section 12 — Projector intro for the cone.
        // Origin top-right. Positive rotation pushes the bottom of
        // the cone toward the right edge; negative rotation pushes
        // it toward the left. Sequence: lamp turns on far-right →
        // sweeps left → sweeps right → returns and locks centered.
        beamProjector: {
          "0%":   { transform: "rotate(18deg) translateX(20px)", opacity: "0" },
          "6%":   { opacity: "0.95" },
          "22%":  { transform: "rotate(-22deg) translateX(-30px)", opacity: "1" },
          "44%":  { transform: "rotate(20deg) translateX(22px)",   opacity: "1" },
          "62%":  { transform: "rotate(-10deg) translateX(-12px)", opacity: "0.95" },
          "78%":  { transform: "rotate(4deg) translateX(4px)",     opacity: "0.9" },
          "100%": { transform: "rotate(0deg) translateX(0)",       opacity: "0.85" },
        },
        // Same projector sequence for the bright inner core, with
        // slightly tighter excursion so the highlight tracks the
        // cone but doesn't overshoot it. With the bottom-right
        // anchor, mid-sweep Y offsets are negated so the highlight
        // drifts upward (into the section) instead of pushing further
        // off the bottom edge.
        beamProjectorCore: {
          "0%":   { transform: "rotate(40deg) translate(30px, 0)",     opacity: "0" },
          "6%":   { opacity: "0.9" },
          "22%":  { transform: "rotate(-2deg) translate(-40px, -8px)", opacity: "1" },
          "44%":  { transform: "rotate(38deg) translate(28px, 0)",     opacity: "1" },
          "62%":  { transform: "rotate(20deg) translate(-8px, -12px)", opacity: "0.95" },
          "78%":  { transform: "rotate(30deg) translate(2px, -8px)",   opacity: "0.9" },
          "100%": { transform: "rotate(28deg) translate(0, 0)",        opacity: "0.85" },
        },
        // The headline "lights up" as the beam locks into place:
        // a soft purple glow rises behind the text and a slight
        // brightness lift. Used as a one-shot when beamSettled.
        textLightUp: {
          "0%":   { textShadow: "0 0 0 rgba(196,130,255,0)",   filter: "brightness(0.92)" },
          "60%":  { textShadow: "0 0 32px rgba(196,130,255,0.55), 0 0 80px rgba(155,81,224,0.35)", filter: "brightness(1.08)" },
          "100%": { textShadow: "0 0 18px rgba(196,130,255,0.32), 0 0 48px rgba(155,81,224,0.18)", filter: "brightness(1)" },
        },
      },
      animation: {
        marquee:      "marquee 35s linear infinite",
        "river-fall":  "riverFall 8s linear infinite",
        "river-catch": "riverCatch 8s ease-out infinite",
        "ghost-drift": "ghostDrift 22s ease-in-out infinite",
        "feed-scroll": "feedScroll 24s linear infinite",
        "scan-sweep":  "scanSweep 800ms ease-in-out forwards",
        "caret-blink": "caretBlink 900ms steps(1) infinite",
        "cta-pulse":   "ctaPulse 3s ease-in-out infinite",
        "beam-sweep":  "beamSweep 9s ease-in-out infinite",
        "beam-core":   "beamCore 7s ease-in-out infinite",
        "beam-motes":  "beamMotes 12s linear infinite",
        // One-shot projector intro: 4.2s sweep R→L→R→settle, holds final state.
        "beam-projector":      "beamProjector 4200ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "beam-projector-core": "beamProjectorCore 4200ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
        // 900ms one-shot text glow when the beam locks in.
        "text-light-up":       "textLightUp 900ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
