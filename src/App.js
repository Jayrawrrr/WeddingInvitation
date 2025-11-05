import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Landing from './components/Landing';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function AppRoutes() {
  const audioRef = useRef(null);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only play music on /home
    if (location.pathname !== '/home') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setShowPlayPrompt(false);
      return;
    }

    const tryPlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setShowPlayPrompt(false);
      } catch (err) {
        setShowPlayPrompt(true);
      }
    };
    tryPlay();
  }, [location.pathname]);

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
      <div className="App">
        {/* Background Music (only on /home) */}
        {location.pathname === '/home' && (
          <>
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
          </>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/kd020726" element={<AdminLogin />} />
          <Route path="/kd020726/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
