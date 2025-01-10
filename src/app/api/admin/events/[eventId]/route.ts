import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

// Force dynamic behavior
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET endpoint
export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const event = await Event.findById(params.eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PATCH endpoint
export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const { status } = await req.json();
    const { eventId } = params;

    console.log("Updating event:", { eventId, status });

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

// OPTIONS endpoint for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
