import { useState, type FormEvent } from "react";
import Section from "../components/Section";
import { quote, business } from "../content";

/**
 * Quote form.
 *
 * Zero-backend by design: on submit it composes a mailto: so the visitor's
 * email app opens pre-filled. Works on a static GitHub Pages site with no
 * server, no API keys, nothing to maintain.
 *
 * UPGRADE PATH (when you want quotes to land in an inbox automatically):
 *   - Formspree: set action="https://formspree.io/f/XXXX", method="POST"
 *     on the <form> and delete the onSubmit handler.
 *   - Or Netlify Forms / a tiny serverless function.
 */
export default function QuoteForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const address = String(data.get("address") || "");
    const job = String(data.get("job") || "");

    const subject = `Quote request — ${name || "new client"}`;
    const body = [
      `Hi Nic,`,
      ``,
      `I'd like a quote.`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address / area: ${address}`,
      ``,
      `What I need cleaned:`,
      job,
    ].join("\n");

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section id="quote" eyebrow="No pressure" title={quote.heading}>
      <div
        style={{
          display: "grid",
          gap: 32,
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
          alignItems: "start",
        }}
      >
        {/* Left: pitch + direct contact */}
        <div className="reveal" style={{ display: "grid", gap: 18 }}>
          <p className="muted" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
            {quote.intro}
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            <a href={business.phoneHref} className="btn">
              📞 {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="btn">
              ✉️ {business.email}
            </a>
          </div>
          <p className="muted" style={{ fontSize: "0.85rem" }}>
            Prefer to text? That number works for texts too.
          </p>
        </div>

        {/* Right: the form */}
        <form className="glass reveal" style={{ padding: 24, display: "grid", gap: 16 }} onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" className="field" required placeholder="Jane Neighbor" />
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="phone">Phone or email</label>
            <input id="phone" name="phone" className="field" required placeholder="So I can get back to you" />
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="address">Address or area</label>
            <input id="address" name="address" className="field" placeholder="Street, or just the neighborhood" />
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="job">What needs cleaning?</label>
            <textarea
              id="job"
              name="job"
              className="field"
              rows={4}
              placeholder="Driveway + front of the house. There's some green stuff on the north side…"
            />
          </div>

          <button type="submit" className="btn primary" style={{ width: "100%" }}>
            Send it my way →
          </button>

          {sent && (
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--mint)",
                textAlign: "center",
              }}
            >
              {quote.successNote}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
