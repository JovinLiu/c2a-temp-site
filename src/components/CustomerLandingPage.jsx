import React, { useState } from 'react';

export default function CustomerLandingPage({ onEnterApp }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const portalButtons = [
    {
      label: 'Contract Editor',
      onClick: () => onEnterApp?.(),
      primary: true,
    },
    {
      label: 'Project Overview',
      onClick: () => {},
      disabled: true,
    },
    {
      label: 'Client Files',
      onClick: () => {},
      disabled: true,
    },
    {
      label: 'Settings',
      onClick: () => {},
      disabled: true,
    },
  ];

  return (
    <main className="landing-page">
      <button
        className="landing-page__login-button"
        type="button"
        onClick={() => setLoggedIn((value) => !value)}
      >
        {loggedIn ? 'Logout' : 'Login'}
      </button>

      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/video.webm" type="video/webm" />
      </video>

      <div className="video-overlay" />

      <section className="content-shell">
        {loggedIn ? (
          <div className="portal-card">
            <p className="portal-eyebrow">Welcome back</p>
            <h2 className="portal-title">What would you like to do next?</h2>
            <div className="portal-actions">
              {portalButtons.map((item) => (
                <button
                  key={item.label}
                  className={`portal-action ${item.primary ? 'portal-action--primary' : ''}`}
                  type="button"
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="brand-name">C2A Cabinetry</h1>
            <p className="slogan">
              One stop custom cabinetry solution from China 2 Australia
            </p>
            <p className="status-note">
              Our website is currently under construction.
            </p>

            <div className="contact-list" aria-label="Contact information">
          <p>
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.28.19 2.47.56 3.58a1 1 0 0 1-.25 1.01z" />
              </svg>
            </span>
            <a href="tel:0413685018">0413685018</a>
          </p>
              <p>
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2m0 2v.01L12 13l8-4.99V8H4m16 8V10.24l-7.47 4.67a1 1 0 0 1-1.06 0L4 10.24V16h16z" />
                  </svg>
                </span>
                <a href="mailto:liujovin@gmail.com">liujovin@gmail.com</a>
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
