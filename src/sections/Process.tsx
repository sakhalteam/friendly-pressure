import Section from "../components/Section";
import { process } from "../content";

export default function Process() {
  return (
    <Section id="process" eyebrow="How I work" title={process.heading}>
      <p className="muted reveal" style={{ maxWidth: "64ch", marginBottom: 34 }}>
        {process.intro}
      </p>

      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          counterReset: "step",
        }}
      >
        {process.steps.map((s, i) => (
          <li
            key={s.title}
            className="glass glass-hover reveal"
            style={{ padding: 22, position: "relative" }}
          >
            <div
              aria-hidden
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                color: "#05222c",
                background: "linear-gradient(135deg, var(--spray), var(--mint))",
                marginBottom: 14,
              }}
            >
              {i + 1}
            </div>
            <h3 style={{ fontSize: "1.08rem", fontWeight: 700, marginBottom: 8 }}>
              {s.title}
            </h3>
            <p className="muted" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
