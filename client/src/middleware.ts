import { NextRequest, NextResponse } from "next/server";
import {
  PAGE_ROUTE_MATCHERS,
  PAGE_ROUTES,
  PATHS,
  STORE,
} from "./app/constants";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get(STORE.userId)?.value;
  const { pathname } = req.nextUrl;

  if (isProtectedPage(pathname) && !userId) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.home, req.url));
  }

  if (pathname === PAGE_ROUTES.home && userId) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.dashboard, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [PAGE_ROUTES.home, PAGE_ROUTE_MATCHERS.protected],
};

export const isProtectedPage = (pathname: string) => {
  return PATHS.some((path) => pathname?.startsWith(path.url));
};
