import Section from "../components/Section";
import { serviceArea, business } from "../content";

export default function ServiceArea() {
  const intro = serviceArea.intro.replace("{homeBase}", business.homeBase);

  return (
    <Section id="area" eyebrow="Where" title={serviceArea.heading}>
      <p className="muted reveal" style={{ maxWidth: "60ch", marginBottom: 26 }}>
        {intro}
      </p>

      <div
        className="reveal"
        style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
      >
        {serviceArea.towns.map((t) => (
          <span
            key={t}
            className="glass"
            style={{
              padding: "0.55rem 1rem",
              borderRadius: 999,
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            📍 {t}
          </span>
        ))}
      </div>

      <p className="muted reveal" style={{ marginTop: 22, fontSize: "0.9rem" }}>
        Not on the list? <a href="#quote" style={{ color: "var(--spray-soft)" }}>Ask anyway</a> — I'm flexible about a bit of a drive.
      </p>
    </Section>
  );
}
