"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";
import { EventCard } from "./EventCard";
import { useUser } from "@clerk/nextjs";

export function Recommendations() {
  const { user, isSignedIn } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/events/recommendations", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch recommendations");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (!isSignedIn) return null;
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            type="subscribed"
            onUnsubscribe={() => {}}
          />
        ))}
      </div>
    </section>
  );
}
