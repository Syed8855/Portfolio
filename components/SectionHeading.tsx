"use client";

import React, { useRef, useState, useEffect } from "react";
import { SplitScatter } from "./scroll/SplitScatter";

export interface SectionHeadingProps {
  num: string; // e.g. "01 / ABOUT"
  title: string;
}

export function SectionHeading({ num, title }: SectionHeadingProps) {
  const headRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={headRef} style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <span
          className="mono"
          style={{
            color: "var(--accent)",
            fontSize: "13px",
            letterSpacing: "0.06em",
          }}
        >
          {num}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--line)",
          }}
        />
      </div>

      <h2
        className="display"
        style={{
          fontSize: "clamp(28px, 3.4vw, 42px)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          color: "var(--ink)",
        }}
      >
        <SplitScatter
          text={title}
          as="span"
          mode="reassemble-in"
          triggerRef={headRef}
          start="top 85%"
          end="top 55%"
          scrub={0.5}
        />
      </h2>
    </div>
  );
}
