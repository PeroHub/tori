"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Decode the search query
  const encodedSearch = searchParams.get("search");
  const searchQuery = encodedSearch ? decodeURIComponent(encodedSearch) : null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Re-encode for API call
        const url = searchQuery
          ? `/api/events?search=${encodeURIComponent(searchQuery)}`
          : "/api/events";

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }

        setEvents(data);
      } catch (error: any) {
        console.error("Error fetching events:", error);
        setError(error.message || "Error loading events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

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

        {searchQuery && (
          <h2 className="text-2xl font-semibold mb-6">
            Search results for "{searchQuery}"
          </h2>
        )}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `No events found for "${searchQuery}"`
                : "No events available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
