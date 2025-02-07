import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRefreshToken, resetToken } from "./lib/authToken";
import { logout, refresh } from "./lib/authLib";

export async function middleware(req: NextRequest) {
  const refreshToken = await getRefreshToken();

  let shouldAuthenticate = false;

  if(!refreshToken){
    shouldAuthenticate = true;
  }

  if(!(await refresh()))
  {
    shouldAuthenticate = true;
  }

  if(shouldAuthenticate)
  {
    await resetToken();
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  
  return NextResponse.next(); // Allow access if token exists
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/app/:path*"], // Protects everything inside `/app/`
};
