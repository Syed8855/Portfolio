"use client";

import React, { useRef } from "react";
import { SplitScatter } from "./scroll/SplitScatter";

export interface SectionHeadingProps {
  num?: string; // Optional label, e.g. "About", "Selected work"
  label?: string;
  title: string;
}

function formatLabel(raw?: string): string {
  if (!raw) return "";
  // Strip any leading "01 / " pattern
  const cleaned = raw.replace(/^\d+\s*\/\s*/, "").trim();
  // Return sentence case (first letter uppercase, rest lowercase)
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

export function SectionHeading({ num, label, title }: SectionHeadingProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const displayLabel = formatLabel(label || num);

  return (
    <div ref={headRef} className="section-header-wrap" style={{ marginBottom: "40px" }}>
      {displayLabel && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "16px",
          }}
        >
          <span
            className="mono"
            style={{
              color: "var(--accent)",
              fontSize: "12.5px",
              letterSpacing: "0.06em",
              fontWeight: 500,
            }}
          >
            {displayLabel}
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "var(--line)",
            }}
          />
        </div>
      )}

      <h2
        className="display"
        style={{
          fontSize: "clamp(26px, 3.2vw, 38px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "var(--ink)",
        }}
      >
        <SplitScatter
          text={title}
          as="span"
          mode="reassemble-in"
          triggerRef={headRef}
          start="top 88%"
          end="top 60%"
          scrub={0.5}
        />
      </h2>
    </div>
  );
}
