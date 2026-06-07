import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#hero" className="logo">
            <span className="text-gradient">YT</span>.
          </a>
          <p>
            Building high-quality digital solutions combining frontend polish and backend robust design.
          </p>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Yash Tyagi. All Rights Reserved. Crafted with Cyberpunk Glow.</p>
        </div>
      </div>
    </footer>
  );
}
