import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

const ADMIN_IDS = ["user_2qt8SrkyNUSNw0oQs2e3WklLhcu"]; // Add your admin user IDs here

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId || !ADMIN_IDS.includes(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
