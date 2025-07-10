import React from 'react';

const MoonSection = () => {
  return (
    <section className="section-container relative">
      {/* Animated background moon */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 bg-magical-moon rounded-full animate-glow opacity-60 shadow-2xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-magical-star rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="glass-enhanced p-12 max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-serif text-magical-text-light mb-8 text-shadow-magical">
          Moonlit Sanctuary
        </h2>
        
        <div className="w-24 h-1 bg-gradient-bronze mx-auto mb-8 rounded-full"></div>
        
        <div className="bg-magical-bg-warm bg-opacity-90 p-8 rounded-2xl mb-8">
          <p className="text-xl text-magical-text-dark font-elegant leading-relaxed">
            In this celestial space, time flows differently. Here, memories dance with starlight, 
            and every moment becomes eternal. The moon above watches over our shared journey, 
            illuminating the path we've traveled together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-magical-bg-cream bg-opacity-90 p-6 rounded-2xl border-2 border-magical-bronze border-opacity-30">
            <h3 className="text-magical-bronze font-serif text-xl mb-3 flex items-center">
              <span className="w-3 h-3 bg-magical-bronze rounded-full mr-2"></span>
              Timeless Moments
            </h3>
            <p className="text-magical-text-dark font-elegant text-sm leading-relaxed">
              Every second we've shared has been captured in moonbeams, 
              preserved forever in this sacred digital realm where love transcends time.
            </p>
          </div>
          
          <div className="bg-magical-bg-cream bg-opacity-90 p-6 rounded-2xl border-2 border-magical-bronze border-opacity-30">
            <h3 className="text-magical-bronze font-serif text-xl mb-3 flex items-center">
              <span className="w-3 h-3 bg-magical-bronze rounded-full mr-2"></span>
              Eternal Bond
            </h3>
            <p className="text-magical-text-dark font-elegant text-sm leading-relaxed">
              Like the moon that returns each night, our connection remains 
              constant, beautiful, and unwavering through every season of life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoonSection;