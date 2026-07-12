// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session_user")?.value;
  const { pathname } = request.nextUrl;

  console.log(
    `🌐 INTERCEPTED -> Path: ${pathname} | Cookie Found: ${!!session}`,
  );

  // 1. Redirect logged-in users AWAY from auth pages
  if (session && (pathname === "/login" || pathname === "/register")) {
    console.log(
      "🛑 Logged-in user blocked from auth page. Redirecting to /my-bookings",
    );
    return NextResponse.redirect(new URL("/my-bookings", request.url));
  }

  // 2. Redirect logged-out users AWAY from private dashboard pages
  if (!session && pathname.startsWith("/my-bookings")) {
    console.log(
      "🛑 Logged-out user blocked from private page. Redirecting to /login",
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// THE STRATEGIC FIX: Explicitly target only page paths, ignoring system chunks
export const config = {
  matcher: ["/login", "/register", "/my-bookings/:path*"],
};
