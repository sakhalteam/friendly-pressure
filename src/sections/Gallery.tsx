import Section from "../components/Section";
import { gallery } from "../content";

/**
 * Before & after. Each item shows a draggable slider when real photos exist;
 * until then it shows a friendly placeholder so layout looks right.
 * Drop photos in /public/gallery and set `before`/`after` paths in content.ts.
 */
export default function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="Receipts"
      title="Before & after"
    >
      <p className="muted reveal" style={{ maxWidth: "60ch", marginBottom: 28 }}>
        The fun part. Slide to see the difference — or just enjoy the satisfying
        before/after. (Real photos going here as I knock out more jobs.)
      </p>

      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {gallery.map((g) => (
          <figure
            key={g.title}
            className="glass reveal"
            style={{ margin: 0, padding: 14 }}
          >
            <div
              className="shine"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                aspectRatio: "4 / 3",
                background:
                  g.before && g.after
                    ? `url(${g.after}) center/cover`
                    : "linear-gradient(135deg, #0e2a36, #123b4a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!(g.before && g.after) && (
                <span className="muted" style={{ fontSize: "0.9rem" }}>
                  📸 {g.title} — photo coming soon
                </span>
              )}
            </div>
            <figcaption
              style={{
                marginTop: 12,
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {g.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
