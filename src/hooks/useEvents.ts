import { useState, useEffect } from "react";
import { Event } from "@/types";

export function useEvents(url: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [url]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    setLoading(true);
    fetchEvents();
  };

  return { events, loading, error, refetch };
}
