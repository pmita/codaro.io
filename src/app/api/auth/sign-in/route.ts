// NEXT
import { NextRequest, NextResponse } from "next/server";
// DATA
import { createSession } from "@/data/auth/sessions";


export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { idToken } = requestBody;

    console.log("Received ID Token:", idToken);

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