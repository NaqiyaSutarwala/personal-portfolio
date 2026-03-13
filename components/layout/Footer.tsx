/**
 * Site footer — minimal, Server Component.
 */
export function Footer() {
  return (
    <footer
      style={{
        borderTop:      "1px solid var(--border)",
        padding:        "1.5rem var(--px)",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexWrap:       "wrap",
        gap:            "0.5rem",
        position:       "relative",
        zIndex:         1,
      }}
    >
      <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--green)" }}>Naqiya Sutarwala</span>
      </p>
      <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
        Built with{" "}
        <span style={{ color: "var(--green)" }}>Next.js 15</span>
        {" · "}TypeScript
      </p>
    </footer>
  );
}
