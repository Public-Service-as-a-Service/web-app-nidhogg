import { NextRequest, NextResponse } from "next/server";
import { PATHS } from "./app/constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (isProtectedPage(pathname) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
  ],
};

export const isProtectedPage = (pathname: string) => {
  return PATHS.some((path) => pathname?.startsWith(path.url));
};
