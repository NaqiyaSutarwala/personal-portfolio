"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SOCIAL_LINKS } from "@/constants/portfolio";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { SocialLink } from "@/types/portfolio";

export function ContactSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const stacked = isMobile || isTablet;

  return (
    <section
      id="contact"
      style={{
        padding: "var(--section-y) var(--px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Reveal>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: isMobile
              ? "1.8rem"
              : isTablet
                ? "2.5rem"
                : "clamp(2rem, 5vw, 4rem)",
            background: "var(--card)",
            display: "grid",
            gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
            gap: stacked ? "2.5rem" : "4rem",
            alignItems: "center",
          }}
        >
          {/* Headline */}
          <div>
            <h2
              style={{
                fontSize: isMobile
                  ? "clamp(1.8rem, 9vw, 2.5rem)"
                  : "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Let&apos;s build
              <br />
              something{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--green)",
                }}
              >
                great
              </em>
              <br />
              together.
            </h2>
            <p
              style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "var(--muted)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Open to full-time roles, freelance projects, and exciting
              collaborations. Let&apos;s talk.
            </p>
          </div>

          {/* Links */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            {SOCIAL_LINKS.map((link, i) => (
              <ContactLink
                key={link.id}
                link={link}
                delay={i * 0.06}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ContactLink({
  link,
  delay,
  isMobile,
}: {
  link: SocialLink;
  delay: number;
  isMobile: boolean;
}) {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = "var(--green)";
    el.style.background = "var(--green-dim)";
    el.style.color = "var(--green)";
    const arrow = el.querySelector<HTMLSpanElement>(".arrow");
    if (arrow) {
      arrow.style.color = "var(--green)";
      arrow.style.transform = "rotate(45deg)";
    }
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = "var(--border)";
    el.style.background = "var(--faint)";
    el.style.color = "var(--text)";
    const arrow = el.querySelector<HTMLSpanElement>(".arrow");
    if (arrow) {
      arrow.style.color = "var(--muted)";
      arrow.style.transform = "none";
    }
  };

  return (
    <Reveal delay={delay}>
      <a
        href={link.href}
        target={link.isExternal ? "_blank" : undefined}
        rel={link.isExternal ? "noopener noreferrer" : undefined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0.85rem 1rem" : "1rem 1.2rem",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          background: "var(--faint)",
          fontSize: isMobile ? "0.8rem" : "0.85rem",
          fontWeight: 400,
          transition: "border-color 0.2s, background 0.2s, color 0.2s",
          wordBreak: "break-all",
        }}
      >
        <span>
          {link.icon} {link.label}
        </span>
        <span
          className="arrow"
          style={{
            fontSize: "0.8rem",
            color: "var(--muted)",
            transition: "color 0.2s, transform 0.2s",
            flexShrink: 0,
            marginLeft: "0.5rem",
          }}
        >
          ↗
        </span>
      </a>
    </Reveal>
  );
}
