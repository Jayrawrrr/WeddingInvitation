# Wedding Invitation - Setup Instructions

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable Firestore Database:
   - Go to "Firestore Database" in the left menu
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a location for your database
   - Click "Enable"

### 2. Create a Service Account

1. Go to Project Settings (gear icon)
2. Click on the "Service Accounts" tab
3. Click "Generate new private key"
4. Download the JSON file and save it securely (you'll need its contents)

### 3. Get Your Firebase Credentials

From the downloaded JSON file, you'll need:
- `project_id`
- `client_email`
- `private_key` (keep all the quotes and newlines)

## Vercel Deployment

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Add Environment Variables

In your Vercel project settings, add these environment variables:

```
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_CLIENT_EMAIL=your_client_email_here
FIREBASE_PRIVATE_KEY=your_private_key_here
ADMIN_USERNAME=keziah_darwin
ADMIN_PASSWORD=kd020726
```

**Important**: For `FIREBASE_PRIVATE_KEY`, you need to:
1. Copy the entire private key including the quotes
2. Replace all newlines with `\n` (literally type `\n`)
3. For example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"`

### 4. Deploy

```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Testing Locally

To test the Firebase integration locally before deploying:

1. Create a `.env.local` file in the root directory:

```
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_CLIENT_EMAIL=your_client_email_here
FIREBASE_PRIVATE_KEY=your_private_key_here
ADMIN_USERNAME=keziah_darwin
ADMIN_PASSWORD=kd020726
```

2. Run the development server:

```bash
npm start
```

## Admin Access

- **Login URL**: `https://yourdomain.com/kd020726`
- **Default Username**: `keziah_darwin`
- **Default Password**: `kd020726`

⚠️ **Change these credentials by updating the environment variables in Vercel!**

## Testing the Flow

1. Visit your site at the root URL (`/`)
2. Fill out an RSVP form as a guest
3. Check in Firebase Console that the RSVP was saved in the `rsvps` collection
4. Visit `/kd020726` and log in
5. View all RSVPs in the dashboard

## Troubleshooting

### RSVP submissions not saving
- Check that Firebase credentials are correct in Vercel
- Check Vercel logs for API function errors
- Verify Firestore rules allow writes (they should by default in production mode)

### Admin dashboard not loading
- Check that the auth token is in localStorage
- Verify the API endpoint `/api/rsvps` is working
- Check browser console for errors

### Firebase initialization errors
- Ensure `FIREBASE_PRIVATE_KEY` has newlines escaped as `\n`
- Verify all environment variables are set in Vercel

## Structure

```
wedding-invitation/
├── api/
│   ├── rsvp.js          # Handles RSVP submissions
│   ├── login.js         # Admin authentication
│   └── rsvps.js         # Fetches all RSVPs
├── src/
│   ├── components/
│   │   ├── AdminLogin.js
│   │   ├── AdminDashboard.js
│   │   ├── RSVP.js
│   │   └── ...
│   └── App.js
└── SETUP_INSTRUCTIONS.md
```

## Next Steps

1. Set up Firebase following the steps above
2. Add environment variables to Vercel
3. Deploy the site
4. Test the RSVP form and admin dashboard
5. Share your wedding invitation URL with guests!

🎉 Congratulations on setting up your wedding invitation system!
