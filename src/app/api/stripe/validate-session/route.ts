import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebase/server/config";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("__session")?.value;
  
  if (!sessionCookie) {
    return NextResponse.json({ valid: false, error: "No session found" }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);
    return NextResponse.json({ valid: true, decodedToken });
  } catch (error) {
    console.warn("Session validation failed:", error);
    return NextResponse.json({ valid: false, error: "Invalid session" }, { status: 401 });
  }
}
