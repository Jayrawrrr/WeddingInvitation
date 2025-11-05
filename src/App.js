import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Landing from './components/Landing';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  useEffect(() => {
    const tryPlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setShowPlayPrompt(false);
      } catch (err) {
        // Autoplay likely blocked; show manual play prompt
        setShowPlayPrompt(true);
      }
    };
    tryPlay();
  }, []);

  const handleManualPlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setShowPlayPrompt(false);
    } catch {
      // ignore
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Background Music */}
        <audio
          ref={audioRef}
          src="/BGMusic.mp3"
          loop
          preload="auto"
        />
        {showPlayPrompt && (
          <button
            onClick={handleManualPlay}
            style={{
              position: 'fixed',
              right: '16px',
              bottom: '16px',
              zIndex: 1000,
              background: '#8B1538',
              color: '#fff',
              border: 'none',
              borderRadius: '24px',
              padding: '10px 14px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}
          >
            Play Music
          </button>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/kd020726" element={<AdminLogin />} />
          <Route path="/kd020726/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
