import React from "react";
import Logo from "../assets/32.png"
const footerLinks = [
  { group: "Navigation", links: ["Home", "About", "Services", "Blog", "Contact"] },
  { group: "Solutions", links: ["MVP Development", "Web & PWA", "Mobile Apps", "Cross-Platform"] },
];

const socials = [
  {
    name: "Instagram",
    color: "#E1306C",
    href: "https://www.instagram.com/navrasa_it_solutions?igsh=NHJ4MWZzZWplNm1q",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  // {
  //   name: "WhatsApp",
  //   color: "#25D366",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "YouTube",
  //   color: "#FF0000",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
  //       <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  //     </svg>
  //   ),
  // },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/company/navrasa-it-solutions/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  // {
  //   name: "GitHub",
  //   color: "#333",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
  //       <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "Facebook",
  //   color: "#1877F2",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
  //       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  //     </svg>
  //   ),
  // },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

  .nr-footer {
    position: relative;
    width: 100%;
    padding: 5rem 1.5rem 3rem;
    overflow: hidden;
    background: #f9f9f8;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }

  .nr-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(100px);
    opacity: 0.55;
  }
  .nr-blob-1 { width: 520px; height: 520px; top: -80px; left: -120px; background: radial-gradient(circle, #c7d7f7 0%, transparent 70%); animation: blobPulse 8s ease-in-out infinite; }
  .nr-blob-2 { width: 420px; height: 420px; bottom: -60px; right: -80px; background: radial-gradient(circle, #f7c7e0 0%, transparent 70%); animation: blobPulse 10s ease-in-out 2s infinite; }
  .nr-blob-3 { width: 300px; height: 300px; top: 40%; left: 50%; transform: translate(-50%, -50%); background: radial-gradient(circle, #c7f0e0 0%, transparent 70%); animation: blobPulse3 12s ease-in-out 1s infinite; }

  @keyframes blobPulse { 0%, 100% { transform: scale(1); opacity: 0.55; } 50% { transform: scale(1.12); opacity: 0.75; } }
  @keyframes blobPulse3 { 0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.55; } 50% { transform: translate(-50%,-50%) scale(1.12); opacity: 0.75; } }

  .nr-bg-text {
    position: absolute;
    bottom: -0.15em;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(60px, 14vw, 220px);
    font-weight: 700;
    letter-spacing: -0.04em;
    white-space: nowrap;
    line-height: 1;
    pointer-events: none;
    z-index: 1;
    user-select: none;
    background: linear-gradient(to bottom, rgba(17,17,17,0.055) 0%, rgba(17,17,17,0.025) 60%, rgba(17,17,17,0) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1.5px rgba(17,17,17,0.07);
    animation: bgTextDrift 18s ease-in-out infinite;
  }

  @keyframes bgTextDrift { 0%, 100% { letter-spacing: -0.04em; opacity: 1; } 50% { letter-spacing: -0.02em; opacity: 0.85; } }

  .nr-wrapper {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nr-card {
    position: relative;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255,255,255,0.85);
    border-radius: 32px;
    padding: 3.5rem 3rem;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.4) inset, 0 4px 6px rgba(0,0,0,0.02), 0 12px 32px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.08);
    overflow: hidden;
    box-sizing: border-box;
  }
  .nr-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, transparent);
  }

  /* ── TOP GRID: brand | nav | solutions | socials ── */
  .nr-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.4fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
    align-items: start;
  }

  .nr-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    font-weight: 700;
    color: #111;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: baseline;
    gap: 2px;
  }
  .nr-brand-dot { font-style: italic; color: #888; }

  .nr-brand-tagline {
    font-size: 13px;
    color: #888;
    font-weight: 300;
    line-height: 1.85;
    max-width: 280px;
    margin-bottom: 2rem;
  }

  .nr-start-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
    white-space: nowrap;
  }
  .nr-start-btn svg { transition: transform 0.25s; }
  .nr-start-btn:hover { background: #333; transform: scale(1.04); }
  .nr-start-btn:hover svg { transform: translate(3px, -3px); }

  .nr-col-title {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #bbb;
    margin-bottom: 1.5rem;
  }
  .nr-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.9rem; }
  .nr-links a {
    font-size: 13.5px;
    font-weight: 400;
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nr-links a::before {
    content: '';
    width: 0;
    height: 1px;
    background: #111;
    transition: width 0.25s;
    flex-shrink: 0;
  }
  .nr-links a:hover { color: #111; }
  .nr-links a:hover::before { width: 14px; }
  .nr-disabled-link {
  font-size: 13.5px;
    font-weight: 400;
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 6px; 
    cursor:default;
  }
  .nr-socials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .nr-social-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    border-radius: 12px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(0,0,0,0.07);
    text-decoration: none;
    color: #555;
    font-size: 11.5px;
    font-weight: 500;
    transition: all 0.25s;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
  }
  .nr-social-icon {
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nr-social-btn:hover {
    background: rgba(255,255,255,0.95);
    border-color: rgba(0,0,0,0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    color: #111;
  }

  .nr-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent);
    margin-bottom: 2rem;
  }

  .nr-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .nr-copy {
    font-size: 10.5px;
    color: #bbb;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .nr-legal { display: flex; gap: 2rem; }
  .nr-legal a {
    font-size: 10.5px;
    color: #bbb;
    text-decoration: none;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nr-legal a:hover { color: #111; }

  /* ── TABLET: 600–900px ── */
  @media (max-width: 900px) {
    .nr-card { padding: 2.5rem 2rem; border-radius: 24px; }
    .nr-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 2rem;
    }
    .nr-brand-col { grid-column: 1 / -1; }
    .nr-links-group { grid-column: auto; }
    .nr-socials-col { grid-column: 1 / -1; }
    .nr-socials {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ── MOBILE: ≤600px ── */
  @media (max-width: 600px) {
    .nr-footer { padding: 3rem 1rem 2.5rem; }
    .nr-card { padding: 2rem 1.25rem; border-radius: 20px; }
    .nr-grid {
      grid-template-columns: 1fr 1fr;
      gap: 1.75rem;
    }
    .nr-brand-col {
      grid-column: 1 / -1;
    }
    .nr-links-group {
      grid-column: auto;
    }
    .nr-socials-col {
      grid-column: 1 / -1;
    }
    .nr-brand-name { font-size: 2rem; }
    .nr-brand-tagline { font-size: 12.5px; max-width: 100%; }
    .nr-socials {
      grid-template-columns: repeat(2, 1fr);
    }
    .nr-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .nr-legal { gap: 1.25rem; }
    .nr-bg-text { font-size: clamp(48px, 12vw, 90px); }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="nr-footer">

        <div className="nr-blob nr-blob-1" />
        <div className="nr-blob nr-blob-2" />
        <div className="nr-blob nr-blob-3" />

        <div className="nr-bg-text" aria-hidden="true">NAVRASA</div>

        <div className="nr-wrapper">
          <div className="nr-card">

            <div className="nr-grid">

              <div className="nr-brand-col">
                <div className="nr-brand-name">
                  <a href="/">

                    <img src={Logo} alt="" className="h-11" />
                  </a>
                </div>
                <p className="nr-brand-tagline">
                  We build MVPs, high-performance websites, and mobile apps
                  that grow your business — for clients from Jaipur to Dubai.
                </p>
                <a href="/contact" className="nr-start-btn">
                  Start a Project
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {footerLinks.map((col, i) => (
                <div key={i} className="nr-links-group">
                  <div className="nr-col-title">{col.group}</div>
                  <ul className="nr-links">
                    {col.links.map(link => (
                      <li key={link}>
                        {col.group === "Solutions" ? (
                          <span className="nr-disabled-link">{link}</span>
                        ) : (
                          <a href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}>
                            {link}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}


              <div className="nr-socials-col">
                <div className="nr-col-title">Follow Us</div>
                <div className="nr-socials">
                  {socials.map(s => (
                    <a key={s.name} href={s.href} className="nr-social-btn" title={s.name} target="_blank">
                      <div
                        className="nr-social-icon"
                        style={{ background: `${s.color}18`, color: s.color }}
                      >
                        {s.icon}
                      </div>
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            <div className="nr-divider" />

            <div className="nr-bottom">
              <p className="nr-copy">© 2026 NavRasa — Building Products That Matter</p>
              <div className="nr-legal">
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                {/* <a href="/sitemap">Sitemap</a> */}
              </div>
            </div>

          </div>
        </div>

      </footer>
    </>
  );
}