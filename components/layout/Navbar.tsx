"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { NavLink } from "@/types/portfolio";

export function Navbar({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const onResize = () => setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/#about" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          Naqiya
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={`/${link.href}`}>
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="/#contact">
            Contact
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <div id="menu" className={open ? "menu is-open" : "menu"} inert={!open}>
        {[...links, { label: "Contact", href: "#contact" }].map((link, index) => (
          <a
            key={link.href}
            href={`/${link.href}`}
            onClick={close}
            style={{ "--order": index } as CSSProperties}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
