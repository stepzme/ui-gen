import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow public routes
  const isPublicRoute = request.nextUrl.pathname.startsWith("/api/auth") || request.nextUrl.pathname === "/login";
  if (isPublicRoute) return NextResponse.next();
  
  // Check session token for all other routes
  const sessionToken = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
  if (!sessionToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


