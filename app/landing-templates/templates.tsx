"use client";

/*
  Self-contained social-post template gallery for the landing pages.

  The five templates were supplied as read-only files that imported
  helpers from `@/lib/*`, `./shared`, and `./google-shared` — none of
  which exist in this project and none of which can be imported from
  read-only context. So everything they need (color utils, Stars,
  Clamp, Google icons, sample data) is reimplemented here in one
  writable module that all three landing pages can import.

  Each template renders at a fixed pixel size (just like a real export)
  and the picker scales it to fit via a CSS transform.
*/

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ReviewData {
  stars: number;
  review: string;
  name: string;
  date: string;
  logo: string;
}

export interface BrandData {
  brandName: string;
  colors: { primary: string };
}

export interface TemplateProps {
  data: ReviewData;
  brand: BrandData;
}

/* ------------------------------------------------------------------ */
/*  Color helpers                                                      */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function withAlpha(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => Math.round(c * (1 - amount));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

export function readableOn(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#202124" : "#ffffff";
}

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

export const F = {
  roboto: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

export const G_BLUE = "#4285f4";
export const G_RED = "#ea4335";
export const G_YELLOW = "#fbbc04";
export const G_GREEN = "#34a853";
export const G_STAR = "#fbbc04";

function StarIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  );
}

export function Stars({
  value = 5,
  size = 16,
  color = G_STAR,
  empty = "#e8eaed",
  gap = 2,
}: {
  value?: number;
  size?: number;
  color?: string;
  empty?: string;
  gap?: number;
}) {
  return (
    <div style={{ display: "flex", gap }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} size={size} color={i < value ? color : empty} />
      ))}
    </div>
  );
}

export function Clamp({
  lines,
  style,
  children,
}: {
  lines: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        fill={G_BLUE}
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill={G_GREEN}
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill={G_YELLOW}
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill={G_RED}
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

export function GooglePin({
  size = 14,
  color = "#ffffff",
  hole = "#000000",
}: {
  size?: number;
  color?: string;
  hole?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" fill={hole} />
    </svg>
  );
}

export function ThumbUpIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#5f6368">
      <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
}

const AVATAR_COLORS = ["#1a73e8", "#d93025", "#188038", "#e37400", "#9334e6"];

export function InitialAvatar({ name, size }: { name: string; size: number }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const color =
    AVATAR_COLORS[(initial.charCodeAt(0) || 0) % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.44,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Templates                                                          */
/* ------------------------------------------------------------------ */

/** 600×360 — faithful Google Maps review card, ready for social. */
export function GoogleSnippet({ data, brand }: TemplateProps) {
  return (
    <div
      style={{
        width: 600,
        height: 360,
        background: "#ffffff",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        fontFamily: F.roboto,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <InitialAvatar name={data.name} size={46} />
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 500, color: "#202124" }}>
            {data.name}
          </div>
          <div style={{ fontSize: 13, color: "#5f6368", marginTop: 2 }}>
            Local Guide · {data.date}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #e8eaed",
            borderRadius: 999,
            padding: "6px 13px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.logo || "/placeholder.svg"}
            alt=""
            style={{ width: 22, height: 22, objectFit: "contain" }}
          />
          <span style={{ fontSize: 12.5, fontWeight: 500, color: "#5f6368" }}>
            {brand.brandName}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Stars value={data.stars} size={20} color={G_STAR} empty="#dadce0" gap={2} />
      </div>

      <Clamp
        lines={5}
        style={{ fontSize: 15.5, lineHeight: 1.55, color: "#3c4043", marginTop: 12 }}
      >
        {data.review}
      </Clamp>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ThumbUpIcon size={17} />
        <span style={{ fontSize: 13, color: "#5f6368" }}>Helpful</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: "#5f6368" }}>Posted on</span>
        <GoogleG size={17} />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "#5f6368" }}>
          Google
        </span>
      </div>
    </div>
  );
}

/** 600×440 — Google review with an owner response the agent drafts. */
export function GoogleResponse({ data, brand }: TemplateProps) {
  const firstName = (data.name || "there").trim().split(" ")[0];
  const onPrimary = readableOn(brand.colors.primary);
  return (
    <div
      style={{
        width: 600,
        height: 440,
        background: "#ffffff",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        fontFamily: F.roboto,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <InitialAvatar name={data.name} size={44} />
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 500, color: "#202124" }}>
            {data.name}
          </div>
          <div style={{ fontSize: 13, color: "#5f6368", marginTop: 2 }}>
            Local Guide · {data.date}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <GoogleG size={22} />
      </div>

      <div style={{ marginTop: 14 }}>
        <Stars value={data.stars} size={18} color={G_STAR} empty="#dadce0" gap={2} />
      </div>

      <Clamp
        lines={3}
        style={{ fontSize: 14.5, lineHeight: 1.5, color: "#3c4043", marginTop: 10 }}
      >
        {data.review}
      </Clamp>

      {/* Owner response — drafted automatically by the agent */}
      <div
        style={{
          marginTop: 16,
          background: "#f8f9fa",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: brand.colors.primary,
              color: onPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {(brand.brandName || "B").charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: "#202124" }}>
              Response from the owner
            </div>
            <div style={{ fontSize: 12, color: "#5f6368" }}>{brand.brandName}</div>
          </div>
        </div>
        <Clamp
          lines={2}
          style={{ fontSize: 13.5, lineHeight: 1.5, color: "#3c4043", marginTop: 10 }}
        >
          {`Thank you so much, ${firstName}! It means the world to us. We can't wait to welcome you back to ${brand.brandName}.`}
        </Clamp>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ThumbUpIcon size={16} />
        <span style={{ fontSize: 13, color: "#5f6368" }}>Helpful</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: "#5f6368" }}>Posted on</span>
        <GoogleG size={16} />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "#5f6368" }}>
          Google
        </span>
      </div>
    </div>
  );
}

/** 540×540 — Google Maps rating summary with bars + featured review. */
export function RatingBreakdown({ data, brand }: TemplateProps) {
  const barWidth = (star: number) => {
    if (star === data.stars) return 0.85;
    if (Math.abs(star - data.stars) === 1) return 0.09;
    return 0.02;
  };
  return (
    <div
      style={{
        width: 540,
        height: 540,
        background: "#ffffff",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        fontFamily: F.roboto,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            border: "1px solid #f1f3f4",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.logo || "/placeholder.svg"}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 500, color: "#202124" }}>
            {brand.brandName}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
            <span style={{ fontSize: 12.5, color: "#5f6368" }}>Reviews from</span>
            <GoogleG size={13} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#5f6368" }}>
              Google
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 34, marginTop: 30, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 58, fontWeight: 400, color: "#202124", lineHeight: 1 }}>
            {data.stars}.0
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 9 }}>
            <Stars value={data.stars} size={17} color={G_STAR} empty="#dadce0" gap={2} />
          </div>
          <div style={{ fontSize: 12.5, color: "#5f6368", marginTop: 7 }}>
            120+ reviews
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12.5, color: "#5f6368", width: 8 }}>{star}</span>
              <div style={{ flex: 1, height: 9, borderRadius: 99, background: "#f1f3f4" }}>
                <div
                  style={{
                    width: `${Math.round(barWidth(star) * 100)}%`,
                    height: "100%",
                    borderRadius: 99,
                    background: G_STAR,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "#f1f3f4", marginTop: 28 }} />

      <div style={{ marginTop: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <InitialAvatar name={data.name} size={38} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#202124" }}>
              {data.name}
            </div>
            <div style={{ fontSize: 12, color: "#5f6368", marginTop: 1 }}>
              {data.date}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 11 }}>
          <Stars value={data.stars} size={14} color={G_STAR} empty="#dadce0" gap={1.5} />
        </div>
        <Clamp lines={4} style={{ fontSize: 14.5, lineHeight: 1.55, color: "#3c4043", marginTop: 9 }}>
          {data.review}
        </Clamp>
      </div>
    </div>
  );
}

/** 540×540 — clean rating card framed by the four Google colors. */
export function FourColorFrame({ data, brand }: TemplateProps) {
  return (
    <div
      style={{
        width: 540,
        height: 540,
        background: "#ffffff",
        position: "relative",
        fontFamily: F.roboto,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: G_BLUE }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 10, background: G_GREEN }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 10, background: G_YELLOW }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 10, background: G_RED }} />

      <div
        style={{
          position: "absolute",
          inset: 10,
          padding: 44,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <GoogleG size={38} />
        <div style={{ fontSize: 62, fontWeight: 700, color: "#202124", lineHeight: 1, marginTop: 16 }}>
          {data.stars}.0
        </div>
        <div style={{ marginTop: 10 }}>
          <Stars value={data.stars} size={24} color={G_STAR} empty="#dadce0" gap={3} />
        </div>
        <Clamp
          lines={4}
          style={{
            fontSize: 16.5,
            lineHeight: 1.55,
            color: "#3c4043",
            maxWidth: 396,
            marginTop: 20,
          }}
        >
          &ldquo;{data.review}&rdquo;
        </Clamp>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#202124", marginTop: 16 }}>
          {data.name}
        </div>
        <div style={{ fontSize: 12, color: "#80868b", marginTop: 3 }}>{data.date}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.logo || "/placeholder.svg"}
            alt=""
            style={{ width: 26, height: 26, objectFit: "contain" }}
          />
          <span style={{ fontSize: 12.5, color: "#5f6368" }}>{brand.brandName}</span>
          <span style={{ fontSize: 12.5, color: G_GREEN, fontWeight: 500 }}>
            · Verified review
          </span>
        </div>
      </div>
    </div>
  );
}

/** 600×340 — stat-led wide card: review left, big Google rating panel right. */
export function WallOfProof({ data, brand }: TemplateProps) {
  const { primary } = brand.colors;
  const onPrimary = readableOn(primary);
  return (
    <div
      style={{
        width: 600,
        height: 340,
        background: "#ffffff",
        display: "flex",
        fontFamily: F.roboto,
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, padding: "30px 32px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <GoogleG size={20} />
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "#5f6368" }}>
            Google Reviews
          </span>
        </div>

        <Clamp lines={4} style={{ fontSize: 17, lineHeight: 1.52, color: "#202124", marginTop: 18 }}>
          &ldquo;{data.review}&rdquo;
        </Clamp>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <InitialAvatar name={data.name} size={32} />
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "#202124" }}>
            {data.name}
          </span>
          <span style={{ fontSize: 12, color: "#5f6368" }}>· {data.date}</span>
        </div>
      </div>

      <div
        style={{
          width: 212,
          background: primary,
          borderTopLeftRadius: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          padding: "0 18px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: onPrimary, lineHeight: 1 }}>
          {data.stars}.0
        </div>
        <Stars value={data.stars} size={18} color={G_STAR} empty={withAlpha(onPrimary, 0.25)} gap={2.5} />
        <div
          style={{
            border: `1px solid ${withAlpha(onPrimary, 0.45)}`,
            color: onPrimary,
            borderRadius: 999,
            padding: "5px 13px",
            fontSize: 11,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <GooglePin size={12} color={onPrimary} hole={primary} />
          on Google Maps
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            background: "#ffffff",
            padding: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.logo || "/placeholder.svg"}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

/** 405×720 (9:16 story) — brand-color story with a floating Google review card. */
export function GoogleStory({ data, brand }: TemplateProps) {
  const { primary } = brand.colors;
  const onPrimary = readableOn(primary);
  return (
    <div
      style={{
        width: 405,
        height: 720,
        background: `linear-gradient(175deg, ${primary}, ${shade(primary, 0.28)})`,
        position: "relative",
        overflow: "hidden",
        fontFamily: F.roboto,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 96,
          left: -34,
          width: 120,
          height: 120,
          borderRadius: 999,
          border: `3px solid ${withAlpha(onPrimary, 0.25)}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 210,
          right: 38,
          width: 18,
          height: 18,
          borderRadius: 999,
          background: G_YELLOW,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 30,
          width: 26,
          height: 26,
          background: G_GREEN,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          transform: "rotate(18deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 58,
          fontSize: 30,
          fontWeight: 700,
          color: withAlpha(onPrimary, 0.4),
          transform: "rotate(14deg)",
        }}
      >
        +
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "#ffffff",
            borderRadius: 999,
            padding: "9px 17px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
          }}
        >
          <GoogleG size={18} />
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "#3c4043" }}>
            Google Review
          </span>
        </div>
      </div>

      <div
        style={{
          margin: "30px 34px 0",
          background: "#ffffff",
          borderRadius: 24,
          padding: "26px 26px 24px",
          boxShadow: "0 20px 44px rgba(0,0,0,0.28)",
        }}
      >
        <Stars value={data.stars} size={24} color={G_STAR} empty="#e8eaed" gap={3} />
        <Clamp
          lines={8}
          style={{ fontSize: 19, lineHeight: 1.5, color: "#202124", marginTop: 14 }}
        >
          &ldquo;{data.review}&rdquo;
        </Clamp>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
          <InitialAvatar name={data.name} size={34} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: "#202124" }}>
              {data.name}
            </div>
            <div style={{ fontSize: 11.5, color: "#5f6368" }}>{data.date}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: "#ffffff",
            padding: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.logo || "/placeholder.svg"}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: onPrimary }}>
          {brand.brandName}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <GooglePin size={15} color={onPrimary} hole={primary} />
          <span style={{ fontSize: 12.5, color: withAlpha(onPrimary, 0.85) }}>
            Find us on Google Maps
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Registry + sample data                                             */
/* ------------------------------------------------------------------ */

const DEFAULT_LOGO = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#202124'/><text x='32' y='43' font-family='Arial' font-size='32' font-weight='700' fill='#fff' text-anchor='middle'>G</text></svg>`,
)}`;

export const SAMPLE_REVIEW: ReviewData = {
  stars: 5,
  review:
    "Best facial I've had in the city — the staff remembered my name and my skin has never looked better. Already booked my next three appointments!",
  name: "Sarah Mitchell",
  date: "2 weeks ago",
  logo: DEFAULT_LOGO,
};

export interface TemplateEntry {
  id: string;
  name: string;
  w: number;
  h: number;
  Component: (props: TemplateProps) => React.ReactNode;
}

export const TEMPLATES: TemplateEntry[] = [
  { id: "snippet", name: "Maps Snippet", w: 600, h: 360, Component: GoogleSnippet },
  { id: "response", name: "Owner Response", w: 600, h: 440, Component: GoogleResponse },
  { id: "breakdown", name: "Rating Breakdown", w: 540, h: 540, Component: RatingBreakdown },
  { id: "frame", name: "Four-Color Frame", w: 540, h: 540, Component: FourColorFrame },
  { id: "wall", name: "Wall of Proof", w: 600, h: 340, Component: WallOfProof },
  { id: "story", name: "Story 9:16", w: 405, h: 720, Component: GoogleStory },
];

/* ------------------------------------------------------------------ */
/*  Scaled renderer                                                    */
/* ------------------------------------------------------------------ */

function ScaledTemplate({
  entry,
  brand,
  displayW,
}: {
  entry: TemplateEntry;
  brand: BrandData;
  displayW: number;
}) {
  const scale = displayW / entry.w;
  const { Component } = entry;
  return (
    <div
      style={{
        width: displayW,
        height: entry.h * scale,
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 18px 50px -18px rgba(0,0,0,0.55)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: entry.w,
          height: entry.h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Component data={SAMPLE_REVIEW} brand={brand} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive single-template preview                                 */
/* ------------------------------------------------------------------ */

/*
  Renders one template (default: the Maps Snippet) and scales it to
  fill its parent's width while preserving the template's native aspect
  ratio. Used in the landing-page heroes to showcase a real review card
  instead of a hand-rolled mock. A ResizeObserver keeps the scale exact
  across breakpoints.
*/
export function TemplatePreview({
  templateId = "snippet",
  accent,
  brandName = "Glow Skin Spa",
  data,
}: {
  templateId?: string;
  accent: string;
  brandName?: string;
  data?: ReviewData;
}) {
  const entry = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const scale = w > 0 ? w / entry.w : 0;
  const brand: BrandData = { brandName, colors: { primary: accent } };
  const { Component } = entry;

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: w > 0 ? entry.h * scale : undefined,
        aspectRatio: w > 0 ? undefined : `${entry.w} / ${entry.h}`,
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          width: entry.w,
          height: entry.h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: w > 0 ? "visible" : "hidden",
        }}
      >
        <Component data={data ?? SAMPLE_REVIEW} brand={brand} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public picker                                                      */
/* ------------------------------------------------------------------ */

export function TemplatePicker({ accent }: { accent: string }) {
  const [selected, setSelected] = useState(0);
  const entry = TEMPLATES[selected];
  const brand: BrandData = {
    brandName: "Glow Skin Spa",
    colors: { primary: accent },
  };

  // Portrait stories get a narrower preview so they don't tower.
  const previewW = entry.h > entry.w ? 300 : entry.w > 560 ? 460 : 380;
  const onAccent = readableOn(accent);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
      {/* Live preview of the selected template */}
      <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <ScaledTemplate entry={entry} brand={brand} displayW={previewW} />
      </div>

      {/* Chooser rail */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Choose a template
          </p>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{ background: accent, color: onAccent }}
          >
            40+ templates
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
          {TEMPLATES.map((t, i) => {
            const isActive = i === selected;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isActive}
                className="group flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors"
                style={{
                  borderColor: isActive ? accent : "rgba(255,255,255,0.1)",
                  background: isActive
                    ? withAlpha(accent, 0.08)
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="overflow-hidden rounded-lg bg-white/5">
                  <ScaledTemplate entry={t} brand={brand} displayW={72} />
                </div>
                <span
                  className="text-[12px] font-medium"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-white/45">
          Pick any layout and we generate it on-brand for every client —
          square, story, and wide formats included.
        </p>
      </div>
    </div>
  );
}
