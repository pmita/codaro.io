"use server"

import { getSessionCookie } from './getSessionCookie';
import { adminAuth } from "../../firebase/server/config";

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

  return decodedIdToken;
}