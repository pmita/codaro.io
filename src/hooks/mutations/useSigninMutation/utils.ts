import { auth } from "@/firebase/client/config";
import { signInWithEmailAndPassword } from "firebase/auth";


export const signUserIn = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}