"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

export function Medals({ achievements }: { achievements: string[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;

    const medals = [...list.querySelectorAll<HTMLElement>(".medal")];
    const swings = medals.map(() => ({ angle: 0, speed: 0 }));
    let lastScroll = window.scrollY;
    let previous = 0;
    let frame = 0;

    const tick = (now: number) => {
      const seconds = previous ? Math.min((now - previous) / 1000, 0.032) : 0.016;
      let moving = false;

      swings.forEach((swing, index) => {
        swing.speed += (-(26 + index * 5) * swing.angle - 2.2 * swing.speed) * seconds;
        swing.angle = clamp(swing.angle + swing.speed * seconds, -24, 24);
        if (Math.abs(swing.angle) + Math.abs(swing.speed) > 0.05) moving = true;
        medals[index].style.transform = `rotate(${swing.angle}deg)`;
      });

      previous = moving ? now : 0;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const push = (index: number, force: number) => {
      swings[index].speed = clamp(swings[index].speed + force, -85, 85);
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const distance = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      const { top, bottom } = list.getBoundingClientRect();
      if (top > window.innerHeight || bottom < 0) return;
      medals.forEach((_, index) => push(index, clamp(distance, -40, 40) * (0.35 + index * 0.1)));
    };

    const pokes = medals.map((medal, index) => {
      const poke = (event: PointerEvent) => {
        const { left, width } = medal.getBoundingClientRect();
        push(index, event.clientX < left + width / 2 ? -70 : 70);
      };
      medal.addEventListener("pointerenter", poke);
      return poke;
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      medals.forEach((medal, index) => medal.removeEventListener("pointerenter", pokes[index]));
    };
  }, []);

  return (
    <ul className="medals" ref={listRef}>
      {achievements.map((achievement) => (
        <li key={achievement} data-motion="drop">
          <div className="medal" aria-hidden="true">
            <span className="medal-ribbon" />
            <span className="medal-disc">{achievement.match(/\d+(st|nd|rd|th)/)?.[0] ?? "★"}</span>
          </div>
          <p>{achievement}</p>
        </li>
      ))}
    </ul>
  );
}
