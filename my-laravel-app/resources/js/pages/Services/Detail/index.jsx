import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../../../components/SEO';

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&rsquo;/g, "'").replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
    .replace(/\n{3,}/g, '\n\n').trim();
}

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="8 9 10 11 8 13"/><line x1="12" y1="13" x2="15" y2="13"/></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
];

export default function ServiceDetailPage({ service, related = [] }) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 50 });
  }, []);

  if (!service) {
    return (
      <main style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', padding: '8rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#111' }}>Service not found</h1>
        <Link href="/services" style={{ color: '#6366f1', marginTop: '1rem', display: 'inline-block' }}>← Back to Services</Link>
      </main>
    );
  }

  const desc = stripHtml(service.description || '');
  const iconIdx = (service.id || 0) % ICONS.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: desc.slice(0, 200),
    provider: { '@type': 'Person', name: 'Nikhil Sharma', url: 'https://thenikhilsharma.in' },
    areaServed: [{ '@type': 'City', name: 'Jaipur' }, { '@type': 'Country', name: 'India' }],
    url: `https://thenikhilsharma.in/services/${service.slug}`,
  };

  return (
    <main className="sd-root">
      <SEO
        title={`${service.title} — Jaipur | Nikhil Sharma`}
        description={desc.slice(0, 160) || `Professional ${service.title} services in Jaipur by Nikhil Sharma.`}
        keywords={`${service.title} Jaipur, ${service.title} India, Nikhil Sharma ${service.title}`}
        structuredData={[schema]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .sd-root { font-family: 'Space Grotesk', sans-serif; background: #f5f5f5; color: #1a1a1a; min-height: 100vh; }

        /* BREADCRUMB */
        .sd-breadcrumb {
          background: #fff; border-bottom: 1px solid #e5e7eb;
          padding: 0.9rem clamp(1.2rem, 4vw, 2.5rem);
          display: flex; align-items: center; gap: 8px;
          font-size: 0.78rem; color: #9ca3af; font-weight: 500;
        }
        .sd-breadcrumb a { color: #6366f1; text-decoration: none; }
        .sd-breadcrumb a:hover { text-decoration: underline; }
        .sd-breadcrumb-sep { color: #d1d5db; }

        /* HERO */
        .sd-hero {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f3460 100%);
          padding: clamp(3.5rem, 7vw, 6rem) clamp(1.2rem, 4vw, 2.5rem);
          position: relative; overflow: hidden;
        }
        .sd-hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px; pointer-events: none;
        }
        .sd-hero-glow {
          position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%);
          top: -150px; right: -100px; pointer-events: none;
        }
        .sd-hero-inner {
          max-width: 1180px; margin: 0 auto;
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr auto;
          align-items: center; gap: 2rem;
        }
        .sd-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
          padding: 0.35rem 1rem; border-radius: 100px;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #a5b4fc; margin-bottom: 1.2rem;
        }
        .sd-hero h1 {
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 700; color: #fff;
          letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 1rem;
        }
        .sd-hero-sub {
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.6); line-height: 1.75;
          max-width: 580px; font-weight: 400;
        }
        .sd-hero-icon-box {
          width: 100px; height: 100px; border-radius: 24px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #a5b4fc; flex-shrink: 0;
        }
        .sd-hero-icon-box svg { width: 48px; height: 48px; }
        @media (max-width: 600px) {
          .sd-hero-inner { grid-template-columns: 1fr; }
          .sd-hero-icon-box { display: none; }
        }

        /* MAIN LAYOUT */
        .sd-body {
          max-width: 1180px; margin: 0 auto;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 4vw, 2.5rem);
          display: grid; grid-template-columns: 1fr 340px;
          gap: 2.5rem; align-items: start;
        }
        @media (max-width: 900px) {
          .sd-body { grid-template-columns: 1fr; }
        }

        /* LEFT — MAIN CONTENT */
        .sd-main { display: flex; flex-direction: column; gap: 2rem; }

        .sd-card {
          background: #fff; border-radius: 16px;
          border: 1px solid #e5e7eb; padding: 2rem 2.2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .sd-card-title {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6366f1;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 1.4rem;
        }
        .sd-card-title::before { content: ''; display: inline-block; width: 16px; height: 2px; background: #6366f1; }

        /* Description */
        .sd-desc {
          font-size: 0.95rem; color: #4b5563; line-height: 1.85;
          white-space: pre-line; font-weight: 400;
        }

        /* Features */
        .sd-features-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media (max-width: 540px) { .sd-features-grid { grid-template-columns: 1fr; } }
        .sd-feat-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 0.75rem 1rem;
          background: #f9fafb; border-radius: 10px;
          border: 1px solid #f0f0f0;
          font-size: 0.87rem; color: #374151; font-weight: 500; line-height: 1.5;
        }
        .sd-feat-check {
          flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
          background: #ede9fe; display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .sd-feat-check svg { width: 10px; height: 10px; }

        /* RIGHT — SIDEBAR */
        .sd-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

        /* CTA Card */
        .sd-cta-card {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px; padding: 2rem;
          color: #fff; text-align: center;
          box-shadow: 0 8px 30px rgba(99,102,241,0.35);
        }
        .sd-cta-card h3 {
          font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .sd-cta-card p { font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-bottom: 1.5rem; line-height: 1.6; }
        .sd-cta-card-btn {
          display: block; width: 100%;
          padding: 0.85rem 1.5rem;
          background: #fff; color: #6366f1;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; text-decoration: none;
          border-radius: 10px; text-align: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .sd-cta-card-btn:hover { background: #f5f3ff; transform: translateY(-1px); }

        /* Price Card */
        .sd-price-card {
          background: #fff; border-radius: 16px;
          border: 1px solid #e5e7eb; padding: 1.5rem 2rem;
        }
        .sd-price-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 0.5rem;
        }
        .sd-price-value {
          font-size: 1.5rem; font-weight: 700; color: #111;
          letter-spacing: -0.02em; margin-bottom: 0.3rem;
        }
        .sd-price-note { font-size: 0.78rem; color: #9ca3af; }

        /* Back link */
        .sd-back-link {
          background: #fff; border-radius: 16px;
          border: 1px solid #e5e7eb; padding: 1.2rem 1.5rem;
          display: flex; align-items: center; gap: 10px;
          font-size: 0.82rem; font-weight: 600; color: #374151;
          text-decoration: none; transition: all 0.2s ease;
        }
        .sd-back-link:hover { border-color: #6366f1; color: #6366f1; }

        /* RELATED */
        .sd-related-section {
          max-width: 1180px; margin: 0 auto;
          padding: 0 clamp(1.2rem, 4vw, 2.5rem) clamp(3rem, 5vw, 4rem);
        }
        .sd-related-title {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6366f1;
          display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem;
        }
        .sd-related-title::before { content: ''; display: inline-block; width: 16px; height: 2px; background: #6366f1; }
        .sd-related-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem;
        }
        @media (max-width: 700px) { .sd-related-grid { grid-template-columns: 1fr; } }
        .sd-related-card {
          background: #fff; border-radius: 14px;
          border: 1px solid #e5e7eb; padding: 1.5rem;
          text-decoration: none; color: inherit;
          transition: all 0.25s ease; display: block;
        }
        .sd-related-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-3px); border-color: #c7d2fe; }
        .sd-related-card-num { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.5rem; }
        .sd-related-card-title { font-size: 1rem; font-weight: 700; color: #111; margin-bottom: 0.4rem; letter-spacing: -0.01em; }
        .sd-related-card-sub { font-size: 0.8rem; color: #9ca3af; }
        .sd-related-card-arrow { margin-top: 1.2rem; font-size: 0.75rem; font-weight: 700; color: #6366f1; letter-spacing: 0.06em; text-transform: uppercase; }
      `}</style>

      {/* BREADCRUMB */}
      <nav className="sd-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="sd-breadcrumb-sep">›</span>
        <Link href="/services">Services</Link>
        <span className="sd-breadcrumb-sep">›</span>
        <span style={{ color: '#374151' }}>{service.title}</span>
      </nav>

      {/* HERO */}
      <section className="sd-hero">
        <div className="sd-hero-dots" />
        <div className="sd-hero-glow" />
        <div className="sd-hero-inner" data-aos="fade-up" data-aos-duration="800">
          <div>
            <div className="sd-hero-badge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#a5b4fc"><circle cx="4" cy="4" r="4"/></svg>
              Professional Service
            </div>
            <h1>{service.title}</h1>
            {service.subtitle && (
              <p className="sd-hero-sub">{stripHtml(service.subtitle)}</p>
            )}
          </div>
          <div className="sd-hero-icon-box">
            {ICONS[iconIdx]}
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="sd-body">
        {/* LEFT */}
        <div className="sd-main">
          {/* Description */}
          {service.description && (
            <div className="sd-card" data-aos="fade-up" data-aos-delay="50">
              <p className="sd-card-title">About This Service</p>
              <p className="sd-desc">{desc}</p>
            </div>
          )}

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="sd-card" data-aos="fade-up" data-aos-delay="100">
              <p className="sd-card-title">What's Included</p>
              <div className="sd-features-grid">
                {service.features.map((feat, fi) => (
                  <div key={fi} className="sd-feat-item">
                    <span className="sd-feat-check">
                      <svg viewBox="0 0 12 12" fill="none" stroke="#6366f1" strokeWidth="2.5">
                        <polyline points="2 6 5 9 10 3"/>
                      </svg>
                    </span>
                    {stripHtml(feat)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="sd-sidebar" data-aos="fade-left" data-aos-delay="150">
          {/* CTA */}
          <div className="sd-cta-card">
            <h3>Interested in This Service?</h3>
            <p>Get a free consultation and custom quote tailored to your project.</p>
            <Link href="/contact" className="sd-cta-card-btn">
              Get a Free Quote →
            </Link>
          </div>

          {/* Price */}
          {service.price_range && (
            <div className="sd-price-card">
              <p className="sd-price-label">Starting Price</p>
              <p className="sd-price-value">{service.price_range}</p>
              <p className="sd-price-note">Final price depends on project scope & requirements.</p>
            </div>
          )}

          {/* Back */}
          <Link href="/services" className="sd-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            View All Services
          </Link>
        </aside>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="sd-related-section">
          <p className="sd-related-title">Other Services</p>
          <div className="sd-related-grid">
            {related.map((rel, ri) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="sd-related-card"
                data-aos="fade-up"
                data-aos-delay={ri * 80}
              >
                <p className="sd-related-card-num">Service {String(ri + 1).padStart(2, '0')}</p>
                <p className="sd-related-card-title">{rel.title}</p>
                {rel.subtitle && <p className="sd-related-card-sub">{stripHtml(rel.subtitle).slice(0, 60)}…</p>}
                <p className="sd-related-card-arrow">Learn More →</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
