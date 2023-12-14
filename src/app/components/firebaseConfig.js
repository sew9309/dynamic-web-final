import firebase from "firebase/compat/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "exercise-six-2023-sofiaw.firebaseapp.com",
    projectId: "exercise-six-2023-sofiaw",
    storageBucket: "exercise-six-2023-sofiaw.appspot.com",
    messagingSenderId: "1064215557337",
    appId: "1:1064215557337:web:421e9dd25f1169a6bbfac8",
    measurementId: "G-LB411GZFFG"
  };

  export const auth = firebaseConfig.auth;
  export default firebaseConfig;