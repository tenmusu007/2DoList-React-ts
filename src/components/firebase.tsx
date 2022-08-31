// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDubrfk5sC90SlG_aEzhESf_eV71o25vLM",
	authDomain: "auth-practice-f03a5.firebaseapp.com",
	projectId: "auth-practice-f03a5",
	storageBucket: "auth-practice-f03a5.appspot.com",
	messagingSenderId: "509360953827",
	appId: "1:509360953827:web:014275f0bd203f4160e8d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
