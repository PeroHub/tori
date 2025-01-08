"use client";

import { useState, useEffect } from "react";
import { EventSearch } from "@/components/EventSearch";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error);
      }

      // Ensure data is an array
      const eventsArray = Array.isArray(data) ? data : [];

      setEvents(eventsArray);
      setFilteredEvents(eventsArray);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      setError(
        error.message || "Error loading events. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (searchResults: Event[]) => {
    setFilteredEvents(searchResults);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} retry={fetchEvents} />;

  const hasEvents = events.length > 0;
  const displayEvents = filteredEvents.length > 0 ? filteredEvents : events;

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
            Discover Events
          </h1>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Register New Event</span>
          </Link>
        </div>

        <div className="mb-6 sm:mb-8 w-full">
          <EventSearch
            events={events}
            onSearch={handleSearch}
            className="w-full"
          />
        </div>

        {!hasEvents ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              No events found.
            </p>
            <Link
              href="/sign-in"
              className="text-primary hover:text-primary/80 text-sm sm:text-base"
            >
              Sign in to register an event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
            {displayEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                type="subscribed"
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
