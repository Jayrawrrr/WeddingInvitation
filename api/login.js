// Vercel Serverless Function for Admin Login
// Simple authentication with hardcoded credentials

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Hardcoded credentials (you can change these)
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'keziah_darwin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kd020726';

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token: 'authenticated' // Simple token for session
      });
    } else {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
}
