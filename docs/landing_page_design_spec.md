# Landing Page — Design Spec (Sections 2–12)

> Handoff doc for the front-end dev. Matches the existing hero aesthetic: dark canvas, purple beam lighting, lime CTA, serif-italic accents on key words, `{/}` tags as visual anchors.

---

## 0. Design System (use everywhere)

### Color tokens
```css
--bg-base:       #0A0A0F;   /* main page background */
--bg-deep:       #050507;   /* deeper sections / contrast */
--bg-elevated:   #111118;   /* card / pill backgrounds */

--purple-core:   #4F46E5;   /* core purple of the beam */
--purple-deep:   #1E1B4B;   /* edge of beam */
--purple-soft:   #8B7FE8;   /* italic serif word color (subtle lavender) */
--purple-glow:   rgba(79, 70, 229, 0.45);  /* glow / radial light */

--lime:          #C5F82A;   /* primary CTA, accent */
--lime-hover:    #D4FF3A;
--lime-glow:     rgba(197, 248, 42, 0.35);

--text-primary:  #FFFFFF;
--text-muted:    #9CA3AF;
--text-dim:      #6B7280;

--border-subtle: rgba(255, 255, 255, 0.08);
--border-soft:   rgba(255, 255, 255, 0.14);
--pill-bg:       rgba(255, 255, 255, 0.04);
```

### Typography
- **Sans (UI/body):** Inter, weight 400/500/600. Tracking -0.01em on headings.
- **Serif Italic (accent):** Reckless Neue Italic, or fallback to "Editorial New" / "Tiempos Headline" italic. Used **only** on emphasized words inside headings. Slightly larger optical size than the surrounding sans.
- **Mono (small labels):** JetBrains Mono or Geist Mono, for the `{/}` tags and small section labels like `RESULTS`.

### Spacing / Layout
- Max container width: **1280px**, side padding 24px mobile / 80px desktop.
- Vertical section padding: **140px desktop, 80px mobile**.
- Section dividers: not hard lines — use subtle change in background (radial purple glow appearing/disappearing) to separate.

### Recurring visual elements
- **`{/}` tag:** small mono text, color `--text-dim`, sits above a label or stat. Same treatment as in your hero/results screenshots.
- **Pill tag:** rounded-full, `--pill-bg` background, `1px solid --border-subtle`, padding `8px 16px`, font 14px.
- **Purple beam:** large soft radial-gradient blob, `--purple-glow` to transparent, used as a light source. Should "follow" the user as they scroll (parallax, see Animation Library below).
- **Lime CTA button:** pill-shaped, `--lime` fill, black text, paired with a circular icon button (downward arrow ↓) sitting to its left as a separate orb — exactly as in your hero. Hover: subtle lift + `--lime-glow` shadow.

### Animation library (reuse across sections)
- **Reveal-on-scroll:** opacity 0 → 1, translateY(24px → 0), duration 700ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Trigger when element is 15% in viewport.
- **Beam parallax:** purple radial blobs translate at 30–50% of scroll speed (slower than content) to feel like ambient stage lighting.
- **Stagger children:** when a list/grid reveals, stagger each child by 80ms.
- **Hover lift:** cards translateY(-4px), shadow `0 20px 40px -20px var(--purple-glow)`, duration 250ms.

---

## Section 2 — The Problem (The Insight)

**Goal:** Sell the problem so hard the prospect feels stupid for not solving it. This is the differentiator section — it earns the most visual weight after the hero.

### Layout
Two-row composition inside a full-width dark canvas with a single purple beam coming from the **top-left** corner.

**Row 1 (heading):** centered, max-width ~1000px.
- Mono tag above: `{/}  THE INSIGHT` — color `--text-dim`, letter-spacing 0.15em, 12px.
- Big headline (sans + serif italic mix), font-size clamp(40px, 5vw, 72px), line-height 1.05:
  > Your customers are already giving you the *social proof* you're paying UGC creators thousands to manufacture.
- The words **social proof** in serif italic, color `--purple-soft`.
- Subhead below, 20px, `--text-muted`, max-width 640px:
  > It's sitting in your comments and DMs. You're doing nothing with it.

**Row 2 (visual stat split):** 3-column grid.

| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Number: **~340** | Number: **~12** | Number: **$8,400** |
| Label: testimonials a typical DTC brand receives per month | Label: that ever become a creative asset | Label: average monthly UGC creator spend |
| (white, in lime accent strikethrough underneath) | (white, almost the same — to set up the contrast) | (white) |

Each number: 96px serif italic, `--text-primary`. The `{/}` tag and label sit below in mono and sans.

Add a thin horizontal bar visualization under the numbers — a 100% wide bar, of which **~3.5%** is filled with `--lime`, the rest dim. Caption underneath in mono: `// 96.5% of your social proof is being thrown away`.

### Animation
- Heading: standard reveal-on-scroll, but **the words "social proof"** animate in last with a 200ms delay and a soft `--purple-glow` text-shadow that fades out.
- Numbers: count-up from 0 to final value over 1.4s when the row enters viewport (use `IntersectionObserver` + requestAnimationFrame, easing easeOutCubic).
- Bar viz: width animates from 0% to 3.5% over 1.6s **after** numbers finish counting (so the eye has already locked onto the ratio).

### Why this works
The empty space + small lime sliver does the emotional work. Don't add icons or illustrations here — the math is the visual.

---

## Section 3 — How It Works (3 Steps)

**Goal:** Prove simplicity. The product's whole pitch is "dead simple," so the section must *feel* dead simple.

### Layout
Horizontal 3-step row on desktop, vertical stack on mobile. Connected by a thin animated dotted line that "draws" itself left-to-right as the user scrolls.

Mono label above heading: `{/}  HOW IT WORKS`
Heading (sans, with one italic word):
> Three steps. *One* minute.

Each step card:
- Step number in serif italic: `01`, `02`, `03` — 64px, `--purple-soft`.
- Mini-screenshot/mockup above the text (180px tall, 16:10 ratio, `--bg-elevated` with `--border-subtle` rounded-2xl, slight inner glow on hover).
- Title (sans 600, 22px): "Connect Meta" / "AI detects testimonials" / "Review & post"
- Body (16px, `--text-muted`, 2 lines max):
  - Step 1: One-click OAuth. We never see your password.
  - Step 2: Real-time. Detects positive sentiment about your brand.
  - Step 3: Auto-post to socials, or download as Meta ad creative.

The connector line between cards: 1px dashed `--border-soft`, with a small `--lime` dot that travels along it on scroll (use `scrollYProgress` mapped to dot position).

### Animation
- Cards fade up with 120ms stagger.
- The traveling lime dot on the connector line is the hero animation — it draws the eye through all three steps in sequence.
- On hover, each card's screenshot does a subtle 1.02 scale + the card's border brightens to `--purple-soft`.

### What to put in the mini-screenshots
1. The Meta connect modal (showing the green "Connect" button mid-click).
2. A messy Instagram comment with a green pulse highlighting the positive testimonial line.
3. A finished branded creative inside your dashboard with a "Post" button glowing lime.

---

## Section 4 — Live Demo / Interactive Example

**Goal:** This is the conversion section. Make it feel like magic happening in front of them.

### Layout
Full-bleed dark section with a strong purple beam from **center-top**, fading down. The interactive widget sits centered, max-width 1100px.

Heading (centered):
> See it happen *live*.

Subhead: "Paste a comment. Watch it become a creative."

**The widget (build as a single React component):**
- Left side: a fake-Instagram comment composer.
  - Input field, dark, styled like an IG comment.
  - Pre-filled placeholder: "This serum literally changed my skin in 2 weeks 😭 obsessed"
  - Below the input, three brand-color swatches the user can click (preset brand kits): "Minimalist beauty" (cream + black), "Loud streetwear" (red + black + yellow), "Clean wellness" (sage + ivory).
  - A `{/}` Generate button in lime.
- Right side: an empty creative card placeholder (the same dimensions as the output will be — Instagram square 1:1).
- When user clicks Generate:
  - 600ms loading shimmer over the right card.
  - Card "builds" itself: background color slides in, then logo, then the testimonial text typewrites, then a small "@username" credit fades in last.
  - Total: ~2.8 seconds, feels like magic but isn't slow.
- A small `{/}` counter underneath the right card: `Generated in 2.4s` ticks up live.

### Backup option (if interactive is too much for v1)
A 12–18 second autoplay muted video loop showing the full flow. No controls. Border-rounded. Same purple glow under it. But push for the interactive version — it converts dramatically better for a tool this visual.

### Animation
- Beam pulses softly (opacity oscillates 0.85 → 1 → 0.85 over 6s, infinite, ease-in-out) so the section feels alive even when the user isn't interacting.
- The "build" sequence on the right card is the star — make it deliberate. Don't rush it. Each element appearing should feel intentional.

---

## Section 5 — Brand Customization Showcase

**Goal:** Kill the "AI slop" objection. Show range.

### Layout
Bento grid — **6 tiles, 3 columns × 2 rows** on desktop. Each tile is a different real-feeling branded creative example. Vary tile sizes slightly (1 large + 5 standard, or 2 wide + 4 square) to feel curated, not gridded.

Above the grid:
- `{/}  MADE FOR YOUR BRAND`
- Heading: "Not generic. *Yours.*" (italic on "Yours.")
- Subhead: "Your colors, your fonts, your logo. Six brands. Six personalities. One product."

Each tile shows:
- An 1:1 branded creative as if it were ready to post.
- A tiny brand badge in the top-left corner of the tile (logo + brand name).
- On hover: tile expands subtly, a `{/}` overlay appears at the bottom showing "Brand: [Name] / Style: [vibe]".

Six brands to mock up (give the dev these prompts so they design 6 distinct mock creatives):
1. **Minimalist skincare** — cream background, thin serif type, micro logo, lots of whitespace.
2. **Loud streetwear** — pure black background, oversized red display type, halftone dots, sticker-style.
3. **Clean wellness** — sage green, soft sans, photo-collage feel.
4. **Premium tech accessory** — deep navy + chrome, glossy gradient, ultra-tight kerning.
5. **Vibrant DTC food/beverage** — bright orange background, playful rounded sans, emoji punctuation.
6. **Luxury fashion** — bone white, all-caps high-contrast serif, hairline rules.

### Animation
- Tiles reveal with 80ms stagger when the row enters viewport.
- On hover: tile lifts (translateY -4px), content inside scales 1.02, and the *brand-specific glow* underneath the card matches that brand's primary color (so the streetwear card glows red on hover, the wellness card glows sage, etc.). This subtly proves the brand-adaptation point through the interaction itself.

---

## Section 6 — Use Cases (Two-Mode Positioning)

**Goal:** Two distinct buyers see themselves immediately.

### Layout
**Two big side-by-side panels**, equal width, separated by a hairline `--border-subtle`. On mobile, stack vertically.

Heading above (centered):
> Same product. *Two* jobs.

**Left panel — "For organic social"**
- Mono tag: `{/}  AUTO-POST`
- Heading 32px: "Keep your feed full without thinking about it."
- Body, 3 short bullets in sans 16px:
  - Auto-post approved creatives to IG and FB on your schedule.
  - Daily testimonial drip — without you opening Canva once.
  - You stay in approval-only mode. We do the work.
- A small visual: a phone mockup with a feed of 3 stacked posts auto-publishing in sequence.
- CTA link at bottom: `See organic mode →` (lime text, no button)

**Right panel — "For paid ads"**
- Mono tag: `{/}  AD CREATIVE`
- Heading 32px: "Download Meta-ready ad creative in one click."
- Body, 3 bullets:
  - Sized correctly for Meta ad placements out of the box.
  - Real customer language → highest-converting ad copy you'll ever run.
  - Stop paying $200/creator for fake authenticity.
- Visual: a Meta Ads Manager screenshot with one of your downloaded creatives loaded in.
- CTA link: `See ad mode →`

### Visual treatment
The two panels each have a **different colored glow** behind them — left panel has a soft `--purple-glow`, right panel has a soft `--lime-glow`. This sets up "organic = brand-y purple" / "paid = performance lime" cleanly without needing words.

### Animation
- Panels reveal as a pair, 200ms stagger between left and right.
- Phone/Ads mockups loop a subtle micro-animation (one new post fading in every 4s on the phone; an ad metric ticking up on the Ads Manager mockup).

---

## Section 7 — Why This vs. The Alternatives

**Goal:** Position you out of the competitive set the buyer is mentally putting you in.

### Layout
A comparison table that is a table conceptually but **does not look like a spreadsheet**. Custom-styled.

Heading:
> *Not* a Canva. Not a Hootsuite. Not a UGC creator.

Subhead, `--text-muted`: "We do one thing — and we do it in under a minute."

### The grid (4 columns, 4 rows)

|                                | UGC creators           | Canva + scheduler      | Full social tools (Hootsuite etc.) | **Us**                         |
|---|---|---|---|---|
| Time per creative              | 3–7 days               | 20–40 min              | 20–40 min                          | **<60 sec**                    |
| Cost per creative              | $80–$300               | Your time + tool fees  | Your time + tool fees              | **Pennies**                    |
| Real customer voice            | Manufactured           | Real, but you copy-paste | Real, but you copy-paste         | **Real, automatic**            |
| Stays on-brand                 | Hit or miss            | If you're a designer   | If you're a designer               | **Always**                     |

### Visual treatment
- Three "competitor" columns: dim text (`--text-muted`), background `--bg-base`, border `--border-subtle`.
- The "Us" column: visibly elevated. Background slightly lighter (`--bg-elevated`), `--lime` left border (4px), and a soft purple glow behind the whole column. The values inside in white serif italic for the punchline cells (`<60 sec`, `Pennies`, `Real, automatic`, `Always`).
- The header row uses small mono labels with `{/}` prefixes.
- Above the "Us" column header, place a small lime pill: `← what you're looking at`.

### Animation
- The "Us" column animates in 400ms after the others, with a soft lime pulse on its border once it lands.
- Each row's checkmark/value reveals left-to-right, so the eye literally tracks the comparison across the columns.

---

## Section 8 — Social Proof / Results So Far

**Goal:** You don't have logos yet. Don't fake it. Use a results panel that's honest and impressive *because* it's specific.

### Layout
Wide horizontal strip with **3 large stat blocks** + below them, a marquee of beta brand logos (when you have them).

Mono tag: `{/}  RESULTS`
Heading: "What we've shipped *so far.*"

Three stats, equal columns:
1. **{count}** creatives generated
2. **{count}** brands onboarded
3. **{hh:mm}** average time saved per creative

Number font: 96px serif italic, `--text-primary`. Label below in 14px mono `--text-muted`.

Below the stats, a single **testimonial card** (you only need ONE good one to launch — get it from a beta user):
- Centered, max-width 720px.
- Quote in 24px sans, italic.
- Below: small avatar, name, brand, role. Like: "Sarah K. / Founder, [Brand] / DTC skincare"
- Treat the quote marks as oversized serif italic glyphs in `--purple-soft` — they're a visual element, not just punctuation.

Below the testimonial: an infinite-scroll **logo marquee** (auto-scrolling left, very slow ~25s loop). This is the same treatment shown in your existing screenshots (`VOXE / AUTOMATTIC / WordPress.com / newnew / interprefy / PLAYERS HEALTH`). Logos in `--text-muted`, opacity 0.6, hover brings to opacity 1.

If you only have 2-3 logos at launch — duplicate them in the marquee and increase letter-spacing between, so it doesn't look thin. As you onboard more, swap them in.

### Animation
- Stats count up on viewport entry.
- Logo marquee runs continuously, paused on hover.
- Testimonial quote glyphs scale from 0.9 → 1 with a slight rotate(-3deg → 0) on reveal.

---

## Section 9 — Trust + Security

**Goal:** Preempt the paranoia. DTC founders are nervous about anything touching their ad account.

### Layout
Compact, single-row section. Don't make it big — its job is reassurance, not show.

Three short trust pillars in a horizontal row. Each one:
- A small icon (16px, mono-line style, `--lime` color).
- Bold one-liner.
- Sub-line in `--text-muted`.

**Pillars:**
1. **Official Meta integration.** OAuth handshake. We never see your password.
2. **Disconnect anytime.** One click in your settings. We lose access immediately.
3. **No ad account access required.** We only need page + IG business permissions. We can't spend a dollar of yours.

Heading above, small (32px, not the section's main attention):
> Built on Meta's *official* OAuth.

Visual: a Meta logo lockup on the left side of the section, dim, as a credibility anchor. Don't make it large or the marketing team will think you're claiming partnership — keep it small and factual.

### Animation
- Quiet section. Just standard fade-up reveal. No flair.

---

## Section 10 — Pricing

**Goal:** Lower the friction to "yes, I'll try it."

### Layout
Three pricing cards, centered. Middle card is highlighted as the recommended tier.

Heading:
> *Simple* pricing. No seats. No setup fees.

Subhead: "Start free. Upgrade when you've seen it work."

### Cards (3 tiers)

**Card 1 — "Starter" (Free trial)**
- Price: **$0** for first **10 creatives**
- "No credit card. No time limit on the 10."
- Features:
  - 10 free creatives
  - 1 connected brand
  - Auto-post or download
- CTA: "Start free" (outline button, lime border, lime text)

**Card 2 — "Brand" (Recommended, highlighted)**
- Price: **$X / month**, then in smaller text: "for ~100 creatives/mo"
- Features:
  - 100 creatives/month
  - 1 brand, both modes
  - Priority detection
  - Email support
- CTA: "Start 14-day trial" (filled lime button)

**Card 3 — "Studio"**
- Price: **$Y / month**
- "For agencies and multi-brand operators"
- Features:
  - 500 creatives/month
  - 5 brands
  - Team seats included
  - Slack support
- CTA: "Talk to us"

### Visual treatment
- All three cards: rounded-2xl, `--bg-elevated`, `--border-subtle`.
- Middle card is **elevated 8px**, has a `--lime` 1px border (instead of subtle), a small lime pill at its top: `Most picked`, and a soft purple glow behind it.
- Inside the cards: serif italic on the price number itself (the digits, not the `$` or `/month`). `{/}` tag above the tier name.

### Animation
- Cards stagger in 100ms apart.
- The middle card's lime pill ("Most picked") fades in 400ms after the card itself.
- Hover state: card lifts -6px, glow intensifies. Middle card glows lime on hover; outer cards glow purple.

---

## Section 11 — FAQ

**Goal:** Handle the real objections. Don't pad it.

### Layout
Two-column. Left: heading + small note. Right: accordion of questions.

**Left:**
- `{/}  FAQ`
- Heading 40px:
  > Things people *actually* ask.
- Sub-line, `--text-muted`: "Don't see your question? [contact@yourdomain](#)"

**Right:** accordion list, full width of right column.

### The 8 questions to include
1. **How accurate is the testimonial detection?** — Tuned for DTC. ~95% precision in beta. False positives go to a review queue, never auto-post.
2. **What happens with negative comments or sarcasm?** — Filtered out. We only flag clearly positive sentiment with explicit product/brand reference.
3. **Do I have to approve every post, or can it auto-publish?** — Your call. Per-brand setting: "Auto-post" or "Approve in dashboard first."
4. **Can I edit the creative before it goes live?** — Yes. Edit text, swap layout, adjust colors — then post or download.
5. **Does it work with TikTok?** — Coming. Meta-first at launch (where the testimonial volume actually lives for DTC).
6. **What if a customer asks me to delete a post that quotes them?** — One click in your dashboard removes the post from your channel and the asset from our system.
7. **Will the creatives look like generic AI?** — We render with your brand kit (logo, fonts, colors). See the brand showcase above for range.
8. **How do you handle GDPR / customer consent?** — We only use public comments and DM testimonials where the customer messaged your brand directly. Full disclosure on policy on the legal page.

### Accordion behavior
- Each question is a row with the question on the left and a `+` icon on the right.
- Click expands: the `+` rotates to `×` (45deg), the answer slides down with `max-height` transition (300ms ease).
- Only one open at a time (auto-collapse the others).
- Question text 18px, sans 500. Answer text 16px, `--text-muted`, line-height 1.6.
- Divider between rows: `--border-subtle`, 1px.

### Animation
- Standard fade-up on the section. Nothing fancy. The accordion is the interaction.

---

## Section 12 — Final CTA

**Goal:** One last frictionless invite. Don't add new copy. Repeat the magic.

### Layout
Full-width, centered, generous vertical padding (200px top/bottom). Strongest purple beam in the entire page comes from **bottom-center**, rising up into the section — opposite of the hero (which beams from the bottom-left). This creates visual symmetry: the page opens with one beam, closes with another.

Content centered, max-width 720px:

- Mono tag: `{/}  GET STARTED`
- Heading, 64px, sans + serif italic:
  > Connect your Meta account in *30 seconds.*
- Sub-line, `--text-muted`, 18px:
  > See your first branded creative made from a real customer comment — before you finish your coffee.
- CTA pair (same as hero): circular arrow orb + lime pill button "Connect your Meta account."
- Below the buttons, a single line of fine print, mono 12px, `--text-dim`:
  > `// 10 free creatives. No credit card. Disconnect anytime.`

### Animation
- Beam pulses (0.9 → 1 → 0.9, 8s, ease-in-out, infinite) — same heartbeat as the demo section, ties the page together.
- On the heading, the italic *30 seconds.* gets a one-time soft purple glow text-shadow when it enters viewport, then fades. Subtle reward for scrolling all the way down.
- The CTA button has a permanent micro-pulse (lime-glow shadow oscillating from 20px → 30px → 20px, 3s loop) — the only element on the page allowed to draw attention persistently. Everything else has been calm; this one is alive.

---

## Cross-section notes for the developer

- **Stick the hero CTA pair (lime button + arrow orb) to the page** as a floating element after the user scrolls past Section 4. Bottom-right, padded 24px from corner. Hides again on the final CTA section so it doesn't double up.
- **Use a single beam controller component.** All the purple radial glows are positioned variations of the same element with different x/y/opacity/blur. Don't reimplement per-section.
- **Section labels are anchors.** Every `{/}  LABEL` should also be an `id` on the section, so internal jumps (and analytics) just work.
- **Performance:** the marquee, the count-ups, and the demo widget are the heavy parts. Lazy-load the demo widget below the fold. Use `content-visibility: auto` on each section.
- **Mobile rule of thumb:** on mobile, beams shrink to ~60% size and shift opacity down to 0.6 — they should feel like ambient lighting, not block the content. Two-column comparisons stack with the "Us" card always on top.
- **The serif italic accents are the brand voice.** Use them sparingly — one or two words per heading max. If everything is italic, nothing is.
