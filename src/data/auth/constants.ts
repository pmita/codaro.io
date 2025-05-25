// TYPES
import { SessionCookieOptions } from "firebase-admin/auth";

export const AUTH_COOKIE_NAME = "__session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  exprires: 60 * 60 * 24 * 12 * 1000, // 12 days
}

export const SESSION_OPTIONS: SessionCookieOptions = {
  expiresIn: 60 * 60 * 24 * 12 * 1000, // 12 days
}