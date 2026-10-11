import { useState, useEffect, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
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
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur border border-line rounded-full px-2 py-1">
              {NAV_ITEMS.map((item) => (
                <Pill
                  key={item.id}
                  active={activeSection === item.id}
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