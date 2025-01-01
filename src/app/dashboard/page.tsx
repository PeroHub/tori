"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add cache control headers
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        // Ensure credentials are included
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error loading events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} retry={fetchEvents} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Tabs defaultValue="submitted" className="w-full">
        <TabsList>
          <TabsTrigger value="submitted">My Submitted Events</TabsTrigger>
          <TabsTrigger value="subscribed">My Subscribed Events</TabsTrigger>
        </TabsList>
        <TabsContent value="submitted">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">
                You haven&apos;t submitted any events yet.
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  type="submitted"
                  onStatusChange={fetchEvents}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="subscribed">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">
                You haven&apos;t subscribed to any events yet.
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
