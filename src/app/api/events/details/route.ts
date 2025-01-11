import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  console.log("API Route Hit - Event Details");

  try {
    // Get eventId from search params
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("id");

    console.log("Event ID:", eventId);

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();
    console.log("Database connected");

    const event = await Event.findOne({ _id: eventId });
    console.log("Query result:", event ? "Event found" : "No event found");

    if (!event) {
      console.log("Returning 404");
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    console.log("Returning event data");
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error in event details route:", error);
    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
