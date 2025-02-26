"use server"

import { SessionCookieOptions } from 'firebase-admin/auth';
import { adminAuth } from "@/firebase/server/config";

export const createSessionCookie = async (idToken: string, sessionCookiOptions: SessionCookieOptions) => {
  return await adminAuth.createSessionCookie(idToken, sessionCookiOptions);
}