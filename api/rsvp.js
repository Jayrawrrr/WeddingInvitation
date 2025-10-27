// Vercel Serverless Function for RSVP submissions
// This handles RSVP form submissions and saves to Firebase

import admin from 'firebase-admin';

// Initialize Firebase Admin (credentials will be added via environment variables)
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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      attending,
      guestCount,
      dietaryRestrictions,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !attending) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create RSVP data object
    const rsvpData = {
      name,
      email,
      phone: phone || '',
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      dietaryRestrictions: dietaryRestrictions || '',
      message: message || '',
      submittedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firebase Firestore
    const docRef = await db.collection('rsvps').add(rsvpData);

    console.log('RSVP saved with ID:', docRef.id);

    return res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      id: docRef.id
    });

  } catch (error) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({
      error: 'Failed to submit RSVP',
      message: error.message
    });
  }
}
