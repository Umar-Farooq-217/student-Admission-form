import { initializeApp } from "firebase/app";
import {getDatabse} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API__KEY,
  authDomain: process.env.AUTH_DOMAIN ,
  projectId: process.env.PROJECT_ID ,
  storageBucket:process.env.STORAGE_BUCKET ,
  messagingSenderId:process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID 
};

const app = initializeApp(firebaseConfig);
export const db = getDatabse(app)
