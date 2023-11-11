import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware called");
  const token = request.cookies.get("token")?.value;
  // console.log(token);
  const { pathname } = request.nextUrl;
  const publicRoute = pathname === "/login" || pathname === "/register";

  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
