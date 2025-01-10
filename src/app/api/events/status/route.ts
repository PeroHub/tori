import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const { eventId, status } = await req.json();

    if (!eventId || !status) {
      return NextResponse.json(
        { message: "Event ID and status are required" },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    ).lean();

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { message: "Failed to update event status" },
      { status: 500 }
    );
  }
}
