import { useEffect, useState, useCallback } from "react";

const AdvancedLoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('init');
  const [scanLine, setScanLine] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [pixelGrid, setPixelGrid] = useState([]);
  const [particles, setParticles] = useState([]);
  const [waveOffset, setWaveOffset] = useState(0);
  const [matrixRain, setMatrixRain] = useState([]);
  const [hologramFlicker, setHologramFlicker] = useState(false);
  const [dataStreams, setDataStreams] = useState([]);
  const [circuitLines, setCircuitLines] = useState([]);

  const messages = [
    "INITIALIZATION..."
    
  ];

  // Initialize all visual elements
  useEffect(() => {
    // Pixel grid
    const gridSize = 50;
    const newGrid = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      active: Math.random() > 0.85,
      brightness: Math.random(),
      color: Math.random() > 0.8 ? 'cyan' : 'white',
    }));
    setPixelGrid(newGrid);

    // Particles
    const newParticles = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random(),
      direction: Math.random() * Math.PI * 2,
    }));
    setParticles(newParticles);

    // Matrix rain
    const newMatrixRain = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (i * 2.5) % 100,
      drops: Array.from({ length: 15 }, () => ({
        y: Math.random() * 100,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        speed: Math.random() * 2 + 1,
        opacity: Math.random(),
      })),
    }));
    setMatrixRain(newMatrixRain);

    // Data streams
    const newDataStreams = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 45) % 360,
      radius: 100 + Math.random() * 50,
      speed: Math.random() * 2 + 1,
      data: Array.from({ length: 20 }, () => Math.random().toString(36).substr(2, 1)),
    }));
    setDataStreams(newDataStreams);

    // Circuit lines
    const newCircuitLines = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      path: generateCircuitPath(),
      progress: 0,
      speed: Math.random() * 0.02 + 0.01,
    }));
    setCircuitLines(newCircuitLines);
  }, []);

  const generateCircuitPath = () => {
    const points = [];
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    
    for (let i = 0; i < 6; i++) {
      points.push({ x, y });
      x += (Math.random() - 0.5) * 30;
      y += (Math.random() - 0.5) * 30;
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));
    }
    return points;
  };

  // Main loading sequence with more sophisticated timing
  useEffect(() => {
    const sequence = async () => {
      setTimeout(() => setPhase('loading'), 800);
      
      const progressSteps = [
        { target: 12, delay: 1200, message: 0 },
        { target: 28, delay: 1800, message: 1 },
        { target: 45, delay: 1400, message: 2 },
        { target: 63, delay: 1600, message: 3 },
        { target: 81, delay: 1300, message: 4 },
        { target: 94, delay: 1100, message: 5 },
        { target: 100, delay: 900, message: 6 },
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        setProgress(step.target);
        setCurrentMessage(step.message);
        
        // Trigger various effects
        if (Math.random() > 0.6) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }
        
        if (Math.random() > 0.7) {
          setHologramFlicker(true);
          setTimeout(() => setHologramFlicker(false), 100);
        }
      }

      setTimeout(() => {
        setPhase('complete');
        setTimeout(() => {
          setPhase('fadeout');
          setTimeout(() => onFinished?.(), 1500);
        }, 2000);
      }, 1000);
    };

    sequence();
  }, [onFinished]);

  // Advanced animations
  useEffect(() => {
    const animationFrame = () => {
      // Scanline
      setScanLine(prev => (prev + 0.8) % 100);
      
      // Wave effect
      setWaveOffset(prev => prev + 2);
      
      // Particle movement
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed * 0.1) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed * 0.1) % 100,
        opacity: 0.3 + Math.sin(Date.now() * 0.005 + particle.id) * 0.3,
      })));

      // Matrix rain
      setMatrixRain(prev => prev.map(column => ({
        ...column,
        drops: column.drops.map(drop => ({
          ...drop,
          y: (drop.y + drop.speed * 0.5) % 110,
          char: Math.random() > 0.98 ? String.fromCharCode(0x30A0 + Math.random() * 96) : drop.char,
          opacity: Math.max(0.1, drop.opacity + (Math.random() - 0.5) * 0.1),
        })),
      })));

      // Circuit lines
      setCircuitLines(prev => prev.map(line => ({
        ...line,
        progress: (line.progress + line.speed) % 1,
      })));
    };

    const interval = setInterval(animationFrame, 50);
    return () => clearInterval(interval);
  }, []);

  // Pixel grid with more sophisticated behavior
  useEffect(() => {
    const gridInterval = setInterval(() => {
      setPixelGrid(prev => prev.map(pixel => ({
        ...pixel,
        active: Math.random() > (0.88 - progress * 0.002),
        brightness: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.9 ? (Math.random() > 0.5 ? 'cyan' : 'lime') : 'white',
      })));
    }, 150);
    return () => clearInterval(gridInterval);
  }, [progress]);

  return (
    <div className={`fixed inset-0 z-50 bg-gray-900 overflow-hidden transition-all duration-1500 ${phase === 'fadeout' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} ${glitchActive ? 'animate-pulse' : ''} select-none`}>
      
      {/* Enhanced Pixel Grid Background */}
      <div className="absolute inset-0 grid grid-cols-50 gap-0 opacity-25">
        {pixelGrid.map(pixel => (
          <div
            key={pixel.id}
            className={`w-full h-full transition-all duration-300 ${
              pixel.active 
                ? pixel.color === 'cyan' 
                  ? 'bg-cyan-400' 
                  : pixel.color === 'lime' 
                    ? 'bg-lime-400' 
                    : 'bg-white'
                : 'bg-transparent'
            }`}
            style={{ 
              opacity: pixel.active ? pixel.brightness * 0.4 : 0,
              boxShadow: pixel.active && pixel.color !== 'white' ? `0 0 2px ${pixel.color === 'cyan' ? '#00ffff' : '#00ff00'}` : 'none'
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: '0 0 4px #00ffff',
              transform: `scale(${0.5 + particle.opacity * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {matrixRain.map(column => (
          <div key={column.id} className="absolute" style={{ left: `${column.x}%`, width: '2%' }}>
            {column.drops.map((drop, i) => (
              <div
                key={i}
                className="absolute text-green-400 font-mono text-xs"
                style={{
                  top: `${drop.y}%`,
                  opacity: drop.opacity,
                  textShadow: '0 0 2px #00ff00',
                }}
              >
                {drop.char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {circuitLines.map(line => (
          <g key={line.id}>
            <polyline
              points={line.path.map(p => `${p.x * window.innerWidth / 100},${p.y * window.innerHeight / 100}`).join(' ')}
              fill="none"
              stroke="#00ffff"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx={line.path[Math.floor(line.progress * (line.path.length - 1))]?.x * window.innerWidth / 100}
              cy={line.path[Math.floor(line.progress * (line.path.length - 1))]?.y * window.innerHeight / 100}
              r="3"
              fill="#00ffff"
              opacity={Math.sin(line.progress * Math.PI * 2) * 0.5 + 0.5}
            />
          </g>
        ))}
      </svg>

      {/* Enhanced CRT Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-0.5 bg-white opacity-40 transition-all duration-75 ease-linear"
          style={{ 
            top: `${scanLine}%`,
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-5 bg-repeat-y" 
             style={{ 
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 3px)',
               backgroundSize: '100% 3px'
             }} />
        
        {/* Hologram flicker */}
        {hologramFlicker && (
          <div className="absolute inset-0 bg-cyan-400 opacity-10 animate-ping" />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col">
        
        {/* Top Content - Enhanced */}
        <div className="flex-1 flex flex-col items-center justify-center font-mono pt-16">
          <div className="mb-12 text-center relative">
            
            {/* Main Title with Advanced Effects */}
            <div className="text-7xl font-bold text-cyan-400 mb-6 relative">
              <span className={`${glitchActive ? 'animate-bounce' : ''} drop-shadow-lg`} style={{
                filter: `hue-rotate(${waveOffset}deg)`,
              }}>
                Loading
              </span>
              {glitchActive && (
                <>
                  <div className="absolute inset-0 text-7xl font-bold text-red-400 opacity-70 transform translate-x-1 translate-y-1">
                    Loading
                  </div>
                  <div className="absolute inset-0 text-7xl font-bold text-blue-400 opacity-70 transform -translate-x-1 -translate-y-1">
                    Loading
                  </div>
                </>
              )}
            </div>
            
            {/* Enhanced Loading Dots */}
            <div className="flex justify-center space-x-3 mb-8">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: ((progress + i * 10) % 100) > 50 ? '#00ffff' : '#1f2937',
                    opacity: ((progress + i * 10) % 100) > 50 ? 1 : 0.3,
                    boxShadow: ((progress + i * 10) % 100) > 50 ? '0 0 8px #00ffff' : 'none',
                    transform: `scale(${((progress + i * 10) % 100) > 50 ? 1.2 : 0.8})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Progress Section */}
          <div className="w-[500px] mb-12">
            <div className="text-cyan-400 text-xl font-bold mb-6 text-center" style={{
              textShadow: '0 0 10px #00ffff',
              filter: hologramFlicker ? 'blur(1px)' : 'none',
            }}>
              {messages[currentMessage]}
            </div>
            
            <div className="relative mb-4">
              {/* Progress Bar Background */}
              <div className="w-full h-10 bg-gray-800 border-2 border-cyan-400 relative overflow-hidden" style={{
                boxShadow: 'inset 0 0 10px rgba(0,255,255,0.3), 0 0 20px rgba(0,255,255,0.2)',
              }}>
                {/* Animated Progress Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-40"
                    style={{
                      transform: `translateX(${Math.sin(waveOffset * 0.1) * 50}px)`,
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
                
                {/* Progress bar glow effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full border-cyan-400 border-2" style={{
                    boxShadow: 'inset 0 0 20px rgba(0,255,255,0.3)',
                  }} />
                </div>
              </div>
              
              {/* Progress Percentage */}
              <div className="text-center mt-4 text-cyan-400 font-bold text-2xl" style={{
                textShadow: '0 0 10px #00ffff',
              }}>
                {Math.round(progress)}%
              </div>
            </div>

            {/* Data Stream Visualization */}
            <div className="flex justify-center space-x-2 opacity-60">
              {dataStreams.slice(0, 6).map(stream => (
                <div key={stream.id} className="text-xs font-mono text-cyan-400">
                  {stream.data.slice(0, 8).join('')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Cube */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-56">
          <div className="relative h-full">
            <div className="absolute w-full h-full bg-cyan-400 opacity-10 rounded-full " />
            <AdvancedCubeGrid progress={progress} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .grid-cols-50 {
          grid-template-columns: repeat(50, minmax(0, 1fr));
        }
        
        @keyframes advancedFlicker {
          0%, 97%, 100% { opacity: 1; }
          98% { opacity: 0.95; }
          99% { opacity: 0.92; }
        }
        
        body {
          animation: advancedFlicker 0.2s infinite linear;
        }

        .perspective-3d {
          perspective: 1200px;
        }

        .transform-preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes advancedScale {
          0%, 20% { transform: scale3d(0.98, 0.98, 0.98) rotateX(15deg) rotateY(15deg); }
          50% { transform: scale3d(1.05, 1.05, 1.05) rotateX(-5deg) rotateY(-5deg); }
          80%, 100% { transform: scale3d(0.2, 0.2, 0.2) rotateX(45deg) rotateY(45deg); }
        }

        
      `}</style>
    </div>
  );
};

const AdvancedCubeGrid = ({ progress }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 0, z: 0 });
  const size = 9;
  const count = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.3,
        y: prev.y + 0.5,
        z: prev.z + 0.1,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const generateAdvancedCubes = () => {
    return Array.from({ length: count * count * count }, (_, i) => {
      const x = (i % count) * size - ((count - 1) / 2) * size;
      const y = (Math.floor(i / count) % count) * size - ((count - 1) / 2) * size;
      const z = (Math.floor(i / (count * count))) * size - ((count + 1) / 2) * size;

      const delay = Math.random() * 2000;
      const duration = 800 + Math.random() * 1200;

      return (
        <div
          key={i}
          className="absolute transform-preserve-3d"
          style={{
            transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`
          }}
        >
          <div
            className="transform-preserve-3d"
            style={{
              animation: `advancedScale ${duration}ms ${delay}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate, cubeGlow 2s ease-in-out infinite alternate`,
            }}
          >
            <AdvancedCube size={size * 0.95} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full perspective-3d transform-preserve-3d">
      <div className="w-full h-full relative transform-preserve-3d">
        <div
          className="w-full h-full transform-preserve-3d"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
          }}
        >
          {generateAdvancedCubes()}
        </div>
      </div>
    </div>
  );
};

const AdvancedCube = ({ size }) => {
  const colors = [
    "rgba(0, 255, 255, 0.8)", // Front - Cyan
    "rgba(0, 200, 255, 0.6)", // Back - Blue
    "rgba(0, 255, 200, 0.7)", // Right - Teal
    "rgba(0, 150, 255, 0.5)", // Left - Deep Blue
    "rgba(100, 255, 255, 0.9)", // Top - Light Cyan
    "rgba(0, 100, 200, 0.4)"   // Bottom - Dark Blue
  ];
  const halfSize = size / 2;

  return (
    <div className="transform-preserve-3d relative">
      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute border border-cyan-400"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `inset 0 0 ${size/4}px rgba(0,255,255,0.3), 0 0 ${size/2}px rgba(0,255,255,0.1)`,
            transform: [
              `rotateX(0deg) translateZ(${halfSize}px)`,
              `rotateX(180deg) translateZ(${halfSize}px)`,
              `rotateX(90deg) translateZ(${halfSize}px)`,
              `rotateX(-90deg) translateZ(${halfSize}px)`,
              `rotateY(90deg) translateZ(${halfSize}px)`,
              `rotateY(-90deg) translateZ(${halfSize}px)`
            ][i]
          }}
        />
      ))}
    </div>
  );
};

export default AdvancedLoadingScreen;