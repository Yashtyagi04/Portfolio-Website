import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: "fa-solid fa-terminal",
      skills: ["C++", "Python", "JavaScript (ES6+)", "HTML5", "CSS3"]
    },
    {
      title: "Web & Backend",
      icon: "fa-solid fa-server",
      skills: ["Node.js", "Express.js", "MongoDB", "EJS", "DBMS / SQL"]
    },
    {
      title: "Computer Science",
      icon: "fa-solid fa-brain",
      skills: ["Data Structures & Algorithms", "OOPs", "Software Engineering", "Problem Solving"]
    },
    {
      title: "AI/ML & Tools",
      icon: "fa-solid fa-screwdriver-wrench",
      skills: ["Machine Learning", "Natural Language Processing", "Git & GitHub", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <div className="section-header text-center animate-on-scroll appear">
          <span className="section-tagline">My Skillset</span>
          <h2 className="section-title">Technologies & Tools</h2>
          <div className="header-line"></div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-category-card glass animate-on-scroll appear">
              <div className="card-glow"></div>
              <div className="category-header">
                <i className={`${category.icon} category-icon`}></i>
                <h3>{category.title}</h3>
              </div>
              <div className="tags-container">
                {category.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
