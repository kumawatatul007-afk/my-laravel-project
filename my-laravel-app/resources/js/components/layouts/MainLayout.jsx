import { useState, useEffect, useRef } from 'react'
import { Link, usePage } from '@inertiajs/react'
import AlbertSEO from '../AlbertSEO'

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Custom cursor
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const { url } = usePage()
  const currentPath = url.split('?')[0]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc', fontFamily: "'Space Grotesk', sans-serif" }}>
      <AlbertSEO />
      {/* Custom Cursor */}
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        * { cursor: none !important; }

        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 6px; height: 6px;
          background: #131313; border-radius: 50%;
          pointer-events: none; z-index: 99999;
          margin-left: -3px; margin-top: -3px;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1.5px solid #131313; border-radius: 50%;
          pointer-events: none; z-index: 99998;
          margin-left: -18px; margin-top: -18px;
          will-change: transform; background: transparent;
        }

        .mora-nav {
          background: #f5f7f8;
          border-bottom: 1px solid #e8ecf0;
          position: sticky; top: 0; z-index: 200;
          box-shadow: 0 1px 8px rgba(30,58,138,0.06);
        }
        .mora-nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2.5rem;
          height: 80px; display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
        }
        .mora-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800; font-size: 1.6rem; color: #1e3a8a;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none; user-select: none; flex-shrink: 0;
        }
        .mora-links {
          display: flex; align-items: center; gap: 0;
          flex: 1; justify-content: center;
        }
        .mora-link {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; font-size: 0.82rem;
          letter-spacing: 1.8px; text-transform: uppercase;
          color: #374151; text-decoration: none;
          padding: 0.5rem 1.1rem; border-radius: 0;
          transition: color 0.18s;
        }
        .mora-link:hover, .mora-link.active { color: #1e3a8a; }

        .mora-dropdown-wrap { position: relative; }
        .mora-dropdown-trigger {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; font-size: 0.82rem;
          letter-spacing: 1.8px; text-transform: uppercase;
          color: #374151; background: none; border: none;
          padding: 0.5rem 1.1rem; border-radius: 0; cursor: pointer;
          display: inline-flex; align-items: center; gap: 4px;
          transition: color 0.18s; text-decoration: none;
        }
        .mora-dropdown-trigger:hover,
        .mora-dropdown-trigger.active { color: #1e3a8a; }
        .mora-chevron { display: inline-block; transition: transform 0.22s ease; line-height: 1; }
        .mora-chevron.up { transform: rotate(180deg); }

        .mora-dropdown-panel {
          position: absolute; top: calc(100% + 14px); left: 50%;
          min-width: 210px; background: #f1f5f9;
          box-shadow: 0 8px 28px rgba(30,58,138,0.13);
          overflow: hidden; opacity: 0; pointer-events: none;
          transform: translateX(-50%) translateY(-8px) scaleY(0.92);
          transform-origin: top center;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 300;
        }
        .mora-dropdown-panel.open {
          opacity: 1; pointer-events: auto;
          transform: translateX(-50%) translateY(0) scaleY(1);
        }
        .mora-dropdown-item {
          display: block; font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.82rem;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #1e293b; text-decoration: none;
          padding: 1rem 1.5rem; transition: background 0.15s, color 0.15s;
        }
        .mora-dropdown-item:hover { background: #e2e8f0; color: #1e3a8a; }

        .mora-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
        .mora-hire-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.82rem;
          letter-spacing: 1.8px; text-transform: uppercase;
          background: #1e3a8a; color: #fff; border: 2px solid #1e3a8a;
          padding: 0.8rem 1.8rem; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 0; text-decoration: none;
          position: relative;
          box-shadow: none;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .mora-hire-btn .hire-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .mora-hire-btn:hover {
          background: #fff;
          color: #1a1a1a;
          box-shadow: 6px 6px 0px 0px #1e3a8a;
          transform: translate(-3px, -3px);
        }
        .mora-hire-btn:hover .hire-arrow {
          transform: translateX(4px);
        }

        .mora-hamburger {
          display: none; background: none; border: none;
          cursor: pointer; padding: 4px; color: #1e3a8a;
        }
        .mora-mobile-menu {
          background: #fff; border-top: 1px solid #e2e8f0;
          padding: 1rem 2rem 1.25rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .mora-mobile-link {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; font-size: 0.9rem;
          letter-spacing: 1px; text-transform: uppercase;
          color: #334155; text-decoration: none;
          padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;
          transition: color 0.15s;
        }
        .mora-mobile-link:hover, .mora-mobile-link.active { color: #1e3a8a; }
        .mora-mobile-sub {
          padding-left: 1rem; display: flex; flex-direction: column; gap: 0;
          overflow: hidden; animation: mobileSlide 0.2s ease forwards;
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mora-mobile-sub-link {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.82rem;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #475569; text-decoration: none;
          padding: 0.45rem 0; border-bottom: 1px solid #f8fafc;
          transition: color 0.15s;
        }
        .mora-mobile-sub-link:hover { color: #1e3a8a; }
        .mora-mobile-blog-trigger {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; font-size: 0.9rem;
          letter-spacing: 1px; text-transform: uppercase;
          color: #334155; background: none; border: none;
          border-bottom: 1px solid #f1f5f9;
          padding: 0.5rem 0; cursor: pointer;
          display: flex; align-items: center;
          justify-content: space-between; width: 100%;
          transition: color 0.15s;
        }
        .mora-mobile-blog-trigger:hover { color: #1e3a8a; }
        .mora-mobile-footer {
          display: flex; align-items: center;
          justify-content: flex-end;
          padding-top: 0.75rem; margin-top: 0.25rem;
        }

        @media (max-width: 640px) {
          .mora-links    { display: none; }
          .mora-right    { display: none; }
          .mora-hamburger { display: block; }
          .mora-nav-inner { padding: 0 1.25rem; }
        }

        /* FOOTER */
        .mora-footer {
          border-top: 1px solid #e2e8f0;
          background: #f5f7f8; padding: 1.25rem 0;
        }
        .mora-footer-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
        }
        .mora-footer-copy {
          font-size: 0.8rem; color: #9ca3af;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 400; margin: 0; letter-spacing: 0.01em;
        }
        .mora-footer-socials { display: flex; align-items: center; gap: 0.5rem; }
        .mora-social-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 2.1rem; height: 2.1rem; border-radius: 50%;
          background-color: #e5e7eb; color: #374151; text-decoration: none;
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .mora-social-icon svg { width: 0.9rem; height: 0.9rem; fill: currentColor; }
        .mora-social-icon:hover { background-color: #131313; color: #ffffff; transform: translateY(-2px); }

        @media (max-width: 640px) {
          .mora-footer-inner { flex-direction: column; gap: 0.75rem; text-align: center; padding: 0 1.25rem; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="mora-nav">
        <div className="mora-nav-inner">

          <Link href="/" className="mora-brand">MORA</Link>

          <div className="mora-links">
            <Link href="/"        className={`mora-link${currentPath === '/' || currentPath === '/dashboard' ? ' active' : ''}`}>Home</Link>
            <Link href="/about"   className={`mora-link${currentPath === '/about'   ? ' active' : ''}`}>About</Link>

            {/* Blog link */}
            <Link href="/blog" className={`mora-link${currentPath.startsWith('/blog') ? ' active' : ''}`}>Blog</Link>

            {/* Portfolio link */}
            <Link href="/portfolio" className={`mora-link${currentPath.startsWith('/portfolio') ? ' active' : ''}`}>Portfolio</Link>

            <Link href="/seo" className={`mora-link${currentPath === '/seo' ? ' active' : ''}`}>SEO</Link>

            <Link href="/contact" className={`mora-link${currentPath === '/contact' ? ' active' : ''}`}>Contact</Link>
          </div>

          <div className="mora-right">
            <Link href="/contact" className="mora-hire-btn">HIRE ME &nbsp;<span className="hire-arrow">›</span></Link>
          </div>

          {/* Mobile hamburger */}
          <button className="mora-hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mora-mobile-menu">
            <Link href="/"        className={`mora-mobile-link${currentPath === '/' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about"   className={`mora-mobile-link${currentPath === '/about' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/blog"    className={`mora-mobile-link${currentPath.startsWith('/blog') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/portfolio" className={`mora-mobile-link${currentPath.startsWith('/portfolio') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Portfolio</Link>
            <Link href="/seo" className={`mora-mobile-link${currentPath === '/seo' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>SEO</Link>
            <Link href="/contact" className={`mora-mobile-link${currentPath === '/contact' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</Link>

            <div className="mora-mobile-footer">
              <Link href="/contact" className="mora-hire-btn" onClick={() => setMenuOpen(false)}>HIRE ME &nbsp;<span className="hire-arrow">›</span></Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main style={{ flex: 1, width: '100%' }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="mora-footer">
        <div className="mora-footer-inner">
          <p className="mora-footer-copy">© NusaTheme 2026 | All Rights Reserved</p>
          <div className="mora-footer-socials">
            <a href="#" className="mora-social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="mora-social-icon" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="mora-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="mora-social-icon" aria-label="Dribbble">
              <svg viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.477 0-.945.04-1.4.112zm13.44 9.483c-.453-.14-3.773-.993-7.76-.43 1.5 4.11 2.11 7.47 2.23 8.13 2.87-1.9 4.84-5.01 5.53-7.7z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
