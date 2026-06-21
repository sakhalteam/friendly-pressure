import { useState } from "react";
import Section from "../components/Section";
import BeforeAfter from "../components/BeforeAfter";
import Lightbox from "../components/Lightbox";
import { gallery, assetUrl } from "../content";

/**
 * Before & after — each card is a draggable wipe slider. Hit "expand" to open
 * a bigger slider in a lightbox.
 */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : gallery[open];

  return (
    <Section id="gallery" eyebrow="Receipts" title="Before & after">
      <p className="muted reveal" style={{ maxWidth: "60ch", marginBottom: 28 }}>
        The fun part. Drag the slider to wipe between the grime and the glory —
        or hit expand for the full-size satisfaction.
      </p>

      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {gallery.map((g, i) => (
          <figure key={i} className="glass reveal" style={{ margin: 0, padding: 14 }}>
            <BeforeAfter
              before={assetUrl(g.before)}
              after={assetUrl(g.after)}
              alt={g.title}
            />
            <figcaption
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{g.title}</span>
              <button
                type="button"
                className="btn"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                onClick={() => setOpen(i)}
              >
                ⤢ Expand
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      <Lightbox open={open !== null} onClose={() => setOpen(null)}>
        {active && (
          <div style={{ width: "min(900px, 96vw)" }}>
            <BeforeAfter
              before={assetUrl(active.before)}
              after={assetUrl(active.after)}
              alt={active.title}
            />
            <p
              style={{
                textAlign: "center",
                marginTop: 12,
                fontWeight: 600,
              }}
            >
              {active.title}
            </p>
          </div>
        )}
      </Lightbox>
    </Section>
  );
}
