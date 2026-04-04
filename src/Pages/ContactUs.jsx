import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   body { background: #f9f9f8; }

  .contact-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    overflow-x: hidden;
    background: #f9f9f8;
    box-sizing: border-box;
  }

  /* HERO — identical to About */
  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 120%;
    object-fit: cover;
    will-change: transform;
    filter: brightness(0.38) saturate(0.5);
    top: -10%;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(249,249,248,0) 0%, rgba(249,249,248,0.08) 60%, rgba(249,249,248,1) 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }
  .hero-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeUp 0.9s ease 0.2s forwards;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(4rem, 10vw, 9rem);
    font-weight: 400;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.02em;
    opacity: 0;
    animation: fadeUp 1s ease 0.45s forwards;
  }
  .hero-title em { font-style: italic; color: rgba(255,255,255,0.6); }
  .hero-sub {
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    margin-top: 1.5rem;
    letter-spacing: 0.04em;
    opacity: 0;
    animation: fadeUp 1s ease 0.7s forwards;
  }
  .scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 1s ease 1.4s forwards;
  }
  .scroll-hint span {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
    animation: scrollPulse 2s ease infinite;
  }

  /* SECTION COMMONS */
  .section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 0.75rem;
  }

  /* CONTACT SECTION */
  .contact-section {
    padding: 7rem 2rem 5rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .contact-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 4.5rem;
  }
  .contact-header-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 400;
    line-height: 1.1;
    color: #111;
  }
  .contact-header-left h2 em { font-style: italic; color: #888; }
  .contact-header-right p {
    font-size: 15px;
    line-height: 1.85;
    color: #666;
    font-weight: 300;
    max-width: 380px;
  }

  /* FORM + INFO BENTO */
  .contact-body {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 1.5px;
    background: #e0e0de;
    border: 1.5px solid #e0e0de;
    border-radius: 24px;
    overflow: hidden;
  }

  /* LEFT dark info panel */
  .contact-info {
    background: #111;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .info-heading {
    font-family: 'Playfair Display', serif;
    font-size: 1.65rem;
    font-weight: 400;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 0.6rem;
  }
  .info-heading em { font-style: italic; color: rgba(255,255,255,0.4); }
  .info-desc {
    font-size: 14px;
    line-height: 1.85;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
  }
  .detail-list { display: flex; flex-direction: column; gap: 1.4rem; }
  .detail-item { display: flex; align-items: flex-start; gap: 1rem; }
  .detail-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.3s;
  }
  .detail-item:hover .detail-icon { background: rgba(255,255,255,0.13); }
  .detail-icon svg {
    width: 15px; height: 15px;
    stroke: rgba(255,255,255,0.5);
    fill: none; stroke-width: 1.6;
    stroke-linecap: round; stroke-linejoin: round;
  }
  .detail-label {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    font-weight: 400;
    display: block;
    margin-bottom: 3px;
  }
  .detail-value {
    font-size: 14px;
    color: rgba(255,255,255,0.68);
    font-weight: 300;
    line-height: 1.5;
  }
  .socials-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .social-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 50px;
    border: 1px solid rgba(255,255,255,0.12);
    text-decoration: none;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
    transition: all 0.25s;
  }
  .social-pill:hover {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.8);
    border-color: rgba(255,255,255,0.25);
  }
  .social-pill svg { width: 13px; height: 13px; fill: currentColor; }

  /* RIGHT form */
  .contact-form-wrap {
    background: #f9f9f8;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 0.3s;
  }
  .contact-form-wrap:hover { background: #fff; }
  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 500;
    color: #111;
    margin-bottom: 4px;
  }
  .form-subtitle {
    font-size: 13px;
    color: #aaa;
    font-weight: 300;
    margin-bottom: 2.25rem;
  }
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 1.5rem;
  }
  .form-field { position: relative; margin-bottom: 1.75rem; }
  .form-field.full { grid-column: span 2; }
  .form-field > label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #bbb;
    margin-bottom: 8px;
    font-weight: 400;
    transition: color 0.2s;
  }
  .form-field:focus-within > label { color: #555; }
  .field-line {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e0e0de;
    padding-bottom: 8px;
    transition: border-color 0.25s;
  }
  .form-field:focus-within .field-line { border-color: #888; }
  .field-icon svg {
    width: 15px; height: 15px;
    stroke: #ccc; fill: none;
    stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
    transition: stroke 0.25s;
    display: block;
    flex-shrink: 0;
  }
  .form-field:focus-within .field-icon svg { stroke: #888; }
  .form-field input,
  .form-field textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #333;
    width: 100%;
    resize: none;
  }
  .form-field input::placeholder,
  .form-field textarea::placeholder { color: #ccc; }

  /* chips */
  .chips-wrap { display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 0 8px; }
  .chip {
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.08em;
    padding: 5px 14px;
    border-radius: 50px;
    border: 1px solid #e0e0de;
    color: #aaa; cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
  }
  .chip.active, .chip:hover { background: #111; border-color: #111; color: #fff; }

  /* submit row */
  .submit-row {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
  }
  .submit-note { font-size: 12px; color: #ccc; font-weight: 300; }
  .submit-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background: #111;
    border: none;
    border-radius: 50px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .submit-btn:hover::before { opacity: 1; }
  .submit-btn:active { transform: scale(0.97); }
  .submit-btn svg {
    width: 14px; height: 14px;
    stroke: rgba(255,255,255,0.6);
    fill: none; stroke-width: 1.8;
    stroke-linecap: round; stroke-linejoin: round;
    transition: transform 0.2s;
  }
  .submit-btn:hover svg { transform: translateX(3px); }

  /* success */
  .success-msg {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; gap: 1rem;
    padding: 3rem 2rem; height: 100%;
  }
  .success-circle {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: #f0f0ee;
    display: flex; align-items: center; justify-content: center;
  }
  .success-circle svg {
    width: 24px; height: 24px;
    stroke: #555; fill: none;
    stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
  }
  .success-msg h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 500; color: #111;
  }
  .success-msg p { font-size: 14px; color: #999; font-weight: 300; line-height: 1.7; max-width: 280px; }
  .reset-btn {
    margin-top: 0.5rem;
    background: none;
    border: 1px solid #e0e0de;
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 12px; color: #888;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.1em; text-transform: uppercase;
    transition: all 0.2s;
  }
  .reset-btn:hover { background: #f0f0ee; color: #555; }

  /* MAP */
  .map-section {
    padding: 5rem 2rem 8rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .map-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 2.5rem;
  }
  .map-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    line-height: 1.1;
    color: #111;
  }
  .map-header h2 em { font-style: italic; color: #bbb; }
  .map-header p { font-size: 14px; line-height: 1.85; color: #888; font-weight: 300; }
  .map-frame-wrap {
    border-radius: 24px;
    overflow: hidden;
    border: 1.5px solid #e0e0de;
    background: #f0f0ee;
  }
  .map-frame-wrap iframe {
    width: 100%; height: 420px;
    display: block; border: none;
    filter: grayscale(55%) contrast(1.05);
    transition: filter 0.4s;
  }
  .map-frame-wrap:hover iframe { filter: grayscale(0%) contrast(1); }
  .map-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e8e8e6;
    background: #f9f9f8;
  }
  .map-caption-left { display: flex; align-items: center; gap: 10px; }
  .map-dot {
    width: 8px; height: 8px;
    border-radius: 50%; background: #111;
    animation: mapPulse 2.5s ease infinite;
  }
  .map-caption span { font-size: 13px; color: #888; font-weight: 300; }
  .map-link {
    font-size: 12px; color: #555; text-decoration: none;
    letter-spacing: 0.1em; text-transform: uppercase; font-weight: 400;
    border-bottom: 1px solid #ccc; padding-bottom: 1px;
    transition: all 0.2s;
  }
  .map-link:hover { color: #111; border-color: #111; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 1; transform: scaleY(1); }
    50%       { opacity: 0.4; transform: scaleY(0.6); }
  }
  @keyframes mapPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
    50%       { box-shadow: 0 0 0 8px rgba(0,0,0,0); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }
  .reveal-delay-3 { transition-delay: 0.36s; }

  @media (max-width: 800px) {
    .contact-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .contact-body   { grid-template-columns: 1fr; }
    .form-grid      { grid-template-columns: 1fr; }
    .form-field.full { grid-column: span 1; }
    .submit-row     { grid-column: span 1; flex-direction: column; gap: 1rem; align-items: stretch; }
    .submit-btn     { justify-content: center; }
    .map-header     { grid-template-columns: 1fr; gap: 1.5rem; }
  }
`;

const SERVICES = ["Cloud Solutions", "Cybersecurity", "AI & Automation", "DevOps", "IT Consulting", "24/7 Support"];

const useParallax = () => {
  useEffect(() => {
    const img = document.querySelector('.hero-img');
    const handler = () => {
      if (img) img.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
};

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function ContactPage() {
  useParallax();
  useReveal();

  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [chips, setChips] = useState([]);
  const [sent, setSent] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const toggleChip = s => setChips(c => c.includes(s) ? c.filter(x => x !== s) : [...c, s]);
  const onSubmit = e => { e.preventDefault(); setSent(true); };
  const reset = () => { setSent(false); setForm({ name:"", phone:"", email:"", company:"", message:"" }); setChips([]); };

  return (
    <>
      <style>{styles}</style>
      <div className="contact-root">

        {/* HERO */}
        <section className="hero">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1608249889684-e91ddbdd47cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Office"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">IT Services Company · Let's Talk</p>
            <h1 className="hero-title">Contact <em>Us</em></h1>
            <p className="hero-sub">Every great project starts with a conversation.</p>
          </div>
          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="contact-header reveal">
            <div className="contact-header-left">
              <p className="section-label">Get In Touch</p>
              <h2>Let's build something<br /><em>remarkable</em> together.</h2>
            </div>
            <div className="contact-header-right reveal reveal-delay-2">
              <p>Whether you're exploring ideas, need a tech partner, or just want to say hello — our team responds within 24 hours, no exceptions.</p>
            </div>
          </div>

          <div className="contact-body reveal reveal-delay-1">

            {/* LEFT: dark info */}
            <div className="contact-info">
              <div>
                <h2 className="info-heading">We're always<br /><em>here for you.</em></h2>
                <p className="info-desc" style={{marginTop:'0.75rem'}}>Drop us a message, give us a ring, or stop by the office. The best partnerships start with an open door.</p>
              </div>

              <div className="detail-list">
                {[
                  {
                    label: "Office",
                    value: "42 Innovation Drive, Tech Park\nBengaluru, Karnataka 560001",
                    icon: <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  },
                  {
                    label: "Phone",
                    value: "+91 98765 43210",
                    icon: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.89 4.18 2 2 0 0 1 4.11 2H7a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16z"/></svg>
                  },
                  {
                    label: "Email",
                    value: "hello@youritcompany.com",
                    icon: <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  },
                  {
                    label: "Hours",
                    value: "Mon–Fri: 9 AM – 7 PM\nSat: 10 AM – 2 PM",
                    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  },
                ].map(d => (
                  <div className="detail-item" key={d.label}>
                    <div className="detail-icon">{d.icon}</div>
                    <div>
                      <span className="detail-label">{d.label}</span>
                      <span className="detail-value" style={{whiteSpace:'pre-line'}}>{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="socials-row">
                <a href="#" className="social-pill">
                  <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="#" className="social-pill">
                  <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </a>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="contact-form-wrap">
              {sent ? (
                <div className="success-msg">
                  <div className="success-circle">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Message received.</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button className="reset-btn" onClick={reset}>Send another</button>
                </div>
              ) : (
                <>
                  <p className="form-title">Send a message</p>
                  <p className="form-subtitle">We reply to every inquiry — no exceptions.</p>
                  <form onSubmit={onSubmit}>
                    <div className="form-grid">

                      <div className="form-field">
                        <label>Full Name</label>
                        <div className="field-line">
                          <span className="field-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                          <input type="text" name="name" placeholder="Alex Johnson" value={form.name} onChange={onChange} required />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Phone</label>
                        <div className="field-line">
                          <span className="field-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.89 4.18 2 2 0 0 1 4.11 2H7a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16z"/></svg></span>
                          <input type="tel" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={onChange} />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Email</label>
                        <div className="field-line">
                          <span className="field-icon"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                          <input type="email" name="email" placeholder="you@company.com" value={form.email} onChange={onChange} required />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Company</label>
                        <div className="field-line">
                          <span className="field-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
                          <input type="text" name="company" placeholder="Your Company Ltd." value={form.company} onChange={onChange} />
                        </div>
                      </div>

                      <div className="form-field full">
                        <label>Service Interested In</label>
                        <div className="chips-wrap">
                          {SERVICES.map(s => (
                            <button key={s} type="button" className={`chip${chips.includes(s) ? ' active' : ''}`} onClick={() => toggleChip(s)}>{s}</button>
                          ))}
                        </div>
                      </div>

                      <div className="form-field full">
                        <label>Message</label>
                        <div className="field-line" style={{alignItems:'flex-start', paddingBottom:'12px'}}>
                          <span className="field-icon" style={{marginTop:'2px'}}><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
                          <textarea name="message" placeholder="Tell us about your project or challenge..." rows={4} value={form.message} onChange={onChange} />
                        </div>
                      </div>

                      <div className="submit-row">
                        <span className="submit-note">We reply within 24 hrs.</span>
                        <button type="submit" className="submit-btn">
                          Send Message
                          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>

                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="map-section">
          <div className="map-header reveal">
            <div>
              <p className="section-label">Find Us</p>
              <h2>Visit our<br /><em>office.</em></h2>
            </div>
            <p className="reveal reveal-delay-1">We're located in the heart of Bengaluru's tech corridor — parking on-site, coffee always on. Stop by during office hours, no appointment needed.</p>
          </div>

          <div className="map-frame-wrap reveal reveal-delay-2">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452427407!3d12.954517197500648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-caption">
              <div className="map-caption-left">
                <div className="map-dot" />
                <span>42 Innovation Drive, Tech Park, Bengaluru — 560001</span>
              </div>
              <a href="https://maps.google.com/?q=Bengaluru+Karnataka" target="_blank" rel="noopener noreferrer" className="map-link">
                Get Directions ↗
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}