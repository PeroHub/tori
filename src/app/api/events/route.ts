import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";
import { rateLimit } from "@/middleware/rateLimit";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Received event data:", body);

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.date ||
      !body.category ||
      !body.image ||
      !body.location?.address
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const newEvent = await Event.create({
      ...body,
      createdBy: userId,
      status: "pending",
      subscribers: [],
    });

    console.log("Created event:", newEvent);
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const events = await Event.find({ status: "approved" })
      .sort({ date: 1 })
      .limit(10);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
