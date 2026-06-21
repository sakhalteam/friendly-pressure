import { useState } from "react";
import Section from "../components/Section";
import GrimeReveal from "../components/GrimeReveal";
import Lightbox from "../components/Lightbox";
import { serviceArea, business, assetUrl } from "../content";

export default function ServiceArea() {
  const intro = serviceArea.intro.replace("{homeBase}", business.homeBase);
  const [zoom, setZoom] = useState(false);
  const img = assetUrl(serviceArea.image);

  return (
    <Section id="area" eyebrow="Where" title={serviceArea.heading}>
      <p className="muted reveal" style={{ maxWidth: "60ch", marginBottom: 24 }}>
        {intro}
      </p>

      {/* The grimy map — spray it clean to reveal the service area */}
      <div className="reveal" style={{ marginBottom: 16 }}>
        <GrimeReveal
          src={img}
          alt="Friendly Pressure service area map"
          aspectRatio="16 / 9"
          onActivate={() => setZoom(true)}
        />
        <p className="muted" style={{ fontSize: "0.82rem", marginTop: 8 }}>
          👆 Go ahead — pressure wash the grime off and see where I roam.
        </p>
      </div>

      <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
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
        Not on the list?{" "}
        <a href="#quote" style={{ color: "var(--spray-soft)" }}>
          Ask anyway
        </a>{" "}
        — I'm flexible about a bit of a drive.
      </p>

      <Lightbox open={zoom} onClose={() => setZoom(false)}>
        <img
          src={img}
          alt="Friendly Pressure service area map"
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </Lightbox>
    </Section>
  );
}
