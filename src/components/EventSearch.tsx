"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Event } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface EventSearchProps {
  onSearch: (events: Event[]) => void;
  className?: string;
  events: Event[];
}

export function EventSearch({ onSearch, className, events }: EventSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState<"all" | "upcoming" | "past">(
    "upcoming"
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchFilteredEvents();
  }, [debouncedSearch, category, dateRange]);

  const fetchFilteredEvents = async () => {
    try {
      const params = new URLSearchParams({
        search: debouncedSearch,
        category: category,
        dateRange: dateRange,
      });

      const response = await fetch(`/api/events/search?${params}`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="md:flex gap-4">
        <div className="md:flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="food">Food & Drink</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as any)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All Dates</option>
        </select>
      </div>
    </div>
  );
}
