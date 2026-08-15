"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SkillBarProps {
  name: string;
  level: number;
}

export function ToolkitSkillBar({ name, level }: SkillBarProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const row = rowRef.current;
    const fill = fillRef.current;
    if (!row || !fill) return;

    if (prefersReducedMotion) {
      fill.style.width = `${level}%`;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, row);

    return () => {
      ctx.revert();
    };
  }, [level]);

  return (
    <div ref={rowRef} style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "7px",
        }}
      >
        <span style={{ fontSize: "13.5px", color: "var(--ink)" }}>{name}</span>
        <span
          className="mono"
          style={{ fontSize: "10.5px", color: "var(--ink-dim)" }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: "var(--line)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
}
