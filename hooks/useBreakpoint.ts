import { useEffect, useState } from "react";

/**
 * Returns the current breakpoint name and boolean helpers.
 * SSR-safe: defaults to "lg" on server to avoid layout flash.
 */
export function useBreakpoint() {
  const [width, setWidth] = useState(1200); // SSR default → desktop

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    isMobile:  width < 640,   // xs
    isTablet:  width < 1024,  // sm–md
    isDesktop: width >= 1024, // lg+
    width,
  };
}
