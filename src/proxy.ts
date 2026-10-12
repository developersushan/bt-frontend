import { UserRole } from "@/lib/enum";
import { NextResponse, NextRequest } from "next/server";
import { getUserInfo } from "./services/auth.service";
import { getCookie } from "./lib/cookieUtlis";

export async function proxy(request: NextRequest) {
  const token = await getCookie("token");
  const userData = token ? await getUserInfo() : undefined;
  const isAuthenticated = !!userData;

  const userRole = userData?.user?.roles;

  if (!isAuthenticated) {
    const url = new URL("/", request.url);
    url.searchParams.set("auth", "login");
    return NextResponse.redirect(url);
  }

  if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/dashboard"],
};
