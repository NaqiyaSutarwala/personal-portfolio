"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp, createSmoothLoop } from "@/lib/motion";

export function ProgressRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const loop = createSmoothLoop(
      () => {
        const { top, height } = rail.getBoundingClientRect();
        return [clamp((window.innerHeight * 0.7 - top) / height)];
      },
      ([progress]) => rail.style.setProperty("--progress", `${progress}`),
    );
    return loop.stop;
  }, []);

  return (
    <div className="rail" ref={railRef}>
      {children}
    </div>
  );
}
