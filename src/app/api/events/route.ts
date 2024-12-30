import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDB();
    const events = await Event.find({ status: "approved" })
      .sort({ date: 1 })
      .lean();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const data = await req.json();
    const event = await Event.create({ ...data, createdBy: userId });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
