"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EDUCATION } from "@/constants/portfolio";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function EducationSection() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="education"
      style={{
        padding: "var(--section-y) var(--px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionHeader eyebrow="Background" title="Education" />
      {EDUCATION.map((edu, i) => (
        <Reveal key={edu.id} delay={i * 0.06}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: isMobile ? "1.5rem" : "2.5rem",
              background: "var(--card)",
            }}
          >
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "2rem",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? "1.05rem" : "1.3rem",
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    marginBottom: "0.4rem",
                    lineHeight: 1.3,
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    fontWeight: 300,
                  }}
                >
                  {edu.institution}
                </p>
              </div>
              <span
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: "8px",
                  background: "var(--faint)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  alignSelf: "flex-start",
                }}
              >
                {edu.year}
              </span>
            </div>
            {/* Achievements */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              {edu?.achievements?.map((a) => (
                <div
                  key={a}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: isMobile ? "0.6rem 0.8rem" : "0.8rem 1rem",
                    background: "var(--faint)",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>🥇</span>
                  <p
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.8rem",
                      color: "var(--muted)",
                      fontWeight: 300,
                    }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
