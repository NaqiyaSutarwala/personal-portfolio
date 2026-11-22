import { ProjectDeck } from "@/components/motion/ProjectDeck";
import { TwistRibbons } from "@/components/motion/TwistRibbons";
import { PROJECTS, TICKER_ITEMS } from "@/constants/portfolio";

export function ProjectsSection() {
  return (
    <>
      <TwistRibbons items={TICKER_ITEMS} />
      <section id="projects" className="projects">
        <h2 className="heading" data-motion="left">Things I’ve helped build</h2>
        <ProjectDeck projects={PROJECTS} />
      </section>
    </>
  );
}
