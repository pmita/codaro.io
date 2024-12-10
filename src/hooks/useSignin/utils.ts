import { app, auth } from "@/firebase/client/config";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";


export const signUserIn = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}

export const saveFirebaseCookie = async () => {
  const currentUser = getAuth(app).currentUser;
  if (currentUser) {
    const idToken = await getIdToken(currentUser, true);
    // setAuthCookie(idToken);
  }
}