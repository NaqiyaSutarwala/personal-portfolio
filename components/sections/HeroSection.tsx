"use client";

import { useMounted } from "@/hooks/useMounted";
import { PERSONAL_INFO, STATS } from "@/constants/portfolio";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Stat } from "@/types/portfolio";

const fadeUp = (mounted: boolean, delay: number): React.CSSProperties => ({
  opacity: mounted ? 1 : 0,
  transform: mounted ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
});

export function HeroSection() {
  const mounted = useMounted();
  const { isMobile, isTablet } = useBreakpoint();
  const stacked = isMobile || isTablet;

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        padding: stacked ? "7rem var(--px) 4rem" : "9rem var(--px) 5rem",
        position: "relative",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
        gap: stacked ? "3rem" : "4rem",
        alignItems: "center",
      }}
    >
      {/* ── Left col ── */}
      <div>
        {/* Badge */}
        <div
          style={{
            ...fadeUp(mounted, 0.1),
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.9rem",
            border: "1px solid var(--border)",
            borderRadius: "99px",
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginBottom: "1.5rem",
            fontWeight: 400,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
              animation: "pulse-dot 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          Open to opportunities
        </div>

        {/* Name */}
        <h1
          style={{
            ...fadeUp(mounted, 0.22),
            fontSize: isMobile
              ? "clamp(2.8rem, 14vw, 4rem)"
              : "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          {PERSONAL_INFO.firstName}
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--muted)",
            }}
          >
            {PERSONAL_INFO.lastName}
          </em>
        </h1>

        {/* Bio */}
        <p
          style={{
            ...fadeUp(mounted, 0.34),
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.85,
            color: "var(--muted)",
            fontWeight: 300,
            maxWidth: 440,
            marginBottom: "2rem",
          }}
        >
          {PERSONAL_INFO.bio}
        </p>

        {/* CTAs */}
        <div
          style={{
            ...fadeUp(mounted, 0.46),
            display: "flex",
            gap: "0.8rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#projects"
            style={{
              padding: isMobile ? "0.7rem 1.4rem" : "0.75rem 1.8rem",
              borderRadius: "99px",
              background: "var(--green)",
              color: "#0d0d0d",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 24px rgba(168,255,87,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              padding: isMobile ? "0.7rem 1.4rem" : "0.75rem 1.8rem",
              borderRadius: "99px",
              border: "1px solid var(--border)",
              fontSize: "0.82rem",
              fontWeight: 400,
              color: "var(--muted)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--muted)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--muted)";
            }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* ── Stats bento ── */}
      <div
        style={{
          ...fadeUp(mounted, stacked ? 0.5 : 0.58),
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--border)",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={i}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  isMobile,
}: {
  stat: Stat;
  index: number;
  isMobile: boolean;
}) {
  const radiusMap: Record<number, string> = {
    0: "19px 0 0 0",
    1: "0 19px 0 0",
    2: "0 0 0 19px",
    3: "0 0 19px 0",
  };
  return (
    <div
      style={{
        background: "var(--card)",
        padding: isMobile ? "1.4rem" : "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        borderRadius: radiusMap[index] ?? "0",
      }}
    >
      <div
        style={{
          fontSize: isMobile ? "2rem" : "2.8rem",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--text)",
        }}
      >
        {stat.number}
        <span style={{ color: "var(--green)" }}>{stat.suffix}</span>
      </div>
      <div
        style={{
          fontSize: isMobile ? "0.65rem" : "0.72rem",
          color: "var(--muted)",
          fontWeight: 400,
          letterSpacing: "0.04em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
