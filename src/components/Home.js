import React, { useRef, useEffect } from 'react';
import '../App.css';

const Home = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When video comes into view, play it
          video.currentTime = 0;
          video.play().catch(err => {
            console.log('Play prevented:', err);
          });
        } else {
          // When video goes out of view, pause it
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5 // Trigger when 50% of video is visible
    });

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="home-section" id="home">
      <video 
        ref={videoRef}
        className="invitation-video" 
        muted 
        playsInline
        preload="auto"
      >
        <source src="/Keziah&Darwin.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Home;
