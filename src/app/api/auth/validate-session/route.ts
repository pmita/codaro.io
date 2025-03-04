// NEXT.JS
import { NextRequest, NextResponse } from "next/server";
// DATA
import { revokeAllSessions } from "@/data/auth/sessions";
// CONFIG
import { adminAuth } from "@/firebase/server/config";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("__session")?.value;
  
  if (!sessionCookie) {
    return NextResponse.json({ valid: false, error: "No session found" }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      await revokeAllSessions(sessionCookie);
      return NextResponse.json({ valid: false, error: "Session expired" }, { status: 401 });
    }

    return NextResponse.json({ valid: true, decodedToken });
  } catch (error) {
    console.warn("Session validation failed:", error);
    await revokeAllSessions(sessionCookie);
    return NextResponse.json({ valid: false, error: "Invalid session" }, { status: 401 });
  }
}
