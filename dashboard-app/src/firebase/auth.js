import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Login function for Firebase
export const loginUser = async (email, password) => {
  const hardcodedEmail = "carcher@actaustralia.com";
  const hardcodedPassword = "peter123";

  // Check hardcoded credentials
  if (email === hardcodedEmail && password === hardcodedPassword) {
    return await signInWithEmailAndPassword(auth, email, password); // Firebase authentication
  } else {
    throw new Error("Invalid email or password.");
  }
};
