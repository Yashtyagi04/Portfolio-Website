import React, { useState, useEffect } from 'react';
import ParticleScene from './ParticleScene.jsx';

export default function Hero() {
  const roles = [
    "Computer Science Student",
    "Full-Stack Web Developer",
    "Developer focused on AI/ML",
    "Creative Problem Solver"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const activeRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (isDeleting) {
        // Delete text
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        // Type text
        setCurrentText((prev) => activeRole.substring(0, prev.length + 1));
        setTypingSpeed(100);
      }

      // If full word is typed
      if (!isDeleting && currentText === activeRole) {
        setTypingSpeed(1500); // Hold word
        setIsDeleting(true);
      }
      // If word is completely deleted
      else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(500); // Pause before next word
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="welcome-badge">
            <span className="badge-dot"></span> Available for Opportunities
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Yash Tyagi</span>
          </h1>
          <h2 className="hero-subtitle">
            I'm a <span>{currentText}</span><span className="cursor">|</span>
          </h2>
          <p className="hero-description">
            Motivated Computer Science student specializing in <strong>Artificial Intelligence & Machine Learning</strong>. Experienced in building scalable full-stack web applications and solving algorithmic problems.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <i className="fa-solid fa-arrow-right icon-right"></i>
            </a>
            <a href="#contact" className="btn btn-outline">Let's Connect</a>
          </div>
          <div className="social-links">
            <a href="mailto:tyagiyash920@gmail.com" className="social-icon" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="https://github.com/Yashtyagi04" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/tyagiyash920" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="hero-visual" style={{ minHeight: '380px', width: '100%', position: 'relative' }}>
          <div className="canvas-3d-wrapper" style={{ width: '100%', height: '380px', position: 'relative' }}>
            {/* Background Glow effects to frame the 3D Canvas */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '240px',
                height: '240px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(20, 184, 166, 0.15))',
                borderRadius: '50%',
                filter: 'blur(45px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              <ParticleScene />
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-down" aria-label="Scroll Down">
        <i className="fa-solid fa-chevron-down"></i>
      </a>
    </section>
  );
}
