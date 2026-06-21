import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "../content";

/**
 * GrimeReveal — covers an image in grime that you spray off with the nozzle.
 *
 * Desktop: move the (nozzle) cursor over it — hovering sprays a ~45° cone that
 * erodes the grime. Once it's mostly clean, the cursor returns to normal and
 * the image becomes clickable (e.g. to open in a lightbox).
 *
 * Mobile (coarse pointer): no hover, so a "Hold to pressure wash" button —
 * press and hold, then drag your finger over the image to clean it. A
 * "Clear grime" button is the instant escape hatch (also nice for a11y).
 *
 * The grime is drawn to a <canvas> and erased with `destination-out`, so the
 * real image simply shows through where you've sprayed.
 */
export default function GrimeReveal({
  src,
  alt = "",
  aspectRatio = "16 / 10",
  onActivate,
  radius = 90,
}: {
  src: string;
  alt?: string;
  aspectRatio?: string;
  onActivate?: () => void;
  radius?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);

  const washing = useRef(false); // mobile hold-button active
  const initialAlpha = useRef(1);
  const lastSample = useRef(0);
  const hideSpray = useRef<number | null>(null);

  const [cleaned, setCleaned] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const cleanedRef = useRef(false); // for closures that outlive a render (resize)

  // ── Draw the grime layer ────────────────────────────────────────────────
  const drawGrime = useCallback(() => {
    const c = canvasRef.current;
    const wrap = wrapRef.current;
    if (!c || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const ctx = c.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // muddy palette
    const muds = [
      "92, 80, 58",
      "70, 84, 56",
      "60, 66, 52",
      "84, 72, 50",
      "48, 58, 48",
    ];
    // ~half-coverage of soft blobs
    const area = w * h;
    const blobs = Math.round((area / 9000) * 1.1);
    for (let i = 0; i < blobs; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 16 + Math.random() * Math.min(w, h) * 0.22;
      const mud = muds[(Math.random() * muds.length) | 0];
      const a = 0.6 + Math.random() * 0.32;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${mud}, ${a})`);
      g.addColorStop(0.7, `rgba(${mud}, ${a * 0.8})`);
      g.addColorStop(1, `rgba(${mud}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // fine speckle for texture
    ctx.fillStyle = "rgba(40, 46, 38, 0.5)";
    for (let i = 0; i < blobs * 8; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }

    initialAlpha.current = sampleAlpha() || 1;
  }, []);

  function sampleAlpha(): number {
    const c = canvasRef.current;
    if (!c) return 0;
    const ctx = c.getContext("2d")!;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let sum = 0;
    for (let i = 3; i < data.length; i += 16) sum += data[i]; // sample every 4th px alpha
    return sum;
  }

  // ── Mount: detect pointer type, draw grime, watch for resize ────────────
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    drawGrime();
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!cleanedRef.current) drawGrime();
      });
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawGrime]);

  // ── Spray visual feedback ───────────────────────────────────────────────
  function sprayFx(x: number, y: number) {
    const el = sprayRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${radius * 2}px`;
    el.style.height = `${radius * 2}px`;
    el.style.opacity = "1";
    if (hideSpray.current) window.clearTimeout(hideSpray.current);
    hideSpray.current = window.setTimeout(() => {
      if (sprayRef.current) sprayRef.current.style.opacity = "0";
    }, 110);
  }

  // ── Erode grime at a point with a feathered circle ──────────────────────
  function erode(x: number, y: number) {
    if (cleaned) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.65, "rgba(0,0,0,0.55)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    sprayFx(x, y);

    // throttled "is it clean yet?" check
    const now = performance.now();
    if (now - lastSample.current > 120) {
      lastSample.current = now;
      if (sampleAlpha() / initialAlpha.current < 0.12) finishClean();
    }
  }

  function finishClean() {
    const c = canvasRef.current;
    if (c) {
      const ctx = c.getContext("2d")!;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
    }
    if (sprayRef.current) sprayRef.current.style.opacity = "0";
    cleanedRef.current = true;
    setCleaned(true);
  }

  function localPoint(clientX: number, clientY: number) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top, r };
  }

  // ── Render ──────────────────────────────────────────────────────────────
  const nozzleCursor = `url("${assetUrl("nozzle.svg")}") 4 4, crosshair`;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        ref={wrapRef}
        className="grime-wrap glass"
        onPointerMove={(e) => {
          if (cleaned || e.pointerType === "touch") return;
          const { x, y } = localPoint(e.clientX, e.clientY);
          erode(x, y);
        }}
        onPointerLeave={() => {
          if (sprayRef.current) sprayRef.current.style.opacity = "0";
        }}
        onClick={() => cleaned && onActivate?.()}
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio,
          padding: 0,
          cursor: cleaned ? (onActivate ? "zoom-in" : "default") : nozzleCursor,
          touchAction: "pan-y",
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
        <div ref={sprayRef} className="spray-fx" aria-hidden />

        {cleaned && onActivate && (
          <span className="grime-hint" style={{ bottom: 10, right: 10 }}>
            ⤢ click to enlarge
          </span>
        )}
        {!cleaned && !coarse && (
          <span className="grime-hint" style={{ bottom: 10, left: 10 }}>
            🔫 spray me clean
          </span>
        )}
      </div>

      {/* Controls — hold-to-wash (touch) + clear (everywhere), until clean */}
      {!cleaned && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {coarse && (
            <button
              type="button"
              className="btn primary"
              style={{ touchAction: "none", flex: 1 }}
              onPointerDown={(e) => {
                washing.current = true;
                (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
                e.preventDefault();
              }}
              onPointerMove={(e) => {
                if (!washing.current) return;
                e.preventDefault();
                const { x, y, r } = localPoint(e.clientX, e.clientY);
                if (x >= 0 && y >= 0 && x <= r.width && y <= r.height) erode(x, y);
              }}
              onPointerUp={() => {
                washing.current = false;
              }}
              onPointerCancel={() => {
                washing.current = false;
              }}
            >
              🔫 Hold to pressure wash
            </button>
          )}
          <button type="button" className="btn" onClick={finishClean}>
            Clear grime
          </button>
        </div>
      )}
    </div>
  );
}
