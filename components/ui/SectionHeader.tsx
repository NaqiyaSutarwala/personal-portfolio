import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

/**
 * Green-line eyebrow + large bold section title.
 */
export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <>
      <Reveal>
        <p
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           "0.8rem",
            fontSize:      "0.7rem",
            color:         "var(--muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight:    500,
            marginBottom:  "1rem",
          }}
        >
          <span
            style={{
              width:      24,
              height:     1,
              background: "var(--green)",
              display:    "inline-block",
              flexShrink: 0,
            }}
          />
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2
          style={{
            fontSize:      "clamp(2rem, 4vw, 3.2rem)",
            fontWeight:    600,
            letterSpacing: "-0.025em",
            lineHeight:    1.1,
            marginBottom:  "3.5rem",
          }}
        >
          {title}
        </h2>
      </Reveal>
    </>
  );
}
