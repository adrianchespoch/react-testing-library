// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // // dev/prod
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// // // Testing

// Initialize Firebase
export const FirebaeApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaeApp);
export const FirebaseDB = getFirestore(FirebaeApp);

// ===================================================
// // // testnig + env + vite
// console.log(import.meta.env);
// console.log(process.env);
// NODE_ENV: 'test',

// const env = getEnvironments();
// console.log(env);
