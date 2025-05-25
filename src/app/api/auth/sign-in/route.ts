// NEXT
import { NextRequest, NextResponse } from "next/server";
// DATA
import { createSession } from "@/data/auth/services/session-service";



export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({
        valid: false,
        error: "ID token is required"
      }, {
        status: 400
      });
    }

    await createSession(idToken);

    return NextResponse.json({
      success: true,
      message: "User signed in successfully"
    }, {
      status: 200
    });
  } catch(error) {
    return NextResponse.json({
      valid: false,
      error: (error as Error).message || "An error occurred during sign-in"
    }, {
      status: 500
    })
  }
}