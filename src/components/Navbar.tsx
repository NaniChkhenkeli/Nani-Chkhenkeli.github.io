import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pixel outline animation frames
  const pixelFrames = [
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 25% 0%, 25% 25%, 50% 25%, 50% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 50%, 75% 50%, 75% 75%, 100% 75%, 100% 100%, 75% 100%, 75% 75%, 50% 75%, 50% 100%, 25% 100%, 25% 75%, 0% 75%, 0% 50%, 25% 50%, 25% 25%, 0% 25%)",
    "polygon(0% 0%, 20% 0%, 20% 20%, 40% 20%, 40% 0%, 60% 0%, 60% 20%, 80% 20%, 80% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%, 100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 80% 100%, 80% 80%, 60% 80%, 60% 100%, 40% 100%, 40% 80%, 20% 80%, 20% 100%, 0% 100%, 0% 80%, 20% 80%, 20% 60%, 0% 60%, 0% 40%, 20% 40%, 20% 20%, 0% 20%)"
  ];

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className="relative flex items-center justify-center px-8 py-3"
        style={{
          background: "rgba(20, 20, 40, 0.8)",
          backdropFilter: "blur(10px)",
          border: "2px solid #8b5cf6",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.5), inset 0 0 8px rgba(139, 92, 246, 0.3)",
          clipPath: "polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%)"
        }}
      >
        {/* Animated pixel border for desktop */}
        <div 
          className="absolute inset-0 hidden md:block"
          style={{
            clipPath: pixelFrames[0],
            background: "transparent",
            border: "2px solid rgba(139, 92, 246, 0.5)",
            animation: "pixelBorderAnimation 2s infinite alternate",
            pointerEvents: "none"
          }}
        ></div>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            const isHovered = hoverItem === item.name;
            
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
                className={`relative font-bold text-sm py-1 px-3 transition-all duration-300 ${isActive ? 'text-white' : 'text-purple-200'}`}
                style={{
                  textShadow: isActive || isHovered ? "0 0 5px rgba(139, 92, 246, 0.8)" : "none",
                  letterSpacing: "1px"
                }}
              >
                {/* Pixel highlight for active/hovered items */}
                {(isActive || isHovered) && (
                  <span 
                    className="absolute inset-0 -z-10"
                    style={{
                      background: isActive ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.1)",
                      clipPath: "polygon(0% 0%, 90% 0%, 100% 35%, 100% 100%, 10% 100%, 0% 65%)"
                    }}
                  ></span>
                )}
                
                {/* Pixel dot indicator for active item */}
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-300"
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    }}
                  ></span>
                )}
                
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white p-2 relative"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)",
              background: isOpen ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.5)"
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div 
          className="md:hidden mt-2 flex flex-col items-center"
          style={{
            background: "rgba(20, 20, 40, 0.9)",
            backdropFilter: "blur(10px)",
            border: "2px solid #8b5cf6",
            animation: "dropdownAppear 0.3s forwards",
            clipPath: "polygon(0% 0%, 100% 0%, 95% 90%, 90% 100%, 10% 100%, 5% 90%, 0% 80%)"
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`font-bold text-sm py-3 px-8 w-full text-center transition-all ${isActive ? 'text-white bg-purple-900/30' : 'text-purple-200 hover:bg-purple-900/20'}`}
                style={{
                  borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                  textShadow: isActive ? "0 0 5px rgba(139, 92, 246, 0.8)" : "none",
                  clipPath: isActive ? "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)" : "none"
                }}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes pixelBorderAnimation {
          0% { clip-path: ${pixelFrames[0]}; }
          50% { clip-path: ${pixelFrames[1]}; }
          100% { clip-path: ${pixelFrames[2]}; }
        }
        @keyframes dropdownAppear {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;