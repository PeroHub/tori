"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Search } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search");
  const [searchQuery, setSearchQuery] = useState(
    initialSearch ? decodeURIComponent(initialSearch) : ""
  );

  const handleSearch = async (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent
  ) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const url = searchQuery.trim()
        ? `/api/events?search=${encodeURIComponent(searchQuery.trim())}`
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = initialSearch
          ? `/api/events?search=${encodeURIComponent(initialSearch)}`
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
  }, [initialSearch]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => handleSearch(e)}
                placeholder="Search for events..."
                className="w-full px-6 py-3 rounded-lg text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <>
            {searchQuery && (
              <h2 className="text-2xl font-semibold mb-6">
                {/* Search results for "{searchQuery}" */}
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
          </>
        )}
      </div>
    </div>
  );
}
