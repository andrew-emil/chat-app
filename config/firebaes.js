// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDgezZFves533j9O8XJxgBM2dB7reLIBss",
	authDomain: "chatapp-213a9.firebaseapp.com",
	projectId: "chatapp-213a9",
	storageBucket: "chatapp-213a9.appspot.com",
	messagingSenderId: "951044386375",
	appId: "1:951044386375:web:054f35dacbb6cddc3d0b62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getFirestore(app)