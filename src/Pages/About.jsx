import { useState, useEffect, useRef } from "react";
import Sargam from "../assets/sargam.png"
import Shreyansh from "../assets/Shreyansh.png"
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  // *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #f9f9f8; box-sizing: border-box; }

  .about-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    overflow-x: hidden;
    background: #f9f9f8;
  }

  /* ─── HERO ─────────────────────────────────────────── */
  .hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Image fills the hero; parallax JS moves it via translateY only */
  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 130%;          /* extra headroom so parallax never reveals edges */
    top: -15%;
    object-fit: cover;
    will-change: transform;
    filter: brightness(0.38) saturate(0.5);
  }

  /* Gradient fades to the page background colour at the very bottom */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,10,10,0) 0%,
      rgba(10,10,10,0.12) 55%,
      rgba(10,10,10,0.72) 85%,
      rgba(10,10,10,0.95) 100%
    );
  }

  /* Centred text stack */
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
    /* push content up slightly so it doesn't sit dead-centre
       and leave the marquee/scroll-hint breathing room below */
    margin-top: -5vh;
  }

  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
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

  .hero-title em {
    font-style: italic;
    color: rgba(255,255,255,0.55);
  }

  .hero-sub {
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    margin-top: 1.5rem;
    letter-spacing: 0.05em;
    opacity: 0;
    animation: fadeUp 1s ease 0.7s forwards;
  }

  /* ─── SCROLL HINT ───────────────────────────────────── */
  /* sits above the marquee strip; marquee is ~41px tall so
     bottom offset = 41px + desired gap (18px) ≈ 60px      */
  .scroll-hint {
    position: absolute;
    bottom: 60px;
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
    color: rgba(255,255,255,0.3);
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.45), transparent);
    animation: scrollPulse 2s ease infinite;
    transform-origin: top center;
  }

  /* ─── FLOATING AMBIENT ELEMENTS ────────────────────── */
  .floaters {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .float-el { position: absolute; }

  /* left side */
  .f1 {
    left: 3%; top: 18%;
    width: 52px; height: 52px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    animation: float1 6s ease-in-out infinite;
  }
  .f1::after {
    content: '';
    position: absolute;
    inset: 11px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
  }

  /* Square rotated 45° — give it an initial rotation via a wrapper
     so the float keyframe (which uses translateY only) doesn't snap */
  .f2-wrap { left: 6%; top: 52%; position: absolute; transform: rotate(45deg); }
  .f2 {
    width: 26px; height: 26px;
    border: 1px solid rgba(255,255,255,0.1);
    animation: float2 7.5s ease-in-out infinite 1s;
  }

  .f3 {
    left: 1.5%; top: 68%;
    width: 70px; height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
    animation: float3 8s ease-in-out infinite 0.5s;
  }

  .f4 {
    left: 9%; top: 34%;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.22);
    animation: float2 5s ease-in-out infinite 2s;
  }

  .f5-line {
    left: 4%; top: 42%;
    width: 1px; height: 58px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent);
    animation: float1 9s ease-in-out infinite 0.3s;
  }

  /* right side */
  .r1 {
    right: 4%; top: 22%;
    width: 58px; height: 58px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    animation: float2 7s ease-in-out infinite 0.7s;
  }

  /* Same pattern: separate wrapper for static rotation */
  .r2-wrap { right: 7%; top: 55%; position: absolute; transform: rotate(20deg); }
  .r2 {
    width: 30px; height: 30px;
    border: 1px solid rgba(255,255,255,0.1);
    animation: float1 6.5s ease-in-out infinite 1.5s;
  }

  .r3 {
    right: 2%; top: 40%;
    width: 80px; height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0.18), transparent);
    animation: float3 8.5s ease-in-out infinite 1s;
  }

  .r4 {
    right: 10%; top: 30%;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.28);
    animation: float1 5.5s ease-in-out infinite 0.4s;
  }

  .r5 {
    right: 5%; top: 65%;
    width: 20px; height: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
    animation: float2 10s ease-in-out infinite 2.2s;
  }

  .r-arc {
    right: 2%; top: 70%;
    animation: float3 11s ease-in-out infinite 0.8s;
  }

  /* ─── MARQUEE ───────────────────────────────────────── */
  .marquee-wrap {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 3;
    overflow: hidden;
    background: rgba(255,255,255,0.035);
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 11px 0;
    opacity: 0;
    animation: fadeIn 1s ease 1.1s forwards;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeScroll 30s linear infinite;
  }

  .marquee-inner {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .marquee-item {
    display: flex;
    align-items: center;
    padding: 0 26px;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    transition: color 0.3s ease;
  }

  .marquee-item.accent {
    color: rgba(255,255,255,0.5);
  }

  .marquee-dot {
    width: 2.5px; height: 2.5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  /* ─── SECTION COMMONS ──────────────────────────────── */
  .section {
    padding: 7rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 0.75rem;
  }

  /* ─── STORIES ──────────────────────────────────────── */
  .stories-section {
    padding: 2rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .stories-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 4.5rem;
  }

  .stories-header-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 400;
    line-height: 1.1;
    color: #111;
  }

  .stories-header-left h2 em {
    font-style: italic;
    color: #888;
  }

  .stories-header-right p {
    font-size: 15px;
    line-height: 1.85;
    color: #666;
    font-weight: 300;
    max-width: 380px;
  }

  .stories-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 1.5px;
    background: #e0e0de;
    border: 1.5px solid #e0e0de;
    border-radius: 20px;
    overflow: hidden;
  }

  .story-card {
    background: #f9f9f8;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: background 0.4s ease;
  }

  .story-card:hover { background: #fff; }

  .story-card.featured {
    grid-row: span 2;
    background: #111;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .story-card.featured:hover { background: #1a1a1a; }

  .story-num {
    font-size: 11px;
    letter-spacing: 0.3em;
    color: #bbb;
    margin-bottom: 1.5rem;
    display: block;
  }

  .story-card.featured .story-num { color: rgba(255,255,255,0.3); }

  .story-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.45rem;
    font-weight: 500;
    line-height: 1.25;
    margin-bottom: 1rem;
    color: #111;
  }

  .story-card.featured h3 { font-size: 2rem; color: #fff; }

  .story-card p { font-size: 14px; line-height: 1.8; color: #777; font-weight: 300; }
  .story-card.featured p { color: rgba(255,255,255,0.55); font-size: 15px; }

  .story-tag {
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #aaa;
    border: 1px solid #e5e5e5;
    padding: 5px 12px;
    border-radius: 50px;
  }

  .story-card.featured .story-tag { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); }

  /* ─── FOUNDERS ─────────────────────────────────────── */
  .founders-section {
    padding: 2rem 2rem 6rem;
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  .founders-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    margin-bottom: 0.1rem;
    color: #111;
  }

  .founders-section > p { font-size: 15px; color: #888; font-weight: 300; margin-bottom: 4.5rem; }

  .founders-row { display: flex; justify-content: center; gap: 5rem; flex-wrap: wrap; }

  .founder-card { display: flex; flex-direction: column; align-items: center; gap: 0; }

  .founder-circle-wrap { position: relative; width: 200px; height: 200px; margin-bottom: 1.5rem; }

  .founder-circle-bg {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid #e8e8e8;
    animation: rotateSlow 18s linear infinite;
  }

  .founder-circle-bg::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 7px; height: 7px;
    background: #ccc;
    border-radius: 50%;
  }

  .founder-img {
    width: 200px; height: 200px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%);
    border: 2.5px solid #f0f0f0;
    transition: filter 0.4s ease;
  }

  .founder-card:hover .founder-img { filter: grayscale(0%); }

  .founder-socials { position: absolute; bottom: 0; right: 0; display: flex; flex-direction: column; gap: 6px; }

  .founder-social-btn {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .founder-social-btn:hover { background: #111; border-color: #111; transform: scale(1.1); }
  .founder-social-btn svg { width: 14px; height: 14px; fill: #666; transition: fill 0.25s ease; }
  .founder-social-btn:hover svg { fill: #fff; }

  .founder-name { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 500; color: #111; margin-bottom: 4px; }
  .founder-role { font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: #aaa; margin-bottom: 1rem; }
  .founder-bio { font-size: 14px; line-height: 1.75; color: #888; font-weight: 300; max-width: 240px; text-align: center; }

  /* ─── VISION ───────────────────────────────────────── */
  .vision-section { padding: 2rem 2rem 6rem; position: relative; overflow: hidden; }

  .vision-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .vision-left { position: relative; }

  .vision-big-num {
    position: absolute;
    top: -2rem; left: -1.5rem;
    font-family: 'Playfair Display', serif;
    font-size: 9rem;
    font-weight: 700;
    color: rgba(0,0,0,0.04);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  .vision-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.4rem);
    font-weight: 400;
    line-height: 1.15;
    color: #111;
    position: relative;
  }

  .vision-left h2 em { font-style: italic; color: #bbb; }

  .vision-divider { width: 40px; height: 1px; background: #ccc; margin: 1.75rem 0; }

  .vision-left p { font-size: 15px; line-height: 1.9; color: #777; font-weight: 300; }

  .vision-right {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    background: #e8e8e6;
    border-radius: 20px;
    overflow: hidden;
    border: 1.5px solid #e8e8e6;
  }

  .vision-stat { background: #f9f9f8; padding: 1.75rem 2rem; transition: background 0.3s ease; }
  .vision-stat:hover { background: #fff; }
  .vision-stat-num { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 400; color: #111; line-height: 1; margin-bottom: 4px; }
  .vision-stat-label { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #aaa; }

  /* ─── WHY CHOOSE US ────────────────────────────────── */
  .why-section { padding: 2rem 2rem 4rem; max-width: 1100px; margin: 0 auto; }

  .why-header { text-align: center; margin-bottom: 4rem; }

  .why-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    font-weight: 400;
    color: #111;
    line-height: 1.1;
  }

  .why-header h2 em { font-style: italic; color: #bbb; }

  .why-header p { font-size: 15px; color: #999; font-weight: 300; margin-top: 1rem; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.8; }

  .why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: #e5e5e3;
    border: 1.5px solid #e5e5e3;
    border-radius: 24px;
    overflow: hidden;
  }

  .why-card {
    background: #f9f9f8;
    padding: 2.75rem 2.25rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: default;
  }

  .why-card:hover { background: #111; }

  .why-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: #f0f0ee;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: background 0.4s ease;
  }

  .why-card:hover .why-icon { background: rgba(255,255,255,0.1); }
  .why-icon svg { width: 20px; height: 20px; stroke: #888; fill: none; transition: stroke 0.4s ease; }
  .why-card:hover .why-icon svg { stroke: rgba(255,255,255,0.7); }

  .why-card h3 { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 500; color: #111; margin-bottom: 0.75rem; transition: color 0.4s ease; }
  .why-card:hover h3 { color: #fff; }
  .why-card p { font-size: 14px; line-height: 1.8; color: #888; font-weight: 300; transition: color 0.4s ease; }
  .why-card:hover p { color: rgba(255,255,255,0.45); }

  .why-card-num {
    position: absolute;
    bottom: 1.5rem; right: 1.75rem;
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: rgba(0,0,0,0.04);
    line-height: 1;
    transition: color 0.4s ease;
  }

  .why-card:hover .why-card-num { color: rgba(255,255,255,0.05); }

  /* ─── ANIMATIONS ───────────────────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 1;   transform: scaleY(1); }
    50%       { opacity: 0.3; transform: scaleY(0.55); }
  }

  /* translateY-only so static rotation wrappers are unaffected */
  @keyframes float1 {
    0%,100% { transform: translateY(0px);    opacity: 0.55; }
    33%     { transform: translateY(-18px);   opacity: 0.75; }
    66%     { transform: translateY(10px);    opacity: 0.45; }
  }

  @keyframes float2 {
    0%,100% { transform: translateY(0px);    opacity: 0.4; }
    40%     { transform: translateY(14px);    opacity: 0.65; }
    70%     { transform: translateY(-10px);   opacity: 0.3; }
  }

  @keyframes float3 {
    0%,100% { transform: translateY(0px)  scale(1);    opacity: 0.35; }
    50%     { transform: translateY(-20px) scale(1.06); opacity: 0.6; }
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ─── REVEAL ───────────────────────────────────────── */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .reveal.visible { opacity: 1; transform: translateY(0); }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  /* ─── RESPONSIVE ───────────────────────────────────── */
  @media (max-width: 768px) {
    .stories-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .stories-grid   { grid-template-columns: 1fr; }
    .story-card.featured { grid-row: span 1; }
    .vision-inner   { grid-template-columns: 1fr; gap: 3rem; }
    .why-grid       { grid-template-columns: 1fr; }
    .founders-row   { gap: 3rem; }
    .floaters .f1, .floaters .f5-line,
    .floaters .r1,  .floaters .r5 { display: none; }
  }
`;

/* ─── Icons ─────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" strokeWidth="0" />
    <circle cx="4" cy="4" r="2" strokeWidth="0" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" strokeWidth="0" />
  </svg>
);

/* ─── Hooks ─────────────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const useParallax = () => {
  useEffect(() => {
    const img = document.querySelector('.hero-img');
    const onScroll = () => {
      if (img) img.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

/* ─── Data ──────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "App Development", "Web Development", "MVP Development",
  "UI/UX Design", "Web App Development", "DevOps & Automation",
  "Mobile Development", "IT Consulting", "SaaS Solutions", "System Integration",
];

const founders = [
  {
    name: "Shreyansh Khandelwal",
    role: "CEO & Co-founder",
    bio: "15 years building enterprise solutions. Former head of engineering at Fortune 500.",
    img: Shreyansh,
    linkedin: "https://www.linkedin.com/in/shreyansh-khandelwal/",
    twitter: "#",
  },
  {
    name: "Sargam Yadav",
    role: "CTO & Co-founder",
    bio: "Cloud architect and open-source contributor. Led teams across Asia-Pacific.",
    img: Sargam,
    linkedin: "https://www.linkedin.com/in/sargamyadav/",
    twitter: "#",
  },
];

const whyItems = [
  {
    title: "Decade of Expertise",
    desc: "2.5+ years delivering IT solutions across industries — from startups to global enterprises.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Client-First Culture",
    desc: "Every decision is rooted in what's best for you — transparent, honest, and accountable.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Agile Delivery",
    desc: "Fast, iterative, and adaptive. We ship value early and improve continuously.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    desc: "ISO-compliant infrastructure with zero-trust architecture baked in from day one.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Capability",
    desc: "Cloud, DevOps, AI integration, cybersecurity — one partner for every tech need.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock monitoring and a dedicated team that never sleeps so you can.",
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 9.8 19.79 19.79 0 0 1 1.08 1.18 2 2 0 0 1 3.05 1H6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
  },
];

/* ─── Marquee strip (extracted so keys are clean) ────────── */
function MarqueeStrip() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {/* Render twice for seamless loop */}
        {[0, 1].map(copy => (
          <div className="marquee-inner" key={copy} aria-hidden={copy === 1 || undefined}>
            {MARQUEE_ITEMS.map((label, j) => (
              <span key={`${copy}-${j}`} style={{ display: 'contents' }}>
                <span className={`marquee-item${j % 2 === 0 ? ' accent' : ''}`}>{label}</span>
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────── */
export default function AboutPage() {
  useReveal();
  useParallax();

  return (
    <>
      <style>{styles}</style>
      <div className="about-root">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="hero">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTQ2fHxvZmZpY2V8ZW58MHx8MHx8fDA%3D"
            alt="Modern office environment"
          />
          <div className="hero-overlay" />

          {/* Floating ambient elements
              Rotated shapes use a wrapper div for the static rotation so the
              float keyframes (translateY only) don't fight the initial angle. */}
          <div className="floaters" aria-hidden="true">
            {/* Left */}
            <div className="float-el f1" />
            <div className="f2-wrap"><div className="float-el f2" /></div>
            <div className="float-el f3" />
            <div className="float-el f4" />
            <div className="float-el f5-line" />
            {/* Right */}
            <div className="float-el r1" />
            <div className="r2-wrap"><div className="float-el r2" /></div>
            <div className="float-el r3" />
            <div className="float-el r4" />
            <div className="float-el r5" />
            <div className="float-el r-arc">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M8 36 A20 20 0 0 1 36 8"  stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeLinecap="round" />
                <path d="M14 40 A20 20 0 0 1 40 14" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Text content — nudged up so scroll-hint + marquee have space */}
          <div className="hero-content">
            <p className="hero-eyebrow">IT Services Company · Since 2024</p>
            <h1 className="hero-title">About <em>Us</em></h1>
            <p className="hero-sub">Crafting technology that moves the world forward.</p>
          </div>

          {/* Scroll indicator — clears the marquee strip via bottom: 60px */}
          <div className="scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>

          <MarqueeStrip />
        </section>

        {/* ── STORIES ────────────────────────────────────────── */}
        <section className="stories-section">
          <div className="stories-header reveal">
            <div className="stories-header-left">
              <p className="section-label">Our Story</p>
              <h2>Where <em>ambition</em><br />meets engineering.</h2>
            </div>
            <div className="stories-header-right reveal reveal-delay-2">
              <p>We started as a small team with a big belief: technology should empower, not overwhelm. A decade later, that belief drives everything we build.</p>
            </div>
          </div>

          <div className="stories-grid reveal reveal-delay-1">
            <div className="story-card featured">
              <span className="story-num">01</span>
              <h3>The founding idea that changed everything</h3>
              <p>In 2024, two engineers quit comfortable jobs to solve a simple problem — why was enterprise software so painful to use? That question became a company.</p>
              <span className="story-tag">Origin Story</span>
            </div>
            <div className="story-card">
              <span className="story-num">02</span>
              <h3>From 0 clients to 25+</h3>
              <p>Growth built on referrals alone — proof that doing great work is still the best marketing strategy.</p>
              <span className="story-tag">Growth</span>
            </div>
            <div className="story-card">
              <span className="story-num">03</span>
              <h3>Going global in 2024</h3>
              <p>We opened our first international office and began serving clients across 12 countries.</p>
              <span className="story-tag">Global</span>
            </div>
            <div className="story-card">
              <span className="story-num">04</span>
              <h3>AI & cloud transformation</h3>
              <p>Leading the next wave — helping legacy businesses make sense of AI without losing their soul.</p>
              <span className="story-tag">Innovation</span>
            </div>
            <div className="story-card">
              <span className="story-num">05</span>
              <h3>A decade of zero data breaches</h3>
              <p>Three Years. 25+ clients. Zero incidents. We take security personally.</p>
              <span className="story-tag">Security</span>
            </div>
          </div>
        </section>

        {/* ── FOUNDERS ───────────────────────────────────────── */}
        <section className="founders-section">
          <p className="section-label reveal">The Founders</p>
          <h2 className="reveal reveal-delay-1">The minds <em>behind</em> the mission.</h2>
          <p className="reveal reveal-delay-2">Two builders. One shared obsession: making technology feel inevitable.</p>

          <div className="founders-row">
            {founders.map((f, i) => (
              <div className={`founder-card reveal reveal-delay-${i + 2}`} key={f.name}>
                <div className="founder-circle-wrap">
                  <div className="founder-circle-bg" />
                  <img className="founder-img" src={f.img} alt={f.name} />
                  <div className="founder-socials">
                    <a href={f.linkedin} className="founder-social-btn" title="LinkedIn">
                      <LinkedInIcon />
                    </a>
                    {/* <a href={f.twitter} className="founder-social-btn" title="Twitter / X">
                      <TwitterIcon />
                    </a> */}
                  </div>
                </div>
                <p className="founder-name">{f.name}</p>
                <p className="founder-role">{f.role}</p>
                <p className="founder-bio">{f.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="vision-section">
          <div className="vision-inner">
            <div className="vision-left reveal">
              <div className="vision-big-num" aria-hidden="true">V</div>
              <p className="section-label">Our Vision</p>
              <h2>Technology as a<br /><em>force for clarity.</em></h2>
              <div className="vision-divider" />
              <p>We envision a world where businesses aren't held hostage by complexity. Where the right technology enables human potential, dissolves friction, and lets great teams focus on what only they can do.</p>
              <p style={{ marginTop: '1rem' }}>Our mission is to be the most trusted technology partner in every industry we touch — not the biggest, but the best.</p>
            </div>
            <div className="vision-right reveal reveal-delay-2">
              {[
                { num: "2.5+", label: "Years of operation" },
                { num: "25+", label: "Global clients" },
                { num: "98%", label: "Client retention rate" },
                { num: "12",  label: "Countries served" },
              ].map((s, i) => (
                <div className="vision-stat" key={i}>
                  <div className="vision-stat-num">{s.num}</div>
                  <div className="vision-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="why-header reveal">
            <p className="section-label">Why Choose Us</p>
            <h2>Six reasons clients<br /><em>stay forever.</em></h2>
            <p>We don't just deliver projects. We build partnerships that outlast trends.</p>
          </div>

          <div className="why-grid reveal reveal-delay-1">
            {whyItems.map((item, i) => (
              <div className="why-card" key={item.title}>
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="why-card-num" aria-hidden="true">0{i + 1}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}