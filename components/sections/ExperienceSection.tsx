"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EXPERIENCES } from "@/constants/portfolio";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { formatDateRange } from "@/lib/utils";

export function ExperienceSection() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="experience"
      style={{
        padding: "var(--section-y) var(--px)",
        background: "var(--surface)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionHeader eyebrow="Career" title="Experience" />
      <div>
        {EXPERIENCES.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.06}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
                gap: isMobile ? "0.4rem" : "3rem",
                padding: "2.2rem 0",
                borderTop: "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              {/* Date */}
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  paddingTop: isMobile ? "0" : "0.3rem",
                }}
              >
                {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
              </p>

              {/* Content */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--green)",
                    flexShrink: 0,
                    marginTop: "0.35rem",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.15rem",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      fontWeight: 300,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {exp.role}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {exp.location}
                  </p>
                </div>
                {exp.isCurrent && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.2rem 0.65rem",
                      borderRadius: "99px",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      border: "1px solid rgba(168,255,87,0.3)",
                      color: "var(--green)",
                      flexShrink: 0,
                      marginTop: "0.2rem",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--green)",
                      }}
                    />
                    Current
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderBottom: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}
