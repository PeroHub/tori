"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { AdminEventCard } from "@/components/AdminEventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<Event[]>([]);
  const [rejectedEvents, setRejectedEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();

      setPendingEvents(
        data.filter((event: Event) => event.status === "pending")
      );
      setApprovedEvents(
        data.filter((event: Event) => event.status === "approved")
      );
      setRejectedEvents(
        data.filter((event: Event) => event.status === "rejected")
      );
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedEvents.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-6">
            {pendingEvents.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">
                  No pending events to review.
                </div>
              </div>
            ) : (
              pendingEvents.map((event) => (
                <AdminEventCard
                  key={event._id}
                  event={event}
                  onStatusChange={fetchEvents}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-6">
            {approvedEvents.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">No approved events.</div>
              </div>
            ) : (
              approvedEvents.map((event) => (
                <AdminEventCard
                  key={event._id}
                  event={event}
                  onStatusChange={fetchEvents}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="grid gap-6">
            {rejectedEvents.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">No rejected events.</div>
              </div>
            ) : (
              rejectedEvents.map((event) => (
                <AdminEventCard
                  key={event._id}
                  event={event}
                  onStatusChange={fetchEvents}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
