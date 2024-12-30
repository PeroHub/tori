import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    // For now, just return recent events
    // TODO: Implement actual recommendation logic
    const events = await Event.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(6);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { message: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
