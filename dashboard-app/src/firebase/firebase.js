import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAudVkOyRzHuwzehXWqZCO3Ll4nusOP2GM",
  authDomain: "dashboard-app-477bf.firebaseapp.com",
  projectId: "dashboard-app-477bf",
  storageBucket: "dashboard-app-477bf.appspot.com",
  messagingSenderId: "578959228501",
  appId: "1:578959228501:web:51da758e851ac00ba4dedc",
  measurementId: "G-SZN51LHRPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
