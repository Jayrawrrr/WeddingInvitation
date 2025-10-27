import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);

  const handleVideoEnd = () => {
    setShowOverlay(true);
  };

  const handleClick = () => {
    console.log('Click handler called, showOverlay:', showOverlay);
    if (showOverlay) {
      console.log('Setting showSecondVideo to true');
      setShowOverlay(false);
      setShowSecondVideo(true);
    }
  };

  const handleSecondVideoEnd = () => {
    navigate('/home');
  };

  useEffect(() => {
    console.log('useEffect triggered, showSecondVideo:', showSecondVideo, 'video ref:', secondVideoRef.current);
    if (showSecondVideo && secondVideoRef.current) {
      console.log('Attempting to play second video');
      secondVideoRef.current.load();
      secondVideoRef.current.play().catch(err => {
        console.log('Play prevented:', err);
      });
    }
  }, [showSecondVideo]);

  return (
    <div className="landing-page">
      {!showSecondVideo ? (
        <video 
          ref={videoRef}
          className="landing-video" 
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd}
        >
          <source src="/Landing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video 
          ref={secondVideoRef}
          className="landing-video second-video" 
          playsInline
          onEnded={handleSecondVideoEnd}
        >
          <source src="/1027.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {showOverlay && (
        <div className="invitation-overlay" onClick={handleClick}>
          <div className="invitation-content">
            <p className="subtitle-main">You're Cordially Invited</p>
            <p className="click-text">Click anywhere to enter</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
