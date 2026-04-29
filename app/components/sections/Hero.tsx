"use client";

/*
  HERO — pixel-perfect breakdown of arounda.agency's hero.

  Hover behavior on each pill word:
   - The pill tilts ~4° (CSS transition).
   - THREE icon badges float in around it, each with a stagger.
   - Each pill has its own neon color: green / pink / blue.
*/

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ---------- Inline icon set ---------- */
/*
  Three clusters of three icons, each cluster mapped to one pill in
  the headline. We picked icons that read instantly as "the place
  customer praise lives today" → reviews, comments, DMs.
*/

/* Reviews cluster (used on "reviews") */
const I_Star = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2.6l2.92 5.92 6.54.95-4.73 4.61 1.12 6.51L12 17.5l-5.85 3.09 1.12-6.51-4.73-4.61 6.54-.95L12 2.6z" />
  </svg>
);
const I_Quote = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M7 7h4v4H8.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-5.5V7zm9 0h4v4h-2.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-5.5V7z" />
  </svg>
);
const I_ThumbUp = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3zM7 11l4-7a2 2 0 0 1 4 .8V9h5a2 2 0 0 1 2 2.3l-1.2 6.5a2 2 0 0 1-2 1.7H7" />
  </svg>
);

/* Comments cluster (used on "comments") */
const I_Bubble = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" />
  </svg>
);
const I_Heart = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 21s-7.5-4.6-9.5-9.4C1 7.4 4 4 7.5 4c2 0 3.6 1.1 4.5 2.6C12.9 5.1 14.5 4 16.5 4 20 4 23 7.4 21.5 11.6 19.5 16.4 12 21 12 21z" />
  </svg>
);
const I_At = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);

/* DMs cluster (used on "DMs") */
const I_Send = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const I_Inbox = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l3.5-7z" />
  </svg>
);
const I_Bell = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

/*
  IconSpec — describes one floating badge.
   - el: the icon node
   - top/left/right: where the badge anchors relative to the pill
   - rotate: resting rotation (deg)
   - delay: GSAP stagger delay
*/
type IconSpec = {
  el: React.ReactNode;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
  rotate: number;
  delay: number;
};

export default function Hero() {
  return (
    // The background lives at the page level now (HeroBackground.tsx) so it
    // can also bleed into the LogoStrip below. This section just provides
    // the layout container.
    <section className="relative min-h-screen">

      {/*
        Nav is now rendered in app/page.tsx (Navbar.tsx) — fixed position so
        it floats above this section. We add `pt-32` here to push the hero
        content down so the navbar doesn't overlap it on first paint.
      */}

      <div className="relative z-10 mx-auto max-w-[1400px] px-10 pt-32">
        <p className="mb-5 text-center text-body-s text-muted tracking-wide">
          Customer-led ad creative, on autopilot
        </p>

        <h1 className="mx-auto max-w-[1300px] text-center font-medium leading-[1.08] tracking-tight text-[clamp(2.6rem,5.2vw,4.5rem)]">
          Turn your{" "}
          {/*
            Pill 1 → "reviews". Lime brand color (#d0f601) so the
            pill's hover-tilt + tinted text use the same accent the
            CTA button uses, anchoring the brand color at the top of
            the page. Icons: Star, Quote, ThumbUp.
          */}
          <Pill
            color="#d0f601"
            icons={[
              { el: I_Star,    pos: { top: "-1.6rem", left: "-1.4rem" },     rotate: -14, delay: 0 },
              { el: I_Quote,   pos: { top: "-2rem", right: "-0.8rem" },      rotate: 10,  delay: 0.06 },
              { el: I_ThumbUp, pos: { bottom: "-1.6rem", right: "-1.6rem" }, rotate: -6,  delay: 0.12 },
            ]}
          >
            reviews
          </Pill>
          <span>,&nbsp;</span>
          {/*
            Pill 2 → "comments". Soft purple to match --purple-soft
            in the design tokens, so the headline visibly carries the
            two brand colors (lime + purple) in its key words.
            Icons: speech bubble, heart, at-sign.
          */}
          <Pill
            color="#a78bfa"
            icons={[
              { el: I_Bubble, pos: { top: "-1.8rem", left: "-1.6rem" }, rotate: -10, delay: 0 },
              { el: I_Heart,  pos: { top: "-2rem", right: "-0.6rem" },  rotate: 12,  delay: 0.06 },
              { el: I_At,     pos: { bottom: "-1.6rem", left: "1rem" }, rotate: -4,  delay: 0.12 },
            ]}
          >
            comments
          </Pill>
          <span>, and&nbsp;</span>
          {/*
            Pill 3 → "DMs". Pink to keep some chromatic delight in
            the trio (matches the reference aesthetic where each
            keyword gets its own neon halo). Icons: paper-plane,
            inbox, notification bell.
          */}
          <Pill
            color="#ff2bd6"
            icons={[
              { el: I_Send,  pos: { top: "-1.8rem", left: "-1rem" },    rotate: -16, delay: 0 },
              { el: I_Inbox, pos: { top: "-2rem", right: "-1rem" },     rotate: 8,   delay: 0.06 },
              { el: I_Bell,  pos: { bottom: "-1.8rem", right: "1rem" }, rotate: -2,  delay: 0.12 },
            ]}
          >
            DMs
          </Pill>{" "}
          into{" "}
          <PlayThumb />{" "}
          scroll-stopping{" "}
          <em className="font-display italic font-normal text-white/95">ads</em>
        </h1>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 md:px-12">
          <div className="flex gap-4">
            <span className="font-mono text-body-s text-muted">{"{/}"}</span>
            <p className="text-body-m">
              Plug in once. ReviewLoop pulls every review, comment, and DM
              from Meta, Shopify, and Trustpilot — automatically.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-body-s text-muted">{"{/}"}</span>
            <p className="text-body-m">
              Out the other end: ad-ready creatives, hooks, and captions
              built from real customer voices — in minutes, not weeks.
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between md:px-12">
          <div className="flex gap-3">
            <Tag>DTC</Tag>
            <Tag>Shopify</Tag>
            <Tag>Meta Ads</Tag>
          </div>
          {/*
            BOOK-A-CALL CTA — endless-arrow hover pattern.

            Layout:
             - One <a> wrapper holding the arrow circle + the pill.
             - `gap-1` puts them visually almost-touching.
             - `group` lets the inner arrow + colors react to ONE hover target,
               so hovering EITHER the circle or the pill triggers the animation.

            Arrow animation:
             - The circle has `overflow-hidden` so anything outside it is clipped.
             - Inside, a stacked column with TWO copies of the up-arrow.
             - The whole column translates upward by its full height on hover.
             - Result: the visible arrow exits the top, the duplicate from below
               slides into its place — feels like a continuous upward motion.
          */}
          <a href="#" className="group flex items-center gap-1">
            {/* Arrow circle — bigger now (h-16 vs old h-14), tighter gap to pill. */}
            <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-lime text-canvas transition-colors duration-300 group-hover:bg-white">
              {/*
                Stacked arrow column: two cells, each exactly the circle's
                height, so the column is 2× tall. Translating by -50% on
                hover shifts the column up by exactly one cell — the bottom
                arrow slides into the visible window.
              */}
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2">
                <span className="flex h-16 items-center justify-center"><ArrowUp /></span>
                <span className="flex h-16 items-center justify-center"><ArrowUp /></span>
              </span>
            </span>

            {/* Pill — color swap on hover matches the circle. */}
            <span className="rounded-pill bg-lime px-10 py-5 font-medium text-canvas transition-colors duration-300 group-hover:bg-white">
              Get 10 free creatives
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/*
  Pill — italic chip with hover-spawned icon badges.

  How the animation works:
   1. We collect refs to ALL three badge spans into an array.
   2. On mount, we set them all to the hidden resting state
      (opacity 0, translated 14px down, scaled to 0.5, slight rotate).
   3. On mouseenter we run a GSAP timeline that staggers the badges
      out of hiding using `back.out(2.4)` — that's the overshoot easing
      which creates the springy "pop" feel.
   4. On mouseleave we reverse with a faster ease-in.

  The pill itself rotates via plain CSS hover (cheaper than JS).
*/
function Pill({
  children,
  icons,
  color,
}: {
  children: React.ReactNode;
  icons: IconSpec[];
  color: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  // useRef<...[]> with `[]` initial value gives us a stable mutable array
  // we can push refs into during render.
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const badges = badgeRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!wrap || badges.length === 0) return;

    // Hidden resting state — apply to each badge with its specific rotate.
    badges.forEach((b, i) => {
      gsap.set(b, {
        opacity: 0,
        y: 14,
        scale: 0.5,
        rotate: icons[i].rotate - 20,
      });
    });

    const enter = () => {
      gsap.killTweensOf(badges);
      // Animate each badge with its own delay (the stagger).
      badges.forEach((b, i) => {
        gsap.to(b, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: icons[i].rotate,
          duration: 0.5,
          delay: icons[i].delay,
          ease: "back.out(2.4)",
        });
      });
    };

    const leave = () => {
      gsap.killTweensOf(badges);
      badges.forEach((b, i) => {
        gsap.to(b, {
          opacity: 0,
          y: 12,
          scale: 0.5,
          rotate: icons[i].rotate - 20,
          duration: 0.22,
          ease: "power2.in",
        });
      });
    };

    wrap.addEventListener("mouseenter", enter);
    wrap.addEventListener("mouseleave", leave);
    return () => {
      wrap.removeEventListener("mouseenter", enter);
      wrap.removeEventListener("mouseleave", leave);
    };
  }, [icons]);

  return (
    <span
      ref={wrapRef}
      // The CSS variable --pill-color is consumed by the inner italic
      // text (color:var(--pill-color) on group-hover). This keeps the
      // text color, badge bg, and shadow halo all driven by ONE prop.
      style={{ ["--pill-color" as string]: color }}
      className="group relative mx-0.5 inline-block align-middle"
    >
      {/* Three floating icon badges — absolute-positioned, hidden by default. */}
      {icons.map((icon, i) => (
        <span
          key={i}
          ref={(el) => { badgeRefs.current[i] = el; }}
          aria-hidden
          className="pointer-events-none absolute z-10 grid h-9 w-9 place-items-center rounded-full text-canvas transform-gpu"
          style={{
            ...icon.pos,
            backgroundColor: color,
            // Colored shadow halo using the same hex with an alpha suffix.
            boxShadow: `0 6px 22px ${color}55`,
          }}
        >
          {icon.el}
        </span>
      ))}

      {/*
        The pill itself.
        - Tilts ~4° on group-hover (transform).
        - Text color transitions from white → --pill-color on group-hover.
        - `transition-colors` makes the swap smooth (300ms).
      */}
      <span className="inline-block rounded-pill bg-chip px-4 py-1 font-display italic font-normal text-white transition-[transform,color] duration-300 ease-out transform-gpu group-hover:rotate-[4deg] group-hover:text-[var(--pill-color)]">
        {children}
      </span>
    </span>
  );
}

/* Up-arrow SVG used twice in the CTA's endless-arrow column. */
function ArrowUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 shrink-0"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function PlayThumb() {
  return (
    <span className="relative inline-flex h-[1em] w-[1.7em] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-900 align-middle text-[0.3em] font-medium text-white">
      <span aria-hidden>▶ Play</span>
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-pill bg-white/5 px-5 py-2 text-body-s">
      {children}
    </span>
  );
}
