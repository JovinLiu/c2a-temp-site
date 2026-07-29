import React from 'react';

export default function CustomerLandingPage({ onEnterApp }) {
  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <div className="landing-page__brand">
          <div className="landing-page__brand-mark">C2A</div>
          <div>
            <h1>Agreement Suite</h1>
            <p>Client-ready agreement presentation and management</p>
          </div>
        </div>

        <button className="button button--primary landing-page__cta" type="button" onClick={onEnterApp}>
          Open Agreement App
        </button>
      </header>

      <main className="landing-page__content">
        <section className="landing-page__hero">
          <div className="landing-page__copy">
            <p className="landing-page__eyebrow">Customer-facing agreement portal</p>
            <h2>Present agreements clearly, professionally, and with confidence.</h2>
            <p>
              This experience gives your clients a polished overview before they enter the full agreement
              workspace. From here, they can move into the app to review, edit, print, and export contracts.
            </p>

            <div className="landing-page__actions">
              <button className="button button--primary" type="button" onClick={onEnterApp}>
                Enter the Agreement App
              </button>
              <span className="landing-page__hint">Secure, simple, and ready for client use</span>
            </div>
          </div>

          <div className="landing-page__card">
            <h3>What the app supports</h3>
            <ul>
              <li>Multi-agreement editing experience</li>
              <li>Printable contract preview</li>
              <li>Quick export to JSON and PDF workflow</li>
              <li>Auto-saved drafts for continued work</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
