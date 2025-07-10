import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

const AudioManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize audio with a placeholder URL
    // In a real implementation, you would host your Indian flute audio file
    const audioUrl = 'https://www.soundjay.com/misc/sounds/nature-sounds.mp3'; // Placeholder
    
    soundRef.current = new Howl({
      src: [audioUrl],
      loop: true,
      volume: 0.3,
      autoplay: false,
      onload: () => {
        setIsLoaded(true);
      },
      onloaderror: () => {
        console.warn('Audio file could not be loaded. Using silent mode.');
        setIsLoaded(false);
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!soundRef.current || !isLoaded) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="audio-controls">
      <button
        onClick={toggleAudio}
        className={`audio-toggle ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        disabled={!isLoaded}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      
      {!isLoaded && (
        <div className="text-xs text-magical-bronze mt-2 text-center">
          Silent Mode
        </div>
      )}
    </div>
  );
};

export default AudioManager;