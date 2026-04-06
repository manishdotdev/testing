import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .cs-root {
    background: #f5f3ef;
    padding: 60px 24px;
    font-family: 'Syne', sans-serif;
  }

  .cs-header {
    text-align: center;
    margin-bottom: 56px;
  }
  .cs-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .cs-eyebrow::before,
  .cs-eyebrow::after {
    content: '';
    width: 32px;
    height: 1px;
    background: #bbb;
  }
  .cs-title {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    color: #0a0a0a;
    line-height: 1.0;
    letter-spacing: -0.035em;
  }
  .cs-title span { color: #888; }

  /* ── WRAP ── */
  .cs-wrap {
    max-width: 980px;
    margin: 0 auto;
  }

  /* ── SLIDE ── */
  .cs-slide {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 40px rgba(0,0,0,0.10);
  }

  /* ── TOP STRIP ── */
  .cs-top {
    background: #0a0a0a;
    padding: 18px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cs-identity {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .cs-logo-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    color: #fff;
    letter-spacing: -0.02em;
    flex-shrink: 0;
  }
  .cs-client-name {
    color: #fff;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.02em;
  }
  .cs-sector {
    color: rgba(255,255,255,0.4);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .cs-top-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .cs-badge {
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: 1px solid;
  }
  .cs-badge-green {
    background: rgba(212,238,219,0.12);
    color: #6effa0;
    border-color: rgba(110,255,160,0.22);
  }
  .cs-badge-year {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.4);
    border-color: rgba(255,255,255,0.10);
  }
  .cs-slide-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.06em;
  }

  /* ── BODY GRID ── */
  .cs-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #fff;
    min-height: 320px;
  }
  .cs-left {
    padding: 28px;
    border-right: 1px solid #f0eeea;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .cs-right {
    background: #fafaf8;
    display: flex;
    flex-direction: column;
  }

  /* ── BROWSER MOCK ── */
  .cs-screen-frame {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #e8e6e0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 260px;
  }
  .cs-browser {
    width: 90%;
    background: #fff;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 -4px 32px rgba(0,0,0,0.12);
    overflow: hidden;
    height: 88%;
  }
  .cs-browser-bar {
    background: #f1f0ed;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    gap: 7px;
    border-bottom: 1px solid #e0ddd8;
  }
  .cs-browser-dots { display: flex; gap: 5px; }
  .cs-dot { width: 8px; height: 8px; border-radius: 50%; }
  .cs-dot-r { background: #ff6059; }
  .cs-dot-y { background: #ffbd2e; }
  .cs-dot-g { background: #28c841; }
  .cs-url {
    flex: 1;
    background: rgba(0,0,0,0.05);
    border-radius: 5px;
    padding: 3px 10px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: #999;
    margin: 0 6px;
  }
  .cs-browser-content {
    height: calc(100% - 30px);
    overflow: hidden;
  }
  .cs-fake-nav {
    background: #111;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cs-fake-logo { width: 46px; height: 7px; background: rgba(255,255,255,0.65); border-radius: 2px; }
  .cs-fake-links { display: flex; gap: 7px; }
  .cs-fake-link { width: 22px; height: 5px; background: rgba(255,255,255,0.22); border-radius: 2px; }
  .cs-fake-hero { padding: 14px 12px; background: #fff; }
  .cs-fh-tag { width: 55px; height: 5px; background: #e0ddd8; border-radius: 2px; margin-bottom: 7px; }
  .cs-fh-h1 { width: 85%; height: 9px; background: #1a1a1a; border-radius: 2px; margin-bottom: 5px; }
  .cs-fh-h2 { width: 65%; height: 9px; background: #1a1a1a; border-radius: 2px; margin-bottom: 9px; }
  .cs-fh-p1 { width: 92%; height: 4px; background: #e0ddd8; border-radius: 2px; margin-bottom: 4px; }
  .cs-fh-p2 { width: 76%; height: 4px; background: #e0ddd8; border-radius: 2px; margin-bottom: 11px; }
  .cs-fh-btn { display: inline-block; background: #1a1a1a; border-radius: 4px; padding: 5px 10px; }
  .cs-fh-btn-t { width: 38px; height: 4px; background: rgba(255,255,255,0.75); border-radius: 2px; }
  .cs-fake-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    padding: 9px 12px;
    background: #f8f7f5;
  }
  .cs-fc { background: #fff; border-radius: 4px; padding: 6px; border: 1px solid #ebe9e4; }
  .cs-fc-img { width: 100%; height: 26px; background: #f0eeea; border-radius: 3px; margin-bottom: 5px; }
  .cs-fc-l1 { width: 72%; height: 4px; background: #1a1a1a; border-radius: 2px; margin-bottom: 3px; }
  .cs-fc-l2 { width: 50%; height: 4px; background: #d0cdc8; border-radius: 2px; }

  /* ── LEFT CONTENT ── */
  .cs-category {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #888;
  }
  .cs-case-title {
    font-size: clamp(16px, 2.2vw, 21px);
    font-weight: 700;
    color: #0a0a0a;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-top: 5px;
  }
  .cs-desc {
    font-size: 13px;
    color: #3a3a3a;
    line-height: 1.72;
    font-weight: 400;
  }
  .cs-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .cs-tag {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
  }
  .cs-tag-green { background: #d4eedb; color: #1a5e30; }
  .cs-tag-blue  { background: #d6e8fa; color: #0e3a6e; }
  .cs-tag-amber { background: #faecd4; color: #7a4500; }

  /* ── REVIEWER ── */
  .cs-person {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #fafaf8;
    border-radius: 10px;
    border: 1px solid #f0eeea;
  }
  .cs-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: #fff;
  }
  .cs-person-name { font-size: 13px; font-weight: 600; color: #0a0a0a; }
  .cs-person-role { font-size: 11px; color: #888; margin-top: 1px; }
  .cs-stars { display: flex; gap: 2px; margin-top: 4px; }
  .cs-star { width: 10px; height: 10px; fill: #f5a623; }

  /* ── STATS ── */
  .cs-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #f0eeea;
    background: #fff;
  }
  .cs-stat {
    padding: 18px 20px;
    text-align: center;
    border-right: 1px solid #f0eeea;
    position: relative;
    overflow: hidden;
  }
  .cs-stat:last-child { border-right: none; }
  .cs-stat-val {
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 800;
    color: #0a0a0a;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .cs-stat-lbl {
    font-size: 10px;
    color: #888;
    margin-top: 4px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .cs-stat-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #0a0a0a;
  }

  /* ── TESTIMONIAL ── */
  .cs-testimonial {
    padding: 18px 28px;
    background: #fafaf8;
    border-top: 1px solid #f0eeea;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .cs-quote-mark {
    font-size: 44px;
    line-height: 0.8;
    color: #dddad4;
    font-family: Georgia, serif;
    flex-shrink: 0;
    margin-top: 6px;
  }
  .cs-quote-text {
    font-size: 12.5px;
    color: #3a3a3a;
    line-height: 1.68;
    font-style: italic;
  }

  /* ── NAV ── */
  .cs-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 4px;
  }
  .cs-nav-dots { display: flex; gap: 6px; align-items: center; }
  .cs-ndot {
    height: 6px;
    border-radius: 999px;
    border: none;
    background: #bbb;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s;
  }
  .cs-ndot.active { background: #0a0a0a; width: 24px; }
  .cs-ndot:not(.active) { width: 6px; }
  .cs-nav-btns { display: flex; gap: 8px; }
  .cs-nav-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid #e0ddd8;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    transition: all 0.2s;
  }
  .cs-nav-btn:hover { background: #0a0a0a; color: #fff; border-color: #0a0a0a; }
  .cs-progress {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #888;
    letter-spacing: 0.04em;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 700px) {
    .cs-root { padding: 40px 16px; }
    .cs-body { grid-template-columns: 1fr; }
    .cs-right { display: none; }
    .cs-top { flex-direction: column; align-items: flex-start; }
    .cs-testimonial { padding: 16px 20px; }
    .cs-left { padding: 20px; }
  }
`;

const CASES = [
    {
        id: 0,
        client: "SalesCore AI",
        initials: "SC",
        logoBg: "rgba(255,255,255,0.10)",
        logoColor: "#fff",
        sector: "SaaS · Enterprise Sales",
        year: "2024",
        category: "AI Workflow Automation",
        title: "Automated demo booking & lead scoring for a B2B SaaS company",
        desc: "We mapped every touchpoint in their sales funnel, identified three critical bottlenecks, and replaced manual handoffs with an AI pipeline — cutting response time from 48h to under 4 minutes.",
        tags: [
            { label: "AI Automation", type: "green" },
            { label: "CRM Integration", type: "blue" },
            { label: "Lead Scoring", type: "amber" },
        ],
        person: { initials: "MR", name: "Marcus Reid", role: "VP of Sales, SalesCore AI", bg: "#4f46e5" },
        quote: "The automation pipeline they built cut our average response time from 48 hours to under 4 minutes. Our sales team now focuses purely on closing — not chasing leads.",
        stats: [
            { val: "+40%", lbl: "Demo Bookings", pct: 40 },
            { val: "+25%", lbl: "Closing Rate", pct: 25 },
            { val: "3×", lbl: "Engagement", pct: 66 },
        ],
        url: "salescore.ai/dashboard",
        frameBg: "#e8e6e0",
        screenshotUrl:"https://plus.unsplash.com/premium_photo-1727197587817-6be08db433f9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        navBg: "#111",
        cardColors: ["#f0eeea", "#e8f0fe", "#e6f4ea"],
    },
    {
        id: 1,
        client: "Pixelframe Studio",
        initials: "PX",
        logoBg: "rgba(99,179,237,0.18)",
        logoColor: "#63b3ed",
        sector: "Creative Agency · Design",
        year: "2024",
        category: "AI Project Management",
        title: "Eliminating admin overhead for a 30-person creative team",
        desc: "Pixelframe were drowning in Slack threads and missed deadlines. We built an AI-powered PM layer that auto-assigns tasks, tracks blockers in real time, and surfaces daily priority digests to team leads.",
        tags: [
            { label: "Workflow Automation", type: "blue" },
            { label: "Slack Integration", type: "green" },
            { label: "Smart Scheduling", type: "amber" },
        ],
        person: { initials: "JP", name: "Jenna Park", role: "Head of Ops, Pixelframe Studio", bg: "#e05c97" },
        quote: "We went from spending 30% of our week on project admin to almost none. The AI just handles it. Our creatives are actually creating now.",
        stats: [
            { val: "+38%", lbl: "Faster Delivery", pct: 38 },
            { val: "−62%", lbl: "Admin Work", pct: 62 },
            { val: "4×", lbl: "Productivity", pct: 80 },
        ],
        url: "pm.pixelframe.io/board",
        frameBg: "#dde8f5",
        screenshotUrl:"https://images.unsplash.com/photo-1738640679960-58d445857945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwcCUyMHNjcmVlbnNob3R8ZW58MHx8MHx8fDA%3D",
        navBg: "#1e3a5f",
        cardColors: ["#e8eef5", "#fdeef6", "#e8f5ea"],
    },
    {
        id: 2,
        client: "EstateHub London",
        initials: "EH",
        logoBg: "rgba(246,173,85,0.18)",
        logoColor: "#f6ad55",
        sector: "Real Estate · PropTech",
        year: "2025",
        category: "AI Chatbot · Real Estate",
        title: "24/7 property inquiry chatbot that books viewings automatically",
        desc: "EstateHub were losing leads every evening and weekend. We deployed a trained property AI that qualifies buyers, answers listing questions, and schedules viewings — all without an agent touching it.",
        tags: [
            { label: "AI Chatbot", type: "amber" },
            { label: "Lead Qualification", type: "green" },
            { label: "24/7 Automation", type: "blue" },
        ],
        person: { initials: "DP", name: "David Park", role: "Director, EstateHub London", bg: "#e07f1a" },
        quote: "We used to lose half our weekend leads because nobody was available to respond. Now the chatbot handles everything and our Monday diary is already full of booked viewings.",
        stats: [
            { val: "3×", lbl: "Lead Response", pct: 66 },
            { val: "+40%", lbl: "Viewing Bookings", pct: 40 },
            { val: "24/7", lbl: "Always On", pct: 100 },
        ],
        url: "estatehub.co.uk",
        frameBg: "#e8e0d4",
        screenshotUrl:"https://images.unsplash.com/photo-1762330463346-5c71fbfee5d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYnNpdGUlMjBzY3JlZW5zaG90fGVufDB8fDB8fHww",
        navBg: "#7a4500",
        cardColors: ["#f5f0ea", "#faecd4", "#fff8f0"],
    },
];

const StarIcon = () => (
    <svg className="cs-star" viewBox="0 0 16 16">
        <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95L5 8.42 2 5.5l4.15-.75z" />
    </svg>
);

function BrowserMock({ slide }) {
    return (
        <div className="cs-screen-frame" style={{ background: slide.frameBg }}>
            <div className="cs-browser">
                <div className="cs-browser-bar">
                    <div className="cs-browser-dots">
                        <div className="cs-dot cs-dot-r" />
                        <div className="cs-dot cs-dot-y" />
                        <div className="cs-dot cs-dot-g" />
                    </div>
                    <div className="cs-url">{slide.url}</div>
                </div>
                <div className="cs-browser-content">
                    <div className="cs-fake-nav" style={{ background: slide.navBg }}>
                        <div className="cs-fake-logo" />
                        <div className="cs-fake-links">
                            <div className="cs-fake-link" />
                            <div className="cs-fake-link" />
                            <div className="cs-fake-link" />
                        </div>
                    </div>
                    <img
                        src={slide.screenshotUrl}
                        alt={slide.client}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                </div>
            </div>
        </div>
    );
}

function SlideCard({ slide, index, total }) {
    const tagClass = { green: "cs-tag-green", blue: "cs-tag-blue", amber: "cs-tag-amber" };
    const num = String(index + 1).padStart(2, "0");
    const tot = String(total).padStart(2, "0");

    return (
        <div className="cs-slide">
            {/* TOP STRIP */}
            <div className="cs-top">
                <div className="cs-identity">
                    <div
                        className="cs-logo-box"
                        style={{ background: slide.logoBg, color: slide.logoColor || "#fff" }}
                    >
                        {slide.initials}
                    </div>
                    <div>
                        <div className="cs-client-name">{slide.client}</div>
                        <div className="cs-sector">{slide.sector}</div>
                    </div>
                </div>
                <div className="cs-top-right">
                    <span className="cs-badge cs-badge-green">Completed</span>
                    <span className="cs-badge cs-badge-year">{slide.year}</span>
                    <span className="cs-slide-num">{num} / {tot}</span>
                </div>
            </div>

            {/* BODY */}
            <div className="cs-body">
                <div className="cs-left">
                    <div>
                        <div className="cs-category">{slide.category}</div>
                        <h3 className="cs-case-title">{slide.title}</h3>
                    </div>
                    <p className="cs-desc">{slide.desc}</p>
                    <div className="cs-tags">
                        {slide.tags.map((t) => (
                            <span key={t.label} className={`cs-tag ${tagClass[t.type]}`}>{t.label}</span>
                        ))}
                    </div>
                    <div className="cs-person">
                        <div className="cs-avatar" style={{ background: slide.person.bg }}>
                            {slide.person.initials}
                        </div>
                        <div>
                            <div className="cs-person-name">{slide.person.name}</div>
                            <div className="cs-person-role">{slide.person.role}</div>
                            <div className="cs-stars">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs-right">
                    <BrowserMock slide={slide} />
                </div>
            </div>

            {/* STATS */}
            <div className="cs-stats">
                {slide.stats.map((s) => (
                    <div className="cs-stat" key={s.lbl}>
                        <div className="cs-stat-val">{s.val}</div>
                        <div className="cs-stat-lbl">{s.lbl}</div>
                        <div className="cs-stat-bar" style={{ width: `${s.pct}%` }} />
                    </div>
                ))}
            </div>

            {/* TESTIMONIAL */}
            <div className="cs-testimonial">
                <div className="cs-quote-mark">"</div>
                <p className="cs-quote-text">{slide.quote}</p>
            </div>
        </div>
    );
}

export default function CaseStudies() {
    const [current, setCurrent] = useState(0);
    const total = CASES.length;

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    const onTouchStart = (e) => { window._csSwipeX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        const dx = e.changedTouches[0].clientX - (window._csSwipeX || 0);
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    };

    return (
        <>
            <style>{styles}</style>
            <section className="cs-root">
                <div className="cs-header">
                    <h2 className="cs-title">Work that <span>delivered.</span></h2>
                </div>

                <div className="cs-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <SlideCard slide={CASES[current]} index={current} total={total} />

                    <div className="cs-nav">
                        <div className="cs-nav-dots">
                            {CASES.map((_, i) => (
                                <button
                                    key={i}
                                    className={`cs-ndot${i === current ? " active" : ""}`}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <span className="cs-progress">
                            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <div className="cs-nav-btns">
                            <button className="cs-nav-btn" onClick={prev} aria-label="Previous">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button className="cs-nav-btn" onClick={next} aria-label="Next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}