// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDsNJMz8LsmN7i_aD7DYJsQ0_3LaLnY69c",
  authDomain: "waste-platform-92b18.firebaseapp.com",
  projectId: "waste-platform-92b18",
  storageBucket: "waste-platform-92b18.firebasestorage.app",
  messagingSenderId: "569591303413",
  appId: "1:569591303413:web:9f7932b0d12a79926509bc",
  measurementId: "G-T1VBXECN0L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Optional: Analytics (wrap in try/catch for SSR or unsupported browsers)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.warn("Firebase analytics not supported in this environment:", err);
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with long-polling (fixes 400/WebChannel issues)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
});
