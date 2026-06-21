import Droplets from "../components/Droplets";
import GrimeText from "../components/GrimeText";
import { hero, business } from "../content";

export default function Hero() {
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Droplets count={18} />

      <div className="wrap" style={{ position: "relative", zIndex: 1, padding: "120px 22px 80px" }}>
        <span className="eyebrow reveal in" style={{ marginBottom: 22 }}>
          💧 {business.name}
        </span>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 7vw, 4.6rem)",
            fontWeight: 900,
            maxWidth: "18ch",
            marginTop: 20,
            marginBottom: 0,
            lineHeight: 1.04,
          }}
        >
          <span className="h-gradient">{hero.headlineLead} </span>
          <GrimeText text={hero.headlineGrimy} />
        </h1>

        <p
          className="muted"
          style={{
            fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
            maxWidth: "56ch",
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          {hero.sub}
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <a href="#quote" className="btn primary">
            {hero.primaryCta} →
          </a>
          <a href="#gallery" className="btn">
            {hero.secondaryCta}
          </a>
        </div>

        <p className="muted" style={{ marginTop: 22, fontSize: "0.9rem" }}>
          ⭐ 7 happy neighbors and counting · word-of-mouth only (so far)
        </p>
      </div>
    </header>
  );
}
