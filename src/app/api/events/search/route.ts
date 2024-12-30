import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Event from "@/models/event.model";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const dateRange = searchParams.get("dateRange") || "upcoming";

    await connectToDB();

    let query: any = { status: "approved" };

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add category filter
    if (category) {
      query.category = category;
    }

    // Add date filter
    if (dateRange === "upcoming") {
      query.date = { $gte: new Date() };
    } else if (dateRange === "past") {
      query.date = { $lt: new Date() };
    }

    const events = await Event.find(query).sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error searching events:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
