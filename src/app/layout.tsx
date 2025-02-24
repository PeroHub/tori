import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ActivityPrompt } from "@/components/ActivityPrompt";
import { ActivityPromptProvider } from "@/contexts/ActivityPromptContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Tourism Platform",
  description: "Discover amazing destinations with AI-powered recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NotificationProvider>
              <ActivityPromptProvider>
                <Navbar />
                <main className="pt-16">{children}</main>
                <Toaster position="bottom-right" />
                <ActivityPrompt />
              </ActivityPromptProvider>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
