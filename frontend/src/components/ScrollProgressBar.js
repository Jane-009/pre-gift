import React, { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-magical-dark bg-opacity-50 z-50">
      <div 
        className="h-full bg-gradient-bronze transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <div 
        className="absolute top-0 h-full w-2 bg-magical-gold rounded-full transition-all duration-300 ease-out"
        style={{ left: `${scrollProgress}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

export default ScrollProgressBar;