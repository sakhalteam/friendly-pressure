import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../content";

/**
 * GrimeText — renders a chunk of headline text as two stacked canvases so you
 * can spray grime off the *letters themselves*:
 *
 *   • clean canvas (bottom): the words in a blue gradient + the emoji in its
 *     real colors (drawing the emoji on a canvas avoids the `background-clip:
 *     text` trick that was turning 😂 into a flat blue blob).
 *   • grime canvas (top): muddy splotches masked to the exact glyph silhouette,
 *     erased with the same feathered-circle nozzle as the rest of the site.
 *
 * Both canvases share one text-drawing routine, so clean and grime line up
 * pixel-for-pixel. Font is read from the host element, so it tracks the
 * responsive headline size.
 */
const GRAD = ["#eaffff", "#38e1ff", "#5eead4"]; // foam → spray → mint

export default function GrimeText({
  text,
  radius = 58,
}: {
  text: string;
  radius?: number;
}) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const cleanRef = useRef<HTMLCanvasElement>(null);
  const grimeRef = useRef<HTMLCanvasElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);
  const initialAlpha = useRef(1);
  const lastSample = useRef(0);
  const hideSpray = useRef<number | null>(null);
  const cleanedRef = useRef(false);
  const [cleaned, setCleaned] = useState(false);

  function sampleAlpha(): number {
    const c = grimeRef.current;
    if (!c) return 0;
    const { data } = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);
    let sum = 0;
    for (let i = 3; i < data.length; i += 16) sum += data[i];
    return sum;
  }

  function draw() {
    const host = hostRef.current;
    const cc = cleanRef.current;
    const gc = grimeRef.current;
    if (!host || !cc || !gc) return;

    const cs = getComputedStyle(host);
    const fs = parseFloat(cs.fontSize) || 48;
    const fontStr = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // measure the text at the current (responsive) font size
    const mctx = cc.getContext("2d")!;
    mctx.font = fontStr;
    const m = mctx.measureText(text);
    const ascent = m.actualBoundingBoxAscent || fs * 0.82;
    const descent = m.actualBoundingBoxDescent || fs * 0.22;
    const padX = Math.ceil(fs * 0.14);
    const padY = Math.ceil(fs * 0.14);
    const w = Math.ceil(m.width + padX * 2);
    const h = Math.ceil(ascent + descent + padY * 2);
    const baseline = padY + ascent;

    host.style.width = `${w}px`;
    host.style.height = `${h}px`;

    for (const c of [cc, gc]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      const ctx = c.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = fontStr;
      ctx.textBaseline = "alphabetic";
    }

    // clean layer — gradient words, native-color emoji
    const ctx = cc.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, GRAD[0]);
    grad.addColorStop(0.55, GRAD[1]);
    grad.addColorStop(1, GRAD[2]);
    ctx.fillStyle = grad;
    ctx.fillText(text, padX, baseline);

    // grime layer — muddy blobs, then masked to the glyph silhouette
    const g = gc.getContext("2d")!;
    const muds = ["92, 80, 58", "70, 84, 56", "60, 66, 52", "84, 72, 50"];
    const blobs = Math.max(120, Math.round((w * h) / 500)); // dense grime (~10×)
    for (let i = 0; i < blobs; i++) {
      const bx = Math.random() * w;
      const by = Math.random() * h;
      const r = 8 + Math.random() * fs * 0.55;
      const mud = muds[(Math.random() * muds.length) | 0];
      const a = 0.74 + Math.random() * 0.24;
      const rg = g.createRadialGradient(bx, by, 0, bx, by, r);
      rg.addColorStop(0, `rgba(${mud}, ${a})`);
      rg.addColorStop(1, `rgba(${mud}, 0)`);
      g.fillStyle = rg;
      g.beginPath();
      g.arc(bx, by, r, 0, Math.PI * 2);
      g.fill();
    }
    g.globalCompositeOperation = "destination-in";
    g.fillStyle = "#000";
    g.fillText(text, padX, baseline);
    g.globalCompositeOperation = "source-over";

    initialAlpha.current = sampleAlpha() || 1;
  }

  useEffect(() => {
    draw();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!cleanedRef.current) draw();
      });
    };
    window.addEventListener("resize", onResize);
    // fonts may settle a tick after mount — redraw once
    const t = window.setTimeout(() => !cleanedRef.current && draw(), 120);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function erode(x: number, y: number) {
    if (cleanedRef.current) return;
    const c = grimeRef.current;
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

    const now = performance.now();
    if (now - lastSample.current > 120) {
      lastSample.current = now;
      if (sampleAlpha() / initialAlpha.current < 0.1) finishClean();
    }
  }

  function finishClean() {
    const c = grimeRef.current;
    if (c) {
      const ctx = c.getContext("2d")!;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
    }
    if (sprayRef.current) sprayRef.current.style.opacity = "0";
    cleanedRef.current = true;
    setCleaned(true);
  }

  function local(clientX: number, clientY: number) {
    const r = grimeRef.current!.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }

  const nozzleCursor = `url("${assetUrl("nozzle.svg")}") 4 4, crosshair`;

  return (
    <span
      ref={hostRef}
      aria-label={text}
      role="img"
      onPointerMove={(e) => {
        if (cleaned) return;
        const { x, y } = local(e.clientX, e.clientY);
        erode(x, y);
      }}
      onPointerDown={(e) => {
        if (cleaned || e.pointerType !== "touch") return;
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        const { x, y } = local(e.clientX, e.clientY);
        erode(x, y);
      }}
      onPointerLeave={() => {
        if (sprayRef.current) sprayRef.current.style.opacity = "0";
      }}
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        cursor: cleaned ? "default" : nozzleCursor,
        touchAction: cleaned ? "auto" : "pan-y",
      }}
    >
      <canvas ref={cleanRef} aria-hidden style={canvasStyle} />
      <canvas ref={grimeRef} aria-hidden style={canvasStyle} />
      <div ref={sprayRef} className="spray-fx" aria-hidden />
    </span>
  );
}

const canvasStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  pointerEvents: "none",
};
