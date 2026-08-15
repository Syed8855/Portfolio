"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function IntroName() {
  const introRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = introRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate character scattering on scroll
      const chars = el.querySelectorAll<HTMLElement>(".intro-char");
      if (chars.length) {
        gsap.to(chars, {
          opacity: 0,
          x: () => gsap.utils.random(-340, 340),
          y: () => gsap.utils.random(-80, 320),
          rotation: () => gsap.utils.random(-120, 120),
          scale: () => gsap.utils.random(0.6, 1.3),
          filter: "blur(8px)",
          ease: "power1.in",
          stagger: { each: 0.01, from: "random" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Fade eyebrow
      gsap.to(".intro-eyebrow", {
        opacity: 0,
        y: -20,
        ease: "power1.in",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "40% top",
          scrub: 0.6,
        },
      });

      // Fade scroll cue
      gsap.to(".intro-cue", {
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "20% top",
          scrub: 0.6,
        },
      });

      // Fill progress bar track
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }

      // Pin intro screen while scattering
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [mounted]);

  const nameLines = ["SYED", "HASNAIN", "PEERAN"];

  return (
    <section
      ref={introRef}
      className="intro"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        position: "relative",
        zIndex: 10,
        background: "var(--bg)",
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        <div
          className="intro-eyebrow mono"
          style={{
            fontSize: "12px",
            letterSpacing: "0.3em",
            color: "var(--ink-dim)",
            marginBottom: "22px",
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO — 2026
        </div>

        <h1
          className="intro-name display"
          style={{
            fontSize: "clamp(46px, 10vw, 132px)",
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
          }}
          aria-label="SYED HASNAIN PEERAN"
        >
          {!mounted ? (
            nameLines.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))
          ) : (
            <span aria-hidden="true">
              {nameLines.map((line) => (
                <span key={line} style={{ display: "block", overflow: "visible" }}>
                  {Array.from(line).map((ch, ci) => (
                    <span
                      key={ci}
                      className="intro-char char"
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          )}
        </h1>

        <div
          className="intro-cue mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            justifyContent: "center",
            marginTop: "56px",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "var(--ink-dim)",
          }}
        >
          <span style={{ color: "var(--accent-2)" }}>00</span>
          <span
            style={{
              width: "120px",
              height: "2px",
              background: "var(--line)",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              ref={fillRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "0%",
                background: "var(--accent)",
              }}
            />
          </span>
          <span>KEEP SCROLLING</span>
        </div>
      </div>
    </section>
  );
}
