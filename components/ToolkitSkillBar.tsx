"use client";

import React from "react";

export interface SkillBarProps {
  name: string;
  level?: number;
}

export function ToolkitSkillBar({ name }: SkillBarProps) {
  return (
    <div className="toolkit-item">
      <span className="toolkit-name">{name}</span>
    </div>
  );
}
