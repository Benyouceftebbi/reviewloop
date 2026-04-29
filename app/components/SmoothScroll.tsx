"use client";

/*
  Lenis = silky smooth scroll.
  How it works under the hood:
   1. We disable native scroll (CSS via .lenis-smooth class).
   2. Lenis listens to wheel/touch events and tracks a "target" scroll position.
   3. Every animation frame, it linearly-interpolates the actual scroll toward
      the target (raf loop). The interpolation is what makes scrolling feel "fluid".
   4. We tell GSAP's ScrollTrigger to use Lenis's scroll value as its source of truth.

  Without this hookup, GSAP would read native scroll (which we disabled) and
  scroll-driven animations would never fire.
*/
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,           // higher = slower, more "premium" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });

    // Pipe Lenis's scroll into ScrollTrigger so the two libraries agree on position.
    lenis.on("scroll", ScrollTrigger.update);

    // Run Lenis on GSAP's ticker (avoids two competing rAF loops).
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
