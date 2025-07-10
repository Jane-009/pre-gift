import React, { useState, useEffect } from 'react';
import PhotoGallery from './PhotoGallery';
import MoonSection from './MoonSection';
import BookshelfSection from './BookshelfSection';

const MagicalLanding = ({ onLogout }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic background based on scroll
  const getBackgroundStyle = () => {
    const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
    const navyOpacity = Math.max(0, 1 - scrollProgress * 2);
    const silverOpacity = Math.max(0, Math.min(1, scrollProgress * 2 - 0.5));
    const lavenderOpacity = Math.max(0, scrollProgress - 0.5);
    const brownOpacity = Math.max(0, Math.min(0.3, scrollProgress * 0.6));
    
    return {
      background: `
        linear-gradient(135deg, 
          rgba(26, 26, 46, ${navyOpacity}) 0%, 
          rgba(22, 33, 62, ${navyOpacity * 0.8}) 25%, 
          rgba(229, 231, 235, ${silverOpacity}) 50%, 
          rgba(199, 184, 234, ${lavenderOpacity}) 75%, 
          rgba(60, 31, 26, ${brownOpacity}) 100%
        )
      `,
      transition: 'background 0.3s ease'
    };
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={getBackgroundStyle()}>
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="fixed top-4 right-4 z-50 glass-enhanced px-4 py-2 text-magical-bronze hover:text-magical-gold transition-colors duration-300"
      >
        Exit Realm
      </button>

      {/* Section 1: Moonlit Welcome */}
      <section className="section-container relative">
        <div className="text-center z-10 relative">
          {/* Animated stars background */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-magical-star rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif text-magical-moon mb-8 text-shadow-magical animate-fade-in">
            Welcome to Your
            <br />
            <span className="text-magical-bronze">Magical Journey</span>
          </h1>
          
          <div className="w-32 h-1 bg-gradient-bronze mx-auto mb-8 rounded-full animate-shimmer"></div>
          
          <p className="text-xl md:text-2xl text-magical-silver font-elegant max-w-2xl mx-auto leading-relaxed animate-slide-up">
            A timeless collection of memories, dreams, and moments crafted with love
          </p>
        </div>
        
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 16l-6-6h12l-6 6z"/>
          </svg>
        </div>
      </section>

      {/* Section 2: Moon Section */}
      <MoonSection />

      {/* Section 3: Photo Gallery */}
      <PhotoGallery />

      {/* Section 4: Bookshelf Section */}
      <BookshelfSection />

      {/* Section 5: Letters from the Past */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif text-magical-moon text-center mb-12 text-shadow-magical">
            Letters from the Past
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((letter) => (
              <div key={letter} className="glass-enhanced p-8 hover-float cursor-pointer">
                <div className="text-magical-bronze text-sm font-elegant mb-4">
                  Ancient Memory #{letter}
                </div>
                <div className="text-magical-silver font-elegant">
                  <p className="mb-4">
                    This is a placeholder for a beautiful memory or message. 
                    Click to reveal the hidden content within this magical letter.
                  </p>
                  <div className="text-magical-bronze text-sm">
                    ~ Written in starlight
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Cat's Corner */}
      <section className="section-container">
        <div className="text-center">
          <h2 className="text-5xl font-serif text-magical-moon mb-12 text-shadow-magical">
            Cat's Corner
          </h2>
          
          <div className="glass-enhanced p-12 max-w-lg mx-auto">
            <div className="w-32 h-32 bg-magical-bronze rounded-full mx-auto mb-6 animate-float opacity-80"></div>
            <h3 className="text-2xl font-serif text-magical-moon mb-4">
              Luna, the Magical Guardian
            </h3>
            <p className="text-magical-silver font-elegant">
              A mystical companion who watches over this sacred space, 
              wearing a collar made of moonbeams and starlight.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Final Message Room */}
      <section className="section-container">
        <div className="text-center">
          <h2 className="text-5xl font-serif text-magical-moon mb-12 text-shadow-magical">
            Final Message
          </h2>
          
          <div className="glass-enhanced p-12 max-w-2xl mx-auto">
            <div className="w-40 h-40 bg-magical-moon rounded-full mx-auto mb-8 animate-glow opacity-90"></div>
            <h3 className="text-3xl font-serif text-magical-moon mb-6">
              As the stars align...
            </h3>
            <p className="text-xl text-magical-silver font-elegant leading-relaxed">
              This magical journey was created with love, care, and countless hours of devotion. 
              Every pixel, every animation, every moment was crafted to bring joy to your heart.
            </p>
            <div className="mt-8 text-magical-bronze font-elegant">
              ~ Forever in the moonlight
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagicalLanding;