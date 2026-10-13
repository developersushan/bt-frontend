import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserInfo } from "./services/auth.service";
import { UserRole } from "./lib/enum";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/", request.url);
      url.searchParams.set("auth", "login");
      return NextResponse.redirect(url);
    }

      try {
        const userData = await getUserInfo();
        const userRole = userData?.user?.roles;
        const roles = Array.isArray(userRole)
          ? userRole
          : userRole
            ? [userRole]
            : [];

        if (
          !roles.includes(UserRole.ADMIN) &&
          !roles.includes(UserRole.SUPER_ADMIN)
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
      } catch {
        const url = new URL("/", request.url);
        url.searchParams.set("auth", "login");
        return NextResponse.redirect(url);
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
