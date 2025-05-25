// NEXT.JS
import { NextRequest, NextResponse } from "next/server";
// DATA
import { validateSession } from "@/data/auth/services/session-service";
// LIB
import { removeSessionCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("__session")?.value;
  
  if (!sessionCookie) {
    return NextResponse.json({ valid: false, error: "No session found" }, { status: 401 });
  }

  try {
    const decodedToken = await validateSession(sessionCookie);

    if (!decodedToken) {
      throw new Error("Invalid session token");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      await removeSessionCookie();
      return NextResponse.json({ valid: false, error: "Session expired" }, { status: 401 });
    }

    return NextResponse.json({ valid: true, decodedToken });
  } catch (error) {
    console.warn("Session validation failed:", error);
    await removeSessionCookie();
    return NextResponse.json({ valid: false, error: "Invalid session" }, { status: 401 });
  }
}
