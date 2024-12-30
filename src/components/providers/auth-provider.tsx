"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const { theme } = useTheme();
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: { colorPrimary: "rgb(59, 130, 246)" },
        elements: {
          card: "bg-white dark:bg-gray-900",
          navbar: "bg-white dark:bg-gray-900",
          headerTitle: "text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-600 dark:text-gray-400",
          socialButtonsBlockButton:
            "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
          socialButtonsBlockButtonText: "text-gray-600 dark:text-gray-300",
          dividerLine: "bg-gray-200 dark:bg-gray-700",
          dividerText: "text-gray-600 dark:text-gray-400",
          formButtonPrimary: "bg-primary hover:bg-primary/90",
          footerActionLink: "text-primary hover:text-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
