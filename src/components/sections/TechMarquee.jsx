import { marqueeSkills } from "../../data/skills";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function TechMarquee() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="mt-12 sm:mt-16 py-8 border-y border-line overflow-hidden w-full" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {marqueeSkills.map((skill, i) => (
            <div key={`${skill.name}-${i}`} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-surface border border-line rounded-full">
              <skill.icon className="w-5 h-5" style={{ color: skill.color }} aria-hidden="true" />
              <span className="text-label uppercase tracking-[0.1em] text-ink font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 sm:mt-16 py-8 border-y border-line overflow-hidden w-full" aria-hidden="true">
      <div className="flex animate-marquee pause-on-hover gap-8 px-4 w-max">
        {marqueeSkills.map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-surface border border-line rounded-full">
            <skill.icon className="w-5 h-5" style={{ color: skill.color }} aria-hidden="true" />
            <span className="text-label uppercase tracking-[0.1em] text-ink font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}