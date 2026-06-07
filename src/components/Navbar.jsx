import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header class
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active link highlighting
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY;
      let current = 'hero';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (id) => {
    setIsOpen(false);
    setActiveLink(id);
  };

  // Inline styles for the burger lines when active
  const bar1Style = isOpen ? { transform: 'rotate(-45deg) translate(-5px, 6px)' } : {};
  const bar2Style = isOpen ? { opacity: 0 } : {};
  const bar3Style = isOpen ? { transform: 'rotate(45deg) translate(-5px, -6px)' } : {};

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="logo" onClick={() => closeMenu('hero')}>
          <span className="text-gradient">YT</span>.
        </a>

        <nav className={`nav-menu ${isOpen ? 'open' : ''}`} id="nav-menu">
          {['about', 'skills', 'projects', 'education', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${activeLink === item ? 'active' : ''}`}
              onClick={() => closeMenu(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-outline btn-sm" onClick={() => closeMenu('contact')}>
            Get in Touch
          </a>
          <button
            className={`nav-toggle ${isOpen ? 'active' : ''}`}
            id="nav-toggle"
            aria-label="Toggle menu"
            onClick={toggleMenu}
            style={{ display: 'flex' }}
          >
            <span className="bar" style={bar1Style}></span>
            <span className="bar" style={bar2Style}></span>
            <span className="bar" style={bar3Style}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
