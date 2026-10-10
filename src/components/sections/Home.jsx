import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Settings, LogOut, MousePointer2 } from "lucide-react";
import { useTyping } from "../../hooks/useTyping";
import { useReveal } from "../../hooks/useReveal";
import { profile } from "../../data/profile";
import { SafeImage } from "../ui/SafeImage";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { useOptions } from "../../context/OptionsContext";
import { TechMarquee } from "./TechMarquee";

const MENU_ITEMS = [
  { id: "start", label: "START", action: "start", icon: <ChevronRight className="w-4 h-4" /> },
  { id: "options", label: "OPTIONS", action: "options", icon: <Settings className="w-4 h-4" /> },
  { id: "exit", label: "EXIT", action: "exit", icon: <LogOut className="w-4 h-4" /> },
];

export function Home({ onStart, onOptions, onExit }) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const typedText = useTyping(profile.roles);
  const [heroRef, heroVisible] = useReveal({ threshold: 0.1 });
  const [menuRef, menuVisible] = useReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
  const { reduceMotion } = useOptions();

  useEffect(() => {
    if (!reduceMotion) {
      const timer = setTimeout(() => setShowCursor(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [reduceMotion]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedMenu((prev) => (prev + 1) % MENU_ITEMS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedMenu((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleMenuAction(MENU_ITEMS[selectedMenu].action);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMenu]);

  const handleMenuAction = (action) => {
    switch (action) {
      case "start":
        onStart?.();
        break;
      case "options":
        onOptions?.();
        break;
      case "exit":
        onExit?.();
        break;
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4"
      aria-labelledby="home-title"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className="relative order-2 lg:order-1"
            style={{
              animation: heroVisible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
              opacity: heroVisible || reduceMotion ? 1 : 0,
            }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/30 via-accent/10 to-accent/30 border border-accent/30">
                <SafeImage
                  src="/images/profile.jpg"
                  alt={`${profile.name} - Web Developer`}
                  initial="AS"
                  className="w-full h-full"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/20 border border-accent/30 blur-2xl" aria-hidden="true" />
            </div>
          </div>

          <div
            className="order-1 lg:order-2 text-center lg:text-left"
            style={{
              animation: heroVisible && !reduceMotion ? "reveal 700ms ease-out 150ms forwards" : "none",
              opacity: heroVisible || reduceMotion ? 1 : 0,
            }}
          >
            <span className="inline-flex items-center gap-2 text-label uppercase tracking-[0.2em] text-ink-muted mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              WEB DEVELOPER
            </span>

            <h1
              id="home-title"
              className="font-heading text-chrome leading-[0.95] tracking-wide mb-4"
              style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
            >
              PORTFOLIO
            </h1>

            <p className="font-heading text-outlined text-ink-muted tracking-wide mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
              {profile.year}
            </p>

            <p className="text-ink-muted max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              {profile.intro}
            </p>

            <div className="flex items-center gap-3 text-ink-muted mb-12">
              <span className="text-sm">Currently:</span>
              <span className="font-medium text-ink relative">
                {typedText}
                {showCursor && <span className="ml-1 animate-pulse text-accent">|</span>}
              </span>
            </div>

            <div
              ref={menuRef}
              className="flex flex-col items-center lg:items-start gap-3"
              role="menu"
              aria-label="Game menu"
              style={{
                animation: menuVisible && !reduceMotion ? "reveal 700ms ease-out 300ms forwards" : "none",
                opacity: menuVisible || reduceMotion ? 1 : 0,
              }}
            >
              {MENU_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={`w-full max-w-xs flex items-center justify-center lg:justify-start gap-3 px-6 py-3 rounded-xl bg-surface/50 border border-line text-ink-muted hover:text-ink hover:border-blue/50 hover:bg-white/5 transition-all duration-300 ${selectedMenu === index ? "text-ink border-blue-bright/50 bg-blue-bright/10" : ""}`}
                  onClick={() => handleMenuAction(item.action)}
                  onMouseEnter={() => setSelectedMenu(index)}
                  tabIndex={selectedMenu === index ? 0 : -1}
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${selectedMenu === index ? "bg-accent text-black" : "bg-white/5 text-ink-dim"}`}>
                    {item.icon}
                  </span>
                  <span className="font-mono text-label uppercase tracking-[0.3em]">{item.label}</span>
                  {selectedMenu === index && <ChevronRight className="w-5 h-5 text-accent" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TechMarquee />

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
        style={{ animation: reduceMotion ? "none" : "bounce 2s infinite" }}
      >
        <MousePointer2 className="w-6 h-6 text-ink-dim" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}