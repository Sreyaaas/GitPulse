"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    if (!mediaQuery.matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
        document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!isDesktop) return null;

  return <div className="gemini-spotlight" aria-hidden="true" />;
}