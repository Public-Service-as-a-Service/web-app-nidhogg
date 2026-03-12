import { NextRequest, NextResponse } from "next/server";
import {
  PAGE_ROUTES,
  PATHS,
  STORE,
} from "./app/constants";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get(STORE.authToken)?.value;
  const { pathname } = req.nextUrl;

  if (isProtectedPage(pathname) && !authToken) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.home, req.url));
  }

  if (pathname === PAGE_ROUTES.home && authToken) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.dashboard, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

export const isProtectedPage = (pathname: string) => {
  return PATHS.some((path) => pathname?.startsWith(path.url));
};
