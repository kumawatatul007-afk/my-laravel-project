import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../../components/SEO';

const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Fast, secure websites built to rank and convert',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="36" height="36">
        <rect x="2" y="3" width="20" height="14" rx="1" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="8 9 10 11 8 13" />
        <line x1="12" y1="13" x2="15" y2="13" />
      </svg>
    ),
    description: `I build fast, secure, and scalable websites tailored to your business goals using modern technologies like React, Laravel, and PHP. Every project is delivered with clean, maintainable code and pixel-perfect designs that perform well on every device and screen size.

From simple landing pages to complex multi-page web applications, I apply SEO best practices, accessibility standards (WCAG 2.1 AA), and Core Web Vitals optimisation from day one — not as an afterthought. This means your site loads quickly, ranks well in Google, and provides a smooth experience for every visitor.

I work closely with clients to understand their audience, map out user journeys, and create digital experiences that convert visitors into customers. Whether you need a new website from scratch, a redesign of an existing site, or a custom web application with a database backend, I deliver on time and within budget.`,
    features: [
      'Custom React & Laravel development',
      'Mobile-first, responsive design',
      'SEO-optimised HTML structure',
      'Core Web Vitals performance tuning',
      'Secure authentication & admin panels',
      'API integration & third-party services',
    ],
    cta: 'Get a free web development quote',
  },
  {
    id: 'app-development',
    title: 'Mobile App Development',
    subtitle: 'Cross-platform iOS & Android apps with Flutter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="36" height="36">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
      </svg>
    ),
    description: `I develop cross-platform mobile applications using Flutter and React Native that run natively on both iOS and Android from a single codebase. This approach dramatically reduces development time and cost without sacrificing performance or user experience.

My app development process covers everything from initial wireframing and UI/UX design through to backend API integration, testing, and deployment to the App Store and Google Play. I have built apps for e-commerce, logistics, healthcare, and service-based businesses across India and the Middle East.

Each app is designed with intuitive navigation, smooth animations, and offline capability where needed. I also provide post-launch support and iterative updates to keep your app current with the latest OS versions and user feedback. If you already have a web backend, I can connect your app to it via a RESTful API or GraphQL endpoint.`,
    features: [
      'Flutter & React Native development',
      'iOS & Android from one codebase',
      'App Store & Google Play deployment',
      'REST API & backend integration',
      'Push notifications & analytics',
      'Post-launch support & updates',
    ],
    cta: 'Get a free app development quote',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'User-centred design that guides and converts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="36" height="36">
        <rect x="3" y="3" width="14" height="18" rx="1.5" />
        <path d="M17 7l3.5-3.5a1.5 1.5 0 0 1 2.1 2.1L19 9" />
        <path d="M17 7l2 2" />
        <line x1="7" y1="9" x2="13" y2="9" />
        <line x1="7" y1="13" x2="11" y2="13" />
      </svg>
    ),
    description: `Good design is invisible — it guides users effortlessly toward their goals without friction or confusion. I create UI/UX designs in Figma that are visually compelling, brand-consistent, and grounded in user research and real-world usability principles.

My design process starts with understanding your target audience and business objectives, then moves through wireframing, prototyping, and iterative user testing before a single line of code is written. This saves significant development time and ensures the final product actually solves the right problems.

I design responsive layouts that adapt beautifully from mobile to desktop, with careful attention to typography, colour contrast, spacing, and accessibility (WCAG 2.1 AA). Whether you need a full product design from scratch or a redesign of an existing interface, I deliver design systems and component libraries that make development faster and keep your product visually consistent as it grows.`,
    features: [
      'Figma wireframes & prototypes',
      'User research & journey mapping',
      'Responsive, mobile-first layouts',
      'Design systems & component libraries',
      'WCAG 2.1 AA accessibility compliance',
      'Handoff-ready assets for developers',
    ],
    cta: 'Get a free design consultation',
  },
];

export default function ServicesPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }, []);

  return (
    <main className="services-page">
      <SEO
        title="Web Development, App Development & UI/UX Design Services — Jaipur"
        description="Hire Nikhil Sharma for professional web development, mobile app development, and UI/UX design in Jaipur. PHP, React, Flutter. Affordable rates, fast delivery."
        keywords="Web Development Services Jaipur, App Development Jaipur, UI UX Design India, PHP Developer Jaipur, React Developer, Flutter App Developer, Hire Freelance Developer India"
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Services by Nikhil Sharma",
          "itemListElement": SERVICES.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Service",
              "name": s.title,
              "description": s.description.slice(0, 200),
              "provider": {
                "@type": "Person",
                "name": "Nikhil Sharma",
                "url": "https://thenikhilsharma.in"
              },
              "areaServed": "Jaipur, India"
            }
          }))
        }]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap');

        .services-page {
          background: #f8fafb;
          min-height: 100vh;
          font-family: 'Space Grotesk', sans-serif;
        }

        .sp-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          padding: clamp(4rem, 8vw, 7rem) 2rem clamp(3rem, 6vw, 5rem);
          text-align: center;
        }

        .sp-hero-label {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #93c5fd;
          margin-bottom: 1rem;
        }

        .sp-hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #f8fafc;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 1.25rem;
        }

        .sp-hero p {
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        .sp-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2.2rem;
          background: #fff;
          color: #0f172a;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .sp-hero-cta:hover { background: #e2e8f0; transform: translateY(-2px); }

        .sp-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 3vw, 2.5rem);
        }

        .sp-service-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem 4rem;
          align-items: start;
          padding: clamp(3rem, 5vw, 4.5rem) 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .sp-service-block:last-child { border-bottom: none; }
        .sp-service-block:nth-child(even) .sp-service-text { order: 2; }
        .sp-service-block:nth-child(even) .sp-service-features { order: 1; }

        @media (max-width: 768px) {
          .sp-service-block { grid-template-columns: 1fr; gap: 2rem; }
          .sp-service-block:nth-child(even) .sp-service-text { order: 1; }
          .sp-service-block:nth-child(even) .sp-service-features { order: 2; }
        }

        .sp-service-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: #eff6ff;
          border-radius: 12px;
          color: #1e3a8a;
          margin-bottom: 1.25rem;
        }

        .sp-service-text h2 {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 0.4rem;
        }

        .sp-service-subtitle {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e3a8a;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .sp-service-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.85;
          white-space: pre-line;
        }

        .sp-service-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1.75rem;
          padding: 0.75rem 1.75rem;
          background: #1e3a8a;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .sp-service-cta:hover {
          background: #0f172a;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 rgba(30,58,138,0.2);
        }

        .sp-service-features {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .sp-features-heading {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 1.25rem;
        }

        .sp-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sp-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #374151;
          line-height: 1.5;
        }

        .sp-check {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          background: #eff6ff;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .sp-check svg { width: 10px; height: 10px; color: #1e3a8a; }

        .sp-bottom-cta {
          text-align: center;
          padding: 4rem 2rem;
          background: #0f172a;
          margin-top: 2rem;
        }

        .sp-bottom-cta h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .sp-bottom-cta p {
          font-size: 1rem;
          color: #94a3b8;
          margin-bottom: 2rem;
        }

        .sp-bottom-cta-btns {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .sp-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2.2rem;
          background: #fff;
          color: #0f172a;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .sp-cta-primary:hover { background: #e2e8f0; transform: translateY(-2px); }

        .sp-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2.2rem;
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.3);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s;
        }
        .sp-cta-secondary:hover { border-color: #fff; transform: translateY(-2px); }
      `}</style>

      {/* Hero */}
      <section className="sp-hero">
        <span className="sp-hero-label">What I Do</span>
        <h1>Web, App & Design Services<br />in Jaipur, India</h1>
        <p>8+ years helping businesses across India and the Middle East build digital products that look great, load fast, and rank on Google.</p>
        <Link href="/contact" className="sp-hero-cta">Get a Free Quote →</Link>
      </section>

      {/* Service Blocks */}
      <div className="sp-container">
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className="sp-service-block"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Text side */}
            <div className="sp-service-text">
              <div className="sp-service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p className="sp-service-subtitle">{service.subtitle}</p>
              <p className="sp-service-desc">{service.description}</p>
              <Link href="/contact" className="sp-service-cta">{service.cta} →</Link>
            </div>

            {/* Features side */}
            <div className="sp-service-features" data-aos="fade-up" data-aos-delay={i * 80 + 100}>
              <p className="sp-features-heading">What's included</p>
              <ul className="sp-features-list">
                {service.features.map((f) => (
                  <li key={f}>
                    <span className="sp-check">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="sp-bottom-cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's talk about your goals and build something great together.</p>
        <div className="sp-bottom-cta-btns">
          <Link href="/contact" className="sp-cta-primary">Contact Me →</Link>
          <Link href="/portfolio" className="sp-cta-secondary">View My Work</Link>
        </div>
      </section>
    </main>
  );
}
