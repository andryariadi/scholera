import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserMetadata, UserRole } from "./libs/types/prisma-schema";

type RouteAccessMap = {
  [key: string]: UserRole[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],
  "/list/teachers": ["admin", "teacher"],
  "/list/students": ["admin", "teacher"],
  "/list/parents": ["admin", "teacher"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "teacher"],
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

function hasAccess(pathname: string, userRole: UserRole): boolean {
  // Cek setiap pattern di routeAccessMap
  for (const [routePattern, allowedRoles] of Object.entries(routeAccessMap)) {
    // Konversi pattern menjadi regex
    // "/list/teachers" → /^\/list\/teachers$/
    // "/admin(.*)" → /^\/admin(.*)$/
    const regex = new RegExp(`^${routePattern}$`);

    // Jika pathname match dengan pattern
    if (regex.test(pathname)) {
      // Cek apakah role user ada dalam daftar allowed roles
      return allowedRoles.includes(userRole); // return true jika ada
    }
  }

  // Jika tidak ada pattern yang match, return false (tidak ada akses)
  return false;
}

function isProtectedRoute(pathname: string): boolean {
  for (const routePattern of Object.keys(routeAccessMap)) {
    const regex = new RegExp(`^${routePattern}$`);

    if (regex.test(pathname)) {
      return true;
    }
  }
  return false;
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;

  // Jika user belum login, redirect ke halaman login ("/"):
  if (userId && pathname === "/") {
    const userRole = (sessionClaims as UserMetadata).metadata?.role;

    return NextResponse.redirect(new URL(`/${userRole}`, req.url));
  }

  // Jika route protected:
  if (isProtectedRoute(pathname)) {
    // Pastikan user sudah login
    await auth.protect();

    if (userId && sessionClaims) {
      const userRole = (sessionClaims as UserMetadata).metadata?.role;

      if (!userRole) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Cek apakah user punya akses ke route ini
      const hasRouteAccess = hasAccess(pathname, userRole);

      if (!hasRouteAccess) {
        // Jika tidak punya akses, redirect ke dashboard mereka
        console.log("🚫 Access denied, redirecting to:", `/${userRole}`);

        return NextResponse.redirect(new URL(`/${userRole}`, req.url));
      }

      console.log("✅ Access granted");
    }
  }

  // Jika route public:
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
