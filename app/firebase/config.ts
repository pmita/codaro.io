import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_API_KEY}`,
  projectId: `${process.env.FIREBASE_API_KEY}`,
  storageBucket: `${process.env.FIREBASE_API_KEY}`,
  messagingSenderId: `${process.env.FIREBASE_API_KEY}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();