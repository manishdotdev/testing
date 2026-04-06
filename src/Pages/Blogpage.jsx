import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  .blog-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    overflow-x: hidden;
    background: #f9f9f8;
    box-sizing: border-box;
  }

  /* ─── HERO ─── */
  .hero {
    position: relative; height: 100vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .hero-img {
    position: absolute; inset: 0; width: 100%; height: 120%;
    object-fit: cover; will-change: transform;
    filter: brightness(0.34) saturate(0.45); top: -10%;
  }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(249,249,248,0) 0%, rgba(249,249,248,0.06) 60%, rgba(249,249,248,1) 100%);
  }
  .hero-content { position: relative; z-index: 2; text-align: center; padding: 2rem; }
  .hero-eyebrow {
    font-size: 11px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.9s ease 0.2s forwards;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(4rem, 10vw, 9rem); font-weight: 400; color: #fff;
    line-height: 1; letter-spacing: -0.02em;
    opacity: 0; animation: fadeUp 1s ease 0.45s forwards;
  }
  .hero-title em { font-style: italic; color: rgba(255,255,255,0.55); }
  .hero-sub {
    font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.45);
    margin-top: 1.5rem; letter-spacing: 0.04em;
    opacity: 0; animation: fadeUp 1s ease 0.7s forwards;
  }
  .scroll-hint {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
    opacity: 0; animation: fadeIn 1s ease 1.4s forwards;
  }
  .scroll-hint span { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.45), transparent);
    animation: scrollPulse 2s ease infinite;
  }

  .section-label { font-size: 10px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: #aaa; }

  /* ─── FILTER BAR ─── */
  .filter-section { padding: 2rem 2rem 3rem; max-width: 1100px; margin: 0 auto; }
  .filter-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 3rem; }
  .filter-header-left h2 {
    font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 400; line-height: 1.1; color: #111;
  }
  .filter-header-left h2 em { font-style: italic; color: #999; }
  .filter-header-right p { font-size: 15px; line-height: 1.85; color: #666; font-weight: 300; max-width: 380px; }

  .filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
  .filter-tab {
    padding: 9px 22px; border-radius: 50px; font-size: 12px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
    border: 1.5px solid #e0e0de; background: #f9f9f8; color: #aaa;
    transition: all 0.25s;
  }
  .filter-tab:hover { border-color: #bbb; color: #555; }
  .filter-tab.active { background: #111; border-color: #111; color: #fff; }

  /* ─── FEATURED POST ─── */
  .featured-section { padding: 0 2rem 4rem; max-width: 1100px; margin: 0 auto; }
  .featured-card {
    border-radius: 28px; overflow: hidden; background: #111;
    display: grid; grid-template-columns: 1fr 1fr;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.18), 0 32px 64px rgba(0,0,0,0.14);
    cursor: pointer; position: relative;
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s;
  }
  .featured-card:hover { transform: translateY(-6px); box-shadow: 0 4px 8px rgba(0,0,0,0.18), 0 20px 48px rgba(0,0,0,0.26), 0 48px 80px rgba(0,0,0,0.2); }
  .featured-img-wrap { position: relative; overflow: hidden; min-height: 420px; }
  .featured-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.55) saturate(0.5); transition: transform 0.7s cubic-bezier(0.23,1,0.32,1); }
  .featured-card:hover .featured-img { transform: scale(1.04); }
  .featured-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, transparent 40%, #111 100%);
  }
  .featured-body { padding: 3.5rem 3rem; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem; position: relative; z-index: 1; }
  .featured-flag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 500;
  }
  .featured-flag::before { content: ''; width: 18px; height: 1px; background: rgba(255,255,255,0.3); }
  .feat-label { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.3); font-weight: 500; }
  .featured-title {
    font-family: 'Playfair Display', serif; font-size: clamp(1.6rem,3vw,2.4rem);
    font-weight: 400; color: #fff; line-height: 1.2;
  }
  .featured-title em { font-style: italic; color: rgba(255,255,255,0.4); }
  .featured-excerpt { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; line-height: 1.8; }
  .featured-meta {
    display: flex; align-items: center; gap: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem;
    margin-top: auto;
  }
  .meta-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.7);
    flex-shrink: 0;
  }
  .meta-info { flex: 1; }
  .meta-name { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.7); }
  .meta-date { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }
  .meta-read { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.05em; white-space: nowrap; }
  .featured-arrow {
    width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.25s;
  }
  .featured-arrow svg { width: 14px; height: 14px; stroke: rgba(255,255,255,0.5); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s; }
  .featured-card:hover .featured-arrow { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); }
  .featured-card:hover .featured-arrow svg { transform: translateX(3px); }

  /* ─── BLOG GRID ─── */
  .blog-grid-section { padding: 0 2rem 4rem; max-width: 1100px; margin: 0 auto; }
  .blog-grid-hdr { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; }
  .blog-grid-hdr h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 400; color: #111; line-height: 1.1; margin-top: 0.5rem; }
  .blog-grid-hdr h2 em { font-style: italic; color: #999; }
  .view-all-btn {
    display: flex; align-items: center; gap: 8px; padding: 11px 28px;
    border: 1.5px solid #e0e0de; border-radius: 50px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: #999; background: transparent; cursor: pointer; transition: all 0.25s; white-space: nowrap;
  }
  .view-all-btn svg { width: 12px; height: 12px; stroke: #bbb; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s; }
  .view-all-btn:hover { border-color: #111; color: #111; }
  .view-all-btn:hover svg { stroke: #111; transform: translateX(3px); }

  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .blog-card {
    background: #fff; border-radius: 20px; overflow: hidden;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.07);
    display: flex; flex-direction: column; cursor: pointer;
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s;
  }
  .blog-card:hover { transform: translateY(-5px); box-shadow: 0 2px 4px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.14); }
  .blog-card-img-wrap { position: relative; overflow: hidden; height: 200px; }
  .blog-card-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) saturate(0.6); transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); }
  .blog-card:hover .blog-card-img { transform: scale(1.06); }
  .blog-card-category {
    position: absolute; top: 1rem; left: 1rem; z-index: 2;
    padding: 5px 14px; border-radius: 50px;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500;
    background: rgba(17,17,17,0.75); color: rgba(255,255,255,0.8);
    backdrop-filter: blur(6px);
  }
  .blog-card-body { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }
  .blog-card-tag { font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase; color: #bbb; font-weight: 500; }
  .blog-card-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 500; color: #111; line-height: 1.3; }
  .blog-card-title em { font-style: italic; color: #aaa; }
  .blog-card-excerpt { font-size: 13px; color: #888; font-weight: 300; line-height: 1.75; flex: 1; }
  .blog-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.75rem; border-top: 1px solid #f0f0ee; margin-top: auto;
  }
  .card-avatar-row { display: flex; align-items: center; gap: 8px; }
  .card-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: #f0f0ee; border: 1px solid #e8e8e6;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 500; color: #888;
  }
  .card-author-info { }
  .card-author-name { font-size: 11px; font-weight: 500; color: #555; }
  .card-read-time { font-size: 10px; color: #bbb; margin-top: 1px; }
  .card-arrow {
    width: 32px; height: 32px; border-radius: 50%; border: 1px solid #eaeae8;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s;
  }
  .card-arrow svg { width: 11px; height: 11px; stroke: #bbb; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: all 0.25s; }
  .blog-card:hover .card-arrow { background: #111; border-color: #111; }
  .blog-card:hover .card-arrow svg { stroke: #fff; transform: translateX(2px); }

  /* ─── CLIENT STORIES PANEL ─── */
  .stories-section { padding: 3rem 2rem 7rem; max-width: 1100px; margin: 0 auto; }
  .stories-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 3.5rem; }
  .stories-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem,4vw,3.5rem); font-weight: 400; line-height: 1.1; color: #111; }
  .stories-header h2 em { font-style: italic; color: #bbb; }
  .stories-header p { font-size: 14.5px; line-height: 1.85; color: #777; font-weight: 300; }

  .stories-list { display: flex; flex-direction: column; border: 1.5px solid #e0e0de; border-radius: 20px; overflow: hidden; }
  .story-item { border-bottom: 1px solid #e8e8e6; background: #f9f9f8; overflow: hidden; transition: background 0.3s; }
  .story-item:last-child { border-bottom: none; }
  .story-item.open { background: #fff; }

  .story-header {
    display: flex; align-items: center; gap: 2rem; padding: 1.75rem 2.5rem;
    cursor: pointer; user-select: none; position: relative; transition: background 0.2s;
  }
  .story-header:hover { background: rgba(0,0,0,0.01); }
  .story-header::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: #111;
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .story-item.open .story-header::before { transform: scaleY(1); }

  .story-flag {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: #f0f0ee; border: 1px solid #e8e8e6;
    font-size: 18px; line-height: 1;
    transition: all 0.3s;
  }
  .story-item.open .story-flag { background: #111; border-color: #111; }
  .story-left { flex: 1; }
  .story-client { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 500; color: #333; transition: color 0.3s; }
  .story-item.open .story-client { color: #111; }
  .story-origin { font-size: 11px; color: #bbb; margin-top: 3px; letter-spacing: 0.08em; }
  .story-tag-pill {
    padding: 5px 16px; border-radius: 50px; font-size: 10px; letter-spacing: 0.16em;
    text-transform: uppercase; font-weight: 500;
    background: #f0f0ee; color: #aaa; border: 1px solid #e8e8e6; white-space: nowrap;
    transition: all 0.3s;
  }
  .story-item.open .story-tag-pill { background: rgba(17,17,17,0.06); color: #555; border-color: rgba(17,17,17,0.1); }
  .story-toggle {
    width: 28px; height: 28px; border-radius: 50%; border: 1px solid #e0e0de;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .story-toggle svg { width: 12px; height: 12px; stroke: #aaa; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.35s, stroke 0.3s; }
  .story-item.open .story-toggle { background: #111; border-color: #111; }
  .story-item.open .story-toggle svg { stroke: #fff; transform: rotate(45deg); }

  .story-body { max-height: 0; overflow: hidden; transition: max-height 0.55s cubic-bezier(0.4,0,0.2,1); }
  .story-item.open .story-body { max-height: 420px; }
  .story-content { padding: 0 2.5rem 2.5rem 7rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
  .story-quote {
    font-family: 'Playfair Display', serif; font-size: 1.05rem; font-style: italic;
    color: #555; line-height: 1.8; position: relative;
  }
  .story-quote::before {
    content: '201C'; font-size: 4rem; color: #e8e8e6;
    position: absolute; top: -1.2rem; left: -0.5rem; font-family: 'Playfair Display', serif;
    line-height: 1; pointer-events: none;
  }
  .story-details { display: flex; flex-direction: column; gap: 1.2rem; }
  .story-detail-row { display: flex; flex-direction: column; gap: 3px; }
  .detail-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #bbb; font-weight: 500; }
  .detail-value { font-size: 13px; color: #555; font-weight: 400; }
  .story-metrics { display: flex; gap: 1.5rem; margin-top: 0.5rem; }
  .metric-chip {
    display: flex; flex-direction: column; gap: 2px;
    background: #f0f0ee; border-radius: 12px; padding: 0.7rem 1rem;
    border: 1px solid #e8e8e6; flex: 1;
  }
  .metric-num { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #111; line-height: 1; }
  .metric-lbl { font-size: 10px; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }

  /* ─── STATS BAR ─── */
  .stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.5px; background: #e0e0de; border: 1.5px solid #e0e0de;
    border-radius: 20px; overflow: hidden; margin-bottom: 5rem;
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

  /* ─── NEWSLETTER / CTA ─── */
  .cta-section { padding: 0 2rem 4rem; max-width: 1100px; margin: 0 auto; }
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

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.85s ease, transform 0.85s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .filter-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .featured-card { grid-template-columns: 1fr; }
    .featured-img-wrap { min-height: 260px; }
    .featured-img-overlay { background: linear-gradient(to bottom, transparent 40%, #111 100%); }
    .blog-grid { grid-template-columns: 1fr 1fr; }
    .stories-header { grid-template-columns: 1fr; gap: 1.5rem; }
    .story-content { grid-template-columns: 1fr; padding-left: 2.5rem; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .cta-wrap { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 2rem; }
  }
  @media (max-width: 600px) {
    .blog-grid { grid-template-columns: 1fr; }
    .stats-bar { grid-template-columns: 1fr 1fr; }
    .story-content { padding-left: 1.5rem; }
    .story-metrics { flex-direction: column; gap: 0.75rem; }
  }
`;

/* ─── DATA ─── */

const CATEGORIES = ["All Stories", "MVPs", "Web & PWA", "Mobile Apps", "International Clients", "Startups"];

const FEATURED_POST = {
  tag: "Client Story · MVP",
  title: <>From napkin sketch to <em>funded startup</em> in 90 days</>,
  excerpt: "Arjun came to us with a concept scribbled on paper. Fourteen weeks later, he closed a seed round. Here's the full story of how we validated, designed, and shipped his MVP — and what we learned together.",
  author: "NavRasa Team",
  authorInitials: "NT",
  date: "March 2025",
  read: "8 min read",
  img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
  category: "MVP"
};

const BLOGS = [
  {
    category: "MVP",
    tag: "Client Story",
    title: <>How a 60-day MVP turned into a <em>₹2 Cr business</em></>,
    excerpt: "Riya had an idea for a hyperlocal delivery platform. We built the MVP in eight weeks, she launched, and within a year crossed ₹2 crore in GMV. The story of scrappy execution meeting solid architecture.",
    author: "Priya Mehta",
    initials: "PM",
    date: "Feb 2025",
    read: "6 min",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop",
  },
  {
    category: "Web & PWA",
    tag: "Case Study",
    title: <>A restaurant chain's website that <em>tripled bookings</em></>,
    excerpt: "Old Spice Kitchen had a clunky 2015 website losing them walk-in customers to competitors. Our PWA rebuild changed that — here's exactly what we changed and why it worked.",
    author: "Rahul Dev",
    initials: "RD",
    date: "Jan 2025",
    read: "5 min",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop",
  },
  {
    category: "Mobile Apps",
    tag: "International Client",
    title: <>Building a fitness app for a <em>UK-based founder</em></>,
    excerpt: "James reached out from London needing a React Native app shipped to both app stores before his investor demo. Timezone shifts, Figma handoffs, and daily standups — we made remote collaboration seamless.",
    author: "Ankit Shah",
    initials: "AS",
    date: "Dec 2024",
    read: "7 min",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1374&auto=format&fit=crop",
  },
  {
    category: "International Clients",
    tag: "Client Story",
    title: <>A Dubai-based SaaS founder's <em>cross-border journey</em></>,
    excerpt: "Ahmed needed a B2B SaaS dashboard that could onboard 50 enterprise clients simultaneously. We designed a system from scratch and delivered in 10 weeks — across three time zones.",
    author: "Shreya Kapoor",
    initials: "SK",
    date: "Nov 2024",
    read: "6 min",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1413&auto=format&fit=crop",
  },
  {
    category: "Startups",
    tag: "Process Story",
    title: <>How we run our <em>discovery sprint</em> before writing a line of code</>,
    excerpt: "Most startups skip the discovery phase to save time, and almost all of them regret it. Here's a behind-the-scenes look at how our week-one process prevents months of rework later.",
    author: "NavRasa Team",
    initials: "NT",
    date: "Oct 2024",
    read: "9 min",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1470&auto=format&fit=crop",
  },
  {
    category: "Web & PWA",
    tag: "Client Story",
    title: <>E-commerce brand grew 3× after <em>a complete rebuild</em></>,
    excerpt: "Nisha's fashion label had beautiful products and a website that was killing conversions. We rebuilt on Next.js, reduced load time by 60%, and watched the monthly revenue triple in 90 days.",
    author: "Dev Patel",
    initials: "DP",
    date: "Sep 2024",
    read: "5 min",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
  },
];

const CLIENT_STORIES = [
  {
    flag: "🇬🇧",
    client: "James Whitfield",
    origin: "London, United Kingdom · Fitness Tech",
    tag: "Mobile App",
    quote: "NavRasa felt less like a vendor and more like a co-founder. They flagged UX issues before we caught them ourselves, pushed back on features that would slow us down, and delivered a React Native app we are genuinely proud of.",
    service: "Cross-platform mobile app (iOS & Android)",
    timeline: "10 weeks",
    outcome: "App Store launch · 4.8★ rating · 12K downloads in Month 1",
    metrics: [{ num: "12K", lbl: "Downloads" }, { num: "4.8★", lbl: "App Store" }, { num: "10w", lbl: "Delivery" }],
  },
  {
    flag: "🇦🇪",
    client: "Ahmed Al-Rashid",
    origin: "Dubai, UAE · B2B SaaS",
    tag: "Web Platform",
    quote: "Communication across time zones was never a problem. The team sent daily video updates, maintained a live Notion board, and always over-delivered. The platform we got back is rock solid and scalable.",
    service: "Full-stack SaaS dashboard with multi-tenant architecture",
    timeline: "12 weeks",
    outcome: "50 enterprise clients onboarded in first quarter",
    metrics: [{ num: "50+", lbl: "Clients" }, { num: "12w", lbl: "Timeline" }, { num: "3×", lbl: "ROI" }],
  },
  {
    flag: "🇮🇳",
    client: "Riya Sharma",
    origin: "Mumbai, India · Hyperlocal Delivery",
    tag: "MVP",
    quote: "I came with a rough idea and zero tech background. NavRasa held my hand through every decision — from the database choice to the color of the primary button. The MVP we shipped became my entire business.",
    service: "MVP development — web & mobile",
    timeline: "8 weeks",
    outcome: "₹2 Cr GMV in 12 months · Seed funding secured",
    metrics: [{ num: "₹2Cr", lbl: "First Year GMV" }, { num: "8w", lbl: "MVP Sprint" }, { num: "100%", lbl: "Vision Delivered" }],
  },
  {
    flag: "🇺🇸",
    client: "Marcus Chen",
    origin: "San Francisco, USA · EdTech",
    tag: "Web & PWA",
    quote: "We needed a PWA that could serve 10,000 concurrent students without blinking. NavRasa delivered — and the Lighthouse score they handed back was the best I had seen from any contractor in five years.",
    service: "Progressive Web App + LMS integration",
    timeline: "14 weeks",
    outcome: "10K concurrent users · 98 Lighthouse score",
    metrics: [{ num: "10K", lbl: "Concurrent Users" }, { num: "98", lbl: "Lighthouse" }, { num: "14w", lbl: "Delivery" }],
  },
  {
    flag: "🇩🇪",
    client: "Lukas Bauer",
    origin: "Berlin, Germany · FinTech",
    tag: "Mobile App",
    quote: "European data regulations are no joke. NavRasa was the only agency that walked in already knowing GDPR inside-out. We shipped a compliant, gorgeous banking app — zero legal headaches.",
    service: "Native iOS banking app with GDPR-compliance layer",
    timeline: "16 weeks",
    outcome: "GDPR compliant · 0 regulatory issues · 50K users",
    metrics: [{ num: "50K", lbl: "Active Users" }, { num: "0", lbl: "Legal Issues" }, { num: "16w", lbl: "Delivery" }],
  },
];

const STATS = [
  { number: "45+", label: "Projects Delivered" },
  { number: "12+", label: "Countries Served" },
  { number: "98%", label: "Client Retention" },
  { number: "4.9★", label: "Average Rating" },
];

/* ─── HOOKS ─── */

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
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── CLIENT STORIES ACCORDION ─── */
function StoriesAccordion() {
  const [active, setActive] = useState(0);
  return (
    <div className="stories-list">
      {CLIENT_STORIES.map((s, i) => (
        <div key={i} className={`story-item${active === i ? " open" : ""}`}>
          <div className="story-header" onClick={() => setActive(active === i ? -1 : i)}>
            <div className="story-flag">{s.flag}</div>
            <div className="story-left">
              <div className="story-client">{s.client}</div>
              <div className="story-origin">{s.origin}</div>
            </div>
            <span className="story-tag-pill">{s.tag}</span>
            <div className="story-toggle">
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
          <div className="story-body">
            <div className="story-content">
              <div className="story-quote">{s.quote}</div>
              <div className="story-details">
                <div className="story-detail-row">
                  <span className="detail-label">What We Built</span>
                  <span className="detail-value">{s.service}</span>
                </div>
                <div className="story-detail-row">
                  <span className="detail-label">Timeline</span>
                  <span className="detail-value">{s.timeline}</span>
                </div>
                <div className="story-detail-row">
                  <span className="detail-label">Outcome</span>
                  <span className="detail-value">{s.outcome}</span>
                </div>
                <div className="story-metrics">
                  {s.metrics.map((m, j) => (
                    <div className="metric-chip" key={j}>
                      <span className="metric-num">{m.num}</span>
                      <span className="metric-lbl">{m.lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── BLOG CARD ─── */
function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <div className="blog-card-img-wrap">
        <img className="blog-card-img" src={post.img} alt={post.tag} loading="lazy"/>
        <span className="blog-card-category">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <span className="blog-card-tag">{post.tag}</span>
        <div className="blog-card-title">{post.title}</div>
        <p className="blog-card-excerpt">{post.excerpt}</p>
      </div>
      <div className="blog-card-footer">
        <div className="card-avatar-row">
          <div className="card-avatar">{post.initials}</div>
          <div className="card-author-info">
            <div className="card-author-name">{post.author}</div>
            <div className="card-read-time">{post.date} · {post.read} read</div>
          </div>
        </div>
        <div className="card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All Stories");
  useParallax();
  useReveal();

  const filtered = activeFilter === "All Stories"
    ? BLOGS
    : BLOGS.filter(b => b.category === activeFilter || b.tag.includes(activeFilter));

  return (
    <>
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
        <section className="hero">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop"
            alt="Blog"
          />
          <div className="hero-overlay"/>
          <div className="hero-content">
            <p className="hero-eyebrow">NavRasa · Stories & Insights</p>
            <h1 className="hero-title">Our <em>Blog</em></h1>
            <p className="hero-sub">Real clients. Real builds. Real results — from MVPs to global products.</p>
          </div>
          <div className="scroll-hint"><span>Scroll</span><div className="scroll-line"/></div>
        </section>

        {/* FILTER + HEADER */}
        <section className="filter-section">
          <div className="filter-header reveal">
            <div className="filter-header-left">
              <p className="section-label">Stories & Insights</p>
              <h2>Honest stories from<br/><em>real projects.</em></h2>
            </div>
            <div className="filter-header-right reveal reveal-delay-2">
              <p>Every post here is pulled from an actual engagement — how we met the client, how we approached the problem, what went wrong, and what made it right.</p>
            </div>
          </div>
          <div className="filter-tabs reveal reveal-delay-1">
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-tab${activeFilter === c ? " active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</button>
            ))}
          </div>
        </section>

        {/* STATS BAR */}
        <section style={{padding:"0 2rem 0rem",maxWidth:"1100px",margin:"0 auto"}}>
          <div className="stats-bar reveal reveal-delay-1">
            {STATS.map(s => (
              <div className="stat-cell" key={s.label}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED POST */}
        <section className="featured-section">
          <div style={{marginBottom:"2rem"}} className="reveal">
            <p className="section-label">Featured Story</p>
          </div>
          <div className="featured-card reveal reveal-delay-1">
            <div className="featured-img-wrap">
              <img className="featured-img" src={FEATURED_POST.img} alt="Featured"/>
              <div className="featured-img-overlay"/>
            </div>
            <div className="featured-body">
              <span className="feat-label">{FEATURED_POST.tag}</span>
              <h2 className="featured-title">{FEATURED_POST.title}</h2>
              <p className="featured-excerpt">{FEATURED_POST.excerpt}</p>
              <div className="featured-meta">
                <div className="meta-avatar">{FEATURED_POST.authorInitials}</div>
                <div className="meta-info">
                  <div className="meta-name">{FEATURED_POST.author}</div>
                  <div className="meta-date">{FEATURED_POST.date}</div>
                </div>
                <span className="meta-read">{FEATURED_POST.read}</span>
                <div className="featured-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="blog-grid-section">
          <div className="blog-grid-hdr reveal">
            <div>
              <p className="section-label">All Posts</p>
              <h2>More <em>stories</em> to explore.</h2>
            </div>
            <button className="view-all-btn">
              All Posts
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <div className="blog-grid reveal reveal-delay-1">
            {(filtered.length > 0 ? filtered : BLOGS).map((post, i) => (
              <BlogCard key={i} post={post}/>
            ))}
          </div>
        </section>

        {/* CLIENT STORIES ACCORDION */}
        <section className="stories-section">
          <div className="stories-header reveal">
            <div>
              <p className="section-label">Client Voices</p>
              <h2>In their own<br/><em>words.</em></h2>
            </div>
            <p className="reveal reveal-delay-1">We have worked with founders from six countries — startups in Jaipur, SaaS companies in Dubai, fitness apps in London. These are the unfiltered stories of how those partnerships worked.</p>
          </div>
          <div className="reveal reveal-delay-2">
            <StoriesAccordion/>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-wrap reveal">
            <div className="cta-left">
              <span className="cta-eyebrow">Want to be our next story?</span>
              <h2 className="cta-title">Let's build something<br/>worth <em>writing about.</em></h2>
              <p className="cta-sub">Every great client story starts with a single conversation. We respond within 24 hours — no pressure, just honest advice about your idea.</p>
            </div>
            <div className="cta-right">
              <a href="/contact" className="cta-btn">
                Start a Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}