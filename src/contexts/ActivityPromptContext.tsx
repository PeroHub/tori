"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface ActivityPromptContextType {
  showPrompt: boolean;
  setShowPrompt: (show: boolean) => void;
  hasSeenPrompt: boolean;
  setHasSeenPrompt: (seen: boolean) => void;
  resetPrompt: () => void;
}

const ActivityPromptContext = createContext<ActivityPromptContextType>({
  showPrompt: false,
  setShowPrompt: () => {},
  hasSeenPrompt: false,
  setHasSeenPrompt: () => {},
  resetPrompt: () => {},
});

export function ActivityPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasSeenPrompt, setHasSeenPrompt] = useState(false);
  const { userId, isSignedIn } = useAuth();
  const pathname = usePathname();

  const resetPrompt = () => {
    setShowPrompt(true);
    setHasSeenPrompt(false);
  };

  useEffect(() => {
    // Don't show prompt on sign-in page
    if (pathname === "/sign-in") {
      setShowPrompt(false);
      return;
    }

    if (isSignedIn && userId) {
      const seen = localStorage.getItem(`activityPrompt-${userId}`);
      const pendingActivities = localStorage.getItem("pendingActivities");

      if (!seen || pendingActivities) {
        setShowPrompt(true);
      } else {
        setHasSeenPrompt(true);
      }
    } else {
      // Handle guest users
      const guestSeen = localStorage.getItem("guestPromptSeen");
      if (!guestSeen) {
        setShowPrompt(true);
      } else {
        setHasSeenPrompt(true);
      }
    }
  }, [userId, isSignedIn, pathname]);

  return (
    <ActivityPromptContext.Provider
      value={{
        showPrompt,
        setShowPrompt,
        hasSeenPrompt,
        setHasSeenPrompt,
        resetPrompt,
      }}
    >
      {children}
    </ActivityPromptContext.Provider>
  );
}

export const useActivityPrompt = () => useContext(ActivityPromptContext);
