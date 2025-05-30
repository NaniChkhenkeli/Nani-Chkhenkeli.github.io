import lightBg from "../components/images/7.jpg";
import gifBg from "../components/images/1.gif";
import { useState, useEffect, useRef } from "react";
import { Mail, Github, MessageSquare, Send, X, Linkedin } from "lucide-react";

interface ContactMethod {
  id: string;
  title: string;
  value: string;
  link?: string | null;
  icon: JSX.Element;
}

const contactMethods: ContactMethod[] = [
  {
    id: "email",
    title: "Email",
    value: "chkhenkelinani@gmail.com",
    link: "mailto:chkhenkelinani@gmail.com",
    icon: <Mail size={18} />,
  },
  {
    id: "github",
    title: "GitHub",
    value: "NaniChkhenkeli",
    link: "https://github.com/NaniChkhenkeli",
    icon: <Github size={18} />,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "Nani Chkhenkeli",
    link: "https://www.linkedin.com/in/nani-chkhenkeli-98a1612a4",
    icon: <Linkedin size={18} />,
  }
];

const Contact = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [currentInput, setCurrentInput] = useState<string | null>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [pixels, setPixels] = useState<Array<{x: number, y: number, color: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Generate random pixels for background
  useEffect(() => {
    const newPixels = [];
    for (let i = 0; i < 100; i++) {
      newPixels.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#4f46e5', '#9333ea', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 4)]
      });
    }
    setPixels(newPixels);
  }, []);

  // Handle form submission simulation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setShowModal(false);
        setFormState({ name: "", email: "", message: "" });
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Auto focus the current input
  useEffect(() => {
    if (currentInput === 'message' && messageRef.current) {
      messageRef.current.focus();
    }
  }, [currentInput]);

  return (
    <section
  id="contact"
  className="py-10 px-6 relative overflow-hidden min-h-screen"
  style={{
    backgroundImage: `url(${lightBg}), url(${gifBg})`,
    backgroundSize: '35% 100%, 65% 100%',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'left top, right top',
    backgroundAttachment: 'fixed, fixed'
  }}
>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Random pixel spots in background */}
      {pixels.map((pixel, i) => (
        <div 
          key={i}
          className="absolute"
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: pixel.color,
            top: `${pixel.y}%`,
            left: `${pixel.x}%`,
            opacity: 0.4,
          }}
        />
      ))}
          
      {/* Pixel Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
  backgroundSize: '13px 13px',
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)
  `,
  zIndex: 1
}}></div>
      
      <div className="container max-w-3xl relative z-10 mr-20 ml-auto" ref={containerRef}>
        {/* Main Contact Container with Glitch Effect */}
        <div className={`
          relative border-4 border-gray-800 bg-white p-8 
          shadow-[8px_8px_0_0_#333] transition-all duration-75
          ${glitchEffect ? 'glitch-container' : ''}
        `}>
          {/* Decorative CRT scan line */}
          <div className="absolute left-0 right-0 h-px bg-black opacity-20 scan-line"></div>
          
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-r-4 border-b-4 border-gray-800"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-l-4 border-b-4 border-gray-800"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-r-4 border-t-4 border-gray-800"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-l-4 border-t-4 border-gray-800"></div>

          {/* Terminal-style header */}
          <header className="border-b-2 border-gray-800 pb-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm mr-6"></div>
              <div className="h-6 bg-gray-200 flex-1 font-mono text-xs flex items-center justify-center border border-gray-300">
                contact_module.exe
              </div>
            </div>
            
            <h2 className="font-mono text-3xl md:text-4xl text-gray-800 mb-2 uppercase pixel-text text-center tracking-wide">
              <span className="text-indigo-600">{"<"}</span>
              Contact Me
              <span className="text-indigo-600">{">"}</span>
            </h2>
            
            <div className="w-full h-2 relative mb-4">
              <div className="absolute inset-0 bg-gray-300"></div>
              <div className="absolute top-0 left-0 h-full bg-indigo-600 loading-bar"></div>
            </div>
            
            <p className="font-mono text-gray-700 text-sm text-center terminal-text">
              <span className="text-green-600">$</span> initiating_contact_protocols...
            </p>
          </header>

          {/* Interactive Contact Cards - THIS IS THE CONTACT CARD SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {contactMethods.map(({ id, title, value, link, icon }) => (
              <div
                key={id}
                onMouseEnter={() => setHoveredItem(id)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseDown={() => setActiveItem(id)}
                onMouseUp={() => setActiveItem(null)}
                onClick={() => link && window.open(link, id !== "email" ? "_blank" : undefined)}
                className={`
                  relative p-4 border-2 border-gray-800 cursor-pointer
                  transition-all duration-150 transform h-40
                  ${hoveredItem === id ? 'bg-indigo-100 scale-105' : 'bg-white'}
                  ${activeItem === id ? 'translate-y-1 border-b-2 shadow-inner' : 'shadow-[4px_4px_0_0_#333]'}
                `}
              >
                {/* Pixel corner decorations */}
                <div className="absolute w-2 h-2 bg-gray-800 top-0 left-0"></div>
                <div className="absolute w-2 h-2 bg-gray-800 top-0 right-0"></div>
                <div className="absolute w-2 h-2 bg-gray-800 bottom-0 left-0"></div>
                <div className="absolute w-2 h-2 bg-gray-800 bottom-0 right-0"></div>
                
                {/* Icon with animated hover */}
                <div className={`
                  mx-auto mb-4 w-12 h-12 flex items-center justify-center
                  ${hoveredItem === id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} 
                  transition-colors duration-300
                `}>
                  {icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-1">{title}</h3>
                  <div className="font-mono text-sm overflow-hidden relative">
                    {link ? (
                      <span className="text-indigo-600 inline-flex items-center justify-center">
                        {value}
                        {hoveredItem === id && (
                          <span className="ml-1">→</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-800">{value}</span>
                    )}
                  </div>
                </div>
                
                {/* Selection indicator */}
                {hoveredItem === id && (
                  <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-4 h-4">
                    <div className="pixel-arrow-down"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Retro Form Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="
                px-8 py-3 bg-indigo-600
                text-white font-mono uppercase tracking-wider text-sm
                transition-all relative retro-btn 
                hover:bg-indigo-700 focus:outline-none
              "
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">Send Message</span>
                <Send size={16} />
              </span>
            </button>
          </div>

          {/* Pixel footer */}
          <footer className="mt-12 border-t-2 border-gray-300 pt-6 text-center">
            <div className="pixel-art-footer mb-4">
              {Array(2).fill(0).map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                  {Array(16).fill(0).map((_, i) => {
                    const colors = ['blue', 'indigo', 'purple', 'violet'];
                    return (
                      <div 
                        key={i} 
                        className={`p ${colors[Math.floor(Math.random() * colors.length)]}`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <p className="font-mono text-xs text-gray-600 flex items-center justify-center">
              <span className="block h-2 w-2 bg-green-500 mr-2 blink-slow"></span>
              © {new Date().getFullYear()} Nani Chkhenkeli
            </p>
          </footer>
        </div>
      </div>
      
      {/* Contact Form Modal with Pixel Art Style */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => !isSubmitting && setShowModal(false)}></div>
          <div className="relative bg-white border-4 border-gray-800 shadow-[8px_8px_0_0_#333] max-w-md w-full p-6 z-10">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-2">
              <h3 className="font-mono text-lg text-gray-800">
                <span className="text-indigo-600">{">"}</span> New Message
              </h3>
              
              <button 
                onClick={() => !isSubmitting && setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center border-2 border-gray-800 hover:bg-red-100"
                disabled={isSubmitting}
              >
                <X size={16} />
              </button>
            </div>
            
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="font-mono text-lg text-gray-800 mb-2">Message Sent!</h4>
                <p className="font-mono text-sm text-gray-600">Thank you for your message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  {/* Name Input */}
                  <div>
                    <label className="block font-mono text-xs text-gray-700 mb-1" htmlFor="name">NAME:</label>
                    <div 
                      className={`border-2 ${currentInput === 'name' ? 'border-indigo-600' : 'border-gray-800'}`}
                      onClick={() => setCurrentInput('name')}
                    >
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full px-3 py-2 font-mono text-sm bg-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-xs text-gray-700 mb-1" htmlFor="email">EMAIL:</label>
                    <div 
                      className={`border-2 ${currentInput === 'email' ? 'border-indigo-600' : 'border-gray-800'}`}
                      onClick={() => setCurrentInput('email')}
                    >
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full px-3 py-2 font-mono text-sm bg-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Message Textarea */}
                  <div>
                    <label className="block font-mono text-xs text-gray-700 mb-1" htmlFor="message">MESSAGE:</label>
                    <div 
                      className={`border-2 ${currentInput === 'message' ? 'border-indigo-600' : 'border-gray-800'}`}
                      onClick={() => setCurrentInput('message')}
                    >
                      <textarea
                        id="message"
                        ref={messageRef}
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                        className="w-full px-3 py-2 font-mono text-sm bg-white focus:outline-none h-32 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="
                      px-8 py-3 bg-indigo-600
                      text-white font-mono uppercase tracking-wider text-sm
                      transition-all relative retro-btn
                      hover:bg-indigo-700 focus:outline-none
                      disabled:bg-gray-400
                    "
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">SENDING</span>
                          <span className="loading-dots"></span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">SEND</span>
                          <Send size={16} />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
            
            {/* Pixel corners */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-gray-800"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-gray-800"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-800"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-800"></div>
          </div>
        </div>
      )}
      
      {/* Advanced CSS for pixel effects */}
      <style jsx>{`
        .pixel-text {
          text-shadow: 2px 2px 0 #4f46e5;
          letter-spacing: 2px;
        }
        
        .pixel-art-footer {
          display: grid;
          grid-template-rows: repeat(2, 4px);
        }
        
        .row {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          height: 4px;
        }
        
        .p {
          width: 100%;
          height: 100%;
        }
        
        .blue { background-color: #3b82f6; }
        .indigo { background-color: #4f46e5; }
        .purple { background-color: #9333ea; }
        .violet { background-color: #8b5cf6; }
        
        .pixel-arrow-down {
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #4f46e5;
        }
        
        .retro-btn:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.1),
            rgba(255,255,255,0.1) 10px,
            transparent 10px,
            transparent 20px
          );
        }
        
        .retro-btn:after {
          content: '';
          position: absolute;
          left: 4px;
          bottom: -4px;
          width: calc(100% - 4px);
          height: 4px;
          background-color: #3730a3;
        }
        
        .retro-btn:active {
          transform: translateY(4px);
        }
        
        .retro-btn:active:after {
          bottom: 0;
          height: 0;
        }
        
        .blink-slow {
          animation: blinkSlow 2s infinite;
        }
        
        @keyframes blinkSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        .loading-bar {
          width: 20%;
          animation: loadingAnimation 2s infinite;
        }
        
        @keyframes loadingAnimation {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        
        .scan-line {
          animation: scanLine 8s linear infinite;
        }
        
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        
        .terminal-text:after {
          content: '|';
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .loading-dots:after {
          content: '';
          animation: loadingDots 1.5s infinite;
        }
        
        @keyframes loadingDots {
          0% { content: '.'; }
          33% { content: '..'; }
          66% { content: '...'; }
        }
        
        .glitch-container {
          animation: glitch 150ms linear;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;