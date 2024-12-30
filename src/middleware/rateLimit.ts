import { NextResponse } from "next/server";

const rateLimits = new Map<string, { count: number; timestamp: number }>();

export async function rateLimit(ip: string) {
  try {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour in milliseconds
    const limit = 100; // requests per windowMs

    const userLimit = rateLimits.get(ip) || { count: 0, timestamp: now };

    // Reset if outside window
    if (now - userLimit.timestamp > windowMs) {
      userLimit.count = 0;
      userLimit.timestamp = now;
    }

    userLimit.count++;
    rateLimits.set(ip, userLimit);

    if (userLimit.count > limit) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    return null;
  } catch (error) {
    console.error("Rate limiting error:", error);
    return null; // Continue on error
  }
}
