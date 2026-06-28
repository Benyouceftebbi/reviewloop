"use client";

/*
  useReveal — tiny IntersectionObserver hook for reveal-on-scroll.

  Returns a ref to attach to any element. When that element scrolls
  into view (>=12% visible), it gets `data-revealed="true"`. The actual
  fade/slide is driven by CSS in this folder's section markup using the
  `reveal` utility classes, so the hook stays presentation-agnostic.

  One observer per element, disconnected after first reveal — these are
  one-shot entrance animations, not scrub-linked, so we never re-hide.
*/

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: reveal immediately, skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
