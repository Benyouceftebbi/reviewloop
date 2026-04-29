"use client";

/*
  LOGO STRIP — infinite right-to-left marquee.

  How the marquee illusion works:

   1. We render the SAME list of logos TWICE inside a flex row.
   2. The row is animated with `translateX(0 → -50%)` on a linear loop.
   3. Because the second copy starts at 50% of the total row width, the
      moment the first copy finishes scrolling off the left edge, the
      second copy is sitting in EXACTLY the same screen position the
      first copy started in. The loop is seamless.

  Edge-fade mask:
   - `[mask-image:linear-gradient(...)]` makes the leftmost and rightmost
     ~80px of the section fade to transparent. Without it, logos pop in
     and out abruptly at the edges.

  Pause on hover:
   - `hover:[animation-play-state:paused]` lets the user read a logo if
     they hover over the strip. Tiny touch, big polish.
*/

const LOGOS = [
  "PLAYERS HEALTH",
  "Blockworks",
  "VOXE",
  "AUTOMATTIC",
  "WordPress.com",
  "newnew",
  "interprefy",
];

export default function LogoStrip() {
  return (
    <section
      aria-label="Trusted by"
      // No bg-ink here — the parent HeroBlock provides the gradient that
      // continues from the hero into this strip. The horizontal mask still
      // softens left/right edges of the marquee.
      className="relative overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      {/*
        The track. `w-max` makes it as wide as its content (so the logos
        keep their natural spacing). `whitespace-nowrap` prevents any
        accidental wrapping mid-scroll.
      */}
      <div className="flex w-max animate-marquee gap-20 whitespace-nowrap pr-20 hover:[animation-play-state:paused]">
        {/* Render the logos twice for the seamless loop. */}
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <Logo key={i} text={logo} />
        ))}
      </div>
    </section>
  );
}

/*
  Each logo is a simple styled text — no real brand SVG (that's a learning
  clone, not a redistributable asset). The dim white-on-dark look matches
  the original strip's "trusted by, but understated" feel.
*/
function Logo({ text }: { text: string }) {
  return (
    <span className="select-none text-2xl font-bold tracking-wider text-white/30 transition-colors hover:text-white/70">
      {text}
    </span>
  );
}
