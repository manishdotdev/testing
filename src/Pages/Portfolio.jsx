import { useState, useRef, useEffect } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const SLIDES = [
    {
        id: 0,
        title: "AI Workflow Automation for SaaS Company",
        desc: "We analyze your workflows, bottlenecks, and revenue opportunities to deliver transformative automation.",
        stats: [
            { value: "+40%", label: "Demo Booking" },
            { value: "+25%", label: "Closing Rate" },
            { value: "3x", label: "Engagement" },
        ],
        avatar1: "https://i.pravatar.cc/40?img=1",
        avatar2: "https://i.pravatar.cc/40?img=2",
    },
    {
        id: 1,
        title: "AI Project Management Automation for Creative Teams",
        desc: "Streamlining project coordination and task assignments for faster delivery and smoother collaboration.",
        stats: [
            { value: "+38%", label: "Faster Delivery" },
            { value: "-62%", label: "Admin Work" },
            { value: "4x", label: "Productivity" },
        ],
        avatar1: "https://i.pravatar.cc/40?img=3",
        avatar2: "https://i.pravatar.cc/40?img=4",
    },
    {
        id: 2,
        title: "AI Property Inquiry Chatbot for Real Estate Firms",
        desc: "An intelligent chatbot that qualifies property inquiries, answers buyer questions, and schedules viewings automatically.",
        stats: [
            { value: "3x", label: "Lead Response" },
            { value: "+40%", label: "Viewing Bookings" },
            { value: "24/7", label: "Engagement" },
        ],
        avatar1: "https://i.pravatar.cc/40?img=5",
        avatar2: "https://i.pravatar.cc/40?img=6",
    },
];

// ── Animated Dot Canvas (left panel) ─────────────────────────────────────────
function DotCanvas() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const SPACING = 24;
        const BASE_R = 1.4;
        const INFLUENCE = 80;
        let W = 0, H = 0;
        let dots = [];

        const build = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            const cols = Math.ceil(W / SPACING) + 1;
            const rows = Math.ceil(H / SPACING) + 1;
            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dots.push({
                        bx: c * SPACING,
                        by: r * SPACING,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.007 + Math.random() * 0.005,
                    });
                }
            }
        };

        build();
        const ro = new ResizeObserver(build);
        ro.observe(canvas);

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);

        let t = 0;
        const draw = () => {
            t++;
            ctx.clearRect(0, 0, W, H);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const d of dots) {
                const fx = d.bx + Math.sin(t * d.speed + d.phase) * 2.5;
                const fy = d.by + Math.cos(t * d.speed * 0.8 + d.phase) * 2.5;

                const dx = fx - mx;
                const dy = fy - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let rx = 0, ry = 0, proximity = 0;
                if (dist < INFLUENCE && dist > 0) {
                    proximity = 1 - dist / INFLUENCE;
                    const force = proximity * 16;
                    rx = (dx / dist) * force;
                    ry = (dy / dist) * force;
                }

                const alpha = 0.20 + proximity * 0.60;
                const radius = BASE_R + proximity * 2;

                ctx.beginPath();
                ctx.arc(fx + rx, fy + ry, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            ro.disconnect();
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ── Section Background (CSS dot grid + floating orbs) ────────────────────────
function SectionBackground() {
    return (
        <>
            <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,18px)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,-14px)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(16px,-20px)} }
        @keyframes driftDots { from{background-position:0 0} to{background-position:24px 24px} }
      `}</style>

            {/* Moving dot grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.2px, transparent 1.2px)",
                    backgroundSize: "24px 24px",
                    animation: "driftDots 18s linear infinite alternate",
                }}
            />

            {/* Floating blur orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div style={{
                    position: "absolute", width: 380, height: 380,
                    top: "-12%", left: "-10%", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(160,160,210,0.20) 0%, transparent 70%)",
                    filter: "blur(48px)", animation: "floatA 14s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute", width: 300, height: 300,
                    bottom: "-10%", right: "-6%", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(140,190,160,0.18) 0%, transparent 70%)",
                    filter: "blur(40px)", animation: "floatB 17s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute", width: 220, height: 220,
                    top: "35%", right: "18%", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(190,160,210,0.14) 0%, transparent 70%)",
                    filter: "blur(32px)", animation: "floatC 20s ease-in-out infinite",
                }} />
            </div>
        </>
    );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const ArrowRight = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3.333 8H12.667M10 10.667L12.667 8M10 5.333L12.667 8"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14.293 5.293L8.293 11.293a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L10.414 12l5.293-5.293a1 1 0 00-1.414-1.414z" fill="currentColor" />
    </svg>
);

const ChevronRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9.707 5.293a1 1 0 00-1.414 1.414L13.586 12l-5.293 5.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6z" fill="currentColor" />
    </svg>
);

// ── Brand Logo ────────────────────────────────────────────────────────────────
const BrandLogo = () => (
    <div className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="3.5" fill="#111" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                <line key={i} x1="15" y1="15"
                    x2={15 + Math.cos((deg * Math.PI) / 180) * 12}
                    y2={15 + Math.sin((deg * Math.PI) / 180) * 12}
                    stroke="#111" strokeWidth={i % 3 === 0 ? "2" : "1"} strokeLinecap="round" />
            ))}
        </svg>
        <span className="text-[11px] font-bold tracking-[0.18em] text-[#111] uppercase">LGPSM</span>
    </div>
);

function SlideCard({ slide }) {
    return (
        <div className="min-w-full flex flex-col sm:flex-row rounded-2xl sm:rounded-3xl overflow-hidden bg-[#ebebeb] shadow-[0_4px_40px_rgba(0,0,0,0.09)]">

            <div
                className="relative w-full sm:w-[42%] flex-shrink-0 bg-[#0d0d0d] overflow-hidden"
                style={{ minHeight: "clamp(160px, 28vw, 400px)" }}
            >
                <DotCanvas />

                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />

                {/* Mini stat badges bottom-left */}
                {/* <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          {slide.stats.slice(0, 2).map((s, i) => (
            <div key={i}
              className="px-2.5 py-1.5 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <p className="text-white text-xs font-semibold leading-none">{s.value}</p>
              <p className="text-white/50 leading-none mt-0.5" style={{ fontSize: 10 }}>{s.label}</p>
            </div>
          ))}
        </div> */}
            </div>

            <div className="flex flex-1 flex-col justify-between bg-[#ebebeb] p-5 sm:p-7 lg:p-9">

                <div className="flex flex-col gap-3 sm:gap-4">
                    <BrandLogo />

                    <div>
                        <p className="font-medium text-[#0d0d0d] leading-snug tracking-tight mb-2"
                            style={{ fontSize: "clamp(15px, 2vw, 24px)" }}>
                            {slide.title}
                        </p>
                        <p className="text-[#666] leading-relaxed line-clamp-2"
                            style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}>
                            {slide.desc}
                        </p>
                    </div>

                    {/* Read More button */}
                    <a href="#"
                        className="inline-flex items-center gap-2 w-fit mt-1 pl-2 pr-3.5 py-2
                       bg-[#dedede] hover:bg-[#d0d0d0] hover:translate-x-0.5
                       rounded-full transition-all duration-200 no-underline group">
                        <div className="flex">
                            {/* <img src={slide.avatar1} alt=""
                className="w-6 h-6 rounded-full border-2 border-[#ebebeb] object-cover -mr-1.5" />
              <img src={slide.avatar2} alt=""
                className="w-6 h-6 rounded-full border-2 border-[#ebebeb] object-cover" /> */}
                        </div>
                        <span className="text-[12px] font-medium text-[#111]">Check Preview</span>
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#c4c4c4] text-[#111] group-hover:bg-[#b8b8b8] transition-colors">
                            <ArrowRight size={11} />
                        </div>
                    </a>
                </div>

                <div className="flex gap-4 sm:gap-6 lg:gap-8 mt-5 pt-4 border-t border-[#d4d4d4]">
                    {slide.stats.map((s, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                            <span className="font-semibold text-[#0d0d0d] leading-none tracking-tight"
                                style={{ fontSize: "clamp(16px, 2.2vw, 26px)" }}>
                                {s.value}
                            </span>
                            <span className="text-[#888] font-normal"
                                style={{ fontSize: "clamp(9px, 0.9vw, 12px)" }}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CaseStudies() {
    const [current, setCurrent] = useState(0);
    const total = SLIDES.length;
    const touchStartX = useRef(null);

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
        touchStartX.current = null;
    };

    return (
        <section
            className="relative w-full  flex items-center justify-center overflow-hidden py-2 sm:py-20 px-4 sm:px-8"
            style={{ background: "#f4f4f2" }}
        >
            <SectionBackground />

            <div className="relative z-10 w-full max-w-[1100px]">



                <h2
                    className="text-center font-extrabold tracking-tight leading-[0.95] mb-10 sm:mb-16 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(42px, 8vw, 96px)", letterSpacing: "-0.04em" }}
                >
                    What We've Built
                </h2>

                <div className="relative">
                    <div
                        className="overflow-hidden rounded-2xl sm:rounded-3xl"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className="flex"
                            style={{
                                transform: `translateX(-${current * 100}%)`,
                                transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1)",
                                willChange: "transform",
                            }}
                        >
                            {SLIDES.map((slide) => (
                                <SlideCard key={slide.id} slide={slide} />
                            ))}
                        </div>
                    </div>

                    <button onClick={prev} aria-label="Previous"
                        className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111] text-white
                       flex items-center justify-center
                       shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                       hover:bg-[#2a2a2a] hover:scale-105 active:scale-95
                       transition-all duration-150">
                        <ChevronLeft />
                    </button>

                    <button onClick={next} aria-label="Next"
                        className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111] text-white
                       flex items-center justify-center
                       shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                       hover:bg-[#2a2a2a] hover:scale-105 active:scale-95
                       transition-all duration-150">
                        <ChevronRight />
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slide ${i + 1}`}
                            style={{
                                height: 8,
                                width: i === current ? 24 : 8,
                                borderRadius: 999,
                                background: i === current ? "#111" : "#bbb",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}