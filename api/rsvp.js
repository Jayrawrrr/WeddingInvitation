// Vercel Serverless Function for RSVP submissions
// This handles RSVP form submissions and saves to Firebase

const admin = require('firebase-admin');

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

module.exports = async function handler(req, res) {
  // Support POST (create) and DELETE (remove)
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // DELETE: remove RSVP by id (admin only)
    if (req.method === 'DELETE') {
      const authHeader = req.headers.authorization;
      if (authHeader !== 'Bearer authenticated') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const id = req.query?.id || req.body?.id;
      if (!id) {
        return res.status(400).json({ error: 'Missing RSVP id' });
      }
      await db.collection('rsvps').doc(id).delete();
      return res.status(200).json({ success: true, message: 'RSVP deleted', id });
    }

    // POST: create RSVP
    const {
      name,
      email,
      phone,
      attending,
      guestCount,
      guestDetails,
      primaryGuestAge,
      additionalGuests,
      dietaryRestrictions,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !attending) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const normalizedGuestCount = attending === 'yes'
      ? Math.min(10, Math.max(1, Number(guestCount) || 1))
      : 0;

    let normalizedGuestDetails = [];

    if (attending === 'yes') {
      if (Array.isArray(guestDetails) && guestDetails.length > 0) {
        normalizedGuestDetails = guestDetails
          .slice(0, normalizedGuestCount)
          .map((guest, index) => ({
            label: guest?.label || `Guest ${index + 1}`,
            name: guest?.name || '',
            age: typeof guest?.age === 'number' ? guest.age : Number(guest?.age) || 0,
            isPrimary: index === 0
          }));
      } else {
        const fallbackDetails = [
          {
            label: 'Guest 1',
            name,
            age: Number(primaryGuestAge) || 0,
            isPrimary: true
          },
          ...(Array.isArray(additionalGuests) ? additionalGuests : []).map((guest, index) => ({
            label: `Guest ${index + 2}`,
            name: guest?.name || '',
            age: Number(guest?.age) || 0,
            isPrimary: false
          }))
        ];

        normalizedGuestDetails = fallbackDetails.slice(0, normalizedGuestCount);
      }
    }

    // Create RSVP data object
    const rsvpData = {
      name,
      email,
      phone: phone || '',
      attending,
      guestCount: normalizedGuestCount,
      guestDetails: normalizedGuestDetails,
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
