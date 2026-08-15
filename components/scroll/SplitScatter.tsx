"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScrollScatter, ScrollScatterOptions } from "./useScrollScatter";

export interface SplitScatterProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  mode: "scatter-out" | "reassemble-in";
  triggerRef?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
  accentWord?: string;
  accentClassName?: string;
}

export function SplitScatter({
  text,
  as: Component = "span",
  mode,
  triggerRef,
  start,
  end,
  pin,
  scrub,
  className = "",
  style,
  accentWord,
  accentClassName = "",
}: SplitScatterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollScatter(containerRef, {
    mode,
    triggerRef,
    start,
    end,
    pin,
    scrub,
  });

  const words = text.split(" ");

  return (
    <Component
      // @ts-expect-error - ref typing across polymorphic elements
      ref={containerRef}
      className={className}
      style={{ overflow: "visible", display: "inline-block", ...style }}
      aria-label={text}
    >
      {!mounted ? (
        text
      ) : (
        <span aria-hidden="true">
          {words.map((word, wordIndex) => {
            const isAccent = accentWord && word.toLowerCase() === accentWord.toLowerCase();
            return (
              <React.Fragment key={wordIndex}>
                <span
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                  className={isAccent ? accentClassName : undefined}
                >
                  {Array.from(word).map((char, charIndex) => (
                    <span key={charIndex} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                {wordIndex < words.length - 1 && <span>&nbsp;</span>}
              </React.Fragment>
            );
          })}
        </span>
      )}
    </Component>
  );
}
