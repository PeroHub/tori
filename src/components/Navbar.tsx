"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { NotificationBell } from "./NotificationBell";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary focus:outline-none"
            >
              Akwa Tourism
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/events"
              className="text-gray-600 hover:text-primary transition"
            >
              Events
            </Link>
            {/* <Link
              href="/destinations"
              className="text-gray-600 hover:text-primary transition"
            >
              Destinations
            </Link> */}
            {isSignedIn ? (
              <>
                <Link
                  href="/events/register"
                  className="flex items-center space-x-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Event</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary transition"
                >
                  Dashboard
                </Link>
                <NotificationBell />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link
                href="/sign-in"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-primary"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 px-4 bg-white border-t">
            <Link
              href="/events"
              className="block text-gray-600 hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/destinations"
              className="block text-gray-600 hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/events/register"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Event</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-gray-600 hover:text-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <NotificationBell />
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
