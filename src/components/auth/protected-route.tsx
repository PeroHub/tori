"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/components/ui/loading";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Store the current path before redirecting
      const returnUrl = encodeURIComponent(currentPath);
      router.push(`/sign-in?redirect=${returnUrl}`);
    }
  }, [isLoaded, isSignedIn, router, currentPath]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
