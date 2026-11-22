"use client";

import { useEffect, useRef } from "react";
import { clamp, createSmoothLoop, prefersReducedMotion } from "@/lib/motion";

const RIBBONS = [
  { front: "--sky", back: "--kesar", center: 0.71, slope: -0.2, twist: 0.3, direction: 1 },
  { front: "--guava", back: "--haldi", center: 0.29, slope: 0.2, twist: 0.7, direction: -1 },
];

export function TwistRibbons({ items }: { items: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    const still = prefersReducedMotion();
    const middle = Math.ceil(items.length / 2);
    const words = [items.slice(middle), items.slice(0, middle)];
    const pointer = { x: 0, y: 0, pull: 0, travel: 0 };
    let drag: { x: number; time: number; speed: number } | null = null;
    let textures: { front: HTMLCanvasElement; back: HTMLCanvasElement; length: number }[] = [];
    let width = 0;
    let height = 0;
    let band = 0;
    let scale = 1;
    let disposed = false;

    const createTexture = (row: string[], fill: string, ink: string, family: string) => {
      const texture = document.createElement("canvas");
      const paint = texture.getContext("2d")!;
      const size = band * 0.56;
      const gap = band * 0.75;
      const font = `normal normal 800 condensed ${size}px ${family}`;

      paint.font = font;
      const widths = row.map((word) => paint.measureText(word).width);
      const length = widths.reduce((total, value) => total + value + gap, 0);

      texture.width = Math.ceil((length + 8) * scale);
      texture.height = Math.ceil(band * scale);
      paint.scale(scale, scale);
      paint.fillStyle = fill;
      paint.fillRect(0, 0, length + 8, band);
      paint.fillStyle = ink;
      paint.font = font;
      paint.textBaseline = "middle";

      let x = gap / 2;
      row.forEach((word, index) => {
        paint.fillText(word, x, band * 0.54);
        x += widths[index] + gap;
        paint.beginPath();
        paint.arc(x - gap / 2, band / 2, band * 0.07, 0, Math.PI * 2);
        paint.fill();
      });

      return { texture, length };
    };

    const build = () => {
      if (disposed) return;
      width = section.clientWidth;
      height = section.clientHeight;
      band = clamp(width * 0.085, 58, 124);
      scale = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      const root = getComputedStyle(document.documentElement);
      const family = getComputedStyle(document.body).fontFamily;
      const color = (name: string) => root.getPropertyValue(name).trim();
      const ink = color("--jamun");

      textures = RIBBONS.map((ribbon, index) => {
        const front = createTexture(words[index], color(ribbon.front), ink, family);
        const back = createTexture(words[index], color(ribbon.back), ink, family);
        return { front: front.texture, back: back.texture, length: front.length };
      });
      loop.wake();
    };

    const render = ([top, pointerX, pointerY, pull, travel]: number[]) => {
      if (!textures.length) return;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);

      const progress = top / window.innerHeight;
      const step = width < 1000 ? 1 : 1.5;
      const twistReach = Math.max(band * 1.3, width * 0.07);
      const bendReach = Math.max(band * 1.6, width * 0.12);

      RIBBONS.forEach((ribbon, index) => {
        const { front, back, length } = textures[index];
        const offset = (top * 1.4 + travel) * ribbon.direction;
        const restingTwist = width * (ribbon.twist + progress * 0.45 * ribbon.direction);
        const twistAt = restingTwist + (pointerX - restingTwist) * pull * 0.65;

        for (let x = 0; x < width; x += step) {
          const along = x / width;
          const eased = clamp((x - twistAt) / (twistReach * 2) + 0.5);
          const angle = Math.PI * eased * eased * (3 - 2 * eased);
          const facing = Math.cos(angle);
          const depth = Math.max(Math.abs(facing) * band, 3);

          const base =
            height * (ribbon.center + ribbon.slope * (along - 0.5)) +
            Math.sin(along * Math.PI * 2 + progress * 4 + index * 0.8) * band * 0.35;
          const distance = (x - pointerX) / bendReach;
          const bend =
            clamp(pointerY - base, -band * 1.1, band * 1.1) * Math.exp(-distance * distance) * pull;
          const y = base + bend + Math.sin(angle) * band * 0.18 * ribbon.direction - depth / 2;
          const source = (((x + offset) % length) + length) % length;

          context.drawImage(
            facing >= 0 ? front : back,
            source * scale,
            0,
            step * scale,
            band * scale,
            x,
            y,
            step + 0.6,
            depth,
          );

          const shade = (1 - Math.abs(facing)) * 0.45;
          if (shade > 0.01) {
            context.fillStyle = `rgba(50, 16, 63, ${shade})`;
            context.fillRect(x, y, step, depth);
          }
        }
      });
    };

    const loop = createSmoothLoop(
      () => {
        const { top } = section.getBoundingClientRect();
        const position = still ? 0 : clamp(top, -height, window.innerHeight);
        return [position, pointer.x, pointer.y, pointer.pull, pointer.travel];
      },
      render,
      120,
    );

    const point = (event: PointerEvent) => {
      const { left, top } = section.getBoundingClientRect();
      pointer.x = event.clientX - left;
      pointer.y = event.clientY - top;
      pointer.pull = still ? 0 : 1;
      loop.wake();
    };

    const onDown = (event: PointerEvent) => {
      drag = { x: event.clientX, time: event.timeStamp, speed: 0 };
      point(event);
    };

    const onMove = (event: PointerEvent) => {
      if (drag) {
        const distance = event.clientX - drag.x;
        pointer.travel -= distance * 1.5;
        drag.speed = distance / Math.max(event.timeStamp - drag.time, 8);
        drag.x = event.clientX;
        drag.time = event.timeStamp;
      }
      if (drag || event.pointerType === "mouse") point(event);
    };

    const release = (event: PointerEvent) => {
      if (drag && !still && event.type === "pointerup") {
        pointer.travel -= clamp(drag.speed, -3, 3) * 280;
      }
      drag = null;
      if (event.pointerType !== "mouse" || event.type === "pointerleave") pointer.pull = 0;
      loop.wake();
    };

    const resize = new ResizeObserver(build);
    resize.observe(section);
    document.fonts.load(`800 1em ${getComputedStyle(document.body).fontFamily}`).then(build, build);

    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerup", release);
    section.addEventListener("pointercancel", release);
    section.addEventListener("pointerleave", release);

    return () => {
      disposed = true;
      loop.stop();
      resize.disconnect();
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerup", release);
      section.removeEventListener("pointercancel", release);
      section.removeEventListener("pointerleave", release);
    };
  }, [items]);

  return (
    <div className="ribbons" ref={sectionRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
