"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type TabType = "all" | "pending" | "approved" | "rejected";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/events/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Dashboard error:", error);
      setError(error.message || "Error loading your events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    fetchUserEvents();
  }, [isLoaded, isSignedIn, router]);

  const filteredEvents = events.filter((event) => {
    if (activeTab === "all") return true;
    return event.status === activeTab;
  });

  const tabCount = {
    all: events.length,
    pending: events.filter((e) => e.status === "pending").length,
    approved: events.filter((e) => e.status === "approved").length,
    rejected: events.filter((e) => e.status === "rejected").length,
  };

  if (!isLoaded || loading) return <Loading />;
  if (error) return <ErrorMessage message={error} retry={fetchUserEvents} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Events</h1>

        {/* Status Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
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
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {activeTab === "all"
                ? "You haven't registered any events yet."
                : `No ${activeTab} events found.`}
            </p>
            <a
              href="/events/register"
              className="text-primary hover:text-primary/80"
            >
              Register a new event
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                type="dashboard"
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
