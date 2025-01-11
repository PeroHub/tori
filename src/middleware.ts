import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/events",
    "/events/(.*)",
    "/cultural-sites",
    "/beaches",
    "/cuisine",
    "/festivals",
    "/sign-in",
    "/sign-up",
    "/api/chat",
    "/api/chat/(.*)",
    "/api/events",
    "/api/events/(.*)",
    "/api/events/details",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.+)"],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/admin(.*)",
    "/dashboard(.*)",
  ],
};
