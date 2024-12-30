"use client";

import { Event } from "@/types";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { AddToCalendar } from "./AddToCalendar";
import { SubscribeButton } from "./SubscribeButton";
import { useState } from "react";
import { Toast } from "./ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  type: "submitted" | "subscribed";
  onStatusChange?: () => void;
  onUnsubscribe?: () => void;
}

export function EventCard({
  event,
  type,
  onStatusChange,
  onUnsubscribe,
}: EventCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      setSuccess("Event deleted successfully");
      onStatusChange?.();
    } catch (error) {
      setError("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    router.push(`/events/${event._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex-1">
          <Link href={`/events/${event._id}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition">
              {event.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(event.date)}</span>
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
          <div className="mt-4 space-x-4">
            <AddToCalendar event={event} />
            {type === "subscribed" && (
              <SubscribeButton
                eventId={event._id}
                initialSubscribed={true}
                onUnsubscribe={onUnsubscribe}
                onSubscribe={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
          </div>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-32 h-32 object-cover rounded-lg ml-4"
        />
      </div>
      {type === "submitted" && (
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Status: <span className="capitalize">{event.status}</span>
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-600 disabled:opacity-50"
          >
            Delete Event
          </button>
        </div>
      )}
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      {success && (
        <Toast
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  );
}
