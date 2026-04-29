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
/* Branding cluster (used on "brand") */
const I_Sparkle = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);
const I_Palette = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <circle cx="8" cy="10" r="1" />
    <circle cx="14" cy="8" r="1" />
    <circle cx="16" cy="13" r="1" />
  </svg>
);
const I_Pen = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 19l7-7-3-3-7 7v3zM18 6l3 3" />
  </svg>
);

/* Website cluster (used on "website") */
const I_Browser = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </svg>
);
const I_Chart = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
  </svg>
);
const I_Globe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
  </svg>
);

/* UX/UI cluster (used on "ux/ui design") */
const I_Cursor = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 3l6 16 2-7 7-2L5 3z" />
  </svg>
);
const I_Layers = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />
  </svg>
);
const I_Shapes = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="7" cy="8" r="3" />
    <rect x="13" y="4" width="8" height="8" rx="1" />
    <path d="M7 14l5 8H2l5-8z" />
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
          Digital Product Design And Development Company
        </p>

        <h1 className="mx-auto max-w-[1300px] text-center font-medium leading-[1.08] tracking-tight text-[clamp(2.6rem,5.2vw,4.5rem)]">
          Your design &amp; dev partner that unites{" "}
          <Pill
            color="#d0f601"
            icons={[
              { el: I_Sparkle, pos: { top: "-1.6rem", left: "-1.4rem" }, rotate: -14, delay: 0 },
              { el: I_Palette, pos: { top: "-2rem", right: "-0.8rem" },  rotate: 10,  delay: 0.06 },
              { el: I_Pen,     pos: { bottom: "-1.6rem", right: "-1.6rem" }, rotate: -6, delay: 0.12 },
            ]}
          >
            brand
          </Pill>
          <span>,&nbsp;</span>
          <Pill
            color="#ff2bd6"
            icons={[
              { el: I_Browser, pos: { top: "-1.8rem", left: "-1.6rem" }, rotate: -10, delay: 0 },
              { el: I_Chart,   pos: { top: "-2rem", right: "-0.6rem" },  rotate: 12,  delay: 0.06 },
              { el: I_Globe,   pos: { bottom: "-1.6rem", left: "1rem" }, rotate: -4,  delay: 0.12 },
            ]}
          >
            website
          </Pill>
          <span>,&nbsp;</span>
          <Pill
            color="#00d4ff"
            icons={[
              { el: I_Cursor, pos: { top: "-1.8rem", left: "-1rem" },    rotate: -16, delay: 0 },
              { el: I_Layers, pos: { top: "-2rem", right: "-1rem" },     rotate: 8,   delay: 0.06 },
              { el: I_Shapes, pos: { bottom: "-1.8rem", right: "1rem" }, rotate: -2,  delay: 0.12 },
            ]}
          >
            ux/ui design
          </Pill>{" "}
          into{" "}
          <PlayThumb />{" "}
          a holistic{" "}
          <em className="font-display italic font-normal text-white/95">product</em>
        </h1>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 md:px-12">
          <div className="flex gap-4">
            <span className="font-mono text-body-s text-muted">{"{/}"}</span>
            <p className="text-body-m">
              Works closely with reputable brands, businesses and fortune 500 companies
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-body-s text-muted">{"{/}"}</span>
            <p className="text-body-m">
              Since 2016, we&apos;ve helped to achieve business goals and deliver results that inspire
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between md:px-12">
          <div className="flex gap-3">
            <Tag>SaaS</Tag>
            <Tag>AI</Tag>
            <Tag>Web 3.0</Tag>
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
              Book a Call
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
