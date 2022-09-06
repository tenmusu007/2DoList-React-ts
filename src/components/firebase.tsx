// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const apiKey: string | undefined = process.env.REACT_APP_APIKEY;
// const test  = {env}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_APIKEY,
	authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
	projectId: import.meta.env.VITE_APP_PROJECTID,
	storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGINSENDERID,
	appId: import.meta.env.VITE_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
