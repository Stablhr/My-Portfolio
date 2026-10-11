import { useState, useEffect, useRef } from "react";

function prefersReducedMotion() {
  try {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

function isInViewport(element) {
  if (!element || typeof element.getBoundingClientRect !== "function") return false;
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  // Treat an element with no measurable box (e.g. height 0) as "in view" so it
  // can never be stuck hidden waiting for an intersection that will not happen.
  const hasBox = rect.width > 0 || rect.height > 0;
  if (!hasBox) return true;

  return (
    rect.top < viewportHeight &&
    rect.bottom > 0 &&
    rect.left < viewportWidth &&
    rect.right > 0
  );
}

/**
 * Reveal-on-scroll hook.
 *
 * Content is treated as an enhancement: the element is shown immediately when
 * the user prefers reduced motion, when `IntersectionObserver` is unavailable,
 * or when the element is already on screen at mount. A safety net also fires if
 * the observer never reports (broken ref, zero-height element, etc.) so content
 * is never left permanently hidden.
 */
export function useReveal(options = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Never leave content hidden: no ref attached, reduced motion, or no IO.
    if (!element || prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Already on screen at mount -> show right away instead of waiting.
    if (isInViewport(element)) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    let observer;
    let safetyTimer;
    let reported = false;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          reported = true;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (triggerOnce) {
                observer.unobserve(element);
              }
            } else if (!triggerOnce) {
              setIsVisible(false);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(element);

      // If the observer never reports within a short window it is effectively
      // not working — reveal the element rather than leave it invisible.
      safetyTimer = setTimeout(() => {
        if (!reported) setIsVisible(true);
      }, 1000);
    } catch {
      setIsVisible(true);
    }

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
}
