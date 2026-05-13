import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../../components/SEO';

// Utility: strip HTML tags from a string safely
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Service Icons (enhanced)
const SERVICE_ICONS = [
  <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <polyline points="8 9 10 11 8 13" />
    <line x1="12" y1="13" x2="15" y2="13" />
  </svg>,
  <svg key="app" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>,
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>,
  <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>,
  <svg key="cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>,
];

const FAQS = [
  {
    question: 'How much does a website cost in Jaipur?',
    answer: 'A basic business website starts from ₹15,000. A custom React or Laravel web application typically ranges from ₹50,000 to ₹1,50,000 depending on features, integrations, and complexity. I provide a detailed quote after a free discovery call.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A standard 5–8 page business website takes 2–3 weeks. A full-featured web application with a backend, admin panel, and API integrations typically takes 6–12 weeks. Timelines are agreed upfront and I provide weekly progress updates.',
  },
  {
    question: 'Do you work with clients outside Jaipur?',
    answer: 'Yes. I work with clients across India and internationally — including the UAE, UK, and USA. All communication is handled via video calls, email, and project management tools, so location is never a barrier.',
  },
  {
    question: 'What technologies do you use for web development?',
    answer: 'I primarily use React (frontend), Laravel/PHP (backend), and MySQL or SQLite (database). For mobile apps I use Flutter and React Native. I choose the stack that best fits your project requirements and long-term maintenance needs.',
  },
  {
    question: 'Will my website rank on Google?',
    answer: 'Every website I build includes on-page SEO foundations: semantic HTML, structured data (JSON-LD), fast load times, Core Web Vitals optimisation, and mobile-first design. Ongoing SEO content strategy is available as an add-on service.',
  },
  {
    question: 'Do you provide website maintenance after launch?',
    answer: 'Yes. I offer monthly maintenance packages covering security updates, performance monitoring, content changes, and bug fixes. Rates start from ₹3,000/month depending on the scope.',
  },
];

export default function ServicesPage({ services = [] }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
    setTimeout(() => AOS.refresh(), 100);
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const serviceSchemas = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: stripHtml(s.description ? s.description.split('\n\n')[0] : s.subtitle),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: s.price_range,
        priceCurrency: 'INR',
      },
      availability: 'https://schema.org/InStock',
      url: `https://thenikhilsharma.in/services#${s.slug}`,
    },
    provider: {
      '@type': 'Person',
      name: 'Nikhil Sharma',
      url: 'https://thenikhilsharma.in',
    },
    areaServed: [
      { '@type': 'City', name: 'Jaipur' },
      { '@type': 'Country', name: 'India' },
    ],
    serviceType: s.title,
    url: `https://thenikhilsharma.in/services#${s.slug}`,
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="sp">
      <SEO
        title="Web Development, App Development & UI/UX Design Services — Jaipur"
        description="Hire Nikhil Sharma for professional web development, mobile app development, and UI/UX design in Jaipur. PHP, React, Flutter. Affordable rates, fast delivery."
        keywords="Web Development Services Jaipur, App Development Jaipur, UI UX Design India, PHP Developer Jaipur, React Developer, Flutter App Developer, Hire Freelance Developer India"
        ogImage="https://thenikhilsharma.in/images/og-social-card.jpg"
        structuredData={[...serviceSchemas, faqSchema]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        .sp {
          background: #f6f5f0;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
        }

        /* ── HERO WITH BACKGROUND IMAGE ── */
        .sp-hero {
          position: relative;
          padding: clamp(6rem, 12vw, 10rem) 2rem clamp(5rem, 8vw, 7rem);
          text-align: center;
          overflow: hidden;
          isolation: isolate;
        }
        
        /* Background Image with Overlay */
        .sp-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80');
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          z-index: 0;
        }
        
        /* Dark Gradient Overlay for readability */
        .sp-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%);
        }
        
        /* Subtle grid texture overlay */
        .sp-hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 1;
        }
        
        .sp-hero-glow {
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(255,215,150,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        
        .sp-hero-label {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8a87c;
          margin-bottom: 1.5rem;
          background: rgba(255,255,255,0.08);
          padding: 0.4rem 1rem;
          border-radius: 40px;
          backdrop-filter: blur(4px);
        }
        .sp-hero-label::before,
        .sp-hero-label::after {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #c8a87c;
        }
        
        .sp-hero h1 {
          position: relative;
          z-index: 2;
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 6vw, 4.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 1.2rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .sp-hero h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #f5e6d3 0%, #c8a87c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .sp-hero-sub {
          position: relative;
          z-index: 2;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          color: rgba(255,255,255,0.85);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
          font-weight: 400;
          backdrop-filter: blur(2px);
        }
        
        .sp-hero-cta {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 2.5rem;
          background: linear-gradient(105deg, #fff 0%, #f5f0e8 100%);
          color: #0e0e0e;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          border-radius: 40px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .sp-hero-cta:hover {
          transform: translateY(-3px);
          background: #ffffff;
          box-shadow: 0 12px 28px rgba(0,0,0,0.25);
          gap: 16px;
        }
        .sp-hero-cta svg {
          transition: transform 0.25s ease;
        }
        .sp-hero-cta:hover svg {
          transform: translateX(5px);
        }

        /* ── STATS BAR (modern glassmorphism) ── */
        .sp-stats {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(0px);
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          border-bottom: 1px solid #e8e5de;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .sp-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.8rem 3rem;
          border-right: 1px solid #ece9e2;
          flex: 1;
          transition: all 0.2s ease;
        }
        .sp-stat:hover {
          background: #faf9f5;
        }
        .sp-stat:last-child { border-right: none; }
        .sp-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #0e0e0e;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .sp-stat-label {
          font-size: 0.7rem;
          color: #777;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 6px;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .sp-stat { padding: 1.25rem 1rem; flex: 1 1 50%; }
          .sp-stat:nth-child(2) { border-right: none; }
        }

        /* ── SERVICES SECTION (premium) ── */
        .sp-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem);
        }

        .sp-section-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a88754;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .sp-section-label::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, #e0ddd6, transparent);
        }

        .sp-service-block {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 4rem 5rem;
          align-items: start;
          padding: clamp(2.8rem, 6vw, 5rem) 0;
          border-top: 1px solid #e8e5de;
          transition: all 0.2s;
        }
        .sp-service-block:nth-child(even) .sp-service-text { order: 2; }
        .sp-service-block:nth-child(even) .sp-service-card { order: 1; }
        @media (max-width: 780px) {
          .sp-service-block {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .sp-service-block:nth-child(even) .sp-service-text { order: 1; }
          .sp-service-block:nth-child(even) .sp-service-card { order: 2; }
        }

        .sp-service-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #bba88a;
          margin-bottom: 1rem;
        }

        .sp-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
          border-radius: 16px;
          color: #f0e2d0;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 18px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }
        .sp-service-text:hover .sp-icon-wrap {
          transform: scale(1.02);
        }

        .sp-service-text h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #0e0e0e;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin: 0 0 0.6rem;
        }

        .sp-subtitle {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a88754;
          margin-bottom: 1rem;
        }

        .sp-price {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          background: #0e0e0e;
          color: #f0e2d0;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 30px;
          margin-bottom: 1.4rem;
          letter-spacing: 0.04em;
        }

        .sp-desc {
          font-size: 0.98rem;
          color: #4a4a4a;
          line-height: 1.75;
          font-weight: 400;
          white-space: pre-line;
        }

        .sp-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #a0713e;
          text-decoration: none;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e0caae;
          padding-bottom: 4px;
          transition: all 0.2s ease;
        }
        .sp-cta-link svg { transition: transform 0.2s ease; }
        .sp-cta-link:hover { color: #0e0e0e; border-color: #0e0e0e; gap: 12px; }
        .sp-cta-link:hover svg { transform: translateX(5px); }

        /* Features card (premium) */
        .sp-service-card {
          background: #ffffff;
          border: 1px solid #efebe2;
          border-radius: 24px;
          padding: 2rem 1.8rem;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.02);
        }
        .sp-service-card:hover {
          box-shadow: 0 25px 40px -20px rgba(0,0,0,0.12);
          transform: translateY(-5px);
          border-color: #e2d5c4;
        }

        .sp-card-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bfaa8f;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f3efe8;
        }

        .sp-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sp-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          color: #2c2c2c;
          font-weight: 450;
          line-height: 1.5;
        }
        .sp-check {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          margin-top: 2px;
          background: #1e1e1e;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .sp-check svg { width: 11px; height: 11px; }

        /* ── FAQ (elegant) ── */
        .sp-faq-wrap {
          background: #ffffff;
          border-top: 1px solid #ede9e0;
          border-bottom: 1px solid #ede9e0;
          padding: clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 4vw, 3rem);
        }
        .sp-faq-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .sp-faq-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        .sp-faq-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #0e0e0e;
          letter-spacing: -0.02em;
          margin: 0 0 0.6rem;
        }
        .sp-faq-header p {
          font-size: 1rem;
          color: #7a6e5d;
          font-weight: 400;
        }

        .sp-faq-item {
          border-bottom: 1px solid #f0ece4;
        }
        .sp-faq-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 1.4rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1c1c1c;
          text-align: left;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .sp-faq-btn:hover { color: #a88754; }
        .sp-chevron {
          flex-shrink: 0;
          color: #a88754;
          transition: transform 0.25s ease;
        }
        .sp-chevron.open { transform: rotate(180deg); }
        .sp-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s ease;
          font-size: 0.95rem;
          color: #5e5b55;
          line-height: 1.75;
          font-weight: 400;
          padding: 0;
        }
        .sp-faq-answer.open {
          max-height: 260px;
          padding-bottom: 1.5rem;
        }

        /* ── BOTTOM CTA (refined) ── */
        .sp-bottom {
          background: #0e0e0e;
          padding: clamp(4.5rem, 9vw, 7rem) 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sp-bottom-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        .sp-bottom h2 {
          position: relative;
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 0.8rem;
        }
        .sp-bottom p {
          position: relative;
          font-size: 1.05rem;
          color: #aaa39a;
          font-weight: 400;
          margin-bottom: 2.5rem;
        }
        .sp-bottom-btns {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }
        .sp-btn-white {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.9rem 2.2rem;
          background: #ffffff;
          color: #0e0e0e;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          border-radius: 40px;
          transition: all 0.25s ease;
        }
        .sp-btn-white:hover { background: #f5ede2; transform: translateY(-3px); gap: 14px; }
        .sp-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.9rem 2.2rem;
          background: transparent;
          color: #fff;
          border: 1.5px solid #3a352e;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          border-radius: 40px;
          transition: all 0.25s ease;
        }
        .sp-btn-outline:hover { border-color: #c8a87c; background: rgba(200,168,124,0.08); transform: translateY(-3px); }

        html { scroll-behavior: smooth; }
      `}</style>

      {/* HERO WITH BACKGROUND IMAGE (professional, dark but rich) */}
      <section className="sp-hero" data-aos="fade-down" data-aos-duration="900">
        <div className="sp-hero-bg"></div>
        <div className="sp-hero-grid" />
        <div className="sp-hero-glow" />
        <div className="sp-hero-label">Bespoke Digital Solutions</div>
        <h1>
          Web, App &amp; Design Services<br />
          <em>in Jaipur, India</em>
        </h1>
        <p className="sp-hero-sub">
          8+ years helping businesses across India and the Middle East build digital products that look great, load fast, and rank on Google.
        </p>
        <Link href="/contact" className="sp-hero-cta">
          Get a Free Quote
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* STATS */}
      <div className="sp-stats">
        {[
          { num: '8+', label: 'Years Experience' },
          { num: '120+', label: 'Projects Delivered' },
          { num: '3', label: 'Countries Served' },
          { num: '98%', label: 'Client Satisfaction' },
        ].map((s) => (
          <div key={s.label} className="sp-stat">
            <span className="sp-stat-num">{s.num}</span>
            <span className="sp-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div className="sp-container">
        <p className="sp-section-label">What I Offer</p>

        {services.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>
            No services available at the moment. Check back soon.
          </p>
        ) : (
          services.map((service, i) => (
            <div
              key={service.id}
              id={service.slug}
              className="sp-service-block"
              data-aos="fade-up"
              data-aos-delay={i * 70}
              data-aos-duration="700"
            >
              <div className="sp-service-text">
                <p className="sp-service-num">0{i + 1}</p>
                <div className="sp-icon-wrap">
                  {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                </div>
                <h2>{service.title}</h2>
                {service.subtitle && (
                  <p className="sp-subtitle">{stripHtml(service.subtitle)}</p>
                )}
                {service.price_range && (
                  <span className="sp-price">Starting from {service.price_range}</span>
                )}
                {service.description && (
                  <p className="sp-desc">{stripHtml(service.description)}</p>
                )}
                <Link href="/contact" className="sp-cta-link">
                  {service.cta_text || 'Get a free quote'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {service.features && service.features.length > 0 && (
                <div
                  className="sp-service-card"
                  data-aos="fade-left"
                  data-aos-delay={i * 70 + 120}
                  data-aos-duration="600"
                >
                  <p className="sp-card-label">What's included</p>
                  <ul className="sp-features-list">
                    {service.features.map((feature, fi) => (
                      <li key={fi}>
                        <span className="sp-check">
                          <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2">
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        </span>
                        {stripHtml(feature)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FAQ */}
      <section className="sp-faq-wrap" aria-labelledby="faq-heading">
        <div className="sp-faq-inner">
          <div className="sp-faq-header">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <p>Everything you need to know before hiring a web developer in Jaipur.</p>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} className="sp-faq-item">
              <button
                className="sp-faq-btn"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.question}
                <svg
                  className={`sp-chevron${openFaq === i ? ' open' : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`sp-faq-answer${openFaq === i ? ' open' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="sp-bottom" data-aos="fade-up" data-aos-duration="800">
        <div className="sp-bottom-grid" />
        <h2>Ready to Start Your Project?</h2>
        <p>Let's talk about your goals and build something great together.</p>
        <div className="sp-bottom-btns">
          <Link href="/contact" className="sp-btn-white">
            Contact Me
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/portfolio" className="sp-btn-outline">View My Work</Link>
        </div>
      </section>
    </main>
  );
}