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
          gap: 18,
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.4fr)",
          alignItems: "stretch",
        }}
      >
        {/* The rate */}
        <div
          className="glass glass-hover reveal"
          style={{
            padding: 28,
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          <div className="muted" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            Typical rate
          </div>
          <div
            className="h-gradient"
            style={{ fontSize: "clamp(2.4rem, 6vw, 3.4rem)", fontWeight: 900, margin: "6px 0" }}
          >
            {pricing.rate}
          </div>
          <div className="muted" style={{ fontSize: "1rem", fontWeight: 600 }}>
            {pricing.rateUnit}
          </div>
        </div>

        {/* What flexes the rate */}
        <div className="reveal" style={{ display: "grid", gap: 14 }}>
          {pricing.factors.map((f) => (
            <div
              key={f.label}
              className="glass glass-hover"
              style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}
            >
              <div style={{ fontSize: "1.6rem", lineHeight: 1 }} aria-hidden>
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{f.label}</div>
                <div className="muted" style={{ fontSize: "0.92rem", lineHeight: 1.45 }}>
                  {f.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="glass reveal"
        style={{
          marginTop: 18,
          padding: "16px 20px",
          borderColor: "rgba(94,234,212,0.35)",
        }}
      >
        <p style={{ fontSize: "0.98rem", lineHeight: 1.55 }}>
          👋 {pricing.inPerson}
        </p>
      </div>

      <p className="muted reveal" style={{ marginTop: 18, fontSize: "0.92rem", maxWidth: "64ch" }}>
        {pricing.footnote}
      </p>
    </Section>
  );
}
