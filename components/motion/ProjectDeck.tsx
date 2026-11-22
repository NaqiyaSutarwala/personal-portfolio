"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ProjectArt } from "@/components/art/ProjectArt";
import { clamp, createSmoothLoop } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

export function ProjectDeck({ projects }: { projects: Project[] }) {
  const deckRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const folders = [...deck.children] as HTMLElement[];

    const loop = createSmoothLoop(
      () =>
        folders.map((folder) =>
          clamp((folder.getBoundingClientRect().top - 120) / (window.innerHeight * 0.75)),
        ),
      (values) => values.forEach((value, index) => folders[index].style.setProperty("--away", `${value}`)),
    );
    return loop.stop;
  }, []);

  const showProject = (index: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const folder = deck.children[index] as HTMLElement;
    const style = getComputedStyle(folder);

    if (style.position !== "sticky") {
      folder.scrollIntoView();
      return;
    }

    // offsetTop moves while an element is stuck, so derive its resting position
    const step = folder.offsetHeight + parseFloat(getComputedStyle(deck).rowGap);
    const deckTop = deck.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: deckTop + index * step - parseFloat(style.top) });
  };

  return (
    <ol className="deck" ref={deckRef} style={{ "--count": projects.length } as CSSProperties}>
      {projects.map((project, index) => (
        <li
          className={`folder tone-${index % 6}`}
          key={project.id}
          style={{ "--index": index } as CSSProperties}
        >
          <button type="button" className="folder-tab" onClick={() => showProject(index)}>
            <span className="folder-tab-label">{project.domain ?? project.name}</span>
            <ProjectArt id={project.id} />
          </button>
          <article className="folder-body">
            <div className="folder-copy">
              {project.domain && <p className="folder-domain">{project.domain}</p>}
              <h3>{project.name}</h3>
              <p className="folder-description">{project.description}</p>
              <ul className="folder-tech" aria-label="Technologies">
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="folder-meta">
                {project.link && (
                  <a
                    className="button button-jamun"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) showProject(index);
                    }}
                  >
                    <span>Visit {project.name}</span>
                  </a>
                )}
                {project.isConfidential && <span>Confidential project</span>}
                {project.type && <span>{project.type}</span>}
              </div>
            </div>
            <ProjectArt id={project.id} />
          </article>
        </li>
      ))}
    </ol>
  );
}
