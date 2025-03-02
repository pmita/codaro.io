"use server"

import { getSessionCookie } from './getSessionCookie';
import { adminAuth } from "../../firebase/server/config";
import { revokeAllSessions } from './revokeAllSessionCookies';

export const validateUserSession = async () => {
  const session = await getSessionCookie();

  if (!session) {
    console.warn('No session was found');
    return null;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session!);

  if (!decodedIdToken) {
    console.warn('No decoded token was found');
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if(decodedIdToken.exp < currentTime) {
    await revokeAllSessions(session!);
    console.warn('Session expired');
    return null;
  }

  return decodedIdToken;
}