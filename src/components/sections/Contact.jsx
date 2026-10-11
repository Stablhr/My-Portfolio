import { Mail, MessageSquare, Briefcase } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../../data/profile";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SOCIAL_LINKS = [
  { name: "Email", icon: Mail, href: `mailto:${profile.email}`, handle: profile.email, color: "#D44638" },
  { name: "Facebook", icon: FaFacebookF, href: profile.socials.facebook.url, handle: profile.socials.facebook.handle, color: "#1877F2" },
  { name: "Instagram", icon: FaInstagram, href: profile.socials.instagram.url, handle: profile.socials.instagram.handle, color: "#E4405F" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: profile.socials.linkedin.url, handle: profile.socials.linkedin.handle, color: "#0A66C2" },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [contentRef, contentVisible] = useReveal({ threshold: 0.1 });

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-main">
        <SectionTitle id="contact-title" eyebrow="GET IN TOUCH" title="CONTACT ME" className="mb-10 md:mb-14" />

        <div
          ref={contentRef}
          className="max-w-3xl mx-auto space-y-8"
          style={{
            animation: contentVisible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
            opacity: contentVisible || reduceMotion ? 1 : 0,
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-surface border border-line rounded-xl transition-all duration-300 hover:border-blue/50 hover:-translate-y-1"
                aria-label={`${social.name}: ${social.handle}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${social.color}20`, color: social.color }}
                >
                  <social.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-label uppercase tracking-[0.1em] text-ink-dim">{social.name}</p>
                  <p className="text-ink font-medium truncate">{social.handle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-line">
            <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4 text-center">QUICK LINKS</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" href="#projects" icon={<MessageSquare className="w-4 h-4" />}>
                View Projects
              </Button>
              <Button variant="outline" size="sm" href="#resume" icon={<Briefcase className="w-4 h-4" />}>
                Download CV
              </Button>
              <Button variant="outline" size="sm" href={`mailto:${profile.email}`} icon={<Mail className="w-4 h-4" />}>
                Email Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
