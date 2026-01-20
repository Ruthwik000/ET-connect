# ImpactFlow - Deployment Guide

## Deploying to Vercel

### Prerequisites
- Vercel account
- Firebase project with Authentication and Firestore enabled

### Step 1: Configure Firebase (if not done already)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project "impactflow-1fb50"
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Enable Google (add support email)
4. Update Firestore Security Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /bookmarks/{bookmarkId} {
         allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Configure project settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**:
   In Vercel Dashboard → Project Settings → Environment Variables, add:
   
   ```
   VITE_FIREBASE_API_KEY=AIzaSyDg4sAAB18th0BGMTsd1dACwQTBO6n7g5I
   VITE_FIREBASE_AUTH_DOMAIN=impactflow-1fb50.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=impactflow-1fb50
   VITE_FIREBASE_STORAGE_BUCKET=impactflow-1fb50.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=973608934970
   VITE_FIREBASE_APP_ID=1:973608934970:web:d0d57e09c39708840c1f03
   VITE_FIREBASE_MEASUREMENT_ID=G-3NM0J42067
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Configure Firebase for Production

1. Add your Vercel domain to Firebase:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to "Authorized domains"
   - Example: `impactflow.vercel.app`

2. Update Google OAuth redirect URIs:
   - Go to Google Cloud Console
   - Navigate to APIs & Services → Credentials
   - Add your Vercel domain to authorized redirect URIs

### Step 4: Test Deployment

1. Visit your deployed URL
2. Test authentication:
   - Sign up with email
   - Sign in with Google
   - Complete survey
   - Edit profile
3. Verify data is saving to Firestore

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Ensure `.env` is in `.gitignore` (it is)
- Verify all dependencies are in `package.json`

### Authentication Not Working
- Verify Firebase authorized domains include your Vercel domain
- Check that environment variables are set in Vercel
- Ensure Firestore security rules are published

### 404 Errors on Routes
- Vercel.json is configured for SPA routing
- All routes should redirect to index.html

## Local Development

1. Copy `.env.example` to `.env`
2. Add your Firebase credentials
3. Run `npm install`
4. Run `npm run dev`

## Production URLs

- **Production**: https://your-app.vercel.app
- **Firebase Console**: https://console.firebase.google.com/project/impactflow-1fb50
