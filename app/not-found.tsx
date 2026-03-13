import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        gap: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 20vw, 12rem)",
          color: "var(--border)",
          lineHeight: 1,
        }}
      >
        404
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.82rem",
          color: "var(--ink-2)",
        }}
      >
        Page not found.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          color: "var(--accent)",
          letterSpacing: "0.06em",
        }}
      >
        ← BACK HOME
      </Link>
    </main>
  );
}
