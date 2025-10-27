import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUtensils, 
  FaMusic,
  FaCamera,
  FaGift,
  FaCar,
  FaHeart,
  FaRing,
  FaGlassCheers,
  FaStar
} from 'react-icons/fa';
import './WeddingDetails.css';

const WeddingDetails = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const timeline = [
    {
      time: "3:00 PM",
      event: "Ceremony",
      location: "Garden Pavilion",
      description: "Join us as we say 'I do' in our beautiful garden ceremony",
      icon: <FaRing />
    },
    {
      time: "4:00 PM",
      event: "Cocktail Hour",
      location: "Rose Garden",
      description: "Enjoy drinks and appetizers while we take photos",
      icon: <FaGlassCheers />
    },
    {
      time: "5:30 PM",
      event: "Reception",
      location: "Grand Ballroom",
      description: "Dinner, dancing, and celebration",
      icon: <FaMusic />
    },
    {
      time: "11:00 PM",
      event: "Send-off",
      location: "Main Entrance",
      description: "Sparkler send-off to end our magical day",
      icon: <FaStar />
    }
  ];

  const details = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Venue",
      content: "Garden Manor Estate",
      subtitle: "123 Garden Way, Napa Valley, CA 94558"
    },
    {
      icon: <FaUtensils />,
      title: "Dress Code",
      content: "Cocktail Attire",
      subtitle: "Semi-formal with garden party vibes"
    },
    {
      icon: <FaGift />,
      title: "Registry",
      content: "Amazon & Bed Bath & Beyond",
      subtitle: "Your presence is the greatest gift, but if you'd like to give something, we're registered at..."
    },
    {
      icon: <FaCar />,
      title: "Parking",
      content: "Complimentary Valet",
      subtitle: "Free valet parking available at the main entrance"
    }
  ];

  return (
    <div className="wedding-details">
      <div className="section">
        <motion.div
          className="details-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="details-header" variants={itemVariants}>
            <h1 className="section-title">Wedding Details</h1>
            <p className="section-subtitle">Everything you need to know about our special day</p>
          </motion.div>

          {/* Main Event Info */}
          <motion.div className="main-event-info" variants={itemVariants}>
            <div className="event-info-container">

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', marginTop: '2rem' }}>
                {/* Date */}
                <div>
                  <FaCalendarAlt className="info-icon-main" />
                  <div className="date-number">15</div>
                  <div className="date-text">June 2024</div>
                  <div className="date-subtext">Saturday</div>
                </div>

                {/* Time */}
                <div>
                  <FaClock className="info-icon-main" />
                  <div className="time-main">3:00 PM</div>
                  <div className="time-secondary">Ceremony</div>
                  <div className="time-to">to 11:00 PM</div>
                  <div className="time-secondary">Reception</div>
                </div>

                {/* Location */}
                <div>
                  <FaMapMarkerAlt className="info-icon-main" />
                  <div className="location-main">Garden Manor</div>
                  <div className="location-main">Estate</div>
                  <div className="location-subtext">Napa Valley, CA</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div className="timeline-section" variants={itemVariants}>
            <h2 className="timeline-title">Wedding Timeline</h2>
            <div className="elegant-timeline">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item-elegant"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="timeline-icon">
                    {item.icon}
                  </div>
                  <div className="timeline-content-elegant">
                    <div className="timeline-time-elegant">{item.time}</div>
                    <h4 className="timeline-event">{item.event}</h4>
                    <p className="timeline-location-elegant">{item.location}</p>
                    <p className="timeline-description-elegant">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Details */}
          <motion.div className="additional-details" variants={itemVariants}>
            <h2 className="details-title">Important Information</h2>
            <div className="elegant-grid">
              {details.map((detail, index) => (
                <motion.div 
                  key={index}
                  className="elegant-detail-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="detail-icon-elegant">
                    {detail.icon}
                  </div>
                  <div className="detail-content-elegant">
                    <h4 className="detail-title-elegant">{detail.title}</h4>
                    <p className="detail-main-elegant">{detail.content}</p>
                    <p className="detail-sub-elegant">{detail.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Notes */}
          <motion.div className="special-notes" variants={itemVariants}>
            <div className="elegant-notes-card">
              <div className="notes-header">
                <div className="notes-icon">
                  <FaStar />
                </div>
                <h3 className="notes-title">Special Notes</h3>
              </div>
              <div className="notes-content">
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>Weather permitting, the ceremony will be held outdoors in our beautiful garden</p>
                </div>
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>We'll have a backup indoor ceremony space in case of rain</p>
                </div>
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>Please let us know of any dietary restrictions when you RSVP</p>
                </div>
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>Children are welcome! We'll have a kids' table with activities</p>
                </div>
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>Don't forget to bring your dancing shoes!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeddingDetails;
