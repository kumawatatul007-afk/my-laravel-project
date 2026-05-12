import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../../components/SEO';

export default function DashboardPage () {
  const [totalPosts] = useState(0);

  // Blog posts from database
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setBlogPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  // Portfolio items from database
  const [portfolios, setPortfolios] = useState([]);
  useEffect(() => {
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
  }, []);

  // Testimonials from database
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Alice Watson', position: 'Business Owner', text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg' },
    { id: 2, name: 'Peter Braun', position: 'Business Owner', text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-2.jpg' },
    { id: 3, name: 'Sarah Miller', position: 'Marketing Director', text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results", image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-3.jpg' },
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

  // Sample data for various sections (replace with real data from your backend)
  const services = [
    { id: 1, title: 'Web Development', icon: 'M19.5,1H4.5C2.019,1,0,3.019,0,5.5V14.5c0,2.481,2.019,4.5,4.5,4.5h7v3H7c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h10c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-4.5v-3h7c2.481,0,4.5-2.019,4.5-4.5V5.5c0-2.481-2.019-4.5-4.5-4.5Zm3.5,13.5c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V5.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5V14.5Zm-4.732-6.266c.975,.975,.975,2.562,0,3.536l-3.083,3.083c-.098,.098-.226,.146-.354,.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.083-3.083c.585-.585,.585-1.537,0-2.122l-3.088-3.088c-.195-.195-.195-.512,0-.707s.512-.195,.707,0l3.088,3.088Zm-11.828,.707c-.585,.585-.585,1.537,0,2.122l3.083,3.083c.195,.195,.195,.512,0,.707-.098,.098-.226,.146-.354,.146s-.256-.049-.354-.146l-3.083-3.083c-.975-.975-.975-2.562,0-3.536l3.088-3.088c.195-.195,.512-.195,.707,0s.195,.512,0,.707l-3.088,3.088Z', description: 'Creating and maintaining websites, involving tasks like coding, designing, and build functionality.' },
    { id: 2, title: 'App Development', icon: 'M16.5,0H7.5C5.019,0,3,2.019,3,4.5v15c0,2.481,2.019,4.5,4.5,4.5h9c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5Zm3.5,19.5c0,1.93-1.57,3.5-3.5,3.5H7.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h9c1.93,0,3.5,1.57,3.5,3.5v15Zm-6,1c0,.276-.224.5-.5.5h-3c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3c.276,0,.5.224.5.5Z', description: 'Creating and maintaining websites, involving tasks like coding, designing, and build functionality.' },
    { id: 3, title: 'UI/UX Design', icon: 'M24,8.5v7c0,2.481-2.019,4.5-4.5,4.5h-7v3h3.5c.276,0,.5.224.5.5s-.224.5-.5.5h-8c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3.5v-3h-7c-2.481,0-4.5-2.019-4.5-4.5V6.5C0,4.019,2.019,2,4.5,2h10c.276,0,.5.224.5.5s-.224.5-.5.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v9c0,1.93,1.57,3.5,3.5,3.5h15c1.93,0,3.5-1.57,3.5-3.5v-7c0-.276.224-.5.5-.5s.5.224.5.5Zm-12.758,1.529C19.095.891,19.129.855,19.146.838c1.119-1.116,2.937-1.116,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.221,8.826c-.048.796-.348,1.545-.897,2.145-.661.723-1.603,1.138-2.582,1.138h-4c-.485,0-.928-.224-1.214-.612-.287-.39-.369-.879-.225-1.343.5-1.61,2.039-4.469,4.632-4.97.182-.035.366-.039.549-.046Zm1.19.15c.421.126.826.311,1.186.581.578.436.986,1.011,1.202,1.658l2.065-2.216c-.328-1.184-1.369-2.066-2.596-2.184-.655.763-1.291,1.502-1.857,2.161Zm1.557,3.09c-.06-.674-.405-1.281-.974-1.71-.613-.463-1.391-.647-2.133-.502-2.13.411-3.433,2.886-3.867,4.284-.049.157-.021.322.075.453.096.13.246.205.409.205h4c.7,0,1.372-.296,1.845-.812.479-.523.708-1.205.645-1.918Zm1.05-6.124c1.156.316,2.12,1.143,2.61,2.237l4.829-5.184c.737-.74.737-1.924.012-2.652-.727-.727-1.91-.728-2.637,0-.069.079-2.444,2.842-4.814,5.6Z', description: 'Creating and maintaining websites, involving tasks like coding, designing, and build functionality.' }
  ];

  const keywordHighlights = [
    'Best Software Developer in Jaipur',
    'Best Software Developer in Kalwar Road',
    'Best Software Developer in Jagatpura',
    'Best Software Developer in Civil Lines',
  ];

  const serviceHighlights = [
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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.1 }
    );
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
      // Page refresh ke baad agar section already viewport mein ho
      const rect = skillsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setSkillsVisible(true);
      }
    }
    return () => observer.disconnect();
  }, []);

  // Services section animation
  const [svcVisible, setSvcVisible] = useState(false);
  const svcRef = useRef(null);

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
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 800;
            font-size: clamp(3rem, 10vw, 7rem);
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #f8fafc;
            display: flex;
            gap: 0.05em;
          }
          .mora-preloader__brand span {
            display: inline-block;
            opacity: 0;
            transform: translateY(60px);
            animation: pl-letter-in 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards;
          }
          .mora-preloader__brand span:nth-child(1) { animation-delay: 0.1s; }
          .mora-preloader__brand span:nth-child(2) { animation-delay: 0.2s; }
          .mora-preloader__brand span:nth-child(3) { animation-delay: 0.3s; }
          .mora-preloader__brand span:nth-child(4) { animation-delay: 0.4s; }
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
              <span>M</span><span>O</span><span>R</span><span>A</span>
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
    <div className="dashboard-container">
      <SEO
        title="Nikhil Sharma | Full Stack Developer & UI/UX Designer in Jaipur"
        description="Nikhil Sharma — Freelance Full Stack Developer & UI/UX Designer in Jaipur, India. 8+ years of experience building web apps, mobile apps, and digital experiences."
        keywords="Full Stack Developer Jaipur, Web Developer Jaipur, React Developer India, Laravel Developer, UI UX Designer Jaipur, Nikhil Sharma"
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
                  I am a{' '}
                  <span className="hero-typed-word">
                    {typedText}
                    <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                  </span>
                </h2>
              </div>
              <p className="hero-description" data-aos="zoom-out" data-aos-delay="300" data-aos-duration="1000">
              Hi, my name is Nikhil Sharma . I'm freelancer in India and throughout the Middle East. Over the past few years I have helped many small business owners in achieveing a presence online by developing quality websites and implementing successful online marketing strategies. I am an expert on helping start-up business and entrepreneurs who want an online presence with a simple, clean & effective websites but dont want to pay the high fees to larger web design corporations are charging. I believe in providing authentic and quality web development services at an affordable margin so that even small businesses can digitalize their services. I'm also a Full Stack Developer with over 8 Years of Exprience in IT              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                <button className="hero-btn-cv">
                  DOWNLOAD CV
                  <svg className="hero-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4v-2h14v2H5z"/>
                  </svg>
                </button>
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
                <div className="profile-circle-outline"></div>
                <div className="profile-circle-img-wrap">
                  <img
                    src="https://www.thenikhilsharma.in/public/profile/images/n2.png"
                    alt="Nikhil Sharma - Full Stack Developer in Jaipur"
                    className="profile-circle-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords and Services Highlights */}
      <section className="highlights-section" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-column">
              <p className="highlight-section-title">KEYWORD</p>
              <div className="highlight-chip-row">
                {keywordHighlights.map((label) => (
                  <span key={label} className="highlight-chip">
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="highlight-column">
              <p className="highlight-section-title">SERVICES</p>
              <div className="highlight-chip-row">
                {serviceHighlights.map((label) => (
                  <span key={label} className="highlight-chip highlight-chip--accent">
                    {label}
                  </span>
                ))}
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
                Best Hire the best Web Designers in Jaipur<br />
                <br />
              
              </h2>
            </div>
          </div>
          <div className="svc-cards-grid">
            <div className={`svc-card ${svcVisible ? 'svc-card-visible' : ''}`} style={{ transitionDelay: '0.1s' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
              <div className="svc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="2" y="3" width="20" height="14" rx="1" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polyline points="8 9 10 11 8 13" />
                  <line x1="12" y1="13" x2="15" y2="13" />
                </svg>
              </div>
              <h4 className="svc-card-title">Web Development</h4>
              <p className="svc-card-desc">Creating and maintaining websites, involving tasks like coding, designing, and build functionality.</p>
            </div>
            <div className={`svc-card ${svcVisible ? 'svc-card-visible' : ''}`} style={{ transitionDelay: '0.25s' }} data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
              <div className="svc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
                </svg>
              </div>
              <h4 className="svc-card-title">App Development</h4>
              <p className="svc-card-desc">Creating and maintaining websites, involving tasks like coding, designing, and build functionality.</p>
            </div>
            <div className={`svc-card ${svcVisible ? 'svc-card-visible' : ''}`} style={{ transitionDelay: '0.4s' }} data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <div className="svc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="3" y="3" width="14" height="18" rx="1.5" />
                  <path d="M17 7l3.5-3.5a1.5 1.5 0 0 1 2.1 2.1L19 9" />
                  <path d="M17 7l2 2" />
                  <line x1="7" y1="9" x2="13" y2="9" />
                  <line x1="7" y1="13" x2="11" y2="13" />
                </svg>
              </div>
              <h4 className="svc-card-title">UI/UX Design</h4>
              <p className="svc-card-desc">Creating and maintaining websites, involving tasks like coding, designing, and build functionality.</p>
            </div>
          </div>
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
                Nikhil Sharma<br />
                
              </h2>
            </div>
          </div>
          <div className="about-content-row">
            <div className="about-img-col" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
              <div className="about-circle-wrapper">
                <div className="about-circle-outline"></div>
                <div className="about-circle-img-wrap">
                  <img
                    src="https://www.thenikhilsharma.in/public/front/design/images/slider/nikhil_sharma.jpg"
                    alt="About"
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
              <button className="about-resume-btn">RESUME</button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="marquee-section">
        <div className="marquee-track">
          {['Web Developer', 'Designer', 'Web Developer', 'Designer', 'Web Developer', 'Designer'].map((text, idx) => (
            <span key={idx} className="marquee-text">
              {text}
              {idx % 2 === 0 && <span className="marquee-star">✦</span>}
            </span>
          ))}
        </div>
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
                      className="skill-bar"
                      style={{
                        width: skillsVisible ? `${skill.percent}%` : '0%',
                        transitionDelay: `${i * 0.15}s`,
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
              All-in-One Logistics Software: The Power of Courier Aggregator Solutions<br />
        <br />
  
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
                How Order Processing Drives Logistics Efficiency and client Satisfaction<br />
                
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
                  <div className="testi-avatar-wrap">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="testi-avatar"
                      style={{ filter: activeSlide === t.id - 1 ? 'grayscale(0%)' : 'grayscale(100%)' }}
                    />
                  </div>
                  <h4 className="testi-name">{t.name}</h4>
                  <p className="testi-position">{t.position}</p>
                  <p className="testi-text">{t.text}</p>
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

      {/* Blog Section */}
      <section className="blog-section" ref={blogRef}>
        <div className="container">
          <div className={`blog-header ${blogVisible ? 'blog-header-visible' : ''}`}>
            <div className="blog-header-label">
              <span className="blog-stroke-label">My Blog</span>
              <span className="blog-label-dot"></span>
            </div>
            <div className="blog-header-title">
              <h2 className="blog-big-title" data-aos="zoom-out-down" data-aos-delay="200" data-aos-duration="1000">
                Hi! beautiful people. I`m an authtor of this blog. Read our post - stay with us<br />
                
              </h2>
            </div>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
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
                  <img src={post.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'} alt={post.title} className="blog-img" />
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
                    <span className="blog-card-date">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                    </span>
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
                    <p className="contact-item-value">hello@domain.com</p>
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
                    <p className="contact-item-value">+123 445 566</p>
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
                    <p className="contact-item-value">123 Main Street New York, 10001</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-right" data-aos="zoom-out" data-aos-delay="200" data-aos-duration="1000">
              <form className="contact-form">
                <div className="contact-field">
                  <label className="contact-field-label">Name</label>
                  <input type="text" className="contact-input" placeholder="" />
                </div>
                <div className="contact-field">
                  <label className="contact-field-label">Email</label>
                  <input type="email" className="contact-input" placeholder="" />
                </div>
                <div className="contact-field">
                  <label className="contact-field-label">Message</label>
                  <textarea className="contact-textarea" rows={5} placeholder=""></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">
                  SEND MESSAGE
                </button>
              </form>
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
        .hero-btn-cv, .about-resume-btn, .contact-submit-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
        }
        .hero-btn-cv:hover, .about-resume-btn:hover, .contact-submit-btn:hover {
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

        .hero-btn-cv {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #1e3a8a;
          color: #ffffff;
          padding: 0.9rem 2.1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.28s ease;
        }

        .hero-btn-cv:hover {
          background-color: #1e40af;
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 rgba(30, 58, 138, 0.25);
        }

        .hero-btn-icon {
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
          width: 420px;
          height: 420px;
        }

        .profile-circle-outline {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid #9ca3af;
          top: 22px;
          left: 22px;
          z-index: 1;
          pointer-events: none;
        }

        .profile-circle-img-wrap {
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
            width: 320px;
            height: 320px;
          }
          .hero-stroke-name {
            font-size: clamp(4rem, 14vw, 6rem);
          }
        }

        @media (max-width: 640px) {
          .profile-circle-outline {
            display: none;
          }
          .profile-circle-wrapper {
            width: 260px;
            height: 260px;
          }
        }

        .highlights-section {
          background-color: #edf2ff;
          padding: 3rem 0 2rem;
          border-radius: 2rem;
          box-shadow: inset 0 0 0 1px rgba(30, 58, 138, 0.08);
          margin: 2rem 0 3rem;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          align-items: flex-start;
        }

        .highlight-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .highlight-section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #1e3a8a;
          margin: 0;
        }

        .highlight-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .highlight-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.15rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #111827;
          background: rgba(79, 70, 229, 0.08);
          border: 1px solid rgba(79, 70, 229, 0.14);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .highlight-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.12);
        }

        .highlight-chip--accent {
          background: #1e3a8a;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.18);
        }

        @media (max-width: 900px) {
          .highlights-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .highlights-section {
            margin: 1.5rem 0 2rem;
            padding: 2rem 0 1.5rem;
          }
          .highlight-chip {
            padding: 0.75rem 1rem;
            font-size: 0.85rem;
          }
        }

        /* ---------- SERVICES SECTION ---------- */
        .services-section {
          background-color: #f5f7f8;
          padding: 5rem 0;
          margin-bottom: 0 !important;
        }

        .svc-header {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 4rem;
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
          font-size: clamp(2rem, 4vw, 3rem);
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
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #131313;
          text-transform: uppercase;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .svc-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .svc-card {
          border: 1.5px solid #2d2d2d;
          background: #ffffff;
          padding: 2.5rem 2rem 2.5rem;
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
          width: 2.75rem;
          height: 2.75rem;
          margin-bottom: 1.5rem;
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
          font-size: 1.5rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.85rem;
          letter-spacing: -0.01em;
        }

        .svc-card-desc {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.75;
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
          width: 340px;
          height: 340px;
        }

        .about-circle-outline {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid #9ca3af;
          top: 14px;
          left: 14px;
          z-index: 1;
          pointer-events: none;
        }

        .about-circle-img-wrap {
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
            width: 260px;
            height: 260px;
          }
          .about-header {
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .about-circle-outline {
            display: none;
          }
          .about-circle-wrapper {
            width: 220px;
            height: 220px;
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
          display: inline-block;
          animation: marquee 20s linear infinite;
        }

        .marquee-text {
          display: inline-block;
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0 1rem;
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
          transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
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
          border: 1px solid #2d2d2d;
          padding: 3rem 2rem 2rem;
          text-align: center;
          position: relative;
          background: #ffffff;
        }

        .testi-avatar-wrap {
          position: absolute;
          top: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #f5f7f8;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }

        .testi-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .testi-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #131313;
          margin-bottom: 0.3rem;
          letter-spacing: 0.01em;
        }

        .testi-position {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 400;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        .testi-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.75;
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
    </div>
  );
}