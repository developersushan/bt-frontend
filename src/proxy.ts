// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getUserInfo } from "./services/auth.service";
// import { UserRole } from "./lib/enum";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("token")?.value;

//   if (pathname === "/login" || pathname === "/register") {
//     if (token) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       // const url = new URL("/", request.url);
//       // url.searchParams.set("auth", "login");
//       // return NextResponse.redirect(url);
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     try {
//       const userData = await getUserInfo();
//       if (!userData) {
//         const response = NextResponse.redirect(new URL("/", request.url));
//         response.cookies.delete("token");
//         return response;
//       }

//       const userRole = userData?.user?.roles;
//       const roles = Array.isArray(userRole)
//         ? userRole
//         : userRole
//           ? [userRole]
//           : [];

//       if (
//         !roles.includes(UserRole.ADMIN) &&
//         !roles.includes(UserRole.SUPER_ADMIN)
//       ) {
//         return NextResponse.redirect(new URL("/", request.url));
//       }

//       return NextResponse.next();
//     } catch {
//       // const url = new URL("/", request.url);
//       // url.searchParams.set("auth", "login");
//       // const response = NextResponse.redirect(url);
//       // response.cookies.delete("token");
//       // return response;
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/login", "/register"],
// };

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

    const url = new URL("/", request.url);
    url.searchParams.set("auth", pathname === "/login" ? "login" : "register");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/", request.url);
      url.searchParams.set("auth", "login");
      return NextResponse.redirect(url);
      // return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const userData = await getUserInfo();
      if (!userData) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        return response;
      }

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
      // const url = new URL("/", request.url);
      // url.searchParams.set("auth", "login");
      // const response = NextResponse.redirect(url);
      // response.cookies.delete("token");
      // return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
