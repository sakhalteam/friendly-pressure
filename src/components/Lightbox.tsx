import { useEffect, type ReactNode } from "react";

/**
 * Lightbox — full-screen modal for zooming a photo (or any content).
 * Close on backdrop click or Escape. Locks body scroll while open.
 */
export default function Lightbox({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(3, 10, 16, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: "clamp(16px, 4vw, 48px)",
        cursor: "zoom-out",
        animation: "lb-fade 0.18s ease",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="btn"
        style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
      >
        ✕ Close
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(1100px, 96vw)",
          maxHeight: "90vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
          cursor: "default",
        }}
      >
        {children}
      </div>
    </div>
  );
}
