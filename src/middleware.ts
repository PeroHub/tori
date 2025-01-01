import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add public routes that don't require authentication
  publicRoutes: [
    "/",
    "/events",
    "/api/events",
    "/api/events/popular",
    "/events/(.*)",
    "/events/(.*)", // This allows access to all event routes
    "/api/events/(.*)", // This allows access to all event API routes
  ],
  // Protected routes that require authentication
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
