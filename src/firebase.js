import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1kJdnNlNl32KM4s1_VYK3snUtft9iN-E",

  authDomain:
    "aethrix-ai-9735f.firebaseapp.com",

  projectId: "aethrix-ai-9735f",

  storageBucket:
    "aethrix-ai-9735f.firebasestorage.app",

  messagingSenderId:
    "1083760398275",

  appId:
    "1:1083760398275:web:32d8bc75c3b7b294e4f776",

  measurementId: "G-5JLDWV9QQH",
}

const app =
  initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)