"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useCursor } from "@/hooks/useCursor";

/**
 * Custom cursor — only renders on desktop/pointer devices.
 * Auto-hidden on mobile via CSS (hover: none media query).
 */
export function Cursor() {
  const { dotPosition, ringPosition } = useCursor();
  const { isMobile } = useBreakpoint();

  // Don't render at all on mobile — no cursor needed
  if (isMobile) return null;

  return (
    <>
      {/* Ambient glow */}
      <div
        id="cursor-glow"
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,255,87,0.07) 0%, transparent 65%)",
          left: dotPosition.x,
          top: dotPosition.y,
          transform: "translate(-50%, -50%)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* Dot */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          background: "var(--green)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          left: dotPosition.x,
          top: dotPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Ring */}
      <div
        id="cursor-ring"
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 28,
          height: 28,
          border: "1px solid rgba(168,255,87,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          left: ringPosition.x,
          top: ringPosition.y,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
    </>
  );
}
