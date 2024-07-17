import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    
  apiKey: process.env.NEXT_PUBLIC_API__KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ,
  storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET ,
  messagingSenderId:process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBIQghokkkJ953P21FbXcFM9-hMcqgMkB8",
//   authDomain: "student-admission-form-ec46b.firebaseapp.com",
//   projectId: "student-admission-form-ec46b",
//   storageBucket: "student-admission-form-ec46b.appspot.com",
//   messagingSenderId: "201333155150",
//   appId: "1:201333155150:web:a665f31e54b4c2fa912a1f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app)
