import React, { useEffect, useRef } from 'react';

const MagicalParticles = ({ count = 30, color = '#fbbf24' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'magical-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.8 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: magicalFloat ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * -10}s;
      `;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Add keyframe animation if not already added
    if (!document.getElementById('magical-particles-style')) {
      const style = document.createElement('style');
      style.id = 'magical-particles-style';
      style.textContent = `
        @keyframes magicalFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(5px) translateX(-15px) scale(0.9);
            opacity: 1;
          }
          75% { 
            transform: translateY(-10px) translateX(5px) scale(1.1);
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [count, color]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};

export default MagicalParticles;