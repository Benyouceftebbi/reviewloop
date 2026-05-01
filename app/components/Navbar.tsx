"use client";

/*
  NAVBAR — fixed-top, frosted-glass, responsive.

  ReviewLoop SaaS landing nav. Stripped of the original agency-style
  hover dropdowns (Services / Industries) that didn't fit a
  product-conversion page.

  DESKTOP (md+):
   - Three anchor links to the page's main sections.
   - "Sign in" pill on the right with the lime-fill hover sweep.

  MOBILE (< md):
   - Logo + Sign in pill + hamburger.
   - Tap hamburger → white panel drops in with the same three links
     and the Sign in CTA at the bottom. No accordions.
*/

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

const NAV: NavLink[] = [
  { href: "#how-it-works",  label: "How it works" },
  { href: "#demo",          label: "Demo" },
  { href: "#use-cases",     label: "Use cases" },
  { href: "#early-results", label: "Results" },
  { href: "#pricing",       label: "Pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while the mobile panel is open. Without this,
  // the page behind the panel can still be scrolled with touch.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close the mobile panel after any link is tapped (so navigation
  // to an anchor doesn't leave the panel open over the destination).
  const closeMobile = () => setMobileOpen(false);

  // Intercept in-page anchor clicks and route them through Lenis so
  // the scroll feel matches the rest of the page (which uses Lenis
  // for smooth wheel/touch scrolling). Falls back to native anchor
  // behavior if Lenis hasn't initialized for any reason.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    const target =
      href === "#"
        ? document.body
        : document.querySelector<HTMLElement>(href);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | number, o?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (!lenis) return; // let the browser handle it natively

    e.preventDefault();
    // Offset by the fixed nav height so the section heading isn't
    // tucked underneath the frosted-glass bar after scrolling.
    lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    closeMobile();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Frosted-glass background layer. */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-4 md:px-10 md:py-5">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="text-2xl font-medium tracking-tight"
        >
          reviewloop
        </a>

        {/* DESKTOP NAV */}
        <ul className="hidden items-center gap-7 text-body-m md:flex lg:gap-10">
          {NAV.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="transition hover:text-muted"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT CLUSTER — Sign in pill always visible, hamburger only on mobile. */}
        <div className="flex items-center gap-2 md:gap-3">
          <SignInPill />

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="relative grid h-11 w-11 place-items-center rounded-full text-white md:hidden"
          >
            <Hamburger isOpen={mobileOpen} />
          </button>
        </div>
      </div>

      {/* MOBILE PANEL — drops down below the navbar. */}
      <MobilePanel
        isOpen={mobileOpen}
        onLinkTap={closeMobile}
        onNavClick={handleNavClick}
      />
    </header>
  );
}

/* ---------- Primary CTA pill (desktop + mobile) ---------- */
/*
  The single primary CTA used everywhere on the site:
  "Get 10 free creatives" → /login.

  Same lime-fill hover trick as before — an absolute lime <span>
  sits inside the pill at scaleX(0) + origin-left, then scales to 1
  on group-hover, sweeping across left → right.

  Compact mode trims the long label down to "Get 10 free" so the
  navbar stays single-row on small viewports without forcing a
  separate component. The full label always renders on md+.
*/
function SignInPill() {
  return (
    <a
      href="/login"
      className="group relative flex items-center gap-2 overflow-hidden rounded-pill bg-white px-4 py-2 text-canvas md:gap-3 md:px-6 md:py-3"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-lime transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
      />
      <span className="relative z-10 text-sm font-medium md:text-base">
        <span className="md:hidden">Get 10 free</span>
        <span className="hidden md:inline">Get 10 free creatives</span>
      </span>
      <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-canvas text-white md:h-8 md:w-8">
        <ArrowUpRight />
      </span>
    </a>
  );
}

/* ---------- Mobile panel ---------- */

function MobilePanel({
  isOpen,
  onLinkTap,
  onNavClick,
}: {
  isOpen: boolean;
  onLinkTap: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-full z-40 px-3 pt-2 transition-all duration-300 ease-out md:hidden ${
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "-translate-y-2 opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden rounded-3xl bg-white text-canvas shadow-2xl">
        <ul className="divide-y divide-canvas/8">
          {NAV.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  onNavClick(e, link.href);
                  onLinkTap();
                }}
                className="block px-6 py-5 text-xl font-medium transition hover:bg-canvas/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Primary CTA at the bottom of the panel — same label as
            every other primary action on the site. */}
        <div className="border-t border-canvas/8 p-4">
          <a
            href="/login"
            onClick={onLinkTap}
            className="flex items-center justify-between rounded-pill bg-canvas px-5 py-3 text-white transition-colors hover:bg-lime hover:text-canvas"
          >
            <span className="font-medium">Get 10 free creatives</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-canvas">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/*
  Hamburger morph — three bars rotate into an X.
   - Bar 1 rotates 45° + drops to center.
   - Bar 2 fades out.
   - Bar 3 rotates -45° + rises to center.
*/
function Hamburger({ isOpen }: { isOpen: boolean }) {
  const base =
    "absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300";
  return (
    <span className="relative block h-5 w-5">
      <span className={`${base} ${isOpen ? "top-1/2 rotate-45" : "top-1"}`} />
      <span
        className={`${base} top-1/2 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`${base} ${isOpen ? "top-1/2 -rotate-45" : "bottom-1"}`}
      />
    </span>
  );
}
