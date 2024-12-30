"use client";

import { Event } from "@/types";
import { Calendar, MapPin, Tag, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Toast } from "./ui/toast";

interface AdminEventCardProps {
  event: Event;
  onStatusChange: () => void;
}

export function AdminEventCard({ event, onStatusChange }: AdminEventCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: "approved" | "rejected") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/events/${event._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event status");
      }

      onStatusChange();
    } catch (error) {
      setError("Failed to update event status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location.address}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Tag className="w-4 h-4 mr-2" />
              <span className="capitalize">{event.category}</span>
            </div>
          </div>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-32 h-32 object-cover rounded-lg ml-4"
        />
      </div>

      {event.status === "pending" && (
        <div className="mt-4 pt-4 border-t flex justify-end space-x-4">
          <button
            onClick={() => handleStatusChange("approved")}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleStatusChange("rejected")}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </button>
        </div>
      )}

      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </div>
  );
}
