"use server"

// NEXT.JS
import { cookies } from 'next/headers';
// FIREBASE
import { SessionCookieOptions } from 'firebase-admin/auth';
// CONFIG
import { adminAuth } from "@/firebase/server/config";

export const getSessionCookie = async () => {
  try {
    return (await (cookies())).get('__session')?.value;
  }catch(error) {
    console.error('An error occurred while validating the user:', error);
    return undefined;
  }
}

export const createSessionCookie = async (idToken: string, sessionCookiOptions: SessionCookieOptions) => {
  return await adminAuth.createSessionCookie(idToken, sessionCookiOptions);
}

export const validateUserSession = async () => {
  const session = await getSessionCookie();

  if (!session) {
    console.warn('No session was found');
    return null;
  }

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(session!);

    // const test = await adminAuth.createCustomToken(decodedIdToken.sub);
  
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
  } catch(error) {
    revokeAllSessions(session);
    return null;
  }
}

export const revokeAllSessions = async (session: string) => {
  const decodedToken = await adminAuth.verifySessionCookie(session);

  return await adminAuth.revokeRefreshTokens(decodedToken.sub);
}