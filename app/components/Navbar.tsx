"use client";

/*
  NAVBAR — fixed-top, frosted-glass, responsive.

  DESKTOP (md+):
   - Sticky with backdrop-blur.
   - Hover dropdowns for Services + Industries.
   - Contact Us pill with lime hover.

  MOBILE (< md):
   - Logo + hamburger only.
   - Tap hamburger → full-screen drawer with all links.
   - Services + Industries become accordion (tap to expand).
   - Contact Us moved inside the drawer.
   - Body scroll is locked while the drawer is open.
*/

import { useEffect, useRef, useState } from "react";

type DropdownKey = "services" | "industries" | null;

export default function Navbar() {
  const [open, setOpen] = useState<DropdownKey>(null);   // desktop hover dropdown
  const [mobileOpen, setMobileOpen] = useState(false);    // mobile drawer
  const closeTimer = useRef<number | null>(null);

  const openMenu = (key: DropdownKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  // Lock body scroll while the mobile drawer is open. Without this, the page
  // behind the drawer can still be scrolled with touch — feels broken.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Frosted-glass background layer. */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" aria-hidden />

      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-4 md:px-10 md:py-5">
        <a href="#" className="text-2xl font-medium tracking-tight">reviewloop</a>

        {/* DESKTOP NAV — visible md and up */}
        <ul className="hidden items-center gap-10 text-body-m md:flex">
          <li><a href="#" className="transition hover:text-muted">Works</a></li>

          <li
            className="relative"
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 transition ${
                open === "services" ? "text-lime" : "hover:text-muted"
              }`}
            >
              Services
              <Chevron isOpen={open === "services"} />
            </button>
          </li>

          <li
            className="relative"
            onMouseEnter={() => openMenu("industries")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 transition ${
                open === "industries" ? "text-lime" : "hover:text-muted"
              }`}
            >
              Industries
              <Chevron isOpen={open === "industries"} />
            </button>
          </li>

          <li><a href="#" className="transition hover:text-muted">Pricing</a></li>
          <li><a href="#" className="transition hover:text-muted">About</a></li>
          <li><a href="#" className="transition hover:text-muted">Blog</a></li>
        </ul>

        {/*
          RIGHT CLUSTER. Contact Us stays visible at all sizes (matches the
          screenshots). Hamburger appears only below md and lives next to it.
        */}
        <div className="flex items-center gap-2 md:gap-3">
          {/*
            CONTACT US — "fill" hover animation.

            Trick: a lime <span> sits absolutely inside the pill at scaleX(0)
            with `origin-left`, so it has zero visible width by default but
            still has its full natural size. On group-hover we scaleX to 1
            and it sweeps across left → right, "filling" the button.

            Notes:
             - `overflow-hidden` on the <a> clips the lime layer to the
               pill shape (rounded-full corners stay clean).
             - `relative z-10` on the text/arrow keeps them above the fill.
             - The dark circle stays dark — looks intentional against lime.
          */}
          <a
            href="#"
            className="group relative flex items-center gap-2 overflow-hidden rounded-pill bg-white px-4 py-2 text-canvas md:gap-3 md:px-6 md:py-3"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-lime transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
            />
            <span className="relative z-10 text-sm font-medium md:text-base">Contact Us</span>
            <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-canvas text-white md:h-8 md:w-8">
              <ArrowUpRight />
            </span>
          </a>

          {/* Hamburger — morphs to an X when open. */}
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

      {/* DESKTOP DROPDOWN PANEL */}
      <div
        className={`absolute inset-x-0 top-full hidden px-6 transition-all duration-300 md:block ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => open && openMenu(open)}
        onMouseLeave={scheduleClose}
      >
        {open === "services" && <ServicesPanel />}
        {open === "industries" && <IndustriesPanel />}
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* =================== MOBILE PANEL =================== */
/*
  Drops down from below the navbar as a white rounded panel — matches
  the look of the desktop dropdown but as a single tap-driven list.

  Each item:
   - "Plain" links (Works, Pricing, About, Blog) — just a row.
   - "Expandable" items (Services, Solutions, Industries) — show a ↘ icon
     and reveal sub-items inline when tapped.

  Animation: panel translates from -8px + opacity 0 to 0 + opacity 1
  with a 300ms transition. Each row is separated by a thin divider.
*/

function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Which expandable item is currently expanded (only one at a time).
  type ExpandKey = "services" | "solutions" | "industries" | null;
  const [expanded, setExpanded] = useState<ExpandKey>(null);
  const toggle = (key: ExpandKey) =>
    setExpanded((cur) => (cur === key ? null : key));

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-full z-40 px-3 pt-2 transition-all duration-300 ease-out md:hidden ${
        isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden rounded-3xl bg-white text-canvas shadow-2xl">
        <ul className="divide-y divide-canvas/8">
          <PlainRow>Works</PlainRow>

          <ExpandRow
            label="Services"
            isOpen={expanded === "services"}
            onToggle={() => toggle("services")}
          >
            <SubGroup
              title="Branding"
              items={["Pitch Deck", "Brand Identity", "Logo Design", "Graphic Design", "Rebranding"]}
            />
            <SubGroup
              title="Design"
              items={["UI/UX Design", "Website Design", "Mobile App Design", "Website Redesign", "Product UX/UI Audit"]}
            />
            <SubGroup
              title="Development"
              items={["Web Development", "MVP Development", "Landing page", "Corporate Websites", "WOW Websites"]}
            />
          </ExpandRow>

          <ExpandRow
            label="Solutions"
            isOpen={expanded === "solutions"}
            onToggle={() => toggle("solutions")}
          >
            <SubGroup title="" items={["MVP Design", "Product Redesign", "Team Extension"]} />
          </ExpandRow>

          <ExpandRow
            label="Industries"
            isOpen={expanded === "industries"}
            onToggle={() => toggle("industries")}
          >
            <SubGroup title="" items={["Web 3.0", "AI", "SaaS", "Fintech", "Healthtech", "E-commerce"]} />
          </ExpandRow>

          <PlainRow>Pricing</PlainRow>
          <PlainRow>About</PlainRow>
          <PlainRow>Blog</PlainRow>
        </ul>
      </div>
    </div>
  );
}

/* A simple non-expandable row in the mobile panel. */
function PlainRow({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="block px-6 py-5 text-xl font-medium transition hover:bg-canvas/5">
        {children}
      </a>
    </li>
  );
}

/* An expandable row with a ↘ arrow that shows children when open. */
function ExpandRow({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-xl font-medium transition hover:bg-canvas/5"
      >
        <span>{label}</span>
        <ArrowDownRight isOpen={isOpen} />
      </button>

      {/*
        The grid-rows 0fr → 1fr trick lets us transition height on `auto`-
        sized content. The child needs `min-h-0` so it can collapse.
      */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-5 bg-canvas/3 px-6 pb-5 pt-1 text-base">{children}</div>
        </div>
      </div>
    </li>
  );
}

function SubGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      {title && (
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-canvas/50">
          {title}
        </h4>
      )}
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="block rounded-lg py-1.5 transition hover:text-lime">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* The ↘ down-right arrow that flips on open. */
function ArrowDownRight({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7l10 10M9 17h8V9" />
    </svg>
  );
}

/* =================== SHARED ICONS =================== */

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/*
  Hamburger icon — three bars that morph into an X.
   - Bar 1 rotates 45° and translates down to form one diagonal of the X.
   - Bar 2 fades out (the middle bar disappears).
   - Bar 3 rotates -45° and translates up.
  All three transition together for a clean morph.
*/
function Hamburger({ isOpen }: { isOpen: boolean }) {
  const base = "absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300";
  return (
    <span className="relative block h-5 w-5">
      <span className={`${base} ${isOpen ? "top-1/2 rotate-45" : "top-1"}`} />
      <span className={`${base} top-1/2 ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <span className={`${base} ${isOpen ? "top-1/2 -rotate-45" : "bottom-1"}`} />
    </span>
  );
}

/* =================== DESKTOP DROPDOWN PANELS =================== */

function ServicesPanel() {
  return (
    <div className="mx-auto max-w-[1500px] overflow-hidden rounded-3xl bg-white text-canvas shadow-2xl">
      <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-8 px-10 py-8">
        <div className="pt-1">
          <span className="rounded-pill bg-cyan-300/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-900">
            Services
          </span>
        </div>

        <Column
          title="Branding"
          items={[
            { name: "Pitch Deck", desc: "Get visuals that raise capital", color: "from-emerald-400 to-teal-500" },
            { name: "Brand Identity", desc: "Build trust with design", color: "from-emerald-300 to-emerald-600" },
            { name: "Logo Design", desc: "Become unforgettable", color: "from-emerald-400 to-cyan-500" },
            { name: "Graphic Design", desc: "Illustrations, Icons, Social media", color: "from-teal-400 to-emerald-600" },
            { name: "Rebranding", desc: "Rebrand to grow and convert", color: "from-emerald-500 to-emerald-700" },
          ]}
        />
        <Column
          title="Design"
          items={[
            { name: "UI/UX Design", desc: "Web & mobile app design", color: "from-violet-400 to-purple-600" },
            { name: "Website Design", desc: "Custom websites & landings", color: "from-violet-400 to-fuchsia-500" },
            { name: "Mobile App Design", desc: "Apps your users love", color: "from-indigo-400 to-violet-600" },
            { name: "Website Redesign", desc: "Modern look, higher impact", color: "from-purple-400 to-violet-600" },
            { name: "Product UX/UI Audit", desc: "Insights that drive results", color: "from-fuchsia-400 to-violet-700" },
          ]}
        />
        <Column
          title="Development"
          items={[
            { name: "Web Development", desc: "Front-End & Back-End Development", color: "from-sky-400 to-blue-600" },
            { name: "MVP Development", desc: "MVPs that attract funding", color: "from-cyan-400 to-blue-600" },
            { name: "Landing page", desc: "High-converting website", color: "from-sky-300 to-cyan-500" },
            { name: "Corporate Websites", desc: "Built for scale and trust", color: "from-blue-400 to-indigo-600" },
            { name: "WOW Websites", desc: "Professional, scalable, fast website", color: "from-cyan-500 to-blue-700" },
          ]}
        />
      </div>

      <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-8 bg-indigo-50/70 px-10 py-7">
        <div className="pt-1">
          <span className="rounded-pill bg-cyan-300/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-900">
            Solutions
          </span>
        </div>
        <Solution title="MVP DESIGN" sub="For enterprise ecosystems" desc="Create a digital product, attract investors and new clients" />
        <Solution title="PRODUCT REDESIGN" sub="For SMEs & enterprises" desc="Get a fresh look, improved user experience, or enhanced functionality" />
        <Solution title="TEAM EXTENSION" sub="For existing companies" desc="Expand your team with our dedicated and talented design experts" />
      </div>
    </div>
  );
}

function Column({
  title,
  items,
}: {
  title: string;
  items: { name: string; desc: string; color: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.name}>
            <a href="#" className="group flex items-center gap-4">
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${it.color} transition-transform group-hover:scale-110`}
              />
              <span>
                <span className="block font-semibold transition-colors group-hover:text-lime">
                  {it.name}
                </span>
                <span className="block text-xs text-canvas/60">{it.desc}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Solution({ title, sub, desc }: { title: string; sub: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-600" />
      <div>
        <h4 className="text-sm font-bold tracking-wide">{title}</h4>
        <p className="mb-2 text-sm font-medium">{sub}</p>
        <p className="text-xs text-canvas/60">{desc}</p>
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div className="mx-auto max-w-[900px] overflow-hidden rounded-3xl bg-white text-canvas shadow-2xl">
      <div className="grid grid-cols-2 gap-8 px-10 py-8">
        <Column
          title="Industries"
          items={[
            { name: "Web 3.0", desc: "DeFi, NFT, DAO platforms", color: "from-purple-400 to-violet-600" },
            { name: "AI", desc: "AI-first product design", color: "from-cyan-400 to-blue-600" },
            { name: "SaaS", desc: "B2B / B2C SaaS products", color: "from-emerald-400 to-teal-500" },
          ]}
        />
        <Column
          title="More"
          items={[
            { name: "Fintech", desc: "Banking, payments, trading", color: "from-emerald-500 to-cyan-600" },
            { name: "Healthtech", desc: "Patient & clinical tools", color: "from-sky-400 to-indigo-500" },
            { name: "E-commerce", desc: "Shops & marketplaces", color: "from-fuchsia-400 to-pink-500" },
          ]}
        />
      </div>
    </div>
  );
}
