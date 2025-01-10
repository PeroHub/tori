"use client";

import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
  type?: "default" | "subscribed" | "admin" | "dashboard";
  className?: string;
  showStatus?: boolean;
  onUnsubscribe?: () => void;
}

export function EventCard({
  event,
  type = "default",
  className = "",
  showStatus = false,
}: EventCardProps) {
  const { title, description, image, date, status } = event;
  const locationAddress = event.location.address;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          {showStatus && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{locationAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
