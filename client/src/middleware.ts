import { NextRequest, NextResponse } from "next/server";
import { PATHS, STORE } from "./app/constants";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get(STORE.userId)?.value;
  const { pathname } = req.nextUrl;

  if (isProtectedPage(pathname) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/" && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

export const isProtectedPage = (pathname: string) => {
  return PATHS.some((path) => pathname?.startsWith(path.url));
};
