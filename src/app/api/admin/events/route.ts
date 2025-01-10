import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = auth();
    console.log("Admin events request from:", userId);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const events = await Event.find().sort({ createdAt: -1 });

    console.log(`Found ${events.length} events`);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching admin events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
