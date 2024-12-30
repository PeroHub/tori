import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/db";
import User from "@/models/user.model";

export async function adminAuth() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: userId });

    if (!user || user.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return null; // Auth successful
  } catch (error) {
    console.error("Error checking admin status:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
