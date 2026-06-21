import { useEffect, useRef, type ReactNode } from "react";

/**
 * Section — consistent vertical rhythm + a gentle reveal-on-scroll.
 * Pass an `id` so the nav/anchor links can jump to it.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="section">
      <div className="wrap">
        {(eyebrow || title) && (
          <header className="reveal" style={{ marginBottom: 36 }}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  marginTop: 14,
                }}
              >
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
