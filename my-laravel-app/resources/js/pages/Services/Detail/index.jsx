import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../../../components/SEO';

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
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
    .replace(/&ndash;/g, '\u2013')
    .replace(/&mdash;/g, '\u2014')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const ICONS = {
  'website-design-development': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <polyline points="8 9 10 11 8 13"/>
      <line x1="12" y1="13" x2="15" y2="13"/>
    </svg>
  ),
  'mobile-app-development': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/>
    </svg>
  ),
  'ui-ux-design': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
    </svg>
  ),
  'e-commerce-development': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  'seo-performance-optimisation': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
      <polyline points="8 11 10 13 14 9"/>
    </svg>
  ),
  'website-maintenance-support': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

function getIcon(slug) {
  return ICONS[slug] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );
}

const PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sd-root { font-family: 'Space Grotesk', sans-serif; background: #f5f5f5; color: #1a1a1a; min-height: 100vh; }

  .sd-hero {
    position: relative;
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f3460 100%);
    padding: clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3rem) clamp(3rem,6vw,5rem);
    overflow: hidden;
  }
  .sd-hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 30px 30px;
  }
  .sd-hero-glow {
    position: absolute; width: 600px; height: 600px; pointer-events: none;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%);
    top: -200px; right: -100px;
  }
  .sd-hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }

  .sd-breadcrumb {
    display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    font-size: 0.75rem; color: rgba(255,255,255,0.45); margin-bottom: 2rem;
  }
  .sd-breadcrumb a { color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
  .sd-breadcrumb a:hover { color: rgba(255,255,255,0.8); }
  .sd-bc-sep { opacity: 0.3; }
  .sd-bc-cur { color: rgba(255,255,255,0.7); }

  .sd-icon-wrap {
    width: 80px; height: 80px; border-radius: 20px; margin-bottom: 1.8rem;
    background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.3);
    display: flex; align-items: center; justify-content: center; color: #a5b4fc;
  }
  .sd-hero h1 {
    font-size: clamp(2.2rem,5vw,4rem); font-weight: 700; color: #fff;
    letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1.2rem;
  }
  .sd-hero h1 .accent {
    background: linear-gradient(135deg, #6366f1, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sd-hero-sub {
    font-size: clamp(1rem,1.8vw,1.15rem); color: rgba(255,255,255,0.6);
    line-height: 1.75; max-width: 600px; margin-bottom: 2.5rem;
  }
  .sd-hero-meta { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .sd-price-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
    padding: 0.5rem 1.2rem; border-radius: 100px;
    font-size: 0.8rem; font-weight: 700; color: #a5b4fc; letter-spacing: 0.05em;
  }
  .sd-cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 0 8px 24px rgba(99,102,241,0.4); transition: all 0.25s ease;
  }
  .sd-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.5); }

  .sd-body { max-width: 1100px; margin: 0 auto; padding: clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,2.5rem); }
  .sd-grid { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; align-items: start; }
  @media (max-width: 900px) { .sd-grid { grid-template-columns: 1fr; } }

  .sd-card {
    background: #fff; border-radius: 20px; border: 1px solid #e5e7eb;
    padding: clamp(2rem,4vw,3rem); margin-bottom: 2rem;
  }
  .sd-eyebrow {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
    color: #6366f1; display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;
  }
  .sd-eyebrow::before { content: ''; display: inline-block; width: 16px; height: 2px; background: #6366f1; }
  .sd-desc { font-size: 0.97rem; color: #444; line-height: 1.9; white-space: pre-line; }
  .sd-desc-html { font-size: 0.97rem; color: #444; line-height: 1.9; }
  .sd-desc-html h2 { font-size: 1.3rem; font-weight: 700; color: #111; margin: 1.8rem 0 0.8rem; letter-spacing: -0.01em; }
  .sd-desc-html h3 { font-size: 1.1rem; font-weight: 700; color: #222; margin: 1.4rem 0 0.6rem; }
  .sd-desc-html p { margin-bottom: 1rem; }
  .sd-desc-html ul, .sd-desc-html ol { padding-left: 1.4rem; margin-bottom: 1rem; }
  .sd-desc-html li { margin-bottom: 0.4rem; }
  .sd-desc-html strong { color: #111; font-weight: 700; }
  .sd-desc-html a { color: #6366f1; text-decoration: underline; }
  .sd-desc-html h2:first-child, .sd-desc-html h3:first-child { margin-top: 0; }

  .sd-feat-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
    gap: 1rem; margin-top: 1.5rem;
  }
  .sd-feat-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 1rem 1.2rem; background: #f9fafb; border-radius: 12px;
    border: 1px solid #f0f0f0; font-size: 0.88rem; color: #374151;
    font-weight: 500; line-height: 1.5; transition: border-color 0.2s, background 0.2s;
  }
  .sd-feat-item:hover { background: #f0f4ff; border-color: #c7d2fe; }
  .sd-feat-check {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; margin-top: 1px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
  }
  .sd-feat-check svg { width: 10px; height: 10px; color: #fff; }

  .sd-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
  .sd-sidebar-card { background: #fff; border-radius: 20px; border: 1px solid #e5e7eb; padding: 1.8rem; }
  .sd-sidebar-title { font-size: 0.85rem; font-weight: 700; color: #111; margin-bottom: 1.2rem; }
  .sd-cta-card {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 20px; padding: 2rem; text-align: center; color: #fff;
  }
  .sd-cta-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; }
  .sd-cta-card p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 1.5rem; line-height: 1.6; }
  .sd-cta-card-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.75rem 1.8rem; background: #fff; color: #6366f1;
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; border-radius: 8px; transition: all 0.2s ease;
  }
  .sd-cta-card-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
  .sd-info-row {
    display: flex; justify-content: space-between; gap: 1rem; font-size: 0.85rem;
    border-bottom: 1px solid #f0f0f0; padding-bottom: 0.9rem;
  }
  .sd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
  .sd-info-label { color: #9ca3af; font-weight: 600; }
  .sd-info-value { color: #374151; font-weight: 500; text-align: right; }
  .sd-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.85rem 1.5rem; background: #fff; border: 1.5px solid #e5e7eb;
    border-radius: 10px; text-decoration: none; font-size: 0.82rem;
    font-weight: 700; color: #374151; transition: all 0.2s ease;
  }
  .sd-back-btn:hover { border-color: #6366f1; color: #6366f1; }

  .sd-related { margin-top: 4rem; }
  .sd-related-title { font-size: clamp(1.4rem,2.5vw,1.9rem); font-weight: 700; color: #111; letter-spacing: -0.02em; margin-bottom: 1.8rem; }
  .sd-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 1.2rem; }
  .sd-related-card {
    background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 1.6rem;
    text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 0.8rem;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .sd-related-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-3px); }
  .sd-related-card-title { font-size: 1rem; font-weight: 700; color: #111; }
  .sd-related-card-sub { font-size: 0.82rem; color: #9ca3af; line-height: 1.5; }
  .sd-related-arrow {
    display: inline-flex; align-items: center; gap: 6px; margin-top: auto;
    font-size: 0.75rem; font-weight: 700; color: #6366f1;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
`;

// "web-development" → "/service/Web/development"
function toServiceUrl(slug) {
  if (!slug) return '/services';
  const parts = slug.split('-');
  const prefix = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const rest = parts.slice(1).join('-');
  return rest ? `/service/${prefix}/${rest}` : `/service/${prefix}`;
}

export default function ServiceDetailPage({ service, related = [], setting = null }) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 50 });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [service?.id]);

  // ── Dynamic values from setting ──────────────────────────────────────────
  const siteName  = setting?.website_title || 'Nikhil Sharma';
  const sitePhone = setting?.phone         || null;
  const siteEmail = setting?.email         || null;

  if (!service) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '1rem' }}>Service not found</h2>
          <Link href="/services" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const features = Array.isArray(service.features) ? service.features : [];
  const descText = stripHtml(service.description || '');
  const hasHtmlDesc = !!(service.description && service.description.includes('<'));

  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title || '',
    description: (service.meta_description || descText || '').slice(0, 300),
    provider: { '@type': 'Person', name: siteName, url: 'https://thenikhilsharma.in' },
    url: `https://thenikhilsharma.in${toServiceUrl(service.slug || '')}`,
    ...(service.price_range ? { offers: { '@type': 'Offer', description: service.price_range } } : {}),
  }];

  const safeTitle = service.title || 'Service';
  const titleWords = safeTitle.split(' ');
  const titleMain  = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : '';
  const titleLast  = titleWords[titleWords.length - 1] || safeTitle;

  return (
    <main className="sd-root">
      <SEO
        title={service.meta_title || `${safeTitle} — Jaipur | ${siteName}`}
        description={service.meta_description || service.subtitle || (descText ? descText.slice(0, 160) : '') || `Professional ${safeTitle} services in Jaipur by ${siteName}.`}
        keywords={service.meta_keyword || `${safeTitle} Jaipur, ${safeTitle} India, ${siteName} ${safeTitle}`}
        structuredData={structuredData}
      />

      <style>{PAGE_STYLES}</style>

      {/* ── HERO ── */}
      <section className="sd-hero">
        <div className="sd-hero-dots" />
        <div className="sd-hero-glow" />
        <div className="sd-hero-inner">

          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sd-bc-sep">›</span>
            <Link href="/services">Services</Link>
            <span className="sd-bc-sep">›</span>
            <span className="sd-bc-cur">{service.title}</span>
          </nav>

          <h1 data-aos="fade-up" data-aos-delay="80" data-aos-duration="700">
            {titleMain
              ? <>{titleMain} <span className="accent">{titleLast}</span></>
              : <span className="accent">{titleLast}</span>
            }
          </h1>

          {service.subtitle && (
            <p className="sd-hero-sub" data-aos="fade-up" data-aos-delay="150" data-aos-duration="700">
              {service.subtitle}
            </p>
          )}

          <div className="sd-hero-meta" data-aos="fade-up" data-aos-delay="220" data-aos-duration="700">
            {service.price_range && (
              <span className="sd-price-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                {service.price_range}
              </span>
            )}
            <Link href="/contact" className="sd-cta-btn">
              {service.cta_text || 'Get a Free Quote'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="sd-body">
        <div className="sd-grid">

          {/* LEFT */}
          <div>
            {(service.description) && (
              <div className="sd-card" data-aos="fade-up" data-aos-duration="600">
                <p className="sd-eyebrow">Overview</p>
                {hasHtmlDesc ? (
                  <div
                    className="sd-desc-html"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                ) : (
                  <p className="sd-desc">{descText}</p>
                )}
              </div>
            )}

            {features.length > 0 && (
              <div className="sd-card" data-aos="fade-up" data-aos-delay="80" data-aos-duration="600">
                <p className="sd-eyebrow">What's Included</p>
                <div className="sd-feat-grid">
                  {features.map((feat, i) => (
                    <div key={i} className="sd-feat-item">
                      <span className="sd-feat-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="sd-sidebar">
            <div className="sd-cta-card" data-aos="fade-left" data-aos-duration="600">
              <h3>Ready to get started?</h3>
              <p>Let's discuss your project and build something great together.</p>
              <Link href="/contact" className="sd-cta-card-btn">
                Contact Me
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="sd-sidebar-card" data-aos="fade-left" data-aos-delay="80" data-aos-duration="600">
              <p className="sd-sidebar-title">Quick Info</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  { label: 'Location', value: 'Jaipur, India (Remote OK)' },
                  { label: 'Delivery', value: '2–12 weeks depending on scope' },
                  { label: 'Stack',    value: 'React, Laravel, Flutter, PHP' },
                  { label: 'Support',  value: 'Post-launch maintenance available' },
                  ...(sitePhone ? [{ label: 'Phone', value: sitePhone }] : []),
                  ...(siteEmail ? [{ label: 'Email', value: siteEmail }] : []),
                ].map(item => (
                  <div key={item.label} className="sd-info-row">
                    <span className="sd-info-label">{item.label}</span>
                    <span className="sd-info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/services" className="sd-back-btn" data-aos="fade-left" data-aos-delay="160" data-aos-duration="600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Services
            </Link>
          </aside>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="sd-related" data-aos="fade-up" data-aos-duration="700">
            <h2 className="sd-related-title">Other Services</h2>
            <div className="sd-related-grid">
              {related.map(s => (
                <Link key={s.id} href={toServiceUrl(s.slug)} className="sd-related-card">
                  <p className="sd-related-card-title">{s.title}</p>
                  {s.subtitle && <p className="sd-related-card-sub">{s.subtitle}</p>}
                  {s.price_range && (
                    <p style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: 700 }}>{s.price_range}</p>
                  )}
                  <span className="sd-related-arrow">
                    View Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
