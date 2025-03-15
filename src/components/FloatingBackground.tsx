import React, { useState, useEffect } from 'react';

// This component creates the floating yarn and needle background effect
const FloatingBackground = ({ particleCount = 40 }) => {
interface Particle {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  type: string;
  size: number;
  opacity: number;
}

const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Create initial particles with random positions and properties
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      type: Math.random() > 0.5 ? '🪡' : '🧶',
      size: 25 + Math.random() * 25, // Size range: 25-50px
      opacity: 0.6 + Math.random() * 0.4 // Opacity range: 0.6-1
    }));
    
    setParticles(initialParticles);
    
    // Animation function to update particle positions
    const animate = () => {
      setParticles(prev => prev.map(particle => {
        // Calculate new positions with boundary checking
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        let newRotation = particle.rotation + particle.rotationSpeed;
        
        // Bounce off edges
        if (newX < 0 || newX > window.innerWidth - 40) {
          particle.speedX *= -1;
          newX = particle.x;
        }
        if (newY < 0 || newY > window.innerHeight - 40) {
          particle.speedY *= -1;
          newY = particle.y;
        }
        
        return {
          ...particle,
          x: newX,
          y: newY,
          rotation: newRotation
        };
      }));
    };
    
    // Start animation loop
    const intervalId = setInterval(animate, 50);
    
    // Handle window resize
    const handleResize = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: Math.min(particle.x, window.innerWidth - 40),
        y: Math.min(particle.y, window.innerHeight - 40)
      })));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up interval and event listener
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <div className="absolute inset-0 bg-black" />
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute select-none"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg)`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            transition: 'transform 0.05s linear',
            filter: 'brightness(1.2)',
            textShadow: '0 0 10px rgba(255,255,255,0.3)',
            zIndex: 1
          }}
        >
          {particle.type}
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;
