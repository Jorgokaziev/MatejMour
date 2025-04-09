
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ParallaxHero: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / windowSize.width;
      const y = e.clientY / windowSize.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [windowSize]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track device orientation for mobile devices
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const beta = (e.beta + 90) / 180;
        const gamma = (e.gamma + 90) / 180;
        setDeviceOrientation({ beta, gamma });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate parallax movement for each layer
  const getLayerStyle = (depth: number, additionalStyles = {}) => {
    const maxMovement = 50;
    const movement = maxMovement * depth;
    
    const isMobile = windowSize.width < 768;
    const x = isMobile ? deviceOrientation.gamma : mousePosition.x;
    const y = isMobile ? deviceOrientation.beta : mousePosition.y;
    
    const scrollEffect = scrollPosition * depth * 0.1;
    const hoverAmplifier = isHovering ? 1.3 : 1;
    
    return {
      transform: `
        translate(
          ${(x * movement - movement/2) * hoverAmplifier}px, 
          ${(y * movement - movement/2) * hoverAmplifier - scrollEffect}px
        )
        scale(${1 + depth * 0.05})
      `,
      transition: 'transform 0.05s ease-out',
      ...additionalStyles
    };
  };

  // Add subtle floating animation to elements
  const getFloatingAnimation = (speed: number, amplitude: number) => {
    return {
      animation: `floating ${speed}s ease-in-out infinite`,
      '@keyframes floating': {
        '0%': { transform: 'translateY(0px)' },
        '50%': { transform: `translateY(${amplitude}px)` },
        '100%': { transform: 'translateY(0px)' }
      }
    };
  };

  return (
    <div 
      ref={containerRef}
      className="parallax-container overflow-hidden relative h-screen"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ 
        perspective: '1000px',
      }}
    >
      {/* Sky/background layer - with subtle animation */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full"
        style={{
          ...getLayerStyle(0.2),
          backgroundImage: `url('/lovable-uploads/pozadi.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          filter: `brightness(${1 - scrollPosition * 0.001})`,
        }}
      />
      
      {/* Clouds layer - moved to left border */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full" 
        style={{
          ...getLayerStyle(0.3),
          zIndex: 2,
          opacity: 0.7,
          display: 'flex',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <img 
          src="/lovable-uploads/mraky.png" 
          alt="Mountains" 
          className="h-auto absolute bottom-0"
          style={{ 
            width: '110%', 
            left: '0',
            filter: 'brightness(1.05)',
            animation: 'breathe 15s ease-in-out infinite',
            objectFit: 'cover',
            objectPosition: 'left bottom'
          }}
        />
      </div>
      
      {/* Mountains layer with elevation effect */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.5),
          zIndex: 3,
          transform: `translateY(${scrollPosition * 0.15}px) scale(1.05)`,
        }}
      >
        <img 
          src="/lovable-uploads/7d60018e-e9bb-443e-aaeb-5e0e5d56f616.png" 
          alt="Mountains" 
          className="w-full h-auto absolute bottom-0"
          style={{ width: '105%' }}
        />
      </div>
      
      {/* Ground/soil layer */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.7),
          zIndex: 4,
          transform: `translateY(${scrollPosition * 0.25}px) scale(1.1)`,
        }}
      >
        <img 
          src="/lovable-uploads/6e4a4783-241e-447b-9d99-175c524e6ce3.png" 
          alt="Ground" 
          className="w-full h-auto absolute bottom-0"
          style={{ width: '110%' }}
        />
      </div>
      
      {/* Plants layer with natural movement */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.9),
          zIndex: 5,
          transform: `translateY(${scrollPosition * 0.4}px) scale(1.15)`,
        }}
      >
        <img 
          src="/lovable-uploads/4be30fba-6d9d-4442-9499-fd96e4dcacb3.png" 
          alt="Plants" 
          className="w-full h-full object-contain"
          style={{ 
            animation: 'sway 8s ease-in-out infinite',
            transformOrigin: 'bottom',
          }}
        />
      </div>
      
      {/* Particles/light effects */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full"
        style={{
          ...getLayerStyle(1.2),
          zIndex: 6,
          background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,233,196,0.15) 100%)',
          opacity: mousePosition.y < 0.5 ? 0.7 : 0.3,
        }}
      />

      {/* Meditation person (main subject) with peaceful glow */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.1, {
            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.3))',
          }),
          zIndex: 7,
          animation: 'float 6s ease-in-out infinite',
        }}
      >
        <div className="relative">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,223,126,0.2) 0%, rgba(255,213,79,0) 70%)',
              animation: 'pulse 4s ease-in-out infinite',
              filter: 'blur(15px)',
              transform: 'scale(2)',
            }}
          />
          
          <img 
            src="/lovable-uploads/1eff2d38-ec86-4cf7-a985-8c52d1ec795d.png" 
            alt="Meditation" 
            className="h-[60vh] object-contain"
            style={{
              animation: 'breathe 8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      
      {/* Logo layer - centered in background with subtle hover animation */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" 
        style={{
          ...getLayerStyle(0.05),
          zIndex: 3 // Moved to background by reducing z-index
        }}
      >
        
      </div>
      
      {/* Content overlay - interactive and responsive */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 p-8 text-center"
        style={{
          transform: `translateY(${Math.min(scrollPosition * 0.5, 50)}px)`,
          opacity: 1 - (scrollPosition * 0.003),
          transition: 'all 0.3s ease-out',
        }}
      >
        <div className="max-w-2xl mx-auto mb-8 backdrop-blur-sm bg-black/10 p-6 rounded-lg">
          <h1 
            className="text-4xl md:text-5xl font-bold text-wellness-yellow drop-shadow-lg mb-6"
            style={{
              animation: 'glow 3s ease-in-out infinite',
              textShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
            }}
          >
            Wellness & Masáže
          </h1>
          <p className="text-xl text-wellness-soft-yellow drop-shadow-md mb-8">
            Najděte vnitřní harmonii a obnovte svou energii prostřednictvím profesionálních masáží a terapií.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-wellness-gold hover:bg-wellness-yellow text-wellness-charcoal font-medium text-lg px-8"
              onClick={() => navigate('/business')}
              style={{
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              Naše Služby
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-wellness-gold text-wellness-gold hover:bg-wellness-gold/20 font-medium text-lg px-8"
              onClick={() => navigate('/register')}
              style={{
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
              }}
            >
              Stát se členem
            </Button>
          </div>
        </div>
      </div>

      {/* Using regular style tag without jsx property */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          
          @keyframes glow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
          }
          
          @keyframes sway {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            75% { transform: rotate(-1deg); }
          }
          
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(1deg); }
            75% { transform: translateY(5px) rotate(-1deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ParallaxHero;
