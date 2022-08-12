import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import environment from '../config/environment';

const isInitialized = firebase.getApps().length > 0;

if (!isInitialized) {
  firebase.initializeApp({
    apiKey: environment.FIREBASE_API_KEY,
    authDomain: environment.FIREBASE_AUTH_DOMAIN,
    projectId: environment.FIREBASE_PROJECT_ID,
    storageBucket: environment.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
    appId: environment.FIREBASE_APP_ID,
  });
}

const app = firebase.getApp();
export const firestore = getFirestore(app);
