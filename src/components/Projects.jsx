import React, { useState } from 'react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectsData = [
    {
      title: "Smart Stay",
      category: "fullstack",
      meta: "Fullstack Web App",
      desc: "A full-stack accommodation search platform for college students and professionals to explore, list, and manage rental property listings seamlessly.",
      tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
      icon: "fa-solid fa-house-chimney",
      github: "https://github.com",
      demo: "#"
    },
    {
      title: "MujHive",
      category: "fullstack",
      meta: "Fullstack Web App",
      desc: "A dynamic event management platform designed specifically for college students to create, explore, and register for campus activities.",
      tags: ["Node.js", "Express.js", "MongoDB", "JavaScript"],
      icon: "fa-solid fa-calendar-days",
      github: "https://github.com",
      demo: "#"
    },
    {
      title: "Real Estate Website",
      category: "frontend",
      meta: "Web App / Frontend",
      desc: "A responsive property listing portal featuring detailed catalog queries and dynamic listings with a clean, smooth user interface.",
      tags: ["Node.js", "Express.js", "MongoDB", "CSS Grid"],
      icon: "fa-solid fa-building",
      github: "https://github.com",
      demo: "#"
    }
  ];

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header text-center animate-on-scroll appear">
          <span className="section-tagline">My Creations</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="header-line"></div>
        </div>

        {/* Filters */}
        <div className="project-filters animate-on-scroll appear">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'fullstack' ? 'active' : ''}`}
            onClick={() => setActiveFilter('fullstack')}
          >
            Fullstack
          </button>
          <button
            className={`filter-btn ${activeFilter === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveFilter('frontend')}
          >
            Frontend / UI
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="project-card glass animate-on-scroll appear"
              style={{
                display: 'flex',
                opacity: 1,
                transform: 'scale(1)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <div className="card-glow"></div>
              <div className="project-image-placeholder">
                <i className={`${project.icon} project-icon`}></i>
                <div className="image-overlay"></div>
              </div>
              <div className="project-info">
                <span className="project-meta">{project.meta}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="GitHub Repository"
                  >
                    <i className="fa-brands fa-github"></i> Source
                  </a>
                  <a href={project.demo} className="project-link" aria-label="Live Demo">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
