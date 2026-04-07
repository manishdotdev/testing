import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const HOLOGRAM = "linear-gradient(90deg, #c9aaff, #feffbc, #ffcdfd, #b3e2ff, #839aff)";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const faqs = [
  {
    id: "01",
    question: "What industries do you work with?",
    answer:
      "We architect solutions for Fintech, Healthtech, and Enterprise SaaS. Our systems are built to handle high-concurrency and strict data compliance.",
    tag: "Market scope",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-3-9h6M12 8v8" />
      </svg>
    ),
  },
  {
    id: "02",
    question: "How long does implementation take?",
    answer:
      "Deployment cycles range from 2–6 weeks. We use a modular Sprint-Build approach to ensure core infrastructure is live within 14 days.",
    tag: "Timeline",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "03",
    question: "Is AI automation secure?",
    answer:
      "Security is non-negotiable. We implement Zero-Trust access, AES-256 encryption, and SOC2-compliant data handling for every node we build.",
    tag: "Security",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "04",
    question: "What kind of ROI can we expect?",
    answer:
      "Clients typically see a 40% reduction in operational overhead. We focus on high-leverage automation that frees your team for strategic work.",
    tag: "Efficiency",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
  },
];

// ─── Icon Frame (matches ProcessSection) ─────────────────────────────────────
function IconFrame({ isActive, children }) {
  return (
    <div
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "1rem",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isActive ? "#525252" : "#f2f2f2",
        border: isActive ? "none" : "1px solid #e6e6e6",
        color: isActive ? "#fff" : "#1a1a1a",
        boxShadow: isActive
          ? "inset 0 -2px 2px #000, inset 0 0 12px #fff"
          : "inset 0 -2px 1px rgba(0,0,0,0.1), inset 0 0 1px 2px #fff",
        transition: `all 0.45s ${EASE}`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Blade (left list item) ───────────────────────────────────────────────────
function Blade({ faq, isActive, onActivate }) {
  return (
    <button
      onClick={onActivate}
      onMouseEnter={onActivate}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "1.3rem 1.5rem",
        borderRadius: "1.5rem",
        border: isActive ? "1px solid #d8d8d8" : "1px solid #ebebeb",
        background: isActive ? "#f2f2f2" : "#fff",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: isActive
          ? "inset 0 -2px 1px rgba(0,0,0,0.06), inset 0 0 1px 2px #fff"
          : "none",
        transition: `all 0.4s ${EASE}`,
      }}
    >
      {/* Shine sweep on activate */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: isActive ? "160%" : "-80%",
          width: "60%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
          pointerEvents: "none",
          transition: "left 0.55s ease",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: isActive ? "#1a1a1a" : "#bbb",
              minWidth: "1.5rem",
              transition: `color 0.3s`,
            }}
          >
            {faq.id}
          </span>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 500,
              color: isActive ? "#1a1a1a" : "rgba(0,0,0,0.4)",
              lineHeight: 1.35,
              transition: `color 0.3s`,
            }}
          >
            {faq.question}
          </span>
        </div>

        {/* Arrow icon */}
        <div
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "0.6rem",
            background: isActive ? "#1a1a1a" : "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
            transition: `all 0.35s ${EASE}`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
            <path d="M7 17L17 7M7 7h10v10" stroke={isActive ? "#fff" : "#aaa"} strokeWidth="2" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── Answer Panel (right sticky card) ────────────────────────────────────────
function AnswerPanel({ faq }) {
  return (
    <motion.div
      key={faq.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: window.innerWidth < 768 ? "relative" : "sticky",
        top: window.innerWidth < 768 ? "auto" : "2rem",
        width: "100%",
        background: "#fff",
        borderRadius: "2rem",
        border: "1px solid #ebebeb",
        padding: "2.2rem 2rem",
        minHeight: "340px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "inset 0 -2px 1px rgba(0,0,0,0.06), inset 0 0 1px 2px #fff",
      }}
    >
      {/* Holographic top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: HOLOGRAM,
          borderRadius: "2rem 2rem 0 0",
        }}
      />

      {/* Icon + tag row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.8rem" }}>
        <IconFrame isActive>{faq.icon}</IconFrame>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(0,0,0,0.3)",
          }}
        >
          Insight card — {faq.tag}
        </span>
      </div>

      <h3
        style={{
          fontSize: "1.35rem",
          fontWeight: 500,
          color: "#1a1a1a",
          lineHeight: 1.35,
          letterSpacing: "-0.02em",
          marginBottom: "0.9rem",
        }}
      >
        {faq.question}
      </h3>

      <p
        style={{
          fontSize: "0.95rem",
          color: "rgba(0,0,0,0.6)",
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {faq.answer}
      </p>

      {/* Footer */}
      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1.2rem",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: "#d0d0d0",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          sys_log: data_fetch_ok
        </span>
        <div
          style={{
            height: "3px",
            width: "2.5rem",
            borderRadius: "2px",
            background: HOLOGRAM,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundColor: "#fff",
        fontFamily: "Geist, Arial, sans-serif",
        padding: "5rem 5%",
        color: "#1a1a1a",
      }}
    >
      <div style={{ maxWidth: "65rem", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            marginBottom: "3rem",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT */}
          <div style={{ maxWidth: "500px" }}>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)",
              }}
            >
              FAQ Section
            </span>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                margin: "0.6rem 0 0",
                color: "#0f0f0f",
              }}
            >
              Common <span style={{ opacity: 0.4 }}>queries</span>
            </h2>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(0,0,0,0.35)",
              }}
            >
              System Online
            </span>

            {/* Bars */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "flex-end",
              }}
            >
              {[10, 16, 22, 14, 20].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: `${h}px`,
                    borderRadius: "3px",
                    background: "linear-gradient(180deg, #dcdcdc, #bfbfbf)",
                    opacity: 0.8,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Layout: blades + panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth < 768 ? "1fr" : "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left — blades */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {faqs.map((faq, i) => (
              <Blade
                key={faq.id}
                faq={faq}
                isActive={i === activeIndex}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Right — sticky answer card */}
          <AnimatePresence mode="wait">
            <AnswerPanel key={activeIndex} faq={faqs[activeIndex]} />
          </AnimatePresence>
        </div>

        {/* CTA strip */}
        <div
          style={{
            marginTop: "3rem",
            borderRadius: "2rem",
            background: "#1a1a1a",
            color: "#fff",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle holographic ambient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(201,170,255,0.12) 0%, transparent 50%, rgba(131,154,255,0.1) 100%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "28rem" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              Still seeking answers?
            </h4>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              Our engineering consultants are available for a 15-minute architecture review.
            </p>
          </div>

          <div onClick={() => navigate("/contact")} style={{ position: "relative", zIndex: 1, display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "1rem",
                background: "#fff",
                color: "#1a1a1a",
                fontWeight: 500,
                fontSize: "0.88rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "inset 0 -2px 1px rgba(0,0,0,0.1), inset 0 0 1px 2px rgba(255,255,255,0.8)",
                transition: `transform 0.3s ${EASE}`,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            >
              Book a technical call
            </button>
            
          </div>
        </div>

      </div>
    </section>
  );
}