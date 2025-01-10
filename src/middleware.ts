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
    "/api/events/popular",
    "/api/events/search",
    "/api/events/[eventId]",
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
