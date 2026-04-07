import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HOLOGRAM = "linear-gradient(90deg, #c9aaff, #feffbc, #ffcdfd, #b3e2ff, #839aff)";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const PAGE_SIZE = 4;

const allFaqs = [
  { id:"01", tag:"MVP Basics", question:"What is an MVP, and why do startups need it?", answer:"An MVP (Minimum Viable Product) is the simplest version of your product with core features to validate your idea in real markets. It helps startups reduce risk, attract investors, and refine their offering based on user feedback.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-3-9h6M12 8v8"/></svg> },
  { id:"02", tag:"Timeline", question:"How long does it take to build an MVP?", answer:"Most MVPs are delivered in 4 to 8 weeks, depending on complexity, features, and integrations. Our team follows agile sprints to ensure faster go-to-market and quick iterations.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
  { id:"03", tag:"Technology", question:"What technologies do you use for MVP development?", answer:"We use a modern, scalable stack including React, Flutter, Node.js, Python, and AWS. For cross-platform apps, we often use Flutter or React Native for faster development and beautiful UI.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
  { id:"04", tag:"Validation", question:"Can you help me validate my startup idea before development?", answer:"Absolutely. We offer idea validation and market research services — analyzing competition, feasibility, and audience response before coding begins. This ensures your MVP is built on real insights, not assumptions.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> },
  { id:"05", tag:"Funding", question:"Do you work with early-stage startups that don't have funding yet?", answer:"Yes! Many of our clients are pre-seed or bootstrapped founders. We structure affordable MVP packages and milestone-based payment models to help you get started without heavy upfront costs.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg> },
  { id:"06", tag:"Ownership", question:"Will I own the MVP source code after completion?", answer:"100%. Once the project is completed and payment is settled, you'll have full ownership of the code, design, and intellectual property.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M15 7a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L11 17H9v2H7v2H4a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 1 1 21 9z"/></svg> },
  { id:"07", tag:"Investment", question:"Do you help startups raise investment or pitch their MVPs?", answer:"Yes, we assist with pitch deck preparation, technical documentation, and MVP demos that impress investors. Our MVPs are designed to be investor-ready and scalable.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> },
  { id:"08", tag:"Scaling", question:"Can you scale my MVP into a full-fledged product later?", answer:"Of course. After your MVP gains traction, we provide post-MVP scaling, feature expansion, and infrastructure optimization to help you grow without rebuilding from scratch.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"/></svg> },
  { id:"09", tag:"Support", question:"Do you provide post-launch support or maintenance?", answer:"Yes, we offer ongoing support, performance optimization, and iterative updates after launch. Your success doesn't end with deployment — we stay with you through every growth phase.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/></svg> },
  { id:"10", tag:"Pricing", question:"How much does an MVP cost to build?", answer:"It depends on scope and features, but MVPs typically start from ₹60,000 to ₹2,50,000. Every startup has unique needs, so we create a custom proposal based on your idea and target market.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M9 8h6m-5 0a3 3 0 1 1 0 6H9l3 3m-3-6h6m6 1a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg> },
  { id:"11", tag:"Advanced Tech", question:"Can you integrate AI, Blockchain, or other advanced features into MVPs?", answer:"Definitely. Our team specializes in AI, ML, and Blockchain-based MVPs, helping startups stand out with future-ready technology from day one.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg> },
  { id:"12", tag:"Process", question:"What's your process for MVP development?", answer:"We follow a lean 5-step process: Idea Validation → Prototype → MVP Development → Iteration → Scaling. This ensures your MVP is agile, cost-efficient, and market-tested.", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg> },
];

// ── Responsive hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useState(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });
  return { isMobile: width < 640, isTablet: width >= 640 && width < 1024 };
}

function IconFrame({ isActive, children }) {
  return (
    <div style={{
      width:"2.75rem", height:"2.75rem", borderRadius:"0.9rem", flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      background: isActive ? "#525252" : "#f2f2f2",
      border: isActive ? "none" : "1px solid #e6e6e6",
      color: isActive ? "#fff" : "#1a1a1a",
      boxShadow: isActive
        ? "inset 0 -2px 2px #000, inset 0 0 12px #fff"
        : "inset 0 -2px 1px rgba(0,0,0,0.1), inset 0 0 1px 2px #fff",
      transition:`all 0.45s ${EASE}`
    }}>
      {children}
    </div>
  );
}

function Blade({ faq, isActive, onActivate }) {
  return (
    <button
      onClick={onActivate}
      onMouseEnter={onActivate}
      style={{
        width:"100%", textAlign:"left",
        padding:"1.1rem 1.2rem",
        borderRadius:"1.25rem",
        border: isActive ? "1px solid #d8d8d8" : "1px solid #ebebeb",
        background: isActive ? "#f2f2f2" : "#fff",
        cursor:"pointer", position:"relative", overflow:"hidden",
        boxShadow: isActive ? "inset 0 -2px 1px rgba(0,0,0,0.06), inset 0 0 1px 2px #fff" : "none",
        transition:`all 0.4s ${EASE}`
      }}
    >
      <div style={{
        position:"absolute", top:0,
        left: isActive ? "160%" : "-80%",
        width:"60%", height:"100%",
        background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
        pointerEvents:"none", transition:"left 0.55s ease"
      }} />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", minWidth:0 }}>
          <span style={{
            fontFamily:"monospace", fontSize:"0.7rem", fontWeight:700,
            color: isActive ? "#1a1a1a" : "#bbb", flexShrink:0,
            transition:"color 0.3s"
          }}>{faq.id}</span>
          <span style={{
            fontSize:"0.92rem", fontWeight:500,
            color: isActive ? "#1a1a1a" : "rgba(0,0,0,0.4)",
            lineHeight:1.35, transition:"color 0.3s",
            /* prevent long questions from overflowing */
            overflow:"hidden", display:"-webkit-box",
            WebkitLineClamp:2, WebkitBoxOrient:"vertical"
          }}>{faq.question}</span>
        </div>
        <div style={{
          flexShrink:0, width:26, height:26, borderRadius:"0.55rem",
          background: isActive ? "#1a1a1a" : "#f2f2f2",
          display:"flex", alignItems:"center", justifyContent:"center",
          transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
          transition:`all 0.35s ${EASE}`
        }}>
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
            <path d="M7 17L17 7M7 7h10v10" stroke={isActive?"#fff":"#aaa"} strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </button>
  );
}

function AnswerPanel({ faq, isSticky }) {
  return (
    <motion.div
      key={faq.id}
      initial={{opacity:0,y:10}}
      animate={{opacity:1,y:0}}
      exit={{opacity:0,y:-10}}
      transition={{duration:0.3,ease:[0.4,0,0.2,1]}}
      style={{
        position: isSticky ? "sticky" : "relative",
        top: isSticky ? "2rem" : "auto",
        width:"100%",
        background:"#fff",
        borderRadius:"1.75rem",
        border:"1px solid #ebebeb",
        padding:"1.8rem 1.5rem",
        minHeight: isSticky ? "320px" : "auto",
        display:"flex", flexDirection:"column",
        overflow:"hidden",
        boxShadow:"inset 0 -2px 1px rgba(0,0,0,0.06), inset 0 0 1px 2px #fff"
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:HOLOGRAM, borderRadius:"1.75rem 1.75rem 0 0" }} />
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.4rem" }}>
        <IconFrame isActive>{faq.icon}</IconFrame>
        <span style={{ fontSize:"0.67rem", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.08em", color:"rgba(0,0,0,0.3)" }}>
          Insight card — {faq.tag}
        </span>
      </div>
      <h3 style={{ fontSize:"clamp(1.1rem, 2.5vw, 1.3rem)", fontWeight:500, color:"#1a1a1a", lineHeight:1.35, letterSpacing:"-0.02em", marginBottom:"0.8rem" }}>
        {faq.question}
      </h3>
      <p style={{ fontSize:"0.92rem", color:"rgba(0,0,0,0.6)", lineHeight:1.7, flex:1 }}>{faq.answer}</p>
      <div style={{ marginTop:"1.5rem", paddingTop:"1rem", borderTop:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"monospace", fontSize:"0.63rem", color:"#d0d0d0", textTransform:"uppercase", letterSpacing:"0.05em" }}>sys_log: data_fetch_ok</span>
        <div style={{ height:"3px", width:"2.5rem", borderRadius:"2px", background:HOLOGRAM }} />
      </div>
    </motion.div>
  );
}

// ── Pagination Strip ──────────────────────────────────────────────────────────
function PaginationStrip({ page, totalPages, onPrev, onNext, onDot, isMobile }) {
  return (
    <div style={{
      marginTop:"2rem",
      display:"flex",
      alignItems:"center",
      justifyContent: isMobile ? "space-between" : "space-between",
      gap:"0.75rem",
      padding: isMobile ? "1rem 1.1rem" : "1.2rem 1.5rem",
      borderRadius:"1.25rem",
      border:"1px solid #ebebeb",
      background:"#fafafa",
      flexWrap: isMobile ? "wrap" : "nowrap"
    }}>
      {/* Info */}
      <span style={{ fontSize:"0.72rem", fontWeight:500, color:"rgba(0,0,0,0.35)", letterSpacing:"0.06em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
        Page <strong style={{color:"#1a1a1a"}}>{page+1}</strong> / <strong style={{color:"#1a1a1a"}}>{totalPages}</strong>
      </span>

      {/* Dot indicators */}
      <div style={{ display:"flex", gap:5, alignItems:"center" }}>
        {Array.from({length:totalPages}).map((_,i) => (
          <div key={i} onClick={() => onDot(i)} style={{
            width: i===page ? 18 : 6, height:6,
            borderRadius: i===page ? 4 : "50%",
            background: i===page ? "#1a1a1a" : "#e0e0e0",
            cursor:"pointer", transition:"all 0.3s ease"
          }} />
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display:"flex", gap:"0.4rem" }}>
        {[
          { label:"Prev", onClick:onPrev, icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> },
          { label:"Next", onClick:onNext, icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> },
        ].map(({ label, onClick, icon }, i) => (
          <button key={label} onClick={onClick}
            disabled={i===0 ? page===0 : page===totalPages-1}
            style={{
              padding: isMobile ? "0.5rem 0.9rem" : "0.55rem 1.1rem",
              borderRadius:"0.8rem",
              border:`1px solid ${i===1?"#1a1a1a":"#e0e0e0"}`,
              background: i===1 ? "#1a1a1a" : "#fff",
              color: i===1 ? "#fff" : "#1a1a1a",
              fontSize:"0.8rem", fontWeight:500, cursor:"pointer",
              display:"flex", alignItems:"center", gap:5,
              fontFamily:"inherit", transition:`all 0.25s ${EASE}`,
              opacity: (i===0 && page===0)||(i===1 && page===totalPages-1) ? 0.3 : 1
            }}>
            {i===0 && icon}{label}{i===1 && icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();

  const totalPages = Math.ceil(allFaqs.length / PAGE_SIZE);
  const pageFaqs = allFaqs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const changePage = (dir) => {
    const next = page + dir;
    if (next < 0 || next >= totalPages) return;
    setPage(next);
    setActiveIndex(0);
  };

  // On mobile/tablet: show answer panel between blades (after active blade) or below all blades
  // On desktop: two-column side-by-side grid
  const isDesktop = !isMobile && !isTablet;

  return (
    <section style={{
      backgroundColor:"#fff",
      fontFamily:"Geist, Arial, sans-serif",
      padding: isMobile ? "3rem 4%" : isTablet ? "4rem 5%" : "5rem 5%",
      color:"#1a1a1a"
    }}>
      <div style={{ maxWidth:"65rem", margin:"0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          display:"flex",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent:"space-between",
          flexDirection: isMobile ? "column" : "row",
          paddingBottom:"2rem",
          borderBottom:"1px solid rgba(0,0,0,0.08)",
          marginBottom:"2.5rem",
          gap:"1.25rem"
        }}>
          <div style={{ maxWidth:"500px" }}>
            <span style={{ fontSize:"0.63rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(0,0,0,0.35)" }}>FAQ Section</span>
            <h2 style={{
              fontSize:"clamp(2rem, 6vw, 3.8rem)",
              fontWeight:600, letterSpacing:"-0.04em", lineHeight:1.05,
              margin:"0.5rem 0 0", color:"#0f0f0f"
            }}>
              Common <span style={{opacity:0.4}}>queries</span>
            </h2>
          </div>
          {/* Hide the decorative bar chart on mobile to save space */}
          {!isMobile && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.5rem" }}>
              <span style={{ fontSize:"0.63rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(0,0,0,0.35)" }}>System Online</span>
              <div style={{ display:"flex", gap:4, alignItems:"flex-end" }}>
                {[10,16,22,14,20].map((h,i) => (
                  <div key={i} style={{ width:4, height:h, borderRadius:3, background:"linear-gradient(180deg,#dcdcdc,#bfbfbf)", opacity:0.8 }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Grid — desktop: side-by-side | mobile/tablet: stacked ── */}
        {isDesktop ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" }}>
            {/* Left: blade list */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
              {pageFaqs.map((faq, i) => (
                <Blade key={faq.id} faq={faq} isActive={i===activeIndex} onActivate={() => setActiveIndex(i)} />
              ))}
            </div>
            {/* Right: answer panel (sticky) */}
            <AnimatePresence mode="wait">
              <AnswerPanel key={`${page}-${activeIndex}`} faq={pageFaqs[activeIndex]} isSticky />
            </AnimatePresence>
          </div>
        ) : (
          /* Mobile / tablet: blades stacked, active blade expands answer below it */
          <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
            {pageFaqs.map((faq, i) => (
              <div key={faq.id}>
                <Blade faq={faq} isActive={i===activeIndex} onActivate={() => setActiveIndex(i)} />
                <AnimatePresence>
                  {i === activeIndex && (
                    <motion.div
                      initial={{opacity:0, height:0}}
                      animate={{opacity:1, height:"auto"}}
                      exit={{opacity:0, height:0}}
                      transition={{duration:0.35, ease:[0.4,0,0.2,1]}}
                      style={{overflow:"hidden", marginTop:"0.45rem"}}
                    >
                      <AnswerPanel key={`${page}-${activeIndex}`} faq={faq} isSticky={false} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        <PaginationStrip
          page={page} totalPages={totalPages} isMobile={isMobile}
          onPrev={() => changePage(-1)} onNext={() => changePage(1)}
          onDot={(i) => { setPage(i); setActiveIndex(0); }}
        />

        {/* ── CTA ── */}
        <div style={{
          marginTop:"2.5rem",
          borderRadius: isMobile ? "1.5rem" : "2rem",
          background:"#1a1a1a", color:"#fff",
          padding: isMobile ? "1.8rem 1.5rem" : "2.5rem",
          display:"flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent:"space-between",
          gap:"1.5rem",
          position:"relative", overflow:"hidden"
        }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(201,170,255,0.12) 0%,transparent 50%,rgba(131,154,255,0.1) 100%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1, maxWidth:"28rem" }}>
            <h4 style={{ fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight:500, letterSpacing:"-0.03em", marginBottom:"0.4rem" }}>
              Still seeking answers?
            </h4>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.86rem", lineHeight:1.6, margin:0 }}>
              Our engineering consultants are available for a 15-minute architecture review.
            </p>
          </div>
          <div onClick={() => navigate("/contact")} style={{ position:"relative", zIndex:1, flexShrink:0 }}>
            <button
              style={{
                padding:"0.7rem 1.4rem",
                borderRadius:"0.9rem",
                background:"#fff", color:"#1a1a1a",
                fontWeight:500, fontSize:"0.86rem",
                border:"none", cursor:"pointer",
                fontFamily:"inherit",
                whiteSpace:"nowrap",
                boxShadow:"inset 0 -2px 1px rgba(0,0,0,0.1), inset 0 0 1px 2px rgba(255,255,255,0.8)",
                transition:`transform 0.3s ${EASE}`
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              onMouseDown={e=>e.currentTarget.style.transform="scale(0.98)"}
              onMouseUp={e=>e.currentTarget.style.transform="scale(1.02)"}
            >
              Book a technical call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}