import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";

export async function GET() {
  try {
    console.log("Connecting to database...");
    await connectToDB();

    console.log("Fetching approved events...");
    const events = await Event.find({
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${events?.length || 0} events`);

    // Always return an array, even if empty
    return NextResponse.json(events || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
