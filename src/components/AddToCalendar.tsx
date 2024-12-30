"use client";

import { Event } from "@/types";
import { Calendar } from "lucide-react";

interface AddToCalendarProps {
  event: Event;
}

export function AddToCalendar({ event }: AddToCalendarProps) {
  const handleAddToCalendar = () => {
    const startTime = new Date(event.date);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startTime
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}/${endTime
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location.address)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <button
      onClick={handleAddToCalendar}
      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
    >
      <Calendar className="w-5 h-5" />
      <span>Add to Calendar</span>
    </button>
  );
}
