import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const { userId } = auth();
    console.log("Authenticated userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Connecting to database...");
    await connectToDB();
    console.log("Database connected");

    console.log("Fetching events for user:", userId);
    const events = await Event.find({
      userId: userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    console.log(`Found ${events?.length || 0} events for user`);

    return NextResponse.json(events || []);
  } catch (error: any) {
    console.error("Dashboard API error:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { message: "Failed to fetch user events" },
      { status: 500 }
    );
  }
}
