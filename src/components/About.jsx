import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header text-center animate-on-scroll appear">
          <span className="section-tagline">About Me</span>
          <h2 className="section-title">Who is <span className="text-gradient">Yash Tyagi</span>?</h2>
          <div className="header-line"></div>
        </div>
        <div className="about-grid animate-on-scroll appear">
          <div className="about-info card glass">
            <div className="card-glow"></div>
            <p className="about-text">
              I am currently pursuing a <strong>Bachelor of Technology in Computer Science & Engineering (AIML)</strong> at <strong>Manipal University Jaipur</strong>. I possess a deep interest in software engineering, full-stack web development, and artificial intelligence.
            </p>
            <p className="about-text">
              I enjoy building real-world projects that solve actual problems. With solid foundations in Data Structures & Algorithms, Object-Oriented Programming, and database management, I aim to create robust backend architectures combined with clean, interactive user interfaces.
            </p>
            <div className="personal-details-grid">
              <div className="detail-item">
                <span className="detail-label"><i className="fa-solid fa-location-dot"></i> Location</span>
                <span className="detail-value">Hapur, Uttar Pradesh, India</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fa-solid fa-graduation-cap"></i> Education</span>
                <span className="detail-value">B.Tech CSE (AIML)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fa-solid fa-envelope"></i> Email</span>
                <span className="detail-value">
                  <a href="mailto:tyagiyash920@gmail.com" className="link-hover">tyagiyash920@gmail.com</a>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fa-solid fa-award"></i> Distinction</span>
                <span className="detail-value">Dean's List Recipient</span>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-card glass animate-on-scroll appear">
              <div className="card-glow"></div>
              <div className="stat-icon"><i className="fa-solid fa-code"></i></div>
              <h3 className="stat-number">3+</h3>
              <p className="stat-label">Full Stack Projects</p>
            </div>
            <div className="stat-card glass animate-on-scroll appear">
              <div className="card-glow"></div>
              <div className="stat-icon"><i className="fa-solid fa-star"></i></div>
              <h3 className="stat-number">8.07</h3>
              <p className="stat-label">CGPA B.Tech</p>
            </div>
            <div className="stat-card glass animate-on-scroll appear">
              <div className="card-glow"></div>
              <div className="stat-icon"><i className="fa-solid fa-certificate"></i></div>
              <h3 className="stat-number">6+</h3>
              <p className="stat-label">Certifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
