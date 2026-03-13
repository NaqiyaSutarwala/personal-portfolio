import { useEffect, useRef, useState } from "react";

interface Position { x: number; y: number; }

const INITIAL: Position = { x: -200, y: -200 };
const LERP = 0.1;

/**
 * Tracks mouse for custom cursor.
 * dotPosition  — snaps directly to mouse.
 * ringPosition — lerps toward mouse for trailing effect.
 * glowPosition — same as dot (used for background glow).
 */
export function useCursor() {
  const [dot,  setDot]  = useState<Position>(INITIAL);
  const [ring, setRing] = useState<Position>(INITIAL);

  const mouseRef = useRef<Position>(INITIAL);
  const ringRef  = useRef<Position>(INITIAL);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setDot({ x: e.clientX, y: e.clientY });
    };

    const lerp = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * LERP;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * LERP;
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(lerp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { dotPosition: dot, ringPosition: ring };
}
