export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function createSmoothLoop(
  measure: () => number[],
  render: (values: number[]) => void,
  smoothing = 110,
) {
  let values: number[] | null = null;
  let previous = 0;
  let frame = 0;

  const tick = (now: number) => {
    const elapsed = previous ? Math.min(now - previous, 64) : 16;
    const amount = prefersReducedMotion() ? 1 : 1 - Math.exp(-elapsed / smoothing);
    const current = values;
    let moving = false;

    const next = measure().map((target, index) => {
      const from = current?.[index] ?? target;
      const distance = target - from;
      if (Math.abs(distance) < 0.0005) return target;
      moving = true;
      return from + distance * amount;
    });

    values = next;
    render(next);
    previous = moving ? now : 0;
    frame = moving ? requestAnimationFrame(tick) : 0;
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", wake);
  wake();

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", wake);
    window.removeEventListener("resize", wake);
  };

  return { wake, stop };
}
