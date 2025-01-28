import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import UserPreference from "@/models/userPreference.model";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { activities } = await request.json();

    await connectToDB();

    await UserPreference.findOneAndUpdate(
      { userId },
      {
        userId,
        activities,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { message: "Failed to save preferences" },
      { status: 500 }
    );
  }
}
