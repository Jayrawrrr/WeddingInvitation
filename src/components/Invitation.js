import React from 'react';
import { motion } from 'framer-motion';
import './Invitation.css';

const Invitation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="invitation-section" id="home">
      <div className="invitation-container">
        {/* Photo collage section with numbers */}
        <motion.div
          className="photo-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="photo-grid">
            {/* Photo 1 with "02" */}
            <motion.div className="photo-item" variants={itemVariants}>
              <div className="photo-wrapper">
                <img src="/kd1.jpg" alt="Keziah & Darwin" className="photo" />
                <motion.span 
                  className="number-overlay"
                  variants={numberVariants}
                >
                  02
                </motion.span>
              </div>
            </motion.div>

            {/* Photo 2 with "07" */}
            <motion.div className="photo-item" variants={itemVariants}>
              <div className="photo-wrapper">
                <img src="/kd2.jpg" alt="Keziah & Darwin" className="photo" />
                <motion.span 
                  className="number-overlay"
                  variants={numberVariants}
                >
                  07
                </motion.span>
              </div>
            </motion.div>

            {/* Photo 3 with "26" */}
            <motion.div className="photo-item" variants={itemVariants}>
              <div className="photo-wrapper">
                <img src="/kd3.jpg" alt="Keziah & Darwin" className="photo" />
                <motion.span 
                  className="number-overlay"
                  variants={numberVariants}
                >
                  26
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text section */}
        <motion.div
          className="text-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="welcome-text" variants={itemVariants}>
            WELCOME TO OUR WEDDING
          </motion.p>
          
          <motion.h1 className="names-text" variants={itemVariants}>
            Keziah & Darwin
          </motion.h1>
          
          <motion.p className="venue-text" variants={itemVariants}>
            SAVANNA FARM TAGAYTAY
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Invitation;
