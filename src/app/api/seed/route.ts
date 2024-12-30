import { NextResponse } from "next/server";
import { seedEvents } from "@/lib/seed";

export async function POST() {
  try {
    await seedEvents();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return new NextResponse("Error seeding database", { status: 500 });
  }
}
