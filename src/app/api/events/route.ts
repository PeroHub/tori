import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDB();
    const events = await Event.find({
      status: "approved",
    }).lean();

    return NextResponse.json(events || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    console.log("Authenticated user ID:", userId);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Connecting to database...");
    // await connectToDB();
    await connectToDB()
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.error("MongoDB connection failed", error));

    console.log("Parsing request data...");
    const data = await req.json();
    console.log("Received data:", data);

    console.log("Creating new event...");
    const newEvent = await Event.create({
      ...data,
      userId,
      status: "pending",
    });

    console.log("Event created:", newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
