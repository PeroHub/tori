import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Notification from "@/models/notification.model";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { notificationId } = body;

    await connectToDB();
    await Notification.findByIdAndUpdate(notificationId, { read: true });

    return new NextResponse("OK");
  } catch (error) {
    console.error("Error updating notification:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
