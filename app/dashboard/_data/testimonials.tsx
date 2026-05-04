/*
  Mock testimonial inbox.

  Source platforms map to colored chips and a tiny inline glyph so
  scanning the list feels like reading a real multi-channel inbox
  (Instagram comment, TikTok comment, Google review, X mention,
  Trustpilot, an Instagram DM, an email).

  All copy is intentionally DTC-real: typos, lowercase, emojis. The
  goal is for a viewer to instantly recognize "yes this is the kind
  of comment I'd actually receive on my brand's content."
*/

import type { ReactNode } from "react";

export type Platform =
  | "instagram"
  | "tiktok"
  | "google"
  | "x"
  | "trustpilot"
  | "dm"
  | "email";

export type TestimonialKind = "text" | "photo" | "audio";

export type Testimonial = {
  id: string;
  platform: Platform;
  author: string;
  handle: string;
  /** Caption for photo testimonials, transcript for audio, body for text. */
  text: string;
  rating?: number;     // 1..5 for review-style sources
  postedAt: string;    // ISO
  postContext?: string; // e.g. "Reel: 'Skin reset routine'"
  unread?: boolean;

  /**
   * Media kind. Defaults to "text" when omitted. Photo testimonials
   * include an attached image; audio testimonials are voice notes /
   * voice DMs and ship with a generated transcript stored in `text`.
   */
  kind?: TestimonialKind;
  imageUrl?: string;
  imageAlt?: string;
  /** Duration in seconds for audio testimonials. */
  audioDuration?: number;
  /**
   * Pseudo-random waveform amplitudes (0..1) for audio. Pre-baked so
   * the bars stay stable across renders without needing a real file.
   */
  waveform?: number[];

  /**
   * Optional pre-baked AI creative for this testimonial. When set, the
   * AI-generate flow uses this image as the final output instead of
   * the procedural canvas — what a real model run would produce for
   * that brand. Authored at portrait 9:16; cover-cropped into the
   * chosen aspect frame.
   */
  aiCreativeUrl?: string;
  /** Short brand label shown in the loading toast & metadata. */
  aiCreativeBrand?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    platform: "instagram",
    author: "lena",
    handle: "@lena.codes",
    text: "this serum literally changed my skin in 2 weeks 😭 i'm not even being dramatic",
    postedAt: "2026-04-29T13:42:00Z",
    postContext: "Reel — Skin reset routine",
    unread: true,
  },
  {
    id: "t2",
    platform: "tiktok",
    author: "marco",
    handle: "@marcobuilds",
    text: "ok this is unreasonably good. the texture alone is wild, going back for a second",
    postedAt: "2026-04-29T09:11:00Z",
    postContext: "Comment on 14.2k-view post",
    unread: true,
    aiCreativeUrl: "/creatives/tirameup-masterclass.png",
    aiCreativeBrand: "TiraMeUp",
  },
  {
    id: "t3",
    platform: "google",
    author: "Aisha N.",
    handle: "Verified review",
    text: "Best $40 I've spent this year. Fast shipping, packaging is gorgeous, and it actually does what they say.",
    rating: 5,
    postedAt: "2026-04-28T17:05:00Z",
    kind: "photo",
    imageUrl: "/testimonials/t3-unboxing.jpg",
    imageAlt: "Customer flatlay of the serum bottle on a linen surface with dried botanicals.",
  },
  {
    id: "t4",
    platform: "x",
    author: "jordan",
    handle: "@jordnwrites",
    text: "obsessed obsessed obsessed. why did no one tell me about this brand sooner",
    postedAt: "2026-04-28T11:30:00Z",
    postContext: "Quote of @brand launch tweet",
    aiCreativeUrl: "/creatives/touche-serum.jpg",
    aiCreativeBrand: "Touché",
  },
  {
    id: "t5",
    platform: "dm",
    author: "priya",
    handle: "@priyaeats",
    text: "ok so i had to send a voice note for this — my mom literally stole mine, like fully took it from my shelf, and i ordered another one yesterday because she's not giving it back lol. you guys really cooked with this one.",
    postedAt: "2026-04-27T20:18:00Z",
    unread: true,
    kind: "audio",
    audioDuration: 23,
    waveform: [0.18, 0.34, 0.52, 0.41, 0.62, 0.78, 0.55, 0.32, 0.48, 0.71, 0.84, 0.66, 0.42, 0.28, 0.55, 0.69, 0.81, 0.72, 0.58, 0.4, 0.51, 0.63, 0.74, 0.49, 0.31, 0.42, 0.6, 0.71, 0.55, 0.36, 0.22],
  },
  {
    id: "t6",
    platform: "trustpilot",
    author: "Daniel R.",
    handle: "Verified buyer",
    text: "Skeptical at first because every brand says the same thing. This one held up. 4 weeks in, repurchasing.",
    rating: 5,
    postedAt: "2026-04-27T08:00:00Z",
    kind: "photo",
    imageUrl: "/testimonials/t6-shelf.jpg",
    imageAlt: "Customer photo of the bottle on a clean bathroom shelf in soft natural light.",
  },
  {
    id: "t7",
    platform: "instagram",
    author: "tasha",
    handle: "@tasha.soft",
    text: "the packaging is so clean i don't even want to open it 🥹",
    postedAt: "2026-04-26T22:14:00Z",
    postContext: "Comment on launch carousel",
  },
  {
    id: "t8",
    platform: "email",
    author: "Chris",
    handle: "chris@personal.com",
    text: "Just wanted to email and say thank you. I've tried 6 different products and yours is the only one my partner actually noticed a change with.",
    postedAt: "2026-04-26T13:55:00Z",
    aiCreativeUrl: "/creatives/medicube-jelly.jpg",
    aiCreativeBrand: "Medicube",
  },
  {
    id: "t9",
    platform: "dm",
    author: "kai",
    handle: "@kaiwearsthings",
    text: "alright fine you guys actually converted me. i was like seriously not gonna fall for another tiktok product but i am ordering tonight i swear, send me a discount code i will literally use it.",
    postedAt: "2026-04-25T18:40:00Z",
    postContext: "Voice note in DMs",
    kind: "audio",
    audioDuration: 14,
    waveform: [0.22, 0.41, 0.58, 0.72, 0.5, 0.34, 0.46, 0.65, 0.79, 0.6, 0.42, 0.28, 0.51, 0.68, 0.74, 0.59, 0.38, 0.47, 0.62, 0.5, 0.31, 0.45, 0.6, 0.72, 0.55],
  },
  {
    id: "t10",
    platform: "google",
    author: "Helena B.",
    handle: "Verified review",
    text: "I rarely leave reviews. This one earned it. Soft texture, no smell, visible difference in 10 days.",
    rating: 5,
    postedAt: "2026-04-25T10:22:00Z",
  },
  {
    id: "t11",
    platform: "instagram",
    author: "noah",
    handle: "@noah.frames",
    text: "my skincare routine is literally just this product now 😭",
    postedAt: "2026-04-24T19:02:00Z",
    postContext: "Story reply with photo",
    kind: "photo",
    imageUrl: "/testimonials/t11-mirror.jpg",
    imageAlt: "Customer holding the bottle in a softly lit bathroom.",
  },
  {
    id: "t12",
    platform: "x",
    author: "ren",
    handle: "@renwrites",
    text: "best $40 i've spent this year. running back for a 2nd",
    postedAt: "2026-04-24T08:48:00Z",
  },
];

/* ---------- Platform metadata ---------- */

export type PlatformMeta = {
  label: string;
  color: string;
  bg: string;
  icon: ReactNode;
};

export const PLATFORM_META: Record<Platform, PlatformMeta> = {
  instagram: {
    label: "Instagram",
    color: "#FF6B9D",
    bg: "rgba(255,107,157,0.10)",
    icon: <IconIG />,
  },
  tiktok: {
    label: "TikTok",
    color: "#69E5E2",
    bg: "rgba(105,229,226,0.10)",
    icon: <IconTikTok />,
  },
  google: {
    label: "Google",
    color: "#FBBC05",
    bg: "rgba(251,188,5,0.10)",
    icon: <IconGoogle />,
  },
  x: {
    label: "X / Twitter",
    color: "#FFFFFF",
    bg: "rgba(255,255,255,0.06)",
    icon: <IconX />,
  },
  trustpilot: {
    label: "Trustpilot",
    color: "#00B67A",
    bg: "rgba(0,182,122,0.10)",
    icon: <IconStar />,
  },
  dm: {
    label: "Instagram DM",
    color: "#C5F82A",
    bg: "rgba(197,248,42,0.10)",
    icon: <IconMail />,
  },
  email: {
    label: "Email",
    color: "#8B7FE8",
    bg: "rgba(139,127,232,0.12)",
    icon: <IconMail />,
  },
};

/* ---------- Helpers ---------- */

export function relativeTime(iso: string, now = new Date()) {
  const ts = new Date(iso).getTime();
  const diff = (now.getTime() - ts) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86_400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86_400 * 2) return "yesterday";
  if (diff < 86_400 * 7) return `${Math.floor(diff / 86_400)}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/* ---------- Inline platform icons ---------- */

function IconIG() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M19.6 7.6a5.4 5.4 0 0 1-3.5-1.3v8.5a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 1.9 2.7V2h2.7a5.4 5.4 0 0 0 3.5 5z" />
    </svg>
  );
}
function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
      <path fill="#FBBC05" d="M12 2 14.4 9.4 22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.51 8.59L23 22h-6.84l-5.36-6.93L4.6 22H1.34l8.04-9.18L1 2h6.99l4.84 6.4zm-2.39 18h1.86L8.23 4H6.27z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
