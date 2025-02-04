import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Read token from cookies

  // Define protected routes
  const protectedRoutes = ["/app"];

  // Check if the request is for a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login
    }
  }

  return NextResponse.next(); // Allow access if token exists
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/app/:path*"], // Protects everything inside `/app/`
};
