import Section from "../components/Section";
import { pricing } from "../content";

export default function Pricing() {
  return (
    <Section id="pricing" eyebrow="Honest numbers" title="Ballpark pricing">
      <p className="muted reveal" style={{ maxWidth: "62ch", marginBottom: 30 }}>
        {pricing.intro}
      </p>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {pricing.ranges.map((r) => (
          <div key={r.label} className="glass glass-hover reveal" style={{ padding: 22 }}>
            <div className="muted" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              {r.label}
            </div>
            <div
              style={{
                fontSize: "1.9rem",
                fontWeight: 800,
                margin: "6px 0 4px",
              }}
              className="h-gradient"
            >
              {r.range}
            </div>
            <div className="muted" style={{ fontSize: "0.85rem" }}>
              {r.note}
            </div>
          </div>
        ))}
      </div>

      <p
        className="muted reveal"
        style={{ marginTop: 24, fontSize: "0.92rem", maxWidth: "62ch" }}
      >
        {pricing.footnote}
      </p>
    </Section>
  );
}
