import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';
import SEO from '../../components/SEO';
import OptimizedImage from '../../components/OptimizedImage';

export default function DashboardPage({ blogPosts: dbBlogPosts, portfolios: dbPortfolios, services: dbServices = [], setting }) {
  const [totalPosts] = useState(0);

  function stripHtml(html) {
    if (!html) return '';
    const plain = html.replace(/<[^>]*>/g, '').trim();
    return plain.length > 130 ? plain.slice(0, 130) + '...' : plain;
  }

  function getBlogImage(image) {
    if (!image) return 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg';
    if (image.startsWith('http')) return image;
    return `/images/blogs/${image}`;
  }

  const [blogPosts] = useState(
    (dbBlogPosts && dbBlogPosts.length > 0) ? dbBlogPosts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: stripHtml(p.description),
      image_url: getBlogImage(p.image),
      author: p.created_by || 'Nikhil Sharma',
      date: p.created_at ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
    })) : [
    {
      id: 1,
      title: 'How to Build a Portfolio Website with React & Laravel',
      excerpt: 'Step-by-step guide to building a modern portfolio website using React for the frontend and Laravel for the backend.',
      image_url: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg',
      author: 'Nikhil Sharma',
      date: 'May 2026',
    },
    {
      id: 2,
      title: 'Top 10 SEO Tips for Developers in 2026',
      excerpt: 'Boost your website ranking with these actionable SEO tips tailored for developers and technical founders.',
      image_url: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-2.jpg',
      author: 'Nikhil Sharma',
      date: 'May 2026',
    },
    {
      id: 3,
      title: 'Laravel vs Node.js: Which Backend Should You Choose?',
      excerpt: 'A practical comparison of Laravel and Node.js for building scalable web applications in 2026.',
      image_url: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-3.jpg',
      author: 'Nikhil Sharma',
      date: 'May 2026',
    },
  ]);

  // Portfolio items from database (Inertia props se)
  const [portfolios, setPortfolios] = useState(
    (dbPortfolios && dbPortfolios.length > 0) ? dbPortfolios.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/project-5.jpg',
      type: p.type || 'image',
      url: p.project_url || null,
    })) : []
  );

  // Agar Inertia se data nahi aaya toh API fallback
  useEffect(() => {
    if (!dbPortfolios || dbPortfolios.length === 0) {
      fetch('/api/portfolio')
        .then(res => res.json())
        .then(data => setPortfolios(data.slice(0, 6).map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          image: p.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/project-5.jpg',
          type: p.type || 'image',
          url: p.project_url || null,
        }))))
        .catch(() => {});
    }
  }, []);

  // Testimonials from database
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Rajesh Agarwal', position: 'Founder & CEO', company: 'TechRetail India', text: "Nikhil redesigned our e-commerce platform from scratch using React and Laravel. Page load time dropped from 8s to under 2s, and our conversion rate improved by 34% in the first month. Highly professional, delivered on time.", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg', rating: 5 },
    { id: 2, name: 'Priya Mehta', position: 'Marketing Director', company: 'Jaipur Handicrafts Co.', text: "We needed a website that could rank for local search terms in Jaipur. Nikhil built us a fully SEO-optimised site with proper schema markup. We now appear on page 1 for 'handicrafts Jaipur' — something we struggled with for years.", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-2.jpg', rating: 5 },
    { id: 3, name: 'Ahmed Al-Rashid', position: 'Operations Manager', company: 'Gulf Logistics LLC', text: "Nikhil built our courier management app in Flutter. It runs perfectly on both iOS and Android, integrates with our existing backend, and our drivers love the interface. He was responsive across time zones throughout the project.", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-3.jpg', rating: 5 },
  ]);
  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  // Video modal state
  const [videoOpen, setVideoOpen] = useState(false);

  // Preloader state
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Typing animation state
  const typingTexts = ['Web Developer', 'UI/UX Designer', 'App Developer'];
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 55);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex(prev => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  // AOS initialization — preloader hatne ke baad
  useEffect(() => {
    if (!isLoading) {
      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
      });
    }
  }, [isLoading]);

  // Preloader and Lenis smooth scroll initialization
  useEffect(() => {
    // Exit animation pehle, phir unmount
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      import('lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      });
    }
  }, [isLoading]);

  // SVG icons for service cards (mapped by index)
  const SERVICE_ICONS_SVG = [
    // Web Development
    <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <polyline points="8 9 10 11 8 13" />
      <line x1="12" y1="13" x2="15" y2="13" />
    </svg>,
    // App Development
    <svg key="app" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>,
    // UI/UX Design
    <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>,
    // SEO / Digital Marketing
    <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>,
    // Cloud / Other
    <svg key="cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>,
  ];

  // Services from DB (passed via Inertia), fallback to static if empty
  const services = (dbServices && dbServices.length > 0) ? dbServices : [
    { id: 1, title: 'Web Development', slug: 'web-development', description: 'I build fast, secure, and scalable websites tailored to your business goals using React, Laravel, and PHP.' },
    { id: 2, title: 'App Development', slug: 'app-development', description: 'Cross-platform mobile apps using Flutter and React Native for iOS and Android.' },
    { id: 3, title: 'UI/UX Design', slug: 'ui-ux-design', description: 'Visually compelling, brand-consistent designs in Figma grounded in user research.' },
  ];

  // Keywords from Setting.strating_keyword (comma-separated) — fallback to static
  const keywordHighlights = (() => {
    if (setting && setting.strating_keyword) {
      return setting.strating_keyword.split(',').map(k => k.trim()).filter(Boolean);
    }
    return [
      'Best Software Developer in Jaipur',
      'Best Software Developer in Kalwar Road',
      'Best Software Developer in Jagatpura',
      'Best Software Developer in Civil Lines',
    ];
  })();

  // Service highlights from DB service titles — fallback to static
  const serviceHighlights = (dbServices && dbServices.length > 0)
    ? dbServices.map(s => s.title)
    : [
      'Best Website Design Near Me',
      'Best WEBSITE DEVELOPER FOR HIRE',
      'Best Data-Driven Decision Making is Critical to Create Business Value',
    ];

  const experiences = [
    { id: 1, company: 'Apple', title: 'UX / UI Designer', duration: 'Jan 2023 – May 2024', description: 'Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus', logo: 'M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.025-1.154-.229-1.729-.764-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z' },
    { id: 2, company: 'Facebook', title: 'UX / UI Designer', duration: 'June 2020 – Jan 2023', description: 'Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus', logo: 'M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z' },
    { id: 3, company: 'Airbnb', title: 'Web Developer', duration: 'March 2019 – May 2020', description: 'Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus', logo: 'M12.001 16.709c-1.013-1.271-1.609-2.386-1.808-3.34-.197-.769-.12-1.385.218-1.848.357-.532.89-.791 1.589-.791s1.231.259 1.589.796c.335.458.419 1.075.215 1.848-.218.974-.813 2.087-1.808 3.341l.005-.006zm7.196.855c-.14.934-.775 1.708-1.65 2.085-1.687.734-3.359-.437-4.789-2.026 2.365-2.961 2.803-5.268 1.787-6.758-.596-.855-1.449-1.271-2.544-1.271-2.206 0-3.419 1.867-2.942 4.034.276 1.173 1.013 2.506 2.186 3.996-.735.813-1.432 1.391-2.047 1.748-.478.258-.934.418-1.37.456-2.008.299-3.582-1.647-2.867-3.656.1-.259.297-.734.634-1.471l.019-.039c1.097-2.382 2.43-5.088 3.961-8.09l.039-.1.435-.836c.338-.616.477-.892 1.014-1.231.258-.157.576-.235.934-.235.715 0 1.271.418 1.511.753.118.18.259.419.436.716l.419.815.06.119c1.53 3.001 2.863 5.702 3.955 8.089l.02.019.401.915.237.573c.183.459.221.915.16 1.393z' }
  ];

  // Testimonials slider state
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = testimonials.length;

  const prevSlide = () => setActiveSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setActiveSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));

  // Auto-scroll: har 3 seconds mein next slide
  const autoScrollRef = useRef(null);

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      setActiveSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [totalSlides]);


  const skills = [
    { name: 'HTML', percent: 85 },
    { name: 'CSS', percent: 90 },
    { name: 'JAVASCRIPT', percent: 85 },
    { name: 'FIGMA', percent: 80 }
  ];

  // Skills animation - animate bars when section comes into view
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    if (isLoading) return; // wait for preloader to finish

    const checkAndObserve = () => {
      if (!skillsRef.current) return;

      // If already in viewport, trigger immediately
      const rect = skillsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setSkillsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(skillsRef.current);
      return () => observer.disconnect();
    };

    // Small delay to let Lenis initialise
    const t = setTimeout(checkAndObserve, 100);
    return () => clearTimeout(t);
  }, [isLoading]);

  // Services section animation
  const [svcVisible, setSvcVisible] = useState(false);
  const svcRef = useRef(null);
  const [svcPage, setSvcPage] = useState(0);
  const SVC_PER_PAGE = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSvcVisible(true); },
      { threshold: 0.15 }
    );
    if (svcRef.current) observer.observe(svcRef.current);
    return () => observer.disconnect();
  }, []);

  // Contact items slide-in animation
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setContactVisible(true); },
      { threshold: 0.2 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  // Blog section animation
  const [blogVisible, setBlogVisible] = useState(false);
  const blogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBlogVisible(true); },
      { threshold: 0.15 }
    );
    if (blogRef.current) observer.observe(blogRef.current);
    return () => observer.disconnect();
  }, []);

  // Back to top button and scroll progress
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Blog posts are fetched from API above (see useEffect at top)

  if (isLoading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

          .mora-preloader {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            overflow: hidden;
            pointer-events: all;
          }
          .mora-preloader__panel {
            flex: 1;
            background: #0f172a;
            transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1);
          }
          .mora-preloader__panel:first-child { transform-origin: left center; }
          .mora-preloader__panel:last-child  { transform-origin: right center; }
          .mora-preloader.exiting .mora-preloader__panel:first-child { transform: translateX(-100%); }
          .mora-preloader.exiting .mora-preloader__panel:last-child  { transform: translateX(100%); }
          .mora-preloader__center {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            transition: opacity 0.4s ease;
          }
          .mora-preloader.exiting .mora-preloader__center { opacity: 0; }
          .mora-preloader__brand {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: clamp(2rem, 8vw, 5rem);
            letter-spacing: 0.1em;
            text-transform: none;
            color: #f8fafc;
            display: flex;
            gap: 0.1em;
            font-style: italic;
          }
          .mora-preloader__brand span {
            display: inline-block;
            opacity: 0;
            transform: translateY(60px);
            animation: pl-letter-in 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards;
          }
          .mora-preloader__brand span:nth-child(1) { animation-delay: 0.1s; }
          .mora-preloader__brand span:nth-child(2) { animation-delay: 0.15s; }
          .mora-preloader__brand span:nth-child(3) { animation-delay: 0.2s; }
          .mora-preloader__brand span:nth-child(4) { animation-delay: 0.25s; }
          .mora-preloader__brand span:nth-child(5) { animation-delay: 0.3s; }
          .mora-preloader__brand span:nth-child(6) { animation-delay: 0.35s; }
          .mora-preloader__brand span:nth-child(7) { animation-delay: 0.4s; }
          .mora-preloader__brand span:nth-child(8) { animation-delay: 0.45s; }
          .mora-preloader__brand span:nth-child(9) { animation-delay: 0.5s; }
          .mora-preloader__brand span:nth-child(10) { animation-delay: 0.55s; }
          .mora-preloader__brand span:nth-child(11) { animation-delay: 0.6s; }
          .mora-preloader__brand span:nth-child(12) { animation-delay: 0.65s; }
          .mora-preloader__brand span:nth-child(13) { animation-delay: 0.7s; }
          @keyframes pl-letter-in {
            to { opacity: 1; transform: translateY(0); }
          }
          .mora-preloader__bar-wrap {
            width: clamp(120px, 20vw, 220px);
            height: 2px;
            background: rgba(255,255,255,0.12);
            border-radius: 2px;
            overflow: hidden;
          }
          .mora-preloader__bar {
            height: 100%;
            background: linear-gradient(90deg, #1e3a8a, #60a5fa);
            border-radius: 2px;
            animation: pl-bar 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes pl-bar {
            0%   { width: 0%; }
            60%  { width: 75%; }
            100% { width: 100%; }
          }
          .mora-preloader__tagline {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.72rem;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: rgba(248,250,252,0.45);
            opacity: 0;
            animation: pl-fade 0.5s ease 0.7s forwards;
          }
          .mora-preloader__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
            opacity: 0;
            animation: pl-fade 0.4s ease 0.5s forwards;
          }
          @keyframes pl-fade { to { opacity: 1; } }
        `}</style>

        <div className={`mora-preloader${isExiting ? ' exiting' : ''}`}>
          <div className="mora-preloader__panel" />
          <div className="mora-preloader__panel" />
          <div className="mora-preloader__center">
            <div className="mora-preloader__dot" />
            <div className="mora-preloader__brand">
              <span>N</span><span>i</span><span>k</span><span>h</span><span>i</span><span>l</span><span>&nbsp;</span><span>S</span><span>h</span><span>a</span><span>r</span><span>m</span><span>a</span>
            </div>
            <div className="mora-preloader__bar-wrap">
              <div className="mora-preloader__bar" />
            </div>
            <p className="mora-preloader__tagline">Portfolio &amp; Creative Studio</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="dashboard-container">
      <SEO
        title="Nikhil Sharma — Freelance PHP & React Developer Jaipur | Affordable Rates"
        description="Hire Nikhil Sharma, a Jaipur-based Full Stack Developer with 8+ years building websites, apps & digital solutions. Fast delivery, affordable rates, real results."
        keywords="Web Developer Jaipur, PHP Developer Jaipur, React Developer India, Full Stack Developer Jaipur, Hire Web Developer, Nikhil Sharma Developer"
        ogType="website"
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services does Nikhil Sharma offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nikhil Sharma offers web development, mobile app development, UI/UX design, and full stack development services in Jaipur, India."
              }
            },
            {
              "@type": "Question",
              "name": "Where is Nikhil Sharma based?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nikhil Sharma is based in Jaipur, Rajasthan, India and works with clients across India and the Middle East."
              }
            },
            {
              "@type": "Question",
              "name": "How much does Nikhil Sharma charge for web development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nikhil Sharma offers affordable web development services tailored to small businesses and startups. Contact for a free quote."
              }
            }
          ]
        }]}
      />
      {/* Back to top button with scroll progress */}
      {showBackToTop && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          <svg viewBox="0 0 100 100" className="progress-ring">
            <circle cx="50" cy="50" r="45" className="progress-ring-bg" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="progress-ring-fill"
              style={{ strokeDashoffset: `calc(283 - (283 * ${scrollProgress}) / 100)` }}
            />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #ffffff;
          border: none;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease;
        }
        .back-to-top-btn:hover {
          transform: translateY(-3px);
        }
        .progress-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .progress-ring-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 3;
        }
        .progress-ring-fill {
          fill: none;
          stroke: #1e3a8a;
          stroke-width: 3;
          stroke-dasharray: 283;
          transition: stroke-dashoffset 0.1s linear;
        }
        .arrow-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          color: #1e3a8a;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                <p className="hero-hello-text">HELLO I'M</p>
                <h1 className="hero-stroke-name">Nikhil<br />Sharma</h1>
              </div>
              <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <h2 className="hero-typing-line">
                  Freelance PHP, React &amp; Flutter Developer — Jaipur, India
                </h2>
                <p className="hero-typing-sub" aria-hidden="true">
                  I am a{' '}
                  <span className="hero-typed-word">
                    {typedText}
                    <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                  </span>
                </p>
              </div>
              <p className="hero-description" data-aos="zoom-out" data-aos-delay="300" data-aos-duration="1000">
              Hi, my name is Nikhil Sharma . I'm freelancer in India and throughout the Middle East. Over the past few years I have helped many small business owners in achieveing a presence online by developing quality websites and implementing successful online marketing strategies. I am an expert on helping start-up business and entrepreneurs who want an online presence with a simple, clean & effective websites but dont want to pay the high fees to larger web design corporations are charging. I believe in providing authentic and quality web development services at an affordable margin so that even small businesses can digitalize their services. I'm also a Full Stack Developer with over 8 Years of Exprience in IT              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                {/* WhatsApp Button (Replacing DOWNLOAD CV) */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20Nikhil%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-hero-btn"
                  aria-label="Chat on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <button className="hero-btn-watch" onClick={() => setVideoOpen(true)}>
                  <span className="hero-play-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="hero-play-icon">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </span>
                  <span className="hero-watch-text">Watch Intro</span>
                </button>
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1200">
              <div className="profile-circle-wrapper">
                <div className="profile-circle-img-wrap">
                  <img
                    src="/images/Gemini_Generated_Image_s2k77gs2k77gs2k7.png"
                    alt="Nikhil Sharma - Full Stack Developer & UI/UX Designer in Jaipur"
                    className="profile-circle-img"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    width="500"
                    height="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Services Section */}
      <section className="services-section" ref={svcRef}>
        <div className="container">
          <div className={`svc-header ${svcVisible ? 'svc-header-visible' : ''}`}>
            <div className="svc-header-label">
              <span className="svc-stroke-label">My Service</span>
            </div>
            <div className="svc-header-title">
              <h2 className="svc-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000" data-aos-offset="20">
                Web Development, App Development & UI/UX Design Services in Jaipur
              </h2>
            </div>
          </div>

          {/* Cards grid — only show current page slice */}
          <div className="svc-cards-grid">
            {services.slice(svcPage * SVC_PER_PAGE, (svcPage + 1) * SVC_PER_PAGE).map((service, index) => (
              <div
                key={service.id}
                className={`svc-card ${svcVisible ? 'svc-card-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="svc-card-icon">
                  {SERVICE_ICONS_SVG[(svcPage * SVC_PER_PAGE + index) % SERVICE_ICONS_SVG.length]}
                </div>
                <h3 className="svc-card-title">{service.title}</h3>
                <p className="svc-card-desc">
                  {service.description
                    ? service.description.replace(/<[^>]*>/g, '').slice(0, 160) + (service.description.replace(/<[^>]*>/g, '').length > 160 ? '…' : '')
                    : ''}
                </p>
                <a
                  href={service.slug ? `/services/${service.slug}` : '/services'}
                  className="svc-card-link"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>

          {/* Pagination — only show if more than one page */}
          {services.length > SVC_PER_PAGE && (
            <div className="svc-pagination">
              <button
                className="svc-pg-btn svc-pg-prev"
                onClick={() => setSvcPage(p => Math.max(0, p - 1))}
                disabled={svcPage === 0}
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {Array.from({ length: Math.ceil(services.length / SVC_PER_PAGE) }, (_, i) => (
                <button
                  key={i}
                  className={`svc-pg-dot${svcPage === i ? ' svc-pg-dot-active' : ''}`}
                  onClick={() => setSvcPage(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={svcPage === i ? 'page' : undefined}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="svc-pg-btn svc-pg-next"
                onClick={() => setSvcPage(p => Math.min(Math.ceil(services.length / SVC_PER_PAGE) - 1, p + 1))}
                disabled={svcPage === Math.ceil(services.length / SVC_PER_PAGE) - 1}
                aria-label="Next page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-header">
            <div className="about-header-label">
              <span className="about-stroke-label">About Me</span>
            </div>
            <div className="about-header-title">
              <h2 className="about-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000">
                Nikhil Sharma
              </h2>
            </div>
          </div>
          <div className="about-content-row">
            <div className="about-img-col" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
              <div className="about-circle-wrapper">
                <div className="about-circle-img-wrap">
                  <img
                    src="/images/Gemini_Generated_Image_ca27fpca27fpca27.png"
                    alt="About Nikhil Sharma"
                    className="about-circle-img"
                  />
                </div>
              </div>
            </div>
            <div className="about-text-col" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
              <p className="about-description">
              I am a Jaipur Rajasthan-based Full Stack Developer & Database architect with a focus on Software Development, Web Application, Mobile Application development. I am passionate about building excellent software that improves the lives of those around me.I have a diverse range of experience having worked across various fields and industries. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations. What would you do if you had a software expert available at your fingertips? I love helping pepole to build Awesome Application.              </p>
              <div className="about-checklist">
                {[
                  'Holistic Approach',
                  'Proven Track Record',
                  'Attention to Detail',
                  'Good Communication',
                ].map((item, idx) => (
                  <div key={item} className="about-check-item" data-aos="fade-right" data-aos-delay={300 + idx * 100} data-aos-duration="600">
                    <span className="about-check-icon">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="2 8 6 12 14 4" />
                      </svg>
                    </span>
                    <span className="about-check-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services ticker — static crawlable HTML, visually animated via CSS */}
      <div className="marquee-section" aria-label="Services offered">
        <ul className="marquee-track" aria-hidden="false">
          {[
            'Custom Web Development',
            'React JS Development',
            'PHP Laravel Development',
            'Mobile App Development',
            'Flutter App Development',
            'UI/UX Design',
            'E-Commerce Development',
            'SEO Optimisation',
            'Custom Web Development',
            'React JS Development',
            'PHP Laravel Development',
            'Mobile App Development',
            'Flutter App Development',
            'UI/UX Design',
            'E-Commerce Development',
            'SEO Optimisation',
          ].map((text, idx) => (
            <li key={idx} className="marquee-text">
              {text}
              {idx % 2 === 0 && <span className="marquee-star" aria-hidden="true">✦</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Resume/Experience Section */}
      <section className="resume-section">
        <div className="container">
          <div className="edu-title-wrap" data-aos="fade-up" data-aos-duration="1000">
            <div className="edu-title-row edu-title-row-1">
              <div className="edu-title-line"></div>
              <span className="edu-title-solid">MY EDUCATION</span>
            </div>
            <div className="edu-title-row edu-title-row-2">
              <span className="edu-title-solid">AND</span>
              <span className="edu-title-stroke">&nbsp;WORK</span>
            </div>
            <div className="edu-title-row edu-title-row-3">
              <span className="edu-title-stroke">EXPERIENCE</span>
              <div className="edu-title-line"></div>
            </div>
          </div>
          <div className="edu-timeline">
            <div className="edu-timeline-line"></div>

            {/* Row 1: Left = logo+company+date | Right = title+desc */}
            <div className="edu-item" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
              <div className="edu-item-left edu-item-logo-side">
                <div className="edu-item-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </div>
                <h4 className="edu-item-company">Apple</h4>
                <p className="edu-item-date">Jan 2023 – May 2024</p> 
              </div>
              <div className="edu-item-dot"></div>
              <div className="edu-item-right edu-item-text-side">
                <h4 className="edu-item-title">UX / UI Designer</h4>
                <p className="edu-item-desc">Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus</p>
              </div>
            </div>

            {/* Row 2: Left = title+desc | Right = logo+company+date */}
            <div className="edu-item edu-item-reverse" data-aos="fade-left" data-aos-delay="200" data-aos-duration="800">
              <div className="edu-item-left edu-item-text-side">
                <h4 className="edu-item-title">UX / UI Designer</h4>
                <p className="edu-item-desc">Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus</p>
              </div>
              <div className="edu-item-dot"></div>
              <div className="edu-item-right edu-item-logo-side">
                <div className="edu-item-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <h4 className="edu-item-company">Facebook</h4>
                <p className="edu-item-date">June 2020 – Jan 2023</p>
              </div>
            </div>

            {/* Row 3: Left = logo+company+date | Right = title+desc */}
            <div className="edu-item" data-aos="fade-right" data-aos-delay="300" data-aos-duration="800">
              <div className="edu-item-left edu-item-logo-side">
                <div className="edu-item-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 16.709c-1.013-1.271-1.609-2.386-1.808-3.34-.197-.769-.12-1.385.218-1.848.357-.532.89-.791 1.589-.791s1.231.259 1.589.796c.335.458.419 1.075.215 1.848-.218.974-.813 2.087-1.808 3.341l.005-.006zm7.196.855c-.14.934-.775 1.708-1.65 2.085-1.687.734-3.359-.437-4.789-2.026 2.365-2.961 2.803-5.268 1.787-6.758-.596-.855-1.449-1.271-2.544-1.271-2.206 0-3.419 1.867-2.942 4.034.276 1.173 1.013 2.506 2.186 3.996-.735.813-1.432 1.391-2.047 1.748-.478.258-.934.418-1.37.456-2.008.299-3.582-1.647-2.867-3.656.1-.259.297-.734.634-1.471l.019-.039c1.097-2.382 2.43-5.088 3.961-8.09l.039-.1.435-.836c.338-.616.477-.892 1.014-1.231.258-.157.576-.235.934-.235.715 0 1.271.418 1.511.753.118.18.259.419.436.716l.419.815.06.119c1.53 3.001 2.863 5.702 3.955 8.089l.02.019.401.915.237.573c.183.459.221.915.16 1.393z"/></svg>
                </div>
                <h4 className="edu-item-company">Airbnb</h4>
                <p className="edu-item-date">March 2019 – May 2020</p>
              </div>
              <div className="edu-item-dot"></div>
              <div className="edu-item-right edu-item-text-side">
                <h4 className="edu-item-title">Web Developer</h4>
                <p className="edu-item-desc">Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus</p>
              </div>
            </div>

            {/* Row 4: Left = title+desc | Right = logo+company+date */}
            <div className="edu-item edu-item-reverse" data-aos="fade-left" data-aos-delay="400" data-aos-duration="800">
              <div className="edu-item-left edu-item-text-side">
                <h4 className="edu-item-title">Multimedia & Creative Technology</h4>
                <p className="edu-item-desc">Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus</p>
              </div>
              <div className="edu-item-dot"></div>
              <div className="edu-item-right edu-item-logo-side">
                <div className="edu-item-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
                </div>
                <h4 className="edu-item-company">University</h4>
                <p className="edu-item-date">March 2016 – March 2019</p>
              </div>
            </div>
            {/* Row 5: Left = logo+company+date | Right = title+desc */}
            <div className="edu-item" data-aos="fade-right" data-aos-delay="500" data-aos-duration="800">
              <div className="edu-item-left edu-item-logo-side">
                <div className="edu-item-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
                </div>
                <h4 className="edu-item-company">University</h4>
                <p className="edu-item-date">March 2013 – March 2016</p>
              </div>
              <div className="edu-item-dot"></div>
              <div className="edu-item-right edu-item-text-side">
                <h4 className="edu-item-title">Multimedia & Creative Technology</h4>
                <p className="edu-item-desc">Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section" ref={skillsRef}>
        <div className="container">
          <div className="skill-layout">
            <div className="skill-label-col" data-aos="fade-right" data-aos-duration="1000">
              <span className="skill-stroke-label">My<br />Skill</span>
            </div>
            <div className="skill-bars-col">
              {skills.map((skill, i) => (
                <div key={skill.name} className="skill-item" data-aos="fade-up" data-aos-delay={i * 150} data-aos-duration="800">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-track">
                    <div
                      className={`skill-bar${skillsVisible ? ' skill-bar-animate' : ''}`}
                      style={{
                        '--skill-width': `${skill.percent}%`,
                        animationDelay: `${i * 0.18}s`,
                      }}
                    >
                      <span className="skill-badge">{skill.percent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="port-header">
            <div className="port-header-label">
              <span className="port-stroke-label">Portfolio</span>
            </div>
            <div className="port-header-title">
              <h2 className="port-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000">
                Selected Projects — Web, App & UI/UX Work
              </h2>
            </div>
          </div>
          <div className="port-grid">
            {portfolios.map((project, idx) => (
              <a key={project.id} href={`/portfolio/${project.id}`} style={{ textDecoration: 'none' }}>
              <div className="port-item" data-aos="zoom-in" data-aos-delay={idx * 100} data-aos-duration="800">
                <div className="port-img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="port-img"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    data-aos="fade-in"
                    data-aos-delay={idx * 150}
                    data-aos-duration="600"
                  />
                  <div className="port-overlay">
                    <div className="port-overlay-content">
                      <p className="port-overlay-cat">{project.category}</p>
                      <h4 className="port-overlay-title">{project.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} data-aos="fade-up" data-aos-delay="200">
            <a href="/portfolio" className="view-all-btn">
              VIEW ALL PROJECTS &nbsp;›
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testi-header">
            <div className="testi-header-label">
              <span className="testi-stroke-label">Testimonials</span>
            </div>
            <div className="testi-header-title">
              <h2 className="testi-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000">
                What Clients Say About Working With Me
              </h2>
            </div>
          </div>
          <div className="testi-slider-wrap">
            <div
              className="testi-slider-track"
              style={{ transform: `translateX(calc(-${activeSlide} * (50% + 1rem)))` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="testi-card"
                  data-aos="fade-up"
                  data-aos-delay={t.id * 100}
                  data-aos-duration="700"
                >
                  {/* Star rating */}
                  <div className="testi-stars" aria-label={`${t.rating || 5} out of 5 stars`}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} viewBox="0 0 20 20" fill={s <= (t.rating || 5) ? '#f59e0b' : '#e5e7eb'} width="14" height="14">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-client-row">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="testi-avatar"
                      loading="lazy"
                      decoding="async"
                      width="48"
                      height="48"
                    />
                    <div>
                      <h4 className="testi-name">{t.name}</h4>
                      <p className="testi-position">{t.position}{t.company ? `, ${t.company}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testi-controls">
            <div className="testi-arrows">
              <button className="testi-arrow-btn" onClick={() => { prevSlide(); startAutoScroll(); }} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="testi-arrow-btn" onClick={() => { nextSlide(); startAutoScroll(); }} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === activeSlide ? 'testi-dot-active' : ''}`}
                  onClick={() => { setActiveSlide(i); startAutoScroll(); }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos / Trusted By strip */}
      <section className="clients-section" data-aos="fade-up" aria-label="Clients and platforms">
        <div className="container">
          <p className="clients-label">TRUSTED BY CLIENTS & FEATURED ON</p>
          <div className="clients-logos-row">
            {[
              { name: 'Upwork',     href: 'https://www.upwork.com/freelancers/nikhilsharma',          abbr: 'UW' },
              { name: 'Clutch',     href: 'https://clutch.co/profile/nikhil-sharma-developer',        abbr: 'CL' },
              { name: 'GoodFirms', href: 'https://www.goodfirms.co/company/nikhil-sharma',            abbr: 'GF' },
              { name: 'Sulekha',   href: 'https://www.sulekha.com/nikhilsharma',                      abbr: 'SU' },
              { name: 'Justdial',  href: 'https://www.justdial.com/nikhilsharma',                     abbr: 'JD' },
              { name: 'LinkedIn',  href: 'https://www.linkedin.com/in/nikhil-sharma-jaipur',          abbr: 'LI' },
              { name: 'GitHub',    href: 'https://github.com/nikhilsharma',                           abbr: 'GH' },
            ].map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="client-logo-pill"
                aria-label={c.name}
              >
                <span className="client-logo-abbr">{c.abbr}</span>
                <span className="client-logo-name">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section" ref={blogRef}>
        <div className="container">
          <div className={`blog-header ${blogVisible ? 'blog-header-visible' : ''}`}>
            <div className="blog-header-label">
              <span className="blog-stroke-label">My Blog</span>
            </div>
            <div className="blog-header-title">
              <h2 className="blog-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000">
                Web Development Tips, Tutorials & Industry Insights
              </h2>
            </div>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <a
                key={post.id}
                href={`/blog/${post.slug || post.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
              <div
                className={`blog-card ${blogVisible ? 'blog-card-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                data-aos-duration="800"
              > 
                <div className="blog-img-wrap">
                  <img src={post.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'} alt={post.title} className="blog-img" loading="lazy" decoding="async" width="400" height="240"
                    onError={e => { e.target.src = 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'; }}
                  />
                </div>
                <div className="blog-card-body">
                  <h4 className="blog-card-title">{post.title}</h4>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <div className="blog-card-author-wrap">
                      <div className="blog-card-avatar">
                        <img
                          src="https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg"
                          alt={post.author}
                        />
                      </div>
                      <span className="blog-card-author">{post.author}</span>
                    </div>
                    <span className="blog-card-date">{post.date}</span>
                  </div>
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-left">
              <h2 className="contact-title" data-aos="fade-right" data-aos-duration="1000">
                LET'S<br />
                <span className="contact-title-indent">GET</span><br />
                IN TOUCH
              </h2> 
              <div className="contact-items" ref={contactRef}>
                <div className={`contact-item ${contactVisible ? 'contact-item-visible' : ''}`} style={{ transitionDelay: '0s' }} data-aos="fade-right" data-aos-delay="100" data-aos-duration="600">
                  <div className="contact-icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="contact-item-text">
                    <h4 className="contact-item-label">E-MAIL</h4>
                    <p className="contact-item-value">nikhilsharma@thenikhilsharma.in</p>
                  </div>
                </div>
                <div className={`contact-item ${contactVisible ? 'contact-item-visible' : ''}`} style={{ transitionDelay: '0.15s' }} data-aos="fade-right" data-aos-delay="250" data-aos-duration="600">
                  <div className="contact-icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div className="contact-item-text">
                    <h4 className="contact-item-label">PHONE</h4>
                    <p className="contact-item-value">+91 98765 43210</p>
                  </div>
                </div>
                <div className={`contact-item ${contactVisible ? 'contact-item-visible' : ''}`} style={{ transitionDelay: '0.3s' }} data-aos="fade-right" data-aos-delay="400" data-aos-duration="600">
                  <div className="contact-icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="contact-item-text">
                    <h4 className="contact-item-label">LOCATION</h4>
                    <p className="contact-item-value">Jaipur, Rajasthan, India — 302001</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-right" data-aos="zoom-out" data-aos-delay="200" data-aos-duration="1000">
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  fetch('/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      name: fd.get('name'),
                      email: fd.get('email'),
                      message: fd.get('message'),
                    }),
                  })
                    .then(res => res.ok && e.target.reset())
                    .catch(() => {});
                }}
              >
                <div className="contact-field">
                  <label className="contact-field-label">Name</label>
                  <input type="text" name="name" required className="contact-input" placeholder="" />
                </div>
                <div className="contact-field">
                  <label className="contact-field-label">Email</label>
                  <input type="email" name="email" required className="contact-input" placeholder="" />
                </div>
                <div className="contact-field">
                  <label className="contact-field-label">Message</label>
                  <textarea name="message" required className="contact-textarea" rows={5} placeholder=""></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">
                  SEND MESSAGE
                </button>
              </form>
              {/* WhatsApp secondary CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Nikhil%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta-btn"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords & Services Section (Side-by-Side) */}
      <section className="keywords-section" data-aos="fade-up" data-aos-delay="100">
        <div className="keywords-container">
          <div className="keywords-grid-row">
            {/* Keywords Column */}
            <div className="keywords-content">
              <p className="keywords-title">#KEYWORD</p>
              <div className="keywords-chips" data-lenis-prevent>
                {keywordHighlights.map((label, idx) => (
                  <a
                    key={idx}
                    href="/web-developer-jaipur"
                    className="keyword-chip"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div className="keywords-content">
              <p className="keywords-title">#SERVICES</p>
              <div className="keywords-chips" data-lenis-prevent>
                {serviceHighlights.map((label, idx) => {
                  const svc = (dbServices && dbServices.length > 0) ? dbServices[idx] : null;
                  const href = svc && svc.slug ? `/services/${svc.slug}` : '/services';
                  return (
                    <a
                      key={idx}
                      href={href}
                      className="keyword-chip"
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div className="video-modal-overlay" onClick={() => setVideoOpen(false)}>
          <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setVideoOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="video-modal-iframe-wrap">
              <iframe
                src="https://www.youtube.com/embed/yNDgFK2Jj1E?autoplay=1"
                title="What Is Visual Hierarchy?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-modal-iframe"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ---------- GLOBAL RESET & BASE ---------- */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #f5f7f8;
        }

        .dashboard-container {
          background-color: #f5f7f8;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Button hover effects */
        .about-resume-btn, .contact-submit-btn, .whatsapp-hero-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
        }
        .about-resume-btn:hover, .contact-submit-btn:hover, .whatsapp-hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 rgba(30, 58, 138, 0.25);
        }

        /* Project box hover effects */
        .port-img-wrap {
          position: relative;
          overflow: hidden;
          transition: clip-path 0.4s ease;
        }
        .port-img {
          transition: transform 0.6s ease;
        }
        .port-item:hover .port-img {
          transform: scale(1.05);
        }
        .port-overlay {
          transition: opacity 0.3s ease;
        }

        /* Testimonial avatar grayscale transition */
        .testi-avatar {
          transition: filter 0.4s ease;
        }

        /* ---------- SECTION SPACING ---------- */
        .hero-section {
          padding-top: 5rem;
          padding-bottom: 2rem;
          margin-bottom: 0;
        }

        .services-section,
        .about-section,
        .resume-section,
        .skills-section,
        .portfolio-section,
        .testimonials-section,
        .blog-section,
        .contact-section {
          margin-bottom: 5rem;
        }

        .marquee-section {
          margin-bottom: 5rem;
        }

        .services-section {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .services-section,
          .about-section,
          .resume-section,
          .skills-section,
          .portfolio-section,
          .testimonials-section,
          .blog-section,
          .contact-section,
          .marquee-section {
            margin-bottom: 3rem;
          }
          .container {
            padding: 0 1.5rem;
          }
        }

        /* ---------- HERO SECTION ---------- */
        .hero-section {
          padding-top: 5rem;
          padding-bottom: 3rem;
          background-color: #f5f7f8;
        }

        .hero-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        .hero-content {
          flex: 1 1 0;
          min-width: 0;
        }

        .hero-image {
          flex: 0 0 420px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-hello-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #1e3a8a;
          margin-bottom: 0.2rem;
        }

        .hero-stroke-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(5rem, 12vw, 9rem);
          font-weight: 700;
          line-height: 0.9;
          color: transparent;
          -webkit-text-stroke: 1.5px #9ca3af;
          margin-bottom: 1.6rem;
          letter-spacing: -0.03em;
        }

        .hero-typing-line {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .hero-typing-sub {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          font-weight: 700;
          color: #131313;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .hero-typed-word {
          color: #1e3a8a;
          font-weight: 700;
        }

        .hero-cursor {
          display: inline-block;
          margin-left: 1px;
          transition: opacity 0.1s;
          color: #131313;
        }

        .hero-description {
          color: #6b7280;
          font-size: 0.88rem;
          line-height: 1.9;
          max-width: 400px;
          margin-bottom: 2.25rem;
        }

        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        /* New WhatsApp Hero Button */
        .whatsapp-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #25D366;
          color: #ffffff;
          padding: 0.9rem 2.1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.28s ease;
          text-decoration: none;
        }
        .whatsapp-hero-btn:hover {
          background-color: #1ebe5d;
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 rgba(37, 211, 102, 0.3);
        }
        .whatsapp-hero-btn svg {
          width: 1rem;
          height: 1rem;
        }

        .hero-btn-watch {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hero-play-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background-color: #131313;
          flex-shrink: 0;
          transition: background-color 0.28s ease;
        }

        .hero-btn-watch:hover .hero-play-circle {
          background-color: #1e3a8a;
        }

        .hero-play-icon {
          width: 1.1rem;
          height: 1.1rem;
          color: #ffffff;
          margin-left: 3px;
        }

        .hero-watch-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #2d2d2d;
        }

        /* ---------- PROFILE CIRCLE ---------- */
        .profile-circle-wrapper {
          position: relative;
          width: 500px;
          height: 500px;
        }

        .profile-circle-wrapper::after {
          display: none;
        }

        .profile-circle-img-wrap {
          width: 100%;
          height: 100%;
          border-radius: 51% 49% 77% 23% / 65% 50% 50% 35%;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .profile-circle-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        @media (max-width: 900px) {
          .hero-grid {
            flex-direction: column-reverse;
            gap: 2.5rem;
          }
          .hero-image {
            flex: none;
          }
          .profile-circle-wrapper {
            width: 380px;
            height: 380px;
          }
          .hero-stroke-name {
            font-size: clamp(4rem, 14vw, 6rem);
          }
        }

        @media (max-width: 640px) {
          .profile-circle-wrapper {
            width: 290px;
            height: 290px;
          }
          .profile-circle-wrapper::after {
            display: none;
          }
        }

        /* ---------- SERVICES SECTION ---------- */
        .services-section {
          background-color: #f5f7f8;
          padding: 1rem 0;
          margin-bottom: 0 !important;
        }

        .svc-header {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 1.5rem;
        }

        .svc-header-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .svc-header-label {
          flex: 0 0 auto;
          padding-top: 0.25rem;
        }

        .svc-stroke-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: transparent;
          -webkit-text-stroke: 1.5px #b0b8c8;
          white-space: nowrap;
          line-height: 1.1;
        }
          
        .svc-header-title {
          flex: 1;
        }

        .svc-big-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: #131313;
          text-transform: uppercase;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .svc-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .svc-card {
          border: 1.5px solid #2d2d2d;
          background: #ffffff;
          padding: 0.75rem 1.25rem;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .svc-card-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .svc-card:hover {
          background-color: #f9fafb;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        .svc-card-icon {
          width: 2rem;
          height: 2rem;
          margin-bottom: 0.75rem;
          color: #2d2d2d;
        }

        .svc-card-icon svg {
          width: 100%;
          height: 100%;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.3;
        }

        .svc-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .svc-card-desc {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.7;
          flex: 1;
        }

        .svc-card-link {
          display: inline-block;
          margin-top: 1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1e3a8a;
          text-decoration: none;
          border-bottom: 1.5px solid #1e3a8a;
          padding-bottom: 1px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .svc-card-link:hover { color: #0A3981; border-color: #0A3981; }

        /* ---------- SERVICES PAGINATION ---------- */
        .svc-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1.5px solid #e5e7eb;
        }

        .svc-pg-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1.5px solid #2d2d2d;
          background: #ffffff;
          color: #2d2d2d;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }
        .svc-pg-btn:hover:not(:disabled) {
          background: #131313;
          color: #ffffff;
        }
        .svc-pg-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .svc-pg-dot {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          padding: 0 0.5rem;
          border: 1.5px solid #d1d5db;
          background: #ffffff;
          color: #6b7280;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .svc-pg-dot:hover {
          border-color: #2d2d2d;
          color: #131313;
        }
        .svc-pg-dot-active {
          background: #131313;
          border-color: #131313;
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .svc-header {
            gap: 2rem;
          }
          .svc-big-title {
            font-size: clamp(2rem, 5vw, 3rem);
          }
        }

        @media (max-width: 768px) {
          .svc-cards-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .svc-header {
            flex-direction: column;
            gap: 1rem;
          }
        }

        /* ---------- ABOUT SECTION ---------- */
        .about-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .about-header {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .about-header-label {
          flex: 0 0 auto;
          padding-top: 0.25rem;
        }

        .about-stroke-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: transparent;
          -webkit-text-stroke: 1.5px #b0b8c8;
          white-space: nowrap;
          line-height: 1.1;
        }

        .about-header-title {
          flex: 1;
        }

        .about-big-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #131313;
          text-transform: uppercase;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .about-content-row {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .about-img-col {
          flex: 0 0 360px;
        }

        /* About profile circle — same as hero */
        .about-circle-wrapper {
          position: relative;
          width: 420px;
          height: 420px;
        }

        .about-circle-wrapper::after {
          display: none;
        }

        .about-circle-img-wrap {
          width: 100%;
          height: 100%;
          border-radius: 51% 49% 77% 23% / 65% 50% 50% 35%;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .about-circle-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .about-text-col {
          flex: 1;
          min-width: 0;
        }

        .about-description {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem;
          line-height: 1.85;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        .about-checklist {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1.5rem;
          margin-bottom: 2.5rem;
        }

        .about-check-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0;
        }

        .about-check-icon {
          display: inline-flex;
          flex-shrink: 0;
          color: #1e3a8a;
        }

        .about-check-icon svg {
          width: 0.9rem;
          height: 0.9rem;
          stroke-width: 2.5;
        }

        .about-check-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #2d2d2d;
          letter-spacing: 0.01em;
        }

        .about-resume-btn {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #1e3a8a;
          color: #ffffff;
          padding: 0.9rem 2.1rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.28s ease;
          display: inline-block;
        }

        .about-resume-btn:hover {
          background-color: #1e40af;
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 rgba(30, 58, 138, 0.25);
        }

        @media (max-width: 900px) {
          .about-content-row {
            flex-direction: column;
            gap: 2.5rem;
          }
          .about-img-col {
            flex: none;
          }
          .about-circle-wrapper {
            width: 320px;
            height: 320px;
          }
          .about-header {
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .about-circle-wrapper {
            width: 260px;
            height: 260px;
          }
          .about-circle-outline {
            display: none;
          }
          .about-checklist {
            grid-template-columns: 1fr;
          }
          .about-header {
            flex-direction: column;
            gap: 1rem;
          }
        }

        /* ---------- MARQUEE ---------- */
        .marquee-section {
          background-color: #0A3981;
          color: white;
          padding: 1.5rem 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-track {
          display: inline-flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          animation: marquee 30s linear infinite;
        }

        .marquee-text {
          display: inline-flex;
          align-items: center;
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0 1rem;
          white-space: nowrap;
        }

        .marquee-star {
          margin-left: 2rem;
          font-size: 2rem;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .marquee-text {
            font-size: 1.5rem;
          }
        }

        /* ---------- TIMELINE (EDUCATION) ---------- */
        .resume-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .edu-title-wrap {
          text-align: left;
          margin-bottom: 5rem;
          overflow: hidden;
        }

        .edu-title-row {
          display: flex;
          align-items: center;
          line-height: 1;
          justify-content: center;
        }

        .edu-title-row-1 {
          gap: 1.5rem;
        }

        .edu-title-line {
          height: 2px;
          background-color: #2d2d2d;
          width: 120px;
          flex-shrink: 0;
        }

        .edu-title-main {
          margin: 0;
          line-height: 1;
        }

        .edu-title-solid {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 800;
          text-transform: uppercase;
          color: #131313;
          letter-spacing: -0.02em;
          line-height: 1.1;
          display: inline-block;
        }

        .edu-title-stroke {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 800;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 2.5px #9ca3af;
          letter-spacing: -0.02em;
          line-height: 1.1;
          display: inline-block;
        }

        .edu-title-row-2 {
          gap: 0.5rem;
        }

        .edu-title-row-3 {
          gap: 1.5rem;
        }

        .edu-timeline {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
        }

        .edu-timeline-line {
          position: absolute;
          left: 50%;
          width: 1px;
          background: #d1d5db;
          top: 0;
          bottom: 0;
          transform: translateX(-50%);
        }

        .edu-item {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 4rem;
          position: relative;
        }

        .edu-item-left {
          flex: 1;
          text-align: right;
          padding-right: 2.5rem;
        }

        .edu-item-dot {
          width: 10px;
          height: 10px;
          background: #1e3a8a;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.4rem;
          position: relative;
          z-index: 2;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px #1e3a8a;
        }

        .edu-item-right {
          flex: 1;
          text-align: left;
          padding-left: 2.5rem;
        }

        .edu-item-reverse .edu-item-left {
          text-align: left;
          padding-right: 0;
          padding-left: 2.5rem;
          order: 3;
        }

        .edu-item-reverse .edu-item-right {
          text-align: right;
          padding-left: 0;
          padding-right: 2.5rem;
          order: 1;
        }

        .edu-item-reverse .edu-item-dot {
          order: 2;
        }

        .edu-item-icon {
          width: 2.25rem;
          height: 2.25rem;
          margin-bottom: 0.6rem;
          display: inline-block;
        }

        .edu-item-icon svg {
          width: 100%;
          height: 100%;
          fill: #131313;
        }

        .edu-item-company {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.2rem;
          letter-spacing: 0.01em;
        }

        .edu-item-date {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 400;
        }

        .edu-item-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.5rem;
          letter-spacing: 0.01em;
        }

        .edu-item-desc {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 280px;
        }

        .edu-item-left .edu-item-desc {
          margin-left: auto;
        }

        .edu-item-reverse .edu-item-right .edu-item-desc {
          margin-left: auto;
          margin-right: 0;
        }

        @media (max-width: 768px) {
          .edu-timeline-line {
            left: 1rem;
          }
          .edu-item {
            flex-direction: column;
            padding-left: 2.5rem;
          }
          .edu-item-left,
          .edu-item-right,
          .edu-item-reverse .edu-item-left,
          .edu-item-reverse .edu-item-right {
            text-align: left !important;
            padding: 0 !important;
            order: unset !important;
          }
          .edu-item-dot {
            position: absolute;
            left: 0.3rem;
            top: 0.4rem;
          }
          .edu-item-reverse .edu-item-dot {
            order: unset;
          }
          .edu-title-line {
            max-width: 60px;
          }
          .edu-item-desc {
            max-width: 100%;
            margin: 0 !important;
          }
        }

        /* ---------- SKILLS ---------- */
        .skills-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .skill-layout {
          display: flex;
          align-items: center;
          gap: 5rem;
        }

        .skill-label-col {
          flex: 0 0 260px;
        }

        .skill-stroke-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(6rem, 12vw, 10rem);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 2.5px #9ca3af;
          line-height: 0.95;
          letter-spacing: -0.02em;
          display: block;
        }

        .skill-bars-col {
          flex: 1;
          min-width: 0;
        }

        .skill-item {
          margin-bottom: 2.5rem;
        }

        .skill-item:last-child {
          margin-bottom: 0;
        }

        .skill-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 1rem;
          display: block;
        }

        .skill-track {
          height: 7px;
          background: #e5e7eb;
          position: relative;
          overflow: visible;
        }

        .skill-bar {
          height: 100%;
          background: #131313;
          width: 0%;
          position: relative;
        }

        .skill-bar-animate {
          animation: skillBarGrow 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes skillBarGrow {
          from { width: 0%; }
          to   { width: var(--skill-width); }
        }

        .skill-badge {
          position: absolute;
          right: 0;
          bottom: calc(100% + 6px);
          background: #1e3a8a;
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 7px;
          transform: translateX(50%);
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        .skill-badge::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #1e3a8a;
        }

        @media (max-width: 900px) {
          .skill-layout {
            gap: 3rem;
          }
          .skill-label-col {
            flex: 0 0 200px;
          }
        }

        @media (max-width: 768px) {
          .skill-layout {
            flex-direction: column;
            gap: 2rem;
          }
          .skill-label-col {
            flex: none;
          }
        }

        /* ---------- PORTFOLIO ---------- */
        .portfolio-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .port-header {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .port-stroke-label {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 500;
          color: transparent;
          -webkit-text-stroke: 1px #2d2d2d;
          white-space: nowrap;
        }

        .port-big-title {
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .port-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .port-img-wrap {
          position: relative;
          overflow: hidden;
        }

        .port-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .port-item:hover .port-img {
          transform: scale(1.05);
        }

        .port-overlay {
          position: absolute;
          inset: 0;
          background: rgba(248, 250, 251, 0.95);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .port-item:hover .port-overlay {
          opacity: 1;
        }

        .port-overlay-cat {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6b7280;
        }

        .port-overlay-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .port-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ---------- TESTIMONIALS ---------- */
        .testimonials-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .testi-header {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .testi-header-label {
          flex: 0 0 auto;
          padding-top: 0.25rem;
        }

        .testi-stroke-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1.5px #b0b8c8;
          white-space: nowrap;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .testi-header-title {
          flex: 1;
        }

        .testi-big-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #131313;
          text-transform: uppercase;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .testi-slider-wrap {
          overflow: hidden;
          margin-bottom: 2.5rem;
          padding-top: 3rem;
        }

        .testi-slider-track {
          display: flex;
          gap: 2rem;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testi-card {
          flex: 0 0 calc(50% - 1rem);
          border: 1px solid #e5e7eb;
          padding: 2rem;
          text-align: left;
          position: relative;
          background: #ffffff;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .testi-stars {
          display: flex;
          gap: 2px;
          align-items: center;
        }

        .testi-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          color: #374151;
          line-height: 1.8;
          flex: 1;
          font-style: italic;
        }

        .testi-client-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }

        .testi-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid #e5e7eb;
        }

        .testi-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #131313;
          margin: 0 0 0.15rem;
          letter-spacing: 0.01em;
        }

        .testi-position {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0.01em;
        }

        .testi-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .testi-arrows {
          display: flex;
          gap: 0.5rem;
        }

        .testi-arrow-btn {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #d1d5db;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .testi-arrow-btn:hover {
          border-color: #1e3a8a;
          color: #1e3a8a;
        }

        .testi-arrow-btn svg {
          width: 1rem;
          height: 1rem;
        }

        .testi-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .testi-dot {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 50%;
          background: #d1d5db;
          cursor: pointer;
          border: none;
          padding: 0;
          transition: all 0.2s ease;
        }

        .testi-dot-active {
          background: #1e3a8a;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .testi-card {
            flex: 0 0 calc(100% - 0rem);
          }
          .testi-header {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .testi-card {
            flex: 0 0 calc(100% - 1rem);
          }
        }

        /* ---------- CLIENTS / TRUSTED BY ---------- */
        .clients-section {
          background: #fff;
          padding: 2.5rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }
        .clients-label {
          text-align: center;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 1.5rem;
          font-family: 'Space Grotesk', sans-serif;
        }
        .clients-logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .client-logo-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.1rem;
          background: #f8fafb;
          border: 1.5px solid #e5e7eb;
          border-radius: 50px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .client-logo-pill:hover {
          border-color: #1e3a8a;
          background: #eff6ff;
          transform: translateY(-2px);
        }
        .client-logo-abbr {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #1e3a8a;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          border-radius: 4px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .client-logo-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #374151;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.02em;
        }
        .client-logo-pill:hover .client-logo-name { color: #1e3a8a; }

        /* ---------- BLOG ---------- */
        .blog-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .blog-header {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .blog-header-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-header-label {
          flex: 0 0 auto;
          padding-top: 0.25rem;
          position: relative;
        }

        .blog-stroke-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: transparent;
          -webkit-text-stroke: 1.5px #b0b8c8;
          white-space: nowrap;
          line-height: 1.1;
          display: block;
        }

        .blog-label-dot {
          display: block;
          width: 8px;
          height: 8px;
          background-color: #131313;
          border-radius: 50%;
          margin-top: 1rem;
          margin-left: 0.5rem;
        }

        .blog-header-title {
          flex: 1;
        }

        .blog-big-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #131313;
          text-transform: uppercase;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .blog-card {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          transition: box-shadow 0.3s ease;
        }

        .blog-card-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        .blog-img-wrap {
          overflow: hidden;
          height: 200px;
        }

        .blog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }

        .blog-card-body {
          padding: 1.5rem 1.25rem 1.25rem;
        }

        .blog-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        .blog-card-excerpt {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .blog-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #f3f4f6;
        }

        .blog-card-author-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog-card-avatar {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          overflow: hidden;
        }

        .blog-card-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-card-author {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: #2d2d2d;
        }

        .blog-card-date {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          color: #9ca3af;
        }

        @media (max-width: 900px) {
          .blog-header {
            gap: 2rem;
          }
          .blog-big-title {
            font-size: clamp(2rem, 5vw, 3rem);
          }
        }

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .blog-header {
            flex-direction: column;
            gap: 1rem;
          }
        }

        /* ---------- CONTACT ---------- */
        .contact-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
        }

        .contact-layout {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .contact-left {
          flex: 1;
          min-width: 280px;
        }

        .contact-right {
          flex: 1;
          min-width: 280px;
        }

        .contact-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          line-height: 1.1;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .contact-title-indent {
          display: inline-block;
          padding-left: 1.5rem;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-item-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .contact-icon-circle {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: #1a3a6b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon-circle {
          transform: scale(1.1);
          background: #0A3981;
        }

        .contact-icon-circle svg {
          width: 1.2rem;
          height: 1.2rem;
          fill: white;
        }

        .contact-item-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-item-value {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-field-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          border: none;
          border-bottom: 1px solid #d1d5db;
          padding: 0.5rem 0;
          font-size: 0.9rem;
          background: transparent;
          outline: none;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-bottom-color: #131313;
        }

        .contact-textarea {
          resize: none;
        }

        .contact-submit-btn {
          background: #1a3a6b;
          color: white;
          padding: 0.85rem 2rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          width: fit-content;
          transition: all 0.3s ease;
        }

        .contact-submit-btn:hover {
          background: #0A3981;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 rgba(10, 57, 129, 0.2);
        }

        .whatsapp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #25D366;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .whatsapp-cta-btn:hover {
          background: #1ebe5d;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 rgba(37, 211, 102, 0.25);
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.8rem 2rem;
          background: transparent;
          color: #1e3a8a;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 2px solid #1e3a8a;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .view-all-btn:hover {
          background: #1e3a8a;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 rgba(30, 58, 138, 0.2);
        }

        /* ---------- KEYWORDS & SERVICES SECTIONS ---------- */
        .keywords-section {
          background: #f5f7f8;
          padding: 0.25rem 0;
        }

        .keywords-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .keywords-grid-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .keywords-content {
          background: #ffffff;
          border-radius: 1.5rem;
          padding: 1rem 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          max-height: 160px;
          display: flex;
          flex-direction: column;
        }

        .keywords-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #6b7280;
          margin: 0 0 0.5rem 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .keywords-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          overflow-y: scroll;
          flex: 1;
          overscroll-behavior: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .keywords-chips::-webkit-scrollbar {
          display: none;
        }

        .keyword-chip {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #1f2937;
          background: rgba(30, 58, 138, 0.08);
          border: 1px solid rgba(30, 58, 138, 0.15);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          transition: all 0.25s ease;
        }

        .keyword-chip:hover {
          background: rgba(30, 58, 138, 0.12);
          border-color: rgba(30, 58, 138, 0.25);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .keywords-grid-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .keywords-section {
            padding: 1.5rem 0;
          }

          .keywords-container {
            padding: 0 1rem;
          }

          .keywords-content {
            padding: 1rem 1.25rem;
            border-radius: 1.5rem;
            max-height: 160px;
          }

          .keyword-chip {
            font-size: 0.85rem;
            padding: 0.6rem 1rem;
          }
        }

        /* ---------- VIDEO MODAL ---------- */
        .video-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeInOverlay 0.25s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .video-modal-box {
          position: relative;
          width: 100%;
          max-width: 900px;
          animation: scaleInModal 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes scaleInModal {
          from { transform: scale(0.88); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        .video-modal-close {
          position: absolute;
          top: -2.75rem;
          right: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #ffffff;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .video-modal-close:hover {
          transform: rotate(90deg);
          color: #e5e7eb;
        }

        .video-modal-close svg {
          width: 1.75rem;
          height: 1.75rem;
        }

        .video-modal-iframe-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 */
          background: #000;
        }

        .video-modal-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>
    </main>
  );
}