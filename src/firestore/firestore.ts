import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import data from '../../firebase_config.json';

if (data.isServer) {
    console.log(process.env.VITE_VERCEL_URL);
    console.log('Server');
    console.log(process.env.VITE_VERCEL_FIREBASE_API_KEY);
    initializeApp({
        apiKey: process.env.VITE_VERCEL_FIREBASE_API_KEY,
        authDomain: process.env.VITE_VERCEL_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_VERCEL_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_VERCEL_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_VERCEL_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_VERCEL_FIREBASE_APP_ID,
        measurementId: process.env.VITE_VERCEL_FIREBASE_MEASUREMENT_ID,
    });
} else {
    initializeApp({
        apiKey: data.apiKey,
        authDomain: data.authDomain,
        projectId: data.projectId,
        storageBucket: data.storageBucket,
        messagingSenderId: data.messagingSenderId,
        appId: data.appId,
        measurementId: data.measurementId,
    });
}

const firestore = getFirestore();

export { firestore };
