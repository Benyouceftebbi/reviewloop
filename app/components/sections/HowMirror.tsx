"use client";

/*
  SECTION 3 — VARIANT B: THE MIRROR

  Concept: two permanent panes — left = scrolling comment feed, right =
  paired branded creative cards. Each pair shares the same content; the
  right pane lags the left by ~400ms so the user sees cause-then-effect
  with no "pipeline" rendered in between.

  Implementation:
   - Both panes use the `feed-scroll` keyframe (translateY 0 → -50%).
   - Left pane: animation-delay 0s.
   - Right pane: animation-delay 0.4s — that's the lag.
   - Each pane renders its content TWICE so the second copy slides in
     just as the first copy slides out (seamless loop).
   - One PAIRS array drives both panes — guarantees identical content.
*/

type Pair = {
  comment: string;
  brandColor: string;       // creative card background
  textColor: string;        // creative card text
  brandLabel: string;       // small brand badge
  cardFont?: "sans" | "serif";
};

const PAIRS: Pair[] = [
  {
    comment: "this serum literally changed my skin in 2 weeks",
    brandColor: "#F2E8D5",
    textColor: "#1A1A1A",
    brandLabel: "// minimalist skin",
    cardFont: "serif",
  },
  {
    comment: "best $40 I've spent this year",
    brandColor: "#0A0A0A",
    textColor: "#FF3B30",
    brandLabel: "// loud st.",
    cardFont: "sans",
  },
  {
    comment: "okay this product is unreasonably good",
    brandColor: "#C8D4B8",
    textColor: "#22332B",
    brandLabel: "// clean wellness",
    cardFont: "sans",
  },
  {
    comment: "obsessed isn't a strong enough word",
    brandColor: "#0F1B2D",
    textColor: "#E8E4D8",
    brandLabel: "// premium tech",
    cardFont: "serif",
  },
  {
    comment: "my mom stole mine i had to buy another one",
    brandColor: "#FF7A2A",
    textColor: "#1A1A1A",
    brandLabel: "// vibrant DTC",
    cardFont: "sans",
  },
  {
    comment: "ok fine you converted me",
    brandColor: "#F4F1EC",
    textColor: "#1A1A1A",
    brandLabel: "// luxury fashion",
    cardFont: "serif",
  },
];

export default function HowMirror() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:px-20 md:py-[140px]"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ backgroundColor: "var(--purple-glow)" }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}
        >
          {"{/}"}&nbsp;&nbsp;VARIANT B — THE MIRROR
        </p>
        <h2 className="mt-5 max-w-[900px] font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(36px,4.6vw,64px)]">
          What they say.{" "}
          <em
            className="font-display italic font-normal"
            style={{ color: "var(--purple-soft)" }}
          >
            What runs.
          </em>{" "}
          0.4 seconds apart.
        </h2>

        {/* DUAL PANES — vertical on mobile, horizontal on md+. */}
        <div className="relative mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-8">
          <Pane delay={0} kind="comment" />
          <Pane delay={0.4} kind="creative" />
        </div>

        <p
          className="mt-8 text-center font-mono text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          // industry average lag: 47 minutes &nbsp;·&nbsp; ours: 0.4s
        </p>
      </div>
    </section>
  );
}

function Pane({
  delay,
  kind,
}: {
  delay: number;
  kind: "comment" | "creative";
}) {
  return (
    <div
      className="relative h-[480px] overflow-hidden rounded-3xl md:h-[560px]"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        // Soft mask so cards fade at top and bottom of the pane.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      {/* Pane label */}
      <div
        className="pointer-events-none absolute left-5 top-5 z-10 font-mono text-[10px] uppercase"
        style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
      >
        {kind === "comment" ? "// inbound" : "// generated"}
      </div>

      {/* The scrolling stack. Two copies of PAIRS for seamless loop. */}
      <div
        className="absolute inset-x-0 top-0 flex flex-col gap-4 p-5 animate-feed-scroll"
        style={{ animationDelay: `${delay}s` }}
      >
        {[...PAIRS, ...PAIRS].map((pair, i) =>
          kind === "comment" ? (
            <CommentCard key={i} pair={pair} />
          ) : (
            <CreativeCard key={i} pair={pair} />
          )
        )}
      </div>
    </div>
  );
}

function CommentCard({ pair }: { pair: Pair }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />
        <span
          className="font-mono text-[10px]"
          style={{ color: "var(--text-dim)" }}
        >
          @anon_customer · 2h
        </span>
      </div>
      <p className="mt-2 text-sm text-white/90">{pair.comment}</p>
    </div>
  );
}

function CreativeCard({ pair }: { pair: Pair }) {
  const fontClass = pair.cardFont === "serif" ? "font-display italic" : "font-sans";
  return (
    <div
      className="flex flex-col justify-between rounded-2xl p-5 aspect-[5/3]"
      style={{
        backgroundColor: pair.brandColor,
        boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
      }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.22em]"
        style={{ color: pair.textColor, opacity: 0.7 }}
      >
        {pair.brandLabel}
      </span>
      <p
        className={`text-[20px] leading-[1.2] ${fontClass}`}
        style={{ color: pair.textColor, fontWeight: pair.cardFont === "serif" ? 400 : 600 }}
      >
        {pair.comment}
      </p>
      <span
        className="font-mono text-[9px]"
        style={{ color: pair.textColor, opacity: 0.5 }}
      >
        @anon_customer
      </span>
    </div>
  );
}
