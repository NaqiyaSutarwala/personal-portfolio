export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", letterSpacing: "0.2em", color: "var(--ink-3)", animation: "pulse 1.4s ease-in-out infinite" }}>
        LOADING
      </p>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.2} }`}</style>
    </div>
  );
}
