import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Code, Layers, Tag, Calendar, Info, X, Star, Eye, ArrowRight, Grid, List } from 'lucide-react';
import tourImage from './images/tour.jpg';
import commerceImage from './images/commerce.jpg';
import resumeImage from './images/resume.png';
import numericalImage from './images/animation_with_shooting.gif';
import debatebrosImage from './images/debatebros.png';
import firstImage from './images/pr2.gif'; 
import fl1 from './images/fl1.png';
import fl2 from './images/fl2.png';
import fl3 from './images/fl3.png';

// Matrix Effect Component for Cards
const MatrixEffect = ({ isActive }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const charArray = chars.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};


// Flower Background Component
const FlowerBackground = () => {
  useEffect(() => {
    // Create flower elements and animation
    const total = 10;
    const container = document.getElementById('flower-container');
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < total; i++) {
      const Div = document.createElement('div');
      const Div2 = document.createElement('div');
      const Div3 = document.createElement('div');
      
      // Set flower classes and initial positions
      Div.className = 'flower';
      Div2.className = 'flower2';
      Div3.className = 'flower3';
      
      // Set initial positions
      Div.style.left = `${Math.random() * w}px`;
      Div.style.top = `${Math.random() * -200 - 150}px`;
      
      Div2.style.left = `${Math.random() * w}px`;
      Div2.style.top = `${Math.random() * -200 - 150}px`;
      
      Div3.style.left = `${Math.random() * w}px`;
      Div3.style.top = `${Math.random() * -200 - 150}px`;
      
      container.appendChild(Div);
      container.appendChild(Div2);
      container.appendChild(Div3);
      
      // Animate flowers
      animateFlower(Div);
      animateFlower2(Div2);
      animateFlower3(Div3);
    }

    function animateFlower(elm) {
      const duration = 6 + Math.random() * 9; // 6-15 seconds
      const delay = -15;
      
      // Falling animation
      elm.animate(
        [
          { top: `${elm.style.top}` },
          { top: `${h + 100}px` }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'linear',
          iterations: Infinity
        }
      );
      
      // Sideways movement
      elm.animate(
        [
          { transform: 'translateX(0) rotate(0deg)' },
          { transform: 'translateX(100px) rotate(180deg)' },
          { transform: 'translateX(0) rotate(0deg)' }
        ],
        {
          duration: (4 + Math.random() * 4) * 1000, // 4-8 seconds
          easing: 'ease-in-out',
          iterations: Infinity
        }
      );
    }
    
    function animateFlower2(elm) {
      const duration = 6 + Math.random() * 9; // 6-15 seconds
      const delay = -25;
      
      // Falling animation
      elm.animate(
        [
          { top: `${elm.style.top}` },
          { top: `${h + 100}px` }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'linear',
          iterations: Infinity
        }
      );
      
      // Sideways movement
      elm.animate(
        [
          { transform: 'translateX(0) rotate(0deg)' },
          { transform: 'translateX(100px) rotate(180deg)' },
          { transform: 'translateX(0) rotate(0deg)' }
        ],
        {
          duration: (4 + Math.random() * 4) * 1000, // 4-8 seconds
          easing: 'ease-in-out',
          iterations: Infinity
        }
      );
    }
    
    function animateFlower3(elm) {
      const duration = 6 + Math.random() * 9; // 6-15 seconds
      const delay = -5;
      
      // Falling animation
      elm.animate(
        [
          { top: `${elm.style.top}` },
          { top: `${h + 100}px` }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'linear',
          iterations: Infinity
        }
      );
      
      // Sideways movement
      elm.animate(
        [
          { transform: 'translateX(0) rotate(0deg)' },
          { transform: 'translateX(100px) rotate(180deg)' },
          { transform: 'translateX(0) rotate(0deg)' }
        ],
        {
          duration: (4 + Math.random() * 4) * 1000, // 4-8 seconds
          easing: 'ease-in-out',
          iterations: Infinity
        }
      );
    }

    return () => {
      // Clean up flowers when component unmounts
      const container = document.getElementById('flower-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
  id="flower-container"
  className="absolute inset-0 pointer-events-none overflow-hidden"
  style={{ zIndex: 1 }}
/>
  );
};

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  repoLink?: string;
  liveLink?: string;
  screenshot?: string;
  featured?: boolean;
  completionDate?: string;
  category?: string;
}

const RetroLanding = ({ show, onEnter }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 cursor-pointer bg-black flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xl mb-4">
        <img 
          src={firstImage} 
          alt="Project Preview" 
          className="w-full h-auto"
        />
      </div>
      
      <div className="text-black text-center z-10">
        <button 
          onClick={onEnter}
          className="mt-6 px-8 py-3 bg-black text-white font-bold uppercase tracking-widest border-4 border-gray-800 hover:scale-105 transform transition duration-200"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

const projects: Project[] = [
  {
    title: "Tour Website",
    description: "Built with React + Tailwind CSS.",
    longDescription: "A modern, responsive tour website designed to showcase popular travel destinations and booking features. Developed using React for dynamic content rendering, TypeScript for enhanced type safety, and Tailwind CSS for a sleek, responsive layout. The site features smooth scrolling, interactive components, and an engaging user experience.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    repoLink: "https://github.com/NaniChkhenkeli/TourWebsite.git",
    liveLink: "https://drive.google.com/file/d/1AmcRXi_K66-oq9zgg2cgYuwPWkfO16Fb/view?usp=sharing",
    screenshot: tourImage,
    featured: true,
    completionDate: "2024-07",
    category: "Web Development"
  },
  {
    title: "E-Commerce Platform",
    description: "A fully-featured e-commerce website built with React and TypeScript.",
    longDescription: "An e-commerce platform designed for seamless online shopping, featuring product listings, shopping cart functionality, and secure checkout. Built with React for a dynamic front-end, TypeScript for type safety, and integrated with payment gateways for smooth transactions. The site is responsive, fast, and optimized for an engaging user experience.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe API", "Node.js"],
    repoLink: "https://github.com/NaniChkhenkeli/salesPlatform.git",
    liveLink: "https://your-ecommerce-platform-url.com",
    screenshot: commerceImage,
    featured: true,
    completionDate: "2024-05",
    category: "Web Development"
  }, 
  {
    title: "Resume Builder Platform",
    description: "A user-friendly platform to create, customize, and download professional resumes.",
    longDescription: "An intuitive web-based resume builder platform that allows users to easily create and personalize their resumes with various templates and formatting options. Built with React for a smooth user interface and Node.js for backend functionality. It offers real-time preview, easy export options, and saves user progress for future edits.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    repoLink: "https://github.com/NaniChkhenkeli/resume-builder.git",
    screenshot: resumeImage,
    featured: true,
    completionDate: "2024-06",
    category: "Web Development"
  },
  {
    title: "Numerical Programming Library",
    description: "Collection of numerical algorithms implemented in Python for scientific computing applications.",
    longDescription: "A library of mathematical algorithms designed for scientific computing applications. Includes implementations of numerical methods for solving equations, interpolation, differentiation, and integration with high precision.",
    techStack: ["Python", "numpy"],
    repoLink: "https://github.com/NaniChkhenkeli/NP-2projects.git",
    screenshot: numericalImage,
    completionDate: "2023-09",
    category: "Scientific Computing"
  },
  {
    title: "Educational Debate Platform",
    description: "Interactive educational platform for evaluating debates and generating topics using AI.",
    longDescription: "An engaging educational platform that allows users to participate in debates, with real-time evaluation and AI-generated debate topics. Built using Python for core logic, Pygame for the user interface and visuals, and Ollama (LLaMA 3) for evaluating debates and generating new topics. The platform also incorporates the Requests library for handling AI-generated responses and JSON processing for formatting these responses into structured outputs.",
    techStack: ["Python", "Pygame", "Ollama (LLaMA 3)", "Requests", "JSON Processing"],
    repoLink: "https://github.com/NaniChkhenkeli/debateBros",
    liveLink: "https://devpost.com/software/debatebros",
    screenshot: debatebrosImage,
    featured: true,
    completionDate: "2024-07",
    category: "Educational Technology"
  }
];

const Projects = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [landingVisible, setLandingVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLandingVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  const handleEnter = () => {
    setShowLanding(false);
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long' });
  };

  const ProjectCard = ({ project, index }) => {
    const isHovered = hoveredProject === index;
    
    return (
      <div 
        className={`group relative bg-gray-100 border border-gray-300 rounded-xl overflow-hidden
          transition-all duration-500 hover:border-gray-600 hover:shadow-lg
          ${isHovered ? 'transform scale-105 z-10' : ''}`}
        onMouseEnter={() => setHoveredProject(index)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl">
          <MatrixEffect isActive={isHovered} />
        </div>
        
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3" fill="currentColor" />
              Featured
            </div>
          </div>
        )}
        
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.screenshot} 
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 
              ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={() => openProjectDetails(project)}
              className="bg-white/80 border border-black rounded-full p-3 
                hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <Eye className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
        
        <div className="p-6 relative z-15">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-md text-xs">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(project.completionDate)}
            </div>
            
            <div className="flex items-center gap-2">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 
                    hover:border-gray-400 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-4 h-4 text-black" />
                </a>
              )}
              
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200 
                    hover:border-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <ExternalLink className="w-4 h-4 text-blue-800" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen" ref={projectsRef}>
      {landingVisible && showLanding && (
        <RetroLanding show={true} onEnter={handleEnter} />
      )}
      
      {!showLanding && (
        <>
          <FlowerBackground />
          <style>{`
  .flower, .flower2, .flower3 {
    position: absolute;
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 2;
    animation: float 15s infinite linear;
  }
  
  .flower {
    background-image: url(${fl1});
    animation-delay: 0s;
    animation-duration: 20s;
  }
  
  .flower2 {
    background-image: url(${fl2});
    animation-delay: -5s;
    animation-duration: 25s;
  }
  
  .flower3 {
    background-image: url(${fl3});
    animation-delay: -10s;
    animation-duration: 30s;
  }
  
  @keyframes float {
    0% {
      transform: translateY(-100px) rotate(0deg) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(calc(100vh + 100px)) rotate(360deg) translateX(100px);
      opacity: 0;
    }
  }
`}</style>
          
          <section id="projects" className="py-20 px-4 relative bg-gray-900">
            <div className="absolute inset-0 z-10" style={{ 
              backgroundSize: "15px 15px", 
              backgroundImage: `
  linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
`,
            }} />
            
            <div className="max-w-7xl mx-auto relative z-20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-900 border border-blue-700 rounded-full px-4 py-2 mb-6">
  <Code className="w-5 h-5 text-blue-200" />
  <span className="text-blue-200 font-medium text-xl">Projects</span>
</div>
              </div>

              <div className="flex justify-end mb-8">
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-1">

                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-300 ${
  viewMode === 'grid' 
    ? 'bg-gray-600 text-white' 
    : 'text-gray-300 hover:text-white'
}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-gray-200 text-black' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6'
              }`}>
                {projects.map((project, index) => (
                  viewMode === 'grid' ? (
                    <ProjectCard key={index} project={project} index={index} />
                  ) : (
                    <div key={index} className="bg-gray-400 border-2 border-gray-600 rounded-xl p-6 hover:border-gray-400 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl">
                        <MatrixEffect isActive={hoveredProject === index} />
                      </div>
                      
                      <div 
                        className="relative z-20"
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-black">{project.title}</h3>
                              {project.featured && (
                                <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                  <Star className="w-3 h-3" fill="currentColor" />
                                  Featured
                                </div>
                              )}
                            </div>
                            
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.techStack.map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded-md text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(project.completionDate)}
                            {project.category && (
                              <>
                                <span className="mx-2">•</span>
                                <Tag className="w-4 h-4 mr-1" />
                                {project.category}
                              </>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openProjectDetails(project)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-lg 
                                hover:bg-blue-200 hover:border-blue-300 transition-all duration-300 text-blue-800 text-sm font-medium"
                            >
                              <Info className="w-4 h-4" />
                              Details
                            </button>
                            
                            {project.repoLink && (
                              <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400 transition-all duration-300"
                              >
                                <Github className="w-4 h-4 text-black" />
                              </a>
                            )}
                            
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 transition-all duration-300"
                              >
                                <ExternalLink className="w-4 h-4 text-blue-800" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            {selectedProject && (
  <div 
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={closeProjectDetails}
  >
    <div 
      className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative border border-white/10"
      onClick={(e) => e.stopPropagation()}
      style={{
        fontFamily: 'monospace'
      }}
    >
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={selectedProject.screenshot} 
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        <button 
          onClick={closeProjectDetails}
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-full p-3
            hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white
            border border-white/20 hover:border-white/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3 tracking-wider">
                {selectedProject.title}
              </h3>
              <p className="text-white/70 text-lg font-light tracking-wide">
                {selectedProject.description}
              </p>
            </div>
            {selectedProject.featured && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Star className="w-4 h-4" fill="currentColor" />
                <span>FEATURED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
        <div className="space-y-10">
          {selectedProject.longDescription && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <h4 className="text-xl font-bold text-white tracking-wide">
                  About This Project
                </h4>
              </div>
              <p className="text-white/70 leading-relaxed text-base pl-7">
                {selectedProject.longDescription}
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
              <h4 className="text-xl font-bold text-white tracking-wide">
                Tech Stack
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-7">
              {selectedProject.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center 
                    hover:bg-white/10 hover:scale-105 transition-all duration-300
                    border border-white/10 hover:border-white/20"
                >
                  <span className="font-mono text-white/90 text-sm tracking-wide">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="pl-7">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h4 className="text-white/60 text-sm tracking-wider">COMPLETION DATE</h4>
              </div>
              <p className="text-white text-lg font-light">
                {formatDate(selectedProject.completionDate)}
              </p>
            </div>

            {selectedProject.category && (
              <div className="pl-7">
                <div className="flex items-center gap-3 mb-3">
                  <Tag className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white/60 text-sm tracking-wider">CATEGORY</h4>
                </div>
                <p className="text-white text-lg font-light">
                  {selectedProject.category}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            {selectedProject.repoLink && (
              <a
                href={selectedProject.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 
                  rounded-full px-8 py-4 text-white font-semibold 
                  hover:from-slate-600 hover:to-slate-500 hover:scale-105 
                  transition-all duration-300 shadow-lg text-sm tracking-wide
                  border border-white/20 hover:border-white/40"
              >
                <Github className="w-5 h-5" />
                <span>Source Code</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            {selectedProject.liveLink && (
              <a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 
                  rounded-full px-8 py-4 text-white font-semibold 
                  hover:from-blue-500 hover:to-purple-500 hover:scale-105 
                  transition-all duration-300 shadow-lg text-sm tracking-wide
                  border border-white/20 hover:border-white/40"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
              
              @keyframes scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
              }
              
              .pixelated {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
              }
              
              .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              
              .line-clamp-3 {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              
              ::-webkit-scrollbar {
                width: 8px;
              }
              
              ::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.9);
                border-radius: 4px;
              }
              
              ::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.9);
                border-radius: 4px;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.9);
              }
            `}</style>
          </section>
        </>
      )}
    </div>
  );
};

export default Projects;