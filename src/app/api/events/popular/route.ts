import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";

export async function GET() {
  try {
    await connectToDB();
    const events = await Event.find({ status: "approved" })
      .sort({ subscribers: -1 })
      .limit(6);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching popular events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
