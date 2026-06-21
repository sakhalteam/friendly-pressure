import Section from "../components/Section";
import { services } from "../content";

export default function Services() {
  return (
    <Section id="services" eyebrow="What I do" title="Services">
      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {services.map((s) => (
          <article
            key={s.title}
            className="glass glass-hover shine reveal"
            style={{ position: "relative", overflow: "hidden", padding: 24 }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }} aria-hidden>
              {s.icon}
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
              {s.title}
            </h3>
            <p className="muted" style={{ fontSize: "0.97rem", lineHeight: 1.5 }}>
              {s.blurb}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
