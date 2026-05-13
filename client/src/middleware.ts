import { NextRequest, NextResponse } from "next/server";
import {
  PAGE_ROUTES,
  PATHS,
  STORE,
} from "./app/constants";
import { resolveAuthenticatedUser } from "@/utils/session";

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get(STORE.authToken)?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/teamssender") && !authToken) {
    if (pathname.startsWith("/api/teamssender/callback")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(PAGE_ROUTES.home, req.url));
  }

  if (isProtectedPage(pathname) && !authToken) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.home, req.url));
  }

  if (authToken) {
    const session = await resolveAuthenticatedUser(authToken);

    if (!session) {
      if (pathname === PAGE_ROUTES.home) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(PAGE_ROUTES.home, req.url));
    }

    const isAdmin = session.role === "ADMIN";

    if (pathname === PAGE_ROUTES.home) {
      return NextResponse.redirect(
        new URL(isAdmin ? PAGE_ROUTES.dashboardAdmin : PAGE_ROUTES.dashboard, req.url),
      );
    }

    if (!isAdmin && pathname.startsWith(PAGE_ROUTES.dashboardAdmin)) {
      return NextResponse.redirect(new URL(PAGE_ROUTES.dashboard, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/teamssender/:path*"],
};

export const isProtectedPage = (pathname: string) => {
  return PATHS.some((path) => pathname?.startsWith(path.url));
};
