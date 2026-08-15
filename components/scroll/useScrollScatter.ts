"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollScatterOptions {
  mode: "scatter-out" | "reassemble-in";
  triggerRef?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: number | boolean;
  stagger?: { each?: number; from?: "random" | "start" | "end" | "center" };
}

export function useScrollScatter(
  containerRef: React.RefObject<HTMLElement | null>,
  options: ScrollScatterOptions
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const targetTrigger = options.triggerRef?.current || el;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>(".char");
      if (!chars.length) return;

      if (options.mode === "scatter-out") {
        gsap.set(chars, { opacity: 1, x: 0, y: 0, rotation: 0, filter: "blur(0px)" });
        gsap.to(chars, {
          opacity: 0,
          x: () => gsap.utils.random(-300, 300),
          y: () => gsap.utils.random(-100, 300),
          rotation: () => gsap.utils.random(-100, 100),
          scale: () => gsap.utils.random(0.7, 1.3),
          filter: "blur(7px)",
          ease: "power1.in",
          stagger: options.stagger || { each: 0.012, from: "random" },
          scrollTrigger: {
            trigger: targetTrigger,
            start: options.start || "top top",
            end: options.end || "bottom top",
            scrub: options.scrub !== undefined ? options.scrub : 0.6,
            pin: options.pin,
            pinSpacing: options.pin ? true : false,
          },
        });
      } else if (options.mode === "reassemble-in") {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            x: () => gsap.utils.random(-40, 40),
            y: () => gsap.utils.random(-30, 60),
            rotation: () => gsap.utils.random(-25, 25),
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            stagger: options.stagger || { each: 0.01, from: "start" },
            scrollTrigger: {
              trigger: targetTrigger,
              start: options.start || "top 85%",
              end: options.end || "top 55%",
              scrub: options.scrub !== undefined ? options.scrub : 0.5,
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [containerRef, options]);
}
