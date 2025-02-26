"use server"

import { adminAuth } from "@/firebase/server/config";

export const revokeAllSessions = async (session: string) => {
  const decodedToken = await adminAuth.verifySessionCookie(session);

  return await adminAuth.revokeRefreshTokens(decodedToken.sub);
}