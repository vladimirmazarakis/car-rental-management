import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRefreshToken, resetToken } from "./lib/authToken";
import { logout, refresh } from "./lib/authLib";

export async function middleware(req: NextRequest) {
  console.log("Middleware running for:", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;

  // Bypass authentication check for login page to prevent redirect loop
  if (pathname.startsWith("/auth")) {
    console.log("Skipping middleware for authentication route.");
    return NextResponse.next();
  }

  const refreshToken = await getRefreshToken();
  const isAuthenticated = refreshToken && (await refresh());

  if (!isAuthenticated) {
    console.log("User not authenticated. Redirecting to /auth/login");
    await resetToken();
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users from "/" to "/app"
  if (!pathname.startsWith("/app")) {
    console.log("User is authenticated but on root. Redirecting to /app");
    return NextResponse.redirect(new URL("/app", req.url));
  }

  console.log("User is authenticated. Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

