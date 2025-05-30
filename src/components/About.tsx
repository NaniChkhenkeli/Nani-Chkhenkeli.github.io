import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaEnvelope, FaLinkedin, FaGithub, FaCode, FaServer, FaPalette, FaGamepad, FaHeadphones, FaFilm, FaCloud, FaDatabase, FaReact, FaNodeJs } from 'react-icons/fa';
import backgroundImage from "../components/images/1.jpg";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('profile');
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const sectionRef = useRef(null);
  const scrollTextRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    const text = 'FULL_STACK_ENGINEER';
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Handle visibility animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle scroll effects and animations
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (scrollPosition - (sectionTop - windowHeight)) / 
        (sectionHeight + windowHeight)
      ));
      
      setScrollProgress(progress);
    };

    const scrollTextAnimation = () => {
      if (scrollTextRef.current) {
        scrollTextRef.current.animate(
          [
            { transform: 'translateX(100%)' },
            { transform: 'translateX(-100%)' }
          ],
          {
            duration: 25000,
            iterations: Infinity,
            easing: 'linear'
          }
        );
      }
    };
    
    const textAnimationTimeout = setTimeout(scrollTextAnimation, 500);

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(textAnimationTimeout);
    };
  }, []);

  // Enhanced skill data with categories
  const skillCategories = {
    'FRONTEND SYSTEMS': [
      { name: "React/Next.js", experience: "2+ years", icon: <FaReact /> },
      { name: "TypeScript", experience: "2+ years", icon: <FaCode /> },
      { name: "Vue.js/Nuxt.js", experience: "2+ years", icon: <FaCode /> },
      { name: "CSS3/SCSS", experience: "2+ years", icon: <FaPalette /> },
      { name: "PHP", experience: "1+ years", icon: <FaPalette /> }
    ],
    'BACKEND SYSTEMS': [
      { name: "Node.js/Express", experience: "2+ years", icon: <FaNodeJs /> },
      { name: "Python/Django", experience: "3+ years", icon: <FaServer /> },
      { name: "GraphQL/REST APIs", experience: "2+ years", icon: <FaDatabase /> },
      { name: "PostgreSQL/MongoDB", experience: "2+ years", icon: <FaDatabase /> },
      { name: "Redis/Caching", experience: "3+ years", icon: <FaDatabase /> }
    ],
    'INFRASTRUCTURE': [
      { name: "Docker/Kubernetes", experience: "1+ years", icon: <FaCloud /> },
      { name: "AWS/Azure", experience: "1+ years", icon: <FaCloud /> },
      { name: "CI/CD Pipelines", experience: "1+ years", icon: <FaServer /> },
      { name: "Nginx/Load Balancing", experience: "1+ years", icon: <FaServer /> },
      { name: "Monitoring/Logging", experience: "2+ years", icon: <FaServer /> }
    ]
  };


  // Enhanced experience data for Junior Full Stack Developer
const experiences = [
  {
    role: "Junior Full Stack Developer",
    company: "KIU",
    period: "2023 - Present",
    achievements: [
      "Developed and maintained features for web applications using React and Node.js",
      "Collaborated with senior developers to implement RESTful APIs",
      "Assisted in database design and optimization for PostgreSQL systems",
      "Participated in code reviews and learned industry best practices",
      "Fixed bugs and improved application performance under guidance"
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Git"]
  },
  {
    role: "Frontend Developer Intern",
    company: "TechStart Inc.",
    period: "2022 - 2023",
    location: "Tbilisi, Georgia",
    achievements: [
      "Built responsive UI components using modern JavaScript frameworks",
      "Worked with designers to implement pixel-perfect interfaces",
      "Learned and applied state management solutions (Redux)",
      "Participated in daily standups and agile development processes",
      "Wrote unit tests for critical application components"
    ],
    technologies: ["JavaScript", "React", "HTML/CSS", "Redux", "Jest"]
  },
  {
    role: "Coding Bootcamp Student",
    company: "Digital Academy",
    period: "2021 - 2022",
    location: "Online",
    achievements: [
      "Completed 500+ hours of full stack development training",
      "Built 10+ projects including a full-stack e-commerce application",
      "Learned fundamentals of frontend and backend development",
      "Collaborated on team projects using Git version control",
      "Presented final project to industry professionals"
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Git"]
  }
];

  // Enhanced hobbies with more professional relevance
  const interests = [
    {
      name: "Open Source",
      icon: <FaGithub />,
      description: "Active contributor to React ecosystem projects."
    },
    {
      name: "Tech Blogging",
      icon: <FaCode />,
      description: "Write technical articles on Github."
    },
    {
      name: "Web3/Blockchain",
      icon: <FaServer />,
      description: "Exploring decentralized applications and smart contract development with Solidity."
    },
    {
      name: "AI/ML Integration",
      icon: <FaCloud />,
      description: "Implementing AI features in web applications using TensorFlow.js and OpenAI APIs."
    }
  ];

  const certifications = [
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
    "Certified Kubernetes Administrator"
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen py-16 px-4 md:px-8 lg:px-16 flex items-center"
      style={{
        fontFamily: "'JetBrains Mono', 'Consolas', monospace",
        color: "#e0e0e0",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 5px 5px, 5px 5px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
       

        {/* Enhanced tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="pixel-tab-container">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`pixel-tab ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <span className="pixel-icon">[]</span> PROFILE
            </button>
          
            <button 
              onClick={() => setActiveTab('experience')}
              className={`pixel-tab ${activeTab === 'experience' ? 'active' : ''}`}
            >
              <span className="pixel-icon">[]</span> EXPERIENCE
            </button>
            <button 
              onClick={() => setActiveTab('interests')}
              className={`pixel-tab ${activeTab === 'interests' ? 'active' : ''}`}
            >
              <span className="pixel-icon">[]</span> INTERESTS
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8">

          {/* Enhanced Profile Tab */}
{activeTab === 'profile' && (
  <div className="pixel-window">
    <div className="pixel-window-header">
      <span className="pixel-window-title">PROFILE_DATA.JSON</span>
      <div className="pixel-window-controls">
      </div>
    </div>
    <div className="pixel-content">
      <div className="pixel-json">
        <div className="pixel-json-line">
          <span className="pixel-key">"name"</span>: <span className="pixel-string">"Nani Chkhenkeli"</span>,
        </div>
        <div className="pixel-json-line">
          <span className="pixel-key">"title"</span>: <span className="pixel-string">"Full Stack Developer"</span>,
        </div>
        <div className="pixel-json-line">
          <span className="pixel-key">"experience"</span>: <span className="pixel-number">2+</span>,
        </div>
       
        <div className="pixel-json-line">
          <span className="pixel-key">"specialties"</span>: [
        </div>
        <div className="pixel-json-array">
  <div className="pixel-array-item"><span className="pixel-string">"Full Stack Web Development"</span>,</div>
  <div className="pixel-array-item"><span className="pixel-string">"High-Performance Applications"</span>,</div>
  <div className="pixel-array-item"><span className="pixel-string">"Problem Solving"</span></div>
</div>
        <div className="pixel-json-line">],</div>
        <div className="pixel-json-line">
          <span className="pixel-key">"certifications"</span>: [
        </div>
        <div className="pixel-json-array">
          <div className="pixel-array-item"><span className="pixel-string">"REST API - HackerRank"</span>,</div>
          <div className="pixel-array-item"><span className="pixel-string">"Software Engineer - HackerRank"</span>,</div>
          <div className="pixel-array-item"><span className="pixel-string">"Problem Solving - HackerRank"</span>,</div>
          <div className="pixel-array-item"><span className="pixel-string">"SQL Advanced - HackerRank"</span>,</div>
          <div className="pixel-array-item"><span className="pixel-string">"Linux Training Course"</span>,</div>
          <div className="pixel-array-item"><span className="pixel-string">"Python Pro Bootcamp - Udemy"</span></div>
        </div>
        <div className="pixel-json-line">],</div>
        <div className="pixel-json-line">
          <span className="pixel-key">"skills"</span>: [
        </div>
        <div className="pixel-json-array">
  <div className="pixel-array-item"><span className="pixel-string">"Frontend: React.js (Advanced), Vue.js, TypeScript, JavaScript (ES6+), HTML5/CSS3 (Responsive Design)"</span>,</div>
<div className="pixel-array-item"><span className="pixel-string">"Backend: Node.js/Express, Java (Spring Boot), PHP, Rust (basic)"</span>,</div>
<div className="pixel-array-item"><span className="pixel-string">"Databases: PostgreSQL, Database Optimization"</span>,</div>
<div className="pixel-array-item"><span className="pixel-string">"DevOps: CI/CD Pipelines, RESTful API Design"</span>,</div>
<div className="pixel-array-item"><span className="pixel-string">"Other: CMS Integration, Testing & Debugging, UX Principles, Technical Documentation"</span>,</div>

</div>
        <div className="pixel-json-line">],</div>
        <div className="pixel-json-line">
          <span className="pixel-key">"availability"</span>: <span className="pixel-boolean">true</span>
        </div>
      </div>
      <div className="pixel-status-bar">
        <span className="pixel-cursor blink">_</span>
        <span className="pixel-status-text">Open to full-time and contract opportunities</span>
      </div>
    </div>
  </div>
)}


          {/* Enhanced Experience Tab */}
          {activeTab === 'experience' && (
            <div className="pixel-timeline-system">
              <div className="pixel-timeline-header">
                <span className="pixel-timeline-title">WORK_HISTORY.LOG</span>
                <span className="pixel-timeline-total">{experiences.length} entries found</span>
              </div>
              
              <div className="pixel-timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="pixel-timeline-entry">
                    <div className="pixel-timeline-marker">
                      <span className="pixel-marker-dot"></span>
                      <span className="pixel-marker-line"></span>
                    </div>
                    
                    <div className="pixel-entry-content">
                      <div className="pixel-entry-header">
                        <div className="pixel-entry-main">
                          <h3 className="pixel-entry-role">{exp.role}</h3>
                          <span className="pixel-entry-company">[{exp.company}]</span>
                        </div>
                        <div className="pixel-entry-meta">
                          <span className="pixel-entry-period">{exp.period}</span>
                          <span className="pixel-entry-location">{exp.location}</span>
                        </div>
                      </div>
                      
                      <div className="pixel-entry-achievements">
                        <div className="pixel-achievements-title">KEY_ACHIEVEMENTS:</div>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="pixel-achievement">
                            <span className="pixel-bullet">></span>
                            <span className="pixel-achievement-text">{achievement}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pixel-entry-tech">
                        <span className="pixel-tech-label">STACK:</span>
                        {exp.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="pixel-tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Interests Tab */}
          {activeTab === 'interests' && (
            <div className="pixel-interests-dashboard">
              <div className="pixel-dashboard-header">
                <span className="pixel-dashboard-title">INTERESTS_MODULE.EXE</span>
                <span className="pixel-dashboard-status">Running...</span>
              </div>
              
              <div className="pixel-interests-grid">
                {interests.map((interest, index) => (
                  <div key={index} className="pixel-interest-module">
                    <div className="pixel-module-header">
                      <div className="pixel-module-icon">{interest.icon}</div>
                      <span className="pixel-module-name">{interest.name}</span>
                      <span className="pixel-module-status">Active</span>
                    </div>
                    
                    <div className="pixel-module-content">
                      <div className="pixel-module-description">
                        {interest.description}
                      </div>
                    </div>
                    
                    <div className="pixel-module-footer">
                      <span className="pixel-module-id">ID: INT_{index.toString().padStart(3, '0')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="overflow-hidden mt-12 relative z-0">
  <div className="pixel-scroll-container">
    <div
      ref={scrollTextRef}
      className="pixel-scroll-text text-6xl font-extrabold tracking-widest whitespace-nowrap animate-pulse bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
    >
      [ INNOVATIVE SOLUTIONS ] • [ CLEAN CODE ] • [ SCALABLE ARCHITECTURE ] • [ USER EXPERIENCE ] • [ PERFORMANCE OPTIMIZATION ] • [ TEAM LEADERSHIP ] •
    </div>
  </div>
</div>
</div>


      {/* Enhanced CSS with advanced pixel styling */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        /* Enhanced Global Styles */
        * {
          box-sizing: border-box;
        }

        /* Enhanced Animations */
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes pixelFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced Header Styles */
        .pixel-terminal-header {
          border: 2px solid #333;
          background: #1a1a1a;
          margin-bottom: 2rem;
        }

        .pixel-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .pixel-window-controls {
          display: flex;
          gap: 6px;
        }

        .pixel-btn {
          width: 12px;
          height: 12px;
          border: 1px solid #555;
          background: #444;
          cursor: pointer;
        }

        .pixel-close { background: #666; }
        .pixel-minimize { background: #555; }
        .pixel-maximize { background: #777; }

        .pixel-title-bar {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #ccc;
          font-weight: 500;
        }

        .pixel-status {
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #888;
        }

        .pixel-status-indicator {
          width: 6px;
          height: 6px;
          background: #4a4a4a;
          border: 1px solid #666;
        }

        .pixel-hero-content {
          padding: 20px;
        }

        .pixel-ascii-art {
          display: flex;
          justify-content: center;
        }

        .pixel-ascii {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          line-height: 1.2;
          color: #e0e0e0;
          background: none;
          border: none;
          margin: 0;
        }

        /* Enhanced Tab Styles */
        .pixel-tab-container {
          display: flex;
          background: #1a1a1a;
          border: 2px solid #333;
          border-radius: 0;
        }

        .pixel-tab {
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-right: 1px solid #333;
          color: #888;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .pixel-tab:last-child {
          border-right: none;
        }

        .pixel-tab.active {
          background: #333;
          color: #e0e0e0;
        }

        .pixel-tab:hover:not(.active) {
          background: #252525;
          color: #bbb;
        }

        .pixel-icon {
          margin-right: 8px;
          font-size: 10px;
        }

        /* Enhanced Profile Styles */
        .pixel-window {
          border: 2px solid #333;
          background: #1a1a1a;
          animation: pixelFadeIn 0.5s ease-out;
        }

        .pixel-window-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .pixel-window-title {
          font-size: 12px;
          color: #00FF00;
          font-weight: 500;
        }

        .pixel-content {
          padding: 20px;
        }

        .pixel-json {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
        }

        .pixel-json-line {
          margin-bottom: 4px;
          padding-left: 16px;
        }

        .pixel-json-array {
          padding-left: 32px;
        }

        .pixel-array-item {
          margin-bottom: 2px;
          padding-left: 16px;
        }

        .pixel-key {
          color: #88c0d0;
        }

        .pixel-string {
          color: #a3be8c;
        }

        .pixel-number {
          color: #d08770;
        }

        .pixel-boolean {
          color: #81a1c1;
        }

        .pixel-status-bar {
          margin-top: 20px;
          padding: 10px;
          background: #252525;
          border: 1px solid #444;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pixel-cursor {
          color: #e0e0e0;
        }

        .pixel-status-text {
          color: #00FF00; 
          font-size: 12px;
        }

     

        .pixel-matrix-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .pixel-matrix-title {
          font-size: 14px;
          color: #e0e0e0;
          font-weight: 600;
        }

        .pixel-matrix-version {
          font-size: 11px;
          color: #888;
        }

        .pixel-skill-category {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 16px;
        }

        .pixel-skill-category:last-child {
          border-bottom: none;
        }

        .pixel-category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pixel-category-title {
          font-size: 13px;
          color: #e0e0e0;
          font-weight: 600;
        }

        .pixel-category-count {
          font-size: 10px;
          color: #888;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .pixel-skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 10px);
  grid-auto-rows: 10px;
}


        .pixel-skill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.03);
          transition: all 0.2s ease;
        }

        .pixel-skill-item:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .pixel-skill-icon {
          font-size: 16px;
          color: #646cff;
          display: flex;
          align-items: center;
        }

        .pixel-skill-details {
          display: flex;
          flex-direction: column;
        }

        .pixel-skill-name {
          font-size: 13px;
          color: #e0e0e0;
          font-weight: 500;
        }

        .pixel-skill-exp {
          font-size: 10px;
          color: #888;
        }

        .pixel-matrix-footer {
          padding: 12px 16px;
          background: #252525;
          border-top: 1px solid #333;
        }

        .pixel-footer-text {
          font-size: 11px;
          color: #888;
        }

        /* Enhanced Experience Styles */
        .pixel-timeline-system {
          border: 2px solid #333;
          background: #1a1a1a;
          animation: pixelFadeIn 0.5s ease-out;
        }

        .pixel-timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .pixel-timeline-title {
          font-size: 14px;
          color: #00FF00;
          font-weight: 600;
        }

        .pixel-timeline-total {
          font-size: 11px;
          color: #888;
        }

        .pixel-timeline {
          padding: 20px;
          position: relative;
        }

        .pixel-timeline-entry {
          display: flex;
          margin-bottom: 24px;
          position: relative;
        }

        .pixel-timeline-entry:last-child {
          margin-bottom: 0;
        }

        .pixel-timeline-marker {
          position: relative;
          margin-right: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pixel-marker-dot {
          width: 12px;
          height: 12px;
          background: #e0e0e0;
          border: 2px solid #333;
          position: relative;
          z-index: 2;
        }

        .pixel-marker-line {
          width: 2px;
          background: #333;
          flex-grow: 1;
          margin-top: 8px;
        }

        .pixel-timeline-entry:last-child .pixel-marker-line {
          display: none;
        }

        .pixel-entry-content {
          flex: 1;
          border: 1px solid #333;
          background: #1f1f1f;
          padding: 16px;
        }

        .pixel-entry-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pixel-entry-main {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pixel-entry-role {
  font-size: 16px;
  color: #00FF00; /* Retro green */
  font-weight: 600;
  margin: 0;
}


   .pixel-entry-company {
  font-size: 13px;
  color: #00FF00; /* Retro green */
  font-weight: 400;
}


        .pixel-entry-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          text-align: right;
        }

        .pixel-entry-period,
        .pixel-entry-location {
          font-size: 12px;
          color: #888;
        }

        .pixel-entry-achievements {
          margin-bottom: 12px;
        }

        .pixel-achievements-title {
          font-size: 12px;
          color: #e0e0e0;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .pixel-achievement {
          display: flex;
          margin-bottom: 4px;
          font-size: 13px;
          line-height: 1.4;
        }

        .pixel-bullet {
          color: #888;
          margin-right: 8px;
          font-weight: bold;
        }

        .pixel-achievement-text {
          color: #ccc;
        }

        .pixel-entry-tech {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }

      .pixel-tech-label {
  font-size: 11px;
  color: #00FF00; /* Retro green */
  font-weight: 600;
  margin-right: 4px;
}


.pixel-tech-tag {
  padding: 2px 6px;
  background: #333;
  border: 1px solid #444;
  font-size: 10px;
  color: #00FF00; /* Retro green */
}


        /* Enhanced Interests Styles */
        .pixel-interests-dashboard {
          border: 2px solid #333;
          background: #1a1a1a;
          animation: pixelFadeIn 0.5s ease-out;
        }

        .pixel-dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .pixel-dashboard-title {
          font-size: 14px;
          color: #00FF00;
          font-weight: 600;
        }

        .pixel-dashboard-status {
          font-size: 11px;
          color: #888;
        }

        .pixel-interests-grid {
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 13px;
        }

        .pixel-interest-module {
          border: 1px solid #333;
          background: #1f1f1f;
          display: flex;
          flex-direction: column;
        }

        .pixel-module-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #252525;
          border-bottom: 1px solid #333;
        }

        .pixel-module-icon {
          font-size: 18px;
          color: #e0e0e0;
          margin-right: 8px;
        }

    .pixel-module-name {
  flex: 1;
  font-size: 13px;
  color: #00FF00; /* Retro green */
  font-weight: 600;
}


        .pixel-module-status {
          font-size: 10px;
          color: #888;
          padding: 2px 6px;
          background: #333;
          border: 1px solid #444;
        }

        .pixel-module-content {
          padding: 12px;
          flex: 1;
        }

        .pixel-module-description {
          font-size: 12px;
          color: #ccc;
          line-height: 1.5;
        }

        .pixel-module-footer {
          padding: 8px 12px;
          background: #252525;
          border-top: 1px solid #333;
        }

        .pixel-module-id {
          font-size: 10px;
          color: #888;
        }
        
        /* Enhanced Scrolling Text */
.pixel-scroll-container {
  border: 1px solid #333;
  background: #1a1a1a;
  padding: 8px 0;
  overflow: hidden;
}

.pixel-scroll-text {
  white-space: nowrap;
  font-size: 35px;
  font-weight: 600;
  color: #00FF00; /* Retro green */
  font-family: 'JetBrains Mono', monospace;
}



        /* Enhanced Animations */
        .blink {
          animation: blink 1s step-end infinite;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .pixel-ascii {
            font-size: 8px;
          }

          .pixel-tab {
            padding: 8px 12px;
            font-size: 11px;
          }

          .pixel-tab .pixel-icon {
            display: none;
          }

     

          .pixel-entry-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .pixel-entry-meta {
            align-items: flex-start;
            text-align: left;
          }

          .pixel-content {
            padding: 12px;
          }

          .pixel-json {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .pixel-ascii {
            font-size: 7px;
          }

          .pixel-timeline {
            padding: 12px;
          }

          .pixel-timeline-marker {
            margin-right: 12px;
      }
  
        }

        /* Loading and hover effects */
        .pixel-skill-card:hover {
          border-color: #555;
          background: #252525;
        }

        .pixel-interest-module:hover {
          border-color: #555;
        }

        .pixel-interest-module:hover .pixel-module-header {
          background: #2d2d2d;
        }

        .pixel-entry-content:hover {
          border-color: #555;
          background: #252525;
        }

        /* Accessibility improvements */
        .pixel-tab:focus {
          outline: 1px solid #888;
          outline-offset: -1px;
        }

        .pixel-btn:focus {
          outline: 1px solid #888;
        }

        /* Additional enhancements */
        .pixel-progress-fill {
          position: relative;
          overflow: hidden;
        }

        .pixel-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
          animation-delay: 1.5s;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* Terminal cursor animation */
        .pixel-cursor {
          animation: blink 1s step-end infinite;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default About;