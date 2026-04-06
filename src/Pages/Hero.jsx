import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const techChips = [
  { label: "React.js", code: "const app = <App />" },
  { label: "Node.js", code: "server.listen(3000)" },
  { label: "Flutter", code: "runApp(MyApp())" },
  { label: "PostgreSQL", code: "SELECT * FROM mvps" },
  { label: "TypeScript", code: "type MVP = Ready" },
  { label: "AWS", code: "deploy --prod" },
];

const glassCards = [
  { icon: "⚡", title: "3 Weeks", sub: "MVP to market", dur: 6 },
  { icon: "◈", title: "48+", sub: "Products launched", dur: 7 },
  { icon: "◎", title: "Investor-Ready", sub: "Scalable from day one", dur: 8 },
  { icon: "◇", title: "Full-Stack", sub: "Web · Mobile · AI", dur: 5.5 },
];

// Desktop positions (unchanged from original)
const cardPositions = [
  { top: "12%", left: "4%" },
  { top: "10%", right: "4%" },
  { bottom: "18%", left: "3%" },
  { bottom: "16%", right: "3%" },
];

const chipDesktopPositions = [
  { top: "22%", left: "22%" },
  { top: "18%", right: "20%" },
  { top: "54%", left: "18%" },
  { top: "58%", right: "19%" },
  { bottom: "28%", left: "28%" },
  { bottom: "26%", right: "26%" },
];

// Mobile positions — spread around the center column, scaled smaller
const cardMobilePositions = [
  { top: "7%", left: "-2%" },
  { top: "6%", right: "-2%" },
  { bottom: "10%", left: "-3%" },
  { bottom: "9%", right: "-3%" },
];

const chipMobilePositions = [
  { top: "26%", left: "0%" },
  { top: "22%", right: "0%" },
  { top: "52%", left: "-1%" },
  { top: "56%", right: "-1%" },
  { bottom: "22%", left: "2%" },
  { bottom: "20%", right: "2%" },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-h1-anim",
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(".hero-sub-anim",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.5, stagger: 0.12 }
      );
      gsap.fromTo(".float-card-anim",
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out", delay: 0.75, stagger: 0.1 }
      );
      gsap.fromTo(".chip-anim",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.9, stagger: 0.07 }
      );
      gsap.fromTo(sectionRef.current,
        { scale: 1, y: 0 },
        {
          scale: 0.94, y: -16, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=80",
            end: "+=400",
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const move = (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.22,
        y: (e.clientY - r.top - r.height / 2) * 0.22,
        duration: 0.5, ease: "power3.out",
      });
    };
    const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", reset);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,900&family=Bebas+Neue&family=DM+Mono:wght@300;400&family=Jost:wght@200;300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── ROOT ── */
        .hero-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: transform;
          font-family: 'Jost', sans-serif;
          padding: 80px 16px;
          
          }
          
          /* Grid */
          .grid-layer {
            position: absolute; inset: 0; z-index: 1;
            // background-image: radial-gradient(# 1px, #e5e5f7 1px);
          background-image: radial-gradient(#999999 1px, transparent 1px);
          background-size: 72px 72px;
        }

        /* Ruled bands */
        .band-h {
          position: absolute; left: 0; right: 0; height: 1px;
          background: rgba(30,20,10,0.1); z-index: 2;
        }
        .band-h-top    { top: 58px; }
        .band-h-bottom { bottom: 30px; }
        .band-v {
          position: absolute; top: 0; bottom: 0; width: 1px;
          background: rgba(30,20,10,0.1); z-index: 2;
        }
        .band-v-left  { left: 80px; }
        .band-v-right { right: 80px; }

        /* Corners */
        .corner-mark {
          position: absolute; z-index: 3;
          width: 18px; height: 18px;
          border-color: rgba(30,20,10,0.18); border-style: solid;
        }
        .cm-tl { top: 22px; left: 22px; border-width: 1.5px 0 0 1.5px; }
        .cm-tr { top: 22px; right: 22px; border-width: 1.5px 1.5px 0 0; }
        .cm-bl { bottom: 22px; left: 22px; border-width: 0 0 1.5px 1.5px; }
        .cm-br { bottom: 22px; right: 22px; border-width: 0 1.5px 1.5px 0; }

        /* Side labels */
        .side-label {
          position: absolute; z-index: 3;
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.28em; color: rgba(30,20,10,0.22);
          text-transform: uppercase;
        }
        .side-left  { left: 28px; top: 50%; transform: translateY(-50%) rotate(-90deg); }
        .side-right { right: 28px; top: 50%; transform: translateY(-50%) rotate(90deg); }

        /* Deco tags */
        .build-tag {
          position: absolute; top: 86px; right: 95px; z-index: 5;
          font-family: 'DM Mono', monospace; font-size: 9px;
          color: rgba(30,20,10,0.22); letter-spacing: 0.22em; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
          pointer-events: none; user-select: none;
        }
        .build-tag::before { content: ''; width: 20px; height: 1px; background: rgba(30,20,10,0.18); display: block; }
        .label-num {
          position: absolute; z-index: 5;
          font-family: 'DM Mono', monospace; font-size: 9px;
          color: rgba(30,20,10,0.18); letter-spacing: 0.12em;
          pointer-events: none; user-select: none;
        }
        .ln-tl { top: 86px; left: 95px; }
        .ln-bl { bottom: 86px; left: 95px; }

        /* Ghost deco number */
        .deco-number {
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(180px, 28vw, 340px);
          color: rgba(30,20,10,0.04);
          letter-spacing: -0.05em; line-height: 1;
          z-index: 1; user-select: none; pointer-events: none;
        }
        .deco-left { left: -2%; top: 50%; transform: translateY(-50%); }

        /* Blobs */
        .blob { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; z-index: 0; }
        .blob-amber  { width: 500px; height: 500px; background: radial-gradient(ellipse, rgba(212,168,67,0.18) 0%, transparent 70%); top: -80px; right: -60px; }
        .blob-warm   { width: 400px; height: 400px; background: radial-gradient(ellipse, rgba(200,140,80,0.12) 0%, transparent 70%); bottom: -60px; left: -40px; }
        .blob-center { width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(255,250,238,0.6) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); }

        /* Halftone */
        .halftone { position: absolute; z-index: 1; pointer-events: none; opacity: 0.18; }
        .halftone-tl { top: 90px; left: 95px; }
        .halftone-br { bottom: 90px; right: 95px; transform: rotate(180deg); }

        /* ── HEADLINE ── */
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.4rem, 9.5vw, 7.8rem);
          font-weight: 900; line-height: 0.88;
          letter-spacing: -0.02em; color: #1a120a;
          margin: 0; position: relative;
        }
        .word-outline {
          font-style: italic;
          -webkit-text-stroke: 1.8px #1a120a;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .word-stamp {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 11vw, 9rem);
          font-style: normal; letter-spacing: 0.04em; color: #1a120a;
        }
        .word-accent { position: relative; display: inline-block; color: #1a120a; }
        .word-accent::before {
          content: ''; position: absolute;
          bottom: 8px; left: -4px; right: -4px; height: 100%;
          background: #d4a843; z-index: -1; transform: skewX(-3deg);
        }

        /* Eyebrow */
        .eyebrow {
          font-family: 'DM Mono', monospace; font-size: 10px;
          font-weight: 300; letter-spacing: 0.3em;
          color: rgba(30,20,10,0.35); text-transform: uppercase;
          margin-bottom: 32px;
          display: flex; align-items: center; justify-content: center; gap: 14px;
        }
        .eyebrow::before, .eyebrow::after { content: ''; display: block; width: 40px; height: 1px; background: rgba(30,20,10,0.18); }

        /* Sub text */
        .hero-sub-text {
          font-family: 'Jost', sans-serif; font-size: clamp(0.85rem, 1.5vw, 1rem);
          font-weight: 300; color: rgba(30,20,10,0.45); line-height: 1.9;
          max-width: 380px; margin: 0 auto 40px;
        }

        /* Divider */
        .h-divider { width: 1px; height: 28px; background: rgba(30,20,10,0.18); margin: 28px auto; }

        /* Buttons */
        .btn-row { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .btn-main {
          font-family: 'Jost', sans-serif; font-size: 11.5px;
          font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase;
          background: #1a120a; color: #f5f0e8;
          border: none; border-radius: 2px; padding: 17px 44px; cursor: pointer;
          position: relative; overflow: hidden; transition: color 0.3s ease;
          white-space: nowrap;
        }
        .btn-main::after {
          content: ''; position: absolute; inset: 0;
          background: #d4a843; transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1); z-index: 0;
        }
        .btn-main:hover::after { transform: scaleX(1); }
        .btn-main:hover { color: #1a120a; }
        .btn-main span { position: relative; z-index: 1; }
        .btn-sec {
          font-family: 'Jost', sans-serif; font-size: 11.5px;
          font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
          background: transparent; color: rgba(30,20,10,0.42);
          border: 1px solid rgba(30,20,10,0.18); border-radius: 2px;
          padding: 16px 30px; cursor: pointer; white-space: nowrap;
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .btn-sec:hover { border-color: rgba(30,20,10,0.5); color: rgba(30,20,10,0.8); }

        /* ════════════════════════════════
           GLASS CARDS — decorative layer
        ════════════════════════════════ */
        .glass-card {
          position: absolute;
          background: rgba(255,253,248,0.7);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(30,20,10,0.1);
          box-shadow: 0 4px 32px rgba(30,20,10,0.07), 0 1px 4px rgba(30,20,10,0.05);
          border-radius: 4px; padding: 18px 22px;
          z-index: 2; text-align: left; min-width: 168px;
          /* ── fully decorative: no interaction ── */
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .gc-icon  { font-size: 16px; margin-bottom: 10px; display: block; color: #d4a843; }
        .gc-title { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: #1a120a; line-height: 1; margin-bottom: 5px; letter-spacing: 0.04em; }
        .gc-sub   { font-family: 'DM Mono', monospace; font-size: 9px; color: rgba(30,20,10,0.32); letter-spacing: 0.1em; text-transform: uppercase; }
        .gc-line  { margin-top: 12px; height: 1px; background: rgba(30,20,10,0.07); }

        /* ════════════════════════════════
           CODE CHIPS — decorative layer
        ════════════════════════════════ */
        .code-chip {
          position: absolute;
          background: rgba(255,253,248,0.9);
          border: 1px solid rgba(30,20,10,0.1);
          box-shadow: 0 2px 14px rgba(30,20,10,0.06);
          border-radius: 4px; padding: 8px 14px;
          z-index: 2; display: flex; flex-direction: column; gap: 3px;
          /* ── fully decorative: no interaction ── */
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .chip-lang { font-family: 'DM Mono', monospace; font-size: 9px; color: #d4a843; letter-spacing: 0.18em; text-transform: uppercase; }
        .chip-code { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(30,20,10,0.55); }

        /* Float anims */
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-12px) rotate(0)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1deg)}  50%{transform:translateY(-9px) rotate(0)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(1deg)}  50%{transform:translateY(-14px) rotate(-1deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
        @keyframes floatE { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes floatF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        /* Scroll caret */
        .scroll-caret {
          position: absolute; bottom: 30px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 10;
          pointer-events: none;
        }
        .caret-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.28em; color: rgba(30,20,10,0.22); text-transform: uppercase; }
        .caret-line  { width: 1px; height: 32px; background: linear-gradient(to bottom, rgba(30,20,10,0.22), transparent); animation: caretDrop 2.2s ease-in-out infinite; }
        @keyframes caretDrop {
          0%,100%{opacity:0.2;transform:scaleY(0.5);transform-origin:top}
          50%{opacity:1;transform:scaleY(1);transform-origin:top}
        }

        /* ═══════════════════════════
           MOBILE  (≤ 768px)
           Cards/chips scaled down,
           repositioned to the edges
           so they never cover text
        ═══════════════════════════ */
        @media (max-width: 768px) {
          .hero-root { padding: 96px 20px 80px; }

          /* scale the entire decorative layer down */
          .glass-card {
            min-width: 0;
            padding: 11px 13px;
            transform-origin: top left;
          }
          .gc-icon  { font-size: 12px; margin-bottom: 6px; }
          .gc-title { font-size: 18px; }
          .gc-sub   { font-size: 7.5px; }
          .gc-line  { margin-top: 8px; }

          .code-chip { display:none; }
          .chip-lang { font-size: 7.5px; }
          .chip-code { font-size: 9px; }

          /* hide vertical bands & side labels — too cramped */
          .band-v    { display: none; }
          .side-label { display: none; }
          .build-tag  { display: none; }
          .label-num  { display: none; }
          .deco-number { display: none; }
          .halftone   { display: none; }

          /* headline scale */
          .hero-h1   { font-size: clamp(2.6rem, 10vw, 4rem); line-height: 0.92; }
          .word-stamp { font-size: clamp(3rem, 12vw, 5rem); }

          /* buttons */
          .btn-main { padding: 14px 28px; font-size: 11px; }
          .btn-sec  { padding: 13px 22px; font-size: 11px; }

          /* caret */
          .scroll-caret { bottom: 18px; }
        }

        /* tiny phones */
        @media (max-width: 400px) {
          .btn-row { flex-direction: column; align-items: center; }
          .btn-main, .btn-sec { width: 100%; text-align: center; }
          .glass-card { padding: 9px 11px; }
          .gc-title   { font-size: 15px; }
        }
      `}</style>

      <section ref={sectionRef} className="hero-root">
        <div className="blob blob-amber" />
        <div className="blob blob-warm" />
        <div className="blob blob-center" />
        <div className="grid-layer" />

        <svg className="halftone halftone-tl" width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4, 5].map(row => [0, 1, 2, 3, 4, 5].map(col => (
            <circle key={`${row}-${col}`} cx={col * 15 + 7.5} cy={row * 15 + 7.5} r={2.5 - (row + col) * 0.15} fill="#1a120a" />
          )))}
        </svg>
        <svg className="halftone halftone-br" width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4, 5].map(row => [0, 1, 2, 3, 4, 5].map(col => (
            <circle key={`${row}-${col}`} cx={col * 15 + 7.5} cy={row * 15 + 7.5} r={2.5 - (row + col) * 0.15} fill="#1a120a" />
          )))}
        </svg>

        <div className="band-h band-h-top" />
        <div className="band-h band-h-bottom" />
        <div className="band-v band-v-left" />
        <div className="band-v band-v-right" />
        <div className="corner-mark cm-tl" />
        <div className="corner-mark cm-tr" />
        <div className="corner-mark cm-bl" />
        <div className="corner-mark cm-br" />

        <span className="side-label side-left">Navrasa IT Solutions — 2024</span>
        <span className="side-label side-right">Design · Build · Deploy</span>
        <span className="build-tag">Est. 2021</span>
        <span className="label-num ln-tl">001</span>
        <span className="label-num ln-bl">006</span>
        <div className="deco-number deco-left">48</div>


        {glassCards.map((c, i) => (
          <div
            key={i}
            className="glass-card float-card-anim"
            style={{
              // De
              ...cardDesktopStyle(cardDesktopPositions[i]),
              animation: `float${["A", "B", "C", "D"][i]} ${c.dur}s ease-in-out infinite`,
            }}
          >
            <span className="gc-icon">{c.icon}</span>
            <div className="gc-title">{c.title}</div>
            <div className="gc-sub">{c.sub}</div>
            <div className="gc-line" />
          </div>
        ))}

        {techChips.map((chip, i) => (
          <div
            key={i}
            className="code-chip chip-anim"
            style={{
              ...cardDesktopStyle(chipDesktopPositions[i]),
              animation: `float${["E", "F", "E", "F", "E", "F"][i]} ${5 + i * 0.4}s ${i * 0.3}s ease-in-out infinite`,
            }}
          >
            <span className="chip-lang">{chip.label}</span>
            <span className="chip-code">{chip.code}</span>
          </div>
        ))}

        <div
          className="relative z-20 text-center "
          style={{ maxWidth: "780px", padding: "0 28px", position: "relative", zIndex: 10 }}
        >
          <div className="eyebrow hero-h1-anim">Product Studio</div>

          <h1 className="hero-h1 hero-h1-anim">
            <span className="word-outline">Idea.</span>{" "}
            <span className="word-accent">Built.</span>
            <br />
            <span className="word-stamp">Launched.</span>
          </h1>

          <div className="h-divider hero-sub-anim" />

          <p className="hero-sub-text hero-sub-anim">
            NavRasa partners with founders to design, engineer,
            and ship investor-ready products — in weeks, not months.
          </p>

          <div className="btn-row hero-sub-anim">
            <button
              ref={btnRef}
              className="btn-main"
              onClick={() => navigate("/Contact")}                        >
              <span>Start a Project</span>
            </button>
            {/* <button className="btn-sec">See Our Work →</button> */}
          </div>
        </div>

        <div className="scroll-caret">
          <span className="caret-label">Scroll</span>
          <div className="caret-line" />
        </div>
      </section>


      <style>{`
                ${glassCards.map((_, i) => `
                    .glass-card:nth-child(${i + 1}) {
                        top: ${cardDesktopPositions[i].top || "auto"};
                        bottom: ${cardDesktopPositions[i].bottom || "auto"};
                        left: ${cardDesktopPositions[i].left || "auto"};
                        right: ${cardDesktopPositions[i].right || "auto"};
                    }
                `).join("")}

                @media (max-width: 768px) {
                    /* Stat cards */
                    .glass-card:nth-of-type(1) { top:6%!important;    left:-2%!important;   bottom:auto!important; right:auto!important; }
                    .glass-card:nth-of-type(2) { top:6%!important;    right:-2%!important;  bottom:auto!important; left:auto!important;  }
                    .glass-card:nth-of-type(3) { bottom:9%!important; left:-3%!important;   top:auto!important;    right:auto!important; }
                    .glass-card:nth-of-type(4) { bottom:8%!important; right:-3%!important;  top:auto!important;    left:auto!important;  }

                    /* Code chips */
                    .code-chip:nth-of-type(1) { top:26%!important;    left:-1%!important;   bottom:auto!important; right:auto!important; }
                    .code-chip:nth-of-type(2) { top:22%!important;    right:-1%!important;  bottom:auto!important; left:auto!important;  }
                    .code-chip:nth-of-type(3) { top:50%!important;    left:-2%!important;   bottom:auto!important; right:auto!important; }
                    .code-chip:nth-of-type(4) { top:54%!important;    right:-2%!important;  bottom:auto!important; left:auto!important;  }
                    .code-chip:nth-of-type(5) { bottom:22%!important; left:0%!important;    top:auto!important;    right:auto!important; }
                    .code-chip:nth-of-type(6) { bottom:20%!important; right:0%!important;   top:auto!important;    left:auto!important;  }
                }
            `}</style>
    </>
  );
};

const cardDesktopPositions = [
  { top: "12%", left: "4%" },
  { top: "10%", right: "4%" },
  { bottom: "18%", left: "3%" },
  { bottom: "16%", right: "3%" },
];

function cardDesktopStyle(pos) {
  return {
    top: pos.top ?? "auto",
    bottom: pos.bottom ?? "auto",
    left: pos.left ?? "auto",
    right: pos.right ?? "auto",
  };
}

export default Hero;