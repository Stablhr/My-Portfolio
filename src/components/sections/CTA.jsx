import { Mail, Download } from "lucide-react";
import { profile } from "../../data/profile";
import { Button } from "../ui/Button";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CTA() {
  const reduceMotion = useReducedMotion();
  const [ref, visible] = useReveal({ threshold: 0.2 });

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = profile.cvPath;
    link.download = "Aries_Samson_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="cta" className="pb-16 sm:pb-20 lg:pb-28" aria-labelledby="cta-title">
      <div className="container-main">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-10 sm:py-16 lg:py-20 text-center"
          style={{
            animation: visible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
            opacity: visible || reduceMotion ? 1 : 0,
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-label uppercase tracking-[0.2em] text-ink-muted mb-5">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-success" />
              </span>
              Available for opportunities
            </span>

            <h2
              id="cta-title"
              className="font-heading text-chrome leading-[0.95] tracking-wide mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              LET&rsquo;S BUILD SOMETHING TOGETHER
            </h2>

            <p className="text-ink-muted max-w-xl mx-auto mb-8 leading-relaxed">
              Have a project in mind or a role to fill? I&rsquo;m open to freelance work and
              full-time opportunities. Let&rsquo;s talk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" href={`mailto:${profile.email}`} icon={<Mail className="w-5 h-5" />}>
                Email Me
              </Button>
              <Button variant="outline" size="lg" onClick={handleDownloadCV} icon={<Download className="w-5 h-5" />}>
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
