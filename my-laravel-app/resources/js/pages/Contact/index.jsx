import { useRef, useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import './index.css';
import SEO from '../../components/SEO';

const ContactPage = () => {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Contact items slide-in animation (same as DashboardPage)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => reset(),
    });
  };

  return (
    <main className="contact-page-wrapper">
      <SEO 
        title="Contact Nikhil Sharma | Hire a Professional Web Developer"
        description="Get in touch with Nikhil Sharma for your next web development project. Professional services for small businesses and entrepreneurs."
        keywords="Contact Web Developer, Hire React Developer, Jaipur Software Services"
      />
      <div className="container mx-auto">
        <div className="contact-layout">

          {/* Left: Title + contact info */}
          <div className="contact-left">
            {/* Big stacked title — same as DashboardPage */}
            <h2 className="contact-title">
              LET'S<br />
              <span className="contact-title-indent">GET</span><br />
              IN TOUCH
            </h2>

            {/* Contact items with slide-in animation */}
            <div className="contact-items" ref={contactRef}>
              {/* E-Mail */}
              <div
                className={`contact-item contact-item-anim ${contactVisible ? 'contact-item-visible' : ''}`}
                style={{ transitionDelay: '0s' }}
              >
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

              {/* Phone */}
              <div
                className={`contact-item contact-item-anim ${contactVisible ? 'contact-item-visible' : ''}`}
                style={{ transitionDelay: '0.15s' }}
              >
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

              {/* Location */}
              <div
                className={`contact-item contact-item-anim ${contactVisible ? 'contact-item-visible' : ''}`}
                style={{ transitionDelay: '0.3s' }}
              >
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

          {/* Right: Form with underline-only inputs */}
          <div className="contact-right">
            {(wasSuccessful || flash?.success) && (
              <div className="contact-success">
                ✓ {flash?.success || "Message sent! I'll get back to you soon."}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label className="contact-field-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className={`contact-input${errors.name ? ' contact-input-error' : ''}`}
                  placeholder=""
                />
                {errors.name && <span className="contact-error-msg">{errors.name}</span>}
              </div>

              <div className="contact-field">
                <label className="contact-field-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className={`contact-input${errors.email ? ' contact-input-error' : ''}`}
                  placeholder=""
                />
                {errors.email && <span className="contact-error-msg">{errors.email}</span>}
              </div>

              <div className="contact-field">
                <label className="contact-field-label">Subject (Optional)</label>
                <input
                  type="text"
                  name="subject"
                  value={data.subject}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder=""
                />
              </div>

              <div className="contact-field">
                <label className="contact-field-label">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={data.message}
                  onChange={handleChange}
                  className={`contact-textarea${errors.message ? ' contact-input-error' : ''}`}
                  placeholder=""
                ></textarea>
                {errors.message && <span className="contact-error-msg">{errors.message}</span>}
              </div>

              <button type="submit" disabled={processing} className="contact-submit-btn">
                {processing ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;
