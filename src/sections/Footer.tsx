import { footer, business } from "../content";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 0 60px",
        marginTop: 40,
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>
            💧 {business.name}
          </div>
          <p className="muted" style={{ fontSize: "0.9rem", marginTop: 6 }}>
            {footer.line}
          </p>
          <p className="muted" style={{ fontSize: "0.85rem", marginTop: 4 }}>
            {footer.referral}
          </p>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: "0.9rem", alignItems: "center" }}>
          <a href={business.phoneHref} className="muted">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="muted">
            Email
          </a>
          <a
            href="https://sakhalteam.github.io"
            className="muted"
            title="Built by sakhalteam"
            style={{ opacity: 0.6 }}
          >
            sakhalteam ↗
          </a>
        </div>
      </div>

      <p
        className="muted wrap"
        style={{ fontSize: "0.78rem", marginTop: 24, opacity: 0.7 }}
      >
        © {new Date().getFullYear()} {business.name}. Built with a smile.
      </p>
    </footer>
  );
}
