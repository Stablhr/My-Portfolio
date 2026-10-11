import { useState, useEffect } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../../data/profile";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-surface/50" role="contentinfo">
      <div className="container-main py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <span className="text-xl font-bold text-ink">AS</span>
            <p className="text-sm text-ink-muted">
              © {profile.year} {profile.name}. All rights reserved.
            </p>
            <p className="text-sm text-ink-dim">Built with React & Tailwind CSS</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="link-external"
              aria-label={`Email ${profile.email}`}
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">{profile.email}</span>
            </a>
            <a
              href={profile.socials.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-blue-bright transition-colors rounded-full hover:bg-white/5"
              aria-label={`Facebook: ${profile.socials.facebook.handle}`}
            >
              <FaFacebookF className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={profile.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-blue-bright transition-colors rounded-full hover:bg-white/5"
              aria-label={`Instagram: ${profile.socials.instagram.handle}`}
            >
              <FaInstagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={profile.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-blue-bright transition-colors rounded-full hover:bg-white/5"
              aria-label={`LinkedIn: ${profile.socials.linkedin.handle}`}
            >
              <FaLinkedinIn className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {showBackToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 md:static p-3 bg-surface border border-line rounded-full text-ink-muted hover:text-ink hover:border-blue/50 transition-all duration-300 shadow-[0_20px_60px_-20px_rgba(27,111,168,.45)]"
              style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))", right: "max(1.5rem, env(safe-area-inset-right))" }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}