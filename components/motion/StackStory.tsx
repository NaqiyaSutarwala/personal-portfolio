"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { LayerArt } from "@/components/art/LayerArt";
import { clamp, createSmoothLoop, prefersReducedMotion } from "@/lib/motion";

const LAST_LAYER_HOLD = 0.4;

interface StackStoryProps {
  layers: { id: string; category: string }[];
  children: ReactNode;
}

export function StackStory({ layers, children }: StackStoryProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    const scene = sceneRef.current;
    const heroCopy = story?.querySelector<HTMLElement>(".hero-copy");
    const skills = story?.querySelector<HTMLElement>(".skills");
    const column = story?.querySelector<HTMLElement>(".skills-column");
    if (!story || !scene || !heroCopy || !skills || !column) return;

    const rows = [...story.querySelectorAll<HTMLElement>("[data-skill]")];
    const slabs = [...scene.querySelectorAll<HTMLElement>("[data-layer]")];
    const meters = [...story.querySelectorAll<HTMLElement>("[data-meter]")];
    const pointer = { x: 0, y: 0 };
    let drag: { x: number; y: number } | null = null;
    let active = -1;

    const isPinned = () => getComputedStyle(column).position === "sticky";
    const pinStep = () =>
      (skills.offsetHeight - column.offsetHeight) / (rows.length - 1 + LAST_LAYER_HOLD);

    const getPosition = () => {
      const last = rows.length - 1;
      if (isPinned()) {
        const { top } = skills.getBoundingClientRect();
        if (top > 0) return -clamp(top / (column.offsetHeight * 0.45));
        return clamp(-top / pinStep(), 0, last);
      }

      const focus = window.innerHeight * 0.5;
      const centers = rows.map((row) => {
        const { top, height } = row.getBoundingClientRect();
        return top + height / 2;
      });
      if (focus < centers[0]) return -clamp((centers[0] - focus) / (window.innerHeight * 0.4));
      const next = centers.findIndex((center) => center > focus);
      if (next < 0) return last;
      return next - 1 + (focus - centers[next - 1]) / (centers[next] - centers[next - 1]);
    };

    const loop = createSmoothLoop(
      () => {
        const position = getPosition();
        return [
          clamp(window.scrollY / (window.innerHeight * 0.85)),
          pointer.x,
          pointer.y,
          prefersReducedMotion() ? Math.round(position) : position,
        ];
      },
      ([open, x, y, position]) => {
        scene.style.setProperty("--open", `${open}`);
        scene.style.setProperty("--turn", `${Math.sin(open * Math.PI)}`);
        heroCopy.style.setProperty("--exit", `${open}`);
        scene.style.setProperty("--tilt-x", `${x}`);
        scene.style.setProperty("--tilt-y", `${y}`);

        slabs.forEach((slab, index) => {
          slab.style.setProperty("--slide", `${clamp(1 - Math.abs(position - index))}`);
        });
        rows.forEach((row, index) => {
          row.style.setProperty("--offset", `${clamp(index - position, -1, 1)}`);
        });
        meters.forEach((meter, index) => {
          meter.style.setProperty("--fill", `${clamp(position - index + 1)}`);
        });

        const current = position < -0.5 ? -1 : Math.max(0, Math.round(position));
        if (current === active) return;
        active = current;
        rows.forEach((row, index) => row.toggleAttribute("data-active", index === active));
      },
      65,
    );

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
      loop.wake();
    };

    const onTouchStart = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || prefersReducedMotion()) return;
      drag = { x: event.clientX, y: event.clientY };
    };

    const onTouchMove = (event: PointerEvent) => {
      if (!drag) return;
      pointer.x = clamp((event.clientX - drag.x) / 120, -1, 1);
      pointer.y = clamp((event.clientY - drag.y) / 120, -1, 1);
      loop.wake();
    };

    const onTouchEnd = () => {
      if (!drag) return;
      drag = null;
      pointer.x = 0;
      pointer.y = 0;
      loop.wake();
    };

    const onLayerClick = (event: MouseEvent) => {
      if (!isPinned() || !(event.target instanceof Element)) return;
      const id = event.target.closest<HTMLElement>("[data-layer]")?.dataset.layer;
      const index = rows.findIndex((row) => row.dataset.skill === id);
      if (index < 0) return;
      event.preventDefault();
      window.scrollTo({
        top:
          skills.getBoundingClientRect().top +
          window.scrollY +
          index * pinStep(),
      });
    };

    story.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerdown", onTouchStart);
    scene.addEventListener("click", onLayerClick);
    window.addEventListener("pointermove", onTouchMove, { passive: true });
    window.addEventListener("pointerup", onTouchEnd);
    window.addEventListener("pointercancel", onTouchEnd);
    return () => {
      loop.stop();
      scene.removeEventListener("pointerdown", onTouchStart);
      scene.removeEventListener("click", onLayerClick);
      window.removeEventListener("pointermove", onTouchMove);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      story.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="story" ref={storyRef}>
      {children}
      <div className="stack-track" aria-hidden="true">
        <div className="stack-stage">
          <div className="stack" ref={sceneRef}>
            {layers.map((layer, index) => (
              <div
                className={`slab tone-${index % 6}`}
                key={layer.id}
                data-layer={layer.id}
                style={
                  {
                    "--level": (layers.length - 1) / 2 - index,
                    "--order": layers.length - 1 - index,
                  } as CSSProperties
                }
              >
                <a className="slab-body" href={`#skill-${layer.id}`} tabIndex={-1}>
                  <span className="face face-top">
                    <LayerArt id={layer.id} />
                  </span>
                  <span className="face face-front">{layer.category}</span>
                  <span className="face face-side" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
