import { useState } from "react";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { profile } from "../../data/profile";
import { skills } from "../../data/skills";
import { SafeImage } from "../ui/SafeImage";
import { SectionTitle } from "../ui/SectionTitle";

const QUICK_FACTS = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Briefcase, label: "Focus", value: "Front-End Development" },
  { icon: Clock, label: "Availability", value: "Open to opportunities" },
];

const INTERESTS = profile.interests;

export function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const reduceMotion = useReducedMotion();
  const [portraitRef, portraitVisible] = useReveal({ threshold: 0.1 });
  const [contentRef, contentVisible] = useReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
  const [skillsRef, skillsVisible] = useReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
  const [factsRef, factsVisible] = useReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

  // Decorative ember positions are generated once, not on every render.
  const [embers] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      size: 8 + Math.random() * 12,
      left: 10 + Math.random() * 80,
      bottom: -10 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
    }))
  );
  const emberCount = reduceMotion ? 0 : embers.length;

  return (
    <section id="about" className="section bg-surface/30" aria-labelledby="about-title">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div
            ref={portraitRef}
            className="relative lg:sticky lg:top-32"
            style={{
              animation: portraitVisible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
              opacity: portraitVisible || reduceMotion ? 1 : 0,
            }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue/30 via-transparent to-transparent rounded-2xl blur-3xl -z-10" aria-hidden="true" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-blue/20 via-blue-deep/30 to-bg border border-blue/20">
                <SafeImage
                  src="/images/photo-of-me.jpg"
                  alt={`${profile.name} - Web Developer`}
                  initial="AS"
                  className="w-full h-full"
                  width={543}
                  height={764}
                />
                {embers.slice(0, emberCount).map((ember, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-blue-bright/30 blur-sm animate-float-up"
                    style={{
                      width: `${ember.size}px`,
                      height: `${ember.size}px`,
                      left: `${ember.left}%`,
                      bottom: `${ember.bottom}%`,
                      animationDelay: `${ember.delay}s`,
                      animationDuration: `${ember.duration}s`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="space-y-8"
            style={{
              animation: contentVisible && !reduceMotion ? "reveal 700ms ease-out 150ms forwards" : "none",
              opacity: contentVisible || reduceMotion ? 1 : 0,
            }}
          >
            <span className="inline-block text-label uppercase tracking-[0.2em] text-ink-muted mb-2">
              HELLO, I AM
            </span>
            <h1 className="font-heading text-chrome leading-[0.95] tracking-wide text-4xl md:text-5xl">
              {profile.name}
            </h1>

            <SectionTitle eyebrow="ABOUT" title="ME" align="left" />

            <p className="text-ink-muted text-lg leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            <div>
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4">SKILLS</h3>
              <div
                ref={skillsRef}
                className="flex flex-wrap gap-3"
                role="list"
                aria-label="Technical skills"
                style={{
                  animation: skillsVisible && !reduceMotion ? "reveal 700ms ease-out 300ms forwards" : "none",
                  opacity: skillsVisible || reduceMotion ? 1 : 0,
                }}
              >
                {skills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    role="listitem"
                    className="relative group w-16 h-16 rounded-xl bg-surface-2 border border-line flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-blue/50"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    aria-label={skill.name}
                  >
                    <skill.icon
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                      aria-hidden="true"
                    />
                    {hoveredSkill === skill && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-surface-2 border border-line rounded-lg text-xs font-medium text-ink whitespace-nowrap animate-in fade-in-150 zoom-in-95">
                        {skill.name}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4">INTERESTS</h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 text-sm border border-line rounded-full text-ink-muted hover:text-ink hover:border-blue/50 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={factsRef}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-line"
              style={{
                animation: factsVisible && !reduceMotion ? "reveal 700ms ease-out 450ms forwards" : "none",
                opacity: factsVisible || reduceMotion ? 1 : 0,
              }}
            >
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-ink-muted mb-1">
                    <fact.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-label uppercase tracking-[0.1em]">{fact.label}</span>
                  </div>
                  <p className="text-ink font-medium text-sm">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}