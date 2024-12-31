"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { EventCard } from "@/components/EventCard";

export default function DashboardPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittedEvents, setSubmittedEvents] = useState<Event[]>([]);
  const [subscribedEvents, setSubscribedEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      // Fetch submitted events
      const submittedResponse = await fetch("/api/events/submitted");
      if (!submittedResponse.ok)
        throw new Error("Failed to fetch submitted events");
      const submittedData = await submittedResponse.json();
      setSubmittedEvents(submittedData);

      // Fetch subscribed events
      const subscribedResponse = await fetch("/api/events/subscribed");
      if (!subscribedResponse.ok)
        throw new Error("Failed to fetch subscribed events");
      const subscribedData = await subscribedResponse.json();
      setSubscribedEvents(subscribedData);
    } catch (error) {
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
          {submittedEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">
                You haven&apos;t submitted any events yet.
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              {submittedEvents.map((event) => (
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
          {subscribedEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">
                You haven&apos;t subscribed to any events yet.
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {subscribedEvents.map((event) => (
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
