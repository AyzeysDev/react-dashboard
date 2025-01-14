import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Login function for Firebase
export const loginUser = async (email, password) => {
  try {
    // Use Firebase's signInWithEmailAndPassword for authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return the authenticated user
  } catch (error) {
    throw new Error("Invalid email or password."); // Handle login errors
  }
};
