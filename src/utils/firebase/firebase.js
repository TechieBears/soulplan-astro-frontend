import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "soulplan-1.firebaseapp.com",
    projectId: "soulplan-1",
    storageBucket: "soulplan-1.firebasestorage.app",
    messagingSenderId: "788140167949",
    appId: "1:788140167949:web:172d2b95afb9ca5bbc5644",
    measurementId: "G-2KEYCCKWN9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


let messaging = null;
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
}

export { app, auth, messaging, getToken, onMessage };
