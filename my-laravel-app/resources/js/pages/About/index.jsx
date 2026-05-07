import { useRef, useEffect, useState } from 'react'
import { Link } from '@inertiajs/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'

const SKILLS = [
  { label: 'HTML',       pct: 85 },
  { label: 'CSS',        pct: 90 },
  { label: 'JAVASCRIPT', pct: 85 },
  { label: 'FIGMA',      pct: 80 },
]

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO',
    image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg',
    text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results",
  },
  {
    id: 2,
    name: 'Jane Doe',
    position: 'Marketing Director',
    image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-2.jpg',
    text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results",
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'Business Owner',
    image: 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-3.jpg',
    text: "Thanks to Web Designer, we've seen a significant increase in traffic and engagement on our site, ultimately leading to a boost in sales. We couldn't be happier with the results",
  },
]

export default function AboutPage() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS)

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
  }, [])

  // Fetch testimonials from API
  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data) })
      .catch(() => {})
  }, [])

  const nameParts = 'Nikhil Sharma'.trim().split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ') || ''

  return (
    <div className="ap-root">

      {/* ══════════════════════════════════════
          SECTION 1 — ABOUT HERO
      ══════════════════════════════════════ */}
      <section className="ap-hero-section">
        <div className="ap-container">
          <div className="ap-hero-row">

            {/* Left — text */}
            <div className="ap-hero-text">
              <h2
                className="ap-about-label"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                About Me
              </h2>

              <h1
                className="ap-hero-name"
                data-aos="zoom-out-down"
                data-aos-duration="900"
                data-aos-delay="100"
              >
                {firstName}
                {lastName && <><br />{lastName}</>}
              </h1>

              <h3
                className="ap-hero-role"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                Web Developer
              </h3>

              <p
                className="ap-hero-desc"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
              >
               I am a Jaipur Rajasthan-based Full Stack Developer & Database architect with a focus on Software Development, Web Application, Mobile Application development. I am passionate about building excellent software that improves the lives of those around me.I have a diverse range of experience having worked across various fields and industries. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations. What would you do if you had a software expert available at your fingertips? I love helping pepole to build Awesome Application.
              </p>

              <p
                className="ap-hero-desc ap-hero-desc--muted"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                With a deep understanding of both design and development, I specialize
                in creating seamless online experiences that resonate with users.
              </p>
            </div>

            {/* Right — profile image */}
            <div
              className="ap-hero-img-wrap"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="ap-img-circle-bg" />
              <div className="ap-img-blob">
                <img
                  src="https://www.thenikhilsharma.in/public/front/design/images/slider/nikhil_sharma.jpg"
                  alt="Profile"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — SKILLS 
      ══════════════════════════════════════ */}
      <section className="ap-skills-section">
        <div className="ap-container">
          <div className="ap-skills-row">

            {/* Left — headline */}
            <div className="ap-skills-left">
              <h2
                className="ap-skills-heading"
                data-aos="fade-upteri"
                data-aos-duration="800"
              >
                Expertly Crafted Websites Designed to Inspire and Impress.
              </h2>

              <p
                className="ap-skills-desc"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                Over the years, I have honed my skills in web technologies like HTML,
                CSS, JavaScript, React, and WordPress. My expertise spans across
                front-end and back-end development.
              </p>

              <div 
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <Link href="/contact" className="ap-btn-primary">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right — progress bars */}
            <div className="ap-skills-right">
              {SKILLS.map((skill, idx) => (
                <div 
                  key={skill.labele}
                  className="skill-progress-item"
                  data-aos="fade-up"
                  data-aos-duration="700"
                  data-aos-delay={idx * 100}
                >
                  <h6 className="title">{skill.label}</h6>
                  <div className="progress" role="progressbar" aria-label={skill.label}>
                    <div
                      className="progress-bar ap-bar-animate"
                      style={{
                        '--bar-width': `${skill.pct}%`,
                        animationDelay: `${0.3 + idx * 0.15}s`,
                      }}
                    >
                      <span>{skill.pct}%</span>
                    </div> 
                  </div>  
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="ap-testimonials-section">
        <div className="ap-container">
          <div className="ap-testimonials-row">

            {/* Left — heading */}
            <div className="ap-testimonials-left">
              <h2
                className="ap-about-label"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                Testimonials
              </h2>
              <h2
                className="ap-testimonials-heading"
                data-aos="zoom-out-down"
                data-aos-duration="900"
                data-aos-delay="100"
              >
               How Order Processing Drives Logistics Efficiency and client Satisfaction <br />
              </h2>
            </div>

            {/* Right — swiper */}
            <div className="ap-testimonials-right">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={42}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={1500}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current
                  swiper.params.navigation.nextEl = nextRef.current
                  swiper.navigation.init()
                  swiper.navigation.update()
                }}
              >
                {testimonials.map((t) => ( 
                  <SwiperSlide key={t.id}>
                    <div className="testimonial-item">
                      <div className="testimonial-item__client-img">
                        <img src={t.image} alt={t.name} />
                      </div>
                      <div className="ap-testi-body">
                        <div className="ap-testi-meta">
                          <div className="testimonial-item__client-name">{t.name}</div>
                          <div className="testimonial-item__client-occ">{t.position}</div>
                        </div>
                        <blockquote className="testimonial-item__text">
                          <p>"{t.text}"</p>
                        </blockquote>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Nav buttons */}
              <div className="ap-slider-nav-row">
                <div className="ap-slider-nav">
                  <button ref={prevRef} className="ap-nav-btn" aria-label="Previous">
                    ‹
                  </button>
                  <button ref={nextRef} className="ap-nav-btn" aria-label="Next">
                    ›
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
