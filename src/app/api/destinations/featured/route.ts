import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Destination from "@/models/destination.model";

export async function GET() {
  try {
    await connectToDB();
    const destinations = await Destination.find().sort({ rating: -1 }).limit(6);
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return NextResponse.json(
      { message: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}
