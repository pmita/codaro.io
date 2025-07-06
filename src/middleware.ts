import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("__session")?.value;

  if (!sessionCookie) {
    req.cookies.delete("__session");
    
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = await fetch(new URL("/api/auth/validate-session", req.url), {
    method: "GET",
    headers: { Cookie: `__session=${sessionCookie}` },
  });

  const data = await res.json();

  if (!data.valid) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/verify-magic-link"],
};
