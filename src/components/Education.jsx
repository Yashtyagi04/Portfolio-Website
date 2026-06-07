import React from 'react';

export default function Education() {
  const certifications = [
    {
      title: "Introduction to Machine Learning",
      org: "NPTEL Certification"
    },
    {
      title: "Programming for Everybody (Getting Started with Python)",
      org: "Python Basics certification"
    },
    {
      title: "Python Essentials 1 & 2",
      org: "Comprehensive Python foundation"
    },
    {
      title: "Introduction to NoSQL Databases",
      org: "NoSQL concepts and document architectures"
    },
    {
      title: "Learn C++",
      org: "OOPs and programming constructs"
    }
  ];

  return (
    <section id="education" className="education-section section">
      <div className="container">
        <div className="education-grid">
          {/* Left: Education & Achievements */}
          <div className="education-column animate-on-scroll appear">
            <div className="section-header">
              <span className="section-tagline">My Journey</span>
              <h2 className="section-title">Education</h2>
              <div className="header-line"></div>
            </div>

            <div className="timeline">
              <div className="timeline-item glass">
                <div className="timeline-dot"></div>
                <span className="timeline-date">2023 - 2027 (Expected)</span>
                <h3 className="timeline-title">Bachelor of Technology</h3>
                <p className="timeline-subtitle">Computer Science / AIML</p>
                <p className="timeline-org">Manipal University Jaipur - Jaipur, India</p>
                <ul className="timeline-bullets">
                  <li>Recipient of <strong>Dean's List</strong> (2nd Semester, 1st Year)</li>
                  <li>Current CGPA: <strong>8.07</strong></li>
                </ul>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="achievements-box glass mt-4" style={{ marginTop: '24px' }}>
              <div className="card-glow"></div>
              <h3 className="box-title">
                <i className="fa-solid fa-trophy text-gradient"></i> Key Highlights
              </h3>
              <ul className="achievements-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i> Solved competitive programming and DSA problems in C++
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> Strong conceptual foundation in DBMS, OOPs, and Software Engineering
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> Deep interest in Machine Learning & NLP workflows
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Certifications */}
          <div className="certs-column animate-on-scroll appear">
            <div className="section-header">
              <span className="section-tagline">Validation</span>
              <h2 className="section-title">Certifications</h2>
              <div className="header-line"></div>
            </div>

            <div className="certs-list">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-item glass">
                  <div className="cert-icon">
                    <i className="fa-solid fa-certificate"></i>
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <p>{cert.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
