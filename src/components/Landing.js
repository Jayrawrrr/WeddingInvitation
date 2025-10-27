import React from 'react';
import Navigation from './Navigation';
import Invitation from './Invitation';
import WeddingDetails from './WeddingDetails';
import RSVP from './RSVP';
import Gallery from './Gallery';
import './Landing.css';

const Landing = () => {
  console.log('Landing component rendering');
  return (
    <div className="landing-container" style={{ minHeight: '100vh', background: '#fff' }}>
      <Navigation />
      <Invitation />
      <div id="details" style={{ minHeight: '100vh' }}>
        <WeddingDetails />
      </div>
      <div id="rsvp" style={{ minHeight: '100vh' }}>
        <RSVP />
      </div>
      <div id="gallery" style={{ minHeight: '100vh' }}>
        <Gallery />
      </div>
    </div>
  );
};

export default Landing;
