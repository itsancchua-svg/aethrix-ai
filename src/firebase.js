import { initializeApp } from "firebase/app"

import {
  getAuth,
} from "firebase/auth"

const firebaseConfig = {
  apiKey:
    "AIzaSyCXhXut1TBsVK6wc2GD2BKBm5-Jxmu6MhU",

  authDomain:
    "aethrix-ai.firebaseapp.com",

  projectId:
    "aethrix-ai",

  storageBucket:
    "aethrix-ai.firebasestorage.app",

  messagingSenderId:
    "349758228713",

  appId:
    "1:349758228713:web:a29785d80761fdf1fd4878",

  measurementId:
    "G-L4ZPJS7H9Z",
}

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)