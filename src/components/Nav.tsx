import { useEffect, useState } from "react";
import { business } from "../content";

const links = [
  ["Services", "#services"],
  ["Gallery", "#gallery"],
  ["Pricing", "#pricing"],
  ["About", "#about"],
  ["Area", "#area"],
];

/**
 * Sticky top nav. Goes frosted once you scroll past the hero.
 * Mobile collapses to just the logo + the quote CTA (keeps it clean).
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(7, 20, 28, 0.7)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <a href="#top" style={{ fontWeight: 800, textDecoration: "none", fontSize: "1.05rem" }}>
          💧 {business.name}
        </a>

        <div
          className="no-scrollbar"
          style={{ display: "flex", alignItems: "center", gap: 22, overflowX: "auto" }}
        >
          <div style={{ display: "flex", gap: 22 }} className="nav-links">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="muted"
                style={{ textDecoration: "none", fontSize: "0.92rem", whiteSpace: "nowrap" }}
              >
                {label}
              </a>
            ))}
          </div>
          <a href="#quote" className="btn primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
            Get a quote
          </a>
        </div>
      </div>
    </nav>
  );
}
