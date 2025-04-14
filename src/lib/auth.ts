// DATA
import { createSessionCookie, revokeAllSessions } from "@/data/auth/sessions";
// FIREBASE
import { getAuth, getIdToken } from "firebase/auth"
// CONFIG
import { app } from "@/lib/firebase/client/config"
// LIB
import { 
  getSessionCookieClientSide, 
  removeSessionCookieClientSide, 
  saveSessionCookieClientSide 
} from "./cookies";


export const syncSessionCookie = async () => {
  const currentUser = getAuth(app).currentUser;

  if (currentUser) {
    const idToken = await getIdToken(currentUser, true);
    const sessionCookie = await createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 12 * 1000, // 12 days
    });

    saveSessionCookieClientSide(sessionCookie);    
  } else {
    removeSessionCookieClientSide();
  }
}

export const destroySessionCookie = async () => {
  const sessionCookie = getSessionCookieClientSide();

  if (sessionCookie) {
    await revokeAllSessions(sessionCookie);
  }

  removeSessionCookieClientSide();
}