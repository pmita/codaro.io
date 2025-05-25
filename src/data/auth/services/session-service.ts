"server-only"

// DATA
import { createSessionCookie, deleteSessionCookie, getSessionCookie } from "./cookies-service";
// LIB
import { adminAuth } from "@/lib/firebase/server/config";
// CONSTANTS
import { SESSION_OPTIONS } from "../constants";

export const createSession = async (idToken: string) => {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, SESSION_OPTIONS);
  await createSessionCookie(sessionCookie);
}

export const validateSession = async (sessionCookie?: string) => {
  const session = sessionCookie ?? await getSessionCookie();

  if (!session) {
    console.warn('No session was found');
    return null;
  }

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(session!);
  
    if (!decodedIdToken) {
      console.warn('No decoded token was found');
      return null;
    }
  
    const currentTime = Math.floor(Date.now() / 1000);
    if(decodedIdToken.exp < currentTime) {
      await deleteSessionCookie();
      console.warn('Session expired');
      return null;
    }
  
    return decodedIdToken;
  } catch(error) {
    await deleteSessionCookie();
    return null;
  }
}