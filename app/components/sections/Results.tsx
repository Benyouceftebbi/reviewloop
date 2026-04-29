"use client";

/*
  RESULTS SECTION

  Layout (left-to-right at desktop):
   - Top row: tiny "RESULTS" eyebrow on the left, italic display heading on
     the right ("Arounda is your perfect choice in terms of"), followed by
     a 3-row bullet list with `{/}` markers and divider lines.
   - Bottom row: 3 stat columns. Each column has:
      * A scatter of decorative "badge" pills floating above the number.
      * A huge faded percentage/multiplier number.
      * A bold title.
      * A muted one-line description.

  Hover behavior on each stat column (the cool part):
   - The badges are scattered with different x/y offsets + rotations.
   - On hover of the column, GSAP-style CSS transitions:
      * Pull all badges toward (0,0) — gathering them to the center.
      * Reset rotation to a small uniform tilt.
      * Swap their background to a neutral grey (`bg-white/12`).

  All powered by `group` + `group-hover:` Tailwind utilities — no JS needed.
*/

import type { ReactNode } from "react";

export default function Results() {
  return (
    <section className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER ROW: eyebrow on left, heading + list on right */}
        <div className="mb-32 grid grid-cols-1 gap-10 md:grid-cols-[140px_1fr]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Results
          </p>

          <div>
            <h2 className="mb-12 text-right font-medium leading-[1.1] tracking-tight text-[clamp(2.4rem,4.6vw,4rem)]">
              <em className="font-display italic font-normal">Arounda</em>{" "}
              is your perfect{" "}
              <br className="hidden md:block" />
              choice in terms of
            </h2>

            <ul className="space-y-0">
              <BulletRow>Hiring system with immediate start</BulletRow>
              <BulletRow>Guaranteed on-time deliverables</BulletRow>
              <BulletRow last>Flexible collaboration &amp; fixed monthly rate</BulletRow>
            </ul>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-10">
          <StatColumn
            number="+170%"
            title="Engagement Rate"
            desc="Intuitive flows that turn clicks into leads"
            badges={[
              { icon: <W />, label: "Brand.com",       color: "bg-white text-canvas",     pos: { x: -90, y: -30, r: -8 } },
              { icon: <Star />, label: "Galaxy",        color: "bg-canvas text-white",     pos: { x:  10, y: -55, r: -3 } },
              { icon: <Spark />, label: "Flair",        color: "bg-violet-500 text-white", pos: { x:  85, y: -10, r:  6 } },
            ]}
          />
          <StatColumn
            number="4.6×"
            title="Revenue Growth After Redesign"
            desc="Product improvements that scale business impact"
            badges={[
              { icon: <X />,    label: "$1.5 M Protocol X", color: "bg-canvas text-white",          pos: { x: -80, y: -30, r: -6 } },
              { icon: <M />,    label: "$2.3M App CX",      color: "bg-canvas text-white",          pos: { x:  60, y: -55, r:  4 } },
              { icon: <Eye />,  label: "$2.4M Finance",     color: "bg-white text-canvas",          pos: { x:  90, y:  10, r: -2 } },
            ]}
          />
          <StatColumn
            number="-37%"
            title="Churn Across SaaS Clients"
            desc="Better onboarding, better UX, fewer cancellations"
            badges={[
              { icon: <Bars />,    label: "Audio",         color: "bg-canvas text-lime",   pos: { x: -70, y: -45, r: -5 } },
              { icon: <Avatars />, label: "12K SAVED",     color: "bg-white text-canvas",  pos: { x:  60, y: -25, r:  3 } },
              { icon: <Cursor />,  label: " ",             color: "bg-canvas text-white",  pos: { x:  95, y:  20, r:  8 } },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Sub-pieces ---------- */

function BulletRow({ children, last }: { children: ReactNode; last?: boolean }) {
  return (
    <li
      className={`flex items-center gap-6 py-5 ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <span className="font-mono text-xs text-muted">{"{/}"}</span>
      <span className="text-body-m font-semibold">{children}</span>
    </li>
  );
}

type Badge = {
  icon: ReactNode;
  label: string;
  color: string;
  pos: { x: number; y: number; r: number };
};

/*
  StatColumn — gentle gravity hover.

  Each badge's RESTING position is encoded as CSS variables (--x, --y, --r)
  on the element itself. The transform multiplies those by a `--scale`
  variable that defaults to 1 (full offset = scattered).

  On group-hover we override `--scale` to 0.35 — every badge slides 65%
  of the way back toward (0,0) but stops short. They stay tilted, they
  pull *toward* the middle without piling on top of each other.

  Why CSS vars + calc() instead of toggling translate utilities:
   - We need the hover position to be a FRACTION of the resting position,
     and that fraction is different for every badge.
   - Without vars we'd have to hard-code 6 different "hover position"
     values per column. With a single shared --scale, we move them all
     in unison with one declaration.
*/
function StatColumn({
  number,
  title,
  desc,
  badges,
}: {
  number: string;
  title: string;
  desc: string;
  badges: Badge[];
}) {
  return (
    // group-hover:[--scale:0.35] is Tailwind's arbitrary-property syntax
    // — at hover time it sets the CSS var, which the badges below pick up.
    <div className="group relative group-hover:[--scale:0.35]">
      {/* Badge cluster — sits above the big number */}
      <div className="relative mb-2 h-32">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
          {badges.map((b, i) => (
            <span
              key={i}
              className={`absolute flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium shadow-lg transition-all duration-500 ease-out ${b.color} group-hover:!bg-white/12 group-hover:!text-white/85`}
              style={{
                // Resting offsets stored as CSS vars on the badge itself.
                // --scale is intentionally NOT set here — we use the
                // calc fallback `var(--scale, 1)` so the badge defaults
                // to fully scattered. The parent group sets --scale to
                // 0.35 on hover, which CSS inheritance flows down here.
                ["--x" as string]: `${b.pos.x}px`,
                ["--y" as string]: `${b.pos.y}px`,
                ["--r" as string]: `${b.pos.r}deg`,
                transform:
                  "translate(calc(var(--x) * var(--scale, 1)), calc(var(--y) * var(--scale, 1))) rotate(var(--r))",
                zIndex: i,
              }}
            >
              {b.icon}
              {b.label && <span className="whitespace-nowrap">{b.label}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Huge faded number */}
      <div className="mb-4 text-[clamp(4rem,9vw,8rem)] font-medium leading-none tracking-tight text-white/15">
        {number}
      </div>

      <h3 className="mb-2 text-body-l font-semibold">{title}</h3>
      <p className="text-body-m text-muted">{desc}</p>
    </div>
  );
}

/* ---------- Tiny inline icons for the badges ---------- */
const W = () => (
  <span className="grid h-5 w-5 place-items-center rounded-full bg-canvas text-[10px] font-bold text-white">W</span>
);
const M = () => (
  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[10px] font-bold text-canvas">M</span>
);
const X = () => (
  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-bold text-canvas">×</span>
);
const Star = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2l2.5 7H22l-6 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2 9h7.5z" /></svg>
);
const Spark = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" /></svg>
);
const Eye = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/></svg>
);
const Bars = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><rect x="3" y="9" width="2" height="6" rx="1"/><rect x="7" y="6" width="2" height="12" rx="1"/><rect x="11" y="3" width="2" height="18" rx="1"/><rect x="15" y="6" width="2" height="12" rx="1"/><rect x="19" y="9" width="2" height="6" rx="1"/></svg>
);
const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M5 3l6 16 2-7 7-2L5 3z" /></svg>
);
const Avatars = () => (
  <span className="flex -space-x-1.5">
    <span className="h-5 w-5 rounded-full bg-orange-400 ring-2 ring-white" />
    <span className="h-5 w-5 rounded-full bg-pink-400 ring-2 ring-white" />
    <span className="h-5 w-5 rounded-full bg-cyan-400 ring-2 ring-white" />
  </span>
);
