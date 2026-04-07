import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  .srv-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    overflow-x: hidden;
    background: #f9f9f8;
    box-sizing: border-box;
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

  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 130%;
    top: -15%;
    object-fit: cover;
    will-change: transform;
    filter: brightness(0.38) saturate(0.5);
  }

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

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
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

  .r1 {
    right: 4%; top: 22%;
    width: 58px; height: 58px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    animation: float2 7s ease-in-out infinite 0.7s;
  }

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

  .marquee-item.accent { color: rgba(255,255,255,0.5); }

  .marquee-dot {
    width: 2.5px; height: 2.5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    flex-shrink: 0;
  }
     @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

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

  .section-label { font-size: 10px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: #aaa; margin-bottom: 0.75rem; }

  .intro-section { padding: 4rem 1rem 4rem; max-width: 1100px; margin: 0 auto; }
  .intro-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 5rem; }
  .intro-header-left h2 {
    font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 400; line-height: 1.1; color: #111;
  }
  .intro-header-left h2 em { font-style: italic; color: #999; }
  .intro-header-right p { font-size: 15px; line-height: 1.85; color: #666; font-weight: 300; max-width: 380px; }

  .stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.5px; background: #e0e0de; border: 1.5px solid #e0e0de;
    border-radius: 20px; overflow: hidden; margin-bottom: 2rem;
  }
  .stat-cell {
    background: #f9f9f8; padding: 2.5rem 2rem; text-align: center;
    position: relative; overflow: hidden;
  }
  .stat-cell::before {
    content: ''; position: absolute; inset: 0; background: #111;
    transform: translateY(100%); transition: transform 0.45s cubic-bezier(0.4,0,0.2,1); z-index: 0;
  }
  .stat-cell:hover::before { transform: translateY(0); }
  .stat-cell > * { position: relative; z-index: 1; transition: color 0.35s; }
  .stat-number { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 400; color: #111; line-height: 1; display: block; }
  .stat-cell:hover .stat-number { color: #fff; }
  .stat-label { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #aaa; font-weight: 400; display: block; margin-top: 0.5rem; }
  .stat-cell:hover .stat-label { color: rgba(255,255,255,0.45); }

  /* ═══ 3D SERVICES CARDS ═══ */
  .services-section { padding: 0 0.1rem 6rem; max-width: 1100px; margin: 0 auto; }
  .services-hdr { margin-bottom: 2rem; }
  .services-hdr h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 400; color: #111; line-height: 1.1; margin-top: 0.5rem; }
  .services-hdr h2 em { font-style: italic; color: #999; }

.services-grid-3d {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}
    .srv-wrap { perspective: 900px; }
  .srv-wrap.feat-wrap { grid-column: span 2; }

  .srv-card-3d {
    border-radius: 20px; padding: 2.25rem; height: 100%; min-height: 280px;
    display: flex; flex-direction: column; gap: 1rem;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.06);
    position: relative; overflow: hidden;
    transition: box-shadow 0.5s ease;
    will-change: transform;
  }
  /* Gloss top-left shimmer */
  .srv-card-3d::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 60%; height: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);
    border-radius: 20px 0 0 0; pointer-events: none; z-index: 2;
  }
  /* Thin border highlight */
  .srv-card-3d::after {
    content: ''; position: absolute; inset: 0; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.85); pointer-events: none; z-index: 3;
  }
  .srv-card-3d.feat {
    background: #111; flex-direction: row; align-items: center;
    gap: 2.5rem; min-height: 240px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.22), 0 24px 48px rgba(0,0,0,0.2);
  }
  .srv-card-3d.feat::before { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%); }
  .srv-card-3d.feat::after { border-color: rgba(255,255,255,0.1); }

  .srv-icon-3d {
    width: 52px; height: 52px; border-radius: 14px;
    background: #f5f5f3; border: 1px solid #e8e8e6;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
    position: relative; z-index: 1;
  }
  .srv-icon-3d svg { width: 22px; height: 22px; stroke: #555; fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  .feat .srv-icon-3d {
    width: 68px; height: 68px; border-radius: 18px;
    background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  .feat .srv-icon-3d svg { stroke: rgba(255,255,255,0.7); width: 28px; height: 28px; }

  .card-body { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; position: relative; z-index: 1; }
  .srv-tag-3d { font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase; color: #bbb; font-weight: 500; }
  .feat .srv-tag-3d { color: rgba(255,255,255,0.28); }
  .srv-name-3d { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 500; color: #111; line-height: 1.2; }
  .feat .srv-name-3d { font-size: 1.9rem; color: #fff; }
  .srv-name-3d em { font-style: italic; color: #aaa; }
  .feat .srv-name-3d em { color: rgba(255,255,255,0.4); }
  .srv-desc-3d { font-size: 13px; color: #888; font-weight: 300; line-height: 1.75; flex: 1; }
  .feat .srv-desc-3d { color: rgba(255,255,255,0.42); font-size: 14px; }
  .srv-badge-3d {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; color: #aaa; font-weight: 400; letter-spacing: 0.05em;
    margin-top: auto; position: relative; z-index: 1;
  }
  .srv-badge-3d::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #ddd; flex-shrink: 0; }
  .feat .srv-badge-3d { color: rgba(255,255,255,0.3); }
  .feat .srv-badge-3d::before { background: rgba(255,255,255,0.2); }

  /* ═══ PROCESS ACCORDION ═══ */
  .process-section { padding: 1rem 2rem 6rem; max-width: 1100px; margin: 0 auto; }
  .process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 4rem; }
  .process-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem,4vw,3.5rem); font-weight: 400; line-height: 1.1; color: #111; }
  .process-header h2 em { font-style: italic; color: #bbb; }
  .process-header p { font-size: 14.5px; line-height: 1.85; color: #777; font-weight: 300; }

  .process-list { display: flex; flex-direction: column; border: 1.5px solid #e0e0de; border-radius: 20px; overflow: hidden; }
  .p-item { border-bottom: 1px solid #e8e8e6; background: #f9f9f8; overflow: hidden; transition: background 0.3s; }
  .p-item:last-child { border-bottom: none; }
  .p-item.open { background: #fff; }

  .p-header {
    display: flex; align-items: center; gap: 2rem; padding: 1.75rem 2.5rem;
    cursor: pointer; user-select: none; position: relative; transition: background 0.2s;
  }
  .p-header:hover { background: rgba(0,0,0,0.01); }
  /* left accent bar */
  .p-header::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: #111;
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .p-item.open .p-header::before { transform: scaleY(1); }

  .p-num { font-family: 'Playfair Display', serif; font-size: 0.85rem; color: #ccc; min-width: 32px; letter-spacing: 0.05em; transition: color 0.3s; }
  .p-item.open .p-num { color: #111; }
  .p-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 500; color: #333; flex: 1; transition: color 0.3s; }
  .p-item.open .p-title { color: #111; }

  .p-icon {
    width: 28px; height: 28px; border-radius: 50%; border: 1px solid #e0e0de;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .p-icon svg { width: 12px; height: 12px; stroke: #aaa; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.35s, stroke 0.3s; }
  .p-item.open .p-icon { background: #111; border-color: #111; }
  .p-item.open .p-icon svg { stroke: #fff; transform: rotate(45deg); }

  .p-body { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1); }
  .p-item.open .p-body { max-height: 220px; }
  .p-content { padding: 0 2.5rem 2rem 5.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .p-desc { font-size: 14px; color: #777; font-weight: 300; line-height: 1.8; }
  .p-tags { display: flex; flex-direction: column; gap: 0.5rem; }
  .p-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6B7280; font-weight: 600; }
  .p-tag::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: #ddd; }

  /* ═══ TECH 3D FLIP CARDS ═══ */
  .tech-section { padding: 0 2rem 7rem; max-width: 1100px; margin: 0 auto; }
  .tech-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 3rem; }
  .tech-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 400; line-height: 1.1; color: #111; }
  .tech-header h2 em { font-style: italic; color: #ccc; }
  .tech-header p { font-size: 14px; line-height: 1.85; color: #888; font-weight: 300; }

  .tech-grid-3d { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }

  .t-wrap { perspective: 600px; height: 118px; }
  .t-inner {
    position: relative; width: 100%; height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
    cursor: default;
  }
  .t-wrap:hover .t-inner { transform: rotateY(180deg); }

  .t-face {
    position: absolute; inset: 0;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 14px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.55rem;
  }
  .t-front {
    background: #fff; border: 1px solid #eaeae8;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.07);
  }
  .t-logo { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
  .t-logo svg { width: 100%; height: 100%; }
  .t-name { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; color: #aaa; text-transform: uppercase; text-align: center; }
  .t-back {
    background: #111; border: 1px solid #1e1e1e;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    transform: rotateY(180deg); padding: 0.75rem;
  }
  .t-back-name { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 500; color: #fff; text-align: center; line-height: 1.2; }
  .t-back-cat { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); text-align: center; font-weight: 400; margin-top: 2px; }

  /* ── CTA ── */
  .cta-section { padding: 0 2rem 2rem; max-width: 1100px; margin: 0 auto; }
  .cta-wrap {
    background: #111; border-radius: 28px; padding: 5rem 4rem;
    display: grid; grid-template-columns: 1fr auto; gap: 3rem; align-items: center;
    position: relative; overflow: hidden;
  }
  .cta-wrap::before { content: ''; position: absolute; right: -80px; top: -80px; width: 320px; height: 320px; border-radius: 50%; background: rgba(255,255,255,0.025); }
  .cta-wrap::after { content: ''; position: absolute; right: 60px; bottom: -120px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.02); }
  .cta-left { position: relative; z-index: 1; }
  .cta-eyebrow { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.3); font-weight: 500; margin-bottom: 1rem; display: block; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3.2rem); font-weight: 400; color: #fff; line-height: 1.15; }
  .cta-title em { font-style: italic; color: rgba(255,255,255,0.4); }
  .cta-sub { font-size: 14px; color: rgba(255,255,255,0.4); font-weight: 300; margin-top: 1rem; line-height: 1.7; max-width: 400px; }
  .cta-right { position: relative; z-index: 1; flex-shrink: 0; }
  .cta-btn {
    display: flex; align-items: center; gap: 12px; padding: 16px 36px;
    background: #fff; border: none; border-radius: 50px; color: #111;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
    text-decoration: none; transition: all 0.3s; white-space: nowrap;
  }
  .cta-btn svg { width: 14px; height: 14px; stroke: #555; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s; }
  .cta-btn:hover { background: #f0f0ee; transform: scale(1.03); }
  .cta-btn:hover svg { transform: translateX(4px); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scrollPulse { 0%, 100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.4; transform: scaleY(0.6); } }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.85s ease, transform 0.85s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }

  @media (max-width: 900px) {
    .intro-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .services-grid-3d { grid-template-columns: 1fr; }
    .srv-wrap.feat-wrap { grid-column: span 1; }
    .srv-card-3d.feat { flex-direction: column; }
    .process-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .p-content { grid-template-columns: 1fr; padding-left: 2.5rem; }
    .tech-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .tech-grid-3d { grid-template-columns: repeat(3, 1fr); }
    .cta-wrap { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 2rem; }
  }
  @media (max-width: 600px) {
    .stats-bar { grid-template-columns: 1fr 1fr; }
    .tech-grid-3d { grid-template-columns: repeat(2, 1fr); }
  }
`;

const SERVICES = [
  {
    tag: "Mobile",
    name: "Native App\nDevelopment",
    desc: "High-performance apps built specifically for Android or iOS — optimised for the platform, beautifully fast, with ultimate UX fidelity.",
    badge: "Ultimate Performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    tag: "Mobile · Web",
    name: "Cross-Platform\nDevelopment",
    desc: "One codebase, two platforms. We leverage React Native & Flutter to ship on Android and iOS without compromising quality.",
    badge: "Code Once, Run Everywhere",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    tag: "Hybrid",
    name: "Hybrid App\nDevelopment",
    desc: "Web tech wrapped in a native shell — a cost-effective, quick route to market that covers both major mobile platforms effortlessly.",
    badge: "Cost-Effective",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tag: "Flagship",
    name: (<>Web <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{"&"}</em><br />PWA Development</>),
    nameStr: "Web & PWA Development",
    desc: "Responsive, modern web applications and Progressive Web Apps that load instantly, work offline, and drive real business growth — no App Store required.",
    badge: "Fastest Time-to-Market",
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </svg>
    ),
  },
 {
  tag: "Commerce",
  name: "eCommerce\nPlatform",
  desc: "Scalable online stores designed for seamless shopping, secure payments, and high-converting user experiences across all devices.",
  badge: "Smart Selling",
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h15l-1.5 9h-13z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M6 6L5 3H2" />
    </svg>
  ),
}

];

const STEPS = [
  { num: "01", title: "Idea Validation", desc: "Market research & feasibility analysis to ensure your concept has real potential. We stress-test ideas before a single line of code is written.", tags: ["Discovery", "Research", "Competitive Analysis"] },
  { num: "02", title: "Prototype & Design", desc: "Interactive mockups and user journey mapping to visualise the final product. Real screens, clickable flows — not just wireframes.", tags: ["UI/UX Design", "Figma Prototyping", "User Testing"] },
  { num: "03", title: "MVP Development", desc: "Core features in clean, scalable code that evolves with your business. We ship fast without cutting corners on architecture.", tags: ["Agile Sprints", "Code Review", "CI/CD"] },
  { num: "04", title: "Iterate & Refine", desc: "User feedback loops and feature refinements driven by real data. Every release is measurably better than the last.", tags: ["A/B Testing", "Analytics", "User Interviews"] },
  { num: "05", title: "Scale & Support", desc: "Infrastructure optimisation and feature expansion for rapid growth — plus 24/7 monitoring so you sleep soundly.", tags: ["Cloud Infra", "Performance", "24/7 Monitoring"] },
];

const TECHS = [
  {
    name: "React", category: "Frontend",
    svg: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
          <ellipse rx="10" ry="3.9" cx="12" cy="12" />
          <ellipse rx="10" ry="3.9" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="3.9" cx="12" cy="12" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Node.js", category: "Backend",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#339933" d="M11.998 2.003L3 7v10.01l8.998 5.006L21 17.01V7L11.998 2.003zm0 1.81l7.24 4.03-2.51 1.396L11.998 6.04 7.27 9.24 4.76 7.843l7.238-4.03zm-7.499 4.95l2.495 1.39v4.516L4.5 13.28V8.763zm8 10.464l-5.504-3.063V11.65l5.504 3.064v4.513zm.999 0V15.22l5.503-3.064v4.52l-5.503 3.066zm6.001-6.16l-2.5-1.39V7.16l2.5 1.39v4.516z" />
      </svg>
    ),
  },
  {
    name: "Flutter", category: "Mobile",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#54C5F8" d="M13.9 2.1L5.5 11 8 13.5l9.4-9.4z" />
        <path fill="#01579B" d="M5.5 13l2.5 2.5-2.5 2.5L3 15.5z" opacity="0.7" />
        <path fill="#29B6F6" d="M8 13.5l5.9 5.9-2.5 2.5L5.5 16z" />
        <path fill="#54C5F8" d="M13.9 19.4l2.5-2.5 1.5 1.5-2.5 2.5z" />
        <path fill="#01579B" d="M13.9 19.4L11.4 17l2.5-2.5 5 5z" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "TypeScript", category: "Language",
    svg: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <path fill="#fff" d="M14.2 11.5H12V17h-1.7v-5.5H8.3V10H14.2v1.5zm1.1 4.2c.35.3.82.5 1.4.5.65 0 1.1-.28 1.1-.73 0-.44-.32-.66-1.1-.96-1.08-.36-1.7-.82-1.7-1.7 0-.96.85-1.67 2.14-1.67.64 0 1.18.18 1.57.45l-.42 1.14c-.3-.18-.65-.32-1.12-.32-.56 0-.87.24-.87.62s.33.54 1.02.84c1.08.38 1.78.84 1.78 1.82 0 1.06-.86 1.75-2.24 1.75-.74 0-1.4-.2-1.82-.52l.26-1.28z" />
      </svg>
    ),
  },
  {
    name: "Python", category: "Backend",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#3776AB" d="M11.94 2C9.22 2 7.5 3.13 7.5 4.82V7h4.94v.6H5.44C3.5 7.6 2 9.1 2 11.6c0 2.42 1.36 4.04 3.44 4.04H7V13.1c0-2.02 1.34-3.1 3.06-3.1h3.88c1.62 0 3-1.2 3-2.82V4.82C17 3.13 15.22 2 11.94 2zm-1.56 1.88c.5 0 .88.4.88.88s-.38.88-.88.88-.88-.4-.88-.88.38-.88.88-.88z" />
        <path fill="#FFD43B" d="M12.06 22c2.72 0 4.44-1.13 4.44-2.82V17h-4.94v-.6h6.94c1.94 0 3.5-1.54 3.5-4.04 0-2.42-1.36-4.04-3.44-4.04H17v2.54c0 2.02-1.34 3.1-3.06 3.1h-3.88c-1.62 0-3 1.2-3 2.82v3.36C7 20.87 8.78 22 12.06 22zm1.56-1.88c-.5 0-.88-.4-.88-.88s.38-.88.88-.88.88.4.88.88-.38.88-.88.88z" />
      </svg>
    ),
  },
  {
    name: "AWS", category: "Cloud",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#FF9900" d="M8.78 10.64c0 .3.03.55.1.74.06.2.15.4.27.62a.38.38 0 0 1 .06.2c0 .09-.05.18-.16.27l-.53.36a.4.4 0 0 1-.22.07c-.09 0-.17-.04-.26-.12a2.8 2.8 0 0 1-.31-.4 6.7 6.7 0 0 1-.27-.5c-.67.8-1.52 1.19-2.53 1.19-.72 0-1.3-.21-1.72-.62-.42-.41-.63-.96-.63-1.65 0-.73.26-1.32.77-1.76.52-.45 1.2-.67 2.08-.67.29 0 .58.02.9.07.31.05.63.12.97.22V8.8c0-.65-.14-1.1-.4-1.38-.27-.27-.73-.41-1.38-.41-.3 0-.6.04-.9.11-.31.08-.6.18-.9.32a2.4 2.4 0 0 1-.27.11.47.47 0 0 1-.13.02c-.11 0-.17-.08-.17-.25V6.9c0-.13.02-.22.06-.28a.64.64 0 0 1 .24-.17c.3-.15.66-.28 1.08-.38.42-.1.87-.15 1.35-.15.96 0 1.67.22 2.12.66.45.44.67 1.12.67 2.02v2.64zm-3.5 1.3c.28 0 .57-.05.88-.15.3-.1.57-.28.8-.54.13-.16.23-.33.28-.53.05-.2.08-.43.08-.7v-.34a7.06 7.06 0 0 0-.77-.14 6.32 6.32 0 0 0-.79-.05c-.56 0-.97.11-1.24.34-.27.23-.41.55-.41.97 0 .4.1.69.3.89.2.19.48.28.87.28zm6.7.9c-.14 0-.24-.03-.3-.08-.06-.04-.12-.15-.17-.3l-1.87-6.16a1.45 1.45 0 0 1-.07-.32c0-.13.06-.2.19-.2h.77c.15 0 .25.03.3.08.06.04.11.15.16.3l1.34 5.27 1.24-5.27c.04-.16.1-.26.16-.3.06-.05.17-.08.31-.08h.63c.15 0 .25.03.31.08.06.04.12.15.16.3l1.26 5.34 1.38-5.34c.05-.16.1-.26.16-.3.06-.05.16-.08.3-.08h.73c.13 0 .2.07.2.2 0 .04 0 .08-.02.13l-.04.19-1.9 6.16c-.05.16-.1.26-.17.3-.06.05-.16.08-.3.08h-.67c-.15 0-.25-.02-.31-.08-.06-.05-.12-.15-.16-.31l-1.23-5.1-1.22 5.1c-.05.16-.1.26-.16.31-.06.05-.17.08-.31.08h-.67zm9.46.2c-.42 0-.84-.05-1.24-.15-.4-.1-.72-.21-.93-.34-.13-.07-.22-.16-.25-.24a.6.6 0 0 1-.04-.22v-.42c0-.17.06-.25.18-.25.05 0 .1.01.15.03l.21.1c.28.13.59.23.92.3.34.07.67.1.99.1.53 0 .94-.09 1.22-.28.28-.19.43-.46.43-.8a.72.72 0 0 0-.2-.52c-.13-.14-.38-.27-.74-.38l-1.06-.33c-.53-.17-.92-.42-1.16-.75a1.73 1.73 0 0 1-.36-1.07c0-.3.07-.57.2-.8.13-.23.31-.43.53-.6.22-.17.47-.3.76-.38.29-.09.6-.13.92-.13.16 0 .33.01.49.03.17.02.32.05.47.08.14.04.28.08.41.13.13.05.23.1.3.15.1.06.18.13.22.2.04.07.06.16.06.27v.4c0 .16-.06.25-.18.25a.82.82 0 0 1-.3-.1c-.4-.18-.84-.27-1.34-.27-.48 0-.86.08-1.12.25-.26.17-.4.42-.4.76 0 .2.07.38.21.52.14.14.4.28.78.4l1.04.33c.53.17.91.41 1.14.72.22.31.34.67.34 1.06 0 .31-.06.6-.19.84a1.97 1.97 0 0 1-.54.64c-.23.18-.5.31-.82.4-.33.1-.68.14-1.06.14z" />
      </svg>
    ),
  },
  {
    name: "Firebase", category: "BaaS",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#FFA000" d="M5.53 12.9L9.1 3.6a.4.4 0 0 1 .74.06L11.5 8.4 5.53 12.9z" />
        <path fill="#F57C00" d="M15.9 10.3L13.8 5a.4.4 0 0 0-.75 0L5.53 12.9l7.24 4.17a1.55 1.55 0 0 0 1.53 0l4.17-2.4-2.57-4.37z" />
        <path fill="#FFCA28" d="M19.2 8.9l-1.04-5.2a.4.4 0 0 0-.67-.2L5.53 12.9l7.24 4.17a1.55 1.55 0 0 0 1.53 0L19.2 13.7V8.9z" />
        <path fill="#F57C00" d="M5.53 12.9l7.24 4.17a1.55 1.55 0 0 0 1.53 0L19.2 13.7l-3.3-3.4-10.37 2.6z" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Docker", category: "DevOps",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#2496ED" d="M13.5 9h2V7h-2v2zm-2.5 0h2V7h-2v2zm-2.5 0H11V7H8.5v2zm-2.5 0H8.5V7H6v2zm5-2.5h2V4h-2v2.5zm-2.5 0H11V4H8.5v2.5zM6 9h2.5V7H6v2z" />
        <path fill="#2496ED" d="M22.3 11.2c-.5-.4-1.7-.6-2.6-.4-.1-1.1-.8-2.1-1.8-2.7l-.4-.2-.2.4c-.4.7-.6 1.6-.5 2.4.1.5.3 1.1.6 1.5-.6.3-1.7.4-1.9.4H2.2c-.2 1.5.1 3.1.9 4.4 1 1.5 2.5 2.3 4.3 2.6.6.1 1.2.2 1.8.2 1.6 0 3.2-.4 4.5-1 1.1-.6 2-1.3 2.8-2.2.8-.9 1.4-2 1.8-3.1h.5c1.1 0 1.8-.4 2.2-1 .3-.4.5-.8.5-1.2l.1-.3-.6-.8zM4 11h2v2H4v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2H9v-2zm2.5 0h2v2h-2v-2zm-5-2.5h2V11H6.5V8.5zm2.5 0h2V11H9V8.5zm2.5 0h2V11H11.5V8.5z" />
      </svg>
    ),
  },
  {
    name: "Next.js", category: "Framework",
    svg: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#000" />
        <path fill="white" d="M9 8h1.5v5.5L16.5 8H18v8h-1.5v-5.5L10 16H9V8z" />
      </svg>
    ),
  },
  {
    name: "Unity", category: "Game Dev",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#222222" d="M13.5 2.1L21 6.3v7.8l-2-1.15V8.85L13.5 6V2.1zM10.5 2.1V6L5 8.85v4.08L3 14.1V6.3l7.5-4.2zM3 15.7l2 1.15L10.5 20v3.85L3 19.7V15.7zm18 0v4l-7.5 4.15V20l5.5-3.15L21 15.7zM5.75 9.7l2 1.15v4.3l-2 1.15-2-1.15V10.85l2-1.15zm12.5 0l2 1.15v4.3l-2 1.15-2-1.15V10.85l2-1.15zm-6.25 1.45l2 1.15v2.3l-2 1.15-2-1.15V12.1l2-1.15-1 .58v1.64l1 .58 1-.58v-1.64l-1-.58z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL", category: "Database",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#336791" d="M17.13 13.37c-.07.72-.25 1.36-.52 1.85a2.3 2.3 0 0 1-.42.55c.06-.02.12-.04.18-.08a3 3 0 0 0 1.23-1.6 6.88 6.88 0 0 0 .36-2.39c0-.6-.05-1.17-.14-1.7l-.07.22c.27.97.38 1.87.38 2.72v.43z" />
        <path fill="#336791" d="M12 2C6.48 2 2 6.03 2 11c0 3.6 2.18 6.74 5.38 8.38l-.14-1.44C5.42 16.52 4 13.9 4 11c0-4.4 3.58-8 8-8s8 3.6 8 8c0 2.44-1.1 4.62-2.83 6.09l.17 1.3C20.04 16.74 22 13.62 22 11c0-4.97-4.48-9-10-9z" />
        <path fill="#336791" d="M7.8 17.5c.3.7.7 1.28 1.2 1.66v-1.9c-.48-.05-.9-.14-1.2-.26v.5z" />
        <ellipse cx="12" cy="10" rx="4.5" ry="2" fill="none" stroke="#336791" strokeWidth="1.2" />
        <path fill="none" stroke="#336791" strokeWidth="1.2" d="M7.5 10v5c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-5" />
        <line x1="12" y1="10" x2="12" y2="17" stroke="#336791" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    name: "MongoDB", category: "Database",
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="#47A248" d="M12.003 2c-.4.55-5.03 7.6-5.03 10.15 0 2.78 1.8 5.07 5.03 5.82V22l.55-4.2.45.1c2.8-.9 3.98-3.2 3.98-5.75C17.003 9.6 12.393 2.55 12.003 2z" />
        <path fill="#B8F1B0" d="M12.003 2c-.1.2-5.03 7.6-5.03 10.15 0 2.78 1.8 5.07 5.03 5.82V2z" opacity="0.4" />
        <path fill="#006622" d="M12.558 17.82v4.18l-.555-4.08c-.83-.22-1.53-.64-2.08-1.22.5.6 1.24 1.04 2.08 1.28l.555.12-.555-.12z" opacity="0.3" />
      </svg>
    ),
  },
];
const MARQUEE_ITEMS = [
  "App Development", "Web Development", "MVP Development",
  "UI/UX Design", "Web App Development", "DevOps & Automation",
  "Mobile Development", "IT Consulting", "SaaS Solutions", "System Integration",
];

// const SERVICES = ["App Development", "Websites", "AI & Automation", "Web App", "IT Consulting", "24/7 Support"];
const STATS = [
  { number: "25+", label: "Projects Delivered" },
  { number: "99.9%", label: "Uptime Guaranteed" },
  { number: "12+", label: "Expert Team Members" },
  { number: "24/7", label: "Support Availability" },
];
function MarqueeStrip() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
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
function useParallax() {
  useEffect(() => {
    const img = document.querySelector(".hero-img");
    const h = () => { if (img) img.style.transform = `translateY(${window.scrollY * 0.38}px)`; };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function use3DTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const rX = ((y - cy) / cy) * -7;
      const rY = ((x - cx) / cx) * 9;
      el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(10px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)";
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };
    const onEnter = () => { el.style.transition = "transform 0.08s ease"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, []);
}

function TiltCard({ children, className }) {
  const ref = useRef(null);
  use3DTilt(ref);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform", transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)" }}>
      {children}
    </div>
  );
}

function ProcessAccordion() {
  const [active, setActive] = useState(0);
  return (
    <div className="process-list">
      {STEPS.map((step, i) => (
        <div key={i} className={`p-item${active === i ? " open" : ""}`}>
          <div className="p-header" onClick={() => setActive(active === i ? -1 : i)}>
            <span className="p-num">{step.num}</span>
            <span className="p-title">{step.title}</span>
            <div className="p-icon">
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </div>
          </div>
          <div className="p-body">
            <div className="p-content">
              <p className="p-desc">{step.desc}</p>
              <div className="p-tags">
                {step.tags.map(t => <span className="p-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  useParallax();
  useReveal();

  return (
    <>
      <style>{styles}</style>
      <div className="srv-root">

        {/* HERO */}
        {/* <section className="hero">
          <img className="hero-img" src="https://images.unsplash.com/photo-1608249889684-e91ddbdd47cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Services" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">NavRasa · Our Expertise</p>
            <h1 className="hero-title">Our <em>Services</em></h1>
            <p className="hero-sub">End-to-end technology solutions, built to scale your vision.</p>
          </div>
          <div className="scroll-hint"><span>Scroll</span><div className="scroll-line" /></div>
        </section> */}
        <section className="hero">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTQ2fHxvZmZpY2V8ZW58MHx8MHx8fDA%3D"
            alt="Modern office environment"
          />
          <div className="hero-overlay" />

          {/* Floating ambient elements — identical to About */}
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
                <path d="M8 36 A20 20 0 0 1 36 8" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeLinecap="round" />
                <path d="M14 40 A20 20 0 0 1 40 14" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Hero text */}
          <div className="hero-content">
            <p className="hero-eyebrow">NavRasa · Our Expertise</p>
            <h1 className="hero-title">Our <em>Services</em></h1>
            <p className="hero-sub">End-to-end technology solutions, built to scale your vision.</p>
          </div>

          {/* Scroll hint — sits above the marquee strip */}
          <div className="scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>

          <MarqueeStrip />
        </section>
        {/* INTRO */}
        <section className="intro-section">
          <div className="intro-header reveal">
            <div className="intro-header-left">
              <p className="section-label">What We Do</p>
              <h2>Transforming ideas into<br /><em>innovative</em> solutions.</h2>
            </div>
            <div className="intro-header-right reveal reveal-delay-2">
              <p>From ideation and product design to full-scale development and deployment — we provide end-to-end technology services for startups and enterprises.</p>
            </div>
          </div>
          <div className="stats-bar reveal reveal-delay-1">
            {STATS.map(s => (
              <div className="stat-cell" key={s.label}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>


        {/* 3D SERVICES */}
        <section className="services-section">
          <div className="services-hdr reveal">
            <p className="section-label">Our Solutions</p>
            <h2>Building the next generation<br /><em>of digital products.</em></h2>
          </div>
          <div className="services-grid-3d reveal reveal-delay-1">
            {SERVICES.map((s, i) => (
              <div key={i} className={`srv-wrap${s.featured ? " feat-wrap" : ""}`}>
                <TiltCard className={`srv-card-3d${s.featured ? " feat" : ""}`}>
                  <div className="srv-icon-3d">{s.icon}</div>
                  <div className="card-body">
                    <span className="srv-tag-3d">{s.tag}</span>
                    <div className="srv-name-3d" style={{ whiteSpace: "pre-line" }}>{s.name}</div>
                    <p className="srv-desc-3d">{s.desc}</p>
                  </div>
                  <span className="srv-badge-3d">{s.badge}</span>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS ACCORDION */}
        <section className="process-section">
          <div className="process-header reveal">
            <div>
              <p className="section-label">How We Work</p>
              <h2>A lean approach that reduces<br />risk and <em>accelerates</em> growth.</h2>
            </div>
            <p className="reveal reveal-delay-1">Our battle-tested five-step process has been refined across 45+ projects. Every engagement follows the same disciplined cadence so you always know exactly where you stand.</p>
          </div>
          <div className="reveal reveal-delay-2"><ProcessAccordion /></div>
        </section>

        {/* TECH FLIP CARDS */}
        <section className="tech-section">
          <div className="tech-header reveal">
            <div>
              <p className="section-label">Stack</p>
              <h2>Technologies<br />we <em>master.</em></h2>
            </div>
            <p className="reveal reveal-delay-1">We stay ahead of the curve — our engineers are fluent in the modern stack, picking the right tool for every specific challenge.</p>
          </div>
          <div className="tech-grid-3d reveal reveal-delay-2">
            {TECHS.map((t, i) => (
              <div className="t-wrap" key={i} style={{ transitionDelay: `${i * 0.03}s` }}>
                <div className="t-inner">
                  <div className="t-face t-front">
                    <div className="t-logo">{t.svg}</div>
                    <span className="t-name">{t.name}</span>
                  </div>
                  <div className="t-face t-back">
                    <span className="t-back-name">{t.name}</span>
                    <span className="t-back-cat">{t.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-wrap reveal">
            <div className="cta-left">
              <span className="cta-eyebrow">Ready to build?</span>
              <h2 className="cta-title">Let's turn your idea into<br />something <em>remarkable.</em></h2>
              <p className="cta-sub">Every great product starts with a conversation. Our team responds within 24 hours — no exceptions, no sales pressure.</p>
            </div>
            <div className="cta-right">
              <a href="/contact" className="cta-btn">
                Start a Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}