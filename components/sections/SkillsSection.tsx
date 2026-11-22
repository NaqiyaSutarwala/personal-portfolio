import type { CSSProperties } from "react";
import { LayerArt } from "@/components/art/LayerArt";
import { SKILLS } from "@/constants/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="skills" style={{ "--count": SKILLS.length } as CSSProperties}>
      <div className="skills-column">
        <h2 className="heading">Full stack, layer by layer</h2>
        <div className="skills-meter" aria-hidden="true">
          {SKILLS.map((skill, index) => (
            <i className={`tone-${index % 6}`} data-meter key={skill.id} />
          ))}
        </div>
        {SKILLS.map((skill, index) => (
          <article
            className={`skill tone-${index % 6}`}
            id={`skill-${skill.id}`}
            data-skill={skill.id}
            key={skill.id}
          >
            <div className="skill-title">
              <span className="skill-tile">
                <LayerArt id={skill.id} />
              </span>
              <h3>{skill.category}</h3>
            </div>
            <ul className="skill-items">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
