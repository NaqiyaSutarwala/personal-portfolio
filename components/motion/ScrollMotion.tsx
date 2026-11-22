"use client";

import { useEffect } from "react";
import { clamp, createSmoothLoop } from "@/lib/motion";

export function ScrollMotion() {
  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>("[data-motion]")];

    const loop = createSmoothLoop(
      () => {
        const height = window.innerHeight;
        const remaining = document.documentElement.scrollHeight - height - window.scrollY;
        const untilEnd = clamp(remaining / (height * 0.2));
        return targets.map(
          (target) =>
            clamp((target.getBoundingClientRect().top - height * 0.6) / (height * 0.4)) * untilEnd,
        );
      },
      (values) => values.forEach((value, index) => targets[index].style.setProperty("--enter", `${value}`)),
    );
    return loop.stop;
  }, []);

  return null;
}
