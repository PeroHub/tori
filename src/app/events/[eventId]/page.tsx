"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { useAuth } from "@clerk/nextjs";
import { Calendar, MapPin, Tag, Users, ArrowLeft, Share2 } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { AddToCalendar } from "@/components/AddToCalendar";
import { Toast } from "@/components/ui/toast";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${params.eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Error loading event. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [params.eventId]);

  const handleShare = async () => {
    if (event) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6 transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48 sm:h-64 md:h-80">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25"></div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
                {event.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <AddToCalendar event={event} />
                <SubscribeButton
                  eventId={event._id}
                  initialSubscribed={false}
                  onSubscribe={() => {}}
                />
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-start sm:items-center text-gray-600 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-3 mt-1 sm:mt-0 flex-shrink-0" />
                  <span className="break-words">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-start sm:items-center text-gray-600 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-3 mt-1 sm:mt-0 flex-shrink-0" />
                  <span className="break-words">{event.location.address}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm sm:text-base">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-3 flex-shrink-0" />
                  <span className="capitalize">{event.category}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm sm:text-base">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-3 flex-shrink-0" />
                  <span>{event.subscribers.length} interested</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Description
                </h2>
                <p className="text-gray-600 whitespace-pre-wrap text-sm sm:text-base break-words">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
