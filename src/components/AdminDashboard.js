import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaTimesCircle, FaSignOutAlt, FaUser, FaEnvelope, FaPhone, FaUtensils, FaComment } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState([]);
  const [stats, setStats] = useState({ total: 0, attending: 0, notAttending: 0, totalGuests: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token || token !== 'authenticated') {
      navigate('/kd020726');
      return;
    }

    fetchRSVPs();
  }, [navigate]);

  const fetchRSVPs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/rsvps', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setRsvps(data.rsvps);
        setStats(data.stats);
      } else {
        setError('Failed to fetch RSVPs');
      }
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      setError('Failed to load RSVPs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/kd020726');
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>RSVP Dashboard</h1>
          <p>Manage your wedding RSVPs</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaUsers className="stat-icon" />
          <div>
            <h3>{stats.total}</h3>
            <p>Total Responses</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card attending"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaCheckCircle className="stat-icon" />
          <div>
            <h3>{stats.attending}</h3>
            <p>Attending</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card not-attending"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaTimesCircle className="stat-icon" />
          <div>
            <h3>{stats.notAttending}</h3>
            <p>Not Attending</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card guests"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaUsers className="stat-icon" />
          <div>
            <h3>{stats.totalGuests}</h3>
            <p>Total Guests</p>
          </div>
        </motion.div>
      </div>

      {/* RSVP List */}
      <div className="rsvps-section">
        <h2>All RSVPs ({rsvps.length})</h2>
        {error && <div className="error-banner">{error}</div>}
        
        {rsvps.length === 0 ? (
          <div className="no-rsvps">
            <p>No RSVPs yet. When guests submit their RSVPs, they'll appear here.</p>
          </div>
        ) : (
          <div className="rsvp-list">
            {rsvps.map((rsvp, index) => (
              <motion.div
                key={rsvp.id}
                className={`rsvp-card ${rsvp.attending === 'yes' ? 'attending' : 'not-attending'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="rsvp-header">
                  <div>
                    <h3>{rsvp.name}</h3>
                    <p>{formatDate(rsvp.submittedAt)}</p>
                  </div>
                  <span className={`status-badge ${rsvp.attending}`}>
                    {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                  </span>
                </div>

                <div className="rsvp-details">
                  {rsvp.email && (
                    <div className="detail-item">
                      <FaEnvelope /> {rsvp.email}
                    </div>
                  )}
                  {rsvp.phone && (
                    <div className="detail-item">
                      <FaPhone /> {rsvp.phone}
                    </div>
                  )}
                  {rsvp.attending === 'yes' && rsvp.guestCount > 1 && (
                    <div className="detail-item">
                      <FaUsers /> {rsvp.guestCount} Guests
                    </div>
                  )}
                  {rsvp.dietaryRestrictions && (
                    <div className="detail-item">
                      <FaUtensils /> Dietary: {rsvp.dietaryRestrictions}
                    </div>
                  )}
                  {rsvp.message && (
                    <div className="detail-item message">
                      <FaComment /> {rsvp.message}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
