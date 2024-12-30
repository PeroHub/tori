"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Event } from "@/types";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";
import { Calendar, MapPin, Tag, Users, ArrowLeft } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { AddToCalendar } from "@/components/AddToCalendar";
import { Toast } from "@/components/ui/toast";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError("Error loading event. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.eventId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex items-center space-x-2">
              <AddToCalendar event={event} />
              <SubscribeButton
                eventId={event._id}
                initialSubscribed={false}
                onSubscribe={() => {}}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>
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
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{event.location.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="w-5 h-5 mr-3" />
                <span className="capitalize">{event.category}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-3" />
                <span>{event.subscribers.length} interested</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
