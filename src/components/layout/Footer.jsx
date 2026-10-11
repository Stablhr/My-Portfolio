import { useState, useEffect } from "react";
import { ArrowUp, Mail, MapPin, Download } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../../data/profile";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { name: "Facebook", icon: FaFacebookF, url: profile.socials.facebook.url, handle: profile.socials.facebook.handle },
  { name: "Instagram", icon: FaInstagram, url: profile.socials.instagram.url, handle: profile.socials.instagram.handle },
  { name: "LinkedIn", icon: FaLinkedinIn, url: profile.socials.linkedin.url, handle: profile.socials.linkedin.handle },
];

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

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = profile.cvPath;
    link.download = "Aries_Samson_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="border-t border-line bg-surface/50 pb-20" role="contentinfo">
      <div className="container-main py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <a href="#home" className="inline-block text-2xl font-bold text-ink" aria-label={`${profile.name} - Home`}>
              AS
            </a>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
              Web developer building clean, responsive and interactive experiences with React and Tailwind CSS.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-ink-muted hover:text-blue-bright transition-colors rounded-full border border-line hover:border-blue/50 hover:bg-white/5"
                  aria-label={`${social.name}: ${social.handle}`}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4">Navigate</h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-ink-muted hover:text-blue-bright transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4">Get in touch</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a href={`mailto:${profile.email}`} className="link-external text-sm" aria-label={`Email ${profile.email}`}>
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-ink-muted">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {profile.location}
              </li>
              <li>
                <button type="button" onClick={handleDownloadCV} className="link-external text-sm">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download CV
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-ink-dim">
            © {profile.year} {profile.name}. All rights reserved.
          </p>
          <p className="text-sm text-ink-dim">Built with React &amp; Tailwind CSS</p>
        </div>
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed z-40 size-11 bg-surface border border-line rounded-full text-ink-muted hover:text-ink hover:border-blue/50 transition-all duration-300 shadow-[0_20px_60px_-20px_rgba(27,111,168,.45)]"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </footer>
  );
}
