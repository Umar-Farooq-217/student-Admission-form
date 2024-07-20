import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    
  apiKey:"AIzaSyBIQghokkkJ953P21FbXcFM9-hMcqgMkB8",
  authDomain: "student-admission-form-ec46b.firebaseapp.com",
  projectId: "student-admission-form-ec46b",
  storageBucket:"student-admission-form-ec46b.appspot.com",
  messagingSenderId: "201333155150",
  appId: "1:201333155150:web:a665f31e54b4c2fa912a1f" 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
