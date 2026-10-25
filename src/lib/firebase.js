// Firebase is optional: the app only turns on sign-in and cloud sync when the
// VITE_FIREBASE_* variables are set at build time (see .env.example / docs/FIREBASE.md).
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// When true, a new account must be activated by an admin (users/{uid}.access = true) before using the app.
export const requireAccess = env.VITE_REQUIRE_ACCESS === 'true';

// Contact shown to students whose account is waiting for activation.
export const contactInfo = env.VITE_CONTACT || '';
