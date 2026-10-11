import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { profile } from "../../data/profile";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "resume", label: "Resume", href: "#resume" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const pillGroupRef = useRef(null);
  const pillRefs = useRef({});
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  // The highlight follows whichever nav item is hovered, otherwise the section
  // currently in view.
  const indicatorId = hoveredId || activeSection;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Track the highlighted nav pill's position so the blue indicator can slide.
  useLayoutEffect(() => {
    const group = pillGroupRef.current;
    if (!group) return;

    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      const el = pillRefs.current[indicatorId];
      if (!el) {
        setIndicator({ x: 0, width: 0 });
        return;
      }
      setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
    };

    update();
    window.addEventListener("resize", update);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }
    return () => {
      cancelled = true;
      window.removeEventListener("resize", update);
    };
  }, [indicatorId]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = profile.cvPath;
    link.download = `Aries_Samson_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-bg/80 backdrop-blur border-b border-line" : "bg-transparent"}`}
      role="banner"
    >
      <nav className="container-main" aria-label="Primary navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="text-xl font-bold text-ink" aria-label="Aries B. Samson - Home">
            <span className="md:hidden">Aries Samson</span>
            <span className="hidden md:inline">AS</span>
          </a>

          <div className="hidden md:flex items-center gap-4">
            <div
              ref={pillGroupRef}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center gap-1 bg-white/5 backdrop-blur border border-line rounded-full px-2 py-1"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-1 bottom-1 rounded-full bg-blue-bright/15 ${
                  reduceMotion ? "" : "transition-[transform,width] duration-300 ease-out"
                }`}
                style={{
                  width: `${indicator.width}px`,
                  transform: `translateX(${indicator.x}px)`,
                  opacity: indicator.width > 0 ? 1 : 0,
                }}
              />
              {NAV_ITEMS.map((item) => (
                <Pill
                  key={item.id}
                  ref={(el) => {
                    pillRefs.current[item.id] = el;
                  }}
                  active={indicatorId === item.id}
                  className={`relative z-10 ${indicatorId === item.id ? "bg-transparent text-ink" : ""}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </Pill>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={handleDownloadCV} icon={<Download className="w-4 h-4" />}>
              Download CV
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-ink-muted hover:text-ink transition-colors rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden -mx-4 sm:-mx-6 border-t border-line bg-bg/95 backdrop-blur animate-in slide-in-from-top-2 fade-in-200"
            role="navigation"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col gap-1 px-4 sm:px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`text-label uppercase tracking-widest px-4 py-3 min-h-11 rounded-full text-left w-full transition-colors ${activeSection === item.id ? "pill-active" : "text-ink-muted hover:text-ink hover:bg-white/5"}`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              ))}
              <Button variant="outline" className="mt-2 w-full" onClick={handleDownloadCV} icon={<Download className="w-4 h-4" />}>
                Download CV
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}