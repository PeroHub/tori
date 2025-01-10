"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type TabType = "pending" | "approved" | "rejected";

export default function AdminPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events/user", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Admin fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (eventId: string, status: string) => {
    try {
      const response = await fetch("/api/events/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event status");
      }

      await fetchEvents();
    } catch (error: any) {
      console.error("Status update error:", error);
      alert(error.message || "Failed to update event status");
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    fetchEvents();
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || loading) return <Loading />;
  if (error) return <ErrorMessage message={error} retry={fetchEvents} />;

  const filteredEvents = events.filter((event) => event.status === activeTab);
  const tabCount = {
    pending: events.filter((e) => e.status === "pending").length,
    approved: events.filter((e) => e.status === "approved").length,
    rejected: events.filter((e) => e.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Status Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          {(["pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 relative ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="capitalize">{tab}</span>
              <span className="ml-2 text-sm text-gray-400">
                ({tabCount[tab]})
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events (
              {filteredEvents.length})
            </h2>
            {filteredEvents.length === 0 ? (
              <p className="text-gray-500">No {activeTab} events found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="relative">
                    <EventCard
                      event={event}
                      type="admin"
                      className="h-full"
                      showStatus={true}
                    />
                    {activeTab === "pending" && (
                      <div className="absolute bottom-4 right-4 space-x-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(event._id, "approved")
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(event._id, "rejected")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
