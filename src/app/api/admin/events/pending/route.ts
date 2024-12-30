import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";
import { adminAuth } from "@/middleware/adminAuth";

export async function GET() {
  const authError = await adminAuth();
  if (authError) return authError;

  try {
    await connectToDB();
    const events = await Event.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("createdBy", "email");
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching pending events:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
