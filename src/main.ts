// src/main.ts

/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXZjyCwJOariRUevbL4i4PwBmsBsWRIJg",
  authDomain: "climanow-4eb9f.firebaseapp.com",
  projectId: "climanow-4eb9f",
  storageBucket: "climanow-4eb9f.appspot.com",
  messagingSenderId: "840929014011",
  appId: "1:840929014011:web:8821edb679796672f9005e",
  measurementId: "G-EYQ7DEXWQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
