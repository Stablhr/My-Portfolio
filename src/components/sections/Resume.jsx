import { useState, useRef, useEffect } from "react";
import { Download, Briefcase, Code, Award, Check } from "lucide-react";
import { resume } from "../../data/resume";
import { profile } from "../../data/profile";
import { Button } from "../ui/Button";
import { SectionTitle } from "../ui/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Toast } from "../ui/Toast";

const TABS = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "certificates", label: "Certificates", icon: Award },
];

export function Resume() {
  const [activeTab, setActiveTab] = useState("experience");
  const [showToast, setShowToast] = useState(false);
  const reduceMotion = useReducedMotion();
  const [experienceRef, experienceVisible] = useReveal({ threshold: 0.1 });
  const [skillsRef, skillsVisible] = useReveal({ threshold: 0.1 });
  const [languagesRef, languagesVisible] = useReveal({ threshold: 0.1 });
  const [certificatesRef, certificatesVisible] = useReveal({ threshold: 0.1 });

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = profile.cvPath;
    link.download = "Aries_Samson_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <div ref={experienceRef} className="space-y-6" role="tabpanel" aria-labelledby="experience-tab">
            {resume.experience.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                index={i}
                title={exp.role}
                subtitle={exp.company}
                period={exp.period}
                details={exp.details}
                current={exp.current}
                reduceMotion={reduceMotion}
                visible={experienceVisible}
              />
            ))}
          </div>
        );
      case "skills":
        return (
          <div ref={skillsRef} className="space-y-8" role="tabpanel" aria-labelledby="skills-tab">
            <div>
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-6">TECHNICAL SKILLS</h3>
              <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Technical skills">
                {resume.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    reduceMotion={reduceMotion}
                    visible={skillsVisible}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-6">VIRTUAL ASSISTANT SKILLS</h3>
              <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Virtual assistant skills">
                {resume.vaSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    reduceMotion={reduceMotion}
                    visible={skillsVisible}
                  />
                ))}
              </div>
            </div>

            <div ref={languagesRef} className="pt-8 border-t border-line">
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-6">LANGUAGES</h3>
              <div className="space-y-4" role="list" aria-label="Languages">
                {resume.languages.map((lang) => (
                  <LanguageBar
                    key={lang.name}
                    language={lang}
                    reduceMotion={reduceMotion}
                    visible={languagesVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case "certificates":
        return (
          <div ref={certificatesRef} role="tabpanel" aria-labelledby="certificates-tab">
            <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Certificates">
              {resume.certificates.map((certificate, i) => (
                <CertificateCard
                  key={i}
                  certificate={certificate}
                  index={i}
                  reduceMotion={reduceMotion}
                  visible={certificatesVisible}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <SectionTitle id="resume-title" eyebrow="RESUME" title="CV" align="left" />
          <Button variant="primary" onClick={handleDownloadCV} icon={<Download className="w-5 h-5" />} className="w-full sm:w-auto">
            Download CV
          </Button>
        </div>

        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
          <div className="flex gap-1 bg-surface-2 border-b border-line overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Resume sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`${tab.id}-tab`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`pill flex-shrink-0 inline-flex items-center justify-center min-h-11 px-4 text-sm whitespace-nowrap ${activeTab === tab.id ? "pill-active" : "text-ink-muted hover:text-ink hover:bg-white/5"}`}
              >
                <tab.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 md:p-8" style={{ minHeight: "400px" }}>
            <div className="relative overflow-x-hidden">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <Toast message="CV download started" visible={showToast} onClose={() => setShowToast(false)} type="success" />
    </section>
  );
}

function TimelineItem({ index, title, subtitle, period, details, current, reduceMotion, visible }) {
  return (
    <div
      className="relative flex gap-4"
      style={{
        animation: visible && !reduceMotion ? `reveal 700ms ease-out ${index * 100}ms forwards` : "none",
        opacity: visible || reduceMotion ? 1 : 0,
      }}
    >
      <div className="relative flex-shrink-0 w-6 sm:w-8">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-line" aria-hidden="true" />
        <div
          className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-line flex items-center justify-center z-10 ${current ? "bg-accent border-accent" : "bg-surface border-blue-bright"}`}
          aria-hidden="true"
        >
          {current && <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-black" />}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-1 pb-6 sm:pb-4">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <h4 className="text-lg font-semibold text-ink">{title}</h4>
          {current && (
            <span className="px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full font-medium">
              Current
            </span>
          )}
        </div>
        <p className="text-ink-muted mb-1">{subtitle}</p>
        <p className="text-sm text-ink-dim flex items-center gap-1">
          <span className="w-3 h-3" aria-hidden="true" />
          {period}
        </p>

        {details && details.length > 0 && (
          <ul className="mt-3 space-y-2 pl-4" role="list">
            {details.map((detail, i) => (
              <li key={i} className="text-sm text-ink-muted relative pl-2 before:content-['•'] before:absolute before:left-0 before:text-accent overflow-wrap-anywhere">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SkillBar({ skill, reduceMotion, visible }) {
  const [animate, setAnimate] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setAnimate(true);
      return;
    }
    if (visible && !animate) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimate(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      if (barRef.current) observer.observe(barRef.current);
      return () => observer.disconnect();
    }
  }, [visible, animate]);

  return (
    <div ref={barRef} className="bg-surface-2 border border-line rounded-xl p-4" role="listitem">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-ink text-sm overflow-wrap-anywhere">{skill.name}</span>
        <span className="text-sm font-medium text-blue-bright flex-shrink-0" style={{ opacity: animate ? 1 : 0 }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue to-blue-bright"
          style={{
            width: animate && !reduceMotion ? `${skill.level}%` : 0,
            transition: reduceMotion ? "none" : "width 900ms ease-out",
          }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} proficiency`}
        />
      </div>
    </div>
  );
}

function LanguageBar({ language, reduceMotion, visible }) {
  const [animate, setAnimate] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setAnimate(true);
      return;
    }
    if (visible && !animate) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimate(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      if (barRef.current) observer.observe(barRef.current);
      return () => observer.disconnect();
    }
  }, [visible, animate]);

  return (
    <div ref={barRef} className="flex items-center gap-3" role="listitem">
      <div className="w-16 sm:w-20 text-sm font-medium text-ink flex-shrink-0">{language.name}</div>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue to-blue-bright"
          style={{
            width: animate && !reduceMotion ? `${language.level}%` : 0,
            transition: reduceMotion ? "none" : "width 900ms ease-out",
          }}
          role="progressbar"
          aria-valuenow={language.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${language.name} proficiency`}
        />
      </div>
      <span className="text-sm font-medium text-blue-bright w-10 text-right flex-shrink-0" style={{ opacity: animate ? 1 : 0 }}>
        {language.level}%
      </span>
    </div>
  );
}

function CertificateCard({ certificate, index, reduceMotion, visible }) {
  return (
    <div
      className="flex items-start gap-3 bg-surface-2 border border-line rounded-xl p-4"
      role="listitem"
      style={{
        animation: visible && !reduceMotion ? `reveal 700ms ease-out ${index * 80}ms forwards` : "none",
        opacity: visible || reduceMotion ? 1 : 0,
      }}
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
        <Award className="w-4 h-4 text-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 pt-0.5 overflow-hidden">
        <h4 className="font-semibold text-ink text-sm overflow-wrap-anywhere">{certificate.title}</h4>
        <p className="text-sm text-ink-muted mt-0.5 overflow-wrap-anywhere">{certificate.issuer}</p>
        <p className="text-xs text-ink-dim uppercase tracking-wider mt-1">{certificate.date}</p>
      </div>
    </div>
  );
}
