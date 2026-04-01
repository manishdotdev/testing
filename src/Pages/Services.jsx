import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    num: "01", code: "FST",
    title: "Full Stack Development",
    blurb: "From blazing APIs to pixel-perfect dashboards — our engineers build systems that scale to millions, delivered in weeks.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    num: "02", code: "WDS",
    title: "Web Design & Development",
    blurb: "Every pixel intentional. We turn brand vision into living, breathing interfaces that convert and captivate.",
    tags: ["Next.js", "Figma", "Webflow", "Shopify"],
  },
  {
    num: "03", code: "ECM",
    title: "eCommerce Development",
    blurb: "Conversion-engineered stores. Payments, inventory, fulfilment — the full stack, beautifully handled.",
    tags: ["WooCommerce", "Stripe", "Magento"],
  },
  {
    num: "04", code: "MCM",
    title: "Mobile Commerce",
    blurb: "One codebase. iOS & Android. Native quality that survives the App Store review and delights users on every device.",
    tags: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    num: "05", code: "AIM",
    title: "AI / ML / IoT Development",
    blurb: "Intelligent systems that learn and connect — from LLM pipelines to edge firmware. The future, shipped today.",
    tags: ["Python", "LangChain", "TensorFlow", "AWS IoT"],
  },
];

const STATS = [
  { val: "48+", label: "Projects Shipped" },
  { val: "3wk", label: "Avg. Delivery" },
  { val: "98%", label: "Satisfaction" },
  { val: "5yr", label: "In Business" },
];

const MARQUEE_ITEMS = ["Full Stack", "Web Design", "eCommerce", "Mobile Apps", "AI / ML / IoT", "MVP Studio"];

const ArrowDiag = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 15L15 3M15 3H7M15 3v8" />
  </svg>
);

export default function Services() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400&display=swap');

        .sv-root {
          background: #f7f6f4;
          font-family: 'Syne', sans-serif;
          padding: 80px 0 100px;
          position: relative;
          overflow: hidden;
        }

        /* Header */
        .sv-header { padding: 0 72px; margin-bottom: 72px; }
        .sv-eyebrow {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.3em; color: rgba(15,15,15);
          text-transform: uppercase; margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .sv-eyebrow::before { content: ''; width: 28px; height: 1px; background: rgba(15,15,15,0.2); }
        .sv-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.4rem, 9.5vw, 7.8rem);
          font-weight: 900; line-height: 0.88;
          letter-spacing: -0.02em; color: #1a120a;
          margin: 0; position: relative;
        }
        .sv-h2 .ghost {
          font-style: italic;
          -webkit-text-stroke: 1.8px #1a120a;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .sv-header-foot {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-top: 24px; gap: 20px; flex-wrap: wrap;
        }
        .sv-desc {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(15,15,15); line-height: 1.8; max-width: 260px;
        }
        .sv-count {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.2em; color: rgba(15,15,15); text-transform: uppercase;
        }

        /* Rows */
        .sv-rows { border-top: 1px solid rgba(15,15,15,0.08); }
        .sv-row {
          display: grid;
          grid-template-columns: 80px 1fr 1fr 160px;
          align-items: center;
          gap: 0;
          padding: 0 72px;
          border-bottom: 1px solid rgba(15,15,15,0.08);
          min-height: 88px;
          cursor: pointer;
          position: relative;
          transition: background 0.3s ease;
          overflow: hidden;
        }
        .sv-row::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 0; background: #0f0f0f;
          transition: width 0.5s cubic-bezier(0.77,0,0.18,1);
        }
        .sv-row.sv-active::before { width: 4px; }
        .sv-row:hover { background: rgba(15,15,15,0.025); }

        .sv-row-num {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.15em; color: rgba(15,15,15,0.2);
          position: relative; z-index: 1; transition: color 0.3s;
        }
        .sv-row.sv-active .sv-row-num { color: rgba(15,15,15,0.5); }

        .sv-row-title {
          font-size: clamp(1.1rem, 2.2vw, 1.7rem);
          font-weight: 700; color: #0f0f0f; letter-spacing: -0.02em;
          position: relative; z-index: 1;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-row:hover .sv-row-title { transform: translateX(6px); }

        .sv-expand {
          position: relative; z-index: 1;
          overflow: hidden; max-height: 0; opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, padding 0.4s ease;
          padding: 0 40px 0 0;
        }
        .sv-row.sv-active .sv-expand { max-height: 200px; opacity: 1; padding-top: 0; }
        .sv-expand-blurb {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          color: rgba(15,15,15); line-height: 1.8;
        }
        .sv-expand-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .sv-etag {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(15,15,15,0.4);
          border-bottom: 1px solid rgba(15,15,15,0.15);
          padding-bottom: 2px;
        }

        .sv-row-code {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.18em; color: rgba(15,15,15,0.15);
          text-transform: uppercase; text-align: right;
          position: relative; z-index: 1; transition: color 0.3s;
        }
        .sv-row.sv-active .sv-row-code { color: rgba(15,15,15); }

        .sv-row-arrow {
          position: absolute; right: 72px; top: 50%;
          transform: translateY(-50%) rotate(-45deg);
          width: 18px; height: 18px; z-index: 1;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.3s;
          color: rgba(15,15,15,0.15);
        }
        .sv-row:hover .sv-row-arrow { color: rgba(15,15,15,0.4); }
        .sv-row.sv-active .sv-row-arrow { transform: translateY(-50%) rotate(0deg); color: #0f0f0f; }

        /* Marquee */
        .sv-marquee { overflow: hidden; border-top: 1px solid rgba(15,15,15,0.06); border-bottom: 1px solid rgba(15,15,15,0.06); padding: 18px 0; margin-top: 64px; }
        .sv-marquee-track { display: flex; animation: svMarquee 22s linear infinite; width: max-content; }
        .sv-marquee-item { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.25em; color: rgba(15,15,15); text-transform: uppercase; padding: 0 48px; white-space: nowrap; }
        .sv-marquee-dot { display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: rgba(15,15,15,0.15); margin: 0 4px; vertical-align: middle; }
        @keyframes svMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* Stats strip */
        /* Stats strip */
.sv-stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 68px; 
  padding: 45px 72px 0;
  border-top: 1px solid rgba(15,15,15,0.06);
  text-align: center;
}

.sv-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sv-stat-val {
  font-size: 2.4rem;
  font-weight: 800;
  color: #0f0f0f;
  letter-spacing: -0.04em;
  line-height: 1;
}

.sv-stat-val span {
  font-size: 1.2rem;
  color: rgba(15,15,15,0.5);
}

.sv-stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(15,15,15,0.5);
  margin-top: 6px;
}

        /* CTA */
        .sv-cta { display: flex; align-items: center; justify-content: space-between; padding: 72px 72px 0; flex-wrap: wrap; gap: 20px; }
        .sv-cta-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: rgba(15,15,15,0.28); text-transform: uppercase; }
        .sv-cta-btn {
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: #0f0f0f; color: #f7f6f4;
          border: none; border-radius: 3px; padding: 16px 38px;
          cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
          position: relative; overflow: hidden; transition: color 0.35s;
        }
        .sv-cta-btn::after {
          content: ''; position: absolute; inset: 0;
          background: #3d3d3d; transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .sv-cta-btn:hover::after { transform: scaleX(1); }
        .sv-cta-btn span, .sv-cta-btn svg { position: relative; z-index: 1; }

        @media (max-width: 900px) {
          .sv-row { grid-template-columns: 48px 1fr; padding: 0 32px; }
          .sv-expand {
    grid-column: 1 / -1; /* 🔥 full width below row */
    padding: 10px 0 15px 48px; 
  }

          .sv-row-arrow { right: 32px; }
          .sv-header, .sv-stats, .sv-cta { padding-left: 32px; padding-right: 32px; }
        }
        @media (max-width: 900px) {
  .sv-stats {
    gap: 40px;
    padding: 40px 32px 0;
  }
}

@media (max-width: 600px) {
  .sv-stats {
    flex-wrap: wrap;
    gap: 24px;
    padding: 30px 20px 0;
  }

  .sv-stat {
    width: 45%; 
  }

  .sv-stat-val {
    font-size: 1.8rem;
  }

  .sv-stat-val span {
    font-size: 1rem;
  }
}
      `}</style>

      <section ref={ref} className="sv-root " id="services">

        <div className="sv-header">
          <div className="sv-eyebrow">What We Build</div>
          <div className="sv-h2"><span className="ghost">Our </span>Services</div>
          <div className="sv-header-foot">
            <p className="sv-desc">Five disciplines. One studio.<br />Every project crafted with intent.</p>
            <span className="sv-count">05 Services</span>
          </div>
        </div>

        <div className="sv-rows">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`sv-row ${active === i ? "sv-active" : ""}`}
              onClick={() => toggle(i)}
            >
              <span className="sv-row-num">{s.num}</span>
              <span className="sv-row-title">{s.title}</span>
              <div className="sv-expand">
                <div className="sv-expand-blurb">{s.blurb}</div>
                <div className="sv-expand-tags">
                  {s.tags.map((t, ti) => <span key={ti} className="sv-etag">{t}</span>)}
                </div>
              </div>
              <span className="sv-row-code">{s.code}</span>
              <ArrowDiag />
            </div>
          ))}
        </div>

        <div className="sv-marquee">
          <div className="sv-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="sv-marquee-item">
                {item}<span className="sv-marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        <div className="sv-stats ">
          {STATS.map((s, i) => (
            <div key={i} className="sv-stat " >
              <div className="sv-stat-val">
                {s.val.replace(/[^0-9]/g, "")}
                <span>{s.val.replace(/[0-9]/g, "")}</span>
              </div>
              <div className="sv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>



      </section>
    </>
  );
}