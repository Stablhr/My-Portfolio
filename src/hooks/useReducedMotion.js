import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitial() {
  try {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(QUERY).matches
    );
  } catch {
    return false;
  }
}

/**
 * Reads the browser's `prefers-reduced-motion` setting and keeps it in sync.
 * The CSS media query already handles motion, but components use this to skip
 * building decorative animations (marquee, embers, long transitions) entirely.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia(QUERY);
    const handler = (event) => setReduced(event.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    // Safari < 14 fallback
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  return reduced;
}
