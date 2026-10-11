import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds, options = {}) {
  const { offset = 100, threshold = 0.3 } = options;
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    // IntersectionObserver is required for scroll-spy; if unavailable we simply
    // keep the first section active instead of crashing the whole app.
    if (typeof IntersectionObserver === "undefined") return;

    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`,
          threshold,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, [sectionIds, offset, threshold]);

  return activeId;
}