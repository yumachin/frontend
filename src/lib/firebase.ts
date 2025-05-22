// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"  // ← 追加

const firebaseConfig = {
  apiKey: "AIzaSyBG298E-bUAveWzTmHiZIWv-kx77aYARpI",
  authDomain: "prog-battle.firebaseapp.com",
  projectId: "prog-battle",
  storageBucket: "prog-battle.firebasestorage.com",
  messagingSenderId: "1076553502793",
  appId: "1:1076553502793:web:2de54e578c6c59a426ef98",
  measurementId: "G-82742V42KZ"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app) // ← ここが必要！
// const analytics = getAnalytics(app)
