// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'

import { getAnalytics } from 'firebase/analytics'

import { getFirestore } from 'firebase/firestore'

import { getAuth } from 'firebase/auth'

import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyC3rc29SQoO0Vx36SppNBUcD4aCp5fUwAg',

  authDomain: 'team-10-sg250815064105.firebaseapp.com',

  projectId: 'team-10-sg250815064105',

  storageBucket: 'team-10-sg250815064105.firebasestorage.app',

  messagingSenderId: '202422768680',

  appId: '1:202422768680:web:36fc1b2af772a69504511d',

  measurementId: 'G-Q0V3M49SG0',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)

const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)
