"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToGoogleCalendar = (event: Event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location.address)}&dates=${startDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}/${endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}`;

    window.open(googleCalendarUrl, "_blank");
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/events/details?id=${params.eventId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error loading event");
        }

        // Ensure subscribers exists
        data.subscribers = data.subscribers || [];
        setEvent(data);
      } catch (error: any) {
        console.error("Error fetching event:", error);
        setError(
          error.message || "Error loading event. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.eventId) {
      fetchEventDetails();
    }
  }, [params.eventId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          <div className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {event.title}
              </h1>
              <button
                onClick={() => addToGoogleCalendar(event)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Calendar</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-500 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location.address}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-3 flex-shrink-0" />
                <span>{(event.subscribers || []).length} interested</span>
              </div>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap mb-6">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
