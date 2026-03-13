"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SKILLS, TICKER_ITEMS } from "@/constants/portfolio";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function SkillsSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const tickerSpan = isMobile ? "span 1" : isTablet ? "span 2" : "span 3";

  return (
    <section
      id="skills"
      style={{
        padding: "var(--section-y) var(--px)",
        background: "var(--surface)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionHeader eyebrow="Expertise" title="What I work with" />
      <Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {SKILLS.map((skill, i) => (
            <BentoCell
              key={skill.id}
              category={skill.category}
              items={skill.items}
              delay={i * 0.04}
            />
          ))}
          {/* Ticker */}
          <div
            style={{
              gridColumn: tickerSpan,
              background: "var(--card)",
              padding: "0.9rem 0",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                whiteSpace: "nowrap",
                width: "max-content",
                animation: "ticker 22s linear infinite",
              }}
            >
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function BentoCell({
  category,
  items,
  delay,
}: {
  category: string;
  items: string[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: "var(--card)",
          padding: "1.8rem",
          height: "100%",
          transition: "background 0.25s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.background =
            "var(--faint)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.background = "var(--card)")
        }
      >
        <p
          style={{
            fontSize: "0.65rem",
            color: "var(--green)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "1.1rem",
          }}
        >
          {category}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {items.map((item) => (
            <span
              key={item}
              style={{
                padding: "0.25rem 0.7rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.72rem",
                fontWeight: 400,
                background: "var(--faint)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
