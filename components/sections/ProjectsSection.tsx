"use client";

import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PROJECTS } from "@/constants/portfolio";
import { Project } from "@/types/portfolio";

export function ProjectsSection() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="projects"
      style={{
        padding: "var(--section-y) var(--px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionHeader eyebrow="Work" title="Featured Projects" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06}>
            <ProjectCard project={project} isMobile={isMobile} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isMobile,
}: {
  project: Project;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(168,255,87,0.07) 0%, transparent 60%)`;
    glow.style.opacity = "1";
    card.style.background = "#1c1c1c";
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.background = "var(--card)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      onClick={() => {
        window.open(project.link, "_blank");
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--card)",
        padding: isMobile ? "1.5rem" : "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        transition: "background 0.25s",
      }}
    >
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            color: "var(--muted)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            position: "relative",
          }}
        >
          {project.number} — {project.domain}
        </p>
        {project.isConfidential && (
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              padding: "0.25rem 0.55rem",
              borderRadius: "4px",
              color: "var(--muted)",
              border: "1px solid rgba(168,255,87,0.2)",
              width: "fit-content",
              letterSpacing: "0.05em",
            }}
          >
            Confidential Project
          </span>
        )}
      </div>
      <h3
        style={{
          fontSize: isMobile ? "1.1rem" : "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          position: "relative",
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          fontSize: isMobile ? "0.8rem" : "0.83rem",
          lineHeight: 1.75,
          color: "var(--muted)",
          fontWeight: 300,
          flex: 1,
          position: "relative",
        }}
      >
        {project.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.35rem",
          position: "relative",
        }}
      >
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              fontSize: "0.65rem",
              fontWeight: 500,
              background: "var(--green-dim)",
              color: "var(--green)",
              border: "1px solid rgba(168,255,87,0.2)",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0.8rem",
          borderTop: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
          {project.type}
        </span>
        <div
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "var(--green)";
            el.style.borderColor = "var(--green)";
            el.style.color = "#0d0d0d";
            el.style.transform = "rotate(45deg)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "transparent";
            el.style.borderColor = "var(--border)";
            el.style.color = "var(--muted)";
            el.style.transform = "none";
          }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            color: "var(--muted)",
            transition: "all 0.25s",
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
}
