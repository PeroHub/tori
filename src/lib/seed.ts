import { connectToDB } from "./db";
import Event from "@/models/event.model";

const sampleEvents = [
  {
    title: "Cultural Festival 2024",
    description:
      "Experience local traditions, music, and food at this annual cultural celebration.",
    date: new Date("2024-06-15"),
    category: "cultural",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    location: {
      type: "Point",
      coordinates: [-73.935242, 40.73061], // New York coordinates
      address: "Central Park, New York, NY",
    },
    status: "approved",
    createdBy: "system",
    subscribers: [],
  },
  {
    title: "Mountain Hiking Adventure",
    description:
      "Join us for a guided hiking experience through scenic mountain trails.",
    date: new Date("2024-07-20"),
    category: "sports",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    location: {
      type: "Point",
      coordinates: [-106.822588, 39.642908], // Colorado coordinates
      address: "Rocky Mountains, Colorado",
    },
    status: "approved",
    createdBy: "system",
    subscribers: [],
  },
  {
    title: "Food & Wine Festival",
    description:
      "Taste exquisite dishes and wines from renowned chefs and wineries.",
    date: new Date("2024-08-10"),
    category: "food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    location: {
      type: "Point",
      coordinates: [-122.419416, 37.774929], // San Francisco coordinates
      address: "Golden Gate Park, San Francisco, CA",
    },
    status: "approved",
    createdBy: "system",
    subscribers: [],
  },
];

export async function seedEvents() {
  try {
    await connectToDB();

    // Clear existing events
    await Event.deleteMany({ createdBy: "system" });

    // Insert sample events
    await Event.insertMany(sampleEvents);

    console.log("Sample events seeded successfully!");
  } catch (error) {
    console.error("Error seeding events:", error);
  }
}
