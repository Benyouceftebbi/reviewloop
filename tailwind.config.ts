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
      },
    },
  },
  plugins: [],
};
export default config;
