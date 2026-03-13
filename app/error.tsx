"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "5rem",
          color: "var(--accent)",
        }}
      >
        ERR
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--ink-2)",
        }}
      >
        {error.message ?? "Something went wrong."}
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          padding: "0.6rem 1.4rem",
          background: "var(--ink)",
          color: "var(--bg)",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.08em",
        }}
      >
        TRY AGAIN
      </button>
    </main>
  );
}
