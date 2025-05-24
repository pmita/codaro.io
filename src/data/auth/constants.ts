import { SessionCookieOptions } from "firebase-admin/auth";

export const SESSION_OPTIONS: SessionCookieOptions = {
  expiresIn: 60 * 60 * 24 * 12 * 1000, // 12 days
}