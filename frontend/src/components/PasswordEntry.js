import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordEntry = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 4 + Math.random() * 4
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/verify-password`,
        { password }
      );

      if (response.data.valid) {
        onSuccess();
      } else {
        setError('Those aren\'t the magical words... Try again ✨');
        setPassword('');
      }
    } catch (err) {
      setError('Magic spell failed to connect... Try again ✨');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-magical flex items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Central moon */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 bg-magical-moon rounded-full animate-glow opacity-80"></div>
      </div>

      {/* Main content */}
      <div className="glass-enhanced p-12 max-w-md w-full mx-4 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-magical-moon mb-4 text-shadow-magical">
            Welcome, Traveler
          </h1>
          <div className="w-16 h-1 bg-gradient-bronze mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-magical-silver font-elegant leading-relaxed">
            To enter this sacred realm, you must speak the ancient words...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-magical-bronze text-sm font-elegant mb-3 uppercase tracking-wider">
              Enter Those 3 Magical Words
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-magical-dark bg-opacity-50 border-2 border-magical-bronze rounded-2xl text-magical-moon font-elegant text-center text-lg focus:outline-none focus:border-magical-gold focus:bg-opacity-70 transition-all duration-300"
              placeholder="Whisper the secret..."
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-300 text-sm font-elegant animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full btn-magical font-serif text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-magical-moon border-t-transparent rounded-full animate-spin mr-2"></div>
                Casting spell...
              </div>
            ) : (
              'Unlock the Magic ✨'
            )}
          </button>
        </form>

        <div className="mt-8 text-magical-bronze text-sm font-elegant">
          <p>Hint: What would you say to enter? 🌙</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-magical-bronze rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-10 right-10 w-12 h-12 bg-magical-gold rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-32 right-20 w-8 h-8 bg-magical-lavender rounded-full opacity-40 animate-twinkle"></div>
    </div>
  );
};

export default PasswordEntry;