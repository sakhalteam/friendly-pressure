import Section from "../components/Section";
import { about } from "../content";

export default function About() {
  return (
    <Section id="about" eyebrow="The human" title={about.heading}>
      <div
        style={{
          display: "grid",
          gap: 32,
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
          alignItems: "start",
        }}
      >
        {/* Photo */}
        <div
          className="glass reveal"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius)",
            aspectRatio: "4 / 5",
            background: about.photo
              ? `url(${about.photo}) center/cover`
              : "linear-gradient(135deg, #0e2a36, #0b1f2b)",
            display: "flex",
            alignItems: "flex-end",
            minHeight: 280,
          }}
        >
          {!about.photo && (
            <span
              className="muted"
              style={{ padding: 18, fontSize: "0.9rem" }}
            >
              📷 A friendly photo of Nic goes here
            </span>
          )}
        </div>

        {/* Story */}
        <div className="reveal" style={{ display: "grid", gap: 18 }}>
          {about.body.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 0 ? "1.2rem" : "1.02rem",
                lineHeight: 1.6,
                color: i === 0 ? "var(--text)" : "var(--muted)",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
