"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  // Initialize state lazily to avoid setting state synchronously inside an effect
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

    // If it's a mobile/touch device, don't attach mouse listeners
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Completely hidden on mobile/touch screens
  if (!isDesktop) return null;

  return <div className="cursor-spotlight" />;
}