/*
  Shared data for Section 5 brand-showcase variants.

  Six brand archetypes per the spec, each with a voice-matched
  testimonial. The TESTIMONIALS are the only thing shared across
  variants — visual treatment per archetype is custom in each
  variant file because that's the whole point of the section.
*/

export type Archetype = {
  id: string;
  label: string;        // // minimalist skincare
  quote: string;        // voice-matched testimonial
  handle: string;       // signature
  vibe: string;         // one-line vibe descriptor (used in moodboard hover)
};

export const ARCHETYPES: Archetype[] = [
  {
    id: "skin",
    label: "// minimalist skincare",
    quote: "two weeks. completely different skin. that's it.",
    handle: "@anon_customer",
    vibe: "calm · serif · negative space",
  },
  {
    id: "street",
    label: "// loud streetwear",
    quote: "GOATED. restocking before this drops out again.",
    handle: "@anon_customer",
    vibe: "loud · halftone · sticker",
  },
  {
    id: "wellness",
    label: "// clean wellness",
    quote: "i sleep through the night now. that's the whole review.",
    handle: "@anon_customer",
    vibe: "soft · sage · photographic",
  },
  {
    id: "tech",
    label: "// premium tech",
    quote: "Build quality is what surprised me. Heavier than I expected — in a good way.",
    handle: "@anon_customer",
    vibe: "tight · chrome · editorial",
  },
  {
    id: "food",
    label: "// vibrant food / bev",
    quote: "i have the orange one in my hand RIGHT NOW. send help 😭🍊",
    handle: "@anon_customer",
    vibe: "loud · rounded · emoji",
  },
  {
    id: "luxury",
    label: "// luxury fashion",
    quote: "I bought the dress on a whim. I'll wear it to my mother's funeral.",
    handle: "@anon_customer",
    vibe: "cold · all-caps · negative space",
  },
];
