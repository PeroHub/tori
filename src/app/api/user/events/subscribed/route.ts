import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const events = await Event.find({
      subscribers: userId,
      status: "approved",
    }).sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching subscribed events:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
