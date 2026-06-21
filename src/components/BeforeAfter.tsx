import { useRef, useState } from "react";

/**
 * BeforeAfter — drag the handle to wipe between a before and an after photo.
 * Works with mouse, touch, and keyboard (arrow keys on the handle).
 */
export default function BeforeAfter({
  before,
  after,
  alt = "",
}: {
  before: string;
  after: string;
  alt?: string;
}) {
  const [pos, setPos] = useState(50); // % revealed of the "before" image
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function setFromClientX(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }

  return (
    <div
      ref={ref}
      className="ba"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      style={{
        position: "relative",
        aspectRatio: "4 / 3",
        borderRadius: 12,
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        cursor: "ew-resize",
      }}
    >
      {/* AFTER fills the box */}
      <img
        src={after}
        alt={alt ? `${alt} — after` : "after"}
        draggable={false}
        style={imgStyle}
      />
      {/* BEFORE clipped to the slider position */}
      <img
        src={before}
        alt={alt ? `${alt} — before` : "before"}
        draggable={false}
        style={{ ...imgStyle, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="ba-tag" style={{ left: 10 }}>
        Before
      </span>
      <span className="ba-tag" style={{ right: 10 }}>
        After
      </span>

      {/* Handle */}
      <div
        role="slider"
        aria-label={`${alt} before-and-after slider`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          transform: "translateX(-1px)",
          background: "var(--foam)",
          boxShadow: "0 0 12px rgba(56,225,255,.7)",
          cursor: "ew-resize",
          outline: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 36,
            height: 36,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            color: "#05222c",
            fontWeight: 800,
            background: "linear-gradient(135deg, var(--spray), var(--deep))",
            boxShadow: "0 4px 16px rgba(0,0,0,.45)",
          }}
          aria-hidden
        >
          ⇆
        </div>
      </div>
    </div>
  );
}

const imgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
};
