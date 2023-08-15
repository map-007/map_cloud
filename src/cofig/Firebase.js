// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_KEY,
  authDomain: "map-cloud-394918.firebaseapp.com",
  projectId: "map-cloud-394918",
  storageBucket: "map-cloud-394918.appspot.com",
  messagingSenderId: "1079629040530",
  appId: "1:1079629040530:web:fb9fdcd1d6041134da0f4b",
  measurementId: "G-BG2ZJKLXK4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);