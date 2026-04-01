import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery & Audit",
    desc: "We analyze your workflows, bottlenecks, and revenue opportunities.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.2rem", height: "2.2rem" }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M29.6991 32.8345C29.5503 31.0109 31.0596 29.4884 32.8675 29.6385C33.1809 29.6645 33.5562 29.7786 33.9384 29.8948C34.049 29.9283 34.1157 29.9484 34.149 29.9584C34.5002 30.064 34.8496 30.169 35.1153 30.3126C36.6407 31.1365 37.1331 33.1053 36.1777 34.5606C36.0113 34.8141 35.7532 35.0737 35.4936 35.3347C35.469 35.3595 35.4444 35.3843 35.4198 35.4091C35.3952 35.4339 35.3706 35.4588 35.3461 35.4836C35.0873 35.7454 34.8299 36.0058 34.5786 36.1737C33.1359 37.1374 31.1841 36.6407 30.3673 35.1019C30.225 34.8339 30.1209 34.4815 30.0162 34.1272C30.0063 34.0936 29.9963 34.06 29.9864 34.0264C29.9753 33.9891 29.9642 33.9519 29.9531 33.9148C29.8379 33.5293 29.7249 33.1507 29.6991 32.8345Z" fill="currentColor" />
        <path d="M33.5463 18.5717C33.5463 26.9875 26.7829 33.8098 18.4398 33.8098C10.0967 33.8098 3.33331 26.9875 3.33331 18.5717C3.33331 10.1559 10.0967 3.3335 18.4398 3.3335C26.7829 3.3335 33.5463 10.1559 33.5463 18.5717Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Automation Blueprint",
    desc: "We design a detailed automation architecture aligned with KPIs.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.2rem", height: "2.2rem" }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.1782 7.09302C12.6265 4.93166 10.6665 3.3335 8.33331 3.3335C5.57189 3.3335 3.33331 5.57207 3.33331 8.3335C3.33331 10.6667 4.93147 12.6267 7.09284 13.1784C7.08655 13.2292 7.08331 13.281 7.08331 13.3335V26.6668C7.08331 26.7193 7.08656 26.7711 7.09284 26.8219C4.93148 27.3736 3.33331 29.3336 3.33331 31.6668C3.33331 34.4283 5.57189 36.6668 8.33331 36.6668C10.6665 36.6668 12.6265 35.0687 13.1782 32.9073C13.229 32.9136 13.2808 32.9168 13.3333 32.9168H26.6666C26.7192 32.9168 26.7709 32.9136 26.8217 32.9073C27.3735 35.0687 29.3334 36.6668 31.6666 36.6668C34.4281 36.6668 36.6666 34.4283 36.6666 31.6668C36.6666 29.3336 35.0685 27.3736 32.9071 26.8219C32.9134 26.7711 32.9166 26.7193 32.9166 26.6668V13.3335C32.9166 13.281 32.9134 13.2292 32.9071 13.1784C35.0685 12.6267 36.6666 10.6667 36.6666 8.3335C36.6666 5.57207 34.4281 3.3335 31.6666 3.3335C29.3334 3.3335 27.3735 4.93166 26.8217 7.09303C26.7709 7.08674 26.7192 7.0835 26.6666 7.0835H13.3333C13.2808 7.0835 13.229 7.08674 13.1782 7.09302ZM9.57379 13.1784C9.58007 13.2292 9.58331 13.281 9.58331 13.3335L9.58331 26.6668C9.58331 26.7193 9.58007 26.7711 9.57378 26.8219C11.3385 27.2724 12.7278 28.6616 13.1782 30.4264C13.229 30.4201 13.2808 30.4168 13.3333 30.4168H26.6666C26.7192 30.4168 26.7709 30.4201 26.8217 30.4264C27.2722 28.6616 28.6615 27.2724 30.4262 26.8219C30.4199 26.7711 30.4166 26.7193 30.4166 26.6668V13.3335C30.4166 13.281 30.4199 13.2292 30.4262 13.1784C28.6615 12.7279 27.2722 11.3387 26.8217 9.57397C26.7709 9.58025 26.7192 9.5835 26.6666 9.5835H13.3333C13.2808 9.5835 13.229 9.58026 13.1782 9.57397C12.7278 11.3387 11.3385 12.7279 9.57379 13.1784Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Build & Integration",
    desc: "Our engineers implement AI systems and integrate with your existing tools.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.2rem", height: "2.2rem" }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M23.798 3.58723C23.1808 3.3335 22.3983 3.3335 20.8333 3.3335C19.2684 3.3335 18.4859 3.3335 17.8687 3.58723C17.0457 3.92554 16.3918 4.57446 16.0509 5.39122C15.8953 5.76406 15.8344 6.19766 15.8106 6.83015C15.7756 7.75963 15.2953 8.61999 14.4836 9.08505C13.672 9.5501 12.6811 9.53273 11.8525 9.09809C11.2886 8.80233 10.8798 8.63787 10.4766 8.58519C9.59348 8.4698 8.7003 8.70732 7.99359 9.2455C7.46356 9.64913 7.07232 10.3217 6.28984 11.6667C5.50736 13.0118 5.11612 13.6843 5.02891 14.3417C4.91264 15.2182 5.15197 16.1046 5.69424 16.806C5.94176 17.1261 6.28962 17.3952 6.82951 17.7319C7.62319 18.2268 8.13387 19.0699 8.13382 20.0002C8.13377 20.9304 7.62311 21.7734 6.8295 22.2682C6.28953 22.605 5.94162 22.8741 5.69408 23.1943C5.1518 23.8956 4.91248 24.782 5.02875 25.6585C5.11595 26.3159 5.50719 26.9884 6.28967 28.3335C7.07216 29.6786 7.4634 30.3511 7.99343 30.7547C8.70014 31.2929 9.59332 31.5304 10.4765 31.415C10.8796 31.3623 11.2884 31.1979 11.8522 30.9022C12.6809 30.4675 13.6718 30.4501 14.4835 30.9152C15.2952 31.3803 15.7756 32.2407 15.8106 33.1703C15.8344 33.8027 15.8953 34.2363 16.0509 34.6091C16.3918 35.4259 17.0457 36.0748 17.8687 36.4131C18.4859 36.6668 19.2684 36.6668 20.8333 36.6668C22.3983 36.6668 23.1808 36.6668 23.798 36.4131C24.621 36.0748 25.2748 35.4259 25.6157 34.6091C25.7714 34.2362 25.8323 33.8026 25.8561 33.1701C25.8911 32.2407 26.3714 31.3803 27.183 30.9152C27.9947 30.4501 28.9857 30.4674 29.8143 30.9021C30.3781 31.1978 30.7869 31.3622 31.19 31.4149C32.0732 31.5303 32.9664 31.2928 33.6731 30.7546C34.2031 30.351 34.5943 29.6784 35.3768 28.3334C36.1593 26.9883 36.5506 26.3158 36.6378 25.6584C36.754 24.7819 36.5147 23.8955 35.9724 23.1941C35.7249 22.874 35.377 22.6049 34.8371 22.2682C34.0434 21.7733 33.5328 20.9302 33.5328 20C33.5329 19.0699 34.0435 18.227 34.8371 17.7321C35.3771 17.3954 35.725 17.1263 35.9726 16.8061C36.5149 16.1047 36.7542 15.2183 36.6379 14.3418C36.5507 13.6844 36.1595 13.0119 35.377 11.6668C34.5945 10.3218 34.2033 9.64924 33.6732 9.24561C32.9665 8.70743 32.0733 8.46991 31.1902 8.5853C30.787 8.63798 30.3782 8.80242 29.8144 9.09816C28.9858 9.53282 27.9948 9.55019 27.1831 9.0851C26.3714 8.62001 25.8911 7.7596 25.8561 6.83006C25.8322 6.19762 25.7713 5.76405 25.6157 5.39122C25.2748 4.57446 24.621 3.92554 23.798 3.58723ZM20.8333 25.0002C23.6158 25.0002 25.8714 22.7616 25.8714 20.0002C25.8714 17.2387 23.6158 15.0002 20.8333 15.0002C18.0509 15.0002 15.7953 17.2387 15.7953 20.0002C15.7953 22.7616 18.0509 25.0002 20.8333 25.0002Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Testing & Optimization",
    desc: "Performance testing, data validation, refinement.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.2rem", height: "2.2rem" }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 20.0002C3.33331 10.7954 10.7952 3.3335 20 3.3335C29.2047 3.3335 36.6666 10.7954 36.6666 20.0002C36.6666 29.2049 29.2047 36.6668 20 36.6668C10.7952 36.6668 3.33331 29.2049 3.33331 20.0002ZM18.75 8.3335C18.75 7.64314 19.3096 7.0835 20 7.0835C27.1337 7.0835 32.9166 12.8665 32.9166 20.0002C32.9166 27.1338 27.1337 32.9168 20 32.9168C12.8663 32.9168 7.08331 27.1338 7.08331 20.0002C7.08331 19.3098 7.64296 18.7502 8.33331 18.7502C9.02367 18.7502 9.58331 19.3098 9.58331 20.0002C9.58331 25.7531 14.247 30.4168 20 30.4168C25.7529 30.4168 30.4166 25.7531 30.4166 20.0002C30.4166 14.2472 25.7529 9.5835 20 9.5835C19.3096 9.5835 18.75 9.02385 18.75 8.3335ZM20 12.0835C19.3096 12.0835 18.75 12.6431 18.75 13.3335C18.75 14.0239 19.3096 14.5835 20 14.5835C22.9915 14.5835 25.4166 17.0086 25.4166 20.0002C25.4166 22.9917 22.9915 25.4168 20 25.4168C19.3096 25.4168 18.75 25.9765 18.75 26.6668C18.75 27.3572 19.3096 27.9168 20 27.9168C24.3722 27.9168 27.9166 24.3724 27.9166 20.0002C27.9166 15.6279 24.3722 12.0835 20 12.0835Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Deployment & Scaling",
    desc: "Launch, monitor, and continuously optimize for growth.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.2rem", height: "2.2rem" }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M24.0778 27.2951L33.8225 17.5795C35.2259 16.1804 35.9276 15.4808 36.2972 14.5911C36.6668 13.7015 36.6668 12.7121 36.6668 10.7334V9.78812C36.6668 6.74538 36.6668 5.22401 35.7187 4.27875C34.7706 3.3335 33.2447 3.3335 30.1928 3.3335H29.2447C27.26 3.3335 26.2676 3.3335 25.3753 3.70199C24.483 4.07049 23.7813 4.77008 22.3779 6.16926L12.6332 15.8848C10.9933 17.5197 9.97649 18.5335 9.58275 19.5126C9.45834 19.822 9.39614 20.1279 9.39614 20.4489C9.39614 21.7857 10.4751 22.8615 12.6332 25.013L12.9232 25.3022L16.3207 21.854C16.8053 21.3622 17.5967 21.3564 18.0884 21.8409C18.5802 22.3254 18.5861 23.1168 18.1015 23.6086L14.6936 27.0673L14.9221 27.2951C17.0801 29.4466 18.1591 30.5224 19.4999 30.5224C19.7962 30.5224 20.0796 30.4699 20.3648 30.3648C21.3702 29.9945 22.3966 28.9712 24.0778 27.2951ZM28.6558 15.8855C27.3917 17.1458 25.3421 17.1458 24.078 15.8855C22.8138 14.6252 22.8138 12.5817 24.078 11.3214C25.3421 10.0611 27.3917 10.0611 28.6558 11.3214C29.9199 12.5817 29.9199 14.6252 28.6558 15.8855Z" fill="currentColor" />
      </svg>
    ),
  },
];

const HOLOGRAM_V = "linear-gradient(180deg, #c9aaff 0%, #feffbc 25%, #ffcdfd 50%, #b3e2ff 75%, #839aff 100%)";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

function lerp(a, b, t) { return a + (b - a) * t; }

// ─── Animated Dot ─────────────────────────────────────────────────────────────
function Dot({ isActive }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ scale: 1, rotation: 0, hue: 0, pulsePhase: 0, ringScale: 0, ringAlpha: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = 48;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const s = stateRef.current;

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const cx = SIZE / 2, cy = SIZE / 2;

      if (isActive) {
        s.ringAlpha = lerp(s.ringAlpha, 1, 0.08);
        s.ringScale = lerp(s.ringScale, 1, 0.06);
        s.pulsePhase += 0.06;
        s.hue += 1.2;

        // Outer ring pulse
        const ringR = 18 + Math.sin(s.pulsePhase) * 2;
        const ringAlpha = 0.35 + Math.sin(s.pulsePhase) * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR * s.ringScale, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${s.hue % 360}, 80%, 70%, ${ringAlpha * s.ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Second outer ring
        const ring2R = 14 + Math.sin(s.pulsePhase + Math.PI * 0.7) * 1.5;
        const ring2Alpha = 0.25 + Math.sin(s.pulsePhase + Math.PI * 0.7) * 0.1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring2R * s.ringScale, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${(s.hue + 120) % 360}, 80%, 75%, ${ring2Alpha * s.ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Rotating gradient rounded square
        ctx.save();
        ctx.translate(cx, cy);
        s.rotation += 0.025;
        ctx.rotate(s.rotation);
        const size = 11;
        const r = 3.5;
        const grad = ctx.createLinearGradient(-size, -size, size, size);
        const h = s.hue % 360;
        grad.addColorStop(0, `hsl(${h}, 80%, 75%)`);
        grad.addColorStop(0.33, `hsl(${(h + 60) % 360}, 80%, 80%)`);
        grad.addColorStop(0.66, `hsl(${(h + 180) % 360}, 75%, 78%)`);
        grad.addColorStop(1, `hsl(${(h + 300) % 360}, 80%, 75%)`);
        ctx.beginPath();
        ctx.moveTo(-size + r, -size); ctx.lineTo(size - r, -size);
        ctx.quadraticCurveTo(size, -size, size, -size + r);
        ctx.lineTo(size, size - r);
        ctx.quadraticCurveTo(size, size, size - r, size);
        ctx.lineTo(-size + r, size);
        ctx.quadraticCurveTo(-size, size, -size, size - r);
        ctx.lineTo(-size, -size + r);
        ctx.quadraticCurveTo(-size, -size, -size + r, -size);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Inner dark center dot
        const innerPulse = 0.5 + Math.sin(s.pulsePhase * 1.5) * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, 2.5 * innerPulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10,10,10,0.85)";
        ctx.fill();

      } else {
        s.ringAlpha = lerp(s.ringAlpha, 0, 0.1);
        s.rotation = lerp(s.rotation, Math.round(s.rotation / (Math.PI / 2)) * (Math.PI / 2), 0.08);
        s.ringScale = lerp(s.ringScale, 0.3, 0.1);

        // Static rounded square
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(s.rotation);
        const size = 8.5;
        const r = 2.5;
        ctx.beginPath();
        ctx.moveTo(-size + r, -size); ctx.lineTo(size - r, -size);
        ctx.quadraticCurveTo(size, -size, size, -size + r);
        ctx.lineTo(size, size - r);
        ctx.quadraticCurveTo(size, size, size - r, size);
        ctx.lineTo(-size + r, size);
        ctx.quadraticCurveTo(-size, size, -size, size - r);
        ctx.lineTo(-size, -size + r);
        ctx.quadraticCurveTo(-size, -size, -size + r, -size);
        ctx.closePath();
        ctx.fillStyle = "#e0e0e0";
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "48px", height: "48px", display: "block", flexShrink: 0 }}
    />
  );
}

// ─── Icon Frame ───────────────────────────────────────────────────────────────
function IconFrame({ icon, isActive, size = "5rem", radius = "1.75rem" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      border: isActive ? "none" : "1px solid #e6e6e6",
      background: isActive ? "#525252" : "#f2f2f2",
      color: isActive ? "#fff" : "#1a1a1a",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      boxShadow: isActive
        ? "inset 0 -2px 2px #000, inset 0 0 12px #fff"
        : "inset 0 -2px 1px rgba(0,0,0,0.12), inset 0 0 1px 2px #fff",
      transition: `all 0.5s ${EASE}`,
    }}>
      {icon}
    </div>
  );
}

// ─── Number Badge ─────────────────────────────────────────────────────────────
function NumberBadge({ id, isActive }) {
  return (
    <div style={{
      width: "2rem", height: "2rem", borderRadius: "0.75rem",
      background: isActive ? "#e8e8e8" : "#f2f2f2",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize: "0.875rem", flexShrink: 0,
      transition: `all 0.5s ${EASE}`,
    }}>
      {id}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProcessSection() {
  // activeSet tracks ALL cards that have scrolled past the midpoint
  const [activeSet, setActiveSet] = useState(new Set());
  const [lineProgress, setLineProgress] = useState(0);

  const desktopRefs = useRef([]);
  const mobileRefs = useRef([]);

  const lineRafRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isMobileRef = useRef(false);

  // Smooth line animation
  const animateLine = useCallback(() => {
    const diff = targetProgressRef.current - currentProgressRef.current;
    if (Math.abs(diff) > 0.001) {
      currentProgressRef.current = lerp(currentProgressRef.current, targetProgressRef.current, 0.1);
      setLineProgress(currentProgressRef.current);
      lineRafRef.current = requestAnimationFrame(animateLine);
    } else {
      currentProgressRef.current = targetProgressRef.current;
      setLineProgress(currentProgressRef.current);
      lineRafRef.current = null;
    }
  }, []);

  const kickLine = useCallback(() => {
    if (!lineRafRef.current) lineRafRef.current = requestAnimationFrame(animateLine);
  }, [animateLine]);

  useEffect(() => {
    const checkMobile = () => { isMobileRef.current = window.innerWidth < 700; };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const onScroll = () => {
      const refs = isMobileRef.current ? mobileRefs : desktopRefs;
      const els = refs.current.filter(Boolean);
      if (!els.length) return;

      const vhMid = window.innerHeight * 0.5;

      // Build new active set — all cards whose center has crossed the midpoint
      const newSet = new Set();
      els.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        if (centerY < vhMid + 40) newSet.add(i);
      });

      setActiveSet(newSet);

      // Line fill progress
      const firstR = els[0].getBoundingClientRect();
      const lastR = els[els.length - 1].getBoundingClientRect();
      const firstC = firstR.top + firstR.height / 2;
      const lastC = lastR.top + lastR.height / 2;
      const span = lastC - firstC;
      if (span !== 0) {
        targetProgressRef.current = Math.max(0, Math.min(1, (vhMid - firstC) / span));
        kickLine();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
      if (lineRafRef.current) cancelAnimationFrame(lineRafRef.current);
    };
  }, [kickLine]);

  return (
    <>
      <style>{`
        .ps-desktop { display: none !important; }
        .ps-mobile  { display: flex !important; }
        @media (min-width: 700px) {
          .ps-desktop { display: block !important; }
          .ps-mobile  { display: none !important; }
        }
      `}</style>

      <section style={{ backgroundColor: "#fff", fontFamily: "Geist, Arial, sans-serif", padding: "5rem 5%" }}>
        <div style={{ maxWidth: "65rem", margin: "0 auto" }}>

          {/* Eyebrow */}


          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "3.5rem",
              textAlign: "center",
            }}
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6em",
                background: "rgba(0,0,0,0.03)",
                borderRadius: "100vw",
                padding: "0.6em 1em",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {/* <span style={{ color: "rgba(0,0,0,0.4)" }}>004</span>
              <span
                style={{
                  width: "0.6em",
                  height: "0.6em",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                }}
              />
              <span>process</span> */}
            </motion.div>

            {/* Title */}
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 4.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  margin: 0,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {["How", "We", "Work"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          delay: i * 0.15, // 🔥 stagger effect
                        },
                      },
                    }}
                    style={{
                      display: "inline-block",
                      marginRight: "12px",
                      color:
                        word === "Work"
                          ? "transparent"
                          : "#1a120a",
                      background:
                        word === "Work"
                          ? "linear-gradient(to right, #000, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
                          : "none",
                      WebkitBackgroundClip:
                        word === "Work" ? "text" : "initial",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4 },
                },
              }}
              style={{
                color: "rgba(0,0,0,0.55)",
                fontSize: "1.125rem",
                maxWidth: "38rem",
                lineHeight: 1.6,
                fontFamily: "'DM Sans', sans-serif",
                margin: "0.5rem 0 0",
              }}
            >
              A proven process designed to transform complex workflows into scalable
              AI-powered systems — efficiently and strategically.
            </motion.p>

            {/* Underline Glow */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                height: "2px",
                marginTop: "8px",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
              }}
            />
          </motion.div>
          
              
          {/* ─── DESKTOP ─── */}
          <div className="ps-desktop" style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: "2px", background: "#ebebeb", transform: "translateX(-50%)", zIndex: 0,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: `${lineProgress * 100}%`,
                background: HOLOGRAM_V,
                transition: "height 0.1s linear",
              }} />
            </div>

            {steps.map((step, i) => {
              const isActive = activeSet.has(i);
              const isLeft = i % 2 !== 0;
              return (
                <div
                  key={step.id}
                  ref={(el) => (desktopRefs.current[i] = el)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr minmax(9rem, 0.3fr) 1fr",
                    borderRadius: "2rem",
                    background: isActive ? "#f2f2f2" : "#fff",
                    padding: "0 2.5rem",
                    transition: `background 0.5s ${EASE}`,
                    position: "relative", zIndex: 1,
                  }}
                >
                  {/* Left cell */}
                  <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: isLeft ? "flex-end" : "flex-start",
                    padding: "2.5rem 0", textAlign: isLeft ? "right" : "left",
                  }}>
                    {isLeft ? (
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexDirection: "row-reverse" }}>
                        <NumberBadge id={step.id} isActive={isActive} />
                        <IconFrame icon={step.icon} isActive={isActive} />
                      </div>
                    ) : (
                      <div style={{ maxWidth: "20rem" }}>
                        <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{step.title}</div>
                        <div style={{ color: "rgba(0,0,0,0.65)", marginTop: "0.3rem", lineHeight: 1.5 }}>{step.desc}</div>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dot isActive={isActive} />
                  </div>

                  {/* Right cell */}
                  <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: isLeft ? "flex-start" : "flex-end",
                    padding: "2.5rem 0", textAlign: isLeft ? "left" : "right",
                  }}>
                    {isLeft ? (
                      <div style={{ maxWidth: "20rem" }}>
                        <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{step.title}</div>
                        <div style={{ color: "rgba(0,0,0,0.65)", marginTop: "0.3rem", lineHeight: 1.5 }}>{step.desc}</div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <IconFrame icon={step.icon} isActive={isActive} />
                        <NumberBadge id={step.id} isActive={isActive} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── MOBILE ─── */}
          <div className="ps-mobile" style={{ position: "relative", flexDirection: "column", gap: "0.5rem" }}>
            {/* Left line */}
            <div style={{
              position: "absolute",
              left: "23px",
              top: "2rem", bottom: "2rem",
              width: "2px",
              background: "#ebebeb",
              zIndex: 0,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: `${lineProgress * 100}%`,
                background: HOLOGRAM_V,
                transition: "height 0.1s linear",
              }} />
            </div>

            {steps.map((step, i) => {
              const isActive = activeSet.has(i);
              return (
                <div
                  key={step.id}
                  ref={(el) => (mobileRefs.current[i] = el)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    background: isActive ? "#f2f2f2" : "#fff",
                    borderRadius: "1.25rem",
                    padding: "0.75rem 1rem 0.75rem 0",
                    transition: `background 0.55s ${EASE}`,
                    position: "relative", zIndex: 1,
                  }}
                >
                  {/* Dot column */}
                  <div style={{ width: "48px", flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dot isActive={isActive} />
                  </div>

                  <IconFrame icon={step.icon} isActive={isActive} size="3.75rem" radius="1.1rem" />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.3, color: "#1a1a1a" }}>{step.title}</div>
                    <div style={{ color: "rgba(0,0,0,0.58)", fontSize: "0.85rem", marginTop: "0.2rem", lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}