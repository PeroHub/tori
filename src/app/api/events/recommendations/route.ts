import { NextResponse } from "next/server";
import { getEventRecommendations } from "@/lib/recommendations";
import Event from "@/models/event.model";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/db";
import {
  Event as EventType,
  DbEvent,
  isDbEvent,
  transformToEvent,
} from "@/types";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type MongoEvent = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  image: string;
  category: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  subscribers: string[];
  organizer: string;
  status: string;
  createdBy: string;
  __v: number;
};

export async function GET() {
  try {
    await connectToDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch and transform events
    const dbEvents = (await Event.find({
      status: "approved",
    }).lean()) as MongoEvent[];

    if (!dbEvents || dbEvents.length === 0) {
      return NextResponse.json({ events: [] });
    }

    // Transform MongoDB documents to Event type
    const events = dbEvents.map(
      (event) =>
        ({
          _id: event._id.toString(),
          title: event.title,
          description: event.description,
          date: new Date(event.date),
          image: event.image,
          category: event.category,
          location: {
            address: event.location.address,
            coordinates: {
              lat: event.location.coordinates[0],
              lng: event.location.coordinates[1],
            },
          },
          subscribers: event.subscribers,
          organizer: event.organizer,
          status: event.status,
          createdBy: event.createdBy,
        } as EventType)
    );

    const userPreferences = "events in Nigeria";
    const recommendations = await getEventRecommendations(
      userPreferences,
      events
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
