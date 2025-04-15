# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your Hotel Booking application.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Give your project a name (e.g., "Hotel Booking App")
4. Accept the Firebase terms
5. Configure Google Analytics (optional)
6. Click "Create Project"

## Step 2: Register Your Web App

1. On the Firebase project dashboard, click the web icon (</>) to add a web app
2. Give your app a nickname (e.g., "Hotel Booking Web")
3. Check "Also set up Firebase Hosting" if you want to use Firebase for hosting
4. Click "Register app"
5. You'll see your Firebase configuration. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Step 3: Update Your Firebase Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration

## Step 4: Enable Authentication Methods

1. In the Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Email/Password" authentication
3. Enable "Google" authentication:
   - Click on Google in the providers list
   - Toggle the "Enable" switch to on
   - Add your support email
   - Save the changes
4. (Optional) Enable other authentication methods like Facebook, etc.

## Step 5: Set up Google Authentication

For Google Authentication to work correctly:

1. Make sure your Firebase project has a proper support email configured
2. If you're developing locally, add the domain `localhost` to the Authorized domains list in the Firebase Authentication settings
3. For production, add your domain to the Authorized domains list

## Step 6: Test Your Application

1. Run your application with `npm start`
2. Try to register a new user with email/password
3. Try to sign in with an existing user with email/password
4. Test the Google sign-in functionality
5. Test the password reset functionality

## Optional: Set Up Firestore Database

If you want to store additional user information (like phone, address, etc.):

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose either production or test mode
4. Select a location for your database
5. Click "Enable"
6. Deploy the security rules in `firestore.rules` to secure your database:
   - Go to Firestore Database > Rules tab
   - Replace the default rules with the contents of your `firestore.rules` file
   - Click "Publish"

## Security Rules

Don't forget to set up proper security rules for your Firestore database. The provided `firestore.rules` file already includes rules for:

- Allowing users to read and write their own profile data
- Protecting hotel and booking data
- Implementing a basic structure for public vs. private data

## Additional Firebase Features

Consider using other Firebase features:

- **Firebase Storage**: For storing user profile pictures
- **Firebase Cloud Functions**: For backend logic
- **Firebase Hosting**: For deploying your application
- **Firebase Analytics**: For tracking user behavior

For more detailed information, visit the [Firebase Documentation](https://firebase.google.com/docs). 