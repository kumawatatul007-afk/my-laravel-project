import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SEOPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0, satisfaction: 0 });

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 60 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollY / height) * 100);
      setShowBackToTop(scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const targets = { projects: 150, clients: 120, experience: 8, satisfaction: 99 };
      const duration = 2000, stepTime = 20, steps = duration / stepTime;
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const p = currentStep / steps;
        setCounters({
          projects: Math.min(Math.floor(targets.projects * p), targets.projects),
          clients: Math.min(Math.floor(targets.clients * p), targets.clients),
          experience: Math.min(Math.floor(targets.experience * p), targets.experience),
          satisfaction: Math.min(Math.floor(targets.satisfaction * p), targets.satisfaction),
        });
        if (currentStep >= steps) clearInterval(interval);
      }, stepTime);
      return () => clearInterval(interval);
    }
  }, [statsVisible]);

  const seoElements = [
    {
       title: 'Title Tag',
      desc: 'The main title of your page shown in search results. Must include your main keyword to rank higher.',
      points: ['Shown in search engine results (SERPs)', 'Must include your main target keyword'],
      example: '"Best PHP Developer in Jaipur | MMB IT Solutions"',
      img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80',
    },
    {
      title: 'Meta Description',
      desc: 'A short, compelling description under your title in search results. It directly impacts your click-through rate.',
      points: ['Helps improve click-through rate (CTR)', 'Keep it clear, attractive, and keyword-rich'],
      example: null,
      img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    },
    {
       title: 'Headings (H1, H2, H3…)',
      desc: 'Structure your content with proper heading tags so both users and search engines can navigate easily.',
      points: ['H1 = main heading of the page', 'H2/H3 = subheadings for each section'],
      example: 'Makes content easy to read for users + search engines',
      img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
    },
    {
     title: 'URL Structure',
      desc: 'Clean, readable URLs improve both user experience and search engine indexing significantly.',
      points: ['  example.com/page?id=123&name=nikhil', '  example.com/php-developer-jaipur'],
      example: null,
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
    {
       title: 'Keyword Optimization',
      desc: 'Use your target keyword naturally across Title, Headings, Content, and URL. Never force or stuff keywords.',
      points: ['Use naturally in Title, Headings, Content & URL', ' Avoid keyword stuffing — Google penalizes it'],
      example: null,
      img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
    },
    {
       title: 'Content Quality',
      desc: 'Write useful, original, relevant content that properly answers user queries. Depth and value always win.',
      points: ['Answer user queries properly & thoroughly', 'Longer, valuable content consistently ranks better'],
      example: null,
      img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
    },
    {
       title: 'Image Optimization',
      desc: 'Proper image file names and ALT text dramatically improve both SEO performance and site accessibility.',
      points: ['Use descriptive file names: php-developer.jpg', 'Add ALT text — helps SEO + accessibility'],
      example: null,
      img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80',
    },
    {
      title: 'Internal Linking',
      desc: 'Strategic links to other pages on your website help users navigate and pass SEO authority throughout.',
      points: ['Link to other relevant pages of your site', 'Helps users navigate & improves site-wide SEO'],
      example: null,
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    },
    {
     title: 'Page Speed',
      desc: 'Fast-loading pages rank higher in Google. Every millisecond matters for both users and search engines.',
      points: ['Fast-loading pages rank better in Google', 'Optimize images, code, and hosting for speed'],
      example: null,
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    },
    {
     title: 'Mobile Friendliness',
      desc: 'Your website must work flawlessly on all mobile devices. Google uses mobile-first indexing — this is critical.',
      points: ['Site must work perfectly on all mobile devices', 'Extremely important for Google ranking today'],
      example: null,
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    },
  ];

  return (
    <div className="seo-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .seo-page {
          font-family: 'Space Grotesk', sans-serif;
          background: #f5f7f8;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }
        @media(max-width:768px){ .wrap{ padding:0 1.25rem; } }

        /* ── BACK TO TOP ── */
        .btt {
          position:fixed; bottom:2rem; right:2rem;
          width:52px; height:52px; border-radius:50%;
          background:#fff; border:none; cursor:pointer; z-index:999;
          box-shadow:0 4px 20px rgba(0,0,0,0.12);
          display:flex; align-items:center; justify-content:center;
          transition:transform .2s;
        }
        .btt:hover{ transform:translateY(-3px); }
        .btt-ring{ position:absolute; inset:0; width:52px; height:52px; transform:rotate(-90deg); }
        .btt-bg{ fill:none; stroke:#e5e7eb; stroke-width:3; }
        .btt-fill{ fill:none; stroke:#1e3a8a; stroke-width:3; stroke-dasharray:283; transition:stroke-dashoffset .1s; }
        .btt svg.arr{ width:18px; height:18px; color:#1e3a8a; position:relative; z-index:1; }

        /* ── HERO ── */
        .hero {
          padding: 5rem 0 0;
          background: #f5f7f8;
          position: relative;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding-bottom: 4rem;
        }
        @media(max-width:900px){
          .hero-grid{ grid-template-columns:1fr; gap:2.5rem; }
          .hero-img-col{ order:-1; }
        }

        .hero-lbl {
          font-size:.78rem; font-weight:700;
          letter-spacing:.35em; text-transform:uppercase;
          color:#1e3a8a; margin-bottom:1.2rem; display:block;
        }
        .hero-title{ margin-bottom:1.4rem; line-height:1.05; }
        .hero-stroke {
          font-size:clamp(2.8rem,6vw,5rem); font-weight:800;
          letter-spacing:-.02em;
          color:transparent; -webkit-text-stroke:2px #131313;
          display:block;
        }
        .hero-solid {
          font-size:clamp(2.8rem,6vw,5rem); font-weight:800;
          letter-spacing:-.02em; color:#131313;
          display:block;
        }
        .hero-desc {
          font-size:1rem; line-height:1.8; color:#6b7280;
          max-width:480px; margin-bottom:2rem;
        }
        .hero-badges {
          display:flex; gap:.75rem; flex-wrap:wrap;
        }
        .hero-badge {
          display:inline-flex; align-items:center; gap:.4rem;
          padding:.45rem 1rem;
          background:#fff; border:1px solid #e5e7eb;
          font-size:.78rem; font-weight:600; color:#374151;
          border-radius:30px;
          transition:all .25s;
        }
        .hero-badge:hover{ background:#1e3a8a; color:#fff; border-color:#1e3a8a; }
        .hero-badge span{ width:6px; height:6px; border-radius:50%; background:#1e3a8a; display:inline-block; transition:background .25s; }
        .hero-badge:hover span{ background:#fff; }

        /* Right image collage */
        .hero-img-col{ position:relative; }
        .hero-img-main {
          width:100%; height:420px;
          object-fit:cover;
          border-radius:2px;
          box-shadow:0 30px 80px rgba(0,0,0,0.15);
        }
        .hero-img-badge {
          position:absolute;
          bottom:-1.5rem; left:-1.5rem;
          background:#1e3a8a; color:#fff;
          padding:1.2rem 1.5rem;
          min-width:150px;
          box-shadow:0 10px 30px rgba(30,58,138,0.35);
        }
        .hero-img-badge-num{
          font-size:2.2rem; font-weight:800; line-height:1;
          display:block; margin-bottom:.2rem;
        }
        .hero-img-badge-txt{
          font-size:.7rem; font-weight:600;
          text-transform:uppercase; letter-spacing:.1em;
          opacity:.85;
        }
        .hero-img-float {
          position:absolute;
          top:-1.2rem; right:-1.2rem;
          width:130px; height:130px;
          object-fit:cover;
          border:4px solid #fff;
          box-shadow:0 15px 40px rgba(0,0,0,0.15);
        }
        .hero-img-tag {
          position:absolute; top:1.5rem; left:1.5rem;
          background:rgba(255,255,255,0.95);
          backdrop-filter:blur(8px);
          padding:.55rem 1rem;
          border-left:3px solid #1e3a8a;
          font-size:.72rem; font-weight:700;
          text-transform:uppercase; letter-spacing:.1em;
          color:#1e3a8a;
        }

        /* ── STATS ── */
        .stats-sec{ padding:3rem 0; background:#f5f7f8; }
        .stats-grid{
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:1.5rem; text-align:center;
        }
        @media(max-width:768px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
        .stat-card{
          padding:1.5rem; background:#fff;
          border:1px solid #e5e7eb;
          transition:transform .3s,box-shadow .3s;
        }
        .stat-card:hover{ transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.07); }
        .stat-num{
          font-size:clamp(2.2rem,4vw,3.2rem); font-weight:800;
          color:#1e3a8a; line-height:1; margin-bottom:.4rem;
        }
        .stat-lbl{
          font-size:.8rem; font-weight:500; color:#9ca3af;
          text-transform:uppercase; letter-spacing:.1em;
        }

        /* ── MARQUEE ── */
        .marquee-wrap{ overflow:hidden; background:#131313; padding:1.1rem 0; }
        .marquee-track{
          display:flex; gap:3rem;
          animation:marquee 20s linear infinite;
          width:max-content;
        }
        .marquee-item{
          font-size:1rem; font-weight:700;
          text-transform:uppercase; letter-spacing:.18em;
          color:#f5f7f8; white-space:nowrap;
          display:flex; align-items:center; gap:1rem;
        }
        .m-star{ color:#1e3a8a; }
        @keyframes marquee{
          0%{ transform:translateX(0); }
          100%{ transform:translateX(-50%); }
        }

        /* ── ELEMENTS SECTION ── */
        .elem-sec{ padding:6rem 0; background:#f5f7f8; }

        .sec-header{
          display:flex; align-items:flex-end;
          justify-content:space-between;
          gap:2rem; flex-wrap:wrap;
          margin-bottom:5rem;
        }
        .sec-stroke-lbl{
          font-size:clamp(2.5rem,5vw,4rem); font-weight:800;
          color:transparent; -webkit-text-stroke:2px #d1d5db;
          letter-spacing:-.02em; line-height:1.1;
          display:block;
        }
        .sec-title-col{ max-width:500px; }
        .sec-big-title{
          font-size:clamp(1.3rem,2.2vw,1.8rem);
          font-weight:700; color:#131313; line-height:1.4;
        }
        .sec-big-title .stroke-t{
          color:transparent; -webkit-text-stroke:1.5px #131313;
        }
        @media(max-width:640px){ .sec-header{ flex-direction:column; align-items:flex-start; } }

        /* Editorial rows — NO CARDS */
        .elem-list{ display:flex; flex-direction:column; }

        .elem-row {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:0;
          border-top:1px solid #e5e7eb;
          padding:4rem 0;
          position:relative;
          align-items:center;
        }
        .elem-row:last-child{ border-bottom:1px solid #e5e7eb; }

        /* Alternating: even rows flip image to left */
        .elem-row.flip .elem-text-col{ order:2; padding-left:4rem; padding-right:0; }
        .elem-row.flip .elem-img-col{ order:1; }

        .elem-text-col{ padding-right:4rem; }
        .elem-img-col{ position:relative; }

        @media(max-width:900px){
          .elem-row{ grid-template-columns:1fr; padding:3rem 0; gap:2rem; }
          .elem-text-col, .elem-row.flip .elem-text-col{ padding:0; order:2; }
          .elem-img-col, .elem-row.flip .elem-img-col{ order:1; }
        }

        .elem-num-big{
          font-size:5.5rem; font-weight:800;
          color:rgba(0,0,0,0.04); line-height:1;
          margin-bottom:-.5rem; display:block;
          letter-spacing:-.04em;
        }

        .elem-tag{
          display:inline-flex; align-items:center; gap:.5rem;
          font-size:.72rem; font-weight:700;
          letter-spacing:.2em; text-transform:uppercase;
          color:#1e3a8a; margin-bottom:.75rem;
        }
        .elem-tag::before{
          content:''; display:inline-block;
          width:24px; height:2px; background:#1e3a8a;
        }

        .elem-title{
          font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800;
          color:#131313; line-height:1.2;
          margin-bottom:1rem; letter-spacing:-.02em;
        }

        .elem-desc{
          font-size:.95rem; color:#6b7280;
          line-height:1.8; margin-bottom:1.5rem;
          max-width:420px;
        }

        .elem-points{ list-style:none; margin-bottom:1.5rem; }
        .elem-points li{
          display:flex; align-items:flex-start; gap:.75rem;
          font-size:.88rem; color:#374151;
          padding:.4rem 0; line-height:1.5;
          border-bottom:1px dashed #f0f0f0;
        }
        .elem-points li:last-child{ border-bottom:none; }
        .elem-arrow{
          display:inline-flex; align-items:center; justify-content:center;
          width:20px; height:20px;
          background:#1e3a8a; border-radius:50%;
          flex-shrink:0; margin-top:2px;
        }
        .elem-arrow svg{ width:10px; height:10px; color:#fff; }

        .elem-example{
          display:inline-block;
          background:#fff; border:1px solid #e5e7eb;
          border-left:3px solid #1e3a8a;
          padding:.75rem 1rem;
          font-size:.82rem; color:#374151;
          font-style:italic; line-height:1.5;
          margin-top:.5rem;
        }
        .elem-ex-lbl{
          font-size:.65rem; font-weight:700;
          text-transform:uppercase; letter-spacing:.12em;
          color:#1e3a8a; display:block; margin-bottom:.3rem;
          font-style:normal;
        }

        /* Image side */
        .elem-img-wrap{
          position:relative; overflow:hidden;
        }
        .elem-img{
          width:100%; height:340px;
          object-fit:cover;
          display:block;
          transition:transform .6s ease;
        }
        .elem-row:hover .elem-img{ transform:scale(1.04); }

        /* Decorative accent on image */
        .elem-img-accent{
          position:absolute;
          bottom:1.5rem; right:1.5rem;
          background:#1e3a8a; color:#fff;
          padding:.6rem .9rem;
          font-size:.7rem; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
        }

        /* Number overlay on image */
        .elem-img-num{
          position:absolute;
          top:1rem; left:1rem;
          font-size:5rem; font-weight:800;
          color:rgba(255,255,255,0.15);
          line-height:1; letter-spacing:-.04em;
          pointer-events:none; user-select:none;
        }

        /* ── CTA — SPLIT LAYOUT ── */
        .cta-sec{
          position:relative; overflow:hidden;
        }
        /* Top strip — dark with pattern */
        .cta-top{
          background:#0f172a;
          padding:5rem 0 3rem;
          position:relative; overflow:hidden;
        }
        .cta-top::before{
          content:'SEO';
          position:absolute; right:-2rem; top:50%; transform:translateY(-50%);
          font-size:18rem; font-weight:800;
          color:rgba(255,255,255,0.02);
          line-height:1; pointer-events:none; user-select:none;
          letter-spacing:-.04em;
        }
        /* Grid lines decoration */
        .cta-top::after{
          content:'';
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size:60px 60px;
          pointer-events:none;
        }

        .cta-split{
          display:grid; grid-template-columns:1fr 1fr;
          gap:5rem; align-items:center;
          position:relative; z-index:1;
        }
        @media(max-width:900px){ .cta-split{ grid-template-columns:1fr; gap:3rem; } }

        /* LEFT text */
        .cta-left{}
        .cta-sublbl{
          font-size:.72rem; font-weight:700;
          letter-spacing:.35em; text-transform:uppercase;
          color:#3b82f6; margin-bottom:1.5rem; display:block;
        }
        .cta-title{
          font-size:clamp(2.4rem,4.5vw,3.8rem); font-weight:800;
          line-height:1.05; margin-bottom:1.5rem;
          letter-spacing:-.03em;
        }
        .cta-stroke{
          display:block;
          color:transparent; -webkit-text-stroke:2px #fff;
        }
        .cta-solid{ display:block; color:#fff; }
        .cta-desc{
          font-size:.95rem; color:#64748b;
          line-height:1.8; margin-bottom:2.5rem;
          max-width:400px;
        }
        .cta-actions{ display:flex; gap:1rem; align-items:center; flex-wrap:wrap; }
        .cta-btn-primary{
          display:inline-flex; align-items:center; gap:.75rem;
          background:#1e3a8a; color:#fff;
          padding:1rem 2rem;
          font-size:.75rem; font-weight:700;
          letter-spacing:.15em; text-transform:uppercase;
          border:none; cursor:pointer;
          transition:all .28s ease; position:relative; overflow:hidden;
        }
        .cta-btn-primary::before{
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,#2563eb,#1e3a8a);
          opacity:0; transition:opacity .28s;
        }
        .cta-btn-primary:hover::before{ opacity:1; }
        .cta-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 8px 30px rgba(30,58,138,0.5); }
        .cta-btn-primary span{ position:relative; z-index:1; }
        .cta-btn-primary svg{ width:1rem; height:1rem; transition:transform .2s; position:relative; z-index:1; }
        .cta-btn-primary:hover svg{ transform:translateX(4px); }

        .cta-btn-ghost{
          display:inline-flex; align-items:center; gap:.5rem;
          background:transparent; color:#94a3b8;
          padding:1rem 1.5rem;
          font-size:.75rem; font-weight:600;
          letter-spacing:.1em; text-transform:uppercase;
          border:1px solid rgba(255,255,255,0.1); cursor:pointer;
          transition:all .28s ease;
        }
        .cta-btn-ghost:hover{ color:#fff; border-color:rgba(255,255,255,0.3); background:rgba(255,255,255,0.05); }

        /* RIGHT visual panel */
        .cta-right{
          display:flex; flex-direction:column; gap:1rem;
        }
        .cta-feature-row{
          display:grid; grid-template-columns:1fr 1fr; gap:1rem;
        }
        .cta-feat{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.07);
          padding:1.5rem;
          transition:all .3s ease;
          position:relative; overflow:hidden;
        }
        .cta-feat::before{
          content:''; position:absolute;
          bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#1e3a8a,#3b82f6);
          transform:scaleX(0); transform-origin:left;
          transition:transform .4s ease;
        }
        .cta-feat:hover::before{ transform:scaleX(1); }
        .cta-feat:hover{ background:rgba(255,255,255,0.07); border-color:rgba(59,130,246,0.2); transform:translateY(-3px); }
        .cta-feat-icon{
          width:40px; height:40px;
          background:rgba(30,58,138,0.3);
          border:1px solid rgba(30,58,138,0.4);
          border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:1rem;
        }
        .cta-feat-icon svg{ width:18px; height:18px; color:#60a5fa; }
        .cta-feat-title{
          font-size:.88rem; font-weight:700; color:#f1f5f9;
          margin-bottom:.3rem;
        }
        .cta-feat-txt{
          font-size:.78rem; color:#64748b; line-height:1.5;
        }

        /* Big number feature */
        .cta-feat-big{
          background:linear-gradient(135deg,rgba(30,58,138,0.25),rgba(30,58,138,0.1));
          border:1px solid rgba(30,58,138,0.3);
          padding:1.5rem;
          display:flex; align-items:center; gap:1.5rem;
          transition:all .3s ease;
        }
        .cta-feat-big:hover{ background:linear-gradient(135deg,rgba(30,58,138,0.35),rgba(30,58,138,0.15)); transform:translateY(-3px); }
        .cta-feat-big-num{
          font-size:3rem; font-weight:800; color:#3b82f6;
          line-height:1; flex-shrink:0;
        }
        .cta-feat-big-label{ font-size:.8rem; font-weight:600; color:#94a3b8; line-height:1.5; }

        /* Bottom strip — lighter */
        .cta-bottom{
          background:#0a0f1e;
          padding:2rem 0;
          border-top:1px solid rgba(255,255,255,0.04);
        }
        .cta-bottom-inner{
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:1.5rem;
        }
        .cta-trust{
          display:flex; align-items:center; gap:2rem; flex-wrap:wrap;
        }
        .cta-trust-item{
          display:flex; align-items:center; gap:.5rem;
          font-size:.78rem; font-weight:500; color:#475569;
        }
        .cta-trust-item svg{ width:14px; height:14px; color:#1e3a8a; }
        .cta-rating{
          display:flex; align-items:center; gap:.5rem;
        }
        .cta-stars{ display:flex; gap:2px; }
        .cta-stars svg{ width:14px; height:14px; fill:#f59e0b; }
        .cta-rating-txt{ font-size:.78rem; color:#475569; font-weight:500; }
      `}</style>

      {/* Back to Top */}
      {showBackToTop && (
        <button className="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 100 100" className="btt-ring">
            <circle cx="50" cy="50" r="45" className="btt-bg" />
            <circle cx="50" cy="50" r="45" className="btt-fill"
              style={{ strokeDashoffset: `calc(283 - (283 * ${scrollProgress}) / 100)` }} />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="arr">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">

            {/* LEFT — Text */}
            <div>
              <span className="hero-lbl" data-aos="fade-right">Search Engine Optimization</span>
              <div className="hero-title" data-aos="zoom-out-down" data-aos-delay="100">
                <span className="hero-stroke">Important Elements</span>
                <span className="hero-solid">of On-Page SEO</span>
              </div>
              <p className="hero-desc" data-aos="fade-up" data-aos-delay="200">
                Master these 10 critical on-page SEO elements to boost your website's rankings,
                improve visibility, and drive more organic traffic to your pages.
              </p>
              <div className="hero-badges" data-aos="fade-up" data-aos-delay="300">
                {['Title Tag','Meta Description','URL Structure','Page Speed','Mobile SEO'].map((b,i) => (
                  <span className="hero-badge" key={i}><span />{b}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual Collage */}
            <div className="hero-img-col" data-aos="fade-left" data-aos-delay="200">
              <div style={{ position:'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
                  alt="SEO Strategy"
                  className="hero-img-main"
                />
                <div className="hero-img-tag">SEO Strategy 2024</div>
                <img
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&q=80"
                  alt="Analytics"
                  className="hero-img-float"
                />
                <div className="hero-img-badge">
                  <span className="hero-img-badge-num">10</span>
                  <span className="hero-img-badge-txt">Key Elements</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="stats-sec" ref={statsRef}>
        <div className="wrap">
          <div className="stats-grid">
            {[
              { num: `${counters.projects}+`, lbl: 'Projects Completed' },
              { num: `${counters.clients}+`,  lbl: 'Happy Clients' },
              { num: `${counters.experience}+`, lbl: 'Years Experience' },
              { num: `${counters.satisfaction}%`, lbl: 'Satisfaction Rate' },
            ].map((s,i) => (
              <div className="stat-card" key={i} data-aos="fade-up" data-aos-delay={80 + i*80}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {['On-Page SEO','Title Tag','Meta Description','URL Structure','Keywords','Page Speed','Mobile SEO','Content Quality',
            'On-Page SEO','Title Tag','Meta Description','URL Structure','Keywords','Page Speed','Mobile SEO','Content Quality'].map((t,i) => (
            <span key={i} className="marquee-item">
              {t}
              {i % 2 === 0 && <span className="m-star">✦</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ SEO ELEMENTS — EDITORIAL ═══════════ */}
      <section className="elem-sec">
        <div className="wrap">

          {/* Section Header */}
          <div className="sec-header">
            <div data-aos="fade-right" data-aos-duration="1000">
              <span className="sec-stroke-lbl">On-Page<br />SEO</span>
            </div>
            <div className="sec-title-col">
              <h3 className="sec-big-title" data-aos="zoom-out-down" data-aos-delay="150">
                10 Important Elements You Must<br />
                Optimize for <span className="stroke-t">Better Rankings</span>
              </h3>
            </div>
          </div>

          {/* Editorial Rows */}
          <div className="elem-list">
            {seoElements.map((el, i) => (
              <div
                key={el.num}
                className={`elem-row${i % 2 !== 0 ? ' flip' : ''}`}
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay="80"
                data-aos-duration="900"
              >
                {/* TEXT SIDE */}
                <div className="elem-text-col">
                  <span className="elem-num-big">{el.num}</span>
                  <span className="elem-tag">{el.title}</span>
                  <h4 className="elem-title">{el.title}</h4>
                  <p className="elem-desc">{el.desc}</p>
                  <ul className="elem-points">
                    {el.points.map((p, pi) => (
                      <li key={pi}>
                        <span className="elem-arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  {el.example && (
                    <div className="elem-example">
                      <span className="elem-ex-lbl">Example</span>
                      {el.example}
                    </div>
                  )}
                </div>

                {/* IMAGE SIDE */}
                <div className="elem-img-col">
                  <div className="elem-img-wrap">
                    <img src={el.img} alt={el.title} className="elem-img" loading="lazy" />
                    <span className="elem-img-num">{el.num}</span>
                    <span className="elem-img-accent">{el.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════ CTA — SPLIT LAYOUT ═══════════ */}
      <section className="cta-sec">

        {/* TOP — Main CTA */}
        <div className="cta-top">
          <div className="wrap">
            <div className="cta-split">

              {/* LEFT — Text */}
              <div className="cta-left" data-aos="fade-right" data-aos-duration="900">
                <span className="cta-sublbl">Ready to Dominate Google?</span>
                <h2 className="cta-title">
                  <span className="cta-stroke">Rank Higher,</span>
                  <span className="cta-solid">Grow Faster.</span>
                </h2>
                <p className="cta-desc">
                  Let's build a powerful SEO strategy tailored to your business.
                  Get a free consultation and watch your website climb to the top of search results.
                </p>
                <div className="cta-actions">
                  <button className="cta-btn-primary" onClick={() => window.location.href = '/contact'}>
                    <span>GET FREE CONSULTATION</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button className="cta-btn-ghost" onClick={() => window.location.href = '/portfolio'}>
                    VIEW WORK
                  </button>
                </div>
              </div>

              {/* RIGHT — Feature boxes */}
              <div className="cta-right" data-aos="fade-left" data-aos-delay="150" data-aos-duration="900">

                {/* Two feature boxes */}
                <div className="cta-feature-row">
                  <div className="cta-feat">
                    <div className="cta-feat-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <div className="cta-feat-title">Higher Rankings</div>
                    <div className="cta-feat-txt">Proven strategies that push your site to Google's first page.</div>
                  </div>
                  <div className="cta-feat">
                    <div className="cta-feat-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                      </svg>
                    </div>
                    <div className="cta-feat-title">Fast Results</div>
                    <div className="cta-feat-txt">See measurable SEO improvements within weeks, not months.</div>
                  </div>
                  <div className="cta-feat">
                    <div className="cta-feat-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div className="cta-feat-title">More Traffic</div>
                    <div className="cta-feat-txt">Attract qualified visitors who actually convert into clients.</div>
                  </div>
                  <div className="cta-feat">
                    <div className="cta-feat-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                    <div className="cta-feat-title">Full Audit</div>
                    <div className="cta-feat-txt">Complete on-page & technical SEO audit of your website.</div>
                  </div>
                </div>

                {/* Big stat row */}
                <div className="cta-feat-big">
                  <div className="cta-feat-big-num">150+</div>
                  <div className="cta-feat-big-label">Projects Successfully Delivered<br />with Proven SEO Results</div>
                </div>
                <div className="cta-feat-big">
                  <div className="cta-feat-big-num">99%</div>
                  <div className="cta-feat-big-label">Client Satisfaction Rate<br />Across All SEO Campaigns</div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM — Trust bar */}
        <div className="cta-bottom">
          <div className="wrap">
            <div className="cta-bottom-inner">
              <div className="cta-trust">
                {[
                  { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, label: 'Google Certified' },
                  { icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>, label: '8+ Years Experience' },
                  { icon: <><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></>, label: '5-Star Rated Service' },
                ].map((t, i) => (
                  <div className="cta-trust-item" key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{t.icon}</svg>
                    {t.label}
                  </div>
                ))}
              </div>
              <div className="cta-rating">
                <div className="cta-stars">
                  {[0,1,2,3,4].map(i => (
                    <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <span className="cta-rating-txt">4.9 / 5 — 120+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}