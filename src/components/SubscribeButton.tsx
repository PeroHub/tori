"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Toast } from "./ui/toast";

interface SubscribeButtonProps {
  eventId: string;
  initialSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe?: () => void;
}

export function SubscribeButton({
  eventId,
  initialSubscribed,
}: SubscribeButtonProps) {
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSubscription = async () => {
    if (!userId) {
      setError("Please sign in to subscribe to events");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/subscribe`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to update subscription");

      setIsSubscribed(!isSubscribed);
    } catch (error) {
      setError("Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleSubscription}
        disabled={loading}
        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 disabled:opacity-50"
      >
        {isSubscribed ? (
          <BellOff className="w-5 h-5" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        <span>{isSubscribed ? "Unsubscribe" : "Subscribe"}</span>
      </button>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </>
  );
}
