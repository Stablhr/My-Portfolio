import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds, options = {}) {
  const { offset = 100, threshold = 0 } = options;
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    // IntersectionObserver is required for scroll-spy; if unavailable we simply
    // keep the first section active instead of crashing the whole app.
    if (typeof IntersectionObserver === "undefined") return;

    // Keep the visible sections and their ratios so we can pick whichever
    // section occupies the most of the thin band under the navbar.
    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio);
          } else {
            ratios.delete(id);
          }
        });

        let bestId = "";
        let bestRatio = -1;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      {
        rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`,
        threshold,
      }
    );

    sectionIds
      .map((id) => document.getElementById(id))
      .forEach((element) => element && observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds, offset, threshold]);

  return activeId;
}