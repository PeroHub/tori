"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Check, LogIn } from "lucide-react";
import { useActivityPrompt } from "@/contexts/ActivityPromptContext";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
}

const SUGGESTED_ACTIVITIES = [
  {
    id: "1",
    title: "Island Hopping",
    description: "Explore multiple islands and experience local life",
    category: "Adventure",
  },
  {
    id: "2",
    title: "Cultural Tours",
    description: "Learn about Maldivian traditions and customs",
    category: "Culture",
  },
  {
    id: "3",
    title: "Water Sports",
    description: "Enjoy snorkeling, diving, and other water activities",
    category: "Sports",
  },
  {
    id: "4",
    title: "Local Cuisine",
    description: "Try traditional Maldivian dishes and cooking classes",
    category: "Food",
  },
  {
    id: "5",
    title: "Wellness Activities",
    description: "Spa treatments and yoga sessions",
    category: "Wellness",
  },
];

export function ActivityPrompt() {
  const { showPrompt, setShowPrompt, setHasSeenPrompt, resetPrompt } = useActivityPrompt();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { userId, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSignIn = useCallback(async () => {
    try {
      if (selectedActivities.length > 0) {
        localStorage.setItem('pendingActivities', JSON.stringify({
          activities: selectedActivities,
          returnUrl: window.location.pathname
        }));
      }

      setShowPrompt(false);
      setShowAuthPrompt(false);

      router.push('/sign-in');
      
    } catch (error) {
      console.error('Error redirecting to sign-in:', error);
    }
  }, [selectedActivities, router, setShowPrompt]);

  const handlePendingActivities = useCallback(async () => {
    if (!isSignedIn) return;

    const pendingData = localStorage.getItem('pendingActivities');
    
    if (pendingData) {
      try {
        const { activities, returnUrl } = JSON.parse(pendingData);
        
        await fetch('/api/user-preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activities }),
        });

        localStorage.removeItem('pendingActivities');
        
        if (window.location.pathname === returnUrl) {
          setSelectedActivities(activities);
          setShowPrompt(true);
          setShowConfirmation(true);
          setTimeout(() => {
            setHasSeenPrompt(true);
            setShowPrompt(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Error saving pending activities:', error);
      }
    }
  }, [isSignedIn, setHasSeenPrompt, setShowPrompt]);

  useEffect(() => {
    handlePendingActivities();
  }, [handlePendingActivities, isSignedIn]);

  useEffect(() => {
    return () => {
      setShowAuthPrompt(false);
      setShowConfirmation(false);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!isSignedIn) {
        localStorage.setItem('guestActivities', JSON.stringify(selectedActivities));
        setShowAuthPrompt(true);
        return;
      }

      await fetch('/api/user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activities: selectedActivities }),
      });
      
      if (userId) {
        localStorage.setItem(`activityPrompt-${userId}`, 'true');
      }
      setShowConfirmation(true);
      
      setTimeout(() => {
        setHasSeenPrompt(true);
        setShowPrompt(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSignedIn && selectedActivities.length > 0) {
      localStorage.setItem('guestActivities', JSON.stringify(selectedActivities));
    }
    
    if (userId) {
      localStorage.setItem(`activityPrompt-${userId}`, 'true');
    } else {
      localStorage.setItem('guestPromptSeen', 'true');
    }
    
    setHasSeenPrompt(true);
    setShowPrompt(false);
    setShowAuthPrompt(false);
  };

  if (!showPrompt) return null;

  if (showAuthPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Save Your Preferences
          </h3>
          <p className="text-gray-600 mb-6">
            Sign in to save your preferences and get personalized
            recommendations
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSignIn}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Sign In
            </button>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Preferences Saved!
          </h3>
          <p className="text-gray-600">
            We'll customize your experience based on your selections.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 sm:my-0 relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Welcome!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Select activities you're interested in and we'll guide you
            throughout your stay
          </p>

          <div className="grid grid-cols-1 gap-3 mb-6 max-h-[60vh] overflow-y-auto">
            {SUGGESTED_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedActivities.includes(activity.id)
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => handleActivityToggle(activity.id)}
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  {activity.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {activity.description}
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {activity.category}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              onClick={handleClose}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedActivities.length === 0 || isSubmitting}
              className="px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Saving..." : "Get Personalized Guide"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
