import { marqueeSkills } from "../../data/skills";
import { useOptions } from "../../context/OptionsContext";

export function TechMarquee() {
  const { reduceMotion } = useOptions();

  if (reduceMotion) {
    return (
      <div className="py-8 border-y border-line overflow-x-auto" aria-hidden="true">
        <div className="flex gap-8 px-4 min-w-max">
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
    <div className="py-8 border-y border-line overflow-hidden" aria-hidden="true">
      <div className="flex animate-marquee pause-on-hover gap-8 px-4">
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