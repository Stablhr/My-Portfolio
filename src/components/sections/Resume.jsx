import { useState, useRef, useEffect } from "react";
import { Download, GraduationCap, Briefcase, Code, Languages, ChevronRight, Check } from "lucide-react";
import { resume } from "../../data/resume";
import { profile } from "../../data/profile";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SectionTitle } from "../ui/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import { Toast } from "../ui/Toast";
import { useOptions } from "../../context/OptionsContext";

const TABS = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
];

export function Resume() {
  const [activeTab, setActiveTab] = useState("education");
  const [showToast, setShowToast] = useState(false);
  const { reduceMotion } = useOptions();
  const [educationRef, educationVisible] = useReveal({ threshold: 0.1 });
  const [experienceRef, experienceVisible] = useReveal({ threshold: 0.1 });
  const [skillsRef, skillsVisible] = useReveal({ threshold: 0.1 });
  const [languagesRef, languagesVisible] = useReveal({ threshold: 0.1 });

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
      case "education":
        return (
          <div ref={educationRef} className="space-y-6" role="tabpanel" aria-labelledby="education-tab">
            {resume.education.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                index={i}
                title={edu.course}
                subtitle={edu.school}
                period={edu.period}
                details={edu.details}
                icon={GraduationCap}
                reduceMotion={reduceMotion}
                visible={educationVisible}
              />
            ))}
          </div>
        );
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
                icon={Briefcase}
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
                {resume.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={i}
                    reduceMotion={reduceMotion}
                    visible={skillsVisible}
                  />
                ))}
              </div>
            </div>

            <div ref={languagesRef} className="pt-8 border-t border-line">
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-6">LANGUAGES</h3>
              <div className="space-y-4" role="list" aria-label="Languages">
                {resume.languages.map((lang, i) => (
                  <LanguageBar
                    key={lang.name}
                    language={lang}
                    index={i}
                    reduceMotion={reduceMotion}
                    visible={languagesVisible}
                  />
                ))}
              </div>
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle eyebrow="RESUME" title="CV" align="left" />
          <Button variant="primary" onClick={handleDownloadCV} icon={<Download className="w-5 h-5" />}>
            Download CV
          </Button>
        </div>

        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
          <div className="flex flex-wrap bg-surface-2 border-b border-line" role="tablist" aria-label="Resume sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`${tab.id}-tab`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`pill px-6 py-3 text-base ${activeTab === tab.id ? "pill-active" : "text-ink-muted hover:text-ink hover:bg-white/5"}`}
              >
                <tab.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8" style={{ minHeight: "400px" }}>
            <div className="relative" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <Toast message="CV download started" visible={showToast} onClose={() => setShowToast(false)} type="success" />
    </section>
  );
}

function TimelineItem({ index, title, subtitle, period, details, icon: Icon, current, reduceMotion, visible }) {
  return (
    <div
      className="relative flex gap-6"
      style={{
        animation: visible && !reduceMotion ? `reveal 700ms ease-out ${index * 100}ms forwards` : "none",
        opacity: visible || reduceMotion ? 1 : 0,
      }}
    >
      <div className="relative flex-shrink-0 w-12">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-line" aria-hidden="true" />
        <div
          className={`relative w-4 h-4 rounded-full border-2 border-line flex items-center justify-center z-10 ${current ? "bg-accent border-accent" : "bg-surface border-blue-bright"}`}
          aria-hidden="true"
        >
          {current && <Check className="w-2.5 h-2.5 text-black" />}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-1 pb-6">
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
              <li key={i} className="text-sm text-ink-muted relative pl-2 before:content-['•'] before:absolute before:left-0 before:text-accent">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SkillBar({ skill, index, reduceMotion, visible }) {
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
    <div ref={barRef} className="bg-surface-2 border border-line rounded-xl p-5" role="listitem">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-ink">{skill.name}</span>
        <span className="text-sm font-medium text-blue-bright" style={{ opacity: animate ? 1 : 0 }}>
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

function LanguageBar({ language, index, reduceMotion, visible }) {
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
    <div ref={barRef} className="flex items-center gap-4" role="listitem">
      <div className="w-24 text-sm font-medium text-ink">{language.name}</div>
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
      <span className="text-sm font-medium text-blue-bright w-12 text-right" style={{ opacity: animate ? 1 : 0 }}>
        {language.level}%
      </span>
    </div>
  );
}