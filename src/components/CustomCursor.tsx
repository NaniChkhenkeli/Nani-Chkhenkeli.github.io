// CustomCursor.tsx - Component to add to your project
import React, { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

type CursorState = 'default' | 'hover' | 'click' | 'disabled' | 'text';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [trails, setTrails] = useState<Trail[]>([]);
  const followerPosition = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize trail system
    const initialTrails: Trail[] = Array(8).fill(null).map((_, index) => ({
      id: index,
      x: 0,
      y: 0,
      opacity: 0
    }));
    setTrails(initialTrails);

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Update trails with delay
      setTrails(prevTrails => 
        prevTrails.map((trail, index) => ({
          ...trail,
          x: newPosition.x,
          y: newPosition.y,
          opacity: Math.max(0, 1 - (index * 0.12))
        }))
      );

      // Handle magnetic elements
      handleMagneticElements(e);
    };

    const handleMouseDown = () => {
      setCursorState('click');
      createParticles(mousePosition.x, mousePosition.y);
    };

    const handleMouseUp = () => {
      setCursorState('default');
    };

    // Setup hover listeners
    setupHoverListeners();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Animate follower cursor
  useEffect(() => {
    const animate = () => {
      if (followerRef.current) {
        followerPosition.current.x += (mousePosition.x - followerPosition.current.x) * 0.1;
        followerPosition.current.y += (mousePosition.y - followerPosition.current.y) * 0.1;
        
        followerRef.current.style.left = `${followerPosition.current.x}px`;
        followerRef.current.style.top = `${followerPosition.current.y}px`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [mousePosition]);

  const handleMagneticElements = (e: MouseEvent) => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach((element: Element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 120) {
        const strength = (120 - distance) / 120;
        const deltaX = (e.clientX - centerX) * strength * 0.15;
        const deltaY = (e.clientY - centerY) * strength * 0.15;
        
        (element as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else {
        (element as HTMLElement).style.transform = 'translate(0px, 0px)';
      }
    });
  };

  const setupHoverListeners = () => {
    // Buttons
    const buttons = document.querySelectorAll('button, .btn, .cursor-hover');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        setCursorState((btn as HTMLButtonElement).disabled ? 'disabled' : 'hover');
      });
      btn.addEventListener('mouseleave', () => {
        setCursorState('default');
      });
    });

    // Text inputs
    const inputs = document.querySelectorAll('input[type="text"], textarea, .text-input');
    inputs.forEach(input => {
      input.addEventListener('mouseenter', () => {
        setCursorState('text');
      });
      input.addEventListener('mouseleave', () => {
        setCursorState('default');
      });
    });

    // Links
    const links = document.querySelectorAll('a, .link');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        setCursorState('hover');
      });
      link.addEventListener('mouseleave', () => {
        setCursorState('default');
      });
    });
  };

  const createParticles = (x: number, y: number) => {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(59, 130, 246, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        left: ${x}px;
        top: ${y}px;
      `;
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / 6;
      const velocity = 3;
      
      const animation = particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${Math.cos(angle) * 40}px, ${Math.sin(angle) * 40}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      animation.onfinish = () => particle.remove();
    }
  };

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`cursor-main cursor-${cursorState}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      {/* Follower Cursor */}
      <div
        ref={followerRef}
        className={`cursor-follower cursor-follower-${cursorState}`}
      />
      
      {/* Trail System */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: trail.opacity,
            transform: `scale(${1 - trail.id * 0.1})`,
            transitionDelay: `${trail.id * 20}ms`
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;