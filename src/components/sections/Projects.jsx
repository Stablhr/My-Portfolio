import { useState, useMemo } from "react";
import { ExternalLink, X, ChevronRight, Code, Star, Zap } from "lucide-react";
import { projects } from "../../data/projects";
import { Card } from "../ui/Card";
import { SafeImage } from "../ui/SafeImage";
import { Modal } from "../ui/Modal";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { SectionTitle } from "../ui/SectionTitle";
import { useOptions } from "../../context/OptionsContext";

const CATEGORIES = ["All", "Web App", "Website", "UI"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { reduceMotion } = useOptions();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleViewMore = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-main">
        <SectionTitle
          id="projects-title"
          eyebrow="RECAP PROJECT"
          title={`${profile?.year || 2026}`}
          className="mb-8"
        />
        <SectionTitle
          eyebrow=""
          title="RECAP PROJECT 2026"
          className="mb-8"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Project categories">
          {CATEGORIES.map((cat) => (
            <Pill
              key={cat}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </Pill>
          ))}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Projects"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onViewMore={handleViewMore}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
            reduceMotion={reduceMotion}
          />
        )}

        <div className="mt-16" aria-label="Project screenshots showcase">
          <ProjectScreenshotStrip projects={projects} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onViewMore, reduceMotion }) {
  return (
    <article
      className="card card-hover group"
      role="listitem"
      style={{
        animation: !reduceMotion ? `reveal 700ms ease-out ${index * 80}ms forwards` : "none",
        opacity: reduceMotion ? 1 : 0,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <SafeImage
          src={project.image}
          alt={`${project.title} screenshot`}
          initial={project.title.charAt(0)}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          width={640}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" aria-hidden="true" />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-accent font-medium">{project.category}</span>
        </div>
        <h3 className="text-lg font-semibold text-ink group-hover:text-blue-bright transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-ink-muted line-clamp-2">{project.short}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-xs bg-white/5 border border-line rounded-full text-ink-dim">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-line">
          <Button variant="outline" size="sm" onClick={() => onViewMore(project)} iconRight={<ChevronRight className="w-4 h-4" />}>
            View More
          </Button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose, reduceMotion }) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title={project.title}
      size="xl"
      className="max-h-[90vh]"
    >
      <div className="space-y-6">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
          <SafeImage
            src={project.image}
            alt={`${project.title} screenshot`}
            initial={project.title.charAt(0)}
            className="w-full h-full"
            width={1280}
            height={720}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-3">DESCRIPTION</h4>
              <p className="text-ink-muted leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-3">KEY FEATURES</h4>
              <ul className="space-y-2" role="list">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-muted">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-3">TECH STACK</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-sm bg-white/5 border border-line rounded-full text-ink">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface border border-line rounded-2xl p-5 space-y-4">
              <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted">PROJECT INFO</h4>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-dim">Category</dt>
                  <dd className="text-ink font-medium">{project.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-dim">Status</dt>
                  <dd className="text-success font-medium">Live</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Visit Live Site
              </a>
              <Button variant="outline" onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ProjectScreenshotStrip({ projects, reduceMotion }) {
  const stripProjects = [...projects, ...projects];

  if (reduceMotion) return null;

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="flex animate-marquee pause-on-hover gap-8 px-4">
        {stripProjects.map((project, i) => (
          <div key={`${project.slug}-${i}`} className="flex-shrink-0 w-80">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-surface border border-line">
              <SafeImage
                src={project.image}
                alt=""
                initial={project.title.charAt(0)}
                className="w-full h-full object-cover"
                width={320}
                height={180}
              />
            </div>
            <p className="text-xs text-center mt-2 text-ink-dim font-medium">{project.title}</p>
          </div>
        ))}
      </div>
      <div className="flex animate-marquee pause-on-hover gap-8 px-4" style={{ animationDirection: "reverse", animationDuration: "40s" }}>
        {stripProjects.map((project, i) => (
          <div key={`${project.slug}-${i}-rev`} className="flex-shrink-0 w-80">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-surface border border-line">
              <SafeImage
                src={project.image}
                alt=""
                initial={project.title.charAt(0)}
                className="w-full h-full object-cover"
                width={320}
                height={180}
              />
            </div>
            <p className="text-xs text-center mt-2 text-ink-dim font-medium">{project.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}