import bot2 from "../components/images/bot2.png";
import { useEffect, useState, useRef } from "react";
import lightBg from "../components/images/gif.gif";

const titles = ["Full Stack Software Engineer", "Web Application Developer", "Front-End/Back-End Engineer"];

const botResponses = {
  greetings: [
    "Hey there! 👋 I'm Nani's AI assistant. I can tell you about their skills, projects, experience, or even give you a tech quiz! What would you like to explore?",
    "Hello! 🤖 I'm here to showcase Nani's expertise. Try asking about 'tech stack', 'achievements', 'career journey', or say 'surprise me'!",
    "Hi! ✨ Ready to dive into Nani's portfolio? I can discuss technical skills, project details, career highlights, or answer any specific questions!"
  ],
  
  skills: {
    frontend: "🎨 Frontend: React.js/Next.js, TypeScript, JavaScript ES6+, HTML5/CSS3, Tailwind CSS, Material-UI, Responsive Design, PWAs, Performance Optimization",
    backend: "⚙️ Backend: Node.js/Express.js, Python/Django/Flask, RESTful APIs, GraphQL, Microservices Architecture, Authentication (JWT, OAuth), Rate Limiting",
    database: "🗄️ Databases: MongoDB (Mongoose), PostgreSQL, MySQL, Redis (caching), Database optimization, Query performance tuning",
    cloud: "☁️ Cloud & DevOps: Docker, CI/CD pipelines, Git workflows, Linux, Load balancing",
    tools: "🛠️ Tools & Others: Git/GitHub, npm/yarn, Postman, VS Code, Agile/Scrum methodologies",
    general: "Nani specializes in: React/Next.js, Node.js/Express, Python/Django, TypeScript, MongoDB/PostgreSQL.🚀"
  },
  
  projects: {
    ecommerce: "🛒 E-Commerce Platform: Full-stack online store with React frontend, Node.js backend, MongoDB database. Features: user authentication, payment integration (Stripe), cart management, order tracking, admin dashboard. Handled 500+ concurrent users.",
    
    chatapp: "💬 Real-time Chat Application: Built with React, Socket.io, Node.js, and MongoDB. Features: real-time messaging, file sharing, group chats, message encryption, user presence indicators. Optimized for low latency.",
    
    taskmanager: "📋 Project Management Tool: Collaborative task management system with React frontend and Express backend. Features: drag-and-drop kanban boards, team collaboration, deadline tracking, progress analytics, role-based permissions.",
      
    apigateway: "🌐 API Gateway Service: Microservices architecture with Node.js, implementing rate limiting, authentication, request routing, and monitoring. Improved API response times by 40%.",
    
    dashboard: "📊 Analytics Dashboard: Interactive data visualization platform using React, D3.js, and Python backend. Real-time charts, filtering, export functionality, and automated reporting.",
    
    general: "Nani has built: E-commerce platforms with payment integration, Real-time chat applications, RESTful APIs with authentication, Responsive SPAs, Microservices architecture, and Analytics dashboards. Want specifics about any project? 💼"
  },
  
  experience: {
    current: "Currently working as a Full Stack Developer with 2+ years of professional experience. Specialized in React/Node.js ecosystems, agile development, and scalable solutions.",
    
    skills_gained: "Professional experience includes: Code reviews and mentoring junior developers, CI/CD pipeline implementation, Database optimization and scaling, API design and documentation, Cross-functional team collaboration, Performance monitoring and optimization.",
    
    achievements: "Key achievements: Reduced application load times by 60%, Implemented automated testing reducing bugs by 45%, Led migration to microservices architecture, Optimized database queries improving performance by 70%, Built reusable component libraries used across multiple projects.",
    
    general: "2+ years of full-stack development with agile methodologies, code reviews, CI/CD pipelines, and collaborative team environments. Focus on scalable solutions and user-centric design. 📈"
  },
  
  education: {
    formal: "🎓 Bachelor's in Computer Science with focus on Software Engineering, Data Structures & Algorithms, Database Systems, and Web Technologies.",
    
    continuous: "📚 Continuous Learning: React Patterns, System Design courses, GraphQL specialization.",
    
    self_taught: "💡 Self-taught expertise in: Modern JavaScript frameworks, Cloud architecture patterns, DevOps practices, UI/UX design principles, Mobile-first development.",
    
    general: "🎓 Bachelor's in Computer Science + continuous learning through advanced courses in cloud architecture, system design, and modern frameworks."
  },
  
  contact: "📧 chkhenkelinani@gmail.com | 💼 LinkedIn: /in/nanichkhenkeli | 🐙 GitHub: /nanichkhenkeli | 📱 Available for exciting opportunities and collaborations!",
  
  techstack: "Here's Nani's comprehensive tech stack:\n\n🎨 Frontend: React, Next.js, TypeScript, Tailwind CSS\n⚙️ Backend: Node.js, Python, Express, Django\n🗄️ Databases: MongoDB, PostgreSQL, Redis\n☁️ Cloud: AWS, Docker, CI/CD\n🛠️ Tools: Git, Jest, Webpack, VS Code\n\nWant details about any specific technology? 🛠️",
  
  achievements: "🏆 Notable Achievements:\n• Built scalable apps serving 1000+ concurrent users\n• Optimized database queries reducing load times by 60%\n• Implemented CI/CD reducing deployment time by 80%\n• Led code reviews improving team code quality by 40%\n• Mentored 3 junior developers in modern web practices\n• Open source contributions with 200+ GitHub stars",
  
  quiz: {
    questions: [
      {
        q: "What's the difference between REST and GraphQL APIs? 🤔",
        a: "Great question! REST uses multiple endpoints with fixed data structures, while GraphQL uses a single endpoint where clients specify exactly what data they need. GraphQL reduces over-fetching and under-fetching of data!"
      },
      {
        q: "Explain the difference between `let`, `const`, and `var` in JavaScript 🧠",
        a: "Excellent! `var` is function-scoped and can be redeclared, `let` is block-scoped and can be reassigned, `const` is block-scoped and cannot be reassigned (though objects/arrays can be mutated)."
      },
      {
        q: "What are React Hooks and why are they useful? ⚛️",
        a: "Hooks let you use state and lifecycle features in functional components! They make code more reusable, easier to test, and eliminate many issues with class components and `this` binding."
      },
      {
        q: "What's the difference between SQL and NoSQL databases? 🗄️",
        a: "SQL databases are relational with fixed schemas and ACID compliance (like PostgreSQL), while NoSQL databases are flexible with dynamic schemas and horizontal scaling (like MongoDB). Choice depends on your data structure and scaling needs!"
      }
    ]
  },
  
  surprise: [
    "🎉 Fun fact: Nani once optimized a React app's bundle size by 40% using code splitting and lazy loading. She loves performance optimization challenges!",
    "✨ Did you know? Nani built their first full-stack app 2 years ago! She started with HTML/CSS and fell in love with JavaScript.",
    "🚀 Cool achievement: Nani completed some interesting projects, she once finished 24 hours hackathon if a few hours with interesting idea!",
    "💡 Interesting: Nani can code in 6 programming languages and prefers dark mode with the 'One Dark Pro' theme. She also loves debugging complex issues - it's like solving puzzles!"
  ],
  
  personality: [
    "I'm Nani's AI assistant, trained on their portfolio and achievements. I try to be helpful, informative, and occasionally witty! 😊",
    "I represent Nani's professional side but with a friendly twist. Think of me as their digital portfolio that can actually talk back! 🤖",
    "I'm here to showcase Nani's skills in an interactive way. I love discussing technical topics and helping people understand complex concepts! 🧠"
  ],
  
  collaboration: "Nani excels in team environments! Experience with: Agile/Scrum methodologies, Code reviews and pair programming, Cross-functional collaboration with designers and PMs, Technical documentation and knowledge sharing, Mentoring junior developers, Remote and hybrid work environments. They believe great software is built by great teams! 🤝",
  
  interests: "Beyond coding, Nani is passionate about: 🎮 Game development and interactive experiences, 🎨 UI/UX design and user psychology, 🚀 Emerging technologies (AI/ML, Web3, IoT), 📚 Tech blogging and knowledge sharing, 🌱 Sustainable and accessible web development, 🏃‍♂️ Staying active and work-life balance",
  
  default: "Hmm, that's interesting! 🤔 I can help you with:\n• 'tech stack' or 'skills' - Technical expertise\n• 'projects' or 'portfolio' - Work examples\n• 'experience' or 'background' - Career journey\n• 'quiz' - Technical questions\n• 'surprise me' - Fun facts\n• 'collaboration' - Teamwork approach\n• 'contact' - Get in touch info\n\nWhat would you like to explore? 🚀"
};

// Context tracking for more intelligent responses
let conversationContext = {
  topics: [],
  askedQuestions: [],
  userInterests: [],
  conversationLength: 0
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTitle, setActiveTitle] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [raindrops, setRaindrops] = useState([]);
  const [showBot, setShowBot] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState([
    { user: "Bot", text: "Hi there! 👋 I'm Nani's AI assistant. I can tell you about their skills, projects, experience, or even quiz you on tech topics! What interests you most?", timestamp: new Date() }
  ]);
  const [botPosition, setBotPosition] = useState({ top: 130, left: 120 });
  const [botMood, setBotMood] = useState("happy");
  const [particles, setParticles] = useState([]);
  const [konami, setKonami] = useState([]);
  const [isKonamiActive, setIsKonamiActive] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Matrix effect state
  const [matrixChars, setMatrixChars] = useState([]);
  const matrixCharsRef = useRef([]);

  // Konami code sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Matrix effect
  useEffect(() => {
    // Create initial matrix characters
    const initMatrix = () => {
      const columns = Math.floor(window.innerWidth / 20);
      const initialChars = Array(columns).fill(0).map((_, i) => ({
        x: i * 20,
        y: Math.random() * -100 - 50,
        speed: Math.random() * 3 + 2,
        length: Math.floor(Math.random() * 10) + 5,
        chars: Array(20).fill(0).map(() => String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))),
        opacity: Math.random() * 0.5 + 0.3
      }));
      matrixCharsRef.current = initialChars;
      setMatrixChars(initialChars);
    };

    initMatrix();

    const matrixInterval = setInterval(() => {
      matrixCharsRef.current = matrixCharsRef.current.map(col => {
        if (col.y > window.innerHeight + 100) {
          return {
            ...col,
            y: Math.random() * -100 - 50,
            speed: Math.random() * 3 + 2,
            length: Math.floor(Math.random() * 10) + 5,
            chars: Array(20).fill(0).map(() =>
              String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
            )
          };
        }
        return {
          ...col,
          y: col.y + col.speed
        };
      });
      setMatrixChars([...matrixCharsRef.current]);
    }, 50);

    return () => clearInterval(matrixInterval);
  }, []);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.code].slice(-konamiCode.length);
      setKonami(newKonami);
      
      if (newKonami.join(',') === konamiCode.join(',')) {
        setIsKonamiActive(true);
        setGlitchEffect(true);
        setMessages(prev => [...prev, {
          user: "Bot",
          text: "🎉 KONAMI CODE ACTIVATED! You've unlocked developer mode! Nani appreciates attention to detail - a key trait for any developer. Here's a secret: Nani's first website was built in Notepad with pure HTML/CSS at age 14, and they still prefer coding with keyboard shortcuts! 🚀⌨️",
          timestamp: new Date()
        }]);
        setTimeout(() => {
          setIsKonamiActive(false);
          setGlitchEffect(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  // Initialize effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const drops = Array(30).fill(0).map(() => ({
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() < 0.2 ? 2 : 1,
      type: Math.random() < 0.1 ? 'special' : 'normal',
      opacity: Math.random() * 0.3 + 0.2
    }));
    setRaindrops(drops);

    const particleArray = Array(20).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    }));
    setParticles(particleArray);

    const titleInterval = setInterval(() => {
      setActiveTitle((prev) => (prev + 1) % titles.length);
      setCharacterIndex(0);
    }, 4000);

    const typeInterval = setInterval(() => {
      if (characterIndex < titles[activeTitle].length) {
        setCharacterIndex((prev) => prev + 1);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    const raindropInterval = setInterval(() => {
      setRaindrops((prev) =>
        prev.map((drop) => {
          if (drop.y > 110) {
            return {
              ...drop,
              x: Math.random() * 100,
              y: -10 - Math.random() * 20,
              speed: Math.random() * 0.8 + 0.2,
              size: Math.random() < 0.3 ? 3 : 2,
              type: Math.random() < 0.15 ? 'special' : 'normal',
              opacity: Math.random() * 0.7 + 0.3
            };
          }
          return {
            ...drop,
            y: drop.y + drop.speed,
            x: drop.x + (Math.sin(drop.y * 0.02) * 0.1)
          };
        })
      );
    }, 50);

    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.dx + 100) % 100,
          y: (particle.y + particle.dy + 100) % 100
        }))
      );
    }, 100);

    const botTimer = setTimeout(() => setShowBot(true), 700);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(titleInterval);
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
      clearInterval(raindropInterval);
      clearInterval(particleInterval);
      clearTimeout(botTimer);
    };
  }, [activeTitle, characterIndex]);

  const scrollToNextSection = () => {
    const next = document.querySelector("#about");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Enhanced intelligent bot response generation
  const generateBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    conversationContext.conversationLength++;
    
    // Track conversation topics
    const updateContext = (topic) => {
      if (!conversationContext.topics.includes(topic)) {
        conversationContext.topics.push(topic);
      }
    };

    // Greetings with context awareness
    if (lowerMsg.match(/\b(hello|hi|hey|greetings|good\s+(morning|afternoon|evening))\b/)) {
      updateContext('greeting');
      if (conversationContext.conversationLength > 3) {
        return "Hello again! 👋 Is there something specific about Nani's background you'd like to dive deeper into?";
      }
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    
    // Skills with subcategories
    if (lowerMsg.match(/\b(skill|frontend|front-end|react|javascript|css|html)\b/)) {
      updateContext('skills');
      return botResponses.skills.frontend;
    }
    
    if (lowerMsg.match(/\b(backend|back-end|server|node|python|api|database)\b/)) {
      updateContext('skills');
      return botResponses.skills.backend;
    }
    
    if (lowerMsg.match(/\b(database|mongodb|postgresql|sql|data)\b/)) {
      updateContext('skills');
      return botResponses.skills.database;
    }
    
    if (lowerMsg.match(/\b(cloud|aws|docker|devops|deployment)\b/)) {
      updateContext('skills');
      return botResponses.skills.cloud;
    }
    
    if (lowerMsg.match(/\b(tech\s*stack|technologies|tools)\b/)) {
      updateContext('skills');
      return botResponses.techstack;
    }
    
    if (lowerMsg.includes("skill")) {
      updateContext('skills');
      return botResponses.skills.general;
    }
    
    // Projects with specific details
    if (lowerMsg.match(/\b(ecommerce|e-commerce|shop|store|online\s*store)\b/)) {
      updateContext('projects');
      return botResponses.projects.ecommerce;
    }
    
    if (lowerMsg.match(/\b(chat|messaging|real-time|socket)\b/)) {
      updateContext('projects');
      return botResponses.projects.chatapp;
    }
    
    if (lowerMsg.match(/\b(task|project\s*management|kanban|dashboard)\b/)) {
      updateContext('projects');
      return botResponses.projects.taskmanager;
    }
    
    if (lowerMsg.match(/\b(api|gateway|microservice|service)\b/)) {
      updateContext('projects');
      return botResponses.projects.apigateway;
    }
    
    if (lowerMsg.match(/\b(project|work|portfolio|built|created)\b/)) {
      updateContext('projects');
      return botResponses.projects.general;
    }
    
    // Experience categories
    if (lowerMsg.match(/\b(experience|background|work|job|career)\b/)) {
      updateContext('experience');
      if (lowerMsg.includes('current') || lowerMsg.includes('now')) {
        return botResponses.experience.current;
      }
      if (lowerMsg.includes('achievement') || lowerMsg.includes('accomplishment')) {
        return botResponses.experience.achievements;
      }
      return botResponses.experience.general;
    }
    
    // Education
    if (lowerMsg.match(/\b(education|study|degree|university|college|learn)\b/)) {
      updateContext('education');
      if (lowerMsg.includes('formal') || lowerMsg.includes('degree')) {
        return botResponses.education.formal;
      }
      if (lowerMsg.includes('continuous') || lowerMsg.includes('course')) {
        return botResponses.education.continuous;
      }
      return botResponses.education.general;
    }
    
    // Achievements
    if (lowerMsg.match(/\b(achievement|accomplishment|success|award|recognition)\b/)) {
      updateContext('achievements');
      return botResponses.achievements;
    }
    
    // Quiz system with rotation
    if (lowerMsg.match(/\b(quiz|question|test|challenge|ask\s*me)\b/)) {
      updateContext('quiz');
      const quiz = botResponses.quiz.questions[currentQuizIndex];
      setCurrentQuizIndex((prev) => (prev + 1) % botResponses.quiz.questions.length);
      return quiz.q;
    }
    
    // Quiz answers (when user tries to answer)
    if (conversationContext.topics.includes('quiz') && 
        (lowerMsg.includes('rest') || lowerMsg.includes('graphql') || 
         lowerMsg.includes('let') || lowerMsg.includes('const') || 
         lowerMsg.includes('hook') || lowerMsg.includes('sql'))) {
      const quiz = botResponses.quiz.questions.find(q => 
        q.q.toLowerCase().includes('rest') && lowerMsg.includes('rest') ||
        q.q.toLowerCase().includes('let') && lowerMsg.includes('let') ||
        q.q.toLowerCase().includes('hook') && lowerMsg.includes('hook') ||
        q.q.toLowerCase().includes('sql') && lowerMsg.includes('sql')
      );
      return quiz ? quiz.a : "Great attempt! Want another tech question? Just ask for a 'quiz'! 🤓";
    }
    
    // Collaboration and teamwork
    if (lowerMsg.match(/\b(team|collaboration|work\s*with|agile|scrum|colleague)\b/)) {
      updateContext('collaboration');
      return botResponses.collaboration;
    }
    
    // Personal interests
    if (lowerMsg.match(/\b(interest|hobby|personal|passion|like|enjoy)\b/)) {
      updateContext('interests');
      return botResponses.interests;
    }
    
    // Contact information
    if (lowerMsg.match(/\b(contact|email|reach|linkedin|github|hire|opportunity)\b/)) {
      updateContext('contact');
      return botResponses.contact;
    }
    
    // Surprise content
    if (lowerMsg.match(/\b(surprise|cool|interesting|fun\s*fact|tell\s*me\s*something)\b/)) {
      updateContext('surprise');
      return botResponses.surprise[Math.floor(Math.random() * botResponses.surprise.length)];
    }
    
    // About the bot itself
    if (lowerMsg.match(/\b(who\s*are\s*you|what\s*are\s*you|about\s*you|your\s*name)\b/)) {
      return botResponses.personality[Math.floor(Math.random() * botResponses.personality.length)];
    }
    
    // Conversational responses
    if (lowerMsg.match(/\b(thank|thanks|appreciate|helpful|good|great|awesome)\b/)) {
      return "You're very welcome! 😊 I'm here to help showcase Nani's expertise. Is there anything specific you'd like to know more about?";
    }
    
    if (lowerMsg.match(/\b(bye|goodbye|see\s*you|later|exit)\b/)) {
      return "Thanks for chatting! 👋 Feel free to reach out to Nani directly for opportunities or collaborations. Have a great day! 🚀";
    }
    
    // Context-aware suggestions based on conversation history
    let contextualSuggestions = "";
    if (conversationContext.topics.length > 0) {
      const unaskedTopics = ['skills', 'projects', 'experience', 'achievements', 'collaboration'].filter(
        topic => !conversationContext.topics.includes(topic)
      );
      if (unaskedTopics.length > 0) {
        contextualSuggestions = `\n\nYou might also want to ask about: ${unaskedTopics.slice(0, 2).join(', ')}`;
      }
    }

    // Default with context awareness
    return botResponses.default + contextualSuggestions;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setBotMood("thinking");
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "You", text: message, timestamp: new Date() },
    ]);
    
    const userMessage = message;
    setMessage("");
    setIsBotTyping(true);
    
    // Enhanced response time based on complexity and context
    const wordCount = userMessage.split(' ').length;
    const isComplexQuery = userMessage.toLowerCase().includes('explain') || 
                          userMessage.toLowerCase().includes('how') || 
                          userMessage.toLowerCase().includes('why');
    const baseTime = isComplexQuery ? 1500 : 800;
    const thinkTime = Math.min(4000, baseTime + wordCount * 80);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      
      const isConfused = botResponse === botResponses.default;
      
      if (isConfused) {
        setBotMood("confused");
        setTimeout(() => setBotMood("happy"), 2000);
      } else {
        setBotMood("happy");
      }
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Bot", text: botResponse, timestamp: new Date() },
      ]);
      
      setIsBotTyping(false);
      
      // Auto-focus input after response
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 500);
    }, thinkTime);
  };

  const handleBotHover = () => {
    const newTop = Math.random() * 70 + 60;
    const newLeft = Math.random() * 70 + 60;
    setBotPosition({ top: newTop, left: newLeft });

    document.getElementById("botImage")?.classList.add("shake");
    setTimeout(() => {
      document.getElementById("botImage")?.classList.remove("shake");
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Enhanced quick action buttons with more options
  const quickActions = [
    { text: "Skills", action: () => setMessage("Tell me about technical skills") },
    { text: "Projects", action: () => setMessage("Show me some projects") },
    { text: "Experience", action: () => setMessage("What's the work experience?") },
    { text: "Quiz Me", action: () => setMessage("Give me a tech quiz") },
    { text: "Contact", action: () => setMessage("How can I contact Nani?") },
    { text: "Surprise", action: () => setMessage("surprise me with something cool") }
  ];

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${lightBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        

      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {matrixChars.map((column, colIndex) => (
          <div 
            key={colIndex}
            className="absolute font-mono text-green-400 text-sm"
            style={{
              left: `${column.x}px`,
              top: `${column.y}px`,
              opacity: column.opacity,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            {column.chars.slice(0, column.length).map((char, charIndex) => (
              <span 
  key={charIndex}
  style={{
    color: charIndex === 0 ? '#4ade80' : charIndex < 3 ? '#4ade80' : '#22c55e', // All green now
    textShadow: charIndex === 0 
      ? '0 0 8px #4ade80, 0 0 12px #4ade80'  // Changed white to green for first character
      : charIndex < 3 
        ? '0 0 5px #4ade80' 
        : '0 0 3px #22c55e',
    opacity: charIndex === 0 ? 1 : Math.max(0.7, 1 - (charIndex / column.length)),
    fontWeight: charIndex < 3 ? 'bold' : 'normal',
    filter: charIndex === 0 ? 'brightness(1.5) drop-shadow(0 0 2px #4ade80)' : 'none'
  }}
>
  {char}
</span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {matrixChars.map((column, colIndex) => (
          <div 
            key={colIndex}
            className="absolute font-mono text-green-400 text-sm"
            style={{
              left: `${column.x}px`,
              top: `${column.y}px`,
              opacity: column.opacity,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            {column.chars.slice(0, column.length).map((char, charIndex) => (
              <span 
                key={charIndex}
                style={{
                  color: charIndex === 0 ? '#fff' : charIndex < 3 ? '#4ade80' : '#16a34a',
                  textShadow: charIndex === 0 ? '0 0 5px #fff' : 'none'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Replace your current raindrop effect with this lighter version */}
<div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
  {raindrops.map((drop, index) => (
    <div
      key={index}
      className={`absolute transition-all duration-100 ease-linear ${
        drop.type === 'special' ? 'raindrop-special' : 'raindrop-normal'
      }`}
      style={{
        left: `${drop.x}%`,
        top: `${drop.y}%`,
        width: `${drop.size}px`,
        height: `${drop.size * 3}px`,
        opacity: drop.opacity * 0.7, // Further reduce opacity
        background: drop.type === 'special' 
          ? 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.3))'
          : 'linear-gradient(to bottom, transparent, rgba(148, 163, 184, 0.2))',
        borderRadius: '50%',
        transform: `rotate(${Math.sin(drop.x * 0.1) * 5}deg)`, // Less rotation
      }}
    />
  ))}
</div>

      {/* Glitch overlay for Konami effect */}
      {glitchEffect && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-cyan-400/10 animate-pulse"></div>
          <div className="absolute inset-0 bg-purple-400/10 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute inset-0 bg-yellow-400/10 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}

      <style>{`
        @keyframes bounceY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
          100% { transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.7; }
        }

  .raindrop-normal {
    animation: raindrop-fall 4s linear infinite;
  }

  .raindrop-special {
    animation: raindrop-fall 3.5s linear infinite;
  }

  @keyframes raindrop-fall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(20px) rotate(2deg);
      opacity: 0;
    }
  }

  /* Make the grid more visible by adjusting its opacity */
  .grid-overlay {
    opacity: 0.15 !important;
  }
        

        .shake { animation: shake 0.5s ease-in-out; }
        .botBounce { animation: bounceY 2s infinite ease-in-out; }
        .float { animation: float 3s ease-in-out infinite; }
        .glow { animation: glow 2s ease-in-out infinite; }
        .pulse { animation: pulse 2s infinite; }
        .sparkle { animation: sparkle 1.5s ease-in-out infinite; }

        .dancing-script-unique {
          font-family: "Dancing Script", cursive;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }

        .typing-indicator span {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #3b82f6;
          border-radius: 50%;
          margin-right: 3px;
          animation: bounce 1.5s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .gradient-border {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .konami-active {
          animation: rainbow 2s linear infinite;
        }

        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Enhanced Grid Overlay */}
      <div
  className="absolute inset-0 opacity-30 z-10 grid-overlay"
  style={{
    backgroundSize: "13px 13px", 
      backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.7) 1.5px, transparent 1.5px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 1.5px, transparent 1.5px)
      `,
  }}
/>


      {/* Enhanced Name and Title */}
      <div
        className={`fixed z-30 font-mono transition-all duration-700 ease-in-out ${
          scrollY > 100
            ? "top-5 left-5 text-left scale-75"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        } ${isKonamiActive ? "konami-active" : ""}`}
      >
        <h1
          className={`dancing-script-unique text-white ${
            scrollY > 100 ? "text-3xl" : "text-5xl md:text-6xl lg:text-7xl"
          } font-bold drop-shadow-xl backdrop-blur-md px-4 py-2 rounded-md glow`}
        >
          nani.chkhenkeli
        </h1>
        {scrollY <= 100 && (
          <div className="mt-2 text-black font-bold text-xl md:text-2xl">
            {titles[activeTitle].substring(0, characterIndex)}
            {showCursor && (
              <span className="inline-block w-3 h-6 bg-indigo-300 ml-1 sparkle"></span>
            )}
          </div>
        )}
        {scrollY <= 100 && (
          <div className="mt-4 text-center">
            <div className="text-sm text-white/70 mb-2">
              💡 Pro tip: Try the Konami code ↑↑↓↓←→←→BA
            </div>
            
          </div>
        )}
      </div>

      {/* Enhanced Scroll Down Arrow */}
      <div
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-90 hover:shadow-lg float"
      >
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-white/30 backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white transition-transform duration-300 ease-in-out hover:translate-y-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Simplified Chat Bot Button */}
      {showBot && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            botMood === "thinking" ? "animate-pulse" : 
            botMood === "confused" ? "shake" : 
            "botBounce"
          }`}
          style={{ top: `${botPosition.top}px`, left: `${botPosition.left}px` }}
        >
          <button
            onClick={() => setShowChat(true)}
            className="w-15 h-15 bg-transparent shadow-none p-0 border-none relative"
            onMouseEnter={handleBotHover}
          >
            <img
              id="botImage"
              src={bot2}
              alt="Bot"
              className="w-14 h-14 object-contain transition-transform duration-300 hover:scale-110"
            />
          </button>
        </div>
      )}

      {/* Enhanced Chat Window */}
{showChat && (
  <div className="fixed bottom-4 right-4 w-80 h-96 bg-gray-900 text-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-blue-500 p-1">
    <div className="bg-gray-900 rounded-lg h-full flex flex-col overflow-hidden">
      
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-white/50">
            <img src={bot2} alt="Bot" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium">AI Portfolio Assistant</span>
        </div>
        <button 
          onClick={() => setShowChat(false)}
          className="text-white hover:text-red-300 transition-colors hover:rotate-90 duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex flex-wrap gap-1">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="text-xs px-2 py-1 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-gray-800">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`px-3 py-2 rounded-lg max-w-[80%] ${
                msg.user === "You" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-md" 
                  : "bg-gray-700 text-white rounded-bl-none shadow-md border border-gray-600"
              }`}
            >
              <div className="text-sm whitespace-pre-line">{msg.text}</div>
              <div className={`text-xs mt-1 ${msg.user === "You" ? "text-blue-100" : "text-gray-400"}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isBotTyping && (
          <div className="mb-3 flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-gray-700 text-white rounded-bl-none shadow-md border border-gray-600">
              <div className="typing-indicator flex items-center space-x-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-700 bg-gray-900">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center"
        >
          <input
            ref={chatInputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about skills, projects, or try 'surprise me'..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isBotTyping}
          />
          <button
            type="submit"
            disabled={!message.trim() || isBotTyping}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300 ${
              !message.trim() || isBotTyping 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            }`}
          >
            {isBotTyping ? (
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default Hero;