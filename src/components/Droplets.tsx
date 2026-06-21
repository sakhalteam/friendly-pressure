import { useMemo } from "react";

/**
 * Droplets — decorative falling water droplets.
 * Purely visual (pointer-events: none via .droplet). Drop it inside any
 * `position: relative` container. Tweak `count` for more/less rain.
 */
export default function Droplets({ count = 14 }: { count?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
        scale: 0.6 + Math.random() * 1.1,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
    >
      {drops.map((d) => (
        <span
          key={d.id}
          className="droplet"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            transform: `scale(${d.scale})`,
          }}
        />
      ))}
    </div>
  );
}
