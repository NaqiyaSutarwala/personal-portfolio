import { Footer } from "@/components/layout/Footer";
import { ScrollMotion } from "@/components/motion/ScrollMotion";
import { StackStory } from "@/components/motion/StackStory";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { SKILLS } from "@/constants/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Portfolio" };

export default function HomePage() {
  return (
    <main>
      <StackStory layers={SKILLS.map(({ id, category }) => ({ id, category }))}>
        <HeroSection />
        <SkillsSection />
      </StackStory>
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
      <ScrollMotion />
    </main>
  );
}
