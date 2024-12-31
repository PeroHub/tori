"use client";

import { useState, useEffect } from "react";
import { EventSearch } from "@/components/EventSearch";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  const { isSignedIn } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError("Error loading events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (filteredEvents: Event[]) => {
    setEvents(filteredEvents);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} retry={fetchEvents} />;

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
            Discover Events
          </h1>
          {isSignedIn && (
            <Link
              href="/events/register"
              className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Register New Event</span>
            </Link>
          )}
        </div>

        <div className="mb-6 sm:mb-8 w-full">
          <EventSearch onSearch={handleSearch} className="w-full" />
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              No events found.
            </p>
            {isSignedIn ? (
              <Link
                href="/events/register"
                className="inline-flex items-center justify-center space-x-2 text-primary hover:text-primary/80 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Register your event now</span>
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="text-primary hover:text-primary/80 text-sm sm:text-base"
              >
                Sign in to register an event
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <div key={event._id} className="w-full">
                <EventCard
                  event={event}
                  type="subscribed"
                  onUnsubscribe={fetchEvents}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
