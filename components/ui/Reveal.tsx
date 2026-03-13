"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll-triggered fade-up reveal.
 * Wraps children; becomes visible when element enters the viewport.
 */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
