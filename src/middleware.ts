import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/events",
    "/events/(.*)",
    "/api/events",
    "/api/events/(.*)",
    "/cultural-sites",
    "/beaches",
    "/cuisine",
    "/festivals",
    "/sign-in",
    "/sign-up",
  ],
  ignoredRoutes: ["/api/events", "/api/events/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
