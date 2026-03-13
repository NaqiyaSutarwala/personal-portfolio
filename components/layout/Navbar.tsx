"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/portfolio";

/**
 * Responsive Navbar
 * — Desktop: transparent → frosted blur on scroll, inline links + CTA
 * — Mobile:  hamburger → fullscreen overlay with large staggered nav items
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scaleRing = (scale: boolean) => {
    const ring = document.getElementById("cursor-ring");
    if (!ring) return;
    ring.style.width  = scale ? "44px" : "28px";
    ring.style.height = scale ? "44px" : "28px";
  };

  const closeMenu = () => setMenuOpen(false);

  const navBg = scrolled || menuOpen
    ? "rgba(13,13,13,0.97)"
    : "transparent";
  const navBorder = scrolled || menuOpen
    ? "1px solid var(--border)"
    : "1px solid transparent";

  return (
    <>
      {/* ── Top bar ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position:       "fixed",
          top: 0, left: 0, right: 0,
          zIndex:         100,
          padding:        "1.2rem var(--px)",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          background:     navBg,
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom:   navBorder,
          transition:     "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          style={{
            fontWeight:    600,
            fontSize:      "0.95rem",
            letterSpacing: "0.01em",
            position:      "relative",
            zIndex:        101,
          }}
          onMouseEnter={() => scaleRing(true)}
          onMouseLeave={() => scaleRing(false)}
        >
          ns<span style={{ color: "var(--green)" }}>.</span>dev
        </Link>

        {/* ── Desktop links ── */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize:      "0.8rem",
                  color:         "var(--muted)",
                  fontWeight:    400,
                  transition:    "color 0.2s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; scaleRing(true); }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; scaleRing(false); }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              style={{
                padding:      "0.5rem 1.2rem",
                borderRadius: "99px",
                border:       "1px solid var(--border)",
                fontSize:     "0.78rem",
                fontWeight:   500,
                transition:   "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background   = "var(--faint)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor  = "var(--muted)";
                scaleRing(true);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background   = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor  = "var(--border)";
                scaleRing(false);
              }}
            >
              Say hello ↗
            </a>
          </div>
        )}

        {/* ── Hamburger ── */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background:     "none",
              border:         "none",
              cursor:         "none",
              padding:        "0.4rem",
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              alignItems:     "center",
              gap:            "5px",
              width:          32,
              height:         32,
              position:       "relative",
              zIndex:         101,
            }}
          >
            <span style={{
              display:     "block",
              width:       22,
              height:      1.5,
              background:  "var(--text)",
              borderRadius: 2,
              transform:   menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              transition:  "transform 0.3s ease",
            }} />
            <span style={{
              display:     "block",
              width:       22,
              height:      1.5,
              background:  "var(--text)",
              borderRadius: 2,
              opacity:     menuOpen ? 0 : 1,
              transition:  "opacity 0.2s ease",
            }} />
            <span style={{
              display:     "block",
              width:       22,
              height:      1.5,
              background:  "var(--text)",
              borderRadius: 2,
              transform:   menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition:  "transform 0.3s ease",
            }} />
          </button>
        )}
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      {isMobile && (
        <div
          aria-hidden={!menuOpen}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         99,
            background:     "var(--bg)",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            padding:        "6rem var(--px) 3rem",
            opacity:        menuOpen ? 1 : 0,
            pointerEvents:  menuOpen ? "auto" : "none",
            transition:     "opacity 0.35s ease",
          }}
        >
          {/* Large staggered nav links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "3rem" }}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{
                  fontSize:      "clamp(2.2rem, 10vw, 3.5rem)",
                  fontWeight:    600,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.2,
                  color:         "var(--text)",
                  borderBottom:  "1px solid var(--border)",
                  padding:       "0.8rem 0",
                  opacity:       menuOpen ? 1 : 0,
                  transform:     menuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition:    [
                    `opacity 0.4s ${0.05 + i * 0.07}s ease`,
                    `transform 0.4s ${0.05 + i * 0.07}s ease`,
                    "color 0.2s ease",
                  ].join(", "),
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.8rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--green)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              >
                <span style={{
                  fontSize:      "0.6rem",
                  color:         "var(--muted)",
                  fontWeight:    500,
                  letterSpacing: "0.1em",
                  flexShrink:    0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + email */}
          <div
            style={{
              opacity:   menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ${0.1 + NAV_LINKS.length * 0.07}s ease, transform 0.4s ${0.1 + NAV_LINKS.length * 0.07}s ease`,
              display:   "flex",
              flexDirection: "column",
              gap:       "0.9rem",
            }}
          >
            <a
              href="#contact"
              onClick={closeMenu}
              style={{
                display:       "inline-flex",
                alignSelf:     "flex-start",
                padding:       "0.8rem 2rem",
                borderRadius:  "99px",
                background:    "var(--green)",
                color:         "#0d0d0d",
                fontSize:      "0.88rem",
                fontWeight:    600,
                letterSpacing: "0.01em",
              }}
            >
              Say hello ↗
            </a>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
              sutarwalanaqiya16@gmail.com
            </p>
          </div>
        </div>
      )}
    </>
  );
}
