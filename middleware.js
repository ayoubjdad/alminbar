import { NextResponse } from "next/server";

export function middleware(request) {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  const password = process.env.DASHBOARD_PASSWORD;
  if (!secret || !password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const auth = request.cookies.get("dashboard_auth")?.value;
    if (auth !== secret) {
      const login = new URL("/dashboard/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
