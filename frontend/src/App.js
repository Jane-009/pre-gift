import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PasswordEntry from './components/PasswordEntry';
import MagicalLanding from './components/MagicalLanding';
import AudioManager from './components/AudioManager';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('magical_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handlePasswordSuccess = () => {
    setShowTransition(true);
    localStorage.setItem('magical_auth', 'true');
    
    // Transition animation
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowTransition(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('magical_auth');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-magical flex items-center justify-center">
        <div className="loading-moon animate-float"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App cursor-magical">
        <AudioManager />
        
        {/* Transition overlay */}
        {showTransition && (
          <div className="fixed inset-0 z-50 bg-gradient-magical flex items-center justify-center transition-opacity duration-2000">
            <div className="text-center">
              <div className="w-32 h-32 bg-magical-moon rounded-full mx-auto mb-6 animate-glow"></div>
              <h2 className="text-4xl font-serif text-magical-moon animate-fade-in">
                Welcome to the Magical Realm...
              </h2>
            </div>
          </div>
        )}

        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/magical-journey" replace />
              ) : (
                <PasswordEntry onSuccess={handlePasswordSuccess} />
              )
            } 
          />
          <Route 
            path="/magical-journey" 
            element={
              isAuthenticated ? (
                <MagicalLanding onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;