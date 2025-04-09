
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ParallaxHero: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to window size
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax movement for each layer (more distant layers move less)
  const getLayerStyle = (depth: number) => {
    const maxMovement = 30; // maximum pixels to move
    const movement = maxMovement * depth;
    
    return {
      transform: `translate(${mousePosition.x * movement - movement/2}px, ${mousePosition.y * movement - movement/2}px)`,
    };
  };

  return (
    <div className="parallax-container">
      {/* Sky/background layer - moves least */}
      <div 
        className="parallax-layer flex items-center justify-center"
        style={{
          ...getLayerStyle(0.2),
          backgroundImage: `url('/lovable-uploads/48b6d244-aea5-44b4-b4d3-5b9fea472545.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />
      
      {/* Mountains layer */}
      <div 
        className="parallax-layer flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.4),
          zIndex: 2
        }}
      >
        <img 
          src="/lovable-uploads/7d60018e-e9bb-443e-aaeb-5e0e5d56f616.png" 
          alt="Mountains" 
          className="w-full h-auto absolute bottom-0"
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Ground/soil layer */}
      <div 
        className="parallax-layer flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.6),
          zIndex: 3
        }}
      >
        <img 
          src="/lovable-uploads/6e4a4783-241e-447b-9d99-175c524e6ce3.png" 
          alt="Ground" 
          className="w-full h-auto absolute bottom-0"
        />
      </div>
      
      {/* Plants layer */}
      <div 
        className="parallax-layer flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.8),
          zIndex: 4
        }}
      >
        <img 
          src="/lovable-uploads/4be30fba-6d9d-4442-9499-fd96e4dcacb3.png" 
          alt="Plants" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Meditation person (main subject) - moves most */}
      <div 
        className="parallax-layer flex items-center justify-center" 
        style={{
          ...getLayerStyle(0.1), // Subject moves very little
          zIndex: 5
        }}
      >
        <img 
          src="/lovable-uploads/1eff2d38-ec86-4cf7-a985-8c52d1ec795d.png" 
          alt="Meditation" 
          className="h-[60vh] object-contain"
        />
      </div>
      
      {/* Logo layer - fixed position */}
      <div 
        className="parallax-layer flex flex-col items-end justify-start p-8" 
        style={{
          ...getLayerStyle(0.05), // Logo barely moves
          zIndex: 6
        }}
      >
        <img 
          src="/lovable-uploads/c2954054-0d67-420a-a460-358eb322274e.png" 
          alt="MM Masáže a Terapie Logo" 
          className="w-64 h-auto lotus-logo"
        />
      </div>
      
      {/* Content overlay - static */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-8 text-center">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-wellness-yellow drop-shadow-lg mb-6">
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
            >
              Naše Služby
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-wellness-gold text-wellness-gold hover:bg-wellness-gold/20 font-medium text-lg px-8"
              onClick={() => navigate('/register')}
            >
              Stát se členem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
