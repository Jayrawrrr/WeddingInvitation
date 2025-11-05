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
  FaStar,
  FaTshirt
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
      time: "4:00 PM",
      event: "Wedding Ceremony",
      location: "Garden Area",
      description: "Join us as we say 'I do'",
      icon: <FaRing />
    },
    {
      time: "5:00 PM",
      event: "Cocktail Hour & Photos",
      location: "Garden & Main House Area",
      description: "Enjoy drinks and mingle while photos are taken",
      icon: <FaGlassCheers />
    },
    {
      time: "6:00 PM",
      event: "Grand Entrance, First Dance & Speeches",
      location: "Tent Area",
      description: "Welcome the couple, first dance, and heartfelt words",
      icon: <FaMusic />
    },
    {
      time: "7:00 PM",
      event: "Buffet Dinner",
      location: "Tent Area",
      description: "Dinner is served",
      icon: <FaUtensils />
    },
    {
      time: "9:00 PM",
      event: "Send Off",
      location: "Main Entrance",
      description: "Help us send off the newlyweds!",
      icon: <FaCar />
    }
  ];

  const details = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Venue",
      content: "Savanna Farm Tagaytay",
      subtitle: "007 Barangay, Alfonso, Tagaytay"
    },
    {
      icon: <FaTshirt />,
      title: "Dress Code",
      content: "Formal and Semi Formal",
      subtitle: "Kindly choose from our palette below.",
      palette: ["#EFD4CB", "#DEA297", "#908556", "#947963", "#44352A"]
    },
    {
      icon: <FaGift />,
      title: "In lieu of gifts",
      content: "Your presence at our wedding is the only gift we truly require.",
      subtitle: "For those who insist on offering more, a fund towards our ongoing journey and future plans would be warmly accepted."
    },
    {
      icon: <FaCar />,
      title: "Parking",
      content: "Free on-site parking",
      subtitle: "Available for all guests"
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
                  <div className="date-number">7</div>
                  <div className="date-text">February 2026</div>
                  <div className="date-subtext">Saturday</div>
                </div>

                {/* Time */}
                <div>
                  <FaClock className="info-icon-main" />
                  <div className="time-main">4:00 PM</div>
                  <div className="time-secondary">Ceremony</div>
                  <div className="time-to">to 9:00 PM</div>
                  <div className="time-secondary">Send Off</div>
                </div>

                {/* Location */}
                <div>
                  <FaMapMarkerAlt className="info-icon-main" />
                  <div className="location-main">Savanna Farm</div>
                  <div className="location-main">Tagaytay</div>
                  <div className="location-subtext">007 Barangay, Alfonso, Tagaytay</div>
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
                    {detail.palette && (
                      <div className="palette-row">
                        {detail.palette.map((hex, i) => (
                          <span
                            key={i}
                            className="palette-swatch"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    )}
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
                  <p>Refrain from wearing jeans, shorts and any white attire.</p>
                </div>
                <div className="note-item">
                  <div className="note-bullet">•</div>
                  <p>We would love for you to join us in wearing colors from our palette.</p>
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
