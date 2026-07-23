"use client";

import React from "react";

export default function GeminiBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* 1. Ultra-crisp technical dot-grid mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[28px_28px] opacity-50" />

      {/* 2. Vivid Gemini Multi-Color Ambient Glows */}
      <div className="gemini-glow-top-left" />
      <div className="gemini-glow-top-right" />
      <div className="gemini-glow-bottom-center" />

      {/* 3. Cinematic Vignette (Darkens edges slightly to make the center and glows pop) */}
      <div className="absolute inset-0 bg-radial from-transparent via-background/40 to-background pointer-events-none" />
    </div>
  );
}