// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'

import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

import { getFirestore } from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB9Ilvf0yOz70yCqyDUzPTNL3UjSnpcWBo",
  authDomain: "inv8-77414.firebaseapp.com",
  projectId: "inv8-77414",
  storageBucket: "inv8-77414.firebasestorage.app",
  messagingSenderId: "262708431691",
  appId: "1:262708431691:web:b2f431fa5ef0c4834ff6ce",
  measurementId: "G-99QBGX5QFL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)

let analytics: Analytics | null = null

if (typeof window !== 'undefined' && import.meta.env.PROD) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app)
      }
    })
    .catch(() => {
      analytics = null
    })
}

const db = getFirestore(app)

const storage = getStorage(app)

// Export Firebase services
export { db, storage, analytics }
