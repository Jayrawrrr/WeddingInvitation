import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaUtensils, FaHeart } from 'react-icons/fa';
import './RSVP.css';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    guestCount: 1,
    primaryGuestAge: '',
    additionalGuests: [],
    dietaryRestrictions: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'guestCount') {
      const count = Math.min(10, Math.max(1, parseInt(value, 10) || 1));
      setFormData(prev => {
        const additionalCount = Math.max(count - 1, 0);
        const updatedAdditionalGuests = Array.from({ length: additionalCount }, (_, index) => ({
          name: prev.additionalGuests[index]?.name || '',
          age: prev.additionalGuests[index]?.age || ''
        }));

        return {
          ...prev,
          guestCount: count,
          additionalGuests: updatedAdditionalGuests
        };
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrimaryAgeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      primaryGuestAge: value
    }));
  };

  const handleAdditionalGuestChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.additionalGuests];
      updated[index] = {
        ...(updated[index] || {}),
        [field]: value
      };

      return {
        ...prev,
        additionalGuests: updated
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const guestDetails = formData.attending === 'yes'
      ? [
          {
            label: 'Guest 1',
            name: formData.name.trim(),
            age: Number(formData.primaryGuestAge) || 0
          },
          ...formData.additionalGuests.map((guest, index) => ({
            label: `Guest ${index + 2}`,
            name: guest.name?.trim() || `Guest ${index + 2}`,
            age: Number(guest.age) || 0
          }))
        ]
      : [];

    const payload = {
      ...formData,
      guestCount: formData.attending === 'yes' ? formData.guestCount : 0,
      guestDetails
    };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('RSVP submission successful:', data);
        setIsSubmitted(true);
      } else {
        console.error('RSVP submission failed:', data.error);
        alert('Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (isSubmitted) {
    return (
      <div className="rsvp">
        <div className="section">
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="success-icon">
              <FaHeart />
            </div>
            <h1>Thank You!</h1>
            <p>Your RSVP has been received. We can't wait to celebrate with you!</p>
            <motion.button 
              className="back-button"
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Another RSVP
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="rsvp">
      <div className="section">
        <motion.div
          className="rsvp-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="rsvp-header" variants={itemVariants}>
            <h1 className="section-title">RSVP</h1>
            <p className="section-subtitle">Please respond by January 7, 2026</p>
          </motion.div>

          <motion.div className="rsvp-form-container" variants={itemVariants}>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="name" className="form-label">
                  <FaUser className="label-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="label-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter your email address"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="phone" className="form-label">
                  <FaPhone className="label-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              {/* Attending Field */}
              <motion.div className="form-group" variants={itemVariants}>
                <label className="form-label">Will you be attending? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">Yes, I'll be there!</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">Sorry, I can't make it</span>
                  </label>
                </div>
              </motion.div>

              {/* Guest Count & Details */}
              {formData.attending === 'yes' && (
                <>
                  <motion.div 
                    className="form-group" 
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="guestCount" className="form-label">
                      Number of Guests
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div 
                    className="form-group" 
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="primaryGuestAge" className="form-label">
                      Your Age *
                    </label>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                      Guest 1 is the person filling out this form. Please provide your age.
                    </p>
                    <input
                      type="number"
                      id="primaryGuestAge"
                      min="0"
                      max="120"
                      value={formData.primaryGuestAge}
                      onChange={(e) => handlePrimaryAgeChange(e.target.value)}
                      className="form-input"
                      required
                      placeholder="Enter your age"
                      style={{ maxWidth: '200px' }}
                    />
                  </motion.div>

                  {formData.additionalGuests.length > 0 && (
                    <motion.div 
                      className="form-group" 
                      variants={itemVariants}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="form-label">
                        Additional Guest Details *
                      </label>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                        Please provide the name and age for each additional guest (Guests 2-10)
                      </p>
                      {formData.additionalGuests.map((guest, index) => (
                        <motion.div 
                          key={`guest-${index + 2}`}
                          className="additional-guest-row"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ fontSize: '0.95rem' }}>
                              Guest {index + 2} Name *
                            </label>
                            <input
                              type="text"
                              value={guest.name}
                              onChange={(e) => handleAdditionalGuestChange(index, 'name', e.target.value)}
                              className="form-input"
                              placeholder={`Enter Guest ${index + 2} name`}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.95rem' }}>
                              Guest {index + 2} Age *
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="120"
                              value={guest.age}
                              onChange={(e) => handleAdditionalGuestChange(index, 'age', e.target.value)}
                              className="form-input"
                              placeholder="Enter age"
                              required
                              style={{ maxWidth: '200px' }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </>
              )}

              {/* Dietary Restrictions */}
              {formData.attending === 'yes' && (
                <motion.div 
                  className="form-group" 
                  variants={itemVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="dietaryRestrictions" className="form-label">
                    <FaUtensils className="label-icon" />
                    Dietary Restrictions
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Please let us know about any dietary restrictions or allergies"
                  />
                </motion.div>
              )}

              {/* Message */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="message" className="form-label">
                  Message for the Couple
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Share your excitement, well wishes, or any special message..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="submit-button"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="button-icon" />
                Send RSVP
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div className="rsvp-info" variants={itemVariants}>
            <div className="info-card">
              <h3>Need Help?</h3>
              <p>If you have any questions about the wedding or need to make changes to your RSVP, please contact us:</p>
              <div className="contact-info">
                <p><strong>Keziah:</strong> keziah.mecate@gmail.com | 09159810479</p>
                <p><strong>Darwin:</strong> cyatxi.dm@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RSVP;
