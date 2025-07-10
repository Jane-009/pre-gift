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
          rgba(209, 213, 219, ${silverOpacity}) 50%, 
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
          
          <h1 className="text-6xl md:text-8xl font-serif text-magical-text-light mb-8 text-shadow-magical animate-fade-in">
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
          <h2 className="text-5xl font-serif text-magical-text-light text-center mb-12 text-shadow-magical">
            Letters from the Past
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "First Memory",
                content: "The day we first met, when time seemed to stand still and the world became a little more magical. Every glance, every word, every moment etched in starlight."
              },
              {
                id: 2,
                title: "Adventure Chronicles",
                content: "From spontaneous midnight drives to planned getaways, every adventure has been better with you by my side. Each journey a new chapter in our story."
              },
              {
                id: 3,
                title: "Secret Moments",
                content: "The quiet moments between us, the whispered secrets, the shared dreams that only we understand. These are the treasures that make life extraordinary."
              },
              {
                id: 4,
                title: "Future Dreams",
                content: "All the places we'll go, all the memories we'll make, all the dreams we'll chase together. The future is bright because you're in it."
              }
            ].map((letter) => (
              <div key={letter.id} className="glass-enhanced p-8 hover-float cursor-pointer group">
                <div className="text-magical-bronze text-sm font-elegant mb-4 flex items-center">
                  <span className="w-2 h-2 bg-magical-bronze rounded-full mr-2"></span>
                  {letter.title}
                </div>
                <div className="text-magical-text-dark font-elegant bg-magical-bg-warm bg-opacity-80 p-4 rounded-lg">
                  <p className="mb-4 leading-relaxed">
                    {letter.content}
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
          <h2 className="text-5xl font-serif text-magical-text-light mb-12 text-shadow-magical">
            Cat's Corner
          </h2>
          
          <div className="glass-enhanced p-12 max-w-lg mx-auto">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-gradient-bronze rounded-full mx-auto animate-float opacity-90 shadow-2xl"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-4 h-4 bg-magical-gold rounded-full animate-twinkle"></div>
              </div>
            </div>
            <h3 className="text-2xl font-serif text-magical-text-light mb-4">
              Luna, the Magical Guardian
            </h3>
            <div className="bg-magical-bg-warm bg-opacity-80 p-6 rounded-lg">
              <p className="text-magical-text-dark font-elegant leading-relaxed">
                A mystical companion who watches over this sacred space, 
                wearing a collar made of moonbeams and starlight. Luna knows 
                all our secrets and purrs approval at every memory we've made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final Message Room */}
      <section className="section-container">
        <div className="text-center">
          <h2 className="text-5xl font-serif text-magical-text-light mb-12 text-shadow-magical">
            Final Message
          </h2>
          
          <div className="glass-enhanced p-12 max-w-2xl mx-auto">
            <div className="w-40 h-40 bg-magical-moon rounded-full mx-auto mb-8 animate-glow opacity-90 shadow-2xl"></div>
            <h3 className="text-3xl font-serif text-magical-text-light mb-6">
              As the stars align...
            </h3>
            <div className="bg-magical-bg-warm bg-opacity-90 p-8 rounded-2xl">
              <p className="text-xl text-magical-text-dark font-elegant leading-relaxed mb-4">
                This magical journey was created with love, care, and countless hours of devotion. 
                Every pixel, every animation, every moment was crafted to bring joy to your heart.
              </p>
              <p className="text-lg text-magical-text-medium font-elegant">
                Thank you for being the magic in my life. 🌙
              </p>
            </div>
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