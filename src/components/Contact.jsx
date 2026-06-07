import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });

    const newErrors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err === true);

    if (!hasErrors) {
      setIsSending(true);

      // Simulate API delay
      setTimeout(() => {
        setIsSending(false);
        setStatusMsg({
          text: 'Message sent successfully! Thank you for reaching out.',
          type: 'success'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    } else {
      setStatusMsg({
        text: 'Please correct the errors in the highlighted fields.',
        type: 'error'
      });
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-header text-center animate-on-scroll appear">
          <span className="section-tagline">Get in Touch</span>
          <h2 className="section-title">
            Let's Create Something <span className="text-gradient">Great</span>
          </h2>
          <div className="header-line"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Cards */}
          <div className="contact-info-cards animate-on-scroll appear">
            <div className="info-card glass">
              <div className="info-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="info-details">
                <h3>Email Me</h3>
                <p>
                  <a href="mailto:tyagiyash920@gmail.com" className="link-hover">
                    tyagiyash920@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="info-card glass">
              <div className="info-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="info-details">
                <h3>Call Me</h3>
                <p>
                  <a href="tel:+918057140301" className="link-hover">
                    +91 8057140301
                  </a>
                </p>
              </div>
            </div>
            <div className="info-card glass">
              <div className="info-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Hapur, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container glass animate-on-scroll appear">
            <div className="card-glow"></div>
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.name ? 'error' : ''}`}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                  <span className="error-msg" id="name-error">
                    Name is required
                  </span>
                </div>
                <div className={`form-group ${errors.email ? 'error' : ''}`}>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                  <span className="error-msg" id="email-error">
                    Please enter a valid email
                  </span>
                </div>
              </div>
              <div className={`form-group ${errors.subject ? 'error' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Job Opportunity / Collab"
                />
                <span className="error-msg" id="subject-error">
                  Subject is required
                </span>
              </div>
              <div className={`form-group ${errors.message ? 'error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Let's build something amazing together..."
                ></textarea>
                <span className="error-msg" id="message-error">
                  Message content is required
                </span>
              </div>
              <button type="submit" className="btn btn-primary btn-block" id="form-submit-btn" disabled={isSending}>
                {isSending ? (
                  <>
                    Sending... <i className="fa-solid fa-circle-notch fa-spin icon-right"></i>
                  </>
                ) : (
                  <>
                    Send Message <i className="fa-solid fa-paper-plane icon-right"></i>
                  </>
                )}
              </button>
              {statusMsg.text && (
                <div className={`form-status ${statusMsg.type === 'success' ? 'success' : 'error'}`}>
                  {statusMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
