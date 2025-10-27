// Vercel Serverless Function for fetching RSVPs
// Protected endpoint - requires authentication

import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple authentication check
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch all RSVPs from Firestore
    const snapshot = await db.collection('rsvps')
      .orderBy('submittedAt', 'desc')
      .get();

    const rsvps = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Calculate statistics
    const total = rsvps.length;
    const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
    const notAttendingCount = rsvps.filter(r => r.attending === 'no').length;
    const totalGuests = rsvps
      .filter(r => r.attending === 'yes')
      .reduce((sum, r) => sum + (r.guestCount || 0), 0);

    return res.status(200).json({
      success: true,
      rsvps,
      stats: {
        total,
        attending: attendingCount,
        notAttending: notAttendingCount,
        totalGuests
      }
    });

  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({
      error: 'Failed to fetch RSVPs',
      message: error.message
    });
  }
}
