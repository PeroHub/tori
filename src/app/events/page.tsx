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

export default function EventsPage() {
  const { isSignedIn } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data: Event[] = await response.json();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discover Events</h1>
        {isSignedIn && (
          <Link
            href="/events/register"
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Register New Event</span>
          </Link>
        )}
      </div>
      <div className="mb-8">
        <EventSearch onSearch={handleSearch} />
      </div>
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No events found.</p>
          {isSignedIn ? (
            <Link
              href="/events/register"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
            >
              <Plus className="w-5 h-5" />
              <span>Register your event now</span>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="text-primary hover:text-primary/80"
            >
              Sign in to register an event
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              type="subscribed"
              onUnsubscribe={fetchEvents}
            />
          ))}
        </div>
      )}
    </div>
  );
}
