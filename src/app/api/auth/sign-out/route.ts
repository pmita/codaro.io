// NEXT
import { NextRequest, NextResponse } from "next/server";
// DATA
import { deleteSessionCookie } from "@/data/auth/services/cookies-service";

export async function POST(req: NextRequest) {
  try {
    await deleteSessionCookie();
  
    return NextResponse.json({
      success: true,
      message: "User signed out successfully"
    }, {
      status: 200
    })
  } catch(error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message || "An error occurred during sign-out"
    }, {
      status: 500
    });
  }
}