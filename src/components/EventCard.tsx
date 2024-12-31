"use client";

import { Event } from "@/types";
import { Calendar, MapPin, Tag } from "lucide-react";
import { AddToCalendar } from "./AddToCalendar";
import { SubscribeButton } from "./SubscribeButton";
import { useState } from "react";
import { Toast } from "./ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  type: "submitted" | "subscribed";
  onStatusChange?: () => void;
  onUnsubscribe?: () => void;
  className?: string;
}

export function EventCard({
  event,
  type,
  onStatusChange,
  onUnsubscribe,
  className,
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
    <div
      className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}
    >
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-64">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col">
          <div className="flex-1">
            <Link href={`/events/${event._id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-primary transition line-clamp-2">
                {event.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">
                  {event.location.address}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <Tag className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm capitalize">{event.category}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
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
      </div>

      {type === "submitted" && (
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Status: <span className="capitalize">{event.status}</span>
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-600 disabled:opacity-50 text-sm"
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
