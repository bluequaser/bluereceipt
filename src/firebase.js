import React from 'react'
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyC653wFG2u3e-5hOGkwhJ_96njmcuJDG6M",
  authDomain: "skyblue-d167f.firebaseapp.com",
  databaseURL: "https://skyblue-d167f-default-rtdb.firebaseio.com",
  projectId: "skyblue-d167f",
  storageBucket: "skyblue-d167f.appspot.com",
  messagingSenderId: "1007547188855",
  appId: "1:1007547188855:web:0a877cb34f685e34e9a872"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}