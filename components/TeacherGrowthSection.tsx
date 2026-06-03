"use client";

export function TeacherGrowthSection() {
  return (
    <section className="impact-section" id="impact">
      <div className="impact-inner">
        <div>
          <span className="section-kicker">Built for teacher growth</span>
          <h2>A feedback loop that feels like a coach, not a gradebook.</h2>
        </div>
        <div className="impact-list">
          <article>
            <strong>01</strong>
            <h3>Paste a real classroom moment</h3>
            <p>Use short transcripts from observation notes, recordings, or memory.</p>
          </article>
          <article>
            <strong>02</strong>
            <h3>Get a focused snapshot</h3>
            <p>See participation, question quality, pacing, and a next step.</p>
          </article>
          <article>
            <strong>03</strong>
            <h3>Try one small move tomorrow</h3>
            <p>Leave with a concrete coaching card teachers can actually use.</p>
          </article>
        </div>
      </div>

      <style>{`
        .impact-section {
          padding: 72px 20px;
          background: var(--surface);
        }

        .impact-inner {
          width: min(100%, 1120px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.86fr 1.14fr;
          gap: 42px;
          align-items: start;
        }

        .section-kicker {
          display: inline-flex;
          width: fit-content;
          padding: 7px 13px;
          margin-bottom: 16px;
          border-radius: 999px;
          color: var(--primary);
          background: rgba(70, 72, 212, 0.1);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .impact-section h2 {
          max-width: 430px;
          margin: 0;
          color: var(--on-surface);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 34px;
          font-weight: 900;
          line-height: 1.18;
          letter-spacing: 0;
        }

        .impact-list {
          display: grid;
          gap: 16px;
        }

        .impact-list article {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 18px;
          padding: 22px;
          border: 1px solid rgba(70, 72, 212, 0.09);
          border-radius: 22px;
          background: var(--surface-lowest);
          box-shadow: var(--shadow-1);
        }

        .impact-list strong {
          grid-row: span 2;
          color: var(--secondary);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 22px;
          font-weight: 900;
        }

        .impact-list h3 {
          margin: 0;
          color: var(--on-surface);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 0;
        }

        .impact-list p {
          margin: 6px 0 0;
          color: var(--on-variant);
          line-height: 1.5;
        }

        @media (max-width: 980px) {
          .impact-inner {
            grid-template-columns: 1fr;
          }

          .impact-section h2 {
            max-width: 680px;
          }
        }

        @media (max-width: 680px) {
          .impact-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .impact-list article {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
