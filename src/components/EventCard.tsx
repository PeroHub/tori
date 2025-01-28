"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Event } from "@/types";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  type?: "default" | "subscribed" | "admin" | "dashboard";
  className?: string;
  showStatus?: boolean;
  onUnsubscribe?: () => void;
  onStatusChange?: (eventId: string, status: "approved" | "rejected") => void;
}

export function EventCard({
  event,
  type = "default",
  className = "",
  showStatus = false,
  onStatusChange,
}: EventCardProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { _id, title, description, image, date, status } = event;
  const locationAddress = event.location.address;

  const handleStatusChange = async (status: "approved" | "rejected") => {
    if (!onStatusChange) return;
    onStatusChange(event._id, status);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  };

  const handleCardClick = () => {
    if (type !== "admin" && type !== "dashboard") {
      router.push(`/events/${_id}`);
    }
  };

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
      className={`rounded-md  overflow-hidden ${className} ${
        type !== "admin" && type !== "dashboard" ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
          quality={100}
        />
      </div>
      <div className="pt-2">
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
        {type === "admin" && (
          <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("approved");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("rejected");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Reject
            </button>
          </div>
        )}
        {/* {!isSignedIn && type !== "admin" && (
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={handleActionClick}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm"
            >
              Sign in to interact
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
