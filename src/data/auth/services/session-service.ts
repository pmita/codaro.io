"server-only"

// NEXT
import { cookies } from "next/headers";
// CONSTANTS
import { AUTH_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "./constants";

export const getSessionCookie = async () => {
  return (await cookies()).get(AUTH_COOKIE_NAME)?.value;
}

export const createSessionCookie = async (sessionCookie: string) => {
  (await cookies()).set(AUTH_COOKIE_NAME, sessionCookie, SESSION_COOKIE_OPTIONS);
}

export const deleteSessionCookie = async () => {
  (await cookies()).delete(AUTH_COOKIE_NAME);
}