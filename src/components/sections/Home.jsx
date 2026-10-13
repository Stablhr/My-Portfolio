import { ArrowRight } from "lucide-react";
import { useTyping } from "../../hooks/useTyping";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { profile } from "../../data/profile";
import { SafeImage } from "../ui/SafeImage";
import { Button } from "../ui/Button";
import { TechMarquee } from "./TechMarquee";

export function Home() {
  const typedText = useTyping(profile.roles);
  const reduceMotion = useReducedMotion();
  const [heroRef, heroVisible] = useReveal({ threshold: 0.1 });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 md:pt-0 scroll-mt-24"
        aria-labelledby="home-title"
      >
        <div className="container-main w-full flex flex-1 items-center">
          <div className="grid w-full lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div
              className="order-1"
              style={{
                animation: heroVisible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
                opacity: heroVisible || reduceMotion ? 1 : 0,
              }}
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <SafeImage
                    src="/logo.png"
                    alt={`${profile.name} logo`}
                    initial="AS"
                    className="w-full h-full"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/20 border border-accent/30 blur-2xl" aria-hidden="true" />
              </div>
            </div>

            <div
              className="order-2 text-center lg:text-left relative z-10"
              style={{
                animation: heroVisible && !reduceMotion ? "reveal 700ms ease-out 150ms forwards" : "none",
                opacity: heroVisible || reduceMotion ? 1 : 0,
              }}
            >
              <span className="inline-flex items-center gap-2 text-label uppercase tracking-[0.2em] text-ink-muted mb-4">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                WEB DEVELOPER
              </span>

              <h1 id="home-title" className="mb-4 w-full" aria-label="PORTFOLIO">
                {/*
                  Rendered as SVG so the word always scales to the width of its
                  own grid column instead of the viewport. The old clamp() sizing
                  overflowed (and clipped the final "O") on mid-size screens where
                  the 2-column grid narrows the text column, and on devices whose
                  fallback font is wider than Anton. `textLength` forces an exact
                  fit on every device, so nothing is ever cut off.
                */}
                <svg
                  viewBox="0 0 760 128"
                  className="w-full h-auto overflow-visible"
                  role="img"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="portfolioChrome" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#a7b0bd" />
                      <stop offset="100%" stopColor="#6b7685" />
                    </linearGradient>
                  </defs>
                  <text
                    x="0"
                    y="116"
                    textLength="760"
                    lengthAdjust="spacingAndGlyphs"
                    fill="url(#portfolioChrome)"
                    style={{ fontFamily: "var(--font-heading)", fontSize: "150px", letterSpacing: "0.01em" }}
                  >
                    PORTFOLIO
                  </text>
                </svg>
              </h1>

              <p className="font-heading text-outlined text-ink-muted tracking-wide mb-8 whitespace-nowrap" style={{ fontSize: "clamp(1rem, 6vw, 3rem)", maxWidth: "100%" }}>
                {profile.year}
              </p>

              <p className="text-ink-muted max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                {profile.intro}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-ink-muted mb-6 min-h-[2.5rem]">
                <span className="text-sm">Currently:</span>
                <span className="font-medium text-ink">{typedText}</span>
              </div>

              <div className="flex justify-center lg:justify-start gap-3 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full max-w-xs sm:w-auto mx-auto sm:mx-0"
                  onClick={scrollToProjects}
                  iconRight={<ArrowRight className="w-5 h-5" />}
                >
                  View Projects
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" aria-hidden="true" />
      </section>
      <TechMarquee />
    </>
  );
}
